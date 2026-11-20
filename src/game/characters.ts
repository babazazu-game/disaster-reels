import { sfx } from '../engine/sfx.ts';
import { ROSTER, type CharDef } from './roster.ts';

export interface CharState { coins: number; owned: string[]; selected: string; adViews: Record<string, number> }

type Localize = (ru: string, en: string) => string;

export class Characters {
  onSelect?: (id: string) => void;
  onBuy?: (id: string) => void;
  onAd?: (id: string) => Promise<void>;
  onClose?: () => void;

  private readonly overlay: HTMLElement;
  private readonly grid: HTMLElement;
  private readonly back: HTMLButtonElement;
  private readonly coins: HTMLSpanElement;
  private readonly cards = new Map<string, HTMLElement>();
  private readonly pending = new Set<string>();
  private state?: CharState;
  private returnFocus: HTMLElement | null = null;

  constructor(parent: HTMLElement, private readonly L: Localize) {
    injectCss();
    this.overlay = element('section', parent, 'chr-overlay');
    this.overlay.inert = true;
    this.overlay.setAttribute('role', 'dialog');
    this.overlay.setAttribute('aria-modal', 'true');
    this.overlay.setAttribute('aria-label', L('Персонажи', 'Characters'));

    const header = element('header', this.overlay, 'chr-header');
    this.back = button(header, 'chr-candy chr-back', () => this.onClose?.());
    this.back.textContent = '←';
    this.back.setAttribute('aria-label', L('Назад', 'Back'));
    element('h2', header, 'chr-title').textContent = L('ПЕРСОНАЖИ', 'CHARACTERS');
    this.coins = coinBadge(header, '', L('Монеты', 'Coins'));

    this.grid = element('div', this.overlay, 'chr-grid');
    // Глобальный запрет touchmove нужен игре, а сетка должна листаться пальцем.
    this.grid.addEventListener('touchmove', (event) => event.stopPropagation(), { passive: true });
    this.overlay.addEventListener('click', (event) => {
      if ((event.target as Element).closest('button')) sfx.play('click', 0.05);
    });
    document.addEventListener('keydown', (event) => this.handleKey(event), true);
  }

  show(s: CharState): void {
    const previous = this.state;
    const wasOpen = this.open;
    this.state = { ...s, owned: [...s.owned], adViews: { ...s.adViews } };
    this.coins.textContent = String(s.coins);

    if (!wasOpen) {
      this.returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      this.overlay.inert = false;
      this.overlay.classList.add('chr-visible');
      this.grid.scrollTop = 0;
      this.back.focus({ preventScroll: true });
    }

    for (const c of ROSTER) {
      const wasOwned = previous?.owned.includes(c.id);
      const owned = s.owned.includes(c.id);
      if (!this.cards.has(c.id) || owned !== wasOwned) {
        this.replaceCard(c, owned, wasOwned === false && owned);
      }
      this.syncCard(c);
    }
  }

  hide(): void {
    if (!this.open) return;
    this.overlay.inert = true;
    this.overlay.classList.remove('chr-visible');
    this.returnFocus?.focus({ preventScroll: true });
    this.returnFocus = null;
  }

  get open(): boolean { return !this.overlay.inert; }

