import * as THREE from 'three';
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

export class Surface {
  readonly n: number;
  private state: Uint8Array;
  private timer: Float32Array;
  private fire: THREE.InstancedMesh;
  private ice: THREE.InstancedMesh;
  private dirty = true;
  /** Клетки, которые сейчас горят — для искр (без перебора всей сетки). */
  readonly burning: number[] = [];

  constructor(scene: THREE.Scene, private half: number) {
    this.n = Math.round((half * 2) / STEP);
    const total = this.n * this.n;
    this.state = new Uint8Array(total);
    this.timer = new Float32Array(total);
    const tile = new THREE.PlaneGeometry(STEP * 0.98, STEP * 0.98).rotateX(-Math.PI / 2);
    // огонь — без освещения и чуть прозрачный: «тлеющая» трава видна и в тени
    this.fire = new THREE.InstancedMesh(tile, new THREE.MeshBasicMaterial({ color: 0xff6a1a, transparent: true, opacity: 0.85, depthWrite: false }), total);
    const it = iceTexture();
    this.ice = new THREE.InstancedMesh(tile, new THREE.MeshStandardMaterial({ map: it, color: 0xd8f3ff, roughness: 0.08, transparent: true, opacity: 0.92 }), total);
    this.fire.position.y = 0.035; this.ice.position.y = 0.03;
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

  constructor(scene: THREE.Scene, half: number) {
    this.tex = lavaTexture();
    this.tex.wrapS = this.tex.wrapT = THREE.RepeatWrapping;
    this.tex.repeat.set(half / 3, half / 3);
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(half * 2 + 6, half * 2 + 6).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ map: this.tex, color: 0xffffff }));
    this.mesh.visible = false;
    scene.add(this.mesh);
  }

  rise(seconds: number): void { this.rising = seconds; this.mesh.visible = true; }
  reset(): void { this.level = LAVA_LOW; this.rising = 0; this.mesh.visible = false; this.mesh.position.y = LAVA_LOW; }

  update(dt: number): void {
    if (!this.mesh.visible) return;
    if (this.rising > 0) {
      this.level = Math.min(LAVA_TOP, this.level + ((LAVA_TOP - LAVA_LOW) / this.rising) * dt);
      if (this.level >= LAVA_TOP) this.rising = 0;
    }
    this.mesh.position.y = this.level;
    this.tex.offset.x += dt * 0.03; this.tex.offset.y += dt * 0.02;   // лава «течёт»
  }
}
