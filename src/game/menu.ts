import { installTap } from '../engine/tap.ts';
import { sfx } from '../engine/sfx.ts';
import { addUiImage, coinBadge, uiIcon } from './characters.ts';
import { charById } from './roster.ts';
import { rewardedAvailable } from '../ads.ts';
// В DOM размеры — CSS-пиксели: fontPx/tapSize из yg-core умножают на плотность экрана (они для canvas),
// на телефоне с DPR 3 кнопки и шрифт раздувались втрое (заказчик: «пауза громадная, текст не вмещается»).

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
  coins: number;
  total: number;
  /** Можно ожить за ролик (раз за попытку, только при гибели, только если у площадки есть ролики). */
  canRevive?: boolean;
}

type Screen = 'main' | 'result' | 'pause';
type Localize = (ru: string, en: string) => string;

const MODES = {
  easy: { name: ['Лёгкий', 'Easy'], hint: ['5 сердечек, всё медленнее', '5 hearts, slower chaos'] },
  normal: { name: ['Обычный', 'Normal'], hint: ['4 сердечка', '4 hearts'] },
  chaos: { name: ['Хаос', 'Chaos'], hint: ['3 сердечка, всё быстрее!', '3 hearts, faster chaos!'] },
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
  hills: '<path fill="#9fe36a" d="M1 20 8 9l4 5 3-4 8 10Z"/><path fill="#fff" d="m8 9 2 3H6Z"/>',
  pyramid: '<path fill="#ffd77a" d="M12 4 22 20H2Z"/><path d="M5.5 15h13M8 11h8" stroke="#c99e58" stroke-width="1.6"/>',
  book: '<path fill="currentColor" d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v16H6.5a1.5 1.5 0 0 0 0 3H20v1H6.5A2.5 2.5 0 0 1 4 19.5Z"/><path d="M12 6.5v3m0 2.6v.4" stroke="#1580e8" stroke-width="2.4" stroke-linecap="round"/>',
};

export class Menu {
  onPlay?: (d: Difficulty) => void;
  onRetry?: () => void;
  onMenu?: () => void;
  onResume?: () => void;
  onPause?: () => void;
  onMute?: (muted: boolean) => void;
  onCharacters?: () => void;
  onEncyclopedia?: () => void;
  onMap?: (m: 'hills' | 'pyramid') => void;
  private map: 'hills' | 'pyramid' = 'hills';
  private mapButton!: HTMLButtonElement;
  private mapTip!: HTMLSpanElement;
  onDouble?: () => Promise<boolean>;
  onRevive?: () => Promise<boolean>;

  private readonly overlay: HTMLDivElement;
  private readonly screens: Record<Screen, HTMLElement>;
  private readonly pauseButton: HTMLButtonElement;
  private readonly modes: Record<Difficulty, HTMLButtonElement>;
  private readonly soundButtons: HTMLButtonElement[] = [];
  private readonly playButton: HTMLButtonElement;
  private readonly retryButton: HTMLButtonElement;
  private readonly resumeButton: HTMLButtonElement;
  private readonly charactersButton: HTMLButtonElement;
  private readonly balances: readonly HTMLSpanElement[];
  private readonly rewardAmount: HTMLSpanElement;
  private readonly doubleButton: HTMLButtonElement;
  private readonly reviveButton: HTMLButtonElement;
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
  private coins = 0;
  private skin?: string;
  private reward = 0;
  private rewardTimer = 0;
  private resultVersion = 0;

