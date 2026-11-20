import { installTap } from '../engine/tap.ts';
import { COUNTS, ADJ_IDS, NOUN_IDS, type AdjId, type NounId } from './words.ts';

/**
 * Барабан хаоса: три ленты СКОЛЬКО / КАКОЙ / ЧТО и ОДНА большая
 * кнопка СТОП — она останавливает ленты по очереди (на телефоне три маленькие
 * кнопки под пальцем во время бега — мучение; решение после обсуждения).
 * Пока ленты крутятся, мир стоит на паузе (просьба заказчика). СТОП жмут трижды —
 * по нажатию на ленту; рядом со СТОПом счётчик оставшихся нажатий, следующая лента
 * подсвечена. Не жмёт 5 с — ленты встают сами по одной.
 * Клавиатура: E или Enter.
 */

/** Номер иконки в атласе assets/reel.webp (4 колонки × 5 рядов, рисовал Codex — art/reel/, режет tools/cut_reel_icons.py). */
const ICON: Record<AdjId | NounId, number> = {
  chicken: 0, cat: 1, shark: 2, banana: 3, meteor: 4, bomb: 5, snowman: 6, slime: 7, zombie: 14, dino: 15, ufo: 16, tornado: 17,
  fire: 8, ice: 9, giant: 10, bouncy: 11, fast: 12, plain: 13,
};
const iconPos = (id: AdjId | NounId) => `${(ICON[id] % 4) * 33.333}% ${Math.floor(ICON[id] / 4) * 25}%`;

const AUTO_STOP = 5;          // через столько без нажатий лента встаёт сама
const AUTO_GAP = 0.6;         // дальше автостоп идёт с таким шагом
const PITCH = 66;             // шаг в процентах высоты окна оставляет по краям соседей
const BRAKE_TIME = 0.34;
const REBOUND_TIME = 0.11;
const LAND_TIME = BRAKE_TIME + REBOUND_TIME;
const HIT_TIME = 0.22;
const OVERSHOOT = 0.14;

const LISTS = [COUNTS, ADJ_IDS, NOUN_IDS] as const;
const SPEEDS = [12.8, 14, 15.2] as const;
const wrap = (index: number, length: number) => ((index % length) + length) % length;

interface Lane {
  cell: HTMLDivElement;
  track: HTMLDivElement;
  slots: HTMLElement[];
  list: readonly (number | AdjId | NounId)[];
  speed: number;
  position: number;
  painted: number;
  brake: { from: number; to: number; elapsed: number } | null;
}

export interface ReelResult { n: number; adj: AdjId; noun: NounId }

export class Reels {
  private box: HTMLDivElement;
  private lanes: Lane[] = [];
  private btn: HTMLButtonElement;
  private stopped = 0;
  private landed = 0;
  private autoT = 0;
  private onDone: ((r: ReelResult) => void) | null = null;
  /** Подстроить итог (первый барабан — понятный, второй — не слишком много). Можно частично. */
  private forced: Partial<ReelResult> | null = null;
  open = false;
  private hideTimer = 0;
  private badge: HTMLElement;

  constructor(parent: HTMLElement, stopLabel: string) {
    injectCss();
    installTap();
    this.box = document.createElement('div');
    this.box.className = 'reels';
    this.box.inert = true;
    const frame = document.createElement('div');
    frame.className = 'reels-frame';
    LISTS.forEach((list, i) => {
      const cell = document.createElement('div');
      cell.className = 'reel';
      const track = document.createElement('div');
      track.className = 'reel-track';
      // Пять ячеек перекрывают окно даже на границе между символами.
      const slots = Array.from({ length: 5 }, (_, slot) => {
        const row = document.createElement('div');
        row.className = 'reel-symbol';
        row.style.top = `${50 + (slot - 2.5) * PITCH}%`;
        const symbol = document.createElement(i === 0 ? 'span' : 'i');
        row.appendChild(symbol);
        track.appendChild(row);
        return symbol;
      });
      cell.appendChild(track);
      frame.appendChild(cell);
      this.lanes.push({ cell, track, slots, list, speed: SPEEDS[i], position: 0, painted: -1, brake: null });
    });
    this.btn = document.createElement('button');
    this.btn.type = 'button';
    this.btn.className = 'reels-stop';
    this.btn.disabled = true;
    this.btn.textContent = stopLabel;   // счётчик нажатий добавляется ниже отдельным элементом
    this.btn.addEventListener('click', () => this.press());
    this.badge = document.createElement('b');
    this.badge.className = 'reels-count';
    this.btn.appendChild(this.badge);
    this.box.append(frame, this.btn);
    parent.appendChild(this.box);
    addEventListener('keydown', (e) => {
      if (!this.spinning || (e.code !== 'KeyE' && e.code !== 'Enter')) return;
      // Enter на кнопке иначе породит второй СТОП через штатный click.
      e.preventDefault();
      if (!e.repeat) this.press();
    });
  }

