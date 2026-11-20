import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { AdjId, NounId } from './words.ts';
import type { ReelResult } from './reels.ts';
import { Cell, type Surface, type Flames } from './chaos.ts';
import { agree } from './words.ts';
import type { Particles } from '../engine/particles.ts';

/**
 * Существа барабана. Каждый вид — ОДИН InstancedMesh: части (тело, голова, клюв…)
 * склеены в одну геометрию с цветами в вершинах, свойство («огненный», «ледяной»)
 * — цвет экземпляра. Итого 1 вызов отрисовки на вид, один шейдер на всех.
 *
 * Живых на вид ≤ MAX: «100 куриц» — визуальное обещание, а не 100 объектов.
 * Свойства — это теги с поведением, не отдельные модели:
 *  огненный → поджигает землю, ледяной → морозит, гигантский → ×3 и вчетверо меньше,
 *  прыгучий → скачет (и достаёт до ящиков), быстрый → вдвое быстрее.
 */

const MAX = 20;
/**
 * Сколько бегающих выходит на самом деле: «10 котов» — обещание на барабане, на арене их 6
 * (живут до конца раунда и копятся) (заказчик: при 10 выжить нереально, ребёнок потеряется). Падающие — до 30 за волну.
 */
const runners = (n: number) => (n <= 3 ? n : n <= 7 ? 4 : 5);   // «10» → 5 бегающих (автотест: к финалу копилось до 19)
const CHASE = 14;          // дальше этого бегающие бродят сами по себе
const WARN = 1.3;           // сколько летит падающее (видна метка)
const EVENT_TIME = 8;       // за столько секунд выходит вся волна
/** Существа живут до конца раунда (или до лавы): хаос КОПИТСЯ — просьба заказчика. */
const FOREVER = Infinity;
const G = 30;
/** Выше этого бегающие не забираются (вторая ступенька холма, одиночный ящик): заказчик — «от котов не скрыться». */
const CLIMB_MAX = 2.05;
const TRAIL = 0.5;          // как часто бегающий оставляет след (огонь/лёд), с
const TRAIL_BURN = 3;       // след горит недолго — иначе стая поджигает всю арену

type Phase = 'fall' | 'drop' | 'run' | 'fuse' | 'lie' | 'fly' | 'wind';
const FALLING: NounId[] = ['meteor', 'bomb', 'banana', 'snowman'];
const RUNNERS: NounId[] = ['chicken', 'cat', 'shark', 'slime', 'zombie', 'dino', 'ufo', 'tornado'];
/** Опасные «большие» — их на арене меньше. */
const FEW: Partial<Record<NounId, number>> = { ufo: 3, tornado: 2, dino: 4 };
const BEAM_ON = 3, BEAM_OFF = 2.2;   // луч НЛО: светит / пауза — успеть выскочить
const ABDUCT = 1.1;                  // столько в луче — и тебя забрали

interface Mob {
  kind: NounId; adj: AdjId; live: boolean; phase: Phase;
  x: number; y: number; z: number; vy: number; yaw: number; s: number;
  t: number; warn: number; tx: number; tz: number; ground: number; from: number;
  bounces: number; tick: number; seed: number; life: number;
  steer: number; steerT: number; hold: number;
  /** Скорость скольжения по льду и отброс взрывом (этап 4, реакции). */
  vx: number; vz: number; kx: number; kz: number;
  /** Оглушён током: стоит и трясётся. */
  stun: number;
}

interface Wave { r: ReelResult; left: number; gap: number; next: number; s: number; t: number; aim: number }

export interface CreatureHooks {
  heightAt(x: number, z: number): number;
  lavaLevel(): number;
  /** Кого ловить: игрок (если жив). */
  target(): THREE.Vector3 | null;
  targetVel(): THREE.Vector3;
  /** Коснулся игрока: kill — гибель, иначе толчок. */
  touchPlayer(m: { kind: NounId; adj: AdjId }, kill: boolean, dx: number, dz: number): void;
  slip(): void;
  /** Взрыв/удар радиуса r: шум, тряска, гибель всех рядом. */
  boom(x: number, y: number, z: number, r: number, m: { kind: NounId; adj: AdjId }): void;
  /** Существо задело манекены; infect — бот не погибает, а становится зомби. Вернёт, где это случилось. */
  hitDummies(x: number, y: number, z: number, r: number, infect: boolean): [number, number][];
  /** Добавить игроку скорость: тянет торнадо, поднимает луч НЛО. */
  nudge(vx: number, vy: number, vz: number): void;
  /** Сработала реакция (этап 4): игра показывает «Момент хаоса» при первом за раунд. label — своя надпись. */
  react(id: string, x: number, z: number, label?: string): void;
  /** Тяжело приземлился (пыль). s — размер существа. */
  land?(x: number, y: number, z: number, s: number): void;
}

/* ───────── модели: части-коробки и шары с цветом, ~1 м в высоту, «нос» вдоль +Z ───────── */

type Part = [THREE.BufferGeometry, number, number, number, number];   // геометрия, цвет, x, y, z
const box = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d);
const ball = (r: number) => new THREE.SphereGeometry(r, 12, 8);

