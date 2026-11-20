/**
 * «Крути хаос!» — сборка игры. Этап 2: ядро без барабана — раунд из трёх волн.
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
import { Surface, Meteors, Hail, Lava, Cell, GROUND_Y } from './game/chaos.ts';
import { RoundUi } from './game/roundUi.ts';
import { L } from './i18n.ts';

export interface Game {
  renderer: THREE.WebGLRenderer;
  resize(width: number, height: number): void;
  load(onProgress: (value: number) => void): Promise<void>;
  start(): void;
}

/** Полуразмер острова, м. Арена компактная: хаос должен быть виден весь сразу. */
const HALF = 20;
/** Ниже этого — упал с острова (на этапе 2 это станет смертью). */
const FALL_Y = -12;
/** Длина раунда, с. Сценарий волн — ниже, в WAVES. */
const ROUND = 70;
/**
 * Сценарий этапа 2 (барабана ещё нет — волны заданы заранее). Каждая следующая
 * волна ложится ПОВЕРХ прошлой: метеоры не прекращаются, лёд остаётся под лавой.
 */
const WAVES: { at: number; id: 'meteor' | 'ice' | 'lava' }[] = [
  { at: 3, id: 'meteor' }, { at: 22, id: 'ice' }, { at: 38, id: 'lava' },
];
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

  // ступенчатый холм (высоты 1 → 2 → 3 м): забраться повыше — способ спастись от разлива лавы
  solid(12, 1, 10, -11, 0, -9, C.stone);
  solid(8, 2, 7, -12.5, 0, -10.5, C.stone);
  solid(4, 3, 4, -15, 0, -13, C.stone);

  // башня с площадкой на 6 м, к ней лесенка из блоков по 1 м
  solid(5, 6, 5, 13, 0, -13, C.stone);
  for (let i = 0; i < 5; i++) solid(2, i + 1, 2, 1.5 + i * 2, 0, -12, C.stoneDark);   // 1…5 м, вплотную к башне
  deco(0.3, 3, 0.3, 14.8, 6, -14.8, C.trunk);
  deco(1.8, 1.1, 0.2, 15.8, 7.7, -14.8, C.flag);

  // ящики-укрытия: одиночные, пары и «стенки», за которыми можно спрятаться
  const crates: [number, number, number][] = [
    [-4, 0, 6], [-2, 0, 6], [-3, 2, 6],          // стенка с ящиком наверху
    [7, 0, 4], [9, 0, 4],
    [3, 0, -4],
    [-14, 0, 8], [-14, 0, 10],
    [14, 0, 10], [12, 0, 12], [14, 2, 10],
    [0, 0, 14],
  ];
  for (const [x, y, z] of crates) solid(2, 2, 2, x, y, z, C.crate);

  // деревья: ствол твёрдый, крона — декор (под ней можно стоять)
  for (const [x, z] of [[-17, 16], [17, -2], [-6, -17], [6, 16]] as const) {
    solid(1, 3, 1, x, 0, z, C.trunk);
    deco(3.4, 2.4, 3.4, x, 3, z, C.leaves);
    deco(2, 1.2, 2, x, 5.4, z, C.leaves);
  }

  mergeStatic(scene, statics);

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
  ctl.setSpawn(new THREE.Vector3(0, 0.01, 4), Math.PI);
  ctl.onJump = () => sfx.play('jump', 0.08);
  ctl.onLand = (v) => { if (v > 10) sfx.play('land', 0.1); };

  // манекены — будущие боты: по ним видно, что персонаж стоит 1 вызов отрисовки
  const dummies: Avatar[] = [];
  const spots: [number, number][] = [[-6, 2], [5, 8], [-9, -3], [8, -4], [-2, -9], [11, 6], [-12, 13]];
  spots.forEach(([x, z], i) => {
    const a = new Avatar(SKINS[(i + 1) % SKINS.length].look, true);
    a.root.position.set(x, 0, z);
    a.root.rotation.y = Math.atan2(-x, -z);
    scene.add(a.root);
    dummies.push(a);
  });

  /* ───────────────────────────── ХАОС ────────────────────────────── */
  const fx = new Particles(scene);
  const surface = new Surface(scene, HALF);
  const meteors = new Meteors(scene);
  const hail = new Hail(scene, HALF);
  const lava = new Lava(scene, HALF);
  const ui = new RoundUi(parent);
  ui.setLabels(L('ЕЩЁ РАЗ', 'AGAIN'));
  const tmp = new THREE.Vector3();
  const alive = dummies.map(() => true);

  let t = 0, state: 'play' | 'dead' | 'win' = 'play', wave = 0, nextRock = 0, burnT = 0, sparkT = 0;
  let deathCause = '';

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
    fx.emit('poof', tmp.copy(ctl.pos).setY(ctl.pos.y + 1.2), 1.6);
    fx.emit('confetti', tmp, 1);
    cam.shake(0.4);
    sfx.play('respawn', 0);
    ui.showResult(L('ТЫ ПОГИБ', 'YOU DIED'), L(`${deathCause} · продержался ${Math.floor(t)} с из ${ROUND}`, `${deathCause} · survived ${Math.floor(t)} of ${ROUND} s`), false);
  };

  const restart = () => {
    t = 0; wave = 0; nextRock = 0; burnT = 0; state = 'play';
    surface.reset(); meteors.reset(); lava.reset(); hail.on = false;
    dummies.forEach((d, i) => { alive[i] = true; d.root.rotation.x = 0; d.root.position.y = 0; d.root.visible = true; });
    player.root.visible = true;
    ctl.respawn();
    ctl.grip = 1;
    ui.hideResult();
    ui.announce(L(`ВЫЖИВИ ${ROUND} СЕКУНД!`, `SURVIVE ${ROUND} SECONDS!`), '#fff');
  };
  ui.onRetry = restart;
  addEventListener('keydown', (e) => { if (e.code === 'Enter' && ui.resultOpen) restart(); });

  /** Удар метеора: огонь вокруг, гибель рядом. */
  const onHit = (x: number, y: number, z: number) => {
    fx.emit('lava', tmp.set(x, y + 0.5, z), 1.4);
    const d = Math.hypot(ctl.pos.x - x, ctl.pos.z - z);
    cam.shake(Math.max(0, 0.45 - d * 0.03));
    if (d < 14) sfx.play('lava', 0.15);
    if (y < 0.5) for (const [dx, dz] of [[0, 0], [2, 0], [-2, 0], [0, 2], [0, -2]]) surface.ignite(x + dx, z + dz);
    if (state === 'play' && player.root.visible && d < 2.1 && Math.abs(ctl.pos.y - y) < 2.6) die(L('Метеорит', 'Meteor'));
    dummies.forEach((dm, i) => { if (alive[i] && Math.hypot(dm.root.position.x - x, dm.root.position.z - z) < 2.1 && y < 0.5) killDummy(i); });
  };

  const spawnRock = () => {
    // почти половина метеоров — туда, куда бежит игрок: стоять на месте нельзя
    let x: number, z: number;
    if (state === 'play' && Math.random() < 0.45) { x = ctl.pos.x + ctl.vel.x * 0.6; z = ctl.pos.z + ctl.vel.z * 0.6; }
    else { x = (Math.random() * 2 - 1) * (HALF - 1); z = (Math.random() * 2 - 1) * (HALF - 1); }
    x = THREE.MathUtils.clamp(x, -HALF + 1, HALF - 1); z = THREE.MathUtils.clamp(z, -HALF + 1, HALF - 1);
    meteors.spawn(x, z, heightAt(x, z));
  };

  const runScript = (dt: number) => {
    t += dt;
    if (state === 'play') ui.setTime(ROUND - t);
    while (wave < WAVES.length && t >= WAVES[wave].at) {
      const w = WAVES[wave++];
      if (w.id === 'meteor') ui.announce(L('МЕТЕОРИТНЫЙ ДОЖДЬ!', 'METEOR SHOWER!'), '#ff8a2a');
      if (w.id === 'ice') { ui.announce(L('ЛЕДЯНОЙ ДОЖДЬ!', 'ICE RAIN!'), '#9be3ff'); hail.on = true; }
      if (w.id === 'lava') { ui.announce(L('ЛАВА ПОДНИМАЕТСЯ!', 'LAVA IS RISING!'), '#ff5a2a'); lava.rise(10); }
    }
    // метеоры: густо в свою волну, потом реже — но не прекращаются
    if (t > WAVES[0].at) {
      nextRock -= dt;
      if (nextRock <= 0) { spawnRock(); nextRock = t < WAVES[1].at ? 0.7 : 1.5; }
    }
    // ледяной дождь 8 с: морозит по ~50 клеток в секунду; огонь под ним гаснет с паром
    if (hail.on) {
      if (t > WAVES[1].at + 8) hail.on = false;
      for (let i = 0; i < 1 + Math.floor(dt * 50); i++) {
        const k = Math.floor(Math.random() * surface.n * surface.n);
        if (surface.freeze(k)) fx.emit('poof', surface.center(k, tmp).setY(0.6), 0.6);
      }
    }
    if (state === 'play' && t >= ROUND) {
      state = 'win';
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
    ctl.grip = cell === Cell.Ice ? 0.08 : 1;
    burnT = cell === Cell.Fire ? burnT + dt : 0;
    if (burnT > BURN_DEATH) die(L('Сгорел', 'Burned'));
    if (lava.level > ctl.pos.y + 0.1) die(L('Лава', 'Lava'));
    if (ctl.pos.y < FALL_Y) die(L('Упал с острова', 'Fell off'));
  };

  const fwd = new THREE.Vector3();
  const tick = (dt: number) => {
    input.update();
    const look = input.consumeLook();
    cam.rotate(look.x, look.y, look.zoom);
    if (state === 'play' || state === 'win') ctl.update(dt, input.state.move, input.state.jump, cam.forward(fwd));
    else cam.yaw += dt * 0.15;   // погиб — камера медленно облетает хаос, кнопка уже доступна
    runScript(dt);
    if (state === 'play') applySurface(dt);
    surface.update(dt);
    meteors.update(dt, onHit);
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
    Object.assign(window, { __renderer: renderer, __scene: scene, __ctl: ctl, __cam: cam, __tick: tick, __quality: quality, __restart: () => restart() });
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
