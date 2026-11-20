import { lang } from '../i18n.ts';

/**
 * Словарь барабана: три ленты СКОЛЬКО / КАКОЙ / ЧТО. Слова — идентификаторы,
 * а текст фразы собирается с СОГЛАСОВАНИЕМ: «1 огненная курица», «3 огненные
 * курицы», «5 огненных куриц». Без этого интерфейс стал бы грамматической
 * катастрофой («1 огненных куриц») — замечание ChatGPT, принято.
 *
 * Формы русского: one — 1 (им. ед.), few — 2–4 (сущ. род. ед.), many — 5+ (род. мн.).
 */

/** Числа на ленте. 25 и 100 убраны — заказчик: «ребёнок потеряется»; 7 добавлено. */
export const COUNTS = [3, 5, 7, 10] as const;

export type AdjId = 'fire' | 'ice' | 'giant' | 'bouncy' | 'fast' | 'plain';
export type NounId = 'chicken' | 'cat' | 'shark' | 'banana' | 'meteor' | 'bomb' | 'snowman' | 'slime' | 'zombie' | 'dino' | 'ufo' | 'tornado' | 'bee' | 'boulder' | 'frog';

interface Adj { ru: { m: string; f: string; pl: string; gpl: string }; en: string }
interface Noun { ru: { g: 'm' | 'f'; one: string; few: string; many: string }; en: [string, string] }

export const ADJS: Record<AdjId, Adj> = {
  fire: { ru: { m: 'огненный', f: 'огненная', pl: 'огненные', gpl: 'огненных' }, en: 'fire' },
  ice: { ru: { m: 'ледяной', f: 'ледяная', pl: 'ледяные', gpl: 'ледяных' }, en: 'ice' },
  giant: { ru: { m: 'гигантский', f: 'гигантская', pl: 'гигантские', gpl: 'гигантских' }, en: 'giant' },
  bouncy: { ru: { m: 'прыгучий', f: 'прыгучая', pl: 'прыгучие', gpl: 'прыгучих' }, en: 'bouncy' },
  fast: { ru: { m: 'быстрый', f: 'быстрая', pl: 'быстрые', gpl: 'быстрых' }, en: 'fast' },
  plain: { ru: { m: 'обычный', f: 'обычная', pl: 'обычные', gpl: 'обычных' }, en: 'plain' },
};

export const NOUNS: Record<NounId, Noun> = {
  chicken: { ru: { g: 'f', one: 'курица', few: 'курицы', many: 'куриц' }, en: ['chicken', 'chickens'] },
  cat: { ru: { g: 'm', one: 'кот', few: 'кота', many: 'котов' }, en: ['cat', 'cats'] },
  shark: { ru: { g: 'f', one: 'акула', few: 'акулы', many: 'акул' }, en: ['shark', 'sharks'] },
  banana: { ru: { g: 'm', one: 'банан', few: 'банана', many: 'бананов' }, en: ['banana', 'bananas'] },
  meteor: { ru: { g: 'm', one: 'метеорит', few: 'метеорита', many: 'метеоритов' }, en: ['meteor', 'meteors'] },
  bomb: { ru: { g: 'f', one: 'бомба', few: 'бомбы', many: 'бомб' }, en: ['bomb', 'bombs'] },
  snowman: { ru: { g: 'm', one: 'снеговик', few: 'снеговика', many: 'снеговиков' }, en: ['snowman', 'snowmen'] },
  slime: { ru: { g: 'm', one: 'слайм', few: 'слайма', many: 'слаймов' }, en: ['slime', 'slimes'] },
  // «зомби» не склоняется: 1 огненный зомби, 3 огненных зомби, 5 огненных зомби
  zombie: { ru: { g: 'm', one: 'зомби', few: 'зомби', many: 'зомби' }, en: ['zombie', 'zombies'] },
  dino: { ru: { g: 'm', one: 'динозавр', few: 'динозавра', many: 'динозавров' }, en: ['dinosaur', 'dinosaurs'] },
  // НЛО и торнадо тоже не склоняются
  ufo: { ru: { g: 'm', one: 'НЛО', few: 'НЛО', many: 'НЛО' }, en: ['UFO', 'UFOs'] },
  tornado: { ru: { g: 'm', one: 'торнадо', few: 'торнадо', many: 'торнадо' }, en: ['tornado', 'tornadoes'] },
  // новый хаос (заказчик: «залез на гору — сижу всю игру»): пчёлы летают на любую высоту, лягушки прыгают на башню,
  // валуны катятся по прямой через арену
  bee: { ru: { g: 'f', one: 'пчела', few: 'пчелы', many: 'пчёл' }, en: ['bee', 'bees'] },
  boulder: { ru: { g: 'm', one: 'валун', few: 'валуна', many: 'валунов' }, en: ['boulder', 'boulders'] },
  frog: { ru: { g: 'f', one: 'лягушка', few: 'лягушки', many: 'лягушек' }, en: ['frog', 'frogs'] },
};

export const ADJ_IDS = Object.keys(ADJS) as AdjId[];
export const NOUN_IDS = Object.keys(NOUNS) as NounId[];

type Form = 'one' | 'few' | 'many';
function form(n: number): Form {
  const d = n % 10, dd = n % 100;
  if (d === 1 && dd !== 11) return 'one';
  if (d >= 2 && d <= 4 && (dd < 12 || dd > 14)) return 'few';
  return 'many';
}

/** Слово на ленте во время вращения — во «множественной» форме, как на макете (10 | ОГНЕННЫХ | КУРИЦ). */
export const reelAdj = (a: AdjId): string => (lang() === 'en' ? ADJS[a].en : ADJS[a].ru.gpl).toUpperCase();
export const reelNoun = (n: NounId): string => (lang() === 'en' ? NOUNS[n].en[1] : NOUNS[n].ru.many).toUpperCase();

/** Согласованная пара «прилагательное + существительное» для числа n. */
export function agree(n: number, a: AdjId, w: NounId): [string, string] {
  if (lang() === 'en') return [ADJS[a].en, NOUNS[w].en[n === 1 ? 0 : 1]];
  const A = ADJS[a].ru, N = NOUNS[w].ru, f = form(n);
  if (f === 'one') return [N.g === 'f' ? A.f : A.m, N.one];
  // 2–4: «3 огненные курицы», но «3 огненных кота» — так говорят чаще
  if (f === 'few') return [N.g === 'f' ? A.pl : A.gpl, N.few];
  return [A.gpl, N.many];
}

/** Фраза целиком для большой надписи: «100 ОГНЕННЫХ КУРИЦ!». */
export function phrase(n: number, a: AdjId, w: NounId): string {
  const [x, y] = agree(n, a, w);
  return `${n} ${x} ${y}!`.toUpperCase();
}