const MODELS: Record<NounId, Part[]> = {
  chicken: [
    [box(0.7, 0.6, 0.85), 0xffffff, 0, 0.6, 0], [box(0.42, 0.45, 0.42), 0xffffff, 0, 1.05, 0.35],
    [box(0.18, 0.12, 0.22), 0xffa21a, 0, 1.0, 0.65], [box(0.12, 0.2, 0.3), 0xe8303a, 0, 1.36, 0.33],
    [box(0.1, 0.3, 0.1), 0xffa21a, -0.18, 0.15, 0], [box(0.1, 0.3, 0.1), 0xffa21a, 0.18, 0.15, 0],
    [box(0.08, 0.08, 0.02), 0x111111, -0.12, 1.12, 0.57], [box(0.08, 0.08, 0.02), 0x111111, 0.12, 1.12, 0.57],
  ],
  cat: [
    [box(0.55, 0.5, 1.0), 0xf09a3a, 0, 0.55, 0], [box(0.55, 0.5, 0.5), 0xf09a3a, 0, 0.95, 0.55],
    [box(0.14, 0.2, 0.1), 0xf09a3a, -0.17, 1.28, 0.5], [box(0.14, 0.2, 0.1), 0xf09a3a, 0.17, 1.28, 0.5],
    [box(0.12, 0.6, 0.12), 0xd07a22, 0, 0.95, -0.55], [box(0.4, 0.3, 0.9), 0xd07a22, 0, 0.15, 0],
    [box(0.1, 0.1, 0.02), 0x1a1a1a, -0.13, 1.0, 0.81], [box(0.1, 0.1, 0.02), 0x1a1a1a, 0.13, 1.0, 0.81],
  ],
  shark: [
    [box(0.7, 0.7, 1.7), 0x6f8fa8, 0, 0.5, 0], [box(0.6, 0.25, 1.4), 0xf2f2f2, 0, 0.2, 0.05],
    [box(0.1, 0.6, 0.5), 0x6f8fa8, 0, 1.1, -0.1], [box(0.1, 0.7, 0.35), 0x6f8fa8, 0, 0.6, -1.0],
    [box(0.5, 0.06, 0.06), 0xffffff, 0, 0.36, 0.86], [box(0.1, 0.1, 0.02), 0x111111, -0.3, 0.65, 0.6],
    [box(0.1, 0.1, 0.02), 0x111111, 0.3, 0.65, 0.6],
  ],
  slime: [
    [box(1.0, 0.75, 1.0), 0x55d64a, 0, 0.4, 0], [box(0.8, 0.2, 0.8), 0x7fe86d, 0, 0.86, 0],
    [box(0.16, 0.22, 0.02), 0x111111, -0.2, 0.55, 0.51], [box(0.16, 0.22, 0.02), 0x111111, 0.2, 0.55, 0.51],
  ],
  zombie: [
    [box(0.55, 0.7, 0.3), 0x2f9aa0, 0, 1.25, 0], [box(0.5, 0.5, 0.5), 0x7bd36a, 0, 1.85, 0],
    [box(0.2, 0.2, 0.75), 0x7bd36a, -0.38, 1.45, 0.3], [box(0.2, 0.2, 0.75), 0x7bd36a, 0.38, 1.45, 0.3],
    [box(0.24, 0.9, 0.26), 0x6b4a2e, -0.14, 0.45, 0], [box(0.24, 0.9, 0.26), 0x6b4a2e, 0.14, 0.45, 0],
    [box(0.12, 0.08, 0.02), 0x111111, -0.12, 1.92, 0.26], [box(0.12, 0.08, 0.02), 0x111111, 0.12, 1.92, 0.26],
    [box(0.24, 0.06, 0.02), 0x5a1a1a, 0, 1.72, 0.26],
  ],
  dino: [
    [box(0.9, 0.9, 1.5), 0x5cc94a, 0, 1.25, 0], [box(0.75, 0.6, 0.85), 0x5cc94a, 0, 1.95, 0.85],
    [box(0.6, 0.12, 0.5), 0xffffff, 0, 1.68, 1.05], [box(0.5, 0.5, 1.1), 0x4fae3f, 0, 1.15, -1.1],
    [box(0.3, 0.3, 0.6), 0x4fae3f, 0, 1.0, -1.85], [box(0.6, 0.35, 1.0), 0xf3e2a8, 0, 1.0, 0.1],
    [box(0.3, 0.8, 0.4), 0x4fae3f, -0.3, 0.4, 0], [box(0.3, 0.8, 0.4), 0x4fae3f, 0.3, 0.4, 0],
    [box(0.12, 0.3, 0.12), 0x4fae3f, -0.3, 1.35, 0.75], [box(0.12, 0.3, 0.12), 0x4fae3f, 0.3, 1.35, 0.75],
    [box(0.12, 0.12, 0.02), 0x111111, -0.25, 2.1, 1.28], [box(0.12, 0.12, 0.02), 0x111111, 0.25, 2.1, 1.28],
  ],
  ufo: [
    [new THREE.CylinderGeometry(1.5, 1.7, 0.35, 18), 0xb8c0cc, 0, 0, 0], [new THREE.CylinderGeometry(0.9, 1.5, 0.25, 18), 0x8a93a3, 0, -0.28, 0],
    [new THREE.SphereGeometry(0.75, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), 0x8cf25a, 0, 0.15, 0],
    [box(0.22, 0.14, 0.22), 0xfff15a, 1.35, 0, 0], [box(0.22, 0.14, 0.22), 0xfff15a, -0.7, 0, 1.17], [box(0.22, 0.14, 0.22), 0xfff15a, -0.7, 0, -1.17],
  ],
  tornado: [
    [new THREE.CylinderGeometry(0.55, 0.3, 0.9, 10), 0x9aa9c4, 0, 0.45, 0], [new THREE.CylinderGeometry(0.9, 0.55, 0.9, 10), 0xb3c0d8, 0.15, 1.35, 0],
    [new THREE.CylinderGeometry(1.3, 0.9, 0.9, 10), 0x9aa9c4, -0.1, 2.25, 0.1], [new THREE.CylinderGeometry(1.8, 1.3, 0.9, 10), 0xb3c0d8, 0.2, 3.15, -0.1],
    [new THREE.CylinderGeometry(2.2, 1.8, 0.7, 10), 0x9aa9c4, 0, 3.95, 0],
  ],
  meteor: [[new THREE.IcosahedronGeometry(0.95, 0), 0x6a3a22, 0, 0, 0], [new THREE.IcosahedronGeometry(0.55, 0), 0xff6a1a, 0.5, 0.35, 0.3]],
  bomb: [[ball(0.7), 0x26262e, 0, 0.7, 0], [box(0.3, 0.2, 0.3), 0x55555f, 0, 1.42, 0], [box(0.08, 0.35, 0.08), 0xc9a26a, 0, 1.65, 0], [box(0.16, 0.16, 0.16), 0xffcc33, 0, 1.86, 0]],
  banana: [
    [box(0.35, 0.3, 0.6), 0xffd83a, 0, 0.2, 0], [box(0.32, 0.28, 0.5), 0xffd83a, 0, 0.36, 0.5], [box(0.32, 0.28, 0.5), 0xffd83a, 0, 0.36, -0.5],
    [box(0.16, 0.16, 0.16), 0x6a4a22, 0, 0.55, 0.8], [box(0.16, 0.16, 0.16), 0x6a4a22, 0, 0.55, -0.8],
  ],
  snowman: [
    [ball(0.6), 0xffffff, 0, 0.55, 0], [ball(0.45), 0xffffff, 0, 1.35, 0], [ball(0.33), 0xffffff, 0, 1.95, 0],
    [box(0.1, 0.1, 0.35), 0xff8a1a, 0, 1.95, 0.42], [box(0.08, 0.08, 0.02), 0x111111, -0.12, 2.05, 0.31], [box(0.08, 0.08, 0.02), 0x111111, 0.12, 2.05, 0.31],
  ],
};

