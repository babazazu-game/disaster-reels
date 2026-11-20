import { installTap } from '../engine/tap.ts';
import { COUNTS, ADJ_IDS, NOUN_IDS, reelAdj, reelNoun, agree, type AdjId, type NounId } from './words.ts';

/**
 * Барабан хаоса: три ленты СКОЛЬКО / КАКОЙ / ЧТО внизу экрана и ОДНА большая
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

const SPIN_STEP = 0.075;      // смена слова на ленте, с
const AUTO_STOP = 5;          // через столько без нажатий лента встаёт сама
const AUTO_GAP = 0.6;         // дальше автостоп идёт с таким шагом

export interface ReelResult { n: number; adj: AdjId; noun: NounId }

export class Reels {
  private box: HTMLDivElement;
  private cells: HTMLDivElement[] = [];
  private btn: HTMLButtonElement;
  private idx = [0, 0, 0];
  private stopped = 0;
  private t = 0;
  private stepT = 0;
  private autoT = 0;
  private onDone: ((r: ReelResult) => void) | null = null;
  /** Подстроить итог (первый барабан — понятный, второй — не слишком много). Можно частично. */
  private forced: Partial<ReelResult> | null = null;
  open = false;
  private hideTimer = 0;
  private badge!: HTMLElement;

  constructor(parent: HTMLElement, stopLabel: string) {
    injectCss();
    installTap();
    this.box = document.createElement('div');
    this.box.className = 'reels';
    const frame = document.createElement('div');
    frame.className = 'reels-frame';
    for (let i = 0; i < 3; i++) {
      const c = document.createElement('div');
      c.className = 'reel';
      if (i === 0) c.style.flex = '.55';
      else c.appendChild(document.createElement('i'));   // иконка: читается без чтения и на любом языке
      c.appendChild(document.createElement('span'));
      frame.appendChild(c);
      this.cells.push(c);
    }
    this.btn = document.createElement('button');
    this.btn.className = 'reels-stop';
    this.btn.textContent = stopLabel;   // счётчик нажатий добавляется ниже отдельным элементом
    this.btn.addEventListener('click', () => this.press());
    this.badge = document.createElement('b');
    this.badge.className = 'reels-count';
    this.btn.appendChild(this.badge);
    this.box.append(frame, this.btn);
    parent.appendChild(this.box);
    addEventListener('keydown', (e) => { if ((e.code === 'KeyE' || e.code === 'Enter') && this.open) this.press(); });
  }

  private lists(): string[][] {
    return [COUNTS.map(String), ADJ_IDS.map(reelAdj), NOUN_IDS.map(reelNoun)];
  }

  spin(onDone: (r: ReelResult) => void, forced: Partial<ReelResult> | null = null): void {
    clearTimeout(this.hideTimer);
    this.onDone = onDone;
    this.forced = forced;
    this.stopped = 0; this.t = 0; this.autoT = AUTO_STOP;
    this.idx = [rnd(COUNTS.length), rnd(ADJ_IDS.length), rnd(NOUN_IDS.length)];
    this.cells.forEach((c) => c.classList.remove('done'));
    this.box.classList.add('show');

    this.btn.disabled = false;
    this.open = true;
    this.render();
  }

  hide(): void { clearTimeout(this.hideTimer); this.open = false; this.box.classList.remove('show'); }

  /** Крутится ли сейчас (мир на паузе). Фраза после остановки — уже игра. */
  get spinning(): boolean { return this.open && this.stopped < 3; }

  /** Нажатие СТОП — останавливает следующую ленту. */
  press(): void {
    if (!this.spinning) return;
    this.stop();
    this.autoT = AUTO_STOP;
  }

  /** Остановить следующую ленту. */
  private stop(): void {
    if (!this.open || this.stopped >= 3) return;
    const i = this.stopped, f = this.forced;
    if (f && i === 0 && f.n !== undefined) this.idx[0] = COUNTS.indexOf(f.n as typeof COUNTS[number]);
    if (f && i === 1 && f.adj) this.idx[1] = ADJ_IDS.indexOf(f.adj);
    if (f && i === 2 && f.noun) this.idx[2] = NOUN_IDS.indexOf(f.noun);
    this.cells[i].classList.add('done');
    this.stopped++;
    this.render();
    if (this.stopped === 3) {
      this.btn.disabled = true;
      const r: ReelResult = { n: COUNTS[this.idx[0]], adj: ADJ_IDS[this.idx[1]], noun: NOUN_IDS[this.idx[2]] };
      // слова на лентах — в согласованной форме итоговой фразы
      const [a, w] = agree(r.n, r.adj, r.noun);
      this.cells[1].lastElementChild!.textContent = a.toUpperCase();
      this.cells[2].lastElementChild!.textContent = w.toUpperCase();
      fit(this.cells);
      const cb = this.onDone;
      this.onDone = null;
      this.hideTimer = window.setTimeout(() => this.hide(), 1400);
      cb?.(r);
    }
  }

  update(dt: number): void {
    if (!this.open || this.stopped >= 3) return;
    this.t += dt;
    this.stepT -= dt;
    if (this.stepT <= 0) {
      this.stepT = SPIN_STEP;
      const n = [COUNTS.length, ADJ_IDS.length, NOUN_IDS.length];
      for (let i = this.stopped; i < 3; i++) this.idx[i] = (this.idx[i] + 1) % n[i];
      this.render();
    }
    this.autoT -= dt;
    if (this.autoT <= 0) { this.stop(); this.autoT = AUTO_GAP; }
  }

  private render(): void {
    this.badge.textContent = String(3 - this.stopped);
    this.badge.style.display = this.stopped < 3 ? '' : 'none';
    this.cells.forEach((c, i) => c.classList.toggle('next', i === this.stopped));
    const L = this.lists();
    this.cells.forEach((c, i) => { c.lastElementChild!.textContent = L[i][this.idx[i]]; });
    (this.cells[1].firstElementChild as HTMLElement).style.backgroundPosition = iconPos(ADJ_IDS[this.idx[1]]);
    (this.cells[2].firstElementChild as HTMLElement).style.backgroundPosition = iconPos(NOUN_IDS[this.idx[2]]);
    fit(this.cells);
  }
}

