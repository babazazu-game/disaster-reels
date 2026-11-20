import { Save } from 'yg-core';
import { core } from './core.ts';

/**
 * Прогресс игрока — ЕДИНСТВЕННАЯ точка доступа к сохранению (правило заготовки).
 * Хранилище — bridge.storage Playgama (src/platform-core/bridge-store.ts), один ключ на всё.
 *
 * Чекпоинт внутри забега НЕ храним: обби проходят за один заход, а продолжение
 * с середины после перезагрузки ломало бы честность звёзд за забег. Храним
 * то, что копится между забегами: монеты, скины, лучший результат.
 */
export interface ProgressData extends Record<string, unknown> {
  coins: number;
  owned: string[];
  skin: string;
  muted: boolean;
  /** Лучшее время по мирам, с (нет ключа — ещё не проходил). */
  best: Record<string, number>;
  runs: number;
  /** Сколько миров открыто (1 — только первый). */
  unlocked: number;
  upgrades: Record<string, number>;
  pets: string[];
  pet: string;
  trails: string[];
  trail: string;
  /** Дата последнего сундука дня, YYYY-MM-DD. */
  chest: string;
  /** Громкость из настроек, 0..1. */
  sfxVol: number;
  musicVol: number;
  /** Выбранная в меню сложность ('easy' | 'normal' | 'chaos'). Рекорд по времени — best[сложность]. */
  difficulty: string;
  /** Этап 8: сколько роликов за награду посмотрено ради каждого персонажа. */
  adViews: Record<string, number>;
  /** Мини-обучение первого раунда уже показано. */
  tutorial: boolean;
}

// v2: прогресс по мирам и лавки хаба (v1 был до хаба — несовместим по полю best)
export const progress = new Save<ProgressData>('disaster-reels-v1', {
  coins: 0, owned: ['rookie'], skin: 'rookie', muted: false, best: {}, runs: 0,
  unlocked: 1, upgrades: {}, pets: ['none'], pet: 'none', trails: ['none'], trail: 'none', chest: '', sfxVol: 1, musicVol: 1, difficulty: 'normal', adViews: {}, tutorial: false,
});

/**
 * Сохранение — только через Bridge (Playgama: localStorage напрямую нельзя). Зовётся из main.ts ПОСЛЕ
 * готовности Bridge и ДО импорта игры: иначе первый кадр нарисовался бы с пустым прогрессом и обучение
 * показалось бы снова. Bridge не поднялся — играем без сохранения, но играем.
 */
export async function prepareProgress(): Promise<void> {
  const ok = await core.ready.then(() => true, () => false);
  if (!ok) return;
  try { await progress.attachCloud(core.currentPlayer); } catch (e) { console.warn('[progress]', e); }
}
addEventListener('pagehide', () => { void progress.flushCloud().catch(() => undefined); });