function buildModel(parts: Part[]): THREE.BufferGeometry {
  const c = new THREE.Color();
  const geos = parts.map(([g, color, x, y, z]) => {
    const p = (g.index ? g.toNonIndexed() : g.clone()).translate(x, y, z);
    p.deleteAttribute('uv');
    c.setHex(color).convertSRGBToLinear();
    const col = new Float32Array(p.attributes.position.count * 3);
    for (let i = 0; i < col.length; i += 3) { col[i] = c.r; col[i + 1] = c.g; col[i + 2] = c.b; }
    p.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return p;
  });
  return mergeGeometries(geos)!;
}

/** Цвет экземпляра по свойству: умножается на цвета частей. */
const TINT: Record<AdjId, THREE.Color> = {
  fire: new THREE.Color(1, 0.42, 0.12), ice: new THREE.Color(0.6, 0.85, 1.25),
  giant: new THREE.Color(1, 1, 1), bouncy: new THREE.Color(1, 0.8, 1.1), fast: new THREE.Color(1, 1, 0.75), plain: new THREE.Color(1, 1, 1),
};

/** Скорость бегающих, м/с (у игрока 8). */
const SPEED: Partial<Record<NounId, number>> = { chicken: 4, cat: 3.8, shark: 3.8, slime: 3, snowman: 2.2, zombie: 2.4, dino: 5 };

const dummy = new THREE.Object3D();
let beams = 0;
const flash = new THREE.Color(3, 3, 3);
const danger = new THREE.Color(1.6, 0.12, 0.08);   // лежащее опасное мигает красным: «не трогай»
const tc = new THREE.Color();

export class Creatures {
  readonly mobs: Mob[] = [];
  private meshes = {} as Record<NounId, THREE.InstancedMesh>;
  private ring: THREE.InstancedMesh;
  private beam: THREE.InstancedMesh;
  private waves: Wave[] = [];
  private v = new THREE.Vector3();

