import { sfx } from '../engine/sfx.ts';
import { makeNick } from './arenaBots.ts';

/**
 * Таблица рекордов: «очки» — сумма монет за все раунды (без удвоения за ролик), поэтому только растут.
 *
 * Данные даёт площадка (Bridge, type 'in_game'; на playgama.com — SaaS-лидерборд). Вне площадок (локально,
 * GitHub Pages) показываем ДЕМО с плашкой «пример» — чтобы заказчик видел вид таблицы; на Playgama демо нет.
 * Внешний вид — общий с экраном персонажей (классы chr-*).
 */
type Localize = (ru: string, en: string) => string;

export interface BoardRow { rank: number; name: string; score: number; photo?: string; me?: boolean }
export interface BoardSource {
  /** Строки таблицы (по месту). Бросает — показываем «не загрузилось». */
  load(): Promise<BoardRow[]>;
  /** Свои очки и ник — строка «Ты» внизу, если себя нет в списке. */
  me(): { score: number; name: string };
  demo: boolean;
}

export class Leaderboard {
  onClose?: () => void;
  private readonly overlay: HTMLElement;
  private readonly list: HTMLOListElement;
  private readonly status: HTMLParagraphElement;
  private readonly mine: HTMLDivElement;
  private readonly note: HTMLParagraphElement;
  private readonly back: HTMLButtonElement;
  private ticket = 0;

  constructor(parent: HTMLElement, private readonly L: Localize, private readonly src: BoardSource) {
    injectCss();
    this.overlay = el('section', parent, 'chr-overlay lb-overlay');
    this.overlay.inert = true;
    this.overlay.setAttribute('role', 'dialog');
    this.overlay.setAttribute('aria-modal', 'true');
    this.overlay.setAttribute('aria-label', L('Рекорды', 'Leaderboard'));
    const header = el('header', this.overlay, 'chr-header');
    this.back = el('button', header, 'chr-candy chr-back');
    this.back.type = 'button';
    this.back.textContent = '←';
    this.back.setAttribute('aria-label', L('Назад', 'Back'));
    this.back.addEventListener('click', () => { sfx.play('click', 0.05); this.onClose?.(); });
    el('h2', header, 'chr-title').textContent = L('РЕКОРДЫ', 'LEADERBOARD');
    el('span', header, 'lb-spacer');
    const body = el('div', this.overlay, 'lb-body');
    this.note = el('p', body, 'lb-note');
    this.status = el('p', body, 'lb-status');
    this.list = el('ol', body, 'lb-list');
    this.list.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: true });
    this.mine = el('div', body, 'lb-row lb-me lb-mine');
    // пока окно открыто, горячие клавиши меню под ним не срабатывают
    document.addEventListener('keydown', (e) => { if (this.open && e.key !== 'Tab') e.stopPropagation(); }, true);
  }

  get open(): boolean { return !this.overlay.inert; }

  show(): void {
    this.overlay.inert = false;
    this.overlay.classList.add('chr-visible');
    this.back.focus({ preventScroll: true });
    this.note.hidden = !this.src.demo;
    this.note.textContent = this.L('Пример таблицы — на площадке здесь будут настоящие игроки', 'Sample table — real players appear here on the platform');
    this.list.replaceChildren();
    this.mine.hidden = true;
    this.setStatus(this.L('Загружаем…', 'Loading…'));
    const t = ++this.ticket;
    const timeout = new Promise<never>((_, rej) => setTimeout(() => rej(new Error('timeout')), 8000));
    Promise.race([this.src.load(), timeout]).then((rows) => {
      if (t !== this.ticket || !this.open) return;
      this.render(rows);
    }, () => {
      if (t !== this.ticket || !this.open) return;
      this.setStatus(this.L('Не получилось загрузить. Попробуй позже!', 'Couldn’t load. Try again later!'));
      this.renderMine(false);
    });
  }

  hide(): void {
    this.ticket++;
    this.overlay.inert = true;
    this.overlay.classList.remove('chr-visible');
  }

  private setStatus(text: string): void { this.status.textContent = text; this.status.hidden = !text; }

  private render(rows: BoardRow[]): void {
    this.setStatus(rows.length ? '' : this.L('Пока пусто — стань первым!', 'Nobody here yet — be the first!'));
    for (const r of rows) this.list.append(this.row(r, 'li'));
    this.renderMine(rows.some((r) => r.me));
    this.list.querySelector('.lb-me')?.scrollIntoView({ block: 'center' });
  }

  /** Своя строка внизу — если себя нет в списке (ещё не играл или ниже показанных мест). */
  private renderMine(listed: boolean): void {
    const me = this.src.me();
    this.mine.hidden = listed;
    if (listed) return;
    this.mine.replaceChildren(...Array.from(this.row({ rank: 0, name: me.name, score: me.score, me: true }, 'div').children));
  }

  private row(r: BoardRow, tag: 'li' | 'div'): HTMLElement {
    const row = document.createElement(tag);
    row.className = `lb-row${r.me ? ' lb-me' : ''}${r.rank >= 1 && r.rank <= 3 ? ` lb-top lb-top${r.rank}` : ''}`;
    const rank = el('span', row, 'lb-rank');
    rank.textContent = r.rank > 0 ? String(r.rank) : '—';
    const ava = el('span', row, 'lb-ava');
    ava.setAttribute('aria-hidden', 'true');
    const name = r.name || this.L('Игрок', 'Player');
    if (r.photo) {
      const img = el('img', ava, 'lb-photo');
      img.alt = '';
      img.referrerPolicy = 'no-referrer';
      img.src = r.photo;
      img.addEventListener('error', () => { img.remove(); ava.textContent = initial(name); }, { once: true });
    } else ava.textContent = initial(name);
    ava.style.setProperty('--hue', String(hash(name) % 360));
    const nm = el('span', row, 'lb-name');
    nm.textContent = r.me ? `${name} (${this.L('ты', 'you')})` : name;
    const sc = el('span', row, 'lb-score');
    sc.textContent = r.score.toLocaleString(this.L('ru-RU', 'en-US'));
    row.setAttribute('aria-label', `${r.rank > 0 ? r.rank + '. ' : ''}${nm.textContent}: ${sc.textContent} ${this.L('очков', 'points')}`);
    return row;
  }
}

