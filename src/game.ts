/**
 * «Крути хаос!» — сборка игры. Этап 1: перф-фундамент.
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

  const fwd = new THREE.Vector3();
  const tick = (dt: number) => {
    input.update();
    const look = input.consumeLook();
    cam.rotate(look.x, look.y, look.zoom);
    ctl.update(dt, input.state.move, input.state.jump, cam.forward(fwd));
    if (ctl.pos.y < FALL_Y) { ctl.respawn(); sfx.play('respawn', 0); }
    for (const d of dummies) d.update(dt, 0);
    cam.update(dt, ctl.pos);
  };

  if (import.meta.env.DEV) {
    // Q — следующий уровень качества по кругу: сравнить low/med/high на одном кадре
    addEventListener('keydown', (e) => { if (e.code === 'KeyQ') quality.set((quality.tier + 1) % 3); });
    Object.assign(window, { __renderer: renderer, __scene: scene, __ctl: ctl, __cam: cam, __tick: tick, __quality: quality });
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