  constructor(scene: THREE.Scene, private half: number, private surface: Surface, private fx: Particles, private flames: Flames, private bolts: Flames, private h: CreatureHooks) {
    const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.55, flatShading: true });
    for (const k of Object.keys(MODELS) as NounId[]) {
      const m = new THREE.InstancedMesh(buildModel(MODELS[k]), mat, MAX);
      m.setColorAt(0, TINT.plain);           // instanceColor заводим сразу — иначе пересборка шейдера в бою
      m.count = 0; m.frustumCulled = false; m.castShadow = true;
      scene.add(m);
      this.meshes[k] = m;
    }
    this.ring = new THREE.InstancedMesh(new THREE.RingGeometry(0.8, 1, 28).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0xff2a2a, transparent: true, opacity: 0.8, depthWrite: false }), MAX * 3);
    this.ring.count = 0; this.ring.frustumCulled = false;
    scene.add(this.ring);
    // луч НЛО: прозрачный конус от тарелки до земли, верх в нуле — тянем по высоте
    this.beam = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.45, 1, 1, 18, 1, true).translate(0, -0.5, 0),
      new THREE.MeshBasicMaterial({ color: 0x9cff5a, transparent: true, opacity: 0.32, depthWrite: false, side: THREE.DoubleSide }), MAX);
    this.beam.count = 0; this.beam.frustumCulled = false;
    scene.add(this.beam);
  }

  /** НЛО: летит за игроком, луч светит циклами; в луче поднимает, задержался — забрал. */
  private ufo(m: Mob, dt: number): boolean {
    const p = this.h.target();
    const tx = p ? p.x : Math.sin(m.seed + m.t * 0.2) * this.half * 0.6, tz = p ? p.z : Math.cos(m.seed + m.t * 0.2) * this.half * 0.6;
    const dx = tx - m.x, dz = tz - m.z, d = Math.hypot(dx, dz) || 1;
    const sp = 3.2 * (m.adj === 'fast' ? 1.6 : 1);
    if (d > 0.5) { m.x += (dx / d) * sp * dt; m.z += (dz / d) * sp * dt; }
    const alt = 7.5 + (m.adj === 'bouncy' ? Math.abs(Math.sin(m.t * 2)) * 4 : Math.sin(m.t * 1.5) * 0.4) + (m.s - 1) * 2;
    m.y += (alt - m.y) * Math.min(1, dt * 2);
    const cyc = (m.t + m.seed) % (BEAM_ON + BEAM_OFF), on = cyc < BEAM_ON && m.t > 1.5;
    const R = 1.9 * m.s;
    if (on) {
      if (beams < MAX) {
        dummy.position.set(m.x, m.y - 0.1, m.z); dummy.rotation.set(0, 0, 0);
        dummy.scale.set(R, m.y, R); dummy.updateMatrix();
        this.beam.setMatrixAt(beams++, dummy.matrix);
      }
      for (const [x, z] of this.h.hitDummies(m.x, 0, m.z, R, false)) this.fx.emit('poof', this.v.set(x, 1, z), 0.6, [0x9cff5a]);
      if (m.tick <= 0 && m.y > 0) { m.tick = TRAIL; this.effect(m, m.x, m.z, false); }
      m.tick -= dt;
      if (p && (p.x - m.x) ** 2 + (p.z - m.z) ** 2 < R * R && p.y < m.y) {
        m.hold += dt;
        this.h.nudge(0, 40 * dt, 0);    // тянет вверх
        if (m.hold > ABDUCT) { m.hold = 0; this.h.touchPlayer(m, true, 0, 0); }
      } else m.hold = Math.max(0, m.hold - dt);
    } else m.hold = 0;
    return false;
  }

  /** Торнадо: бродит, засасывает игрока, разносит огонь и лёд по земле; в самом центре — унесло. */
  private tornado(m: Mob, dt: number): boolean {
    const p = this.h.target();
    // то идёт к игроку, то гуляет — иначе от него невозможно уйти
    const chase = p && Math.sin(m.t * 0.35 + m.seed) > -0.2;
    const tx = chase ? p!.x : Math.sin(m.seed * 3 + m.t * 0.15) * this.half * 0.7, tz = chase ? p!.z : Math.cos(m.seed * 2 + m.t * 0.15) * this.half * 0.7;
    const dx = tx - m.x, dz = tz - m.z, d = Math.hypot(dx, dz) || 1;
    const sp = 3.4 * (m.adj === 'fast' ? 1.6 : 1);
    const H = this.half - 1;
    m.x = THREE.MathUtils.clamp(m.x + (dx / d) * sp * dt, -H, H);
    m.z = THREE.MathUtils.clamp(m.z + (dz / d) * sp * dt, -H, H);
    m.y = m.adj === 'bouncy' ? Math.abs(Math.sin(m.t * 2.5)) * 2 : 0;
    m.yaw = 0;
    const lava = this.h.lavaLevel();
    if (lava > 0) m.y = lava;      // торнадо лаве не по зубам — гуляет поверх
    // разносит то, что лежит на земле: огонь и лёд перекидываются на соседние клетки
    m.tick -= dt;
    if (m.tick <= 0) {
      m.tick = 0.3;
      const c = this.surface.at(m.x, m.z), a = Math.random() * 6.28, R = 2.5 * m.s;
      const x = m.x + Math.cos(a) * R, z = m.z + Math.sin(a) * R;
      if (c === Cell.Fire) this.surface.ignite(x, z, 5);
      else if (c === Cell.Ice) this.surface.freezeAt(x, z);
      else if (c === Cell.Wet) this.surface.wetAt(x, z);
      else if (c === Cell.Slime) this.surface.slimeAt(x, z);
      // этап 4: смерч втягивает то, по чему идёт, и сам становится огненным/ледяным
      if (c === Cell.Fire && m.adj !== 'fire') { m.adj = 'fire'; this.h.react('fireTornado', m.x, m.z); }
      else if (c === Cell.Ice && m.adj !== 'ice') { m.adj = 'ice'; this.h.react('iceTornado', m.x, m.z); }
      this.effect(m, m.x, m.z, false);
      this.fx.emit('dust', this.v.set(m.x, 0.4, m.z), 0.5 * m.s);
    }
    const core = 1.1 * m.s, pull = 5 * m.s;
    this.h.hitDummies(m.x, 0, m.z, core, false);
    if (p) {
      const px = m.x - p.x, pz = m.z - p.z, pd = Math.hypot(px, pz);
      if (pd < pull && p.y < 4 * m.s) {
        const f = (1 - pd / pull) * 22 * dt;
        this.h.nudge((px / (pd || 1)) * f - (pz / (pd || 1)) * f * 0.6, 0, (pz / (pd || 1)) * f + (px / (pd || 1)) * f * 0.6);   // тянет и закручивает
        if (pd < core) this.h.touchPlayer(m, true, 0, 0);
      }
    }
    return false;
  }

  /** Есть ли сейчас существа или волны — для «ледяного» атмосферного града и т. п. */
  has(adj: AdjId): boolean { return this.waves.some((w) => w.r.adj === adj) || this.mobs.some((m) => m.live && m.adj === adj); }

  /** Новая волна по итогу барабана. aim — доля падающих, нацеленных в игрока (финальный дождь — больше). */
  start(r: ReelResult, aim = 0.25): void {
    const run = RUNNERS.includes(r.noun);
    let n = run ? Math.min(FEW[r.noun] ?? 99, runners(r.n)) : Math.min(30, r.n), s = 1;
    if (r.adj === 'giant') { n = Math.min(run ? 3 : 6, Math.max(1, Math.ceil(n / 3))); s = 2.2; }
    if (r.n === 1) s *= 1.7;               // одиночка — крупнее, чтобы «1» не была скучной
    this.waves.push({ r, left: n, gap: Math.min(0.7, (run ? 4 : EVENT_TIME) / n), next: 0, s, t: 0, aim });
  }

  reset(): void {
    this.waves.length = 0;
    for (const m of this.mobs) m.live = false;
    for (const k in this.meshes) this.meshes[k as NounId].count = 0;
    this.ring.count = 0;
  }

  private alive(kind: NounId): number { let c = 0; for (const m of this.mobs) if (m.live && m.kind === kind) c++; return c; }

  private spawn(r: ReelResult, s: number, aim: number): void {
    if (this.alive(r.noun) >= MAX) return;
    const m = this.mobs.find((q) => !q.live) ?? (this.mobs.push({} as Mob), this.mobs[this.mobs.length - 1]);
    const H = this.half - 1.5;
    Object.assign(m, { kind: r.noun, adj: r.adj, live: true, s, t: 0, vy: 0, bounces: 0, tick: 0, seed: Math.random() * 100, life: FOREVER, yaw: Math.random() * 6.28, steer: 0, steerT: 0, hold: 0, vx: 0, vz: 0, kx: 0, kz: 0, stun: 0 });
    if (FALLING.includes(r.noun)) {
      // падающее: метка на земле, часть целится туда, куда бежит игрок; одиночные — всегда к игроку, иначе их не увидеть
      const p = this.h.target();
      let x: number, z: number;
      if (p && Math.random() < aim) { const v = this.h.targetVel(); x = p.x + v.x * 0.7; z = p.z + v.z * 0.7; }
      else { x = (Math.random() * 2 - 1) * H; z = (Math.random() * 2 - 1) * H; }
      this.aim(m, THREE.MathUtils.clamp(x, -H, H), THREE.MathUtils.clamp(z, -H, H), r.adj === 'fast' ? WARN * 0.8 : WARN);
    } else {
      // бегающее: с неба в 10–15 м от игрока, на свободном месте — чтобы его не надо было искать по острову
      const [x, z] = this.nearPlayer(r.noun === 'ufo' || r.noun === 'tornado' ? 14 : 10, H);
      if (r.noun === 'ufo') Object.assign(m, { phase: 'fly' as Phase, x, z, y: 16, ground: 0 });
      else if (r.noun === 'tornado') { Object.assign(m, { phase: 'wind' as Phase, x, z, y: 0, ground: 0 }); this.fx.emit('dust', this.v.set(x, 0.5, z), 1.5); }
      else Object.assign(m, { phase: 'drop' as Phase, x, z, y: 9, ground: this.h.heightAt(x, z) });
    }
  }

  private nearPlayer(dist: number, H: number): [number, number] {
    const p = this.h.target();
    let x = 0, z = 0;
    for (let i = 0; i < 8; i++) {
      const a = Math.random() * Math.PI * 2, d = dist + Math.random() * 5;
      x = THREE.MathUtils.clamp((p?.x ?? 0) + Math.cos(a) * d, -H, H);
      z = THREE.MathUtils.clamp((p?.z ?? 0) + Math.sin(a) * d, -H, H);
      if (this.h.heightAt(x, z) === 0 && this.h.heightAt(x + 1, z + 1) === 0 && this.h.heightAt(x - 1, z - 1) === 0) break;
    }
    return [x, z];
  }

  /** Зомби из укушенного бота: прямо на месте, без падения с неба. */
  private spawnAt(r: ReelResult, x: number, z: number, s: number): void {
    if (this.alive(r.noun) >= MAX) return;
    const m = this.mobs.find((q) => !q.live) ?? (this.mobs.push({} as Mob), this.mobs[this.mobs.length - 1]);
    Object.assign(m, { kind: r.noun, adj: r.adj, live: true, s, t: 0, vy: 4, bounces: 0, tick: 0, seed: Math.random() * 100,
      life: FOREVER, yaw: Math.random() * 6.28, steer: 0, steerT: 0, hold: 0, vx: 0, vz: 0, kx: 0, kz: 0, stun: 0, phase: 'run' as Phase, x, z, y: 0, ground: this.h.heightAt(x, z) });
    this.fx.emit('poof', this.v.set(x, 1, z), 0.8, [0x7bd36a, 0x3f8f3a]);
  }

  /** Бегающие расталкивают друг друга — стая не слипается в один ком. */
  private separate(): void {
    const L = this.mobs;
    for (let i = 0; i < L.length; i++) {
      const a = L[i];
      if (!a.live || a.phase !== 'run') continue;
      for (let j = i + 1; j < L.length; j++) {
        const b = L[j];
        if (!b.live || b.phase !== 'run') continue;
        const dx = b.x - a.x, dz = b.z - a.z, d2 = dx * dx + dz * dz, want = this.body(a) + this.body(b);
        if (d2 >= want * want) continue;
        // стоят ровно в одной точке — разводим в случайную сторону (раньше такие пары не расталкивались и дрожали вместе)
        const d = Math.sqrt(d2) || 1e-3, a0 = (i * 2.4 + j) % 6.28, ux = d2 < 1e-6 ? Math.cos(a0) : dx / d, uz = d2 < 1e-6 ? Math.sin(a0) : dz / d;
        const push = (want - d) * 0.5;
        const ca = this.free(a.x - ux * push, a.z - uz * push, a.y, this.body(a), this.step(a));
        const cb = this.free(b.x + ux * push * (ca ? 1 : 2), b.z + uz * push * (ca ? 1 : 2), b.y, this.body(b), this.step(b));
        if (ca) { a.x -= ux * push * (cb ? 1 : 2); a.z -= uz * push * (cb ? 1 : 2); }
        if (cb) { b.x += ux * push * (ca ? 1 : 2); b.z += uz * push * (ca ? 1 : 2); }
      }
    }
  }

  private aim(m: Mob, x: number, z: number, warn: number): void {
    Object.assign(m, { phase: 'fall' as Phase, tx: x, tz: z, x, z, t: 0, warn, ground: this.h.heightAt(x, z), from: 34 });
  }

  /** Радиус касания существа. */
  private reach(m: Mob): number { return (m.kind === 'shark' ? 0.6 : m.kind === 'dino' ? 0.75 : 0.45) * m.s + 0.25; }
  /** Полуширина тела — чтобы не залезать в ящики. */
  private body(m: Mob): number { return (m.kind === 'shark' ? 0.55 : m.kind === 'dino' ? 0.6 : 0.45) * Math.min(m.s, 1.6); }
  /** Высота ступеньки: гиганты и динозавр перешагивают метровые уступы (а не застревают). */
  private step(m: Mob): number { return m.kind === 'dino' || m.s > 2 ? 1.1 : 0.45; }

  private effect(m: Mob, x: number, z: number, cross: boolean): void {
    // этап 4: акулы оставляют лужи, слаймы — слизь; «быстрый» (с молниями) пускает ток по луже
    if (m.adj === 'fast' && this.surface.at(x, z) === Cell.Wet) this.surface.shockAt(x, z);
    if (m.adj !== 'fire' && m.adj !== 'ice') {
      if (m.kind === 'shark') { this.surface.wetAt(x, z); return; }
      if (m.kind === 'slime') { this.surface.slimeAt(x, z); return; }
    }
    if (m.adj !== 'fire' && m.adj !== 'ice' && m.kind !== 'meteor' && m.kind !== 'snowman') return;
    const ice = m.adj === 'ice' || (m.kind === 'snowman' && m.adj !== 'fire');
    const pts = cross ? [[0, 0], [2, 0], [-2, 0], [0, 2], [0, -2]] : [[0, 0]];
    const k = cross ? Math.max(1, m.s * 0.7) : 1;
    for (const [dx, dz] of pts) {
      if (ice) this.surface.freezeAt(x + dx * k, z + dz * k); else this.surface.ignite(x + dx * k, z + dz * k, cross ? 7 : TRAIL_BURN);
    }
  }

  private land(m: Mob): void {
    const near = this.reach(m) + 0.6 * m.s;
    switch (m.kind) {
      case 'meteor':
        this.explode(m.x, m.ground, m.z, 2.1 * m.s, m);
        if (m.ground < 0.5) this.effect(m, m.x, m.z, true);
        if (m.adj === 'bouncy' && m.bounces < 2) {   // прыгучий метеорит отскакивает и бьёт ещё раз
          m.bounces++;
          const a = Math.random() * 6.28, H = this.half - 1.5;
          this.aim(m, THREE.MathUtils.clamp(m.x + Math.cos(a) * 6, -H, H), THREE.MathUtils.clamp(m.z + Math.sin(a) * 6, -H, H), 0.8);
          m.from = m.ground + 7;
        } else m.live = false;
        return;
      case 'bomb':
        this.explode(m.x, m.ground, m.z, near, { kind: 'bomb', adj: 'plain' });
        Object.assign(m, { phase: 'fuse' as Phase, t: 0, y: m.ground, warn: m.adj === 'fast' ? 0.8 : 1.6 });
        return;
      case 'banana':
        Object.assign(m, { phase: 'lie' as Phase, t: 0, y: m.ground, life: FOREVER });
        this.fx.emit('dust', this.v.set(m.x, m.ground + 0.2, m.z), 0.8);
        this.effect(m, m.x, m.z, false);
        return;
      default:   // снеговик: накрыл — гибель, потом медленно ползёт и морозит
        this.explode(m.x, m.ground, m.z, near, m);
        this.effect(m, m.x, m.z, true);
        Object.assign(m, { phase: 'run' as Phase, t: 0, y: m.ground, life: FOREVER });
    }
  }

  /** Может ли существо шагнуть в (x, z) с высоты y: ящики и холм — укрытие от бегающих. */
  private free(x: number, z: number, y: number, r: number, step = 0.45, cap = Infinity, floor = -Infinity): boolean {
    // cap — выше не залезть даже в прыжке; floor — по своему уровню и вниз ходить можно всегда
    const H = this.half - 0.6 - r, top = Math.max(Math.min(y + step, cap), floor), h = this.h.heightAt;
    // центр и четыре угла тела: иначе курица наполовину въезжает в ящик
    return Math.abs(x) < H && Math.abs(z) < H && h(x, z) <= top
      && h(x - r, z - r) <= top && h(x + r, z - r) <= top && h(x - r, z + r) <= top && h(x + r, z + r) <= top;
  }

  private run(m: Mob, dt: number): void {
    // оглушён током — стоит, трясётся (можно заманить в электролужу)
    if (m.stun > 0) { m.stun -= dt; m.yaw += Math.sin(m.t * 60) * 0.15; return; }
    // гонятся только вблизи (CHASE): иначе к финалу вся накопленная орда шла за игроком через весь остров
    const pt = this.h.target();
    const p = pt && Math.hypot(pt.x - m.x, pt.z - m.z) < CHASE ? pt : null;
    let dx: number, dz: number;
    if (p) { dx = p.x - m.x; dz = p.z - m.z; }
    // бродят к блуждающей точке внутри острова — а не упираются в забор, двигаясь в одну сторону
    else { dx = Math.sin(m.seed + m.t * 0.25) * this.half * 0.55 - m.x; dz = Math.cos(m.seed * 1.7 + m.t * 0.2) * this.half * 0.55 - m.z; }
    const len = Math.hypot(dx, dz) || 1;
    // покачивание курса: стая не бежит в одну точку цепочкой
    const wob = Math.sin(m.t * 1.3 + m.seed) * 0.6;
    // обход препятствия: упёрся — какое-то время бежит под углом в сторону
    const turn = wob + (m.steerT > 0 ? m.steer : 0);
    m.steerT -= dt;
    const ux = dx / len, uz = dz / len;
    const wx = ux * Math.cos(turn) - uz * Math.sin(turn), wz = ux * Math.sin(turn) + uz * Math.cos(turn);
    let sp = (SPEED[m.kind] ?? 4) * (m.adj === 'fast' ? 1.4 : 1) * (m.adj === 'giant' ? 0.75 : 1);
    if (m.kind === 'slime' || m.kind === 'shark') sp *= m.y > m.ground + 0.05 ? 1.0 : 0.25;   // перемещаются прыжками
    const cell = m.y < 0.5 ? this.surface.at(m.x, m.z) : Cell.None;
    if (cell === Cell.Slime && m.kind !== 'slime') sp *= 0.45;   // вязнут в слизи
    // на льду — каток: скорость меняется медленно, существо заносит и проносит мимо
    const k = cell === Cell.Ice && m.kind !== 'snowman' ? Math.min(1, dt * 1.1) : 1;
    if (k < 1 && Math.hypot(m.vx, m.vz) > 2.5) this.h.react('skate', m.x, m.z);
    m.vx += (wx * sp * (k < 1 ? 1.3 : 1) - m.vx) * k; m.vz += (wz * sp * (k < 1 ? 1.3 : 1) - m.vz) * k;
    const nx = m.x + m.vx * dt, nz = m.z + m.vz * dt;
    const grounded = m.y <= m.ground + 0.01, b = this.body(m), st = this.step(m);
    let moved = true;
    const fl = m.ground + 0.05;
    if (this.free(nx, nz, m.y, b, st, CLIMB_MAX, fl)) { m.x = nx; m.z = nz; }
    else if (this.free(nx, m.z, m.y, b, st, CLIMB_MAX, fl)) m.x = nx;
    else if (this.free(m.x, nz, m.y, b, st, CLIMB_MAX, fl)) m.z = nz;
    else { moved = false; m.vx = m.vz = 0; }
    // коты (и прыгучие) лезут наверх: игрок на ящике или холме рядом, а прямой путь упирается — прыжок к нему
    const climber = (m.kind === 'cat' || m.adj === 'bouncy') && m.s < 2;   // гиганты не скачут на ящики
    // прыжок ровно на высоту уступа впереди и только если он не выше второй ступеньки
    const ahead = this.h.heightAt(m.x + wx * (b + 0.7), m.z + wz * (b + 0.7));
    const hop = ahead > m.y + 0.3 && ahead <= CLIMB_MAX ? Math.min(12.5, Math.sqrt(2 * G * (ahead - m.y + 0.6))) : 0;
    if (climber && grounded && hop && p && p.y > m.y + 0.6 && len < 7 && !this.free(nx, nz, m.y, b, st)) m.vy = hop;
    // совсем не может шагнуть дольше 1,5 с (зажат между ящиками или появился вплотную) — переносим на ближайшее свободное место
    m.hold = moved ? Math.max(0, m.hold - dt) : m.hold + dt;
    if (m.hold > 1.5 && grounded) {
      m.hold = 0;
      search: for (let r = 0.8; r <= 5; r += 0.7) for (let a = 0; a < 12; a++) {
        const qx = m.x + Math.cos(a * 0.524 + m.seed) * r, qz = m.z + Math.sin(a * 0.524 + m.seed) * r;
        if (this.h.heightAt(qx, qz) <= CLIMB_MAX && this.free(qx, qz, this.h.heightAt(qx, qz), b, st)) { m.x = qx; m.z = qz; m.ground = m.y = this.h.heightAt(qx, qz); this.fx.emit('poof', this.v.set(qx, m.y + 0.5, qz), 0.5 * m.s); break search; }
      }
    }
    if (!moved) {
      if (grounded && climber && hop) m.vy = hop;
      // остальные обходят: в сторону, а если снова упёрлись — в другую
      // обходят вдоль стенки в одну сторону, всё круче, а не мечутся влево-вправо (заказчик: «застряли и дрыгаются»)
      const sg = m.steerT > 0 ? Math.sign(m.steer) : (m.seed % 2 < 1 ? 1 : -1);
      m.steer = sg * Math.min(2.6, m.steerT > 0 ? Math.abs(m.steer) + 0.5 : 1.6);
      m.steerT = 1.4;
    }
    // разворот плавный и только когда реально идёт — иначе упёршееся тело дёргалось
    if (moved) { const want = Math.atan2(wx, wz); let dy = want - m.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy)); m.yaw += dy * Math.min(1, dt * 10); }
    // прыжки: прыгучие — всегда, слайм и акула — короткими скачками
    if (grounded) {
      if (m.adj === 'bouncy') m.vy = 10;
      else if (m.kind === 'slime') m.vy = 7;
      else if (m.kind === 'shark') m.vy = 5.5;
    }
  }

  update(dt: number): void {
    for (const w of this.waves) {
      w.t += dt; w.next -= dt;
      while (w.left > 0 && w.next <= 0) { this.spawn(w.r, w.s, w.left <= 3 && w.r.n <= 3 ? 1 : w.aim); w.left--; w.next += w.gap; }
    }
    this.waves = this.waves.filter((w) => w.left > 0 && w.t < EVENT_TIME + 2);

    this.separate();
    const lava = this.h.lavaLevel();
    const counts = {} as Record<NounId, number>;
    for (const k in this.meshes) counts[k as NounId] = 0;
    let rings = 0;
    beams = 0;

    for (const m of this.mobs) {
      if (!m.live) continue;
      m.t += dt;
      let tumble = 0, squash = 1, blink = m.stun > 0 && Math.sin(m.t * 50) > 0, warn = -1;

      if (m.phase === 'fall') {
        const k = Math.min(1, m.t / m.warn);
        m.y = m.ground + (m.from - m.ground) * (1 - k * k);
        m.x = m.tx + (1 - k) * 5; m.z = m.tz;
        tumble = m.t * 5;
        this.setRing(rings++, m.tx, m.ground, m.tz, (m.kind === 'meteor' ? 2.1 : this.reach(m) + 0.6) * m.s * (0.5 + 0.5 * k));
        if (k >= 1) { m.x = m.tx; this.land(m); if (!m.live) continue; }
      } else if (m.phase === 'drop') {
        m.vy -= G * dt; m.y += m.vy * dt;
        if (m.y <= m.ground) { m.y = m.ground; m.vy = 0; m.phase = 'run'; m.t = 0; this.fx.emit('poof', this.v.set(m.x, m.y + 0.5, m.z), 0.6 * m.s); }
      } else if (m.phase === 'fuse') {
        // бомба шипит и мигает; прыгучая скачет к игроку
        if (m.adj === 'bouncy') this.run(m, dt);
        blink = Math.sin(m.t * (8 + m.t * 14)) > 0.3;
        this.setRing(rings++, m.x, m.ground, m.z, 3.2 * m.s);
        if (m.t >= m.warn) {
          m.live = false;
          this.explode(m.x, m.y, m.z, 3.2 * m.s, m);
          if (m.y < 0.5) this.effect(m, m.x, m.z, true);
          continue;
        }
      } else if (m.phase === 'fly') {
        if (this.ufo(m, dt)) continue;
      } else if (m.phase === 'wind') {
        if (this.tornado(m, dt)) continue;
      } else if (m.phase === 'lie') {
        if (m.adj === 'bouncy' || m.adj === 'fast') this.run(m, dt * 0.6);
        // опасный банан (огненный, ледяной, гигантский) убивает касанием — заказчик не понял этого: мигает и под ним красный круг
        if (this.deadly(m)) { warn = 0.5 + 0.5 * Math.sin(m.t * 9 + m.seed); this.setRing(rings++, m.x, m.ground, m.z, (this.reach(m) + 0.5) * (0.9 + 0.15 * warn)); }
        if (m.t > m.life) { m.live = false; this.fx.emit('poof', this.v.set(m.x, m.y + 0.3, m.z), 0.5); continue; }
      } else {
        this.run(m, dt);
        if (m.t > m.life) { m.live = false; this.fx.emit('poof', this.v.set(m.x, m.y + 0.6, m.z), 0.7 * m.s); continue; }
      }

      // вертикаль для бегающих/лежащих: прыжки, ступеньки, падение с края ящика
      if (m.phase !== 'fall' && m.phase !== 'drop' && m.phase !== 'fly' && m.phase !== 'wind') {
        const gh = this.h.heightAt(m.x, m.z);
        m.ground = gh <= m.y + this.step(m) ? gh : m.ground;
        m.vy -= G * dt; m.y += m.vy * dt;
        // пыль только от тяжёлых приземлений: мелкие скачки слаймов и акул без неё — их слишком много
        if (m.y <= m.ground) { if (m.vy < -9) this.h.land?.(m.x, m.ground, m.z, m.s); m.y = m.ground; m.vy = 0; }
        if (m.vy !== 0 || m.kind === 'slime') squash = 1 + Math.sin(m.t * 12) * 0.12;
        // след на земле: огненные поджигают, ледяные морозят
        m.tick -= dt;
        if (m.tick <= 0 && m.y < 0.5) { m.tick = TRAIL; this.effect(m, m.x, m.z, false); if (m.adj === 'fire') this.fx.emit('lava', this.v.set(m.x, m.y + 0.6 * m.s, m.z), 0.3); }
        if (m.y < lava - 0.2) { m.live = false; this.fx.emit('lava', this.v.set(m.x, lava + 0.3, m.z), 0.8); continue; }
        // отброс взрывом: летит, пока не затухнет
        if (Math.abs(m.kx) + Math.abs(m.kz) > 0.1) {
          const qx = m.x + m.kx * dt, qz = m.z + m.kz * dt, b = this.body(m);
          if (this.free(qx, qz, m.y, b, 1.2, CLIMB_MAX, m.ground + 0.05)) { m.x = qx; m.z = qz; } else { m.kx = m.kz = 0; }
          const f = Math.exp(-(m.y > m.ground + 0.05 ? 0.8 : 5) * dt); m.kx *= f; m.kz *= f;
        }
        if (this.cellReact(m)) continue;
        this.touch(m);
      }

      const mesh = this.meshes[m.kind];
      const i = counts[m.kind]++;
      if (i >= MAX) continue;
      const fall = m.kind === 'meteor' || m.phase === 'fall';
      dummy.position.set(m.x, m.y + (m.kind === 'meteor' ? 0.9 * m.s : 0), m.z);
      const spin = m.kind === 'tornado' ? m.t * 9 : m.kind === 'ufo' ? m.t * 1.5 : 0;
      dummy.rotation.set(fall ? tumble : 0, m.yaw + spin + (fall ? tumble * 0.6 : 0), m.phase === 'lie' || spin ? 0 : Math.sin(m.t * 14 + m.seed) * 0.08);
      dummy.scale.set(m.s / Math.sqrt(squash), m.s * squash, m.s / Math.sqrt(squash));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, blink ? flash : warn >= 0 ? tc.copy(TINT[m.adj]).lerp(danger, warn) : tc.copy(TINT[m.adj]));
      // огненные горят по-настоящему: языки пламени на спине; метеорит — пылает в полёте
      if (m.adj === 'fire' || m.kind === 'meteor') {
        const top = m.kind === 'meteor' ? 0.6 : m.kind === 'ufo' ? 0.3 : m.kind === 'tornado' ? 3 : 0.7;
        this.flames.add(m.x, m.y + top * m.s, m.z, 0.75 * m.s, m.seed);
        if (m.s > 1.5 || m.kind === 'meteor') this.flames.add(m.x + 0.3 * m.s, m.y + top * 0.8 * m.s, m.z - 0.2 * m.s, 0.55 * m.s, m.seed + 1.7);
      }
      // быстрые искрят: молнии вспыхивают вокруг тела в случайных местах
      if (m.adj === 'fast' || m.stun > 0) for (let q = 0; q < 2; q++) {
        if (Math.random() < 0.25) continue;
        const a = Math.random() * 6.28, r = 0.55 * m.s;
        this.bolts.add(m.x + Math.cos(a) * r, m.y + Math.random() * 0.5 * m.s, m.z + Math.sin(a) * r, (0.8 + Math.random() * 0.4) * m.s, Math.random() * 10);
      }
    }

    for (const k in this.meshes) {
      const mesh = this.meshes[k as NounId];
      mesh.count = Math.min(MAX, counts[k as NounId]);
      mesh.visible = mesh.count > 0;
      if (mesh.count) { mesh.instanceMatrix.needsUpdate = true; mesh.instanceColor!.needsUpdate = true; }
    }
    this.beam.count = beams;
    this.beam.visible = beams > 0;
    if (beams) this.beam.instanceMatrix.needsUpdate = true;
    this.ring.count = rings;
    this.ring.visible = rings > 0;
    if (rings) this.ring.instanceMatrix.needsUpdate = true;
  }

  private setRing(i: number, x: number, y: number, z: number, r: number): void {
    if (i >= MAX * 3) return;
    dummy.position.set(x, y + 0.06, z);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.setScalar(r);
    dummy.updateMatrix();
    this.ring.setMatrixAt(i, dummy.matrix);
  }

  /** Взрыв: урон (игра) + разлёт существ вокруг. */
  private explode(x: number, y: number, z: number, r: number, m: { kind: NounId; adj: AdjId }): void {
    this.h.boom(x, y, z, r, m);
    let n = 0;
    for (const q of this.mobs) {
      if (!q.live || (q.phase !== 'run' && q.phase !== 'lie')) continue;
      const dx = q.x - x, dz = q.z - z, d = Math.hypot(dx, dz), R = r * 2.2;
      if (d > R || d < 0.3 || Math.abs(q.y - y) > 3) continue;
      const f = (1 - d / R) * 12 / Math.max(1, q.s * 0.7);
      q.kx += (dx / d) * f; q.kz += (dz / d) * f; q.vy = Math.max(q.vy, 5 + f * 0.6); q.stun = 0;
      n++;
    }
    if (n >= 2) this.h.react('blast', x, z);
  }

  /** Реакции существа с клеткой под ним. true — существо исчезло. */
  private cellReact(m: Mob): boolean {
    if (m.y > 0.5 || m.y > m.ground + 0.3 || m.kind === 'meteor') return false;
    const c = this.surface.at(m.x, m.z);
    if (c === Cell.Fire) {
      // снеговик в огне тает: исчезает и оставляет лужу
      if (m.kind === 'snowman' && m.adj !== 'fire') {
        m.live = false;
        for (const [dx, dz] of [[0, 0], [2, 0], [-2, 0], [0, 2], [0, -2]]) this.surface.wetAt(m.x + dx * m.s * 0.7, m.z + dz * m.s * 0.7);
        this.fx.emit('poof', this.v.set(m.x, m.y + 1, m.z), 1.2 * m.s, [0xffffff, 0xcfefff]);
        this.h.react('snowMelt', m.x, m.z);
        return true;
      }
      // обычные, прыгучие и гигантские загораются — теперь жгут землю и ранят (и банан тоже)
      if (m.adj === 'plain' || m.adj === 'bouncy' || m.adj === 'giant') {
        m.adj = 'fire';
        this.fx.emit('lava', this.v.set(m.x, m.y + 0.8 * m.s, m.z), 0.6 * m.s);
        const w = agree(1, 'fire', m.kind).join(' ').toUpperCase();
        this.h.react('catchFire', m.x, m.z, w + '!');
      }
    } else if ((c === Cell.Wet || c === Cell.Ice) && m.adj === 'fire') {
      // огненный в луже или на льду гаснет
      m.adj = 'plain';
      this.fx.emit('poof', this.v.set(m.x, m.y + 0.8 * m.s, m.z), 0.9 * m.s, [0xffffff, 0xd8e4ee]);
      this.h.react('douse', m.x, m.z);
    } else if (c === Cell.Shock && m.adj !== 'fast' && m.stun <= 0 && m.phase === 'run') {
      m.stun = 1.6;
      this.h.react('stun', m.x, m.z);
    }
    return false;
  }

  /** Лежащий банан, который ранит (остальные только подскальзывают). */
  private deadly(m: Mob): boolean { return m.kind === 'banana' && (m.adj === 'fire' || m.adj === 'ice' || m.adj === 'giant'); }

  /** Касание игрока и манекенов. Обычная курица и обычный банан не убивают. */
  private touch(m: Mob): void {
    const r = this.reach(m);
    const hit = this.h.hitDummies(m.x, m.y, m.z, m.kind === 'banana' && m.adj === 'plain' ? 0 : r, m.kind === 'zombie');
    // укушенный бот встаёт зомби — хаос растёт сам
    for (const [x, z] of hit) this.spawnAt({ n: 1, adj: m.adj, noun: 'zombie' }, x, z, m.s);
    const p = this.h.target();
    if (!p) return;
    const dx = p.x - m.x, dz = p.z - m.z;
    if (dx * dx + dz * dz > r * r || p.y > m.y + 1.3 * m.s || p.y + 1.6 < m.y) return;
    if (m.kind === 'banana') {
      if (this.deadly(m)) this.h.touchPlayer(m, true, dx, dz);
      else this.h.slip();
      return;
    }
    this.h.touchPlayer(m, !(m.kind === 'chicken' && m.adj === 'plain'), dx, dz);
  }
}
