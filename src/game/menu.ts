import { installTap } from '../engine/tap.ts';

export type Difficulty = 'easy' | 'normal' | 'chaos';

export interface ResultInfo {
  win: boolean;
  title: string;
  cause?: string;
  time: number;
  round: number;
  botsAlive: number;
  botsTotal: number;
  best: number;
  newBest: boolean;
  difficulty: Difficulty;
}

type Screen = 'main' | 'result' | 'pause';
type Localize = (ru: string, en: string) => string;

const MODES = {
  easy: { name: ['Лёгкий', 'Easy'], hint: ['5 сердечек, всё медленнее', '5 hearts, slower chaos'] },
  normal: { name: ['Обычный', 'Normal'], hint: ['3 сердечка', '3 hearts'] },
  chaos: { name: ['Хаос', 'Chaos'], hint: ['2 сердечка, всё быстрее!', '2 hearts, faster chaos!'] },
} as const;
const DIFFICULTIES = ['easy', 'normal', 'chaos'] as const;

const ICONS = {
  easy: '<g fill="#fff"><circle cx="12" cy="6" r="4"/><circle cx="18" cy="10.5" r="4"/><circle cx="16" cy="17.5" r="4"/><circle cx="8" cy="17.5" r="4"/><circle cx="6" cy="10.5" r="4"/></g><circle cx="12" cy="12" r="3.5" fill="#ffd23a"/>',
  normal: '<path fill="#edfaff" d="M12 2 3.5 5.4v5.4c0 5.1 3.2 9 8.5 11.2 5.3-2.2 8.5-6.1 8.5-11.2V5.4Z"/><path d="m8 12 2.5 2.5 5.5-6" fill="none" stroke="#2456ad" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',
  chaos: '<path fill="#ffdf56" stroke="#fff4c1" stroke-linejoin="round" d="M13.8 1.5 4.5 13.2H11l-1 9.3L19.5 10H13Z"/>',
  person: '<circle cx="12" cy="5" r="3.5" fill="currentColor"/><path fill="currentColor" d="M8 10h8a3 3 0 0 1 3 3v3h-3v6h-3v-5h-2v5H8v-6H5v-3a3 3 0 0 1 3-3Z"/>',
  sound: '<path fill="currentColor" d="M3 9h4l5-4v14l-5-4H3Z"/><path d="M15 9a4 4 0 0 1 0 6m2.5-9a8 8 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  muted: '<path fill="currentColor" d="M3 9h4l5-4v14l-5-4H3Z"/><path d="m16 9 5 6m0-6-5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  pause: '<rect x="5.5" y="4" width="4.5" height="16" rx="1.5" fill="currentColor"/><rect x="14" y="4" width="4.5" height="16" rx="1.5" fill="currentColor"/>',
  check: '<path d="m5 12 4.5 4.5L19 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
};

export class Menu {
  onPlay?: (d: Difficulty) => void;
  onRetry?: () => void;
  onMenu?: () => void;
  onResume?: () => void;
  onPause?: () => void;
  onMute?: (muted: boolean) => void;
  onCharacters?: () => void;

  private readonly overlay: HTMLDivElement;
  private readonly screens: Record<Screen, HTMLElement>;
  private readonly pauseButton: HTMLButtonElement;
  private readonly modes: Record<Difficulty, HTMLButtonElement>;
  private readonly soundButtons: HTMLButtonElement[] = [];
  private readonly playButton: HTMLButtonElement;
  private readonly retryButton: HTMLButtonElement;
  private readonly resumeButton: HTMLButtonElement;
  private readonly soon: HTMLSpanElement;
  private readonly resultTitle: HTMLHeadingElement;
  private readonly cause: HTMLParagraphElement;
  private readonly record: HTMLSpanElement;
  private readonly timeLabel: HTMLSpanElement;
  private readonly progress: HTMLDivElement;
  private readonly fill: HTMLDivElement;
  private readonly botsLabel: HTMLSpanElement;
  private readonly bots: HTMLDivElement;
  private readonly best: HTMLSpanElement;
  private readonly resultMode: HTMLSpanElement;

