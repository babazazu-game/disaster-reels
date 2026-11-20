import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { lavaTexture, iceTexture } from '../engine/textures.ts';

/**
 * Катастрофы этапа 2 и СЕТКА СОСТОЯНИЙ ПОВЕРХНОСТИ — главный принцип игры:
 * копятся последствия, а не объекты. Метеор упал и исчез, а трава вокруг горит;
 * ледяной дождь тушит огонь и делает каток; лава заливает низину. История хаоса
 * растёт, а число живых объектов и вызовов отрисовки — нет.
 *
 * Бюджет: пять состояний поверхности — по одному InstancedMesh (до 5 вызовов на арену).
 * Языки пламени и молнии — в общих буферах с эффектами существ. Град — 1, лава — 1.
 * Существа барабана — в creatures.ts (1 вызов на вид).
 */

export const enum Cell { None = 0, Fire = 1, Ice = 2, Wet = 3, Shock = 4, Slime = 5 }
export type ReactionId = 'steam' | 'melt' | 'shock' | 'slimeFire';

/** Шаг сетки, м. Совпадает с размером ящика — клетка читается глазом. */
const STEP = 2;
/** Сколько горит клетка, с. */
const BURN = 7;
const WET = 12;
const SHOCK = 1.6;
const SLIME = 10;
const MAX_SHOCK_CELLS = 80;
const MAX_SHOCK_BOLTS = 40;
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

