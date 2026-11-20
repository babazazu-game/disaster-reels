import { sfx } from '../engine/sfx.ts';
import { ADJS, ADJ_IDS, NOUNS, NOUN_IDS, type AdjId, type NounId } from './words.ts';
import { reelIconPos } from './reels.ts';

/**
 * «Энциклопедия хаоса» — коллекция всего, что может выпасть на барабане (Stage 8).
 * Открывается то, что уже выпадало у игрока; остальное — силуэт и «?». Повод крутить ещё:
 * дети любят собирать полные наборы. Описание — одна строка: что делает и как спастись.
 *
 * Внешний вид — общий с экраном персонажей (классы chr-*), свои только значок из атласа барабана
 * и строка описания.
 */
type Localize = (ru: string, en: string) => string;

const NOUN_TIPS: Record<NounId, [string, string]> = {
  chicken: ['Носится по арене и толкается', 'Runs around and shoves you'],
  cat: ['Гонится и запрыгивает на ящики', 'Chases you and jumps onto crates'],
  shark: ['Скачет по земле и оставляет лужи', 'Hops on land and leaves puddles'],
  banana: ['Лежит на месте — не наступай!', 'Just lies there — don’t step on it!'],
  meteor: ['Падает с неба — беги из красного круга', 'Falls from the sky — leave the red circle'],
  bomb: ['Шипит, мигает и взрывается', 'Hisses, blinks and explodes'],
  snowman: ['Бродит по арене, в огне тает', 'Wanders around, melts in fire'],
  slime: ['Прыгает и оставляет липкую слизь', 'Bounces and leaves sticky slime'],
  zombie: ['Кусает — и соперник сам становится зомби', 'Bites — and rivals turn into zombies'],
  dino: ['Гонится рывками, а потом ревёт', 'Chases in bursts, then roars'],
  ufo: ['Летает и тянет лучом вверх', 'Flies and pulls you up with a beam'],
  tornado: ['Кружит и раскидывает всех', 'Spins and throws everyone around'],
  bee: ['Летает на любой высоте — на горе не спрячешься', 'Flies at any height — hills won’t save you'],
  boulder: ['Катится по прямой через всю арену', 'Rolls straight across the arena'],
  frog: ['Прыгает даже на вершину башни', 'Jumps even to the top of the tower'],
};

const ADJ_TIPS: Record<AdjId, [string, string]> = {
  fire: ['Горит и поджигает землю', 'Burns and sets the ground on fire'],
  ice: ['Морозит землю — будет скользко', 'Freezes the ground — it gets slippery'],
  giant: ['Огромный и опасный', 'Huge and dangerous'],
  bouncy: ['Скачет и достаёт повыше', 'Bounces and reaches higher'],
  fast: ['Быстрый и бьёт током', 'Fast and zaps with electricity'],
  plain: ['Самый обычный… пока что', 'Just plain… for now'],
};

export class Encyclopedia {
  onClose?: () => void;
  private readonly overlay: HTMLElement;
  private readonly grid: HTMLDivElement;
  private readonly counter: HTMLSpanElement;
  private readonly back: HTMLButtonElement;

