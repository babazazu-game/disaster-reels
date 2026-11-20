import * as THREE from 'three';
import { Avatar } from '../engine/avatar.ts';
import { Controller } from '../engine/controller.ts';
import type { Physics } from '../engine/physics.ts';
import { SKINS } from './skins.ts';
import { Cell, GROUND_Y } from './chaos.ts';

/**
 * Боты на арене (этап 5): создают ощущение онлайн-сервера и гибнут смешно — но барабан не крутят.
 *
 * Мозг думает 5 раз в секунду (вразнобой), а не каждый кадр: решения дешёвые, бег — каждый кадр
 * через тот же Controller и физику, что у игрока (прыжки, ступеньки, лёд, слизь — бесплатно).
 * Что умеют:
 *  - убегать — отталкиваются от бегающих, меток падения, смерча, НЛО, огня и тока под ногами, от края;
 *  - прятаться — бегающий рядом, а неподалёку высокое место (выше 2 м — туда существа не лезут) → лезут туда;
 *  - спасаться от лавы — после «ЛАВА СКОРО!» лезут по ступеням на самое высокое из ближайших мест;
 *  - ошибаться — у каждого своя «ловкость»: замечает опасность с задержкой, иногда паникует и бежит не туда.
 * Гибель — обмякшее тело летит кувырком (Avatar.limp), подпрыгивает и остаётся лежать.
 */

const NICKS = ['Kirill_2014', 'pro_nastya', 'DimkaYT', 'SuperMax777', 'Lizka_kitty', 'Noob_Master', 'TimurPlay', 'sonya.bloxy', 'Artem_GG', 'xX_Egor_Xx', 'Vika_cute', 'MegaBuilder'];
const THINK = 0.2;          // мозг, с
const JUMP_UP = 2.3;        // на сколько бот запрыгивает (прыжок 13 м/с даёт ~2,5 м)
const BURN = 0.4;           // столько в огне/под током — и сгорел
const SAFE_FROM_MOBS = 2.05; // выше — бегающие не достают (CLIMB_MAX в creatures.ts)

export interface Spot { x: number; z: number; h: number; sx: number; sz: number }
interface MobView { live: boolean; phase: string; kind: string; x: number; y: number; z: number; tx: number; tz: number }

export interface ArenaBotHooks {
  heightAt(x: number, z: number): number;
  cell(x: number, z: number): Cell;
  lava(): number;
  /** Игровое время раунда, с. */
  time(): number;
  mobs(): readonly MobView[];
  /** Верхушки твёрдых построек расстановки: куда лезть. */
  spots(): readonly Spot[];
  /** Бот погиб — игре для звука/эффекта. */
  died?(x: number, y: number, z: number): void;
}

class ArenaBot {
  readonly avatar: Avatar;
  readonly ctl: Controller;
  readonly tag: THREE.Sprite;
  alive = true;
  /** Укушен зомби — исчез (на его месте встал зомби). */
  gone = false;
  private think = Math.random() * THINK;
  private dir = new THREE.Vector3(0, 0, 1);
  private moving = false;
  private jump = false;
  private burnT = 0;
  private panicT = 0;
  /** Ловкость 0..1: задержка реакции и шанс паники. */
  private skill = 0.35 + Math.random() * 0.55;
  private noticeT = 0;
  // гибель кувырком
  private rv = new THREE.Vector3();
  private spin = new THREE.Vector3();
  private lying = false;

  constructor(scene: THREE.Scene, physics: Physics, i: number, nick: string) {
    this.avatar = new Avatar(SKINS[(i + 1) % SKINS.length].look, true);
    scene.add(this.avatar.root);
    this.ctl = new Controller(this.avatar, (p, v, dt) => physics.move(p, v, dt));
    this.tag = nameTag(nick);
    this.avatar.root.add(this.tag);
  }

