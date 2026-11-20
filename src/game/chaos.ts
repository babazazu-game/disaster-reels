import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { lavaTexture, iceTexture } from '../engine/textures.ts';

/**
 * Катастрофы этапа 2 и СЕТКА СОСТОЯНИЙ ПОВЕРХНОСТИ — главный принцип игры:
 * копятся последствия, а не объекты. Метеор упал и исчез, а трава вокруг горит;
 * ледяной дождь тушит огонь и делает каток; лава заливает низину. История хаоса
 * растёт, а число живых объектов и вызовов отрисовки — нет.
 *
 * Бюджет: огонь и лёд — по одному InstancedMesh (2 вызова на всю арену),
 * град — 1, лава — 1. Существа барабана — в creatures.ts (1 вызов на вид).
 */

export const enum Cell { None = 0, Fire = 1, Ice = 2 }

/** Шаг сетки, м. Совпадает с размером ящика — клетка читается глазом. */
const STEP = 2;
/** Сколько горит клетка, с. */
const BURN = 7;
/** Состояния действуют только у земли: на ящике и холме огонь и лёд не страшны. */
export const GROUND_Y = 0.3;

const dummy = new THREE.Object3D();

/* ─────────────────────────────── ПЛАМЯ ─────────────────────────────── */

const MAX_FLAMES = 700;

