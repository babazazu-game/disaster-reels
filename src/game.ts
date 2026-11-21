/**
 * «Крути хаос!» — сборка игры. Этап 3: раунд от барабана хаоса.
 *
 * Арена-остров с укрытиями и перепадами высоты, игрок бегает, вокруг стоят
 * манекены (будущие боты) — по ним меряется цена персонажа: один вызов
 * отрисовки на аватар. Катастроф и барабана ещё нет — этапы 2–3.
 *
 * Правила кадра (см. CLAUDE.md, «Производительность»):
 *  - всё неподвижное склеено по материалу (mergeStatic) — арена ≈ 6 вызовов;
 *  - тень одна, над ареной целиком, отбрасывают арена и игрок; у манекенов пятно;
 *  - DPR и тени — от уровня качества (engine/quality.ts), уровень сам падает при просадке.
 */

import { Storm } from './game/storm';
import { applyMapTextures } from './engine/mapTex';
import * as THREE from 'three';
import { core } from './core.ts';
import { createWorld, block, CLASSIC, cloudsAlong, mergeStatic } from './engine/world.ts';
import { Avatar } from './engine/avatar.ts';
import { Input } from './engine/input.ts';
import { FollowCamera } from './engine/camera.ts';
import { occludable, setOccluder } from './engine/occlude.ts';
import { Controller } from './engine/controller.ts';
import { Physics, type Solid } from './engine/physics.ts';
import { FpsMeter } from './engine/fps.ts';
import { sfx, type SfxName } from './engine/sfx.ts';
import { quality } from './engine/quality.ts';
import { SKINS } from './game/skins.ts';
import { loadChar, type CharModel } from './engine/charModel.ts';
import { ROSTER, charById, roundCoins } from './game/roster.ts';
import { Particles } from './engine/particles.ts';
import { Surface, Hail, Lava, Flames, boltTexture, Cell, GROUND_Y } from './game/chaos.ts';
import { Reels, type ReelResult } from './game/reels.ts';
import { Tutorial } from './game/tutorial.ts';
import { Encyclopedia } from './game/encyclopedia.ts';
import { Leaderboard, demoRows } from './game/leaderboard.ts';
import { Creatures } from './game/creatures.ts';
import { agree, phrase, ADJ_IDS, NOUN_IDS, type AdjId, type NounId } from './game/words.ts';
import { RoundUi } from './game/roundUi.ts';
import { ArenaBots, type Spot } from './game/arenaBots.ts';
import { L } from './i18n.ts';
import { Menu } from './game/menu.ts';
import { Characters } from './game/characters.ts';
import { interstitialBetweenLevels, watchRewarded } from './ads.ts';
import { progress } from './progress.ts';

export interface Game {
  renderer: THREE.WebGLRenderer;
  resize(width: number, height: number): void;
  load(onProgress: (value: number) => void): Promise<void>;
  start(): void;
}

/** Полуразмер острова, м. Было 20 — заказчику тесно убегать, увеличен в 1,5 раза. */
const HALF = 30;
/** Ниже этого — упал с острова. */
const FALL_Y = -12;
/** Заборчик по краю: выше ступеньки (0,35), ниже прыжка. */
const FENCE_H = 1.0;
/** Старт игрока; вокруг него ящики не ставятся. */
const SPAWN = { x: 0, z: 5 };
/** Ботов на арене (этап 5). */
const DUMMIES = 5;
/** Сердечек на раунд: касание отнимает одно (ребёнку одно касание = смерть — слишком строго). Лава и падение — сразу. */
const HEARTS = 3;
export type Difficulty = 'easy' | 'normal' | 'chaos';
/**
 * Сложность (этап 6): сердечки, сколько существ бегает и как быстро, как быстро встаёт лава,
 * метеоры финала (две волны) и какая их доля метит в игрока. «Обычный» — то, что выверено автотестом.
 */
const DIFF: Record<Difficulty, { hearts: number; runners: number; speed: number; lava: number; meteors: [number, number]; aim: number; storm: number; chase: number; roam: number }> = {
  easy: { hearts: 4, runners: 0.6, speed: 0.8, lava: 1.4, meteors: [7, 8], aim: 0.2, storm: 10, chase: 10, roam: 0.2 },
  // заказчик 21.11 на «Обычном»: «легко, живности где-то в сторонке, их мало» — погоня с 14 м, бегающих больше
  normal: { hearts: 3, runners: 1.25, speed: 1, lava: 1, meteors: [8, 9], aim: 0.28, storm: 8, chase: 14, roam: 0.65 },
  chaos: { hearts: 2, runners: 1.5, speed: 1.15, lava: 0.85, meteors: [12, 13], aim: 0.36, storm: 6, chase: 17, roam: 0.8 },
};
/** Неуязвимость после удара, с — успеть убежать. */
const INVULN = 1.6;
/** Длина раунда, с. Время идёт только после первого барабана и стоит, пока ленты крутятся. */
const ROUND = 60;
/**
 * Волны задаёт барабан: три за раунд, каждая ПОВЕРХ прошлой (огонь и лёд на земле
 * остаются). Финал — лава ступенями под метеоритным дождём. Первый барабан — до пяти.
 */
const INTRO = 1.5;                  // реальных секунд до первого барабана («Выживи 60 секунд!»)
const REELS_AT = [0, 15, 30];       // по игровому времени
/**
 * Финал: лава поднимается СТУПЕНЯМИ (земля → выше ящиков и плит → выше второго холма),
 * безопасных мест всё меньше, и всё время — метеоритный дождь, половина в игрока.
 * Раньше было «залез на ящик и стой» — заказчику скучно и легко.
 */
const LAVA_STEPS: { at: number; top: number; sec: number; ru: string; en: string }[] = [
  { at: 44, top: 0.45, sec: 5, ru: 'ЛАВА ПОДНИМАЕТСЯ!', en: 'LAVA IS RISING!' },
  { at: 50, top: 1.5, sec: 4, ru: 'ЛАВА ВЫШЕ!', en: 'LAVA RISES HIGHER!' },
  { at: 55, top: 2.5, sec: 4, ru: 'НА САМЫЙ ВЕРХ!', en: 'GET TO THE TOP!' },
];
const reelPlan = (i: number): Partial<ReelResult> =>
  // первый барабан — не больше пяти и без самых опасных (НЛО, торнадо, динозавр); дальше — любое из 3/5/7/10
  i === 0 ? { n: pick([3, 5]), adj: pick(ADJ_IDS), noun: pick(NOUN_IDS.filter((w) => w !== 'ufo' && w !== 'tornado' && w !== 'dino')) } : {};
const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
const ADJ_COLOR: Record<AdjId, string> = {
  fire: '#ff8a2a', ice: '#9be3ff', giant: '#ffd23a', bouncy: '#ff8ae0', fast: '#fff36b', plain: '#ffffff',
};
/** Стоя в огне дольше этого — сгорел. Короткое касание прощается. */
const BURN_DEATH = 0.35;
/**
 * Реакции этапа 4 — надписи «Момента хаоса» (первый раз за раунд: замедление на долю секунды и крупно).
 * Цвет — по смыслу: огонь оранжевый, вода/лёд голубой, ток жёлтый, слизь зелёная.
 */
const REACT: Record<string, [string, string, string]> = {
  steam: ['ПАР! ЛЁД ТУШИТ ОГОНЬ', 'STEAM! ICE BEATS FIRE', '#e8f6ff'],
  melt: ['ЛЁД ТАЕТ — ЛУЖА!', 'ICE MELTS — PUDDLE!', '#9be3ff'],
  shock: ['ЭЛЕКТРОЛУЖА!', 'SHOCK PUDDLE!', '#fff36b'],
  slimeFire: ['ГОРЯЩАЯ СЛИЗЬ!', 'BURNING SLIME!', '#ff8a2a'],
  catchFire: ['ЗАГОРЕЛСЯ!', 'CAUGHT FIRE!', '#ff8a2a'],
  douse: ['ПОТУХ!', 'FIRE OUT!', '#cfefff'],
  snowMelt: ['СНЕГОВИК РАСТАЯЛ!', 'SNOWMAN MELTED!', '#9be3ff'],
  fireTornado: ['ОГНЕННЫЙ СМЕРЧ!', 'FIRE TORNADO!', '#ff6a1a'],
  iceTornado: ['ЛЕДЯНОЙ СМЕРЧ!', 'ICE TORNADO!', '#9be3ff'],
  skate: ['КАТОК! ИХ ЗАНОСИТ', 'ICE RINK! THEY SLIDE', '#cfefff'],
  blast: ['РАЗЛЕТЕЛИСЬ!', 'BLASTED AWAY!', '#ffd23a'],
  stun: ['УДАРИЛО ТОКОМ!', 'ZAPPED!', '#fff36b'],
  storm: ['ГРОЗА! НЕ СТОЙ НА МЕСТЕ', 'STORM! KEEP MOVING', '#fff36b'],
};
/** Замедление «Момента хаоса»: столько реальных секунд мир идёт со скоростью SLOW_K. Управление не отбирается. */
const SLOW_T = 0.5, SLOW_K = 0.3;

