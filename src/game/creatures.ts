import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { AdjId, NounId } from './words.ts';
import type { ReelResult } from './reels.ts';
import type { Surface } from './chaos.ts';
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
 * Сколько бегающих выходит на самом деле: «100 котов» — обещание на барабане, а не 100
 * котов (заказчик: при 10 выжить нереально, ребёнок потеряется). Падающие — до 30 за волну.
 */
const runners = (n: number) => (n <= 3 ? n : n <= 5 ? 4 : n <= 10 ? 5 : n <= 25 ? 6 : 8);
const WARN = 1.3;           // сколько летит падающее (видна метка)
const EVENT_TIME = 8;       // за столько секунд выходит вся волна
/** Существа живут до конца раунда (или до лавы): хаос КОПИТСЯ — просьба заказчика. */
const FOREVER = Infinity;
const G = 30;
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
}

interface Wave { r: ReelResult; left: number; gap: number; next: number; s: number; t: number }

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
const SPEED: Partial<Record<NounId, number>> = { chicken: 4, cat: 4.6, shark: 3.8, slime: 3, snowman: 2.2, zombie: 2.4, dino: 5 };

const dummy = new THREE.Object3D();
let beams = 0;
const flash = new THREE.Color(3, 3, 3);
const tc = new THREE.Color();

export class Creatures {
  private mobs: Mob[] = [];
  private meshes = {} as Record<NounId, THREE.InstancedMesh>;
  private ring: THREE.InstancedMesh;
  private beam: THREE.InstancedMesh;
  private waves: Wave[] = [];
  private v = new THREE.Vector3();

