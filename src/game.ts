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
import { Physics } from './engine/physics.ts';
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

const C = {
  grass: 0x5cc44a, dirt: 0x9a6a3c, stone: 0xa3a9b3, stoneDark: 0x7d8490,
  crate: 0xc4843f, trunk: 0x8a5a33, leaves: 0x3fae4f, flag: 0xe8403a,
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
  const statics: THREE.Mesh[] = [];
  /** Твёрдый блок: в физику (коробкой) и в склейку. pos — центр низа блока. */
  const solid = (sx: number, sy: number, sz: number, x: number, y: number, z: number, color: number) => {
    const m = block({ x: sx, y: sy, z: sz }, color);
    m.position.set(x, y + sy / 2, z);
    scene.add(m);
    physics.addMesh(m);
    statics.push(m);
    return m;
  };
  /** Декор без столкновений (листва над головой, флаг). */
  const deco = (sx: number, sy: number, sz: number, x: number, y: number, z: number, color: number) => {
    const m = block({ x: sx, y: sy, z: sz }, color);
    m.position.set(x, y + sy / 2, z);
    scene.add(m);
    statics.push(m);
  };

  // остров: трава сверху, земля толстым слоем снизу, под ней камни — «висит в небе»
  solid(HALF * 2, 2, HALF * 2, 0, -2, 0, C.grass);
  deco(HALF * 2 - 1, 5, HALF * 2 - 1, 0, -7, 0, C.dirt);
  deco(HALF * 2 - 8, 4, HALF * 2 - 8, 0, -11, 0, C.dirt);
  deco(HALF - 4, 4, HALF - 4, 2, -15, -1, C.stoneDark);

  // ступенчатый холм (высоты 1 → 2 → 3 м): забраться повыше — способ спастись от лавы и бегающих
  solid(16, 1, 14, -16, 0, -13, C.stone);
  solid(10, 2, 9, -18, 0, -15, C.stone);
  solid(5, 3, 5, -21, 0, -18, C.stone);
  // второй, низкий холм напротив: плато 2 м со ступенькой
  solid(6, 2, 6, -6, 0, 20, C.stone);
  solid(2, 1, 2, -10, 0, 20, C.stoneDark);
  // широкая плита 1 м — от лавы спасает, от котов нет
  solid(8, 1, 6, 14, 0, -2, C.stoneDark);

  // башня с площадкой на 6 м, к ней лесенка из блоков по 1 м
  solid(5, 6, 5, 20, 0, -20, C.stone);
  for (let i = 0; i < 5; i++) solid(2, i + 1, 2, 8.5 + i * 2, 0, -19, C.stoneDark);   // 1…5 м, вплотную к башне
  deco(0.3, 3, 0.3, 21.8, 6, -21.8, C.trunk);
  deco(1.8, 1.1, 0.2, 22.8, 7.7, -21.8, C.flag);

  // ящики-укрытия: одиночные, пары и «стенки» с ящиком наверху
  const crates: [number, number, number][] = [
    [-6, 0, 9], [-4, 0, 9], [-5, 2, 9],
    [10, 0, 7], [12, 0, 7],
    [4, 0, -7],
    [-22, 0, 10], [-22, 0, 12],
    [21, 0, 15], [19, 0, 17], [21, 2, 15],
    [0, 0, 22],
    [-13, 0, 1], [-13, 0, -1],
    [24, 0, 4], [24, 0, 6], [24, 2, 4],
    [-24, 0, 24], [15, 0, 26], [17, 0, 26],
    [-2, 0, -24], [6, 0, -26],
  ];
  for (const [x, y, z] of crates) solid(2, 2, 2, x, y, z, C.crate);

  // деревья: ствол твёрдый, крона — декор (под ней можно стоять)
  for (const [x, z] of [[-25, 24], [26, -6], [-9, -25], [9, 24], [-26, -2]] as const) {
    solid(1, 3, 1, x, 0, z, C.trunk);
    deco(3.4, 2.4, 3.4, x, 3, z, C.leaves);
    deco(2, 1.2, 2, x, 5.4, z, C.leaves);
  }

  mergeStatic(scene, statics);
  // невидимые стенки по краю острова: ребёнок не падает в пропасть случайно (высота 40 м — heightAt их не видит)
  for (const [x0, x1, z0, z1] of [[-HALF - 1, HALF + 1, HALF, HALF + 1], [-HALF - 1, HALF + 1, -HALF - 1, -HALF], [HALF, HALF + 1, -HALF, HALF], [-HALF - 1, -HALF, -HALF, HALF]])
    physics.add({ box: new THREE.Box3(new THREE.Vector3(x0, -20, z0), new THREE.Vector3(x1, 40, z1)), kind: 'wall' });

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
  ctl.setSpawn(new THREE.Vector3(0, 0.01, 5), Math.PI);
  ctl.onJump = () => sfx.play('jump', 0.08);
  ctl.onLand = (v) => { if (v > 10) sfx.play('land', 0.1); };

  // манекены — будущие боты: по ним видно, что персонаж стоит 1 вызов отрисовки
  const dummies: Avatar[] = [];
  const spots: [number, number][] = [[-8, 3], [7, 12], [-14, -4], [12, -8], [-3, -13], [17, 9], [-18, 19]];
  spots.forEach(([x, z], i) => {
    const a = new Avatar(SKINS[(i + 1) % SKINS.length].look, true);
    a.root.position.set(x, 0, z);
    a.root.rotation.y = Math.atan2(-x, -z);
    scene.add(a.root);
    dummies.push(a);
  });

  /* ───────────────────────────── ХАОС ────────────────────────────── */
  const fx = new Particles(scene);
  const flames = new Flames(scene);
  const bolts = new Flames(scene, boltTexture(), 160, true);
  const surface = new Surface(scene, HALF, flames);
  const hail = new Hail(scene, HALF);
  const lava = new Lava(scene, HALF);
  const ui = new RoundUi(parent);
  ui.setLabels(L('ЕЩЁ РАЗ', 'AGAIN'));
  const reels = new Reels(parent, L('СТОП', 'STOP'));
  const tmp = new THREE.Vector3();
  const alive = dummies.map(() => true);

  let t = 0, introT = 0, started = false, state: 'play' | 'dead' | 'win' = 'play', reelNo = 0, lavaStep = 0, burnT = 0, sparkT = 0, slipT = 0;
  let deathCause = '';
  const reelLog: string[] = [];   // итоги барабанов за раунд — для автопрогона

  const killDummy = (i: number) => {
    if (!alive[i]) return;
    alive[i] = false;
    const r = dummies[i].root;
    r.rotation.x = -Math.PI / 2; r.position.y = 0.35;   // упал плашмя — на этапе 5 станет рэгдоллом
    fx.emit('poof', tmp.copy(r.position).setY(1), 0.8);
  };

  const die = (cause: string) => {
    if (state !== 'play') return;
    if (import.meta.env.DEV && (window as unknown as { __god?: boolean }).__god) return;   // съёмка скриншотов
    state = 'dead';
    deathCause = cause;
    player.root.visible = false;
    reels.hide();
    fx.emit('poof', tmp.copy(ctl.pos).setY(ctl.pos.y + 1.2), 1.6);
    fx.emit('confetti', tmp, 1);
    cam.shake(0.4);
    sfx.play('respawn', 0);
    ui.showResult(L('ТЫ ПОГИБ', 'YOU DIED'), L(`${deathCause} · продержался ${Math.floor(t)} с из ${ROUND}`, `${deathCause} · survived ${Math.floor(t)} of ${ROUND} s`), false);
  };

  /** «Огненная курица» — причина гибели в согласованной форме. */
  const causeOf = (m: { kind: NounId; adj: AdjId }) => {
    const s = agree(1, m.adj, m.kind).join(' ');
    return s[0].toUpperCase() + s.slice(1);
  };
  /** Манекены в радиусе: гибнут, а укушенные зомби — исчезают (встают зомби). Вернёт места. */
  const dummiesNear = (x: number, y: number, z: number, r: number, infect = false) => {
    const out: [number, number][] = [];
    dummies.forEach((dm, i) => {
      const p = dm.root.position;
      if (!alive[i] || (p.x - x) ** 2 + (p.z - z) ** 2 >= r * r || Math.abs(p.y - y) >= 2) return;
      if (infect) { alive[i] = false; dm.root.visible = false; out.push([p.x, p.z]); } else killDummy(i);
    });
    return out;
  };

  const creatures = new Creatures(scene, HALF, surface, fx, flames, bolts, {
    heightAt,
    lavaLevel: () => lava.level,
    target: () => (state === 'play' ? ctl.pos : null),
    targetVel: () => ctl.vel,
    touchPlayer(m, kill, dx, dz) {
      if (kill) { die(causeOf(m)); return; }
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
      if (state === 'play' && d < r && Math.abs(ctl.pos.y - y) < 2.6) die(causeOf(m));
      dummiesNear(x, y, z, r);
    },
    hitDummies: (x, y, z, r, infect) => (r > 0 ? dummiesNear(x, y, z, r, infect) : []),
    nudge: (vx, vy, vz) => { if (state === 'play') { ctl.vel.x += vx; ctl.vel.y = Math.min(ctl.vel.y + vy, 9); ctl.vel.z += vz; } },
  });

  const restart = () => {
    reelLog.length = 0;
    t = 0; introT = INTRO; started = false; reelNo = 0; lavaStep = 0; burnT = 0; slipT = 0; state = 'play';
    surface.reset(); creatures.reset(); lava.reset(); flames.clear(); bolts.clear(); hail.on = false;
    reels.hide();
    dummies.forEach((d, i) => { alive[i] = true; d.root.rotation.x = 0; d.root.position.y = 0; d.root.visible = true; });
    player.root.visible = true;
    ctl.respawn();
    ctl.grip = 1;
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
    while (lavaStep < LAVA_STEPS.length && t >= LAVA_STEPS[lavaStep].at) {
      const st = LAVA_STEPS[lavaStep];
      ui.announce(L(st.ru, st.en), '#ff5a2a');
      lava.rise(st.sec, st.top);
      cam.shake(0.25);
      // метеоритный дождь до конца раунда: две волны, половина метит в игрока
      // первая волна мягче (по автотесту финал убивал 44% дошедших)
      if (lavaStep === 0) creatures.start({ n: 12, adj: 'fire', noun: 'meteor' }, 0.35);
      if (lavaStep === 2) creatures.start({ n: 16, adj: 'fire', noun: 'meteor' }, 0.5);
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
      const saved = alive.filter(Boolean).length;
      ui.showResult(L('ТЫ ВЫЖИЛ!', 'YOU SURVIVED!'), L(`Ботов уцелело: ${saved} из ${dummies.length}`, `Bots alive: ${saved} of ${dummies.length}`), true);
    }
  };

  /** Что делает с игроком земля под ногами. */
  const applySurface = (dt: number) => {
    const low = ctl.grounded && ctl.pos.y < GROUND_Y;
    const cell = low ? surface.at(ctl.pos.x, ctl.pos.z) : Cell.None;
    slipT -= dt;
    ctl.grip = cell === Cell.Ice || slipT > 0 ? 0.08 : 1;
    burnT = cell === Cell.Fire ? burnT + dt : 0;
    if (burnT > BURN_DEATH) die(L('Сгорел', 'Burned'));
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
    if (state === 'play' || state === 'win') ctl.update(dt, input.state.move, input.state.jump, cam.forward(fwd));
    else cam.yaw += dt * 0.15;   // погиб — камера медленно облетает хаос, кнопка уже доступна
    runScript(dt);
    if (state === 'play') applySurface(dt);
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
    dummies.forEach((d, i) => {
      if (alive[i]) {
        d.update(dt, 0);
        if (lava.level > 0.1) killDummy(i);
      } else if (lava.level > d.root.position.y - 0.3) d.root.visible = false;   // утонул в лаве
    });
    fx.update(dt);
    ui.update(dt);
    cam.update(dt, ctl.pos);
  };

  if (import.meta.env.DEV) {
    // Q — следующий уровень качества по кругу: сравнить low/med/high на одном кадре
    addEventListener('keydown', (e) => { if (e.code === 'KeyQ') quality.set((quality.tier + 1) % 3); });
    Object.assign(window, { __renderer: renderer, __scene: scene, __ctl: ctl, __cam: cam, __tick: tick, __quality: quality, __restart: () => restart(), __creatures: creatures, __reels: reels,
      // автопрогон (tools/playtest.cjs): состояние раунда для бота-тестера
      __heightAt: heightAt, __surface: surface,
      __state: () => ({ t, state, started, deathCause, lava: lava.level, dummies: alive.filter(Boolean).length, reels: reelLog.slice() }) });
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
