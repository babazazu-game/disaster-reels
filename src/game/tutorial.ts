/**
 * Мини-обучение — только в самом первом раунде (Playgama 3.1.3: понятно без чтения правил).
 *
 * Не отдельный экран и не стоп-кадр: ребёнок играет с первой секунды, а подсказки идут по ходу,
 * по одной, и каждая гаснет, как только игрок сделал то, что просили (или через несколько секунд —
 * чтобы не висела, если он уже умеет). Текст — короткий, крупный, с картинкой-жестом; нужная кнопка
 * на экране пульсирует.
 *
 *   1. барабан крутится → «Жми СТОП — барабан выберет хаос!»   (подсвечен СТОП)
 *   2. барабан встал    → «Беги: веди пальцем слева» / «Беги: W A S D»
 *   3. сдвинулся с места → «Прыгай: кнопка справа» / «Прыгай: ПРОБЕЛ»   (подсвечен прыжок)
 *   4. прыгнул          → «Убегай от хаоса 60 секунд!»
 */
export type TutorialStep = 'stop' | 'move' | 'jump' | 'goal' | 'done';

export interface TutorialHooks {
  touch(): boolean;
  reelsSpinning(): boolean;
  /** Сколько игрок прошёл с начала шага, м. */
  moved(): number;
  jumped(): boolean;
  highlightStop(on: boolean): void;
  highlightJump(on: boolean): void;
  ghostStick(on: boolean): void;
  /** Что подсказка не должна закрывать (открытый барабан), или null. */
  avoid(): DOMRect | null;
  L(ru: string, en: string): string;
  round: number;
}

/** Значки подсказок — свой SVG: эмодзи в части браузеров рисуются квадратиками. */
const SVG = (body: string): string => `<svg viewBox="0 0 24 24" fill="none" stroke="#2a1250" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
const ICONS = {
  tap: SVG('<path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V10m0-1.5a1.5 1.5 0 0 1 3 0V11m0-1a1.5 1.5 0 0 1 3 0v4.5A6.5 6.5 0 0 1 11.5 21h-.6a6 6 0 0 1-4.6-2.2L3.6 15.4a1.5 1.5 0 0 1 2.3-1.9L9 16"/>'),
  move: SVG('<path d="M12 3v18M3 12h18M12 3l-3 3m3-3 3 3M12 21l-3-3m3 3 3-3M3 12l3-3m-3 3 3 3M21 12l-3-3m3 3-3 3"/>'),
  jump: SVG('<path d="M5 15l7-7 7 7"/><path d="M5 20h14"/>'),
  goal: SVG('<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4m8-4h3a3 3 0 0 1-3 4M12 13v4m-4 3h8l-1-3H9z"/>'),
} as const;

const STEP_MAX: Record<TutorialStep, number> = { stop: 99, move: 7, jump: 7, goal: 3.5, done: 0 };

export class Tutorial {
  private el: HTMLDivElement;
  private icon: HTMLSpanElement;
  private text: HTMLSpanElement;
  private step: TutorialStep = 'done';
  private t = 0;
  private seenSpin = false;

  constructor(parent: HTMLElement, private h: TutorialHooks) {
    injectCss();
    this.el = document.createElement('div');
    this.el.className = 'tut';
    this.el.setAttribute('role', 'status');
    this.icon = this.el.appendChild(document.createElement('span'));
    this.icon.className = 'tut-ico';
    this.icon.setAttribute('aria-hidden', 'true');
    this.text = this.el.appendChild(document.createElement('span'));
    parent.appendChild(this.el);
  }

  get active(): boolean { return this.step !== 'done'; }
  get current(): TutorialStep { return this.step; }

  start(): void { this.seenSpin = false; this.go('stop'); }

  stop(): void { this.go('done'); }

  /** Скрыть на время паузы/меню, не сбивая шаг. */
  setVisible(v: boolean): void { this.el.style.visibility = v ? '' : 'hidden'; }

  update(dt: number): void {
    if (this.step === 'done') return;
    this.t += dt;
    const h = this.h;
    switch (this.step) {
      case 'stop':
        if (h.reelsSpinning()) this.seenSpin = true;
        else if (this.seenSpin) this.go('move');
        break;
      case 'move':
        if (h.moved() > 2.5 || this.t > STEP_MAX.move) this.go('jump');
        break;
      case 'jump':
        if (h.jumped() || this.t > STEP_MAX.jump) this.go('goal');
        break;
      case 'goal':
        if (this.t > STEP_MAX.goal) this.go('done');
        break;
    }
    // новый барабан посреди обучения — подсказку убираем, чтобы не лезла поверх
    if (this.step !== 'stop' && h.reelsSpinning()) this.el.classList.remove('show');
    else if ((this.step as TutorialStep) !== 'done') this.el.classList.add('show');
    this.dodge();
  }

  /** Подсказка не ложится на барабан: под ним, если влезает, иначе над ним, иначе на штатном месте поверх. */
  private dodge(): void {
    const box = this.h.avoid();
    this.el.style.top = this.el.style.bottom = '';
    if (!box) return;
    const r = this.el.getBoundingClientRect();
    if (r.bottom <= box.top || r.top >= box.bottom) return;
    const host = (this.el.offsetParent as HTMLElement | null)?.getBoundingClientRect() ?? new DOMRect(0, 0, innerWidth, innerHeight);
    const gap = 10;
    if (box.bottom + gap + r.height <= host.bottom - 8) this.el.style.top = `${box.bottom - host.top + gap}px`, this.el.style.bottom = 'auto';
    else if (box.top - gap - r.height >= host.top + 64) this.el.style.top = `${box.top - host.top - gap - r.height}px`, this.el.style.bottom = 'auto';
  }

  private go(step: TutorialStep): void {
    const h = this.h, touch = h.touch();
    this.step = step;
    this.t = 0;
    h.highlightStop(step === 'stop');
    h.highlightJump(step === 'jump');
    h.ghostStick(step === 'move' && touch);
    const lines: Record<Exclude<TutorialStep, 'done'>, [keyof typeof ICONS, string]> = {
      stop: ['tap', h.L('Жми СТОП — барабан выберет хаос!', 'Hit STOP — the reels pick the chaos!')],
      move: touch
        ? ['move', h.L('Беги: веди пальцем слева', 'Run: drag on the left side')]
        : ['move', h.L('Беги: W A S D или стрелки', 'Run: W A S D or arrow keys')],
      jump: touch
        ? ['jump', h.L('Прыгай: кнопка справа', 'Jump: the button on the right')]
        : ['jump', h.L('Прыгай: ПРОБЕЛ', 'Jump: SPACE')],
      goal: ['goal', h.L(`Убегай от хаоса ${h.round} секунд!`, `Escape the chaos for ${h.round} seconds!`)],
    };
    if (step === 'done') { this.el.classList.remove('show'); return; }
    const [ico, text] = lines[step];
    this.icon.innerHTML = ICONS[ico];
    this.text.textContent = text;
    this.el.classList.remove('show', 'pop');
    void this.el.offsetWidth;
    this.el.classList.add('show', 'pop');
  }
}

let cssDone = false;
function injectCss(): void {
  if (cssDone) return;
  cssDone = true;
  const s = document.createElement('style');
  s.textContent = `