  constructor(scene: THREE.Scene, private half: number, private surface: Surface, private fx: Particles, private h: CreatureHooks) {
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
      if (c === 1) this.surface.ignite(x, z, 5);
      else if (c === 2) this.surface.freezeAt(x, z);
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

  /** Новая волна по итогу барабана. */
  start(r: ReelResult): void {
    const run = RUNNERS.includes(r.noun);
    let n = run ? Math.min(FEW[r.noun] ?? 99, runners(r.n)) : Math.min(30, r.n), s = 1;
    if (r.adj === 'giant') { n = Math.min(run ? 3 : 6, Math.max(1, Math.ceil(n / 3))); s = 2.2; }
    if (r.n === 1) s *= 1.7;               // одиночка — крупнее, чтобы «1» не была скучной
    this.waves.push({ r, left: n, gap: Math.min(0.7, (run ? 4 : EVENT_TIME) / n), next: 0, s, t: 0 });
  }

  reset(): void {
    this.waves.length = 0;
    for (const m of this.mobs) m.live = false;
    for (const k in this.meshes) this.meshes[k as NounId].count = 0;
    this.ring.count = 0;
  }

  private alive(kind: NounId): number { let c = 0; for (const m of this.mobs) if (m.live && m.kind === kind) c++; return c; }

  private spawn(r: ReelResult, s: number): void {
    if (this.alive(r.noun) >= MAX) return;
    const m = this.mobs.find((q) => !q.live) ?? (this.mobs.push({} as Mob), this.mobs[this.mobs.length - 1]);
    const H = this.half - 1.5;
    Object.assign(m, { kind: r.noun, adj: r.adj, live: true, s, t: 0, vy: 0, bounces: 0, tick: 0, seed: Math.random() * 100, life: FOREVER, yaw: Math.random() * 6.28, steer: 0, steerT: 0, hold: 0 });
    const few = (this.waves.find((w) => w.r === r)?.left ?? 9) <= 3;
    if (FALLING.includes(r.noun)) {
      // падающее: метка на земле, часть целится туда, куда бежит игрок; одиночные — всегда к игроку, иначе их не увидеть
      const p = this.h.target();
      let x: number, z: number;
      if (p && (few || Math.random() < 0.25)) { const v = this.h.targetVel(); x = p.x + v.x * 0.7; z = p.z + v.z * 0.7; }
      else { x = (Math.random() * 2 - 1) * H; z = (Math.random() * 2 - 1) * H; }
      this.aim(m, THREE.MathUtils.clamp(x, -H, H), THREE.MathUtils.clamp(z, -H, H), r.adj === 'fast' ? WARN * 0.6 : WARN);
    } else {
      // бегающее: с неба у края острова, без метки — короткий прыжок вниз
      const e = Math.random() * 4 | 0, u = (Math.random() * 2 - 1) * H;
      const x = e === 0 ? -H : e === 1 ? H : u, z = e === 2 ? -H : e === 3 ? H : u;
      if (r.noun === 'ufo') Object.assign(m, { phase: 'fly' as Phase, x, z, y: 16, ground: 0 });
      else if (r.noun === 'tornado') { Object.assign(m, { phase: 'wind' as Phase, x, z, y: 0, ground: 0 }); this.fx.emit('dust', this.v.set(x, 0.5, z), 1.5); }
      else Object.assign(m, { phase: 'drop' as Phase, x, z, y: 9, ground: this.h.heightAt(x, z) });
    }
  }

  /** Зомби из укушенного бота: прямо на месте, без падения с неба. */
  private spawnAt(r: ReelResult, x: number, z: number, s: number): void {
    if (this.alive(r.noun) >= MAX) return;
    const m = this.mobs.find((q) => !q.live) ?? (this.mobs.push({} as Mob), this.mobs[this.mobs.length - 1]);
    Object.assign(m, { kind: r.noun, adj: r.adj, live: true, s, t: 0, vy: 4, bounces: 0, tick: 0, seed: Math.random() * 100,
      life: FOREVER, yaw: Math.random() * 6.28, steer: 0, steerT: 0, hold: 0, phase: 'run' as Phase, x, z, y: 0, ground: this.h.heightAt(x, z) });
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
        if (d2 >= want * want || d2 < 1e-6) continue;
        const d = Math.sqrt(d2), push = (want - d) * 0.5, ux = dx / d, uz = dz / d;
        if (this.free(a.x - ux * push, a.z - uz * push, a.y, this.body(a), this.step(a))) { a.x -= ux * push; a.z -= uz * push; }
        if (this.free(b.x + ux * push, b.z + uz * push, b.y, this.body(b), this.step(b))) { b.x += ux * push; b.z += uz * push; }
      }
    }
  }

  private aim(m: Mob, x: number, z: number, warn: number): void {
    Object.assign(m, { phase: 'fall' as Phase, tx: x, tz: z, x, z, t: 0, warn, ground: this.h.heightAt(x, z), from: 34 });
  }

  /** Радиус касания существа. */
  private reach(m: Mob): number { return (m.kind === 'shark' || m.kind === 'dino' ? 0.75 : 0.45) * m.s + 0.25; }
  /** Полуширина тела — чтобы не залезать в ящики. */
  private body(m: Mob): number { return (m.kind === 'shark' ? 0.55 : m.kind === 'dino' ? 0.6 : 0.45) * Math.min(m.s, 1.6); }
  /** Высота ступеньки: гиганты и динозавр перешагивают метровые уступы (а не застревают). */
  private step(m: Mob): number { return m.kind === 'dino' || m.s > 2 ? 1.1 : 0.45; }

  private effect(m: Mob, x: number, z: number, cross: boolean): void {
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
        this.h.boom(m.x, m.ground, m.z, 2.1 * m.s, m);
        if (m.ground < 0.5) this.effect(m, m.x, m.z, true);
        if (m.adj === 'bouncy' && m.bounces < 2) {   // прыгучий метеорит отскакивает и бьёт ещё раз
          m.bounces++;
          const a = Math.random() * 6.28, H = this.half - 1.5;
          this.aim(m, THREE.MathUtils.clamp(m.x + Math.cos(a) * 6, -H, H), THREE.MathUtils.clamp(m.z + Math.sin(a) * 6, -H, H), 0.8);
          m.from = m.ground + 7;
        } else m.live = false;
        return;
      case 'bomb':
        this.h.boom(m.x, m.ground, m.z, near, { kind: 'bomb', adj: 'plain' });
        Object.assign(m, { phase: 'fuse' as Phase, t: 0, y: m.ground, warn: m.adj === 'fast' ? 0.8 : 1.6 });
        return;
      case 'banana':
        Object.assign(m, { phase: 'lie' as Phase, t: 0, y: m.ground, life: FOREVER });
        this.fx.emit('dust', this.v.set(m.x, m.ground + 0.2, m.z), 0.8);
        this.effect(m, m.x, m.z, false);
        return;
      default:   // снеговик: накрыл — гибель, потом медленно ползёт и морозит
        this.h.boom(m.x, m.ground, m.z, near, m);
        this.effect(m, m.x, m.z, true);
        Object.assign(m, { phase: 'run' as Phase, t: 0, y: m.ground, life: FOREVER });
    }
  }

  /** Может ли существо шагнуть в (x, z) с высоты y: ящики и холм — укрытие от бегающих. */
  private free(x: number, z: number, y: number, r: number, step = 0.45): boolean {
    const H = this.half - 0.6 - r, top = y + step, h = this.h.heightAt;
    // центр и четыре угла тела: иначе курица наполовину въезжает в ящик
    return Math.abs(x) < H && Math.abs(z) < H && h(x, z) <= top
      && h(x - r, z - r) <= top && h(x + r, z - r) <= top && h(x - r, z + r) <= top && h(x + r, z + r) <= top;
  }

  private run(m: Mob, dt: number): void {
    const p = this.h.target();
    let dx: number, dz: number;
    if (p) { dx = p.x - m.x; dz = p.z - m.z; }
    else { dx = Math.sin(m.seed + m.t * 0.3); dz = Math.cos(m.seed * 1.7 + m.t * 0.3); }
    const len = Math.hypot(dx, dz) || 1;
    // покачивание курса: стая не бежит в одну точку цепочкой
    const wob = Math.sin(m.t * 1.3 + m.seed) * 0.6;
    // обход препятствия: упёрся — какое-то время бежит под углом в сторону
    const turn = wob + (m.steerT > 0 ? m.steer : 0);
    m.steerT -= dt;
    const ux = dx / len, uz = dz / len;
    const wx = ux * Math.cos(turn) - uz * Math.sin(turn), wz = ux * Math.sin(turn) + uz * Math.cos(turn);
    let sp = (SPEED[m.kind] ?? 4) * (m.adj === 'fast' ? 1.6 : 1) * (m.adj === 'giant' ? 0.75 : 1);
    if (m.kind === 'slime' || m.kind === 'shark') sp *= m.y > m.ground + 0.05 ? 1.3 : 0.25;   // перемещаются прыжками
    const nx = m.x + wx * sp * dt, nz = m.z + wz * sp * dt;
    const grounded = m.y <= m.ground + 0.01, b = this.body(m), st = this.step(m);
    let moved = true;
    if (this.free(nx, nz, m.y, b, st)) { m.x = nx; m.z = nz; }
    else if (this.free(nx, m.z, m.y, b, st)) m.x = nx;
    else if (this.free(m.x, nz, m.y, b, st)) m.z = nz;
    else moved = false;
    if (!moved) {
      if (grounded && (m.kind === 'cat' || m.adj === 'bouncy')) m.vy = 12.5;   // коты залезают на ящики
      // остальные обходят: в сторону, а если снова упёрлись — в другую
      m.steer = m.steerT > 0 ? -m.steer : (m.seed % 2 < 1 ? 1.4 : -1.4);
      m.steerT = 0.9;
    }
    m.yaw = Math.atan2(wx, wz);
    // прыжки: прыгучие — всегда, слайм и акула — короткими скачками
    if (grounded) {
      if (m.adj === 'bouncy') m.vy = 11;
      else if (m.kind === 'slime') m.vy = 7;
      else if (m.kind === 'shark') m.vy = 5.5;
    }
  }

  update(dt: number): void {
    for (const w of this.waves) {
      w.t += dt; w.next -= dt;
      while (w.left > 0 && w.next <= 0) { this.spawn(w.r, w.s); w.left--; w.next += w.gap; }
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
      let tumble = 0, squash = 1, blink = false;

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
          this.h.boom(m.x, m.y, m.z, 3.2 * m.s, m);
          if (m.y < 0.5) this.effect(m, m.x, m.z, true);
          continue;
        }
      } else if (m.phase === 'fly') {
        if (this.ufo(m, dt)) continue;
      } else if (m.phase === 'wind') {
        if (this.tornado(m, dt)) continue;
      } else if (m.phase === 'lie') {
        if (m.adj === 'bouncy' || m.adj === 'fast') this.run(m, dt * 0.6);
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
        if (m.y <= m.ground) { m.y = m.ground; m.vy = 0; }
        if (m.vy !== 0 || m.kind === 'slime') squash = 1 + Math.sin(m.t * 12) * 0.12;
        // след на земле: огненные поджигают, ледяные морозят
        m.tick -= dt;
        if (m.tick <= 0 && m.y < 0.5) { m.tick = TRAIL; this.effect(m, m.x, m.z, false); if (m.adj === 'fire') this.fx.emit('lava', this.v.set(m.x, m.y + 0.6 * m.s, m.z), 0.3); }
        if (m.y < lava - 0.2) { m.live = false; this.fx.emit('lava', this.v.set(m.x, lava + 0.3, m.z), 0.8); continue; }
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
      mesh.setColorAt(i, blink ? flash : tc.copy(TINT[m.adj]));
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
      if (m.adj === 'plain' || m.adj === 'bouncy' || m.adj === 'fast') this.h.slip();
      else this.h.touchPlayer(m, true, dx, dz);
      return;
    }
    this.h.touchPlayer(m, !(m.kind === 'chicken' && m.adj === 'plain'), dx, dz);
  }
}