  reset(x: number, z: number): void {
    this.alive = true; this.gone = false; this.lying = false;
    this.burnT = 0; this.panicT = 0; this.noticeT = 0; this.moving = false;
    this.skill = 0.35 + Math.random() * 0.55;
    const r = this.avatar.root;
    r.visible = true; r.rotation.set(0, 0, 0);
    (this.tag.material as THREE.SpriteMaterial).opacity = 1;
    this.ctl.setSpawn(new THREE.Vector3(x, 0.01, z), Math.atan2(-x, -z));
    this.ctl.respawn();
    this.ctl.grip = 1; this.ctl.speedMul = 1;
  }

  get pos(): THREE.Vector3 { return this.alive ? this.ctl.pos : this.avatar.root.position; }

  /** Гибель: летит от источника (dx, dz), power — сила (взрыв сильнее касания). */
  kill(dx: number, dz: number, power: number): void {
    if (!this.alive) return;
    this.alive = false;
    const l = Math.hypot(dx, dz) || 1;
    this.rv.set((dx / l) * 5 * power, 7 + 5 * power, (dz / l) * 5 * power);
    this.spin.set((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 14);
    (this.tag.material as THREE.SpriteMaterial).opacity = 0.35;
  }

  /** Исчезнуть (укушен зомби / утонул в лаве). */
  vanish(): void { this.alive = false; this.gone = true; this.avatar.root.visible = false; }

  update(dt: number, h: ArenaBotHooks): void {
    if (this.gone) return;
    if (!this.alive) { this.fly(dt, h); return; }
    this.think -= dt;
    if (this.think <= 0) { this.think = THINK; this.plan(h); }
    const p = this.ctl.pos;
    // земля под ногами: лёд скользит, слизь вязнет, огонь и ток жгут
    const low = this.ctl.grounded && p.y < GROUND_Y;
    const c = low ? h.cell(p.x, p.z) : Cell.None;
    this.ctl.grip = c === Cell.Ice ? 0.08 : 1;
    this.ctl.speedMul = c === Cell.Slime ? 0.45 : 1;
    this.burnT = c === Cell.Fire || c === Cell.Shock ? this.burnT + dt : 0;
    if (this.burnT > BURN) { this.kill(Math.random() - 0.5, Math.random() - 0.5, 0.6); h.died?.(p.x, p.y, p.z); return; }
    this.ctl.update(dt, { x: 0, y: this.moving ? 1 : 0 }, this.jump, this.dir);
    this.jump = false;
    if (h.lava() > p.y + 0.1) { this.vanish(); h.died?.(p.x, p.y, p.z); }
  }

  /** Решение раз в THINK: куда бежать и прыгать ли. */
  private plan(h: ArenaBotHooks): void {
    const p = this.ctl.pos, t = h.time();
    let fx = 0, fz = 0, threat = 0, runnerNear = false;
    for (const m of h.mobs()) {
      if (!m.live) continue;
      const fall = m.phase === 'fall';
      const tx = fall ? m.tx : m.x, tz = fall ? m.tz : m.z;
      let dx = p.x - tx, dz = p.z - tz;
      if (dx * dx + dz * dz < 1e-3) { dx = 0.1; dz = 0.07; }
      const d2 = dx * dx + dz * dz;
      const R = fall ? 4.5 : m.kind === 'tornado' ? 9 : m.kind === 'ufo' ? 6 : 8;
      if (d2 > R * R) continue;
      // существо ниже, а мы на высоком месте — оно не достанет, не дёргаемся
      if (!fall && m.kind !== 'tornado' && m.kind !== 'ufo' && p.y > SAFE_FROM_MOBS && m.y < p.y - 1) continue;
      const k = (fall ? 2 : t > 44 ? 0.3 : 1) / d2;
      fx += dx * k; fz += dz * k; threat += k;
      if (!fall && d2 < 49) runnerNear = true;
    }
    // замечаем опасность не сразу: чем ниже ловкость, тем дольше «тупит»
    if (threat > 0.02) this.noticeT += THINK; else this.noticeT = 0;
    const noticed = this.noticeT >= (1 - this.skill) * 0.8;
    if (!noticed) { fx = 0; fz = 0; }
    // огонь и ток рядом — обходим
    for (const [ox, oz] of [[2, 0], [-2, 0], [0, 2], [0, -2]]) {
      const c = h.cell(p.x + ox, p.z + oz);
      if (c === Cell.Fire || c === Cell.Shock) { fx -= ox * 0.12; fz -= oz * 0.12; }
    }
    const E = 25;
    if (p.x > E) fx -= 0.4; if (p.x < -E) fx += 0.4; if (p.z > E) fz -= 0.4; if (p.z < -E) fz += 0.4;

    // куда лезть: от лавы — по графику ступеней, от бегающих — выше 2 м
    const lavaNeed = t > 53 ? 2.6 : t > 47 ? 1.6 : t > 40 ? 0.6 : 0;
    const need = Math.max(lavaNeed, runnerNear && noticed ? SAFE_FROM_MOBS + 0.1 : 0);
    const ground = h.heightAt(p.x, p.z);
    if (need > 0 && ground < need - 0.1) {
      const g = this.climbTarget(h, p, need);
      if (g) {
        const gx = g.x - p.x, gz = g.z - p.z, gl = Math.hypot(gx, gz) || 1;
        const pull = lavaNeed > 0 ? 1.2 : 0.6;
        fx += (gx / gl) * pull * Math.max(0.3, threat * 4 + 0.3); fz += (gz / gl) * pull * Math.max(0.3, threat * 4 + 0.3);
      }
    } else if (need > 0) {
      // уже высоко — не слезаем: держимся середины площадки, уворачиваемся только от меток падения
      const top = h.spots().find((s) => Math.abs(p.x - s.x) < s.sx && Math.abs(p.z - s.z) < s.sz && Math.abs(s.h - ground) < 0.2);
      if (top) { fx = fx * 0.25 + (top.x - p.x) * 0.15; fz = fz * 0.25 + (top.z - p.z) * 0.15; }
    } else if (threat === 0 && Math.random() < 0.15) {
      // тихо — бродим по острову
      const a = Math.random() * 6.28; fx = Math.cos(a) * 0.3; fz = Math.sin(a) * 0.3;
      if (Math.random() < 0.3) { this.moving = false; return; }
    }
    // паника: неловкий иногда бежит не туда
    if (this.panicT > 0) this.panicT -= THINK;
    else if (noticed && threat > 0.05 && Math.random() < (1 - this.skill) * 0.08) this.panicT = 0.8 + Math.random();
    if (this.panicT > 0) { const a = Math.atan2(fz, fx) + (Math.random() - 0.5) * 3; fx = Math.cos(a); fz = Math.sin(a); }

    const len = Math.hypot(fx, fz);
    this.moving = len > 0.03;
    if (this.moving) this.dir.set(fx / len, 0, fz / len);
    // страховка от края: забрался достаточно высоко — не шагаем туда, где ниже нужного (иначе метеор «сдувал» в лаву)
    if (this.moving && need > 0 && ground >= need - 0.1) {
      const ex = p.x + this.dir.x * 1.1, ez = p.z + this.dir.z * 1.1;
      if (h.heightAt(ex, ez) < Math.min(ground, need) - 0.2) this.moving = false;
    }
    // уступ впереди, на который можно запрыгнуть, — прыжок
    const ax = p.x + this.dir.x * 1.3, az = p.z + this.dir.z * 1.3, ah = h.heightAt(ax, az);
    if (this.moving && ah > p.y + 0.3 && ah <= p.y + JUMP_UP && this.ctl.grounded) this.jump = true;
  }

  /** Куда идти, чтобы оказаться на высоте need: само место или промежуточная ступенька по пути. */
  private climbTarget(h: ArenaBotHooks, p: THREE.Vector3, need: number): Spot | null {
    const spots = h.spots();
    let best: Spot | null = null, bd = Infinity;
    for (const s of spots) {
      if (s.h < need || Math.max(s.sx, s.sz) < 0.9) continue;
      const d = Math.hypot(s.x - p.x, s.z - p.z) + (s.h - need) * 1.5;
      if (d < bd) { bd = d; best = s; }
    }
    if (!best) return null;
    // слишком высоко для одного прыжка — ищем ближайшую к цели ступеньку, на которую можно запрыгнуть сейчас
    const y = h.heightAt(p.x, p.z);
    if (best.h - y <= JUMP_UP) return best;
    let step: Spot | null = null, sd = Infinity;
    for (const s of spots) {
      if (s.h <= y + 0.3 || s.h > y + JUMP_UP) continue;
      const d = Math.hypot(s.x - best.x, s.z - best.z) + Math.hypot(s.x - p.x, s.z - p.z) * 0.5;
      if (d < sd) { sd = d; step = s; }
    }
    return step ?? best;
  }

  /** Полёт кувырком после гибели, отскок от земли и лежание. */
  private fly(dt: number, h: ArenaBotHooks): void {
    const r = this.avatar.root;
    if (this.lying) {
      if (h.lava() > r.position.y - 0.2) r.visible = false;   // утонул в лаве
      this.avatar.limp(dt, 0);
      return;
    }
    this.rv.y -= 30 * dt;
    r.position.addScaledVector(this.rv, dt);
    r.rotation.x += this.spin.x * dt; r.rotation.y += this.spin.y * dt; r.rotation.z += this.spin.z * dt;
    const g = h.heightAt(r.position.x, r.position.z) + 0.3;
    if (r.position.y < g && this.rv.y < 0) {   // только на снижении: иначе в момент гибели сразу «отскакивал» вниз
      r.position.y = g;
      this.rv.y = -this.rv.y * 0.35; this.rv.x *= 0.55; this.rv.z *= 0.55; this.spin.multiplyScalar(0.5);
      if (Math.abs(this.rv.y) < 1.5) { this.lying = true; r.rotation.set(-Math.PI / 2, r.rotation.y, 0); r.position.y = g - 0.05; }
    }
    this.avatar.limp(dt, Math.min(1, this.rv.length() / 8));
  }
}

export class ArenaBots {
  readonly list: ArenaBot[] = [];