const rnd = (n: number) => Math.floor(Math.random() * n);

/** Длинные слова («ГИГАНТСКИХ», «СНЕГОВИКОВ») ужимаем по ширине ленты, а не обрезаем. */
function fit(cells: HTMLDivElement[]): void {
  for (const c of cells) {
    const span = c.lastElementChild as HTMLElement;
    span.style.fontSize = '';
    const w = c.clientWidth * 0.9, need = span.offsetWidth;
    if (need > w) span.style.fontSize = `${((parseFloat(getComputedStyle(span).fontSize) * w) / need).toFixed(1)}px`;
  }
}

let cssDone = false;
function injectCss(): void {
  if (cssDone) return;
  cssDone = true;
  const s = document.createElement('style');
  // --ru — кегль слова на ленте; ленты ужимаются по ширине экрана (портрет) и высоте (альбом)
  s.textContent = `
.reels{--w:min(94vw,calc(13*min(1vw,1vh,8px)*7));--ru:calc(var(--w)*.07);position:absolute;left:50%;z-index:7;
  bottom:calc(env(safe-area-inset-bottom) + 2*min(1vw,1vh,8px));transform:translate(-50%,140%);transition:transform .3s cubic-bezier(.3,1.4,.5,1);
  display:flex;align-items:center;gap:calc(var(--w)*.025);width:var(--w);pointer-events:none}
@media (pointer:coarse){.reels{bottom:calc(env(safe-area-inset-bottom) + 24vh)}}
.reels.show{transform:translate(-50%,0)}
.reels-frame{flex:1;display:flex;gap:calc(var(--w)*.012);padding:calc(var(--w)*.018);border-radius:calc(var(--w)*.04);
  background:#d8313a;border:calc(var(--w)*.008) solid #fff;box-shadow:0 0 0 calc(var(--w)*.006) #ffd23a inset,0 calc(var(--w)*.012) 0 rgba(0,0,0,.25)}
.reel{flex:1.15;min-width:0;height:calc(var(--w)*.2);display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:calc(var(--w)*.025);
  background:linear-gradient(#e9e2d6,#fffdf8 35%,#fffdf8 65%,#e3dacb);color:#c41f2a;font:900 var(--ru)/1 Rubik,system-ui,sans-serif;
  white-space:nowrap;overflow:hidden;filter:blur(.6px)}
.reel span{display:inline-block}
.reel i{display:block;width:calc(var(--w)*.17);height:calc(var(--w)*.17);background:url(./assets/reel.webp) 0 0/400% 500% no-repeat;flex:none}
.reel i+span{display:none}   /* только картинка: подписи не нужны (решение заказчика), фраза — крупно после СТОПа */
.reels-frame .reel:first-child span{font-size:calc(var(--ru)*1.5)}
.reel.done{filter:none;animation:reelHit .25s ease-out}
@keyframes reelHit{0%{transform:scale(1.12)}100%{transform:scale(1)}}
.reels-stop{pointer-events:auto;flex:none;width:calc(var(--w)*.22);height:calc(var(--w)*.22);min-width:56px;min-height:56px;border-radius:50%;cursor:pointer;
  background:radial-gradient(circle at 40% 35%,#ff6b6b,#d8313a 60%,#a51a22);color:#fff;border:calc(var(--w)*.01) solid #ffd23a;
  font:900 calc(var(--w)*.045)/1 Rubik,system-ui,sans-serif;box-shadow:0 calc(var(--w)*.012) 0 #7a1016}
.reels-stop:active{transform:translateY(3px);box-shadow:0 2px 0 #7a1016}
.reels-stop:disabled{filter:grayscale(.4) brightness(.9)}
.reels.show .reels-stop:not(:disabled){animation:stopPulse .8s ease-in-out infinite}
.reels-stop{position:relative}
.reels-count{position:absolute;top:-12%;right:-12%;width:42%;height:42%;border-radius:50%;display:flex;align-items:center;justify-content:center;
  background:#ffd23a;color:#7a1016;border:calc(var(--w)*.006) solid #fff;font:900 calc(var(--w)*.045)/1 Rubik,system-ui,sans-serif;box-shadow:0 2px 0 rgba(0,0,0,.25)}
.reel.next{box-shadow:0 0 0 calc(var(--w)*.008) #ffd23a,0 0 calc(var(--w)*.03) #ffd23a}
@keyframes stopPulse{0%,100%{transform:scale(1);box-shadow:0 calc(var(--w)*.012) 0 #7a1016,0 0 0 0 rgba(255,210,58,.9)}
  50%{transform:scale(1.12);box-shadow:0 calc(var(--w)*.012) 0 #7a1016,0 0 0 calc(var(--w)*.03) rgba(255,210,58,0)}}
`;
  document.head.appendChild(s);
}