  spin(onDone: (r: ReelResult) => void, forced: Partial<ReelResult> | null = null): void {
    clearTimeout(this.hideTimer);
    this.onDone = onDone;
    this.forced = forced;
    this.stopped = 0;
    this.landed = 0;
    this.autoT = AUTO_STOP;
    for (const lane of this.lanes) {
      lane.position = Math.random() * lane.list.length;
      lane.brake = null;
      lane.cell.classList.add('rolling');
      lane.cell.style.transform = '';
      this.paint(lane);
    }
    this.box.inert = false;
    this.box.classList.add('show');
    this.btn.disabled = false;
    this.open = true;
    this.renderControls();
  }

  hide(): void {
    clearTimeout(this.hideTimer);
    this.open = false;
    this.onDone = null;
    this.btn.disabled = true;
    this.box.inert = true;
    this.box.classList.remove('show');
  }

  /** Мир ждёт, пока все символы встанут по центру. */
  get spinning(): boolean { return this.open && this.landed < this.lanes.length; }

  /** Нажатие СТОП — останавливает следующую ленту. */
  press(): void {
    if (!this.open || this.stopped === this.lanes.length) return;
    this.stop();
    this.autoT = AUTO_STOP;
  }

  private stop(): void {
    const lane = this.lanes[this.stopped];
    const forced = [this.forced?.n, this.forced?.adj, this.forced?.noun][this.stopped];
    const index = forced === undefined ? -1 : lane.list.indexOf(forced);
    const from = lane.position;
    let to = Math.ceil(from + 2);
    // Обходим ленту вперёд до нужного символа, сохраняя порядок списка.
    if (index >= 0) {
      const next = Math.ceil(from + 0.6);
      to = next + wrap(index - next, lane.list.length);
    }
    lane.brake = { from, to, elapsed: 0 };
    this.stopped++;
    this.renderControls();
  }

  update(dt: number): void {
    if (!this.open) return;
    // Разбиваем длинный кадр по автостопам, чтобы сохранить интервал между лентами.
    while (this.stopped < this.lanes.length && dt >= this.autoT) {
      this.advance(this.autoT);
      dt -= this.autoT;
      this.stop();
      this.autoT = AUTO_GAP;
    }
    this.autoT -= dt;
    this.advance(dt);
    if (this.landed !== this.lanes.length || !this.onDone) return;

    const result: ReelResult = {
      n: COUNTS[wrap(this.lanes[0].position, COUNTS.length)],
      adj: ADJ_IDS[wrap(this.lanes[1].position, ADJ_IDS.length)],
      noun: NOUN_IDS[wrap(this.lanes[2].position, NOUN_IDS.length)],
    };
    const cb = this.onDone;
    this.onDone = null;
    this.hideTimer = window.setTimeout(() => this.hide(), 1400);
    cb(result);
  }

  private advance(dt: number): void {
    for (const lane of this.lanes) {
      const brake = lane.brake;
      if (!brake) {
        lane.position = (lane.position + lane.speed * dt) % lane.list.length;
        this.paint(lane);
        continue;
      }
      if (brake.elapsed >= LAND_TIME + HIT_TIME) continue;

      const before = brake.elapsed;
      brake.elapsed += dt;
      if (before < LAND_TIME) {
        lane.position = brakePosition(brake, lane.speed);
        this.paint(lane);
        if (brake.elapsed >= LAND_TIME) {
          this.landed++;
          lane.cell.classList.remove('rolling');
        }
      }
      if (brake.elapsed >= LAND_TIME) {
        const hit = (brake.elapsed - LAND_TIME) / HIT_TIME;
        lane.cell.style.transform = hit < 1 ? `scale(${1 + 0.1 * Math.sin(Math.PI * hit) * (1 - hit)})` : '';
      }
    }
  }

  private paint(lane: Lane): void {
    const center = Math.floor(lane.position);
    const index = wrap(center, lane.list.length);
    // Меняем содержимое только при переходе на следующий символ.
    if (lane.painted !== index) {
      lane.slots.forEach((slot, i) => {
        const symbol = lane.list[wrap(index + 2 - i, lane.list.length)];
        if (typeof symbol === 'number') slot.textContent = String(symbol);
        else slot.style.backgroundPosition = iconPos(symbol);
      });
      lane.painted = index;
    }
    lane.track.style.transform = `translateY(${(lane.position - center) * PITCH}%)`;
  }

  private renderControls(): void {
    const left = this.lanes.length - this.stopped;
    this.badge.textContent = String(left);
    this.badge.style.display = left ? '' : 'none';
    this.btn.disabled = left === 0;
    this.lanes.forEach(({ cell }, i) => cell.classList.toggle('next', i === this.stopped));
  }
}

function brakePosition({ from, to, elapsed }: NonNullable<Lane['brake']>, speed: number): number {
  if (elapsed < BRAKE_TIME) {
    const t = elapsed / BRAKE_TIME;
    const travel = to + OVERSHOOT - from;
    // Стыкуем с вращением по скорости, а короткий ход ограничиваем от лишнего перелёта.
    const tangent = Math.min(speed * BRAKE_TIME, 3 * travel);
    return from + travel * t * t * (3 - 2 * t) + tangent * t * (1 - t) ** 2;
  }
  if (elapsed >= LAND_TIME) return to;
  const t = (elapsed - BRAKE_TIME) / REBOUND_TIME;
  return to + OVERSHOOT * (1 - t) ** 2 * (1 + 2 * t);
}

