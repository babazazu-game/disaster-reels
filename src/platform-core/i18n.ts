import type { Lang } from './types';

/**
 * Локализация.
 *
 * Ключевое требование площадки (п. 2.14): язык должен определяться из SDK
 * ДО первого рендера интерфейса. Предыдущий проект этого разработчика получил
 * замечание модерации именно за то, что язык сначала угадывался по
 * navigator.language, а потом переключался — переключение постфактум читается
 * как «автоопределение срабатывает с задержкой».
 *
 * Поэтому порядок такой: init() ждёт SDK, и только потом игра рисует меню.
 * navigator.language остаётся лишь запасным вариантом, когда SDK нет вовсе
 * (локальная разработка).
 */

type Dict = Record<string, string>;

const SUPPORTED: readonly Lang[] = ['ru', 'en'] as const;

/**
 * Языки, для которых русский ближе английского.
 *
 * Площадка работает не только в России: SDK отдаёт `be`, `kk`, `uk`, `uz`
 * и другие коды стран СНГ. Своих переводов на них у нас нет, и без этой
 * таблицы они сваливались бы в английский — а игроку из Минска или Алматы
 * русский почти наверняка понятнее. Тот же список отдельно проверяет
 * сторонний чекер площадки, и не зря.
 *
 * Это НЕ подмена локализации: появятся переводы — коды просто переедут
 * в `SUPPORTED`, и таблица станет короче.
 */
const RUSSIAN_NEIGHBOURS = ['be', 'kk', 'uk', 'uz', 'ky', 'tg', 'hy', 'az', 'mo'];

function normalize(raw: string | undefined | null): Lang {
  const code = (raw ?? '').slice(0, 2).toLowerCase();
  if ((SUPPORTED as readonly string[]).includes(code)) return code as Lang;
  if (RUSSIAN_NEIGHBOURS.includes(code)) return 'ru';
  return 'en';
}

export class I18n {
  private lang: Lang = 'en';
  private dicts: Record<Lang, Dict> = { ru: {}, en: {} };
  private listeners = new Set<(lang: Lang) => void>();

  /** Словари задаёт игра: каркас ничего не знает про её тексты. */
  register(lang: Lang, dict: Dict): void {
    this.dicts[lang] = { ...this.dicts[lang], ...dict };
  }

  /** Язык из SDK. Вызывать до первого рендера UI. */
  setFromSdk(sdkLang: string | undefined): void {
    this.setLang(normalize(sdkLang));
  }

  /** Запасной вариант, когда SDK недоступен. */
  setFromBrowser(): void {
    this.setLang(normalize(typeof navigator !== 'undefined' ? navigator.language : null));
  }

  setLang(lang: Lang): void {
    if (lang === this.lang) return;
    this.lang = lang;
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      const title = this.dicts[lang]['title'];
      // Название игры обязано переключаться вместе с языком (п. 5.1.3)
      if (title) document.title = title;
    }
    for (const fn of this.listeners) fn(lang);
  }

  get current(): Lang {
    return this.lang;
  }

  /**
   * Перевод. Если ключа нет — возвращает сам ключ, а не пустую строку:
   * пустое место в интерфейсе модерация читает как незавершённый вид (п. 1.15),
   * а видимый ключ сразу бросается в глаза при тестировании.
   */
  t(key: string, vars?: Record<string, string | number>): string {
    let s = this.dicts[this.lang][key] ?? this.dicts.en[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        s = s.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      }
    }
    return s;
  }

  onChange(fn: (lang: Lang) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  /**
   * Проверка полноты словарей. Строка, переведённая только на один язык, —
   * повод для отказа модерации. Гонять в дев-сборке.
   */
  findMissing(): { ru: string[]; en: string[] } {
    const keys = new Set([...Object.keys(this.dicts.ru), ...Object.keys(this.dicts.en)]);
    const missing = { ru: [] as string[], en: [] as string[] };
    for (const k of keys) {
      if (!this.dicts.ru[k]) missing.ru.push(k);
      if (!this.dicts.en[k]) missing.en.push(k);
    }
    return missing;
  }
}