  constructor(parent: HTMLElement, private readonly L: Localize) {
    injectCss();
    installTap();
    this.overlay = element('div', parent, 'mnu-overlay');
    this.overlay.inert = true;
    // щелчок на любую кнопку меню (и карточки сложности) — одним слушателем
    this.overlay.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('button')) sfx.play('click', 0.05); });

    const main = this.panel('mnu-main');
    const balance = coinBadge(this.overlay, 'mnu-main-wallet', L('Монеты', 'Coins'));
    const logo = element('h1', main, 'mnu-logo');
    const logoText = element('span', logo, 'mnu-logo-text');
    element('span', logoText, 'mnu-logo-top').textContent = L('КРУТИ', 'SPIN THE');
    element('span', logoText, 'mnu-logo-bottom').textContent = L('ХАОС!', 'CHAOS!');
    logo.setAttribute('aria-label', L('Крути хаос!', 'Spin the Chaos!'));
    addArt(logo, L('logo', 'logo_en'), logoText);   // свой рисованный логотип на каждый язык
    const choices = element('div', main, 'mnu-choices');
    choices.setAttribute('role', 'group');
    choices.setAttribute('aria-label', L('Сложность', 'Difficulty'));
    this.modes = {
      easy: this.modeButton(choices, 'easy'),
      normal: this.modeButton(choices, 'normal'),
      chaos: this.modeButton(choices, 'chaos'),
    };
    const playSlot = element('div', main, 'mnu-play-slot');
    this.playButton = button(playSlot, 'mnu-primary mnu-play', L('ИГРАТЬ', 'PLAY'), () => this.onPlay?.(this.difficulty));
    const tools = element('div', main, 'mnu-tools');
    this.charactersButton = button(tools, 'mnu-blue mnu-characters', '', () => this.onCharacters?.());
    this.charactersButton.setAttribute('aria-label', L('Персонажи', 'Characters'));
    // выбор карты (просьба заказчика: «рядом с персонажами»): нажатие — следующая карта, арена за меню сразу меняется
    this.mapButton = button(tools, 'mnu-blue mnu-characters mnu-map', '', () => {
      this.setMap(this.map === 'hills' ? 'pyramid' : 'hills', true);
      this.onMap?.(this.map);
    });
    this.mapTip = element('span', tools, 'mnu-map-tip');
    this.mapTip.setAttribute('aria-live', 'polite');
    this.setMap('hills');
    // «Энциклопедия хаоса»: всё, что выпадало на барабане
    const book = button(tools, 'mnu-blue mnu-characters mnu-book', '', () => this.onEncyclopedia?.());
    book.append(icon('book'));
    book.setAttribute('aria-label', L('Энциклопедия хаоса', 'Chaos encyclopedia'));
    this.soundButton(tools);

    const result = this.panel('mnu-card mnu-result');
    this.resultTitle = element('h2', result, 'mnu-result-title');
    this.record = element('span', result, 'mnu-record');
    this.record.textContent = L('НОВЫЙ РЕКОРД!', 'NEW RECORD!');
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
    const rewards = element('div', result, 'mnu-rewards');
    const earned = element('span', rewards, 'mnu-earned');
    earned.setAttribute('role', 'group');
    earned.setAttribute('aria-label', L('Монеты за раунд', 'Coins earned this round'));
    this.rewardAmount = element('span', earned, 'mnu-earned-amount');
    earned.append(uiIcon('coin'));
    this.doubleButton = button(rewards, 'mnu-blue mnu-double', L('×2', '×2'), () => { void this.doubleReward(); });
    this.doubleButton.append(uiIcon('ad'));
    this.balances = [balance, coinBadge(rewards, 'mnu-result-wallet', L('Всего монет', 'Total coins'))];
    // «Ожить за ролик» — над обычными кнопками, по желанию игрока (Playgama 2.2: только опция, раз за попытку)
    this.reviveButton = button(result, 'mnu-blue mnu-revive', L('ОЖИТЬ', 'REVIVE'), () => { void this.revive(); });
    this.reviveButton.append(uiIcon('ad'));
    this.reviveButton.setAttribute('aria-label', L('Ожить за рекламный ролик', 'Watch an ad to revive'));
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
    this.pauseButton = button(parent, 'mnu-blue mnu-corner', '', () => { sfx.play('click', 0.05); this.onPause?.(); });
    this.pauseButton.setAttribute('aria-label', L('Пауза', 'Pause'));
    this.pauseButton.append(icon('pause'));
    this.syncPauseButton();

    document.addEventListener('keydown', (event) => this.handleKey(event));
  }

  showMain(d: Difficulty, muted: boolean, coins: number, skin: string): void {
    this.select(d);
    this.setMuted(muted);
    this.show('main', this.L('Крути хаос!', 'Spin the Chaos!'));
    this.setCoins(coins);
    const id = charById(skin).id;
    if (id !== this.skin) {
      this.skin = id;
      const portrait = element('span', this.charactersButton, 'mnu-art');
      portrait.setAttribute('aria-hidden', 'true');
      addUiImage(portrait, `chars/${id}`, portrait.appendChild(icon('person')));
      this.charactersButton.replaceChildren(portrait);
    }
  }

  setCoins(n: number): void {
    const grew = n > this.coins;
    this.coins = n;
    for (const balance of this.balances) {
      balance.textContent = String(n);
      if (grew && balance.getClientRects().length) this.bounce(balance);
    }
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
    this.resultVersion++;
    this.doubleButton.hidden = r.coins === 0 || !rewardedAvailable();   // нет роликов у площадки — нет и кнопки (Playgama 2.2)
    this.reviveButton.hidden = !r.canRevive || !rewardedAvailable();
    this.reviveButton.disabled = false;
    this.setDoubleWaiting(false);

    // Обновление уже открытого итога тоже запускает заполнение и ленту с начала.
    result.classList.remove('mnu-celebrate');
    void result.offsetWidth;
    result.classList.add('mnu-celebrate');
    this.show('result', r.title);
    this.setCoins(r.total);
    this.countReward(r.coins);
  }

  showPause(muted: boolean): void {
    this.setMuted(muted);
    this.show('pause', this.L('Пауза', 'Paused'));
  }

  hide(): void {
    window.clearInterval(this.rewardTimer);
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
    if (screen !== 'result') window.clearInterval(this.rewardTimer);
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
    element('span', choice, 'mnu-mode-name').textContent = this.L(nameRu, nameEn);
    choice.append(artIcon(mode, mode));
    element('span', choice, 'mnu-mode-hint').textContent = this.L(hintRu, hintEn);
    element('span', choice, 'mnu-check').append(icon('check'));
    return choice;
  }

  private select(difficulty: Difficulty): void {
    this.difficulty = difficulty;
    for (const mode of DIFFICULTIES) this.modes[mode].setAttribute('aria-pressed', String(mode === difficulty));
  }

  /** Карта на кнопке; tip — показать подпись с названием на пару секунд. */
  setMap(m: 'hills' | 'pyramid', tip = false): void {
    this.map = m;
    const name = m === 'hills' ? this.L('Холмы', 'Hills') : this.L('Пирамида', 'Pyramid');
    this.mapButton.replaceChildren(icon(m));
    this.mapButton.setAttribute('aria-label', this.L(`Карта: ${name}. Сменить`, `Map: ${name}. Change`));
    this.mapTip.textContent = this.L(`Карта: ${name}`, `Map: ${name}`);
    if (tip) {
      this.mapTip.classList.remove('show'); void this.mapTip.offsetWidth; this.mapTip.classList.add('show');
      window.clearTimeout(this.mapTipTimer);
      this.mapTipTimer = window.setTimeout(() => this.mapTip.classList.remove('show'), 1800);
    }
  }
  private mapTipTimer = 0;

  private soundButton(parent: HTMLElement): void {
    const sound = button(parent, 'mnu-sound', '', () => {
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
      sound.replaceChildren(artIcon(muted ? 'mute' : 'sound', muted ? 'muted' : 'sound'));
    }
  }

  private showReward(amount: number): void {
    this.rewardAmount.textContent = this.L(`+${amount}`, `+${amount}`);
  }

  private countReward(amount: number): void {
    window.clearInterval(this.rewardTimer);
    this.reward = amount;
    this.rewardAmount.getAnimations().forEach((animation) => animation.cancel());
    if (!amount || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.showReward(amount);
      return;
    }
    this.showReward(0);
    const start = performance.now();
    this.rewardTimer = window.setInterval(() => {
      const fraction = Math.min(1, (performance.now() - start) / 600);
      this.showReward(Math.floor(amount * fraction));
      if (fraction === 1) window.clearInterval(this.rewardTimer);
    }, 24);
  }

  private setDoubleWaiting(waiting: boolean): void {
    this.doubleButton.disabled = waiting;
    this.doubleButton.setAttribute('aria-busy', String(waiting));
    this.doubleButton.setAttribute('aria-label', waiting
      ? this.L('Ждём рекламный ролик', 'Waiting for the ad')
      : this.L('Удвоить монеты за ролик', 'Watch an ad to double your coins'));
  }

  private async doubleReward(): Promise<void> {
    if (this.screen !== 'result' || this.doubleButton.hidden || this.doubleButton.disabled || !this.onDouble) return;
    const version = this.resultVersion;
    this.setDoubleWaiting(true);
    let doubled = false;
    try {
      doubled = await this.onDouble();
    } catch {
      // Ролик может прерваться, тогда награду можно запросить ещё раз.
    }
    // Завершившийся ролик не должен менять итог следующего раунда.
    if (version !== this.resultVersion || this.screen !== 'result') return;
    this.setDoubleWaiting(false);
    if (!doubled) return;
    window.clearInterval(this.rewardTimer);
    this.showReward(this.reward * 2);
    this.bounce(this.rewardAmount);
    this.doubleButton.hidden = true;
  }

  private async revive(): Promise<void> {
    if (this.screen !== 'result' || this.reviveButton.hidden || this.reviveButton.disabled || !this.onRevive) return;
    this.reviveButton.disabled = true;
    let ok = false;
    try { ok = await this.onRevive(); } catch { /* ролик сорвался — кнопка снова доступна */ }
    if (!ok) this.reviveButton.disabled = false;
  }

  private bounce(target: HTMLElement): void {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    target.getAnimations().forEach((animation) => animation.cancel());
    target.animate([
      { transform: 'translateY(0) scale(1)' },
      { transform: 'translateY(-.28em) scale(1.18)', offset: 0.42 },
      { transform: 'translateY(0) scale(1)' },
    ], { duration: 380, easing: 'ease-out' });
  }

  private handleKey(event: KeyboardEvent): void {
    if (event.defaultPrevented || event.isComposing || event.altKey || event.ctrlKey || event.metaKey) return;
    const { key } = event;
    if (key === 'Tab' && this.screen) {
      this.wrapFocus(event, this.screens[this.screen]);
      return;
    }

    let action: HTMLButtonElement | undefined;
    // Пауза — клавиша P (Esc занимать нельзя: Playgama 1.5.2, им выходят из полноэкранного режима)
    if (event.code === 'KeyP') {
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

function artIcon(name: string, fallback: keyof typeof ICONS): HTMLSpanElement {
  const slot = document.createElement('span');
  slot.className = 'mnu-art';
  slot.setAttribute('aria-hidden', 'true');
  const svg = slot.appendChild(icon(fallback));
  addArt(slot, `icons/${name}`, svg);
  return slot;
}

function addArt(slot: HTMLElement, path: string, fallback: HTMLElement | SVGSVGElement): void {
  // Заглушка остаётся видна, пока картинка не загрузилась.
  addUiImage(slot, `ui/${path}`, fallback);
}

let cssDone = false;
function injectCss(): void {
  if (cssDone) return;
  cssDone = true;
  const style = document.createElement('style');
  style.textContent = `
.mnu-overlay,.mnu-corner {
  --u:min(1vh,8px); --u:min(1dvh,8px);
  --ink:#2a1250; --line:clamp(3px,calc(.68 * var(--u)),6px);
  --depth:clamp(4px,calc(.95 * var(--u)),8px);
  --min-font:max(13px,13px); --tap:48px;
  font:900 clamp(var(--min-font),calc(2.6 * var(--u)),22px)/1.12 Nunito,"Arial Black",system-ui,sans-serif;
  box-sizing:border-box;
}
.mnu-overlay {
  position:absolute; inset:0; z-index:21; display:grid; grid-template:minmax(0,1fr)/minmax(0,1fr); place-items:center;
  padding:calc(env(safe-area-inset-top) + 10px) calc(env(safe-area-inset-right) + 12px)
    calc(env(safe-area-inset-bottom) + 16px) calc(env(safe-area-inset-left) + 12px);
  background:radial-gradient(ellipse at 50% 47%,transparent 25%,#1e12503b 100%);
  opacity:0; visibility:hidden; pointer-events:none;
  transition:opacity .18s ease-in,visibility 0s .18s;
}
.mnu-overlay:has(.mnu-card:not([hidden])) { background:radial-gradient(ellipse,#25134732,#190f4366); }
.mnu-overlay * { box-sizing:border-box; }
.mnu-overlay [hidden],.mnu-corner[hidden] { display:none; }
.mnu-overlay.mnu-visible { opacity:1; visibility:visible; pointer-events:auto; transition:opacity .16s ease-out; }
.mnu-panel { min-width:0; max-width:100%; text-align:center; }
.mnu-panel:focus { outline:none; }
.mnu-visible .mnu-panel { animation:mnu-pop .3s cubic-bezier(.2,.7,.35,1) both; }
@keyframes mnu-pop { 0% { transform:scale(.94); } 72% { transform:scale(1.015); } 100% { transform:scale(1); } }
.mnu-panel h1,.mnu-panel h2,.mnu-panel p { margin:0; }
.mnu-panel h1,.mnu-panel h2 { font-weight:900; }
.mnu-main {
  width:min(100%,calc(107 * var(--u)),840px); height:94%; display:grid; justify-items:center;
  grid-template-rows:auto auto minmax(0,1fr) auto auto; row-gap:clamp(9px,calc(2 * var(--u)),17px);
  color:#fff;
}
.mnu-main::before { content:''; grid-row:3; }
.mnu-logo {
  /* 42vh — на коротком экране (телефон с адресной строкой) логотип уступает место кнопкам */
  width:min(81%,calc(55 * var(--u)),460px,42vh); aspect-ratio:3/2; display:grid; place-items:center;
  font-size:clamp(30px,min(calc(12.8 * var(--u)),13vw),105px); line-height:.88;
  text-align:center; white-space:nowrap;
  -webkit-text-stroke:clamp(5px,calc(1.4 * var(--u)),12px) #36104f;
  paint-order:stroke fill; text-shadow:0 calc(1.25 * var(--u)) #36104f;
}
.mnu-logo img { width:100%; height:100%; object-fit:contain; }
.mnu-logo span { display:block; }
.mnu-logo-top { color:#ffdb44; }
.mnu-logo-bottom { color:#ff5195; }
.mnu-visible .mnu-logo { animation:mnu-sway 4s ease-in-out infinite; }
@keyframes mnu-sway { 0%,100% { transform:rotate(-2deg); } 50% { transform:translateY(-3px) rotate(1deg) scale(1.02); } }
.mnu-choices {
  width:100%; display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); container-type:inline-size;
  gap:clamp(7px,calc(2.1 * var(--u)),18px); margin-top:clamp(5px,var(--u),8px);
}
.mnu-button {
  --shine:linear-gradient(#ffffffbd,#ffffff24);
  --light:#ff438b; --dark:#e0186a; --base:#861344;
  position:relative; isolation:isolate; min-width:var(--tap); min-height:var(--tap);
  padding:clamp(5px,calc(1.2 * var(--u)),11px) clamp(7px,calc(2.1 * var(--u)),17px);
  display:inline-flex; align-items:center; justify-content:center; gap:.35em;
  background:linear-gradient(var(--light),var(--dark) 72%);
  border:var(--line) solid var(--ink); border-radius:clamp(15px,calc(3.8 * var(--u)),32px);
  box-shadow:inset 0 2px 0 #ffffffa8,inset 0 -3px 0 #2d06382e,0 var(--depth) 0 var(--base),0 calc(var(--depth) + 2px) 0 var(--ink);
  color:#fff; font:inherit; text-align:center; cursor:pointer; touch-action:manipulation;
  -webkit-text-stroke:clamp(2px,calc(.52 * var(--u)),4px) var(--ink);
  paint-order:stroke fill; text-shadow:0 2px var(--ink);
  transition:translate .12s,transform .18s,box-shadow .12s;
}
.mnu-button::before {
  content:''; position:absolute; z-index:-1; pointer-events:none; inset:3px 7% auto;
  height:34%; border-radius:inherit; background:var(--shine); opacity:.75;
}
/* зона нажатия = кнопка вместе с нарисованной «толщиной» снизу и полями вокруг: на телефоне палец попадает в низ кнопки */
.mnu-button::after { content:''; position:absolute; inset:-5px -5px calc(-1 * var(--depth) - 9px); border-radius:inherit; }
.mnu-button:focus-visible { outline:3px solid #fff; outline-offset:3px; }
.mnu-button:active {
  translate:0 calc(var(--depth) * .7);
  box-shadow:inset 0 2px 0 #ffffffa8,inset 0 -3px 0 #2d06382e,0 2px var(--base),0 4px var(--ink);
}
.mnu-button svg,.mnu-art { width:clamp(25px,calc(5.7 * var(--u)),49px); flex:none; pointer-events:none; }
.mnu-art { display:grid; place-items:center; aspect-ratio:1; }
.mnu-art img,.mnu-art svg { display:block; width:100%; height:100%; object-fit:contain; }
.mnu-art svg { filter:drop-shadow(0 2px 0 #2a1250); }
.mnu-easy { --light:#67ed4e; --dark:#2fae2a; --base:#1b651d; }
.mnu-normal,.mnu-secondary { --light:#ffdf55; --dark:#ff9d14; --base:#a95210; }
.mnu-chaos,.mnu-sound { --light:#ab66ff; --dark:#722ee8; --base:#421485; }
.mnu-blue { --light:#49d6ff; --dark:#1580e8; --base:#103e8c; --ink:#14204a; }
.mnu-choice {
  min-width:0; min-height:clamp(96px,calc(18 * var(--u)),150px); flex-direction:column; justify-content:center;
  padding-inline:3px; gap:clamp(2px,calc(.65 * var(--u)),5px);
  background:radial-gradient(ellipse at 50% 83%,#ffffff41,transparent 57%),linear-gradient(var(--light),var(--dark) 80%);
  transform:scale(.95); filter:brightness(.93);
}
.mnu-choice[aria-pressed="true"] {
  transform:translateY(-4px) scale(1.015); filter:none; z-index:1;
  border-color:#683110;
  box-shadow:inset 0 2px 0 #fff9c9,inset 0 -3px 0 #98400a3b,0 4px #b8540f,0 0 0 3px #ffe080,0 3px 13px 4px #ffdb53b8;
}
.mnu-choice[aria-pressed="true"]:active { translate:0 3px; }
.mnu-choice > .mnu-art { width:clamp(32px,min(14cqi,calc(8 * var(--u))),65px); }
.mnu-mode-name { font-size:clamp(11px,min(4.6cqi,calc(4.2 * var(--u))),36px); line-height:1; text-transform:uppercase; white-space:nowrap; }
.mnu-mode-hint {
  font-size:clamp(12px,min(3.4cqi,calc(2.2 * var(--u))),19px);
  line-height:1.05; -webkit-text-stroke:2px var(--ink); text-shadow:0 1px var(--ink);
}
.mnu-check {
  display:none; position:absolute; top:0; right:0; transform:translate(30%,-35%);   /* в углу, а не по центру — закрывала название сложности */
  width:clamp(22px,calc(4.4 * var(--u)),40px); aspect-ratio:1; place-items:center;
  border:2px solid #174d17; border-radius:50%; color:#fff;
  background:linear-gradient(#9bf94d,#2fc827 65%,#179516); box-shadow:inset 0 2px #ecffb9,0 2px #173d18;
}
.mnu-check svg { width:72%; filter:drop-shadow(0 1px 0 #174d17); }
.mnu-choice[aria-pressed="true"] .mnu-check { display:grid; }
.mnu-play-slot { grid-row:4; position:relative; width:min(72%,calc(65 * var(--u)),525px); }
.mnu-play-slot::before,.mnu-play-slot::after {
  content:''; position:absolute; top:22%; height:63%; width:clamp(17px,calc(5 * var(--u)),43px);
  background:linear-gradient(#fff6a2,#ffd638 47%,#ec8808);
  clip-path:polygon(19% 0,100% 38%,5% 30%,0 19%,19% 0,0 66%,100% 55%,29% 96%,14% 100%,0 82%,0 66%);
  pointer-events:none;
}
.mnu-play-slot::before { right:calc(100% + 7px); }
.mnu-play-slot::after { left:calc(100% + 7px); transform:scaleX(-1); }
.mnu-primary { font-size:clamp(17px,calc(4.6 * var(--u)),37px); }
.mnu-panel .mnu-play {
  width:100%; min-height:clamp(55px,calc(13 * var(--u)),105px); border-radius:999px;
  font-size:clamp(27px,calc(8.1 * var(--u)),65px); -webkit-text-stroke:clamp(4px,calc(.95 * var(--u)),8px) #4b0c32;
  text-shadow:0 clamp(3px,calc(.8 * var(--u)),7px) #4b0c32;
}
.mnu-visible .mnu-play:not(:active) { animation:mnu-pulse 2.4s ease-in-out infinite; }
@keyframes mnu-pulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.04); } }
.mnu-secondary { color:#542808; -webkit-text-stroke:0; text-shadow:0 1px #ffefac; }
.mnu-tools { grid-row:5; display:flex; align-items:center; justify-content:center; gap:clamp(12px,calc(2.6 * var(--u)),22px); }
.mnu-characters,.mnu-sound,.mnu-corner {
  width:clamp(var(--tap),calc(9 * var(--u)),74px); height:clamp(var(--tap),calc(9 * var(--u)),74px); padding:0;
}
.mnu-characters .mnu-art { width:78%; }
.mnu-map svg { width:70%; height:auto; filter:drop-shadow(0 2px 0 #14204a); }
.mnu-tools { position:relative; }
.mnu-map-tip { position:absolute; left:50%; bottom:calc(100% + 8px); translate:-50% 0; padding:.25em .8em; border-radius:999px; white-space:nowrap;
  background:#2a1250; color:#fff; -webkit-text-stroke:0; text-shadow:none; font-size:clamp(14px,calc(2.6 * var(--u)),20px);
  opacity:0; transition:opacity .2s; pointer-events:none; }
.mnu-map-tip.show { opacity:1; }
.mnu-book svg { width:58%; height:auto; color:#fff; filter:drop-shadow(0 2px 0 #14204a); }
.mnu-main-wallet {
  position:absolute; top:calc(env(safe-area-inset-top) + 10px); left:calc(env(safe-area-inset-left) + 12px);
}
.mnu-overlay:not(:has(.mnu-main:not([hidden]))) > .mnu-main-wallet { display:none; }
:has(> .chr-overlay.chr-visible) > .mnu-overlay > :is(.mnu-panel,.mnu-main-wallet) { visibility:hidden; }
.mnu-corner {
  position:absolute; z-index:20; top:calc(env(safe-area-inset-top) + max(8px,2.2 * var(--u)));
  right:calc(env(safe-area-inset-right) + max(8px,2.2 * var(--u))); border-radius:50%;
  /* пауза — второстепенная: не крупнее сердечек (на телефоне была 88 px и лезла в глаза) */
  width:clamp(44px,calc(7 * var(--u)),60px); height:clamp(44px,calc(7 * var(--u)),60px);
}
.mnu-card {
  position:relative; width:min(100%,calc(90 * var(--u)),690px); display:grid; justify-items:center;
  gap:clamp(7px,calc(1.65 * var(--u)),14px);
  padding:0 clamp(12px,calc(3.5 * var(--u)),28px) clamp(14px,calc(3.6 * var(--u)),29px);
  border:var(--line) solid var(--ink); border-radius:clamp(22px,calc(5 * var(--u)),42px);
  background:linear-gradient(#fff9e8,#ede6ff 70%,#d7cbff); color:#fff;
  -webkit-text-stroke:clamp(2px,calc(.4 * var(--u)),3px) var(--ink);
  paint-order:stroke fill; text-shadow:0 1px var(--ink);
  box-shadow:inset 0 0 0 3px #fff9,0 var(--depth) #6546a7,0 calc(var(--depth) + 3px) var(--ink);
}
/* Лента занимает строку, чтобы длинный заголовок не перекрыл статистику. */
.mnu-panel h2 {
  margin:calc(-3 * var(--u)) 0 0; max-width:100%; padding:.23em .55em .3em;
  border:var(--line) solid var(--ink); border-radius:clamp(13px,calc(3 * var(--u)),25px);
  background:linear-gradient(#ff9dc8,#ff4b90 33%,#de1664); color:#fff;
  box-shadow:inset 0 2px #ffffffad,0 4px #831445;
  font-size:clamp(24px,min(8.2vw,calc(6.6 * var(--u))),54px); line-height:1.02;
  -webkit-text-stroke:clamp(3px,calc(.68 * var(--u)),6px) var(--ink);
  paint-order:stroke fill; text-shadow:0 3px var(--ink);
}
.mnu-win .mnu-result-title { background:linear-gradient(#9eee63,#40be42 60%,#259844); box-shadow:inset 0 2px #ffffffad,0 4px #246139; }
.mnu-panel .mnu-pause-title { background:linear-gradient(#cd9bff,#a35bff 38%,#6a2fe0); box-shadow:inset 0 2px #ffffffad,0 4px #421485; }
.mnu-cause { -webkit-text-stroke-color:#712650; text-shadow:0 1px #712650; }
.mnu-stats { display:grid; width:100%; min-width:0; justify-items:center; gap:clamp(4px,var(--u),8px);
  color:var(--ink); -webkit-text-stroke:0; text-shadow:none; }   /* тёмным по светлому: белый с обводкой на кремовой карточке читался плохо */
/* строки итога не рвём посреди фразы: в узком портрете чуть мельче (было «из 60 / с») */
.mnu-stats > * { overflow-wrap:normal; }
@media (orientation:portrait) and (max-width:480px) { .mnu-stats { font-size:15px; } .mnu-result { padding-inline:10px; } }
.mnu-progress {
  width:100%; height:clamp(12px,calc(2.7 * var(--u)),22px); overflow:hidden;
  background:#c6b7eb; border:2px solid var(--ink); border-radius:999px; box-shadow:inset 0 2px #2a125033;
}
.mnu-fill {
  height:100%; border-radius:inherit; transform-origin:left; transform:scaleX(var(--mnu-progress,0));
  background:linear-gradient(#fff286,#ffab21);
}
.mnu-win .mnu-fill { background:linear-gradient(#b1f785,#36b759); }
.mnu-visible .mnu-celebrate .mnu-fill { animation:mnu-fill .6s ease-out both; }
@keyframes mnu-fill { from { transform:scaleX(0); } }
.mnu-bots { display:flex; flex-wrap:wrap; justify-content:center; gap:4px; color:#897ba5; }
.mnu-bots svg { width:clamp(14px,calc(4 * var(--u)),30px); height:auto; }
.mnu-bots .mnu-alive { color:#247b45; }
.mnu-best-row { display:flex; justify-content:center; align-items:center; flex-wrap:wrap; gap:.4em; }
.mnu-rewards {
  display:flex; align-items:center; justify-content:center; flex-wrap:wrap; column-gap:.65em; row-gap:5px;
  width:100%; font-variant-numeric:tabular-nums;
}
.mnu-earned { display:flex; align-items:center; justify-content:center; gap:.16em; font-size:clamp(18px,calc(4 * var(--u)),32px); }
.mnu-earned-amount { min-width:3ch; text-align:right; }
.mnu-double {
  --tap:44px; --line:clamp(2px,calc(.48 * var(--u)),4px); --depth:3px;
  padding:3px .65em; white-space:nowrap;
}
.mnu-double[aria-busy="true"] { opacity:.65; cursor:wait; }
.mnu-revive { --tap:52px; width:min(100%,420px); gap:.4em; font-size:clamp(20px,calc(5 * var(--u)),36px); animation:mnu-revive 1.1s ease-in-out infinite; }
.mnu-revive:disabled { opacity:.6; animation:none; }
@keyframes mnu-revive { 50% { transform:scale(1.05); } }
.mnu-double[aria-busy="true"] .chr-icon { animation:chr-wait .7s ease-in-out infinite alternate; }
.mnu-badge,.mnu-record {
  border:2px solid var(--ink); border-radius:999px; padding:.2em .65em;
  color:#fff; background:linear-gradient(var(--light),var(--dark)); box-shadow:inset 0 1px #ffffffa8;
  -webkit-text-stroke:2px var(--ink); paint-order:stroke fill; text-shadow:0 1px var(--ink);
}
.mnu-record { background:linear-gradient(#fff088,#ffb62b); -webkit-text-stroke-color:#542808; text-shadow:0 1px #542808; }
.mnu-visible .mnu-celebrate .mnu-record { animation:mnu-record .38s cubic-bezier(.2,.8,.4,1.35) both; }
@keyframes mnu-record { from { transform:rotate(-9deg) scale(.65); opacity:0; } }
.mnu-actions { display:grid; grid-template-columns:minmax(var(--tap),1.45fr) minmax(var(--tap),1fr); width:100%; gap:clamp(8px,calc(1.7 * var(--u)),14px); }
.mnu-actions > .mnu-button { min-width:0; }
.mnu-actions > .mnu-primary { font-size:clamp(17px,min(5.9vw,calc(4.6 * var(--u))),37px); }
.mnu-pause .mnu-actions { grid-template-columns:repeat(2,minmax(var(--tap),1fr)); }
.mnu-resume { width:100%; }
.mnu-pause > .mnu-sound { margin-top:5px; }
@media (max-width:420px), (max-height:430px) {
  .mnu-choice:not([aria-pressed="true"]) .mnu-mode-hint { display:none; }
}
@media (orientation:portrait) and (max-width:550px) {
  .mnu-main { padding-top:36px; }
  /* низ вертикального экрана перехватывают жест «домой» и панель браузера — нижний ряд кнопок поднимаем */
  .mnu-overlay { padding-bottom:calc(env(safe-area-inset-bottom) + max(16px, 7dvh)); }
}
@media (max-height:430px) {
  /* Компактный логотип оставляет место для целей нажатия в альбоме. */
  .mnu-main { height:100%; row-gap:7px; width:min(100%,460px); }
  .mnu-logo { width:clamp(105px,38vh,147px); font-size:clamp(26px,9.7vh,38px); }
  .mnu-choice { min-height:88px; }
  .mnu-panel .mnu-play { min-height:var(--tap); padding-block:3px; }
  .mnu-card { gap:6px; }
  .mnu-result { width:min(100%,450px); }
}
@media (prefers-reduced-motion:reduce) {
  .mnu-overlay,.mnu-overlay.mnu-visible,.mnu-button { transition:none; }
  .mnu-visible .mnu-panel,.mnu-visible .mnu-logo,.mnu-visible .mnu-play:not(:active),
  .mnu-visible .mnu-celebrate .mnu-fill,.mnu-visible .mnu-celebrate .mnu-record,
  .mnu-double[aria-busy="true"] .chr-icon { animation:none; }
}
`;
  document.head.append(style);
}