/** Демо-строки для проверки вида вне площадки: случайные ники, очки по убыванию, игрок на своём месте. */
export function demoRows(me: { score: number; name: string }): BoardRow[] {
  const rows: BoardRow[] = [];
  let s = 3200 + Math.floor(Math.random() * 600);
  for (let i = 0; i < 20; i++) { rows.push({ rank: 0, name: makeNick(), score: s }); s = Math.max(0, s - 40 - Math.floor(Math.random() * 180)); }
  if (me.score > 0) rows.push({ rank: 0, name: me.name, score: me.score, me: true });
  rows.sort((a, b) => b.score - a.score);
  rows.forEach((r, i) => { r.rank = i + 1; });
  return rows;
}

const initial = (s: string): string => (s.trim()[0] ?? '?').toUpperCase();
const hash = (s: string): number => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };

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
.lb-body { width:min(100%,640px); min-height:0; display:flex; flex-direction:column; gap:clamp(6px,calc(1.2 * var(--u)),10px); }
.lb-note { margin:0; align-self:center; padding:.25em .8em; border-radius:999px; background:#ffd23a; color:var(--ink);
  font-size:clamp(12px,calc(2 * var(--u)),16px); -webkit-text-stroke:0; text-align:center; }
.lb-note[hidden],.lb-status[hidden],.lb-mine[hidden] { display:none; }
.lb-status { margin:auto 0; text-align:center; font-size:clamp(15px,calc(3 * var(--u)),24px); -webkit-text-stroke:2px var(--ink); paint-order:stroke fill; }
.lb-list { list-style:none; margin:0; padding:4px 4px 8px; min-height:0; overflow:auto; display:flex; flex-direction:column; gap:clamp(5px,var(--u),8px);
  scrollbar-width:thin; scrollbar-color:#e5b4ff transparent; overscroll-behavior:contain; touch-action:pan-y; }
.lb-row { flex:none; display:grid; grid-template-columns:2.3em 2.2em minmax(0,1fr) auto; align-items:center; gap:.5em;
  min-height:clamp(44px,calc(7 * var(--u)),58px); padding:.25em .8em .25em .4em; color:var(--ink);
  border:var(--line) solid var(--ink); border-radius:clamp(12px,calc(3 * var(--u)),22px);
  background:linear-gradient(#fff9e8,#eae2ff 70%,#d5c4ff); box-shadow:inset 0 0 0 2px #fff9,0 3px #6546a7,0 5px var(--ink); }
.lb-rank { justify-self:center; font-size:1.1em; font-variant-numeric:tabular-nums; }
.lb-top .lb-rank { display:grid; place-items:center; width:1.9em; aspect-ratio:1; border-radius:50%; border:2px solid var(--ink); color:#fff;
  -webkit-text-stroke:2px var(--ink); paint-order:stroke fill; }
.lb-top1 .lb-rank { background:linear-gradient(#fff4a4,#ffc21a 60%,#e8920c); }
.lb-top2 .lb-rank { background:linear-gradient(#ffffff,#cfd8e6 60%,#9aa7bd); }
.lb-top3 .lb-rank { background:linear-gradient(#ffd2a8,#e58a3d 60%,#b85b1c); }
.lb-ava { width:2.1em; aspect-ratio:1; display:grid; place-items:center; overflow:hidden; border-radius:30%; border:2px solid var(--ink);
  background:hsl(var(--hue,260) 75% 62%); color:#fff; -webkit-text-stroke:2px var(--ink); paint-order:stroke fill; }
.lb-photo { width:100%; height:100%; object-fit:cover; }
.lb-name { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.lb-score { font-variant-numeric:tabular-nums; padding:.15em .6em; border-radius:999px; border:2px solid #663214;
  background:linear-gradient(#fff4a4,#ffd345 62%,#ffad26); color:#552409; }
.lb-me { border-color:#793d13; background:linear-gradient(#fffbd7,#ffe599); box-shadow:inset 0 2px #fffdfa,0 3px #be681b,0 0 0 3px #ffdc63; }
.lb-mine { margin:0 4px 2px; }
`;
  document.head.appendChild(s);
}
