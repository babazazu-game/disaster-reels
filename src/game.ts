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

import * as THREE from 'three';
import { core } from './core.ts';
import { createWorld, block, CLASSIC, cloudsAlong, mergeStatic } from './engine/world.ts';
import { Avatar } from './engine/avatar.ts';
import { Input } from './engine/input.ts';
import { FollowCamera } from './engine/camera.ts';
import { Controller } from './engine/controller.ts';
import { Physics, type Solid } from './engine/physics.ts';
import { FpsMeter } from './engine/fps.ts';
import { sfx } from './engine/sfx.ts';
import { quality } from './engine/quality.ts';
import { SKINS } from './game/skins.ts';
import { Particles } from './engine/particles.ts';
import { Surface, Hail, Lava, Flames, boltTexture, Cell, GROUND_Y } from './game/chaos.ts';
import { Reels, type ReelResult } from './game/reels.ts';
import { Creatures } from './game/creatures.ts';
import { agree, phrase, ADJ_IDS, NOUN_IDS, type AdjId, type NounId } from './game/words.ts';
import { RoundUi } from './game/roundUi.ts';
import { ArenaBots, type Spot } from './game/arenaBots.ts';
import { L } from './i18n.ts';

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
};
/** Замедление «Момента хаоса»: столько реальных секунд мир идёт со скоростью SLOW_K. Управление не отбирается. */
const SLOW_T = 0.5, SLOW_K = 0.3;