  private replaceCard(c: CharDef, owned: boolean, unlocked: boolean): void {
    const previous = this.cards.get(c.id);
    const restoreFocus = previous?.contains(document.activeElement);
    const card = document.createElement(owned ? 'button' : 'article');
    card.className = 'chr-card';
    if (card instanceof HTMLButtonElement) {
      card.type = 'button';
      card.classList.add('chr-owned');
      card.addEventListener('click', () => this.onSelect?.(c.id));
    }

    const name = this.L(c.ru, c.en);
    const portrait = element('span', card, 'chr-portrait');
    portrait.setAttribute('aria-hidden', 'true');
    const letter = element('span', portrait, 'chr-letter');
    letter.textContent = Array.from(name)[0];
    addUiImage(portrait, `chars/${c.id}`, letter);
    element('span', card, 'chr-name').textContent = name;
    const badge = element('span', card, owned ? 'chr-check' : 'chr-lock');
    badge.setAttribute('aria-hidden', 'true');
    badge.textContent = owned ? '✓' : '🔒';

    if (!owned) {
      const actions = element('div', card, 'chr-actions');
      const buy = button(actions, 'chr-candy chr-buy', () => this.onBuy?.(c.id));
      buy.append(uiIcon('coin'), String(c.price));
      buy.setAttribute('aria-label', this.L(`Купить: ${name}, монет: ${c.price}`, `Buy ${name} for ${c.price} coins`));
      if (c.ads > 0) {
        const ad = button(actions, 'chr-candy chr-ad', () => { void this.watchAd(c); });
        ad.append(uiIcon('ad'));
        element('span', ad, 'chr-ad-count');
      }
    }

    if (unlocked) card.classList.add('chr-unlocked');
    if (previous) previous.replaceWith(card);
    else this.grid.append(card);
    this.cards.set(c.id, card);
    if (restoreFocus) card.querySelector<HTMLButtonElement>('button')?.focus({ preventScroll: true });
    if (restoreFocus && owned) card.focus({ preventScroll: true });
  }

  private syncCard(c: CharDef): void {
    const card = this.cards.get(c.id);
    const s = this.state;
    if (!card || !s) return;
    if (card instanceof HTMLButtonElement) {
      card.setAttribute('aria-pressed', String(c.id === s.selected));
      return;
    }

    const buy = card.querySelector<HTMLButtonElement>('.chr-buy')!;
    buy.disabled = s.coins < c.price;
    const ad = card.querySelector<HTMLButtonElement>('.chr-ad');
    if (!ad) return;
    const views = s.adViews[c.id] ?? 0;
    const waiting = this.pending.has(c.id);
    ad.disabled = waiting;
    ad.setAttribute('aria-busy', String(waiting));
    const name = this.L(c.ru, c.en);
    ad.setAttribute('aria-label', waiting
      ? this.L(`Ждём ролик за персонажа ${name}`, `Waiting for the video for ${name}`)
      : this.L(`Ролик за персонажа ${name}, просмотрено ${views} из ${c.ads}`, `Watch a video for ${name}, ${views} of ${c.ads} watched`));
    ad.querySelector('.chr-ad-count')!.textContent = this.L(`${views}/${c.ads}`, `${views}/${c.ads}`);
  }

  private async watchAd(c: CharDef): Promise<void> {
    if (this.pending.has(c.id) || !this.onAd) return;
    this.pending.add(c.id);
    this.syncCard(c);
    try {
      await this.onAd(c.id);
    } catch {
      // Сбой рекламы должен оставить возможность повторить попытку.
    } finally {
      this.pending.delete(c.id);
      this.syncCard(c);
    }
  }

  private handleKey(event: KeyboardEvent): void {
    if (!this.open || event.defaultPrevented || event.isComposing || event.altKey || event.ctrlKey || event.metaKey) return;
    // Пока модальное окно открыто, горячие клавиши меню за ним не действуют.
    event.stopPropagation();
    if (event.key === 'Escape') {
      event.preventDefault();
      if (!event.repeat) this.onClose?.();
    }
    if (event.key !== 'Tab') return;
    const buttons = this.overlay.querySelectorAll<HTMLButtonElement>('button:not(:disabled)');
    const focused = document.activeElement;
    const last = buttons[buttons.length - 1];
    if (!this.overlay.contains(focused) || (event.shiftKey ? focused === this.back : focused === last)) {
      event.preventDefault();
      (event.shiftKey ? last : this.back).focus();
    }
  }
}

function element<K extends keyof HTMLElementTagNameMap>(tag: K, parent: HTMLElement, classes: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  node.className = classes;
  parent.append(node);
  return node;
}

