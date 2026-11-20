import { installTap } from '../engine/tap.ts';
// В DOM размеры — CSS-пиксели: fontPx/tapSize из yg-core умножают на плотность экрана (они для canvas),
// на телефоне с DPR 3 кнопки и шрифт раздувались втрое (заказчик: «пауза громадная, текст не вмещается»).

/**
 * Интерфейс раунда: таймер сверху, крупное объявление волны по центру,
 * панель итога с кнопкой «Ещё раз». DOM поверх холста сохраняет
 * читаемость HUD при движении камеры.
 */
export class RoundUi {
  private timer: HTMLDivElement;
  private timerValue: HTMLSpanElement;
  private hearts: HTMLDivElement;
  private heartsN = -1;
  private banner: HTMLDivElement;
  private panel: HTMLDivElement;
  private title: HTMLDivElement;
  private sub: HTMLDivElement;
  private bannerT = 0;
  onRetry?: () => void;

  constructor(parent: HTMLElement) {
    injectCss();
    installTap();
    this.timer = el('rui-timer', parent);
    const clock = this.timer.appendChild(document.createElement('i'));
    clock.className = 'rui-clock';
    clock.textContent = '⏱';
    attachIcon(clock, 'clock');
    this.timerValue = this.timer.appendChild(document.createElement('span'));
    this.hearts = el('rui-hearts', parent);
    this.banner = el('rui-banner', parent);
    this.panel = el('rui-panel', parent);
    const card = el('rui-card', this.panel);
    this.title = el('rui-title', card);
    this.sub = el('rui-sub', card);
    const btn = document.createElement('button');
    btn.className = 'rui-btn';
    btn.textContent = 'ЕЩЁ РАЗ';
    btn.addEventListener('click', () => this.onRetry?.());
    card.appendChild(btn);
    this.retryBtn = btn;
  }
  private retryBtn: HTMLButtonElement;

  setLabels(retry: string): void { this.retryBtn.textContent = retry; }

  setTime(left: number): void {
    const s = Math.max(0, Math.ceil(left));
    this.timerValue.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
    this.timer.classList.toggle('hot', s <= 10);
  }

  /** Сердечки слева сверху: целые красные, потерянные серые; потеря — встряска. */
  setHearts(n: number, max: number): void {
    if (this.hearts.childElementCount !== max) {
      this.hearts.replaceChildren();
      for (let i = 0; i < max; i++) attachIcon(this.hearts.appendChild(document.createElement('i')), 'heart');
    }
    Array.from(this.hearts.children).forEach((h, i) => h.classList.toggle('lost', i >= n));
    if (n < this.heartsN) { this.hearts.classList.remove('hit'); void this.hearts.offsetWidth; this.hearts.classList.add('hit'); }
    this.heartsN = n;
  }

  /** Крупная надпись волны на ~2 с. Управление НЕ отбирается. */
  announce(text: string, color = '#ffd23a'): void {
    this.banner.textContent = text;
    this.banner.style.color = color;
    this.banner.classList.remove('show');
    void this.banner.offsetWidth;   // Повторное объявление тоже должно выпрыгнуть.
    this.banner.classList.add('show');
    this.bannerT = 2.2;
  }

  /** Итог: кнопка доступна СРАЗУ (без принудительного ожидания — решение по итогам обсуждения). */
  showResult(title: string, sub: string, win: boolean): void {
    this.title.textContent = title;
    this.title.classList.toggle('win', win);
    this.sub.textContent = sub;
    this.panel.classList.add('show');
  }
  hideResult(): void { this.panel.classList.remove('show'); }
  get resultOpen(): boolean { return this.panel.classList.contains('show'); }

  /** Таймер и сердечки прячем под меню, надпись волны гасим сразу. */
  setHud(visible: boolean): void {
    this.timer.style.display = this.hearts.style.display = visible ? '' : 'none';
    if (!visible) { this.bannerT = 0; this.banner.classList.remove('show'); }
  }

  update(dt: number): void {
    if (this.bannerT > 0 && (this.bannerT -= dt) <= 0) this.banner.classList.remove('show');
  }
}

function el(cls: string, parent: HTMLElement): HTMLDivElement {
  const d = document.createElement('div');
  d.className = cls;
  parent.appendChild(d);
  return d;
}

function attachIcon(slot: HTMLElement, name: 'heart' | 'clock'): void {
  slot.setAttribute('aria-hidden', 'true');
  const art = document.createElement('img');
  art.alt = '';
  art.draggable = false;
  // Слот сразу имеет размер и показывает заглушку, пока грузится WebP.
  art.onload = () => {
    slot.classList.add('has-art');
    slot.replaceChildren(art);
  };
  art.src = `./assets/ui/icons/${name}.webp?v=${__BUILD__}`;
}