  private screen: Screen | null = null;
  private difficulty: Difficulty = 'normal';
  private muted = false;
  private pauseVisible = false;
  private soonTimer = 0;

  constructor(parent: HTMLElement, private readonly L: Localize) {
    injectCss();
    installTap();
    this.overlay = element('div', parent, 'mnu-overlay');
    this.overlay.inert = true;

    const main = this.panel('mnu-main');
    const logo = element('h1', main, 'mnu-logo');
    element('span', logo, 'mnu-logo-top').textContent = L('КРУТИ', 'SPIN THE');
    element('span', logo, 'mnu-logo-bottom').textContent = L('ХАОС!', 'CHAOS!');
    const choices = element('div', main, 'mnu-choices');
    choices.setAttribute('role', 'group');
    choices.setAttribute('aria-label', L('Сложность', 'Difficulty'));
    this.modes = {
      easy: this.modeButton(choices, 'easy'),
      normal: this.modeButton(choices, 'normal'),
      chaos: this.modeButton(choices, 'chaos'),
    };
    this.playButton = button(main, 'mnu-primary mnu-play', L('ИГРАТЬ', 'PLAY'), () => this.onPlay?.(this.difficulty));
    const tools = element('div', main, 'mnu-tools');
    const characterSlot = element('div', tools, 'mnu-character-slot');
    const characters = button(characterSlot, 'mnu-blue mnu-characters', L('ПЕРСОНАЖИ', 'CHARACTERS'), () => this.showSoon());
    characters.prepend(icon('person'));
    this.soon = element('span', characterSlot, 'mnu-soon');
    this.soon.setAttribute('role', 'status');
    this.soundButton(tools);

    const result = this.panel('mnu-card mnu-result');
    this.record = element('span', result, 'mnu-record');
    this.record.textContent = L('НОВЫЙ РЕКОРД!', 'NEW RECORD!');
    this.resultTitle = element('h2', result, 'mnu-result-title');
    this.cause = element('p', result, 'mnu-cause');
    const stats = element('div', result, 'mnu-stats');
    this.timeLabel = element('span', stats, 'mnu-time');
    this.progress = element('div', stats, 'mnu-progress');
    this.progress.setAttribute('role', 'progressbar');
    this.progress.setAttribute('aria-valuemin', '0');
    this.fill = element('div', this.progress, 'mnu-fill');
    this.botsLabel = element('span', stats, 'mnu-bots-label');
    this.bots = element('div', stats, 'mnu-bots');
    this.bots.setAttribute('aria-hidden', 'true');
    const bestRow = element('div', result, 'mnu-best-row');
    this.best = element('span', bestRow, 'mnu-best');
    this.resultMode = element('span', bestRow, 'mnu-badge');
    const actions = element('div', result, 'mnu-actions');
    this.retryButton = button(actions, 'mnu-primary', L('ЕЩЁ РАЗ', 'PLAY AGAIN'), () => this.onRetry?.());
    button(actions, 'mnu-secondary', L('МЕНЮ', 'MENU'), () => this.onMenu?.());

    const pause = this.panel('mnu-card mnu-pause');
    const pauseTitle = element('h2', pause, 'mnu-pause-title');
    pauseTitle.textContent = L('ПАУЗА', 'PAUSED');
    this.resumeButton = button(pause, 'mnu-primary mnu-resume', L('ПРОДОЛЖИТЬ', 'RESUME'), () => this.onResume?.());
    const pauseActions = element('div', pause, 'mnu-actions');
    button(pauseActions, 'mnu-secondary', L('ЗАНОВО', 'RESTART'), () => this.onRetry?.());
    button(pauseActions, 'mnu-secondary', L('МЕНЮ', 'MENU'), () => this.onMenu?.());
    this.soundButton(pause);

    this.screens = { main, result, pause };
    this.pauseButton = button(parent, 'mnu-blue mnu-corner', '', () => this.onPause?.());
    this.pauseButton.setAttribute('aria-label', L('Пауза', 'Pause'));
    this.pauseButton.append(icon('pause'));
    this.syncPauseButton();

    document.addEventListener('keydown', (event) => this.handleKey(event));
  }