.tut{--tu:min(1vh,1vw,8px);position:absolute;left:0;right:0;margin:0 auto;width:fit-content;bottom:calc(env(safe-area-inset-bottom) + max(96px,24vh));z-index:7;
  display:flex;align-items:center;gap:.5em;max-width:min(64vw,640px);box-sizing:border-box;padding:.5em .95em .5em .6em;border-radius:999px;
  background:linear-gradient(#fffdf4,#ffe9a8);border:3px solid #2a1250;box-shadow:0 5px 0 #2a1250,0 10px 22px #0005;
  color:#2a1250;font:900 clamp(15px,calc(3.1*var(--tu)),26px)/1.15 Nunito,"Arial Black",system-ui,sans-serif;text-align:left;
  pointer-events:none;opacity:0;visibility:hidden;transition:opacity .25s,visibility 0s .25s}
.tut.show{opacity:1;visibility:visible;transition:opacity .25s}
.tut.pop{animation:tutPop .45s cubic-bezier(.2,1.6,.4,1)}
.tut-ico{flex:none;display:grid;place-items:center;width:1.8em;height:1.8em;border-radius:50%;background:#ffd23a;border:2px solid #2a1250}
.tut-ico svg{width:68%;height:68%}
@media (orientation:portrait){.tut{max-width:min(90vw,640px)}}
@media (pointer:fine){.tut{bottom:calc(env(safe-area-inset-bottom) + max(120px,30vh))}}   /* мышь: барабан внизу — подсказка над ним */
@keyframes tutPop{0%{transform:scale(.6)}100%{transform:scale(1)}}
.reels-stop.tut-glow,.jump-btn.tut-glow{animation:tutGlow 1s ease-in-out infinite}
@keyframes tutGlow{0%,100%{filter:drop-shadow(0 0 0 #ffd23a)}50%{filter:drop-shadow(0 0 14px #ffd23a) drop-shadow(0 0 6px #fff);scale:1.08}}
`;
  document.head.appendChild(s);
}