const C = {
  grass: 0x5cc44a, dirt: 0x9a6a3c, stone: 0xa3a9b3, stoneDark: 0x7d8490,
  crate: 0xc4843f, trunk: 0x8a5a33, leaves: 0x3fae4f, flag: 0xe8403a, fence: 0xfff4dc, post: 0xd99a4e,
};

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
  // постоянная часть — остров и заборчик — склеивается один раз
  const base: THREE.Mesh[] = [];
  const deco = (sx: number, sy: number, sz: number, x: number, y: number, z: number, color: number) => {
    const m = block({ x: sx, y: sy, z: sz }, color);
    m.position.set(x, y + sy / 2, z);
    scene.add(m);
    base.push(m);
    return m;
  };
  // остров: трава сверху, земля толстым слоем снизу, под ней камни — «висит в небе»
  physics.addMesh(deco(HALF * 2, 2, HALF * 2, 0, -2, 0, C.grass));
  deco(HALF * 2 - 1, 5, HALF * 2 - 1, 0, -7, 0, C.dirt);
  deco(HALF * 2 - 8, 4, HALF * 2 - 8, 0, -11, 0, C.dirt);
  deco(HALF - 4, 4, HALF - 4, 2, -15, -1, C.stoneDark);
  // низкий заборчик по краю: случайно не выбежишь, а перепрыгнуть можно — тогда упал и проиграл (решение заказчика)
  {
    const E = HALF - 0.35, len = HALF * 2 - 0.7;
    for (const side of [0, 1, 2, 3]) {
      const alongX = side < 2, c = side % 2 ? -E : E;
      deco(alongX ? len : 0.16, 0.16, alongX ? 0.16 : len, alongX ? 0 : c, 0.32, alongX ? c : 0, C.fence);
      deco(alongX ? len : 0.16, 0.16, alongX ? 0.16 : len, alongX ? 0 : c, 0.78, alongX ? c : 0, C.fence);
      for (let k = -HALF + 1; k <= HALF - 1; k += 3) deco(0.3, 1.1, 0.3, alongX ? k : c, 0, alongX ? c : k, C.post);
      const lo = new THREE.Vector3(alongX ? -HALF : c - 0.25, 0, alongX ? c - 0.25 : -HALF), hi = new THREE.Vector3(alongX ? HALF : c + 0.25, FENCE_H, alongX ? c + 0.25 : HALF);
      physics.add({ box: new THREE.Box3(lo, hi), kind: 'fence' });
    }
  }
  mergeStatic(scene, base);

  // расстановка — новая каждый раунд (просьба заказчика): холмы, плита и башня поворачиваются/зеркалятся,
  // ящики и деревья встают на случайные свободные места
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
    const put = (sx: number, sy: number, sz: number, x: number, y: number, z: number, color: number, hard = true, raw = false) => {
      const [px, pz] = raw ? [x, z] : T(x, z), swap = !raw && turns % 2 === 1;
      const m = block({ x: swap ? sz : sx, y: sy, z: swap ? sx : sz }, color);
      m.position.set(px, y + sy / 2, pz);
      layout.add(m);
      if (hard) layoutSolids.push(physics.addMesh(m));
      parts.push(m);
    };
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
    // деревья: ствол твёрдый, крона — декор (под ней можно стоять)
    for (let k = 0; k < 5; k++) {
      const p = spot(1.6);
      if (!p) continue;
      put(1, 3, 1, p[0], 0, p[1], C.trunk, true, true);
      put(3.4, 2.4, 3.4, p[0], 3, p[1], C.leaves, false, true);
      put(2, 1.2, 2, p[0], 5.4, p[1], C.leaves, false, true);
    }
    mergeStatic(layout, parts);
    // манекены — тоже на новые места
    dummySpots = [];
    for (let k = 0; k < DUMMIES; k++) dummySpots.push(spot(0.8) ?? [k * 3 - 9, -3]);
    // верхушки построек — куда боты лезут прятаться и спасаться от лавы
    spots = layoutSolids.map((sd) => { const b = sd.box; return { x: (b.min.x + b.max.x) / 2, z: (b.min.z + b.max.z) / 2, h: b.max.y, sx: (b.max.x - b.min.x) / 2 - 0.3, sz: (b.max.z - b.min.z) / 2 - 0.3 }; });
  };
  let dummySpots: [number, number][] = [];
  let spots: Spot[] = [];

  /** Верх самой высокой опоры в точке (куда падает метеор). */
  const heightAt = (x: number, z: number): number => {
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
  ctl.onJump = () => sfx.play('jump', 0.08);
  ctl.onLand = (v) => { if (v > 10) sfx.play('land', 0.1); };


  /* ───────────────────────────── ХАОС ────────────────────────────── */
  const fx = new Particles(scene);
  const flames = new Flames(scene);
  const bolts = new Flames(scene, boltTexture(), 300, true);
  const surface = new Surface(scene, HALF, flames, bolts);
  const hail = new Hail(scene, HALF);
  const lava = new Lava(scene, HALF);
  const ui = new RoundUi(parent);
  ui.setLabels(L('ЕЩЁ РАЗ', 'AGAIN'));
  const reels = new Reels(parent, L('СТОП', 'STOP'));
  const tmp = new THREE.Vector3();
  // боты (этап 5): бегают, прячутся и гибнут смешно; барабан не крутят
  const bots: ArenaBots = new ArenaBots(scene, physics, DUMMIES, {
    heightAt: (x, z) => heightAt(x, z),
    cell: (x, z) => surface.at(x, z),
    lava: () => lava.level,
    time: () => t,
    mobs: () => creatures.mobs,
    spots: () => spots,
    died: (x, y, z) => { fx.emit('poof', tmp.set(x, y + 1, z), 0.8); if (Math.hypot(ctl.pos.x - x, ctl.pos.z - z) < 18) sfx.play('respawn', 0.25, 0.5); },
  });

  let t = 0, introT = 0, started = false, state: 'play' | 'dead' | 'win' = 'play', reelNo = 0, lavaStep = 0, burnT = 0, sparkT = 0, slipT = 0;
  let slowT = 0, shockT = 0;
  const reacted = new Map<string, number>();   // сколько раз за раунд сработала каждая реакция — для автотеста
  let lavaWarned = false, deathCause = '', hearts = HEARTS, hurtT = 0, hits = 0;
  const reelLog: string[] = [];   // итоги барабанов за раунд — для автопрогона


  const die = (cause: string) => {
    if (state !== 'play') return;
    if (import.meta.env.DEV && (window as unknown as { __god?: boolean }).__god) return;   // съёмка скриншотов
    state = 'dead';
    deathCause = cause;
    hearts = 0; hurtT = 0; ui.setHearts(0, HEARTS);
    player.root.visible = false;
    reels.hide();
    fx.emit('poof', tmp.copy(ctl.pos).setY(ctl.pos.y + 1.2), 1.6);
    fx.emit('confetti', tmp, 1);
    cam.shake(0.4);
    sfx.play('respawn', 0);
    ui.showResult(L('ТЫ ПОГИБ', 'YOU DIED'), L(`${deathCause} · продержался ${Math.floor(t)} с из ${ROUND}`, `${deathCause} · survived ${Math.floor(t)} of ${ROUND} s`), false);
  };

  /** Удар: минус сердечко, отброс от источника (dx, dz — от него к игроку) и мигание-неуязвимость. Последнее — гибель. */
  const hurt = (cause: string, dx = 0, dz = 0) => {
    if (state !== 'play' || hurtT > 0) return;
    if (import.meta.env.DEV && (window as unknown as { __god?: boolean }).__god) return;
    hearts--; hits++;
    ui.setHearts(hearts, HEARTS);
    if (hearts <= 0) { die(cause); return; }
    hurtT = INVULN;
    let l = Math.hypot(dx, dz);
    if (l < 1e-3) { const a = Math.random() * 6.28; dx = Math.cos(a); dz = Math.sin(a); l = 1; }
    // отброс слабый, а при поднятой лаве почти никакой: иначе удар сбрасывал с холма в лаву и сердечки не спасали
    const kb = lava.level > -2 ? 2.5 : 7;
    ctl.vel.x = (dx / l) * kb; ctl.vel.z = (dz / l) * kb; ctl.vel.y = lava.level > -2 ? 4 : 6;
    fx.emit('poof', tmp.copy(ctl.pos).setY(ctl.pos.y + 1.2), 1, [0xff4a4a, 0xffffff]);
    cam.shake(0.3);
    sfx.play('land', 0.05);
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

  const creatures = new Creatures(scene, HALF, surface, fx, flames, bolts, {
    heightAt,
    lavaLevel: () => lava.level,
    target: () => (state === 'play' ? ctl.pos : null),
    targetVel: () => ctl.vel,
    touchPlayer(m, kill, dx, dz) {
      if (kill) { hurt(causeOf(m), dx, dz); return; }
      // обычная курица не убивает, а отпихивает
      const l = Math.hypot(dx, dz) || 1;
      ctl.vel.x += (dx / l) * 9; ctl.vel.z += (dz / l) * 9;
      if (ctl.grounded) ctl.vel.y = 6;
      sfx.play('bounce', 0.2, 0.5);
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
      if (d < 16) sfx.play(ice ? 'land' : 'lava', 0.15);
      if (state === 'play' && d < r && Math.abs(ctl.pos.y - y) < 2.6) hurt(causeOf(m), ctl.pos.x - x, ctl.pos.z - z);
      dummiesNear(x, y, z, r * 1.2, false, 1.8);
    },
    hitDummies: (x, y, z, r, infect) => (r > 0 ? dummiesNear(x, y, z, r, infect) : []),
    react: (id, x, z, label) => moment(id, x, z, label),
    nudge: (vx, vy, vz) => { if (state === 'play') { ctl.vel.x += vx; ctl.vel.y = Math.min(ctl.vel.y + vy, 9); ctl.vel.z += vz; } },
  });

  const restart = () => {
    reelLog.length = 0; hits = 0; lavaWarned = false; reacted.clear(); slowT = 0; shockT = 0;
    t = 0; introT = INTRO; started = false; reelNo = 0; lavaStep = 0; burnT = 0; slipT = 0; state = 'play';
    surface.reset(); creatures.reset(); lava.reset(); flames.clear(); bolts.clear(); hail.on = false;
    reels.hide();
    buildLayout();
    bots.reset(dummySpots);
    hearts = HEARTS; hurtT = 0; ui.setHearts(hearts, HEARTS);
    player.root.visible = true;
    ctl.respawn();
    ctl.grip = 1; ctl.speedMul = 1;
    ui.hideResult();
    ui.announce(L(`ВЫЖИВИ ${ROUND} СЕКУНД!`, `SURVIVE ${ROUND} SECONDS!`), '#fff');
    ui.setTime(ROUND);
  };
  ui.onRetry = restart;
  addEventListener('keydown', (e) => { if (e.code === 'Enter' && ui.resultOpen) restart(); });

  /** Барабан встал: большая фраза и волна существ. */
  const onReel = (r: ReelResult) => {
    if (state !== 'play') return;
    started = true;   // время раунда пошло с первой волной
    ui.announce(phrase(r.n, r.adj, r.noun), ADJ_COLOR[r.adj]);
    reelLog.push(phrase(r.n, r.adj, r.noun));
    sfx.play('checkpoint', 0);
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
      lava.rise(st.sec, st.top);
      cam.shake(0.25);
      // метеоритный дождь до конца раунда: две волны, половина метит в игрока
      // первая волна мягче (по автотесту финал убивал 44% дошедших)
      if (lavaStep === 0) creatures.start({ n: 12, adj: 'fire', noun: 'meteor' }, 0.35);
      if (lavaStep === 2) creatures.start({ n: 14, adj: 'fire', noun: 'meteor' }, 0.35);
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
      sfx.play('finish', 0);
      fx.emit('confetti', tmp.copy(ctl.pos).setY(ctl.pos.y + 2), 2);
      const saved = bots.alive;
      ui.showResult(L('ТЫ ВЫЖИЛ!', 'YOU SURVIVED!'), L(`Ботов уцелело: ${saved} из ${DUMMIES}`, `Bots alive: ${saved} of ${DUMMIES}`), true);
    }
  };

  /** Что делает с игроком земля под ногами. */
  const applySurface = (dt: number) => {
    const low = ctl.grounded && ctl.pos.y < GROUND_Y;
    const cell = low ? surface.at(ctl.pos.x, ctl.pos.z) : Cell.None;
    slipT -= dt;
    ctl.grip = cell === Cell.Ice || slipT > 0 ? 0.08 : 1;
    burnT = cell === Cell.Fire ? burnT + dt : 0;
    if (burnT > BURN_DEATH) { burnT = 0; hurt(L('Сгорел', 'Burned')); }
    // этап 4: ток в луже бьёт как огонь, слизь держит ноги
    shockT = cell === Cell.Shock ? shockT + dt : 0;
    if (shockT > 0.15) { shockT = 0; hurt(L('Ударило током', 'Zapped')); }
    ctl.speedMul = cell === Cell.Slime ? 0.45 : 1;
    // падение — первым: лава в покое стоит под островом (-2,5) и раньше подписывала падение «Лавой»
    if (ctl.pos.y < FALL_Y) die(L('Упал с острова', 'Fell off'));
    else if (lava.level > -2 && lava.level > ctl.pos.y + 0.1) die(L('Лава', 'Lava'));
  };

  const fwd = new THREE.Vector3();
  const tick = (dt: number) => {
    input.update();
    const look = input.consumeLook();
    cam.rotate(look.x, look.y, look.zoom);
    reels.update(dt);
    // барабан крутится — весь мир стоит (просьба заказчика): можно спокойно выбрать момент
    if (reels.spinning) { ui.update(dt); cam.update(dt, ctl.pos); return; }
    const realDt = dt;
    if (slowT > 0) { slowT -= realDt; dt *= SLOW_K; }
    if (state === 'play' || state === 'win') ctl.update(dt, input.state.move, input.state.jump, cam.forward(fwd));
    else cam.yaw += dt * 0.15;   // погиб — камера медленно облетает хаос, кнопка уже доступна
    runScript(dt);
    if (state === 'play') applySurface(dt);
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
    bots.update(dt);
    fx.update(dt);
    ui.update(realDt);
    cam.update(realDt, ctl.pos);
  };

  if (import.meta.env.DEV) {
    // Q — следующий уровень качества по кругу: сравнить low/med/high на одном кадре
    addEventListener('keydown', (e) => { if (e.code === 'KeyQ') quality.set((quality.tier + 1) % 3); });
    Object.assign(window, { __renderer: renderer, __scene: scene, __ctl: ctl, __cam: cam, __tick: tick, __quality: quality, __restart: () => restart(), __creatures: creatures, __reels: reels,
      // автопрогон (tools/playtest.cjs): состояние раунда для бота-тестера
      __heightAt: heightAt, __bots: bots, __surface: surface, __hill: () => hill,
      __state: () => ({ t, state, started, deathCause, hearts, hits, reacted: Object.fromEntries(reacted), cells: surface.counts(), lava: lava.level, dummies: bots.alive, reels: reelLog.slice() }) });
  }

  let paused = false;
  const clock = new THREE.Clock();
  document.addEventListener('visibilitychange', () => {
    paused = document.hidden;
    if (!paused) clock.getDelta();
  });

  return {
    renderer,
    resize(width, height) { cam.resize(width, height); },
    async load(onProgress) {
      ctl.respawn();
      onProgress(0.3);
      await sfx.load();
      onProgress(0.6);
      // прогрев шейдеров за полосой загрузки: иначе первый кадр с новым материалом подвисает
      await renderer.compileAsync(scene, cam.camera);
      onProgress(1);
    },
    start() {
      core.gameplayStart();
      restart();
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