  showMain(d: Difficulty, muted: boolean): void {
    this.select(d);
    this.setMuted(muted);
    this.show('main', this.L('Крути хаос!', 'Spin the Chaos!'));
  }

  showResult(r: ResultInfo): void {
    const { L } = this;
    const result = this.screens.result;
    result.classList.toggle('mnu-win', r.win);
    this.resultTitle.textContent = r.title;
    this.cause.textContent = r.win ? '' : (r.cause ?? '');
    this.cause.hidden = !this.cause.textContent;
    this.record.hidden = !r.newBest;

    this.timeLabel.textContent = L(`Продержался ${r.time} из ${r.round} с`, `Survived ${r.time} of ${r.round} s`);
    const elapsed = Math.min(Math.max(r.time, 0), Math.max(r.round, 0));
    this.progress.setAttribute('aria-label', L('Время выживания', 'Survival time'));
    this.progress.setAttribute('aria-valuemax', String(r.round));
    this.progress.setAttribute('aria-valuenow', String(elapsed));
    this.progress.setAttribute('aria-valuetext', this.timeLabel.textContent);
    this.fill.style.setProperty('--mnu-progress', String(r.round > 0 ? elapsed / r.round : 0));

    this.botsLabel.textContent = L(`Выжили: ${r.botsAlive} из ${r.botsTotal} игроков`, `Survivors: ${r.botsAlive} of ${r.botsTotal} players`);
    this.bots.replaceChildren();
    this.bots.hidden = r.botsTotal === 0;
    for (let i = 0; i < r.botsTotal; i++) {
      const person = icon('person');
      if (i < r.botsAlive) person.classList.add('mnu-alive');
      this.bots.append(person);
    }
    this.best.textContent = L(`Рекорд: ${r.best} с`, `Best: ${r.best} s`);
    this.resultMode.className = `mnu-badge mnu-${r.difficulty}`;
    const [nameRu, nameEn] = MODES[r.difficulty].name;
    this.resultMode.textContent = L(nameRu, nameEn);

    // Обновление уже открытого итога тоже запускает заполнение и ленту с начала.
    result.classList.remove('mnu-celebrate');
    void result.offsetWidth;
    result.classList.add('mnu-celebrate');
    this.show('result', r.title);
  }

  showPause(muted: boolean): void {
    this.setMuted(muted);
    this.show('pause', this.L('Пауза', 'Paused'));
  }

  hide(): void {
    this.clearSoon();
    this.screen = null;
    this.overlay.inert = true;
    this.overlay.classList.remove('mnu-visible');
    this.syncPauseButton();
  }

  get open(): boolean { return this.screen !== null; }

  setPauseButton(visible: boolean): void {
    this.pauseVisible = visible;
    this.syncPauseButton();
  }

  private panel(classes: string): HTMLElement {
    const panel = element('section', this.overlay, `mnu-panel ${classes}`);
    panel.hidden = true;
    panel.tabIndex = -1;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    return panel;
  }

  private show(screen: Screen, label: string): void {
    if (screen !== 'main') this.clearSoon();
    this.screen = screen;
    for (const panel of Object.values(this.screens)) panel.hidden = panel !== this.screens[screen];
    const panel = this.screens[screen];
    panel.setAttribute('aria-label', label);
    this.overlay.inert = false;
    this.overlay.classList.add('mnu-visible');
    this.syncPauseButton();
    panel.focus({ preventScroll: true });
  }

  private syncPauseButton(): void {
    this.pauseButton.hidden = !this.pauseVisible || this.open;
  }

  private modeButton(parent: HTMLElement, mode: Difficulty): HTMLButtonElement {
    const choice = button(parent, `mnu-choice mnu-${mode}`, '', () => this.select(mode));
    const { name: [nameRu, nameEn], hint: [hintRu, hintEn] } = MODES[mode];
    choice.append(icon(mode));
    element('span', choice, 'mnu-mode-name').textContent = this.L(nameRu, nameEn);
    element('span', choice, 'mnu-mode-hint').textContent = this.L(hintRu, hintEn);
    element('span', choice, 'mnu-check').append(icon('check'));
    return choice;
  }