  constructor(scene: THREE.Scene, physics: Physics, count: number, private h: ArenaBotHooks) {
    const nicks = [...NICKS].sort(() => Math.random() - 0.5);
    for (let i = 0; i < count; i++) this.list.push(new ArenaBot(scene, physics, i, nicks[i]));
  }

  reset(spawns: [number, number][]): void { this.list.forEach((b, i) => b.reset(...spawns[i % spawns.length])); }

  update(dt: number): void { for (const b of this.list) b.update(dt, this.h); }

  get alive(): number { return this.list.filter((b) => b.alive).length; }

  /**
   * Задеть ботов в радиусе: гибнут (летят от точки удара), а укушенные зомби исчезают.
   * Вернёт места укушенных — там встают зомби.
   */
  hit(x: number, y: number, z: number, r: number, infect: boolean, power = 1): [number, number][] {
    const out: [number, number][] = [];
    for (const b of this.list) {
      if (!b.alive) continue;
      const p = b.pos;
      if ((p.x - x) ** 2 + (p.z - z) ** 2 >= r * r || Math.abs(p.y - y) >= 2.2) continue;
      if (infect) { b.vanish(); out.push([p.x, p.z]); } else { b.kill(p.x - x, p.z - z, power); this.h.died?.(p.x, p.y, p.z); }
    }
    return out;
  }
}

/** Ник над головой: спрайт всегда смотрит в камеру. */
function nameTag(nick: string): THREE.Sprite {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 64;
  const g = c.getContext('2d')!;
  const fs = Math.min(34, 34 * 236 / Math.max(1, (g.font = 'bold 34px Arial, sans-serif', g.measureText(nick).width)));
  g.font = `bold ${fs}px Arial, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.lineJoin = 'round'; g.miterLimit = 2;
  g.lineWidth = 7; g.strokeStyle = 'rgba(0,0,0,.65)'; g.strokeText(nick, 128, 34);
  g.fillStyle = '#ffffff'; g.fillText(nick, 128, 34);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: false, transparent: true }));
  s.scale.set(2.4, 0.6, 1);
  s.position.y = 3.35;
  s.renderOrder = 10;
  return s;
}