const C = {
  grass: 0x5cc44a, dirt: 0x9a6a3c, stone: 0xa3a9b3, stoneDark: 0x7d8490,
  crate: 0xc4843f, trunk: 0x8a5a33, leaves: 0x3fae4f, flag: 0xe8403a, fence: 0xfff4dc, post: 0xd99a4e,
  // вторая карта «Пирамида» — пустыня: песок, песчаник, пальмы, кактусы (свои текстуры Codex, см. art/tex/gen.sh)
  sand: 0xe6c47c, sandRock: 0xc99a58, pyr: 0xe0b56e, pyrDark: 0xc7944f, ruin: 0xd6ad6c, adobe: 0xe8c58a,
  palmTrunk: 0xa87a4a, palm: 0x5bbf3c, cactus: 0x4fa64a, pot: 0xc8643c, potRim: 0xe08a52, cloth: 0x2f7fd8,
};
/** Небо карт: холмы — голубое, пустыня — тёплая дымка у горизонта. */
const SKY: Record<'hills' | 'pyramid', [number, number]> = { hills: [0x2f86f0, 0xdcecff], pyramid: [0x3f8fe0, 0xffe0ad] };
export type MapId = 'hills' | 'pyramid';

export function createScene(parent: HTMLElement): Game {
  const world = createWorld(parent, { ...CLASSIC, cloudSea: true });
  const { renderer, scene } = world;
  const cam = new FollowCamera();
  const input = new Input(parent);
  const physics = new Physics();
  const fps = new FpsMeter(parent, () => {
    const r = renderer.info.render;
    return `DC ${r.calls} · ${(r.triangles / 1000).toFixed(0)}k △ · ${quality.preset.name} ×${renderer.getPixelRatio().toFixed(2)}`;
  });

  /* ───────────────────────────── АРЕНА ───────────────────────────── */
  // постоянная часть — остров и заборчик. Два вида (трава / песок) склеены заранее, показываем тот, что у карты.
  // Физика у них общая: плита земли и невидимые стенки забора одинаковые.
  physics.add({ box: new THREE.Box3(new THREE.Vector3(-HALF, -2, -HALF), new THREE.Vector3(HALF, 0, HALF)) });
  {
    const E = HALF - 0.35;
    for (const side of [0, 1, 2, 3]) {
      const alongX = side < 2, c = side % 2 ? -E : E;
      const lo = new THREE.Vector3(alongX ? -HALF : c - 0.25, 0, alongX ? c - 0.25 : -HALF), hi = new THREE.Vector3(alongX ? HALF : c + 0.25, FENCE_H, alongX ? c + 0.25 : HALF);
      physics.add({ box: new THREE.Box3(lo, hi), kind: 'fence' });
    }
  }
  const island = (desert: boolean): THREE.Group => {
    const g = new THREE.Group();
    scene.add(g);
    const ms: THREE.Mesh[] = [];
    const deco = (sx: number, sy: number, sz: number, x: number, y: number, z: number, color: number) => {
      const m = block({ x: sx, y: sy, z: sz }, color);
      m.position.set(x, y + sy / 2, z);
      g.add(m);
      ms.push(m);
    };
    // остров «висит в небе»: сверху трава (песок), под ней земля (песчаник), внизу камни
    deco(HALF * 2, 2, HALF * 2, 0, -2, 0, desert ? C.sand : C.grass);
    deco(HALF * 2 - 1, 5, HALF * 2 - 1, 0, -7, 0, desert ? C.sandRock : C.dirt);
    deco(HALF * 2 - 8, 4, HALF * 2 - 8, 0, -11, 0, desert ? C.sandRock : C.dirt);
    deco(HALF - 4, 4, HALF - 4, 2, -15, -1, C.stoneDark);
    // низкий заборчик по краю: случайно не выбежишь, а перепрыгнуть можно — тогда упал и проиграл (решение заказчика).
    // В пустыне вместо деревянного — низкая глиняная стенка со столбиками-тумбами
    const E = HALF - 0.35, len = HALF * 2 - 0.7;
    for (const side of [0, 1, 2, 3]) {
      const alongX = side < 2, c = side % 2 ? -E : E;
      if (desert) {
        deco(alongX ? len : 0.4, 0.6, alongX ? 0.4 : len, alongX ? 0 : c, 0, alongX ? c : 0, C.adobe);
        for (let k = -HALF + 1; k <= HALF - 1; k += 6) {
          deco(0.7, 1.05, 0.7, alongX ? k : c, 0, alongX ? c : k, C.sandRock);
          deco(0.9, 0.2, 0.9, alongX ? k : c, 1.05, alongX ? c : k, C.adobe);
        }
      } else {
        deco(alongX ? len : 0.16, 0.16, alongX ? 0.16 : len, alongX ? 0 : c, 0.32, alongX ? c : 0, C.fence);
        deco(alongX ? len : 0.16, 0.16, alongX ? 0.16 : len, alongX ? 0 : c, 0.78, alongX ? c : 0, C.fence);
        for (let k = -HALF + 1; k <= HALF - 1; k += 3) deco(0.3, 1.1, 0.3, alongX ? k : c, 0, alongX ? c : k, C.post);
      }
    }
    if (desert) {
      // окружение пустыни: вдали из облаков встают большие пирамиды и песчаные островки с пальмами (только картинка)
      const far: [number, number, number, number][] = [[-95, -120, 34, 0.55], [70, -135, 46, 0.2], [150, -40, 30, -0.3], [-150, 30, 38, 0.9]];
      for (const [x, z, w, y0] of far) {
        const step = w / 5, base = -24 + y0;
        for (let i = 0; i < 5; i++) deco(w - i * step, step * 0.9, w - i * step, x, base + i * step * 0.9 + 18, z, i === 4 ? C.pyrDark : C.pyr);
      }
      for (const [x, z] of [[-60, 85], [95, 70]]) {
        deco(14, 3, 14, x, -4, z, C.sand);
        deco(11, 6, 11, x, -10, z, C.sandRock);
        for (let i = 0; i < 4; i++) deco(0.8, 1, 0.8, x + i * 0.25, -1 + i, z, C.palmTrunk);
        deco(4, 0.4, 4, x + 1, 3, z, C.palm);
      }
    }
    mergeStatic(g, ms, true);
    return g;
  };
  const islands = { hills: island(false), pyramid: island(true) };

  // расстановка — новая каждый раунд (просьба заказчика): холмы, плита и башня поворачиваются/зеркалятся,
  // ящики и деревья встают на случайные свободные места
  let map: MapId = progress.snapshot().map === 'pyramid' ? 'pyramid' : 'hills';
  const layout = new THREE.Group();
  scene.add(layout);
  let layoutSolids: Solid[] = [];
  /** Точки большого холма по возрастанию высоты (1, 2, 3 м) — для бота-тестера. */
  let hill: [number, number][] = [];
  const buildLayout = () => {
    for (const s of layoutSolids) physics.remove(s);
    layoutSolids = [];
    for (const c of [...layout.children]) { (c as THREE.Mesh).geometry.dispose(); c.removeFromParent(); }
    const turns = Math.floor(Math.random() * 4), flip = Math.random() < 0.5;
    const T = (x: number, z: number): [number, number] => {
      let a = flip ? -x : x, b = z;
      for (let i = 0; i < turns; i++) [a, b] = [-b, a];
      return [a, b];
    };
    const parts: THREE.Mesh[] = [];
    /** Блок в «чертёжных» координатах (до поворота). pos — центр низа. */
    const put = (sx: number, sy: number, sz: number, x: number, y: number, z: number, color: number, hard: boolean | 'leaf' = true, raw = false) => {
      const [px, pz] = raw ? [x, z] : T(x, z), swap = !raw && turns % 2 === 1;
      const m = block({ x: swap ? sz : sx, y: sy, z: swap ? sx : sz }, color);
      m.position.set(px, y + sy / 2, pz);
      layout.add(m);
      if (color === C.crate) m.userData.ownUV = true;   // ящик: картинка на всю грань, а не мировой рисунок
      if (hard) layoutSolids.push(physics.addMesh(m, hard === 'leaf' ? 'leaf' : undefined));
      parts.push(m);
    };
    /** Украшение под углом (листья пальмы): без физики, сквозь него можно пройти. ry — поворот, tilt — наклон вниз. */
    const leaf = (sx: number, sy: number, sz: number, x: number, y: number, z: number, color: number, ry: number, tilt: number) => {
      const m = block({ x: sx, y: sy, z: sz }, color);
      m.rotation.order = 'YZX';
      m.rotation.set(0, ry, -tilt);
      m.position.set(x, y, z);
      layout.add(m);
      parts.push(m);
    };
    const desert = map === 'pyramid';
    islands.hills.visible = !desert;
    islands.pyramid.visible = desert;
    world.setSky(...SKY[map]);
    if (map === 'pyramid') {
      // ВТОРАЯ КАРТА «Пирамида» (Stage 9): ступенчатая пирамида 1→2→3→4 м — самое высокое место арены,
      // но на вершине тесно; две площадки 2 м с ступенькой, низкие стенки-укрытия посередине, башня с лесенкой
      put(16, 1, 16, 0, 0, -12, C.sand);
      put(12, 2, 12, 0, 0, -12, C.sand);
      put(8, 3, 8, 0, 0, -12, C.sand);
      put(4, 4, 4, 0, 0, -12, C.pyrDark);
      hill = ([[0, -5], [0, -7], [0, -9], [0, -12]] as const).map(([x, z]) => T(x, z));
      for (const sx of [-1, 1]) {
        put(5, 2, 5, 20 * sx, 0, 18, C.sand);
        put(2, 1, 2, 20 * sx, 0, 14.5, C.pyrDark);
        put(9, 1, 1, 13 * sx, 0, 3, C.pyrDark);   // стенка 1 м: от котов не спасёт, от метеора — укрытие сбоку
      }
      put(5, 6, 5, 20, 0, -20, C.sand);
      for (let i = 0; i < 5; i++) put(2, i + 1, 2, 20, 0, -8.5 - i * 2, C.pyrDark);
      put(0.3, 3, 0.3, 21.8, 6, -21.8, C.palmTrunk, false);
      put(1.8, 1.1, 0.2, 22.8, 7.7, -21.8, C.cloth, false);   // синий вымпел вместо красного флажка холмов
    } else {
      // ступенчатый холм (1 → 2 → 3 м): забраться повыше — спасение от лавы и бегающих
      put(16, 1, 14, -16, 0, -13, C.stone);
      put(10, 2, 9, -18, 0, -15, C.stone);
      put(5, 3, 5, -21, 0, -18, C.stone);
      hill = ([[-16, -9], [-18, -14], [-21, -18]] as const).map(([x, z]) => T(x, z));
      // второй, низкий холм: плато 2 м со ступенькой
      put(6, 2, 6, -6, 0, 20, C.stone);
      put(2, 1, 2, -10, 0, 20, C.stoneDark);
      // широкая плита 1 м — от лавы спасает, от котов нет
      put(8, 1, 6, 14, 0, -2, C.stoneDark);
      // башня 6 м и лесенка из блоков по 1 м
      put(5, 6, 5, 20, 0, -20, C.stone);
      for (let i = 0; i < 5; i++) put(2, i + 1, 2, 8.5 + i * 2, 0, -19, C.stoneDark);
      put(0.3, 3, 0.3, 21.8, 6, -21.8, C.trunk, false);
      put(1.8, 1.1, 0.2, 22.8, 7.7, -21.8, C.flag, false);
    }
    /** Свободно ли место радиуса r: не на постройке, с проходом 1,2 м, не у старта игрока. */
    const free = (x: number, z: number, r: number) => {
      if (Math.abs(x) > HALF - 3 - r || Math.abs(z) > HALF - 3 - r || Math.hypot(x - SPAWN.x, z - SPAWN.z) < 4 + r) return false;
      for (const s of layoutSolids) {
        const b = s.box, g = 1.2;
        if (x + r > b.min.x - g && x - r < b.max.x + g && z + r > b.min.z - g && z - r < b.max.z + g) return false;
      }
      return true;
    };
    const spot = (r: number): [number, number] | null => {
      for (let k = 0; k < 300; k++) {
        const x = (Math.random() * 2 - 1) * (HALF - 3), z = (Math.random() * 2 - 1) * (HALF - 3);
        if (free(x, z, r)) return [x, z];
      }
      return null;
    };
    if (desert) {
      // ПУСТЫНЯ: вместо ящиков — обломки песчаника и колонны, амфоры; вместо деревьев — пальмы и кактусы, пара обелисков
      const groups: [number, number, number][][] = [
        ...Array(3).fill([[0, 0, 0], [2, 0, 0], [1, 2, 0]]),
        ...Array(3).fill([[0, 0, 0], [2, 0, 0]]),
      ];
      for (const g of groups) {
        const p = spot(2.2);
        if (!p) continue;
        const along = Math.random() < 0.5;
        for (const [dx, y, dz] of g) put(2, 2, 2, p[0] + (along ? dx - 1 : dz), y, p[1] + (along ? dz : dx - 1), C.ruin, true, true);
      }
      // колонны: база, ствол (обломан на разной высоте), у целой — капитель
      for (let k = 0; k < 3; k++) {
        const p = spot(1.1);
        if (!p) continue;
        const h = k === 0 ? 3.2 : 1.4 + Math.random() * 0.8;
        put(1.7, 0.4, 1.7, p[0], 0, p[1], C.pyrDark, true, true);
        put(1.1, h, 1.1, p[0], 0.4, p[1], C.ruin, true, true);
        if (k === 0) put(1.6, 0.35, 1.6, p[0], 0.4 + h, p[1], C.pyrDark, true, true);
      }
      // обелиски 5,6 м — не залезть, но за ними можно спрятаться от метеора
      for (let k = 0; k < 2; k++) {
        const p = spot(1);
        if (!p) continue;
        put(1.5, 0.5, 1.5, p[0], 0, p[1], C.pyrDark, true, true);
        put(1.1, 4.4, 1.1, p[0], 0.5, p[1], C.pyr, true, true);
        put(0.7, 0.7, 0.7, p[0], 4.9, p[1], C.cloth, true, true);
      }
      // амфоры — невысокие, через них перепрыгнуть
      for (let k = 0; k < 5; k++) {
        const p = spot(0.7);
        if (!p) continue;
        put(0.9, 0.75, 0.9, p[0], 0, p[1], C.pot, true, true);
        put(0.55, 0.3, 0.55, p[0], 0.75, p[1], C.pot, false, true);
        put(0.75, 0.12, 0.75, p[0], 1.05, p[1], C.potRim, false, true);
      }
      // пальмы: изогнутый ствол из колец, на макушке — веер длинных листьев (сквозь листья можно пройти)
      const rings = 4, LEAN = Array.from({ length: rings }, (_, i) => 0.08 + i * 0.07).reduce((u, v) => u + v, 0);
      for (let k = 0; k < 5; k++) {
        // место выбираем сразу вместе с блоком-ступенькой: с земли до листьев (4,1 м) не допрыгнуть, а с блока 2 м —
        // как раз (пальму без ступеньки не ставим)
        let p: [number, number] | null = null, a = 0, step: [number, number] | null = null;
        for (let tries = 0; tries < 12 && !step; tries++) {
          p = spot(1.4);
          if (!p) break;
          a = Math.random() * Math.PI * 2;
          const ex = p[0] + Math.cos(a) * LEAN, ez = p[1] + Math.sin(a) * LEAN;
          for (const da of [0, 0.7, -0.7, 1.4, -1.4]) {
            const bx = ex + Math.cos(a + da) * 3.4, bz = ez + Math.sin(a + da) * 3.4;
            if (free(bx, bz, 1)) { step = [bx, bz]; break; }
          }
        }
        if (!p || !step) continue;
        put(2, 2, 2, step[0], 0, step[1], C.ruin, true, true);
        const dx = Math.cos(a), dz = Math.sin(a);
        let x = p[0], z = p[1];
        for (let i = 0; i < rings; i++) {
          const w = 0.78 - i * 0.05;
          put(w, 0.95, w, x, i * 0.95, z, C.palmTrunk, true, true);
          const lean = 0.08 + i * 0.07;
          x += dx * lean; z += dz * lean;
        }
        const top = rings * 0.95;
        // на листья можно встать (заказчик: «пальмы прозрачные, не могу на них встать»): невидимая площадка-крона,
        // как у деревьев холмов — тип 'leaf', для существ это не земля, метеор бьёт в её верх
        layoutSolids.push(physics.add({ box: new THREE.Box3(new THREE.Vector3(x - 1.9, top - 0.2, z - 1.9), new THREE.Vector3(x + 1.9, top + 0.35, z + 1.9)), kind: 'leaf' }));
        put(1.1, 0.7, 1.1, x, top - 0.1, z, C.palm, false, true);
        const n = 7, r0 = Math.random() * Math.PI;
        for (let i = 0; i < n; i++) {
          const ry = r0 + (i / n) * Math.PI * 2, L = 3.1, tilt = 0.32 + (i % 2) * 0.16;
          const cx = x + Math.cos(ry) * L * 0.46, cz = z - Math.sin(ry) * L * 0.46;
          leaf(L, 0.16, 0.95, cx, top + 0.35 - Math.sin(tilt) * L * 0.46, cz, C.palm, ry, tilt);
        }
        // кокосы
        for (let i = 0; i < 3; i++) { const b = r0 + i * 2.1; put(0.36, 0.36, 0.36, x + Math.cos(b) * 0.45, top - 0.35, z + Math.sin(b) * 0.45, C.trunk, false, true); }
      }
      // кактусы: ствол и «руки», колючие — на них не залезть, но обойти и спрятаться можно
      for (let k = 0; k < 5; k++) {
        const p = spot(1);
        if (!p) continue;
        const h = 1.9 + Math.random() * 0.8, side = Math.random() < 0.5;
        put(0.85, h, 0.85, p[0], 0, p[1], C.cactus, true, true);
        for (const s of [-1, 1]) {
          const ay = 0.7 + (s > 0 ? 0.2 : 0.55), ox = side ? s * 0.7 : 0, oz = side ? 0 : s * 0.7;
          put(side ? 0.6 : 0.45, 0.42, side ? 0.45 : 0.6, p[0] + ox * 0.75, ay, p[1] + oz * 0.75, C.cactus, false, true);
          put(0.45, 0.85, 0.45, p[0] + ox * 1.2, ay, p[1] + oz * 1.2, C.cactus, false, true);
        }
      }
    } else {
      // ящики: «стенки» с ящиком наверху (на них сухо и при высокой лаве), пары и одиночные
      const groups: [number, number, number][][] = [
        ...Array(4).fill([[0, 0, 0], [2, 0, 0], [1, 2, 0]]),
        ...Array(4).fill([[0, 0, 0], [2, 0, 0]]),
        ...Array(3).fill([[0, 0, 0]]),
      ];
      for (const g of groups) {
        const p = spot(g.length > 1 ? 2.2 : 1.2);
        if (!p) continue;
        const along = Math.random() < 0.5;
        for (const [dx, y, dz] of g) put(2, 2, 2, p[0] + (along ? dx : dz) - (g.length > 1 && along ? 1 : 0), y, p[1] + (along ? dz : dx) - (g.length > 1 && !along ? 1 : 0), C.crate, true, true);
      }
      // деревья: ствол твёрдый, крона тоже держит (заказчик: «забрался на дерево — должен остаться»).
      // Тип 'leaf': для существ и ботов крона не земля — под ней по-прежнему можно стоять; метеор и бомба бьют в верх кроны (impactAt)
      for (let k = 0; k < 5; k++) {
        const p = spot(1.6);
        if (!p) continue;
        put(1, 3, 1, p[0], 0, p[1], C.trunk, true, true);
        put(3.4, 2.4, 3.4, p[0], 3, p[1], C.leaves, 'leaf', true);
        put(2, 1.2, 2, p[0], 5.4, p[1], C.leaves, 'leaf', true);
      }
    }
    mergeStatic(layout, parts, true);
    // препятствия перед игроком «просвечивают» (см. occlude.ts)
    for (const c of layout.children) { const m = c as THREE.Mesh; m.material = occludable(m.material as THREE.Material); }
    // манекены — тоже на новые места
    dummySpots = [];
    for (let k = 0; k < DUMMIES; k++) dummySpots.push(spot(0.8) ?? [k * 3 - 9, -3]);
    // верхушки построек — куда боты лезут прятаться и спасаться от лавы
    spots = layoutSolids.filter((sd) => sd.kind !== 'leaf' && sd.box.max.x - sd.box.min.x > 1.6 && sd.box.max.z - sd.box.min.z > 1.6).map((sd) => { const b = sd.box; return { x: (b.min.x + b.max.x) / 2, z: (b.min.z + b.max.z) / 2, h: b.max.y, sx: (b.max.x - b.min.x) / 2 - 0.3, sz: (b.max.z - b.min.z) / 2 - 0.3 }; });
  };
  let dummySpots: [number, number][] = [];
  let spots: Spot[] = [];

  /** Верх самой высокой опоры в точке (куда падает метеор). */
  const heightAt = (x: number, z: number): number => {
    let top = 0;
    for (const sd of physics.solids) {
      const b = sd.box;
      if (sd.kind !== 'leaf' && x > b.min.x && x < b.max.x && z > b.min.z && z < b.max.z && b.max.y < 30) top = Math.max(top, b.max.y);
    }
    return top;
  };
  /** То же, но с кронами: метеор и бомба бьют в верх кроны, а не пролетают её насквозь к стволу. */
  const impactAt = (x: number, z: number): number => {
    let top = 0;
    for (const sd of physics.solids) {
      const b = sd.box;
      if (x > b.min.x && x < b.max.x && z > b.min.z && z < b.max.z && b.max.y < 30) top = Math.max(top, b.max.y);
    }
    return top;
  };
  cloudsAlong(scene, [new THREE.Vector3(0, 0, 0)], true);
  world.shadowArea(new THREE.Vector3(0, 0, 0), HALF + 4);

  /* ─────────────────────── ИГРОК И МАНЕКЕНЫ ──────────────────────── */
  const player = new Avatar(SKINS[0].look);
  scene.add(player.root);
  const ctl = new Controller(player, (p, v, dt) => physics.move(p, v, dt));
  // лицом к −Z, спиной к камере: на старте видно арену, а не лицо персонажа
  ctl.setSpawn(new THREE.Vector3(SPAWN.x, 0.01, SPAWN.z), Math.PI);
  ctl.onJump = () => { sfx.play('jump', 0.08); puff(ctl.pos.x, ctl.pos.y, ctl.pos.z, 0.5, 0); };
  ctl.onLand = (v) => { if (v > 10) sfx.play('land', 0.1); if (v > 6) puff(ctl.pos.x, ctl.pos.y, ctl.pos.z, Math.min(1.4, v / 13), 0); };


  /* ───────────────────────────── ХАОС ────────────────────────────── */
  const fx = new Particles(scene);
  /**
   * Пыль от прыжков и приземлений — СВОЙ пул частиц (ещё 1 вызов отрисовки): иначе сотни облачков от прыгающих
   * слаймов вытесняли бы из общего пула взрывы и пар. Бюджет: у игрока всегда полностью; боты — ближе 24 м;
   * существа — ближе 18 м, только тяжёлые приземления; на слабом уровне качества вдвое меньше, у существ нет вовсе;
   * за кадр не больше DUST_FRAME частиц от ботов и существ.
   */
  const dust = new Particles(scene);
  const DUST_FRAME = 30;
  let dustLeft = DUST_FRAME;
  const puff = (x: number, y: number, z: number, scale: number, who: 0 | 1 | 2) => {
    const low = quality.tier === 0;
    if (who === 2 && low) return;
    if (who > 0) {
      if (Math.hypot(ctl.pos.x - x, ctl.pos.z - z) > (who === 1 ? 24 : 18) || dustLeft <= 0) return;
    }
    const k = scale * (low ? 0.5 : 1);
    if (who > 0) dustLeft -= Math.round(10 * k);
    dust.emit('puff', tmp.set(x, y + 0.12, z), k);
  };
  const flames = new Flames(scene);
  const bolts = new Flames(scene, boltTexture(), 300, true);
  const surface = new Surface(scene, HALF, flames, bolts);
  const hail = new Hail(scene, HALF);
  const lava = new Lava(scene, HALF);
  const ui = new RoundUi(parent);
  // мини-обучение первого раунда (Playgama 3.1.3)
  const tutSpawn = new THREE.Vector3();
  let tutJumped = false;
  const tutorial = new Tutorial(parent, {
    touch: () => input.state.touch,
    reelsSpinning: () => reels.spinning,
    moved: () => Math.hypot(ctl.pos.x - tutSpawn.x, ctl.pos.z - tutSpawn.z),
    jumped: () => tutJumped,
    highlightStop: (on) => reels.highlight(on),
    highlightJump: (on) => input.highlightJump(on),
    ghostStick: (on) => input.ghostStick(on),
    avoid: () => reels.rect(),
    L, round: ROUND,
  });
  ui.setLabels(L('ЕЩЁ РАЗ', 'AGAIN'));
  const reels = new Reels(parent, L('СТОП', 'STOP'));
  const menu = new Menu(parent, L);
  const chars = new Characters(parent, L);
  const enc = new Encyclopedia(parent, L);
  /* ── Таблица рекордов: очки = монеты за все раунды; id таблицы — как в playgama-bridge-config.json и в консоли Playgama ── */
  const BOARD = 'chaos_points';
  const boardMe = () => ({ score: progress.snapshot().score ?? 0, name: (/^guest(\s|$)/i.test(core.leaderboards.player.name) ? '' : core.leaderboards.player.name) || L('Игрок', 'Player') });
  const board = new Leaderboard(parent, L, {
    demo: !core.leaderboards.available && core.leaderboards.demo,
    me: boardMe,
    load: async () => {
      if (!core.leaderboards.available) return demoRows(boardMe());
      const myId = core.leaderboards.player.id;
      const rows = await core.leaderboards.fetchTop(BOARD, 50);
      return rows.map((e) => ({ rank: e.rank, name: e.player.publicName, score: e.score, photo: e.player.getAvatarSrc('small'), me: Boolean(myId) && e.player.uniqueID === myId }));
    },
  });
  const boardOn = () => core.leaderboards.available || core.leaderboards.demo;
  const submitScore = (score: number) => {
    if (score > 0 && core.leaderboards.available) core.leaderboards.submit(BOARD, score).catch((e) => console.warn('[leaderboard]', e));
  };
  const tmp = new THREE.Vector3();
  // боты (этап 5): бегают, прячутся и гибнут смешно; барабан не крутят
  const bots: ArenaBots = new ArenaBots(scene, physics, DUMMIES, {
    heightAt: (x, z) => heightAt(x, z),
    cell: (x, z) => surface.at(x, z),
    lava: () => lava.level,
    time: () => t,
    mobs: () => creatures.mobs,
    spots: () => spots,
    puff: (x, y, z, k) => puff(x, y, z, k, 1),
    died: (x, y, z) => { fx.emit('poof', tmp.set(x, y + 1, z), 0.8); if (Math.hypot(ctl.pos.x - x, ctl.pos.z - z) < 18) sfx.play('respawn', 0.25, 0.5); },
    player: () => (state === 'play' ? ctl.pos : null),
  });

  let t = 0, introT = 0, started = false, state: 'play' | 'dead' | 'win' = 'play', reelNo = 0, lavaStep = 0, burnT = 0, sparkT = 0, slipT = 0;
  let slowT = 0, shockT = 0;
  const reacted = new Map<string, number>();   // сколько раз за раунд сработала каждая реакция — для автотеста
  let lavaWarned = false, deathCause = '', hearts = HEARTS, hurtT = 0, hits = 0;
  let diff: Difficulty = 'normal';
  const D = () => DIFF[diff];
  const reelLog: string[] = [];   // итоги барабанов за раунд — для автопрогона


  const die = (cause: string) => {
    if (state !== 'play') return;
    if (import.meta.env.DEV && (window as unknown as { __god?: boolean }).__god) return;   // съёмка скриншотов
    state = 'dead';
    deathCause = cause;
    hearts = 0; hurtT = 0; ui.setHearts(0, D().hearts);
    player.root.visible = false;
    reels.hide();
    fx.emit('poof', tmp.copy(ctl.pos).setY(ctl.pos.y + 1.2), 1.6);
    fx.emit('confetti', tmp, 1);
    cam.shake(0.4);
    sfx.play('respawn', 0);
    finish(false);
  };

  /** Удар: минус сердечко, отброс от источника (dx, dz — от него к игроку) и мигание-неуязвимость. Последнее — гибель. */
  const hurt = (cause: string, dx = 0, dz = 0) => {
    if (state !== 'play' || hurtT > 0) return;
    if (import.meta.env.DEV && (window as unknown as { __god?: boolean }).__god) return;
    hearts--; hits++;
    ui.setHearts(hearts, D().hearts);
    if (hearts <= 0) { die(cause); return; }
    hurtT = INVULN;
    let l = Math.hypot(dx, dz);
    if (l < 1e-3) { const a = Math.random() * 6.28; dx = Math.cos(a); dz = Math.sin(a); l = 1; }
    // отброс слабый, а при поднятой лаве почти никакой: иначе удар сбрасывал с холма в лаву и сердечки не спасали
    const kb = lava.level > -2 ? 2.5 : 7;
    ctl.vel.x = (dx / l) * kb; ctl.vel.z = (dz / l) * kb; ctl.vel.y = lava.level > -2 ? 4 : 6;
    fx.emit('poof', tmp.copy(ctl.pos).setY(ctl.pos.y + 1.2), 1, [0xff4a4a, 0xffffff]);
    cam.shake(0.3);
    sfx.play('hurt', 0.1);
  };

  /** «Момент хаоса»: реакция впервые за раунд — замедление, надпись, тряска. Дальше просто считаем. */
  const moment = (id: string, x: number, z: number, label?: string) => {
    const n = reacted.get(id) ?? 0;
    reacted.set(id, n + 1);
    if (n > 0 || state !== 'play') return;
    const r = REACT[id];
    if (!r) return;
    slowT = SLOW_T;
    ui.announce(label ?? L(r[0], r[1]), r[2]);
    const d = Math.hypot(ctl.pos.x - x, ctl.pos.z - z);
    cam.shake(d < 20 ? 0.25 : 0.1);
    sfx.play('checkpoint', 0.15);
  };
  surface.onReact = (id, x, z) => moment(id, x, z);

  /** «Огненная курица» — причина гибели в согласованной форме. */
  const causeOf = (m: { kind: NounId; adj: AdjId }) => {
    const s = agree(1, m.adj, m.kind).join(' ');
    return s[0].toUpperCase() + s.slice(1);
  };
  /** Боты в радиусе: гибнут (взрыв отбрасывает сильнее), укушенные зомби исчезают — там встают зомби. */
  const dummiesNear = (x: number, y: number, z: number, r: number, infect = false, power = 1) => bots.hit(x, y, z, r, infect, power);

  /** Игрок отсиживается на возвышении (башня, верх холма/пирамиды), пока финальная лава не пошла. */
  const perched = () => state === 'play' && lavaStep === 0 && ctl.grounded && ctl.pos.y >= GROUND_Y + 2.4;
  const creatures = new Creatures(scene, HALF, surface, fx, flames, bolts, {
    perched,
    heightAt,
    impactAt,
    lavaLevel: () => lava.level,
    target: () => (state === 'play' ? ctl.pos : null),
    targetVel: () => ctl.vel,
    touchPlayer(m, kill, dx, dz) {
      if (kill) { hurt(causeOf(m), dx, dz); return; }
      // обычная курица не убивает, а отпихивает
      const l = Math.hypot(dx, dz) || 1;
      ctl.vel.x += (dx / l) * 9; ctl.vel.z += (dz / l) * 9;
      if (ctl.grounded) ctl.vel.y = 6;
      sfx.play(m.kind === 'cat' ? 'meow' : m.kind === 'chicken' ? 'cluck' : 'bounce', 0.15, 0.7);
    },
    slip() {
      if (slipT <= 0) { sfx.play('bounce', 0.3, 0.6); ctl.vel.y = Math.max(ctl.vel.y, 5); }
      slipT = 1.3;
    },
    boom(x, y, z, r, m) {
      const ice = m.adj === 'ice' || m.kind === 'snowman';
      fx.emit(ice ? 'poof' : 'lava', tmp.set(x, y + 0.5, z), Math.min(2.5, r * 0.6));
      const d = Math.hypot(ctl.pos.x - x, ctl.pos.z - z);
      cam.shake(Math.max(0, 0.45 - d * 0.03) * Math.min(2, r / 2));
      // взрыв слышно издалека, но тише с расстоянием; ледяной — хруст льда
      if (d < 40) sfx.play(ice ? 'freeze' : 'boom', 0.12, Math.min(1, 1.25 - d / 32) * Math.min(1.2, 0.5 + r * 0.15));
      if (state === 'play' && d < r && Math.abs(ctl.pos.y - y) < 2.6) hurt(causeOf(m), ctl.pos.x - x, ctl.pos.z - z);
      dummiesNear(x, y, z, r * 1.2, false, 1.8);
    },
    hitDummies: (x, y, z, r, infect) => (r > 0 ? dummiesNear(x, y, z, r, infect) : []),
    react: (id, x, z, label) => moment(id, x, z, label),
    land: (x, y, z, s) => puff(x, y, z, Math.min(1.2, 0.45 * s), 2),
    nudge: (vx, vy, vz) => { if (state === 'play') { ctl.vel.x += vx; ctl.vel.y = Math.min(ctl.vel.y + vy, 9); ctl.vel.z += vz; } },
  });

  // гроза над тем, кто долго стоит на месте (заказчик: «залез на гору — и сижу всю игру»), см. storm.ts
  const storm = new Storm(scene, {
    impactAt,
    perched,
    gather: (x, z) => { moment('storm', x, z); sfx.play('boom', 0.1, 0.35, 0.55); },   // далёкий гром — тот же взрыв, ниже и тише
    strike(x, y, z, r) {
      fx.emit('poof', tmp.set(x, y + 0.4, z), 1.2, [0xfff6a8, 0xffe14d, 0xffffff]);
      const d = Math.hypot(ctl.pos.x - x, ctl.pos.z - z);
      cam.shake(Math.max(0.1, 0.5 - d * 0.03));
      sfx.play('zap', 0.1);
      sfx.play('boom', 0.1, 0.9);
      // в крону или в землю под ней: стоишь под деревом — крона прикрыла
      if (state === 'play' && d < r && ctl.pos.y > y - 0.6 && ctl.pos.y < y + 2.6) hurt(L('Молния', 'Lightning'), ctl.pos.x - x, ctl.pos.z - z);
      if (y < 0.5) surface.ignite(x, z, 4);   // молния поджигает траву
      dummiesNear(x, y, z, r, false, 1.4);
    },
  });

  /* ───────────── ПЕРСОНАЖИ (этап 8) ───────────── */
  const models = new Map<string, CharModel>();
  let skin = 'rookie';
  /** Надеть игроку персонажа (если модель загрузилась). */
  const wearSkin = (id: string) => {
    skin = charById(id).id;
    const m = models.get(skin);
    if (m) player.setModel(m);
  };
  /** Соперники — случайные персонажи, не такие, как у игрока: пусть выглядят как живые игроки со своими скинами. */
  const dressBots = () => {
    const pool = ROSTER.map((c) => c.id).filter((id) => id !== skin && models.has(id)).sort(() => Math.random() - 0.5);
    bots.list.forEach((b, i) => { const m = models.get(pool[i % Math.max(1, pool.length)]); if (m) b.avatar.setModel(m); });
  };

  const restart = () => {
    reelLog.length = 0; hits = 0; lavaWarned = false; reacted.clear(); slowT = 0; shockT = 0;
    t = 0; introT = INTRO; started = false; reelNo = 0; lavaStep = 0; burnT = 0; slipT = 0; state = 'play';
    surface.reset(); creatures.reset(); lava.reset(); flames.clear(); bolts.clear(); hail.on = false;
    storm.reset(); storm.delay = D().storm;
    reels.hide();
    buildLayout();
    bots.reset(dummySpots);
    if (models.size) dressBots();   // каждый раунд — новые облики соперников
    hearts = D().hearts; hurtT = 0; ui.setHearts(hearts, hearts);
    creatures.level.runners = D().runners; creatures.level.speed = D().speed; creatures.level.chase = D().chase; creatures.level.roam = D().roam;
    player.root.visible = true;
    ctl.respawn();
    ctl.grip = 1; ctl.speedMul = 1;
    ui.hideResult();
    ui.setTime(ROUND);
  };

  /* ───────────── МЕНЮ, ПАУЗА, ИТОГ (этап 6) ─────────────
   * Первый запуск — сразу в раунд на лёгком (ребёнок играет с первой секунды), меню — после итога.
   * Дальше при входе — меню с выбранной сложностью. Под меню арена рисуется, камера облетает её. */
  let mode: 'menu' | 'round' | 'pause' = 'round';
  let muted = progress.snapshot().muted;
  const applyMute = () => { sfx.setSfxVolume(muted ? 0 : 1); sfx.setMusicVolume(muted ? 0 : 1); };
  const startRound = () => {
    mode = 'round';
    menu.hide();
    menu.setPauseButton(true);
    ui.setHud(true);
    input.setVisible(true);
    restart();
    ui.announce(L(`ВЫЖИВИ ${ROUND} СЕКУНД!`, `SURVIVE ${ROUND} SECONDS!`), '#fff');
    tutSpawn.copy(ctl.pos); tutJumped = false;
    revived = false; paidCoins = 0;
    const pt = progress.snapshot();
    if (!pt.tutorial && pt.runs === 0) tutorial.start(); else tutorial.stop();
    tutorial.setVisible(true);
    sfx.setDuck(false);
    core.gameplayStart();
  };
  const showMain = () => {
    mode = 'menu';
    reels.hide();
    menu.setPauseButton(false);
    ui.setHud(false);
    input.setVisible(false);
    menu.showMain(diff, muted, progress.snapshot().coins, skin);
    tutorial.stop();
    core.gameplayStop();
    sfx.setDuck(false);
  };
  /** Конец раунда: рекорд по сложности, счётчик забегов, экран итога. */
  const finish = (win: boolean) => {
    const p = progress.snapshot();
    const time = win ? ROUND : Math.floor(t), was = p.best[diff] ?? 0, newBest = time > was;
    // монеты начисляем сразу (а не по кнопке): закрыл вкладку на экране итога — заработанное не пропало.
    // После «ожить» доплачиваем только разницу, и забег считаем один раз.
    const coins = Math.max(0, roundCoins(time, win, diff) - paidCoins);
    paidCoins += coins;
    lastCoins = coins;
    if (!revived) roundsPlayed++;
    tutorial.stop();
    const score = (p.score ?? 0) + coins;
    progress.patch({ tutorial: true, runs: p.runs + (revived ? 0 : 1), best: newBest ? { ...p.best, [diff]: time } : p.best, coins: p.coins + coins, score });
    submitScore(score);   // после итога раунда — не чаще (Bridge: «после значимого результата»)
    menu.setPauseButton(false);
    core.gameplayStop();
    if (!win) sfx.play('fail', 0, 1);
    // итог не сразу: полсекунды видно, что произошло (взрыв, конфетти)
    setTimeout(() => {
      if (mode !== 'round' || state === 'play') return;
      ui.setHud(false);
      input.setVisible(false);
      menu.showResult({ win, title: win ? L('ТЫ ВЫЖИЛ!', 'YOU SURVIVED!') : L('ТЫ ПОГИБ', 'YOU DIED'), cause: win ? undefined : deathCause,
        time, round: ROUND, botsAlive: bots.alive + (win ? 1 : 0), botsTotal: DUMMIES + 1,   // «игроки», не «боты» (заказчик: пусть думают, что это люди)
        best: Math.max(was, time), newBest: newBest && was > 0, difficulty: diff, coins, total: progress.snapshot().coins,
        canRevive: !win && !revived && t < ROUND - 3 });
    }, 700);
  };
  /* ── «Ожить» за ролик: раз за попытку (Playgama 2.2), на самом высоком месте арены, 2 сердечка и 3 с мигания ── */
  let revived = false, paidCoins = 0;
  const revive = () => {
    if (state !== 'dead') return;
    revived = true;
    state = 'play';
    // где выше всего над лавой: вершины холма и башня
    const cand: [number, number][] = [...hill];
    let best = cand[0], bestH = -Infinity;
    for (const c of cand) { const h = heightAt(c[0], c[1]); if (h > bestH) { bestH = h; best = c; } }
    const keep = ctl.spawn.clone();
    ctl.setSpawn(tmp.set(best[0], bestH + 0.2, best[1]));
    ctl.respawn();
    ctl.setSpawn(keep);
    hearts = Math.min(2, D().hearts); ui.setHearts(hearts, D().hearts);
    hurtT = 3;   // мигание = неуязвимость
    player.root.visible = true;
    mode = 'round';
    menu.hide();
    menu.setPauseButton(true);
    ui.setHud(true);
    input.setVisible(true);
    sfx.setDuck(false);
    fx.emit('confetti', tmp.copy(ctl.pos).setY(ctl.pos.y + 1.5), 1);
    sfx.play('tada', 0, 0.6);
    ui.announce(L('ТЫ СНОВА В ИГРЕ!', 'BACK IN THE GAME!'), '#7dff6a');
    core.gameplayStart();
  };
  menu.onRevive = async () => {
    if (state !== 'dead' || revived) return false;
    const ok = await watchRewarded();
    if (!ok || state !== 'dead') return false;
    revive();
    return true;
  };
  /* ── монеты и персонажи (этап 8) ── */
  let lastCoins = 0;
  /** ×2 за ролик на экране итога: доплачиваем ещё столько же. Награда — строго по ответу площадки. */
  menu.onDouble = async () => {
    if (lastCoins <= 0) return false;
    core.gameplayStop();
    const ok = await watchRewarded();
    if (!ok) return false;
    const p = progress.snapshot();
    progress.patch({ coins: p.coins + lastCoins });
    lastCoins = 0;
    menu.setCoins(progress.snapshot().coins);
    return true;
  };
  const charState = () => {
    const p = progress.snapshot();
    const owned = p.owned.includes('rookie') ? p.owned : ['rookie', ...p.owned];
    return { coins: p.coins, owned, selected: skin, adViews: p.adViews ?? {} };
  };
  const unlock = (id: string) => {
    const p = progress.snapshot();
    if (!p.owned.includes(id)) progress.patch({ owned: [...p.owned, id] });
    pick(id);
  };
  const pick = (id: string) => {
    wearSkin(id);
    progress.patch({ skin });
    dressBots();   // соперник не должен оказаться в том же облике
    sfx.play('tada', 0, 0.5);
    chars.show(charState());
  };
  menu.onCharacters = () => { chars.show(charState()); };
  menu.setMap(map);
  menu.onMap = (m) => {
    if (m === map) return;
    map = m;
    progress.patch({ map: m });
    restart();   // арена за меню сразу перестраивается — ребёнок видит новую карту
    showMain();
  };
  menu.onEncyclopedia = () => { enc.show(progress.snapshot().seen ?? []); };
  menu.setLeaderboard(boardOn());
  core.onCapabilitiesChange(() => menu.setLeaderboard(boardOn()));
  menu.onLeaderboard = () => { board.show(); };
  board.onClose = () => { board.hide(); menu.showMain(diff, muted, progress.snapshot().coins, skin); };
  enc.onClose = () => { enc.hide(); menu.showMain(diff, muted, progress.snapshot().coins, skin); };
  chars.onClose = () => { chars.hide(); menu.showMain(diff, muted, progress.snapshot().coins, skin); };
  chars.onSelect = (id) => { if (charState().owned.includes(id)) pick(id); };
  chars.onBuy = (id) => {
    const c = charById(id), p = progress.snapshot();
    if (c.id !== id || charState().owned.includes(id) || p.coins < c.price) return;
    progress.patch({ coins: p.coins - c.price });
    unlock(id);
  };
  chars.onAd = async (id) => {
    const c = charById(id);
    if (c.id !== id || c.ads <= 0 || charState().owned.includes(id)) return;
    const ok = await watchRewarded();
    if (!ok) { chars.show(charState()); return; }
    const p = progress.snapshot();
    const views = (p.adViews?.[id] ?? 0) + 1;
    progress.patch({ adViews: { ...(p.adViews ?? {}), [id]: views } });
    if (views >= c.ads) unlock(id); else chars.show(charState());
  };
  /* Полноэкранная реклама — только в логической паузе (Playgama 2.1.3): по нажатию «Играть»/«Ещё раз» ПОСЛЕ
   * сыгранного раунда, никогда поверх игры и не на самом первом запуске. Частоту решает Bridge. */
  let roundsPlayed = 0, adBusy = false;
  const startAfterAd = async () => {
    if (adBusy) return;
    if (roundsPlayed > 0) {
      adBusy = true;
      try { await interstitialBetweenLevels(); } catch { /* не показали — просто играем */ } finally { adBusy = false; }
    }
    startRound();
  };
  menu.onPlay = (d) => { diff = d; progress.patch({ difficulty: d }); void startAfterAd(); };
  menu.onRetry = () => { void startAfterAd(); };
  menu.onMenu = showMain;
  menu.onPause = () => {
    if (mode !== 'round' || state !== 'play') return;
    mode = 'pause';
    ui.setHud(false);
    input.setVisible(false);
    menu.showPause(muted);
    tutorial.setVisible(false);
    core.gameplayStop();
    sfx.setDuck(true);
  };
  menu.onResume = () => { if (mode !== 'pause') return; mode = 'round'; tutorial.setVisible(true); ui.setHud(true); input.setVisible(true); menu.hide(); core.gameplayStart(); sfx.setDuck(false); };
  menu.onMute = (m) => { muted = m; applyMute(); progress.patch({ muted: m }); };

  /** Голос волны: сначала звук прилагательного (огонь, лёд…), следом — самого существа. */
  const ADJ_SFX: Partial<Record<AdjId, SfxName>> = { fire: 'fire', ice: 'freeze', bouncy: 'boing', giant: 'thud', fast: 'whoosh' };
  const NOUN_SFX: Record<NounId, SfxName> = { chicken: 'cluck', cat: 'meow', shark: 'splash', banana: 'boing', meteor: 'whoosh', bomb: 'thud',
    snowman: 'freeze', slime: 'splash', zombie: 'thud', dino: 'thud', ufo: 'zap', tornado: 'whoosh',
    bee: 'buzz', boulder: 'rumble', frog: 'croak' };
  const voice = (r: ReelResult) => {
    sfx.play('checkpoint', 0, 0.6);
    const a = ADJ_SFX[r.adj], n = NOUN_SFX[r.noun];
    if (a && a !== n) setTimeout(() => sfx.play(a, 0.05, 0.9), 120);
    // великан — ниже голосом, быстрый — выше
    setTimeout(() => sfx.play(n, 0.05, 1, r.adj === 'giant' ? 0.75 : r.adj === 'fast' ? 1.2 : 1), a ? 420 : 150);
  };

  /** Барабан встал: большая фраза и волна существ. */
  const onReel = (r: ReelResult) => {
    if (state !== 'play') return;
    started = true;   // время раунда пошло с первой волной
    ui.announce(phrase(r.n, r.adj, r.noun), ADJ_COLOR[r.adj]);
    reelLog.push(phrase(r.n, r.adj, r.noun));
    // энциклопедия: новое существо/свойство открывается
    const seen = progress.snapshot().seen ?? [];
    const add = [r.adj, r.noun].filter((id) => !seen.includes(id));
    if (add.length) progress.patch({ seen: [...seen, ...add] });
    voice(r);
    creatures.start(r);
  };

  const runScript = (dt: number) => {
    if (!started) {
      // до первой волны время не идёт: игрок осматривается, потом барабан
      if (state === 'play' && reelNo === 0 && (introT -= dt) <= 0) { reels.spin(onReel, reelPlan(0)); reelNo++; }
      return;
    }
    t += dt;
    if (state === 'play') ui.setTime(ROUND - t);
    if (state === 'play' && reelNo < REELS_AT.length && t >= REELS_AT[reelNo]) { reels.spin(onReel, reelPlan(reelNo)); reelNo++; }
    // заранее предупреждаем: лава не должна заставать врасплох
    if (!lavaWarned && t >= LAVA_STEPS[0].at - 3) { lavaWarned = true; ui.announce(L('ЛАВА СКОРО! ЗАБИРАЙСЯ ВЫШЕ!', 'LAVA SOON! CLIMB UP!'), '#ffb02a'); sfx.play('checkpoint', 0); }
    while (lavaStep < LAVA_STEPS.length && t >= LAVA_STEPS[lavaStep].at) {
      const st = LAVA_STEPS[lavaStep];
      ui.announce(L(st.ru, st.en), '#ff5a2a');
      lava.rise(st.sec * D().lava, st.top);
      cam.shake(0.25);
      sfx.play('bubble', 0.05, 0.9);
      // метеоритный дождь до конца раунда: две волны, половина метит в игрока
      // первая волна мягче (по автотесту финал убивал 44% дошедших)
      if (lavaStep === 0 || lavaStep === 2) setTimeout(() => sfx.play('whoosh', 0.05), 500);
      if (lavaStep === 0) creatures.start({ n: D().meteors[0], adj: 'fire', noun: 'meteor' }, D().aim);
      if (lavaStep === 2) creatures.start({ n: D().meteors[1], adj: 'fire', noun: 'meteor' }, D().aim);
      lavaStep++;
    }
    // ледяные существа приносят с собой град; град морозит землю понемногу
    hail.on = creatures.has('ice');
    if (hail.on && Math.random() < dt * 12) {
      const k = Math.floor(Math.random() * surface.n * surface.n);
      if (surface.freeze(k)) fx.emit('poof', surface.center(k, tmp).setY(0.6), 0.6);
    }
    if (state === 'play' && t >= ROUND) {
      state = 'win';
      reels.hide();
      sfx.play('tada', 0);
      sfx.play('cheer', 0.03);
      fx.emit('confetti', tmp.copy(ctl.pos).setY(ctl.pos.y + 2), 2);
      finish(true);
    }
  };

  /** Что делает с игроком земля под ногами. */
  const applySurface = (dt: number) => {
    const low = ctl.grounded && ctl.pos.y < GROUND_Y;
    const cell = low ? surface.at(ctl.pos.x, ctl.pos.z) : Cell.None;
    slipT -= dt;
    ctl.grip = cell === Cell.Ice || slipT > 0 ? 0.08 : 1;
    burnT = cell === Cell.Fire ? burnT + dt : 0;
    if (burnT > BURN_DEATH) { burnT = 0; if (hurtT <= 0) sfx.play('fire', 0.1); hurt(L('Сгорел', 'Burned')); }
    // этап 4: ток в луже бьёт как огонь, слизь держит ноги
    shockT = cell === Cell.Shock ? shockT + dt : 0;
    if (shockT > 0.15) { shockT = 0; if (hurtT <= 0) sfx.play('zap', 0.1); hurt(L('Ударило током', 'Zapped')); }
    ctl.speedMul = cell === Cell.Slime ? 0.45 : 1;
    // падение — первым: лава в покое стоит под островом (-2,5) и раньше подписывала падение «Лавой»
    if (ctl.pos.y < FALL_Y) die(L('Упал с острова', 'Fell off'));
    else if (lava.level > -2 && lava.level > ctl.pos.y + 0.1) die(L('Лава', 'Lava'));
  };

  const fwd = new THREE.Vector3();
  const tick = (dt: number) => {
    // меню и пауза: мир стоит; в меню камера медленно облетает арену
    if (mode !== 'round') {
      if (mode === 'menu') cam.yaw += dt * 0.12;
      cam.update(dt, ctl.pos);
      return;
    }
    input.update();
    const look = input.consumeLook();
    cam.rotate(look.x, look.y, look.zoom);
    reels.update(dt);
    if (tutorial.active) { if (input.state.jump) tutJumped = true; tutorial.update(dt); }
    // барабан крутится — весь мир стоит (просьба заказчика): можно спокойно выбрать момент
    if (reels.spinning) { ui.update(dt); cam.update(dt, ctl.pos); return; }
    const realDt = dt;
    if (slowT > 0) { slowT -= realDt; dt *= SLOW_K; }
    if (state === 'play' || state === 'win') ctl.update(dt, input.state.move, input.state.jump, cam.forward(fwd));
    else cam.yaw += dt * 0.15;   // погиб — камера медленно облетает хаос, кнопка уже доступна
    runScript(dt);
    if (state === 'play') applySurface(dt);
    // гроза считает время только идущего раунда (после первого барабана)
    if (state === 'play' && started) storm.update(dt, ctl.pos);
    // после удара мигаем: видно, что сейчас неуязвим
    if (hurtT > 0) { hurtT -= dt; player.root.visible = state !== 'dead' && (hurtT <= 0 || Math.floor(hurtT * 12) % 2 === 0); }
    surface.update(dt);
    creatures.update(dt);
    flames.commit(dt);
    bolts.commit(dt);
    hail.update(dt);
    lava.update(dt);
    // искры над горящей травой: пара в кадр, не больше — пул частиц общий
    sparkT -= dt;
    if (sparkT <= 0 && surface.burning.length) {
      const k = surface.burning[Math.floor(Math.random() * surface.burning.length)];
      fx.emit('lava', surface.center(k, tmp).setY(0.3), 0.35);
      sparkT = 0.12;
    }
    bots.update(dt, state === 'play' ? ctl : null, cam.camera.position);   // с игроком тоже толкаются
    fx.update(dt);
    dust.update(dt);
    dustLeft = DUST_FRAME;
    ui.update(realDt);
    cam.update(realDt, ctl.pos);
    setOccluder(ctl.pos, cam.camera.position);
  };

  if (import.meta.env.DEV) {
    // Q — следующий уровень качества по кругу: сравнить low/med/high на одном кадре
    addEventListener('keydown', (e) => { if (e.code === 'KeyQ') quality.set((quality.tier + 1) % 4); });
    Object.assign(window, { __renderer: renderer, __THREE: THREE, __scene: scene, __ctl: ctl, __cam: cam, __tick: tick, __quality: quality, __restart: (d: Difficulty = 'normal') => { diff = d; startRound(); }, __creatures: creatures, __reels: reels, __physics: physics, __stormInfo: () => storm.info(),
      // автопрогон (tools/playtest.cjs): состояние раунда для бота-тестера
      __heightAt: heightAt, __impactAt: impactAt, __bots: bots, __mode: () => mode, __revive: () => revive(), __die: () => die('test'), __tut: () => tutorial.current, __paused: () => paused, __ui: { main: () => showMain(), round: () => startRound(), pause: () => menu.onPause?.(), result: (w: boolean) => { state = w ? 'win' : 'dead'; reels.hide(); finish(w); }, chars: () => menu.onCharacters?.(), enc: () => menu.onEncyclopedia?.(), board: () => menu.onLeaderboard?.() }, __dust: dust, __surface: surface, __hill: () => hill, __map: (m: MapId) => menu.onMap?.(m),
      __state: () => ({ t, state, started, deathCause, hearts, hits, reacted: Object.fromEntries(reacted), cells: surface.counts(), lava: lava.level, dummies: bots.alive, reels: reelLog.slice() }) });
  }

  /* Авто-пауза (Playgama 3.3.4–3.3.5): вкладка скрыта, площадка прислала паузу (реклама, свернули) — мир замирает
   * целиком; звук глушит core.audio. Если это случилось посреди раунда — открываем экран паузы, чтобы игрок
   * вернулся и сам нажал «Продолжить», а не получил метеорит в лоб. Окно потеряло фокус (щёлкнули громкость в
   * трее, другое окно) — тоже пауза раунда: вкладка видна, но играть ребёнок уже не может. */
  let paused = false;
  const clock = new THREE.Clock();
  const autoPause = () => { if (mode === 'round' && state === 'play') menu.onPause?.(); };
  const syncPaused = () => {
    const was = paused;
    paused = document.hidden || core.isPaused;
    if (paused && !was) autoPause();
    if (!paused) clock.getDelta();
  };
  document.addEventListener('visibilitychange', syncPaused);
  core.onPauseChange(syncPaused);
  addEventListener('blur', autoPause);

  return {
    renderer,
    resize(width, height) { cam.resize(width, height); },
    async load(onProgress) {
      ctl.respawn();
      onProgress(0.3);
      await sfx.load();
      onProgress(0.4);
      // текстуры карты: трава, земля, камень, ящики, кора, листва, заборчик (нет картинки — блок гладкий, как раньше)
      if (new URLSearchParams(location.search).get('tex') !== '0') await applyMapTextures({
        [C.grass]: 'grass', [C.dirt]: 'dirt', [C.stone]: 'stone', [C.stoneDark]: 'stone', [C.crate]: 'planks',
        [C.trunk]: 'bark', [C.leaves]: 'leaves', [C.fence]: 'wood', [C.post]: 'wood',
        [C.sand]: 'sand', [C.sandRock]: 'sandstone', [C.pyr]: 'sandstone', [C.pyrDark]: 'sandstone', [C.ruin]: 'sandstone', [C.adobe]: 'sand',
        [C.palmTrunk]: 'palmbark', [C.palm]: 'palmleaf', [C.cactus]: 'cactus',
      }, quality.tier === 0 ? 1 : 4);
      onProgress(0.5);
      // персонажи (этап 8): все модели сразу (18) — соперники каждый раунд в новых обликах, ~1,5 МБ
      await Promise.all(ROSTER.map(async (c) => { try { models.set(c.id, await loadChar(c.id)); } catch { /* нет модели — останется старый аватар */ } }));
      wearSkin(progress.snapshot().skin);
      dressBots();
      onProgress(0.6);
      // прогрев за полосой загрузки: иначе первый кадр с новым материалом подвисает (замер: в первом раунде 4 кадра
      // по 0,2–0,33 с — сборка шейдеров существ, грозы, теней и загрузка 30 картинок на видеокарту; во втором — чисто).
      // compileAsync видит только видимое, а существа, гроза, луч НЛО и метки до первого появления спрятаны —
      // поэтому на время прогрева показываем всё и рисуем один кадр (с тенями и текстурами) под заставкой
      // Ещё и ПУСТЫЕ объекты (стаи существ, ноги, пламя — 0 копий до первого появления): драйвер (ANGLE/D3D11)
      // докомпилирует шейдер под их раскладку вершин только на первом НАСТОЯЩЕМ рисовании — это и было
      // «стоп на секунду, когда барабан выкинул новых существ» (tools/fps.cjs ловил долгие задачи 0,7–1 с).
      // Поэтому на кадр прогрева у каждой стаи 1 копия, у буферов — полный диапазон, отсечение выключено.
      const hidden: THREE.Object3D[] = [];
      const undo: (() => void)[] = [];
      scene.traverse((o) => {
        if (!o.visible) { hidden.push(o); o.visible = true; }
        const im = o as THREE.InstancedMesh;
        if (im.isInstancedMesh && im.count === 0) { im.count = 1; undo.push(() => { im.count = 0; }); }
        const g = (o as THREE.Mesh).geometry as THREE.BufferGeometry | undefined;
        if (g && g.drawRange.count === 0) { g.drawRange.count = Infinity; undo.push(() => { g.drawRange.count = 0; }); }
        if (o.frustumCulled) { o.frustumCulled = false; undo.push(() => { o.frustumCulled = true; }); }
      });
      // лица персонажей (атласы) — на видеокарту заранее: соперники меняют облик каждый раунд
      for (const m of models.values()) { const map = (m.mat as THREE.MeshStandardMaterial).map; if (map) renderer.initTexture(map); }
      await renderer.compileAsync(scene, cam.camera);
      renderer.render(scene, cam.camera);
      for (const o of hidden) o.visible = false;
      for (const u of undo) u();
      onProgress(1);
    },
    start() {
      applyMute();
      sfx.startMusic();
      const p = progress.snapshot();
      if (p.runs === 0) { diff = 'easy'; startRound(); }
      else { diff = (['easy', 'normal', 'chaos'] as const).find((d) => d === p.difficulty) ?? 'normal'; restart(); showMain(); }
      renderer.setAnimationLoop(() => {
        const real = clock.getDelta();
        const dt = Math.min(real, 1 / 20);   // после подвисания не «телепортируемся» сквозь пол
        if (paused) return;
        tick(dt);
        renderer.render(scene, cam.camera);
        fps.frame(real);
        quality.frame(real);
      });
    },
  };
}