  constructor(parent: HTMLElement, private readonly L: Localize) {
    injectCss();
    this.overlay = el('section', parent, 'chr-overlay enc-overlay');
    this.overlay.inert = true;
    this.overlay.setAttribute('role', 'dialog');
    this.overlay.setAttribute('aria-modal', 'true');
    this.overlay.setAttribute('aria-label', L('Энциклопедия хаоса', 'Chaos encyclopedia'));
    const header = el('header', this.overlay, 'chr-header');
    this.back = el('button', header, 'chr-candy chr-back');
    this.back.type = 'button';
    this.back.textContent = '←';
    this.back.setAttribute('aria-label', L('Назад', 'Back'));
    this.back.addEventListener('click', () => { sfx.play('click', 0.05); this.onClose?.(); });
    el('h2', header, 'chr-title').textContent = L('ХАОС', 'CHAOS');
    this.counter = el('span', header, 'enc-count');
    this.grid = el('div', this.overlay, 'chr-grid enc-grid');
    this.grid.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: true });
    // пока окно открыто, горячие клавиши меню под ним не срабатывают (Enter не запускает раунд)
    document.addEventListener('keydown', (e) => { if (this.open && e.key !== 'Tab') e.stopPropagation(); }, true);
  }

  get open(): boolean { return !this.overlay.inert; }

  show(seen: readonly string[]): void {
    const known = new Set(seen);
    this.grid.replaceChildren();
    let got = 0;
    const section = (title: string) => { el('h3', this.grid, 'enc-section').textContent = title; };
    section(this.L('КТО', 'WHO'));
    for (const id of NOUN_IDS) {
      const open = known.has(id); if (open) got++;
      const n = NOUNS[id];
      this.card(id, open, this.L(cap(n.ru.one), cap(n.en[0])), this.L(...NOUN_TIPS[id]));
    }
    section(this.L('КАКОЙ', 'WHAT KIND'));
    for (const id of ADJ_IDS) {
      const open = known.has(id); if (open) got++;
      const a = ADJS[id];
      this.card(id, open, this.L(cap(a.ru.m), cap(a.en)), this.L(...ADJ_TIPS[id]));
    }
    const total = NOUN_IDS.length + ADJ_IDS.length;
    this.counter.textContent = `${got}/${total}`;
    this.counter.setAttribute('aria-label', this.L(`Открыто ${got} из ${total}`, `${got} of ${total} found`));
    this.overlay.inert = false;
    this.overlay.classList.add('chr-visible');
    this.grid.scrollTop = 0;
    this.back.focus({ preventScroll: true });
  }

  hide(): void {
    this.overlay.inert = true;
    this.overlay.classList.remove('chr-visible');
  }

  private card(id: AdjId | NounId, open: boolean, name: string, tip: string): void {
    const card = el('article', this.grid, `chr-card enc-card${open ? ' chr-owned enc-open' : ''}`);
    const pic = el('span', card, 'chr-portrait enc-pic');
    pic.setAttribute('aria-hidden', 'true');
    const icon = el('i', pic, 'enc-icon');
    icon.style.backgroundPosition = reelIconPos(id);
    el('span', card, 'chr-name').textContent = open ? name : '???';
    el('span', card, 'enc-tip').textContent = open ? tip : this.L('Ещё не выпадал на барабане', 'Not rolled yet');
  }
}

const cap = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

function el<K extends keyof HTMLElementTagNameMap>(tag: K, parent: HTMLElement, cls: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  node.className = cls;
  parent.appendChild(node);
  return node;
}

let cssDone = false;
function injectCss(): void {
  if (cssDone) return;
  cssDone = true;
  const s = document.createElement('style');
  s.textContent = `
.enc-grid { grid-template-columns:repeat(auto-fill,minmax(min(clamp(112px,calc(19 * var(--u)),170px),29vw),1fr)); }
.enc-section { grid-column:1/-1; margin:4px 0 0; justify-self:start; padding:.15em .6em; border-radius:999px;
  background:#ffd23a; color:var(--ink); font-size:clamp(14px,calc(2.8 * var(--u)),22px); -webkit-text-stroke:0; }
.enc-card { cursor:default; }
.enc-icon { display:block; width:82%; aspect-ratio:1; background:url(./assets/reel.webp?v=${__BUILD__}) 0 0/400% 600% no-repeat; }
.enc-card:not(.enc-open) .enc-icon { filter:brightness(0) opacity(.45); }
.enc-card:not(.enc-open) .chr-portrait > * { filter:brightness(0) opacity(.45); }
.enc-tip { font-size:clamp(12px,calc(1.9 * var(--u)),16px); font-weight:800; line-height:1.15; text-align:center; color:#4a3477; padding:0 4px 2px; }
.enc-card:not(.enc-open) .enc-tip { color:#7c6ba0; }
.enc-count { justify-self:end; padding:.2em .7em; border:2px solid var(--ink); border-radius:999px;
  background:linear-gradient(#fff4a4,#ffad26); color:#552409; -webkit-text-stroke:0; font-size:clamp(15px,calc(3 * var(--u)),24px); }
`;
  document.head.appendChild(s);
}
