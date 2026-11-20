import { installTap } from '../engine/tap.ts';

/**
 * Интерфейс раунда: таймер сверху, крупное объявление волны по центру,
 * панель итога с кнопкой «Ещё раз». Всё DOM поверх холста, размеры от
 * короткой стороны экрана — без прокруток и вылезающих текстов в обеих ориентациях.
 * Стиль — вариант 1: толстая белая обводка, глянцевые плашки.
 */
export class RoundUi {
  private timer: HTMLDivElement;
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
    this.timer.textContent = `⏱ ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
    this.timer.classList.toggle('hot', s <= 10);
  }

  /** Крупная надпись волны на ~2 с. Управление НЕ отбирается. */
  announce(text: string, color = '#ffd23a'): void {
    this.banner.textContent = text;
    this.banner.style.color = color;
    this.banner.classList.remove('show');
    void this.banner.offsetWidth;   // перезапуск анимации
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

let cssDone = false;
function injectCss(): void {
  if (cssDone) return;
  cssDone = true;
  const s = document.createElement('style');
  // u — единица от короткой стороны экрана: одинаково в портрете и альбоме
  s.textContent = `
:root{--u:min(1vw,1vh,8px)}
.rui-timer{position:absolute;top:calc(env(safe-area-inset-top) + 2.2*var(--u));left:50%;transform:translateX(-50%);z-index:6;
  padding:1.1*var(--u) 2.6*var(--u);padding:calc(1.1*var(--u)) calc(2.8*var(--u));border-radius:calc(2*var(--u));
  background:#1d3f86;border:calc(.6*var(--u)) solid #fff;color:#fff;font:900 calc(4.6*var(--u))/1 Rubik,system-ui,sans-serif;
  box-shadow:0 calc(.8*var(--u)) 0 rgba(0,0,0,.25);pointer-events:none;white-space:nowrap}
.rui-timer.hot{background:#d8313a}
.rui-banner{position:absolute;left:50%;top:30%;transform:translate(-50%,-50%) scale(.6);z-index:6;opacity:0;pointer-events:none;
  max-width:92vw;text-align:center;font:900 calc(8*var(--u))/1.05 Rubik,system-ui,sans-serif;
  -webkit-text-stroke:calc(.5*var(--u)) #1b2a55;paint-order:stroke fill;text-shadow:0 calc(.7*var(--u)) 0 #1b2a55;transition:transform .25s cubic-bezier(.3,1.6,.5,1),opacity .2s}
.rui-banner.show{opacity:1;transform:translate(-50%,-50%) scale(1)}
.rui-panel{position:absolute;inset:0;z-index:9;display:none;align-items:center;justify-content:center;background:rgba(10,25,60,.35)}
.rui-panel.show{display:flex}
.rui-card{display:flex;flex-direction:column;align-items:center;gap:calc(2*var(--u));padding:calc(4*var(--u)) calc(6*var(--u));
  max-width:86vw;border-radius:calc(3.5*var(--u));background:#fff;border:calc(.8*var(--u)) solid #1d3f86;box-shadow:0 calc(1.2*var(--u)) 0 rgba(0,0,0,.25)}
.rui-title{font:900 calc(7.5*var(--u))/1 Rubik,system-ui,sans-serif;color:#d8313a;text-align:center}
.rui-title.win{color:#2fa84a}
.rui-sub{font:700 calc(3.6*var(--u))/1.2 Rubik,system-ui,sans-serif;color:#1d3f86;text-align:center}
.rui-btn{min-width:calc(34*var(--u));min-height:44px;padding:calc(2*var(--u)) calc(5*var(--u));border:none;border-radius:calc(2.5*var(--u));cursor:pointer;
  background:linear-gradient(#ffdc4a,#f2a91a);color:#5a2a00;font:900 calc(5*var(--u))/1 Rubik,system-ui,sans-serif;
  box-shadow:0 calc(.9*var(--u)) 0 #b06a0a;border:calc(.5*var(--u)) solid #fff}
.rui-btn:active{transform:translateY(calc(.5*var(--u)));box-shadow:0 calc(.4*var(--u)) 0 #b06a0a}
`;
  document.head.appendChild(s);
}
