/**
 * Персонажи (этап 8). Только данные: кто есть, сколько стоит, сколько роликов за рекламу открывает.
 * Первый — «Новичок», он есть у всех с начала; остальные — с листа концептов art/concepts/characters_v1.jpg.
 * Модели — assets/chars/<id>.glb (собраны в Blender скриптом art/chars/build.py), портреты — assets/chars/<id>.webp.
 *
 * Экономика: за раунд ≈ (секунды/2 + 30 за победу) × сложность (1 / 1,5 / 2) — обычно 15–90 монет.
 * Первый персонаж — за 3–4 раунда, самый дорогой — за ~15. Реклама — бонус, не условие (п. 4.5.2):
 * любого можно купить монетами, ролики — просто другой путь.
 */
export interface CharDef {
  id: string;
  ru: string;
  en: string;
  /** Цена в монетах (0 — есть сразу). */
  price: number;
  /** Сколько роликов за награду открывают персонажа (0 — нельзя/не нужно). */
  ads: number;
}

export const ROSTER: CharDef[] = [
  { id: 'rookie', ru: 'Новичок', en: 'Rookie', price: 0, ads: 0 },
  { id: 'sparky', ru: 'Искра', en: 'Sparky', price: 150, ads: 1 },
  { id: 'nana', ru: 'Нана', en: 'Nana', price: 200, ads: 1 },
  { id: 'biscuit', ru: 'Пончик', en: 'Biscuit', price: 250, ads: 2 },
  { id: 'patch', ru: 'Пират', en: 'Patch', price: 300, ads: 2 },
  { id: 'chomps', ru: 'Кусь', en: 'Chomps', price: 350, ads: 2 },
  { id: 'orbit', ru: 'Орбита', en: 'Orbit', price: 400, ads: 3 },
  { id: 'clank', ru: 'Дзынь', en: 'Clank', price: 450, ads: 3 },
  { id: 'wizzle', ru: 'Чародей', en: 'Wizzle', price: 500, ads: 3 },
  { id: 'bleep', ru: 'Бип', en: 'Bleep', price: 600, ads: 4 },
  { id: 'zoom', ru: 'Вжух', en: 'Zoom', price: 800, ads: 4 },
];

export const charById = (id: string): CharDef => ROSTER.find((c) => c.id === id) ?? ROSTER[0];

/** Монеты за раунд: секунды выживания, бонус за победу, множитель сложности. */
export function roundCoins(time: number, win: boolean, difficulty: string): number {
  const k = difficulty === 'chaos' ? 2 : difficulty === 'normal' ? 1.5 : 1;
  return Math.round((Math.floor(time / 2) + (win ? 30 : 0)) * k);
}