  private select(difficulty: Difficulty): void {
    this.difficulty = difficulty;
    for (const mode of DIFFICULTIES) this.modes[mode].setAttribute('aria-pressed', String(mode === difficulty));
  }

  private soundButton(parent: HTMLElement): void {
    const sound = button(parent, 'mnu-blue mnu-sound', '', () => {
      this.setMuted(!this.muted);
      this.onMute?.(this.muted);
    });
    this.soundButtons.push(sound);
  }

  private setMuted(muted: boolean): void {
    this.muted = muted;
    for (const sound of this.soundButtons) {
      sound.setAttribute('aria-label', this.L('Звук выключен', 'Sound muted'));
      sound.setAttribute('aria-pressed', String(muted));
      sound.replaceChildren(icon(muted ? 'muted' : 'sound'));
    }
  }

  private showSoon(): void {
    this.clearSoon();
    this.soon.textContent = this.L('Скоро!', 'Soon!');
    this.soonTimer = window.setTimeout(() => this.clearSoon(), 1500);
    this.onCharacters?.();
  }

  private clearSoon(): void {
    clearTimeout(this.soonTimer);
    this.soon.textContent = '';
  }

  private handleKey(event: KeyboardEvent): void {
    if (event.defaultPrevented || event.isComposing || event.altKey || event.ctrlKey || event.metaKey) return;
    const { key } = event;
    if (key === 'Tab' && this.screen) {
      this.wrapFocus(event, this.screens[this.screen]);
      return;
    }

    let action: HTMLButtonElement | undefined;
    if (key === 'Escape') {
      if (this.screen === 'pause') action = this.resumeButton;
      if (!this.open && this.pauseVisible) action = this.pauseButton;
    } else if (key === 'Enter' || key === ' ') {
      if (!this.screen) return;
      // Tab оставляет нативное действие выбранной кнопке, а фон экрана запускает раунд.
      const focused = document.activeElement;
      if (focused instanceof HTMLButtonElement && focused.matches(':focus-visible') && this.screens[this.screen].contains(focused)) {
        event.stopPropagation();
        if (event.repeat) event.preventDefault();
        return;
      }
      if (this.screen === 'main') action = this.playButton;
      if (this.screen === 'result' && key === 'Enter') action = this.retryButton;
    }
    if (!action) return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) action.click();
  }

  private wrapFocus(event: KeyboardEvent, panel: HTMLElement): void {
    const buttons = panel.querySelectorAll<HTMLButtonElement>('button:not(:disabled)');
    const focused = document.activeElement;
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    if (event.shiftKey ? focused === first || focused === panel : focused === last) {
      event.preventDefault();
      (event.shiftKey ? last : first)?.focus();
    }
  }
}

function element<K extends keyof HTMLElementTagNameMap>(tag: K, parent: HTMLElement, classes: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  node.className = classes;
  parent.append(node);
  return node;
}

function button(parent: HTMLElement, classes: string, label: string, onClick: () => void): HTMLButtonElement {
  const node = element('button', parent, `mnu-button ${classes}`);
  node.type = 'button';
  node.textContent = label;
  node.addEventListener('click', (event) => {
    // После клика мышью горячая клавиша снова действует на экран целиком.
    if (event.detail > 0 && document.activeElement === node) {
      node.closest<HTMLElement>('.mnu-panel')?.focus({ preventScroll: true });
    }
    onClick();
  });
  return node;
}

function icon(name: keyof typeof ICONS): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.innerHTML = ICONS[name];
  return svg;
}