let cssDone = false;
function injectCss(): void {
  if (cssDone) return;
  cssDone = true;
  const s = document.createElement('style');
  s.textContent = `
:root{--u:min(1vw,1vh,8px)}
.rui-timer,.rui-hearts,.rui-banner{--hud-u:min(1vh,8px);--hud-u:min(1dvh,8px);--hud-ink:#2a1250;--hud-font:Nunito,"Arial Black",system-ui,sans-serif}
.rui-timer,.rui-hearts{position:absolute;top:calc(env(safe-area-inset-top) + max(8px,2.2*var(--u)));z-index:6;display:flex;pointer-events:none}
.rui-timer{left:50%;translate:-50% 0;align-items:center;justify-content:center;gap:.28em;
  min-width:4.25em;padding:.22em .34em;box-sizing:border-box;border-radius:999px;
  background:linear-gradient(#643a96,#351b63 62%,#2a144f);border:clamp(3px,calc(.64*var(--hud-u)),5px) solid #201038;
  color:#fff;font:900 clamp(18px,min(5.2vw,calc(4.7*var(--hud-u))),39px)/1 var(--hud-font);
  font-variant-numeric:tabular-nums;white-space:nowrap;-webkit-text-stroke:.1em #211037;paint-order:stroke fill;text-shadow:0 .09em #211037;
  box-shadow:inset 0 2px #d7acff8c,0 clamp(3px,calc(.65*var(--hud-u)),6px) #22113b}
.rui-clock,.rui-hearts i{display:grid;place-items:center;aspect-ratio:1;flex:none;font-style:normal}
.rui-clock{width:1.05em;-webkit-text-stroke:0;text-shadow:none}
.rui-clock img,.rui-hearts img{display:block;width:100%;height:100%;object-fit:contain}
.rui-timer.hot{background:linear-gradient(#ff737e,#de2443 64%,#a50c35);border-color:#47102a;
  box-shadow:inset 0 2px #ffd1d6a8,0 clamp(3px,calc(.65*var(--hud-u)),6px) #791435;animation:ruiUrgent .85s ease-in-out infinite}
@keyframes ruiUrgent{50%{transform:scale(1.065)}}
.rui-hearts{left:calc(env(safe-area-inset-left) + max(8px,2.2*var(--u)));gap:clamp(2px,.65vw,6px)}
.rui-hearts i{width:clamp(21px,min(6.3vw,calc(6.5*var(--hud-u))),53px);transition:transform .2s,opacity .2s;
  background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 21.5 3.2 12.9A5.4 5.4 0 0 1 12 6.1a5.4 5.4 0 0 1 8.8 6.8z' fill='%23ff3b4e' stroke='%23fff' stroke-width='2.2' stroke-linejoin='round'/%3E%3Cpath d='M7.4 8.6a2.4 2.4 0 0 1 2.6-.9' stroke='%23fff' stroke-width='1.6' stroke-linecap='round' fill='none' opacity='.8'/%3E%3C/svg%3E") center/contain no-repeat;
  filter:drop-shadow(0 2px 0 #2a1250a8)}
.rui-hearts i.has-art{background:none}
.rui-hearts i.lost{filter:grayscale(1) brightness(.78);opacity:.62;transform:scale(.79)}
.rui-hearts.hit{animation:ruiHit .4s}
@keyframes ruiHit{0%,100%{transform:none}25%{transform:translateX(-6px) rotate(-4deg)}50%{transform:translateX(6px) rotate(4deg)}75%{transform:translateX(-3px)}}
/* телефон вертикально: по центру барабан с большой СТОП — фраза волны выше него и поверх (заказчик: текст был за кнопкой) */
@media (pointer:coarse) and (orientation:portrait){.rui-banner{top:16%!important}}
.rui-banner{position:absolute;inset-inline:calc(env(safe-area-inset-left) + 14px) calc(env(safe-area-inset-right) + 14px);top:30%;
  margin-inline:auto;width:max-content;max-width:calc(100% - env(safe-area-inset-left) - env(safe-area-inset-right) - 28px);
  translate:0 -50%;z-index:8;opacity:0;pointer-events:none;color:#fff;text-align:center;text-wrap:balance;
  font:900 clamp(24px,min(7.5vw,calc(8.2*var(--hud-u))),68px)/1.08 var(--hud-font);
  -webkit-text-stroke:clamp(4px,calc(1.2*var(--hud-u)),10px) var(--hud-ink);paint-order:stroke fill;
  text-shadow:0 clamp(3px,calc(.92*var(--hud-u)),8px) var(--hud-ink);transition:opacity .2s}
.rui-banner.show{opacity:1;animation:ruiBanner .42s both}
@keyframes ruiBanner{0%{transform:translateY(12px) scale(.58);opacity:0}64%{transform:translateY(-4px) scale(1.045);opacity:1}100%{transform:none}}
@media (prefers-reduced-motion:reduce){.rui-banner,.rui-hearts i{transition:none}.rui-banner.show,.rui-timer.hot,.rui-hearts.hit{animation:none}}
.rui-panel{position:absolute;inset:0;z-index:9;display:none;align-items:center;justify-content:center;background:rgba(10,25,60,.35)}
.rui-panel.show{display:flex}
.rui-card{display:flex;flex-direction:column;align-items:center;gap:calc(2*var(--u));padding:calc(4*var(--u)) calc(6*var(--u));
  max-width:86vw;border-radius:calc(3.5*var(--u));background:#fff;border:calc(.8*var(--u)) solid #1d3f86;box-shadow:0 calc(1.2*var(--u)) 0 rgba(0,0,0,.25)}
.rui-title{font:900 calc(7.5*var(--u))/1 Nunito,system-ui,sans-serif;color:#d8313a;text-align:center}
.rui-title.win{color:#2fa84a}
.rui-sub{font:700 calc(3.6*var(--u))/1.2 Nunito,system-ui,sans-serif;color:#1d3f86;text-align:center}
.rui-btn{min-width:calc(34*var(--u));min-height:44px;padding:calc(2*var(--u)) calc(5*var(--u));border:none;border-radius:calc(2.5*var(--u));cursor:pointer;
  background:linear-gradient(#ffdc4a,#f2a91a);color:#5a2a00;font:900 calc(5*var(--u))/1 Nunito,system-ui,sans-serif;
  box-shadow:0 calc(.9*var(--u)) 0 #b06a0a;border:calc(.5*var(--u)) solid #fff}
.rui-btn:active{transform:translateY(calc(.5*var(--u)));box-shadow:0 calc(.4*var(--u)) 0 #b06a0a}
`;
  document.head.appendChild(s);
}