function button(parent: HTMLElement, classes: string, action: () => void): HTMLButtonElement {
  const node = element('button', parent, classes);
  node.type = 'button';
  node.addEventListener('click', action);
  return node;
}

export function addUiImage(slot: HTMLElement, path: string, fallback: Element): void {
  const img = element('img', slot, 'chr-image');
  img.alt = '';
  img.draggable = false;
  img.hidden = true;
  img.onload = () => {
    fallback.setAttribute('hidden', '');
    img.hidden = false;
  };
  img.onerror = () => img.remove();
  img.src = `./assets/${path}.webp?v=${__BUILD__}`;
}

export function uiIcon(kind: 'coin' | 'ad'): HTMLSpanElement {
  injectCss();
  const slot = document.createElement('span');
  slot.className = `chr-icon chr-icon-${kind}`;
  slot.setAttribute('aria-hidden', 'true');
  element('span', slot, 'chr-icon-fallback');
  addUiImage(slot, `ui/icons/${kind}`, slot.firstElementChild!);
  return slot;
}

export function coinBadge(parent: HTMLElement, classes: string, label: string): HTMLSpanElement {
  const badge = element('span', parent, `chr-wallet ${classes}`);
  badge.setAttribute('role', 'group');
  badge.setAttribute('aria-label', label);
  badge.append(uiIcon('coin'));
  return element('span', badge, 'chr-wallet-value');
}