/** Язык пламени: капля с жёлтым ядром и красно-рыжим краем, края прозрачные. */
function flameTexture(): THREE.Texture {
  const c = document.createElement('canvas');
  c.width = 64; c.height = 128;
  const g = c.getContext('2d')!;
  const path = () => {
    g.beginPath();
    g.moveTo(32, 4);
    g.bezierCurveTo(44, 40, 60, 62, 58, 92);
    g.bezierCurveTo(56, 116, 42, 126, 32, 126);
    g.bezierCurveTo(22, 126, 8, 116, 6, 92);
    g.bezierCurveTo(4, 62, 20, 40, 32, 4);
    g.closePath();
  };
  g.filter = 'blur(5px)';
  const outer = g.createLinearGradient(0, 0, 0, 128);
  outer.addColorStop(0, 'rgba(230,40,0,0)'); outer.addColorStop(0.3, 'rgba(240,60,0,.9)'); outer.addColorStop(1, 'rgba(255,120,0,1)');
  g.fillStyle = outer; path(); g.fill();
  // ядро: жёлто-белое, ниже и уже
  g.save(); g.translate(32, 128); g.scale(0.55, 0.6); g.translate(-32, -128);
  const inner = g.createLinearGradient(0, 0, 0, 128);
  inner.addColorStop(0, 'rgba(255,200,40,0)'); inner.addColorStop(0.45, 'rgba(255,210,40,1)'); inner.addColorStop(1, 'rgba(255,245,170,1)');
  g.fillStyle = inner; path(); g.fill();
  g.restore();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Молния: жёлтый зигзаг с белым ядром и свечением — признак свойства «быстрый». */
export function boltTexture(): THREE.Texture {
  const c = document.createElement('canvas');
  c.width = 64; c.height = 128;
  const g = c.getContext('2d')!;
  const pts: [number, number][] = [[38, 4], [22, 52], [36, 56], [18, 124], [46, 62], [31, 58], [48, 4]];
  const zig = () => { g.beginPath(); g.moveTo(...pts[0]); for (const p of pts.slice(1)) g.lineTo(...p); g.closePath(); };
  g.shadowColor = 'rgba(255,220,40,1)'; g.shadowBlur = 14;
  g.fillStyle = 'rgba(255,200,20,1)'; zig(); g.fill();
  g.shadowBlur = 0;
  g.save(); g.translate(33, 64); g.scale(0.55, 0.85); g.translate(-33, -64);
  g.fillStyle = 'rgba(255,255,230,1)'; zig(); g.fill();
  g.restore();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Мягкое тёмное пятно — гарь под огнём. */
function scorchTexture(): THREE.Texture {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const r = g.createRadialGradient(32, 32, 2, 32, 32, 30);
  r.addColorStop(0, 'rgba(255,255,255,.95)'); r.addColorStop(0.45, 'rgba(255,255,255,.6)'); r.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = r; g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

/**
 * Пламя одним InstancedMesh: два скрещённых прямоугольника с текстурой языка.
 * Каждый кадр огонь собирают заново (горящие клетки + огненные существа) и зовут commit().
 * Мерцание — масштаб по синусу с разной фазой: живо и почти бесплатно.
 */
export class Flames {
  private mesh: THREE.InstancedMesh;
  private n = 0;
  private t = 0;

  constructor(scene: THREE.Scene, tex: THREE.Texture = flameTexture(), private max = MAX_FLAMES, additive = false) {
    const a = new THREE.PlaneGeometry(1, 1.5).translate(0, 0.75, 0);
    const b = a.clone().rotateY(Math.PI / 2);
    const geo = mergeGeometries([a, b])!;
    this.mesh = new THREE.InstancedMesh(geo, new THREE.MeshBasicMaterial({
      map: tex, transparent: true, depthWrite: false, side: THREE.DoubleSide,
      // пламя не аддитивно: на светлой траве аддитив выцветал в белое; молнии — аддитивно, им так и надо
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    }), max);
    this.mesh.count = 0; this.mesh.frustumCulled = false; this.mesh.renderOrder = 2;
    scene.add(this.mesh);
  }

  /** Язык пламени в точке; size — высота ~1,5·size м; seed — фаза мерцания. */
  add(x: number, y: number, z: number, size: number, seed: number): void {
    if (this.n >= this.max || size < 0.05) return;
    const f = 1 + Math.sin(this.t * 13 + seed * 7.1) * 0.18 + Math.sin(this.t * 23 + seed * 3.3) * 0.1;
    dummy.position.set(x, y, z);
    dummy.rotation.set(Math.sin(this.t * 5 + seed) * 0.12, seed * 2.4, 0);
    dummy.scale.set(size * (1.1 - (f - 1) * 0.5), size * f, size * (1.1 - (f - 1) * 0.5));
    dummy.updateMatrix();
    this.mesh.setMatrixAt(this.n++, dummy.matrix);
  }

  commit(dt: number): void {
    this.t += dt;
    this.mesh.count = this.n;
    this.mesh.visible = this.n > 0;
    if (this.n) this.mesh.instanceMatrix.needsUpdate = true;
    this.n = 0;
  }

  clear(): void { this.n = 0; this.mesh.count = 0; }
}

export class Surface {
  readonly n: number;
  private state: Uint8Array;
  private timer: Float32Array;
  private fire: THREE.InstancedMesh;
  private ice: THREE.InstancedMesh;
  private dirty = true;
  /** Клетки, которые сейчас горят — для искр (без перебора всей сетки). */
  readonly burning: number[] = [];

  constructor(scene: THREE.Scene, private half: number, private flames: Flames) {
    this.n = Math.round((half * 2) / STEP);
    const total = this.n * this.n;
    this.state = new Uint8Array(total);
    this.timer = new Float32Array(total);
    const tile = new THREE.PlaneGeometry(STEP * 0.98, STEP * 0.98).rotateX(-Math.PI / 2);
    // под огнём — обугленное пятно с мягким краем; сам огонь — языки пламени (Flames)
    // пятно крупнее клетки — соседние сливаются; polygonOffset — иначе вдали пятно рвётся о траву (z-fighting)
    const scorch = new THREE.PlaneGeometry(STEP * 1.35, STEP * 1.35).rotateX(-Math.PI / 2);
    this.fire = new THREE.InstancedMesh(scorch, new THREE.MeshBasicMaterial({ map: scorchTexture(), color: 0x2a160c, transparent: true, opacity: 0.7,
      depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 }), total);
    const it = iceTexture();
    this.ice = new THREE.InstancedMesh(tile, new THREE.MeshStandardMaterial({ map: it, color: 0xd8f3ff, roughness: 0.08, transparent: true, opacity: 0.92,
      polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 }), total);
    this.fire.position.y = 0.06; this.ice.position.y = 0.04;
    for (const m of [this.fire, this.ice]) { m.count = 0; m.frustumCulled = false; m.receiveShadow = true; scene.add(m); }
  }

  private idx(x: number, z: number): number {
    const i = Math.floor((x + this.half) / STEP), j = Math.floor((z + this.half) / STEP);
    return i < 0 || j < 0 || i >= this.n || j >= this.n ? -1 : j * this.n + i;
  }
  center(k: number, out: THREE.Vector3): THREE.Vector3 {
    return out.set((k % this.n) * STEP - this.half + STEP / 2, 0, Math.floor(k / this.n) * STEP - this.half + STEP / 2);
  }

  at(x: number, z: number): Cell { const k = this.idx(x, z); return k < 0 ? Cell.None : this.state[k] as Cell; }

  /** Поджечь клетку. Лёд огонь НЕ берёт — сначала он должен растаять (этап 4). */
  ignite(x: number, z: number, time = BURN): void {
    const k = this.idx(x, z);
    if (k < 0 || this.state[k] === Cell.Ice) return;
    if (this.state[k] !== Cell.Fire) this.dirty = true;
    this.state[k] = Cell.Fire; this.timer[k] = Math.max(this.timer[k], time);
  }

  /** Заморозить клетку. Вернёт true, если при этом потушен огонь (пар — первая «реакция»). */
  freeze(k: number): boolean {
    const wasFire = this.state[k] === Cell.Fire;
    this.state[k] = Cell.Ice; this.dirty = true;
    return wasFire;
  }

  /** Заморозить клетку под точкой (x, z). */
  freezeAt(x: number, z: number): boolean { const k = this.idx(x, z); return k >= 0 && this.freeze(k); }

  reset(): void { this.state.fill(Cell.None); this.timer.fill(0); this.dirty = true; }

  update(dt: number): void {
    for (let k = 0; k < this.state.length; k++) {
      if (this.state[k] !== Cell.Fire) continue;
      this.timer[k] -= dt;
      if (this.timer[k] <= 0) { this.state[k] = Cell.None; this.dirty = true; }
    }
    // языки пламени над горящими клетками: по два на клетку, гаснут к концу горения
    for (const k of this.burning) {
      const cx = (k % this.n) * STEP - this.half + STEP / 2, cz = Math.floor(k / this.n) * STEP - this.half + STEP / 2;
      const fade = Math.min(1, this.timer[k] / 1.2);
      this.flames.add(cx - 0.45 + ((k * 37) % 7) / 10, 0.07, cz - 0.3 + ((k * 13) % 5) / 10, 1.15 * fade, k);
      this.flames.add(cx + 0.4 - ((k * 11) % 6) / 10, 0.07, cz + 0.35 - ((k * 29) % 7) / 10, 0.85 * fade, k + 0.5);
    }
    if (!this.dirty) return;
    this.dirty = false;
    // пересобираем списки экземпляров только при изменении — раз в несколько кадров, не каждый
    let f = 0, c = 0;
    this.burning.length = 0;
    for (let k = 0; k < this.state.length; k++) {
      const s = this.state[k];
      if (s === Cell.None) continue;
      this.center(k, dummy.position);
      dummy.updateMatrix();
      if (s === Cell.Fire) { this.fire.setMatrixAt(f++, dummy.matrix); this.burning.push(k); } else this.ice.setMatrixAt(c++, dummy.matrix);
    }
    this.fire.count = f; this.ice.count = c;
    this.fire.instanceMatrix.needsUpdate = true; this.ice.instanceMatrix.needsUpdate = true;
  }
}

/* ─────────────────────────────── ГРАД ─────────────────────────────── */

const HAIL = 260;

/** Ледяной дождь: падающие льдинки одним InstancedMesh вокруг арены. */
export class Hail {
  private mesh: THREE.InstancedMesh;
  private pos = new Float32Array(HAIL * 3);
  on = false;

  constructor(scene: THREE.Scene, private half: number) {
    this.mesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.12, 0.7, 0.12),
      new THREE.MeshBasicMaterial({ color: 0xcfefff, transparent: true, opacity: 0.8 }), HAIL);
    this.mesh.frustumCulled = false;
    this.mesh.count = 0;
    scene.add(this.mesh);
    for (let i = 0; i < HAIL; i++) this.respawn(i, Math.random() * 26);
  }

  private respawn(i: number, y = 26): void {
    this.pos[i * 3] = (Math.random() * 2 - 1) * this.half;
    this.pos[i * 3 + 1] = y;
    this.pos[i * 3 + 2] = (Math.random() * 2 - 1) * this.half;
  }

  update(dt: number): void {
    if (!this.on) { this.mesh.count = 0; return; }
    for (let i = 0; i < HAIL; i++) {
      this.pos[i * 3 + 1] -= dt * 22;
      if (this.pos[i * 3 + 1] < 0) this.respawn(i);
      dummy.position.set(this.pos[i * 3], this.pos[i * 3 + 1], this.pos[i * 3 + 2]);
      dummy.rotation.set(0, 0, 0.25);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      this.mesh.setMatrixAt(i, dummy.matrix);
    }
    this.mesh.count = HAIL;
    this.mesh.instanceMatrix.needsUpdate = true;
  }
}

/* ─────────────────────────────── ЛАВА ─────────────────────────────── */

const LAVA_LOW = -2.5;
export const LAVA_TOP = 0.45;

/** Лава поднимается снизу и заливает низину: спасают ящики, холм и башня. */
export class Lava {
  readonly mesh: THREE.Mesh;
  private tex: THREE.Texture;
  level = LAVA_LOW;
  private rising = 0;   // секунд до полного подъёма; 0 — стоит
  private top = LAVA_TOP;
  private from = LAVA_LOW;

  constructor(scene: THREE.Scene, half: number) {
    this.tex = lavaTexture();
    this.tex.wrapS = this.tex.wrapT = THREE.RepeatWrapping;
    this.tex.repeat.set(half / 3, half / 3);
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(half * 2 + 6, half * 2 + 6).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ map: this.tex, color: 0xffffff }));
    this.mesh.visible = false;
    scene.add(this.mesh);
  }

  /** Подняться до высоты top за seconds. Финал идёт ступенями: земля → ящики → холм. */
  rise(seconds: number, top = LAVA_TOP): void { this.rising = seconds; this.top = top; this.from = this.level; this.mesh.visible = true; }
  reset(): void { this.level = LAVA_LOW; this.rising = 0; this.top = LAVA_TOP; this.mesh.visible = false; this.mesh.position.y = LAVA_LOW; }

  update(dt: number): void {
    if (!this.mesh.visible) return;
    if (this.rising > 0) {
      this.level = Math.min(this.top, this.level + ((this.top - this.from) / this.rising) * dt);
      if (this.level >= this.top) this.rising = 0;
    }
    this.mesh.position.y = this.level;
    this.tex.offset.x += dt * 0.03; this.tex.offset.y += dt * 0.02;   // лава «течёт»
  }
}