let cssDone = false;
function injectCss(): void {
  if (cssDone) return;
  cssDone = true;
  const style = document.createElement('style');
  style.textContent = `
/* Локальная единица не меняет масштаб остальных слоёв игры. */
.mnu-overlay,.mnu-corner {
  --u:min(1vw,1vh,8px); --u:min(1vw,1dvh,8px);
  --mnu-ink:#182d58; --mnu-blue:#2456a2;
  font:900 clamp(13px,calc(3.1 * var(--u)),25px)/1.15 Rubik,"Arial Black",system-ui,sans-serif;
  box-sizing:border-box;
}
.mnu-overlay {
  position:absolute; inset:0; z-index:21; display:grid; grid-template-columns:minmax(0,1fr); place-items:center;
  padding:calc(env(safe-area-inset-top) + 12px) calc(env(safe-area-inset-right) + 12px)
    calc(env(safe-area-inset-bottom) + 12px) calc(env(safe-area-inset-left) + 12px);
  background:linear-gradient(180deg,#0d234b9e,#091b42c7);
  opacity:0; visibility:hidden; pointer-events:none;
  transition:opacity .18s ease-in,visibility 0s .18s;
}
.mnu-overlay * { box-sizing:border-box; }
.mnu-overlay [hidden],.mnu-corner[hidden] { display:none; }
.mnu-overlay.mnu-visible { opacity:1; visibility:visible; pointer-events:auto; transition:opacity .16s ease-out; }
.mnu-panel { min-width:0; max-width:100%; text-align:center; overflow-wrap:anywhere; }
.mnu-panel:focus { outline:none; }
.mnu-visible .mnu-panel { animation:mnu-pop .3s cubic-bezier(.2,.7,.35,1) both; }
@keyframes mnu-pop { 0% { transform:scale(.93); } 72% { transform:scale(1.025); } 100% { transform:scale(1); } }
.mnu-panel h1,.mnu-panel h2,.mnu-panel p { margin:0; }
.mnu-panel h1,.mnu-panel h2 { font-weight:900; }
.mnu-main {
  width:calc(116 * var(--u)); display:grid; justify-items:center;
  gap:clamp(10px,calc(3.6 * var(--u)),30px); color:#fff;
}
.mnu-logo {
  font-size:clamp(36px,min(calc(15 * var(--u)),17vw),116px); line-height:.87;
  letter-spacing:-.045em; transform:rotate(-4deg);
  -webkit-text-stroke:clamp(4px,calc(1.35 * var(--u)),11px) #13264c;
  paint-order:stroke fill; text-shadow:0 calc(1.25 * var(--u)) #13264c;
}
.mnu-visible .mnu-logo { animation:mnu-sway 3.6s ease-in-out infinite; }
.mnu-logo span { display:block; }
.mnu-logo-bottom { color:#ffdc48; }
@keyframes mnu-sway { 0%,100% { transform:rotate(-4deg); } 50% { transform:rotate(-1deg) translateY(-3px); } }
.mnu-choices {
  width:100%; display:grid; grid-template-columns:repeat(3,minmax(0,1fr));
  gap:clamp(6px,calc(2 * var(--u)),16px); margin-top:4px;
}
.mnu-button {
  min-width:44px; min-height:44px; padding:clamp(6px,calc(1.65 * var(--u)),14px) clamp(8px,calc(2.4 * var(--u)),20px);
  display:inline-flex; align-items:center; justify-content:center; gap:.4em;
  color:inherit; font:inherit; text-align:center; overflow-wrap:anywhere; cursor:pointer;
  border:clamp(2px,calc(.65 * var(--u)),5px) solid #fff;
  border-radius:clamp(12px,calc(3 * var(--u)),24px);
  touch-action:manipulation;
}
/* При появлении панели её масштаб успевает уменьшить и саму область нажатия. */
.mnu-panel .mnu-button { min-width:48px; min-height:48px; }
.mnu-button:focus-visible { outline:3px solid #fff; outline-offset:3px; box-shadow:0 0 0 7px var(--mnu-ink); }
.mnu-button:active { translate:0 2px; }
.mnu-button svg { width:clamp(21px,calc(5 * var(--u)),40px); height:auto; flex:none; pointer-events:none; }
.mnu-easy { --mnu-mode-light:#348748; --mnu-mode-dark:#216337; }
.mnu-normal { --mnu-mode-light:#356bc1; --mnu-mode-dark:#244a97; }
.mnu-chaos { --mnu-mode-light:#c45636; --mnu-mode-dark:#a52f22; }
.mnu-choice {
  position:relative; min-width:0; flex-direction:column; justify-content:flex-start;
  padding-inline:clamp(4px,calc(1.8 * var(--u)),14px); gap:clamp(3px,var(--u),8px);
  background:linear-gradient(var(--mnu-mode-light),var(--mnu-mode-dark));
  border-color:#c5d5e7; filter:saturate(.75); box-shadow:0 4px #142848;
  transition:transform .18s,filter .18s,border-color .18s;
}
.mnu-choice[aria-pressed="true"] {
  transform:translateY(clamp(-7px,calc(-1.2 * var(--u)),-4px));
  border-color:#fff; filter:saturate(1.25) brightness(1.09);
  box-shadow:0 5px var(--mnu-mode-dark),0 0 0 2px var(--mnu-ink);
}
.mnu-choice > svg { width:clamp(24px,calc(7 * var(--u)),56px); }
.mnu-mode-name { font-size:clamp(12px,min(calc(5.1 * var(--u)),3.8vw),37px); line-height:1; overflow-wrap:normal; white-space:nowrap; }
.mnu-mode-hint { font-size:clamp(13px,calc(3.1 * var(--u)),24px); font-weight:700; }
.mnu-check {
  display:none; position:absolute; top:-6px; right:-5px; width:clamp(17px,calc(4 * var(--u)),32px);
  aspect-ratio:1; place-items:center; color:#1b3c6a; background:#fff; border-radius:50%;
}
.mnu-check svg { width:72%; }
.mnu-choice[aria-pressed="true"] .mnu-check { display:grid; }
.mnu-primary {
  background:linear-gradient(#ffe56c,#ffd047 48%,#f5ad22); color:#512a06;
  box-shadow:0 clamp(4px,var(--u),8px) #a9680e;
  font-size:clamp(17px,calc(5 * var(--u)),40px);
}
.mnu-panel .mnu-play { width:min(100%,calc(64 * var(--u))); min-height:clamp(52px,calc(14 * var(--u)),112px); font-size:clamp(25px,calc(8 * var(--u)),64px); }
.mnu-visible .mnu-play { animation:mnu-pulse 1.8s ease-in-out infinite; }
@keyframes mnu-pulse { 0%,100% { scale:1; } 50% { scale:1.045; } }
.mnu-secondary { background:#fff; border-color:var(--mnu-blue); color:#1c427b; box-shadow:0 4px #b9cbe8; }
.mnu-blue { background:linear-gradient(#386fbd,#244d91); color:#fff; box-shadow:0 4px #13264c; }
.mnu-tools { display:flex; align-items:center; justify-content:center; gap:clamp(8px,calc(2 * var(--u)),16px); }
.mnu-character-slot { position:relative; }
.mnu-panel .mnu-characters,.mnu-panel .mnu-sound { min-height:clamp(48px,calc(10 * var(--u)),80px); }
.mnu-sound { width:clamp(48px,calc(10 * var(--u)),80px); padding:0; }
.mnu-soon {
  position:absolute; z-index:1; bottom:calc(100% + 6px); left:50%; transform:translateX(-50%);
  padding:.35em .8em; border:2px solid #fff; border-radius:12px; background:#17396d; color:#fff;
  white-space:nowrap; pointer-events:none;
}
.mnu-soon:empty { padding:0; border:0; opacity:0; }
.mnu-corner {
  position:absolute; z-index:20; top:calc(env(safe-area-inset-top) + max(8px,2.2 * var(--u)));
  right:calc(env(safe-area-inset-right) + max(8px,2.2 * var(--u))); border-radius:50%; padding:0;
  width:clamp(44px,calc(10 * var(--u)),80px); height:clamp(44px,calc(10 * var(--u)),80px);
}
.mnu-card {
  position:relative; width:calc(96 * var(--u)); display:grid; justify-items:center;
  gap:clamp(7px,calc(2.15 * var(--u)),18px); padding:clamp(12px,calc(4.5 * var(--u)),36px);
  border:clamp(3px,calc(.8 * var(--u)),6px) solid #fff; border-radius:clamp(18px,calc(5 * var(--u)),40px);
  background:linear-gradient(#fff,#eaf4ff); color:var(--mnu-ink);
  box-shadow:0 0 0 2px var(--mnu-blue),0 clamp(5px,calc(1.2 * var(--u)),10px) #12284e;
}
.mnu-result:has(.mnu-record:not([hidden])) { padding-top:clamp(22px,calc(5.5 * var(--u)),44px); }
.mnu-panel h2 { font-size:clamp(23px,calc(7.4 * var(--u)),59px); line-height:1; color:#b32734; }
.mnu-win .mnu-result-title { color:#21733c; }
.mnu-panel .mnu-pause-title { color:#1d4688; }
.mnu-cause { font-weight:700; color:#8c3340; }
.mnu-stats { display:grid; width:100%; min-width:0; justify-items:center; gap:clamp(4px,var(--u),8px); }
.mnu-progress {
  width:100%; height:clamp(12px,calc(2.7 * var(--u)),22px); overflow:hidden;
  background:#c9ddf6; border:2px solid var(--mnu-blue); border-radius:999px;
}
.mnu-fill {
  height:100%; border-radius:inherit; transform-origin:left; transform:scaleX(var(--mnu-progress,0));
  background:linear-gradient(#ffe481,#f5a91e);
}
.mnu-win .mnu-fill { background:linear-gradient(#a4ed7b,#36ab62); }
.mnu-visible .mnu-celebrate .mnu-fill { animation:mnu-fill .6s ease-out both; }
@keyframes mnu-fill { from { transform:scaleX(0); } }
.mnu-bots-label { margin-top:3px; }
.mnu-bots { display:flex; flex-wrap:wrap; justify-content:center; gap:3px; color:#7d8ba0; }
.mnu-bots svg { width:clamp(14px,calc(4 * var(--u)),30px); height:auto; }
.mnu-bots .mnu-alive { color:#1d8051; }
.mnu-best-row { display:flex; justify-content:center; align-items:center; flex-wrap:wrap; gap:.4em; }
.mnu-badge { border-radius:999px; padding:.25em .65em; color:#fff; background:var(--mnu-mode-dark); }
.mnu-record {
  position:absolute; top:0; left:50%; width:max-content; max-width:96%;
  transform:translate(-50%,-54%) rotate(-5deg); padding:.35em .8em;
  border:2px solid #fff; border-radius:8px; color:#5b2c05;
  background:linear-gradient(#ffe879,#ffbd35); box-shadow:0 3px #a95a13;
}
.mnu-visible .mnu-celebrate .mnu-record { animation:mnu-record .38s cubic-bezier(.2,.8,.4,1.35) both; }
@keyframes mnu-record { from { transform:translate(-50%,-54%) rotate(-12deg) scale(.45); opacity:0; } }
.mnu-actions { display:grid; grid-template-columns:minmax(48px,1.45fr) minmax(48px,1fr); width:100%; gap:clamp(7px,calc(1.6 * var(--u)),13px); }
.mnu-pause .mnu-actions { grid-template-columns:repeat(2,minmax(48px,1fr)); }
.mnu-resume { width:100%; }
@media (orientation:landscape) and (max-height:430px) {
  /* В низком альбоме оставляем высоту целям нажатия и трём карточкам в ряд. */
  .mnu-main { gap:9px; }
  .mnu-logo { font-size:clamp(34px,calc(12 * var(--u)),52px); }
  .mnu-panel .mnu-play { min-height:48px; }
  .mnu-card { gap:7px; padding-inline:clamp(10px,calc(3.5 * var(--u)),16px); padding-bottom:11px; }
}
@media (prefers-reduced-motion:reduce) {
  .mnu-overlay,.mnu-visible,.mnu-choice { transition:none; }
  .mnu-visible .mnu-panel,.mnu-visible .mnu-logo,.mnu-visible .mnu-play,
  .mnu-visible .mnu-celebrate .mnu-fill,.mnu-visible .mnu-celebrate .mnu-record { animation:none; }
}
`;
  document.head.append(style);
}