let cssDone = false;
function injectCss(): void {
  if (cssDone) return;
  cssDone = true;
  const style = document.createElement('style');
  style.textContent = `
.chr-icon { width:1.15em; aspect-ratio:1; flex:none; display:grid; place-items:center; pointer-events:none; }
.chr-image { width:100%; height:100%; object-fit:contain; pointer-events:none; }
.chr-icon-fallback { display:block; }
.chr-icon-coin .chr-icon-fallback {
  width:90%; aspect-ratio:1; box-sizing:border-box; border:2px solid #a75310; border-radius:50%;
  background:radial-gradient(circle at 33% 25%,#fff7aa,#ffd62e 54%,#fca61b 78%);
  box-shadow:inset 0 0 0 1px #fff5a5,0 1px #843b16;
}
.chr-icon-ad .chr-icon-fallback {
  width:70%; height:76%; background:currentColor; clip-path:polygon(9% 0,100% 50%,9% 100%);
}
.chr-image[hidden],.chr-icon-fallback[hidden],.chr-portrait [hidden] { display:none; }
.chr-wallet {
  display:inline-flex; align-items:center; justify-content:center; gap:.35em; flex:none;
  min-width:3.35em; padding:.2em .45em; border:2px solid #663214; border-radius:999px;
  background:linear-gradient(#fff4a4,#ffd345 62%,#ffad26); box-shadow:inset 0 2px #fffacd,0 3px #934513;
  color:#552409; font-weight:900; -webkit-text-stroke:0; text-shadow:0 1px #fff3b7;
  white-space:nowrap; font-variant-numeric:tabular-nums;
}
.chr-overlay {
  --u:min(1vh,8px); --u:min(1dvh,8px); --ink:#2a1250; --line:clamp(2px,calc(.55 * var(--u)),5px);
  position:absolute; inset:0; z-index:30; display:grid; justify-items:center;
  grid-template-rows:auto minmax(0,1fr); gap:clamp(8px,calc(1.6 * var(--u)),14px);
  padding:calc(env(safe-area-inset-top) + 10px) calc(env(safe-area-inset-right) + 8px)
    calc(env(safe-area-inset-bottom) + 7px) calc(env(safe-area-inset-left) + 8px);
  background:radial-gradient(ellipse at 50% 42%,#59359391,#21134bc4);
  color:#fff; font:900 clamp(13px,calc(2.6 * var(--u)),22px)/1.12 Nunito,"Arial Black",system-ui,sans-serif;
  opacity:0; visibility:hidden; pointer-events:none;
  transition:opacity .18s ease-in,visibility 0s .18s;
}
.chr-overlay * { box-sizing:border-box; }
.chr-overlay.chr-visible { opacity:1; visibility:visible; pointer-events:auto; transition:opacity .16s ease-out; }
.chr-header {
  width:min(100%,1100px); padding-inline:4px; display:grid;
  grid-template-columns:minmax(44px,1fr) auto minmax(max-content,1fr); gap:6px; align-items:center;
}
.chr-header .chr-wallet { justify-self:end; }
.chr-title {
  margin:0; padding:.25em .42em .3em; border:var(--line) solid var(--ink); border-radius:.6em;
  background:linear-gradient(#ff9dc8,#ff4b90 42%,#de1664); box-shadow:inset 0 2px #ffffffad,0 4px #831445;
  color:#fff; font-size:clamp(16px,min(5.8vw,calc(5.8 * var(--u))),46px); font-weight:900;
  -webkit-text-stroke:clamp(2px,calc(.62 * var(--u)),5px) var(--ink); paint-order:stroke fill;
  text-shadow:0 2px var(--ink);
}
.chr-candy {
  --top:#61dbff; --bottom:#1682df; --edge:#204c91;
  display:flex; align-items:center; justify-content:center; gap:3px; cursor:pointer; touch-action:manipulation;
  padding:0; border:var(--line) solid var(--ink); border-radius:999px;
  background:linear-gradient(175deg,#ffffff56,transparent 46%),linear-gradient(var(--top),var(--bottom));
  box-shadow:inset 0 2px #ffffff9c,0 3px var(--edge),0 4px var(--ink); color:#fff;
  font:inherit; -webkit-text-stroke:2px var(--ink); paint-order:stroke fill; text-shadow:0 1px var(--ink);
}
/* низ вертикального телефона перехватывают жест «домой» и панель браузера */
@media (orientation:portrait) and (max-width:550px) { .chr-overlay { padding-bottom:calc(env(safe-area-inset-bottom) + max(7px, 5dvh)); } }
/* зона нажатия с «толщиной» снизу: на телефоне палец попадает в низ кнопки */
.chr-candy { position:relative; }
.chr-candy::after { content:''; position:absolute; inset:-4px -4px -9px; border-radius:inherit; }
.chr-candy:active:not(:disabled) { translate:0 2px; box-shadow:inset 0 2px #ffffff9c,0 1px var(--edge),0 2px var(--ink); }
.chr-overlay button:focus-visible { outline:2px solid #fff; outline-offset:2px; }
.chr-back { width:clamp(44px,calc(7 * var(--u)),60px); aspect-ratio:1; font-size:clamp(26px,calc(5 * var(--u)),40px); }
.chr-grid {
  width:min(100%,1100px); min-height:0; display:grid; grid-template-columns:repeat(6,minmax(0,1fr)); align-content:start;
  gap:clamp(8px,calc(2 * var(--u)),16px); padding:5px 4px 10px; overflow:auto;
  scrollbar-width:thin; scrollbar-color:#e5b4ff transparent; overscroll-behavior:contain; touch-action:pan-y;
}
.chr-card {
  position:relative; min-width:0; color:var(--ink); display:flex; flex-direction:column; align-items:center;
  padding:4px 3px 6px; gap:clamp(3px,var(--u),8px);
  border:var(--line) solid var(--ink); border-radius:clamp(12px,calc(3.6 * var(--u)),27px);
  background:linear-gradient(#fff9e8,#eae2ff 70%,#d5c4ff);
  box-shadow:inset 0 0 0 2px #fff9,0 4px #6546a7,0 6px var(--ink);
}
.chr-owned { cursor:pointer; touch-action:manipulation; min-height:44px; font:inherit; }
.chr-owned:active { translate:0 2px; }
.chr-owned[aria-pressed="true"] {
  border-color:#793d13; background:linear-gradient(#fffbd7,#ffe599);
  box-shadow:inset 0 2px #fffdfa,0 4px #be681b,0 0 0 2px #ffdc63;
}
.chr-portrait {
  width:min(100%,clamp(55px,calc(17 * var(--u)),128px)); aspect-ratio:1;
  display:grid; place-items:center; border-radius:28%;
  background:radial-gradient(ellipse at 50% 46%,#fff9 12%,#c5a9ff 92%);
}
.chr-letter {
  font-size:clamp(27px,calc(7.2 * var(--u)),55px); line-height:1; color:#fff;
  -webkit-text-stroke:clamp(2px,calc(.6 * var(--u)),5px) #573581; paint-order:stroke fill; text-shadow:0 2px #573581;
}
.chr-card:not(.chr-owned) .chr-portrait { background:radial-gradient(ellipse,#c4b1e3,#9582b8); }
.chr-card:not(.chr-owned) .chr-portrait > * { filter:brightness(.53) saturate(.48); }
.chr-name { max-width:100%; text-align:center; line-height:1; padding-inline:1px; text-wrap:balance; }
.chr-check,.chr-lock {
  position:absolute; top:3px; right:3px; width:clamp(20px,calc(4.2 * var(--u)),32px); aspect-ratio:1;
  display:grid; place-items:center; border:2px solid #4f3471; border-radius:50%; background:#e7d6ff;
  color:#fff; font-size:clamp(12px,calc(2.7 * var(--u)),20px); line-height:1;
}
.chr-check { display:none; border-color:#174d17; background:linear-gradient(#9bf94d,#2fc827 65%,#179516); box-shadow:inset 0 2px #ecffb9,0 2px #173d18; }
.chr-owned[aria-pressed="true"] .chr-check { display:grid; }
.chr-actions { display:flex; gap:3px; width:100%; margin-top:auto; }
.chr-actions > button {
  flex:1 1 0; min-width:0; height:clamp(36px,calc(5 * var(--u)),40px); border-width:2px;
  font-size:clamp(13px,calc(2.05 * var(--u)),17px); font-variant-numeric:tabular-nums; white-space:nowrap;
}
.chr-buy { --top:#ffdf55; --bottom:#ffa014; --edge:#a95210; color:#552409; -webkit-text-stroke:0; text-shadow:0 1px #fff0a8; }
.chr-ad { --top:#b679ff; --bottom:#7131e3; --edge:#4d1b94; }
.chr-actions button:disabled { opacity:.55; cursor:default; }
.chr-ad[aria-busy="true"] { cursor:wait; }
.chr-ad[aria-busy="true"] .chr-icon { animation:chr-wait .7s ease-in-out infinite alternate; }
.chr-unlocked { animation:chr-unlock .4s cubic-bezier(.2,.8,.35,1) both; }
@keyframes chr-wait { to { opacity:.32; } }
@keyframes chr-unlock { 0% { scale:.85; } 64% { scale:1.07; } 100% { scale:1; } }
@media (max-width:560px) {
  .chr-grid { grid-template-columns:repeat(3,minmax(0,1fr)); }
  .chr-actions .chr-icon { width:1em; }
  /* узкий телефон: цена и реклама рядом не влезали (обрезалось «0/1») — ставим друг под другом */
  .chr-actions { flex-direction:column; gap:4px; }
  .chr-actions > button { flex:none; width:100%; height:34px; }
}
@media (orientation:landscape) and (max-height:430px) and (max-width:599px) {
  .chr-grid { grid-template-columns:repeat(4,minmax(0,1fr)); }
}
@media (prefers-reduced-motion:reduce) {
  .chr-overlay,.chr-overlay.chr-visible { transition:none; }
  .chr-ad[aria-busy="true"] .chr-icon,.chr-unlocked { animation:none; }
}
`;
  document.head.append(style);
}