function puddleTexture(electric: boolean): THREE.Texture {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  r.addColorStop(0, electric ? 'rgba(255,252,183,.97)' : 'rgba(153,226,255,.8)');
  r.addColorStop(0.78, electric ? 'rgba(83,223,255,.92)' : 'rgba(43,156,221,.75)');
  r.addColorStop(1, electric ? 'rgba(70,195,255,0)' : 'rgba(43,156,221,0)');
  g.fillStyle = r; g.fillRect(0, 0, 128, 128);
  g.strokeStyle = electric ? 'rgba(255,255,222,.85)' : 'rgba(222,247,255,.55)';
  g.lineWidth = 2;
  for (const radius of [16, 29, 43]) {
    g.beginPath(); g.ellipse(61, 62, radius, radius * 0.8, -0.3, 0, Math.PI * 2); g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function slimeTexture(): THREE.Texture {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const r = g.createRadialGradient(48, 43, 4, 64, 64, 64);
  r.addColorStop(0, 'rgba(205,255,98,.98)');
  r.addColorStop(0.78, 'rgba(77,208,23,.94)');
  r.addColorStop(1, 'rgba(40,151,10,0)');
  g.fillStyle = r; g.fillRect(0, 0, 128, 128);
  for (const [x, y, radius] of [[43, 44, 13], [80, 54, 9], [63, 84, 12], [91, 83, 6], [36, 74, 7]]) {
    const bubble = g.createRadialGradient(x - radius * 0.35, y - radius * 0.4, 0, x, y, radius);
    bubble.addColorStop(0, 'rgba(249,255,210,.98)');
    bubble.addColorStop(0.4, 'rgba(162,255,69,.75)');
    bubble.addColorStop(1, 'rgba(33,125,7,.82)');
    g.fillStyle = bubble;
    g.beginPath(); g.arc(x, y, radius, 0, Math.PI * 2); g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export class Surface {
  readonly n: number;
  private state: Uint8Array;
  private timer: Float64Array;
  private meshes: THREE.InstancedMesh[];
  private shocked: number[] = [];
  private dirty = true;
  /** Клетки, которые сейчас горят — для искр (без перебора всей сетки). */
  readonly burning: number[] = [];
  onReact: ((id: ReactionId, x: number, z: number) => void) | null = null;

  constructor(scene: THREE.Scene, private half: number, private flames: Flames, private bolts: Flames) {
    this.n = Math.round((half * 2) / STEP);
    const total = this.n * this.n;
    this.state = new Uint8Array(total);
    this.timer = new Float64Array(total);
    const tile = new THREE.PlaneGeometry(STEP * 0.98, STEP * 0.98).rotateX(-Math.PI / 2);
    // под огнём — обугленное пятно с мягким краем; сам огонь — языки пламени (Flames)
    // пятно крупнее клетки — соседние сливаются; polygonOffset — иначе вдали пятно рвётся о траву (z-fighting)
    const scorch = new THREE.PlaneGeometry(STEP * 1.35, STEP * 1.35).rotateX(-Math.PI / 2);
    const fire = new THREE.InstancedMesh(scorch, new THREE.MeshBasicMaterial({ map: scorchTexture(), color: 0x2a160c, transparent: true, opacity: 0.7,
      depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 }), total);
    const it = iceTexture();
    const ice = new THREE.InstancedMesh(tile, new THREE.MeshStandardMaterial({ map: it, color: 0xd8f3ff, roughness: 0.08, transparent: true, opacity: 0.92,
      polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 }), total);
    const puddle = new THREE.PlaneGeometry(STEP * 1.15, STEP * 1.15).rotateX(-Math.PI / 2);
    const layer = (map: THREE.Texture, y: number, emissive = 0) => {
      // Края соседних луж перекрываются, поэтому прозрачность не должна писать глубину.
      const mesh = new THREE.InstancedMesh(puddle, new THREE.MeshStandardMaterial({ map, roughness: 0.05, emissive,
        transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 }), total);
      mesh.position.y = y;
      return mesh;
    };
    fire.position.y = 0.06; ice.position.y = 0.04;
    // Порядок совпадает с Cell, начиная с Fire: None не рисуется.
    this.meshes = [fire, ice, layer(puddleTexture(false), 0.035), layer(puddleTexture(true), 0.05, 0x173034), layer(slimeTexture(), 0.045)];
    for (const m of this.meshes) { m.count = 0; m.frustumCulled = false; m.receiveShadow = true; scene.add(m); }
  }

  private idx(x: number, z: number): number {
    const i = Math.floor((x + this.half) / STEP), j = Math.floor((z + this.half) / STEP);
    return i < 0 || j < 0 || i >= this.n || j >= this.n ? -1 : j * this.n + i;
  }
  center(k: number, out: THREE.Vector3): THREE.Vector3 {
    return out.set((k % this.n) * STEP - this.half + STEP / 2, 0, Math.floor(k / this.n) * STEP - this.half + STEP / 2);
  }

  at(x: number, z: number): Cell { const k = this.idx(x, z); return k < 0 ? Cell.None : this.state[k] as Cell; }

  private setCell(k: number, state: Cell, time: number): void {
    if (this.state[k] !== state) this.dirty = true;
    this.state[k] = state; this.timer[k] = time;
  }

  private react(id: ReactionId, k: number): void {
    if (!this.onReact) return;
    const center = this.center(k, dummy.position);
    this.onReact(id, center.x, center.z);
  }

  /** Огонь тратится на таяние льда и испарение воды, а слизь продлевает горение. */
  ignite(x: number, z: number, time = BURN): void {
    const k = this.idx(x, z);
    if (k < 0) return;
    switch (this.state[k]) {
      case Cell.Ice: this.setCell(k, Cell.Wet, WET); this.react('melt', k); break;
      case Cell.Wet: this.setCell(k, Cell.Wet, WET); this.react('steam', k); break;
      case Cell.Slime: this.setCell(k, Cell.Fire, time * 2); this.react('slimeFire', k); break;
      case Cell.Shock: break;
      default: this.setCell(k, Cell.Fire, Math.max(this.timer[k], time));
    }
  }

  /** При тушении огня остаётся лужа, поэтому вызывающий получает true для эффекта пара. */
  freeze(k: number): boolean {
    if (this.state[k] === Cell.Fire) {
      this.setCell(k, Cell.Wet, WET); this.react('steam', k);
      return true;
    }
    this.setCell(k, Cell.Ice, 0);
    return false;
  }

  /** Заморозить клетку под точкой (x, z). */
  freezeAt(x: number, z: number): boolean { const k = this.idx(x, z); return k >= 0 && this.freeze(k); }

  wetAt(x: number, z: number): void {
    const k = this.idx(x, z);
    if (k < 0) return;
    const state = this.state[k];
    if (state === Cell.Ice) return;
    if (state === Cell.Shock) { this.setCell(k, Cell.Shock, SHOCK); return; }
    this.setCell(k, Cell.Wet, WET);
    if (state === Cell.Fire) this.react('steam', k);
  }

  shockAt(x: number, z: number): number {
    const start = this.idx(x, z);
    if (this.state[start] !== Cell.Wet && this.state[start] !== Cell.Shock) return 0;
    const cells: number[] = [];
    const visited = new Set<number>();
    let changed = false;
    const enqueue = (k: number) => {
      const state = this.state[k];
      if (cells.length >= MAX_SHOCK_CELLS || visited.has(k) || (state !== Cell.Wet && state !== Cell.Shock)) return;
      cells.push(k); visited.add(k);
      if (state === Cell.Wet) changed = true;
      this.setCell(k, Cell.Shock, SHOCK);
    };
    enqueue(start);
    for (let i = 0; i < cells.length && cells.length < MAX_SHOCK_CELLS; i++) {
      const k = cells[i], col = k % this.n;
      // Проверяем столбец, чтобы ток не перескакивал с края строки на другой край.
      if (col > 0) enqueue(k - 1);
      if (col + 1 < this.n) enqueue(k + 1);
      enqueue(k - this.n); enqueue(k + this.n);
    }
    if (changed) this.react('shock', start);
    return cells.length;
  }

  slimeAt(x: number, z: number): void {
    const k = this.idx(x, z);
    const state = this.state[k];
    if (state === Cell.None || state === Cell.Wet || state === Cell.Slime) this.setCell(k, Cell.Slime, SLIME);
  }

  counts(): { fire: number; ice: number; wet: number; shock: number; slime: number } {
    const counts = [0, 0, 0, 0, 0, 0];
    for (const state of this.state) counts[state]++;
    return { fire: counts[Cell.Fire], ice: counts[Cell.Ice], wet: counts[Cell.Wet], shock: counts[Cell.Shock], slime: counts[Cell.Slime] };
  }

  reset(): void {
    this.state.fill(Cell.None); this.timer.fill(0);
    this.burning.length = 0; this.shocked.length = 0;
    for (const m of this.meshes) m.count = 0;
    this.dirty = false;
  }

  update(dt: number): void {
    for (let k = 0; k < this.state.length; k++) {
      const state = this.state[k];
      if (state === Cell.None || state === Cell.Ice) continue;
      this.timer[k] -= dt;
      if (this.timer[k] <= 0) {
        if (state === Cell.Shock) this.setCell(k, Cell.Wet, WET);
        else this.setCell(k, Cell.None, 0);
      }
    }
    if (this.dirty) this.rebuild();
    // языки пламени над горящими клетками: по два на клетку, гаснут к концу горения
    for (const k of this.burning) {
      const cx = (k % this.n) * STEP - this.half + STEP / 2, cz = Math.floor(k / this.n) * STEP - this.half + STEP / 2;
      const fade = Math.min(1, this.timer[k] / 1.2);
      this.flames.add(cx - 0.45 + ((k * 37) % 7) / 10, 0.07, cz - 0.3 + ((k * 13) % 5) / 10, 1.15 * fade, k);
      this.flames.add(cx + 0.4 - ((k * 11) % 6) / 10, 0.07, cz + 0.35 - ((k * 29) % 7) / 10, 0.85 * fade, k + 0.5);
    }
    let bolts = Math.min(MAX_SHOCK_BOLTS, this.shocked.length);
    for (let i = 0; i < this.shocked.length && bolts > 0; i++) {
      // Выборка без повторов: у каждой оставшейся клетки одинаковый шанс попасть в кадр.
      const remaining = this.shocked.length - i;
      if (bolts < remaining && Math.random() * remaining >= bolts) continue;
      const { x, z } = this.center(this.shocked[i], dummy.position);
      this.bolts.add(x + (Math.random() - 0.5) * STEP, 0.2 + Math.random() * 0.4,
        z + (Math.random() - 0.5) * STEP, 0.9 + Math.random() * 0.5, Math.random() * 10);
      bolts--;
    }
  }

  private rebuild(): void {
    this.dirty = false;
    // пересобираем списки экземпляров только при изменении — раз в несколько кадров, не каждый
    for (const m of this.meshes) m.count = 0;
    this.burning.length = 0; this.shocked.length = 0;
    for (let k = 0; k < this.state.length; k++) {
      const s = this.state[k];
      if (s === Cell.None) continue;
      this.center(k, dummy.position);
      // dummy общий с градом: без сброса плитки льда наследовали наклон градин (заказчик: «лёд под наклоном»)
      dummy.rotation.set(0, 0, 0); dummy.scale.setScalar(1);
      dummy.updateMatrix();
      const mesh = this.meshes[s - Cell.Fire];
      mesh.setMatrixAt(mesh.count++, dummy.matrix);
      if (s === Cell.Fire) this.burning.push(k);
      if (s === Cell.Shock) this.shocked.push(k);
    }
    for (const m of this.meshes) if (m.count) m.instanceMatrix.needsUpdate = true;
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
      dummy.rotation.set(0, 0, 0);
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