let cssDone = false;
function injectCss(): void {
  if (cssDone) return;
  cssDone = true;
  const s = document.createElement('style');
  s.textContent = `
.reels{--margin:max(18px,env(safe-area-inset-left),env(safe-area-inset-right));
  --w:min(91vh,728px,calc(100vw - 2*var(--margin)));--y:0%;
  position:absolute;left:50%;z-index:7;bottom:calc(env(safe-area-inset-bottom) + max(10px,2vh));
  display:flex;align-items:center;gap:calc(var(--w)*.025);width:var(--w);pointer-events:none;
  opacity:0;visibility:hidden;transform:translate(-50%,var(--y)) scale(.85);
  transition:transform .22s ease-in,opacity .22s ease-in,visibility 0s .22s}
@media (pointer:coarse){.reels{--y:-50%;bottom:auto;top:calc(46% + (env(safe-area-inset-top) - env(safe-area-inset-bottom))/2)}}
.reels.show{opacity:1;visibility:visible;transform:translate(-50%,var(--y)) scale(1);
  transition:transform .32s cubic-bezier(.3,1.55,.55,1),opacity .18s ease-out,visibility 0s}
.reels-frame{flex:1;min-width:0;display:flex;gap:calc(var(--w)*.012);padding:calc(var(--w)*.018);border-radius:calc(var(--w)*.04);
  background:#d8313a;border:calc(var(--w)*.008) solid #fff;box-shadow:0 0 0 calc(var(--w)*.006) #ffd23a inset,0 calc(var(--w)*.012) 0 rgba(0,0,0,.25)}
.reel{position:relative;flex:1;min-width:0;height:calc(var(--w)*.2);border-radius:calc(var(--w)*.025);overflow:hidden;
  background:#fffaf0;color:#c41f2a;font:900 calc(var(--w)*.105)/1 Rubik,system-ui,sans-serif;white-space:nowrap}
.reel:first-child{flex:.65}
.reel-track{position:absolute;inset:0}
.reel.rolling .reel-track{filter:blur(.7px);will-change:transform}
.reel-symbol{position:absolute;inset-inline:0;height:${PITCH}%;display:grid;
  grid-template:minmax(0,1fr)/minmax(0,1fr);place-items:center}
.reel i{display:block;width:min(100%,calc(var(--w)*.16));aspect-ratio:1;background:url(./assets/reel.webp?v=${__BUILD__}) 0 0/400% 500% no-repeat}
/* Тень скрывает обрезку символов у краёв, а блик выгибает окно по центру. */
.reel::after{content:'';position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(to bottom,rgba(44,25,19,.60),rgba(61,38,25,.16) 26%,transparent 39%,rgba(255,255,255,.18) 48%,rgba(255,255,255,.18) 52%,transparent 61%,rgba(61,38,25,.18) 76%,rgba(44,25,19,.64))}
.reels-stop{pointer-events:none;flex:none;width:calc(var(--w)*.22);height:calc(var(--w)*.22);min-width:56px;min-height:56px;border-radius:50%;cursor:pointer;
  background:radial-gradient(circle at 40% 35%,#ff6b6b,#d8313a 60%,#a51a22);color:#fff;border:calc(var(--w)*.01) solid #ffd23a;
  font:900 max(13px,calc(var(--w)*.045))/1 Rubik,system-ui,sans-serif;box-shadow:0 calc(var(--w)*.012) 0 #7a1016}
.reels.show .reels-stop:not(:disabled){pointer-events:auto}
.reels-stop:active{transform:translateY(3px);box-shadow:0 2px 0 #7a1016}
.reels-stop:disabled{filter:grayscale(.4) brightness(.9)}
.reels.show .reels-stop:not(:disabled){animation:stopPulse .8s ease-in-out infinite}
.reels-stop{position:relative}
.reels-count{position:absolute;top:-12%;right:-12%;width:42%;height:42%;border-radius:50%;display:flex;align-items:center;justify-content:center;
  background:#ffd23a;color:#7a1016;border:calc(var(--w)*.006) solid #fff;font:900 max(13px,calc(var(--w)*.045))/1 Rubik,system-ui,sans-serif;box-shadow:0 2px 0 rgba(0,0,0,.25)}
.reel.next{box-shadow:0 0 0 calc(var(--w)*.008) #ffd23a,0 0 calc(var(--w)*.03) #ffd23a}
@keyframes stopPulse{0%,100%{transform:scale(1);box-shadow:0 calc(var(--w)*.012) 0 #7a1016,0 0 0 0 rgba(255,210,58,.9)}
  50%{transform:scale(1.12);box-shadow:0 calc(var(--w)*.012) 0 #7a1016,0 0 0 calc(var(--w)*.03) rgba(255,210,58,0)}}
`;
  document.head.appendChild(s);
}
