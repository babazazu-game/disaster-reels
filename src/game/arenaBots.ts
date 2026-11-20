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
/*
 * Ники соперников — НОВЫЕ каждый раунд (заказчик: одни и те же имена выдают, что это не живые игроки).
 * Склеиваем из имени/слова и «украшений», как пишут дети в Роблоксе; плюс готовые ники выше.
 */
const NAMES = ['Kirill', 'Nastya', 'Dimka', 'Max', 'Liza', 'Timur', 'Sonya', 'Artem', 'Egor', 'Vika', 'Misha', 'Polina', 'Danya', 'Sasha',
  'Katya', 'Vanya', 'Alisa', 'Matvey', 'Arina', 'Lev', 'Mila', 'Gleb', 'Yana', 'Roma', 'Dasha', 'Fedya', 'Kira', 'Sema', 'Ulya', 'Nikita',
  'Tema', 'Lera', 'Ilya', 'Vera', 'Mark', 'Eva', 'Zhenya', 'Tasya', 'Bogdan', 'Masha'];
const WORDS = ['Shadow', 'Ninja', 'Pixel', 'Blox', 'Turbo', 'Lucky', 'Crazy', 'Speedy', 'Gamer', 'Builder', 'Cookie', 'Panda', 'Foxy', 'Bunny',
  'Dragon', 'Rocket', 'Storm', 'Frosty', 'Sunny', 'Zombie', 'Kitty', 'Banana', 'Taco', 'Noob', 'Boss', 'Legend', 'Cheese', 'Mango'];
const pickOf = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
const num = () => pickOf(['', String(Math.floor(Math.random() * 99) + 1), String(2008 + Math.floor(Math.random() * 11)), '777', '228', '1337', '_' + (Math.floor(Math.random() * 9) + 1)]);
function makeNick(): string {
  const n = pickOf(NAMES), w = pickOf(WORDS);
  const v = Math.random();
  const nick = v < 0.12 ? pickOf(NICKS)
    : v < 0.3 ? `${n}_${w}${num()}`
    : v < 0.45 ? `${w}${pickOf(WORDS)}${num()}`
    : v < 0.55 ? `xX_${n}_Xx`
    : v < 0.65 ? `${n.toLowerCase()}.${w.toLowerCase()}`
    : v < 0.75 ? `pro_${n.toLowerCase()}${num()}`
    : v < 0.85 ? `${n}${pickOf(['YT', 'Play', '_GG', 'TV', 'Top', '_cool'])}`
    : `${n}${num() || '_' + (Math.floor(Math.random() * 90) + 10)}`;
  return nick.slice(0, 16);
}
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
  /** Пыль от прыжка/приземления бота (scale ~ сила). */
  puff?(x: number, y: number, z: number, scale: number): void;
  /** Бот погиб — игре для звука/эффекта. */
  died?(x: number, y: number, z: number): void;
  /** Где игрок (ноги) или null, если он не в игре: соперники иногда бегут к нему, как живые. */
  player?(): THREE.Vector3 | null;
}

/** Радиус «тела» для толкания, м (плечи — около метра в ширину). */
const PUSH_R = 0.5;
/** Какую долю расталкивания берёт на себя игрок: он «тяжелее» — соперник не столкнёт его в лаву одним касанием. */
const PLAYER_SHARE = 0.3;

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
  /** Куда бежит, пока тихо (заказчик: «пусть ведут себя активнее — бегают, прыгают»). */
  private wx = 0;
  private wz = 0;
  private wanderT = 0;
  private idleT = 0;
  /** Попрыгунчик: как часто прыгает просто так (дети в Роблоксе жмут прыжок без конца). */
  private hoppy = 0.06 + Math.random() * 0.14;
  // гибель кувырком
  private rv = new THREE.Vector3();
  private spin = new THREE.Vector3();
  private lying = false;

  constructor(scene: THREE.Scene, physics: Physics, i: number, nick: string, h: ArenaBotHooks) {
    this.avatar = new Avatar(SKINS[(i + 1) % SKINS.length].look, true);
    scene.add(this.avatar.root);
    this.ctl = new Controller(this.avatar, (p, v, dt) => physics.move(p, v, dt));
    this.tag = nameTag(nick);
    this.avatar.root.add(this.tag);
    this.ctl.onJump = () => h.puff?.(this.ctl.pos.x, this.ctl.pos.y, this.ctl.pos.z, 0.35);
    this.ctl.onLand = (v) => { if (v > 7) h.puff?.(this.ctl.pos.x, this.ctl.pos.y, this.ctl.pos.z, Math.min(1, v / 16)); };
  }

  reset(x: number, z: number): void {
    this.alive = true; this.gone = false; this.lying = false;
    this.burnT = 0; this.panicT = 0; this.noticeT = 0; this.moving = false;
    this.skill = 0.35 + Math.random() * 0.55;
    this.hoppy = 0.06 + Math.random() * 0.14;
    this.wanderT = 0; this.idleT = 0;
    const r = this.avatar.root;
    r.visible = true; r.rotation.set(0, 0, 0);
    (this.tag.material as THREE.SpriteMaterial).opacity = 1;
    this.ctl.setSpawn(new THREE.Vector3(x, 0.01, z), Math.atan2(-x, -z));
    this.ctl.respawn();
    this.ctl.grip = 1; this.ctl.speedMul = 1;
  }

  /** Сменить ник над головой: перерисовать текстуру таблички. */
  setNick(nick: string): void {
    const m = this.tag.material as THREE.SpriteMaterial;
    const old = m.map;
    m.map = nameTexture(nick);
    m.needsUpdate = true;
    old?.dispose();
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
    } else if (threat === 0) {
      // тихо — не стоим столбом: бегаем по острову к своей цели, иногда к игроку, иногда на горку
      this.wanderT -= THINK;
      if (this.idleT > 0) { this.idleT -= THINK; this.moving = false; return; }
      if (this.wanderT <= 0 || Math.hypot(this.wx - p.x, this.wz - p.z) < 1.2) this.pickWander(h, p);
      const wx = this.wx - p.x, wz = this.wz - p.z, wl = Math.hypot(wx, wz) || 1;
      fx = wx / wl; fz = wz / wl;
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
    if (this.moving && this.ctl.grounded && !this.jump) {
      // бегающий прямо по курсу — перепрыгнуть; а просто так прыгают все, в опасности — чаще
      for (const m of h.mobs()) {
        if (!m.live || m.phase === 'fall' || m.kind === 'tornado' || m.kind === 'ufo' || Math.abs(m.y - p.y) > 1.5) continue;
        const dx = m.x - p.x, dz = m.z - p.z, d = Math.hypot(dx, dz);
        if (d < 2.6 && (dx * this.dir.x + dz * this.dir.z) / (d || 1) > 0.5) { this.jump = true; break; }
      }
      if (!this.jump && Math.random() < this.hoppy * (threat > 0 ? 1.6 : 1)) this.jump = true;
    }
  }

  /** Новая цель прогулки: к игроку (живые тоже толпятся рядом), на постройку повыше или просто в другой конец острова. */
  private pickWander(h: ArenaBotHooks, p: THREE.Vector3): void {
    this.wanderT = 2 + Math.random() * 3.5;
    if (Math.random() < 0.12) { this.idleT = 0.4 + Math.random() * 1.2; }   // постоять, покрутить головой — но недолго
    const pl = h.player?.();
    const r = Math.random();
    if (pl && r < 0.3) {
      const a = Math.random() * 6.28, d = 1.5 + Math.random() * 4;
      this.wx = pl.x + Math.cos(a) * d; this.wz = pl.z + Math.sin(a) * d;
      return;
    }
    if (r < 0.55) {
      // на постройку, куда можно запрыгнуть с места
      const y = h.heightAt(p.x, p.z);
      const ok = h.spots().filter((s) => s.h > y + 0.3 && s.h <= y + JUMP_UP && Math.max(s.sx, s.sz) >= 0.9 && Math.hypot(s.x - p.x, s.z - p.z) < 18);
      if (ok.length) { const s = pickOf(ok); this.wx = s.x; this.wz = s.z; return; }
    }
    const a = Math.random() * 6.28, d = 4 + Math.random() * 12;
    this.wx = THREE.MathUtils.clamp(p.x + Math.cos(a) * d, -21, 21);
    this.wz = THREE.MathUtils.clamp(p.z + Math.sin(a) * d, -21, 21);
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

  private readonly step = new THREE.Vector3();

  constructor(scene: THREE.Scene, private physics: Physics, count: number, private h: ArenaBotHooks) {
    for (let i = 0; i < count; i++) this.list.push(new ArenaBot(scene, physics, i, makeNick(), h));
  }

  reset(spawns: [number, number][]): void {
    // каждый раунд — новые неповторяющиеся ники
    const used = new Set<string>();
    this.list.forEach((b, i) => {
      let n = makeNick();
      for (let k = 0; k < 10 && used.has(n); k++) n = makeNick();
      used.add(n);
      b.setNick(n);
      b.reset(...spawns[i % spawns.length]);
    });
  }

  /** player — контроллер игрока, пока он в игре (с ним тоже толкаемся), иначе null. */
  update(dt: number, player: Controller | null = null, cam?: THREE.Vector3): void {
    for (const b of this.list) b.update(dt, this.h);
    this.shove(player, dt);
    // Соперник вплотную к камере закрывал полэкрана, а его ник становился огромным — прячем, пока он там
    if (cam) for (const b of this.list) {
      if (b.gone) continue;
      const p = b.pos;
      const d = Math.hypot(p.x - cam.x, p.y + 1.2 - cam.y, p.z - cam.z);
      b.avatar.root.visible = d > 3.2 && this.h.lava() <= p.y - 0.2;   // и утонувший в лаве не всплывает
      // ник вблизи не раздувается: ближе 9 м уменьшаем его вместе с расстоянием — на экране он держит один размер
      const k = Math.min(1, d / 9);
      b.tag.scale.set(2.4 * k, 0.6 * k, 1);
    }
  }

  /**
   * Толкание (заказчик: «не проходили друг в друга, а толкались»): тела — вертикальные цилиндры радиусом PUSH_R.
   * Перекрылись — расходятся на перекрытие (сдвиг идёт через физику: сквозь стену не вытолкнет) и получают
   * лёгкий толчок скоростью. На разной высоте (один на ящике, другой внизу) не толкаются.
   */
  private shove(player: Controller | null, dt: number): void {
    const who: { c: Controller; share: number }[] = [];
    if (player) who.push({ c: player, share: PLAYER_SHARE });
    for (const b of this.list) if (b.alive) who.push({ c: b.ctl, share: 1 });
    const R2 = PUSH_R * 2, kick = Math.min(1, dt * 60) * 1.2;
    for (let i = 0; i < who.length; i++) for (let j = i + 1; j < who.length; j++) {
      const a = who[i], b = who[j];
      if (Math.abs(a.c.pos.y - b.c.pos.y) > 1.6) continue;
      const dx = b.c.pos.x - a.c.pos.x, dz = b.c.pos.z - a.c.pos.z;
      const d = Math.hypot(dx, dz);
      if (d >= R2) continue;
      const nx = d > 1e-4 ? dx / d : Math.random() - 0.5, nz = d > 1e-4 ? dz / d : Math.random() - 0.5;
      const over = R2 - d, sum = a.share + b.share;
      this.push(a.c, -nx, -nz, (over * a.share) / sum, (kick * a.share) / sum * 2);
      this.push(b.c, nx, nz, (over * b.share) / sum, (kick * b.share) / sum * 2);
    }
  }

  private push(c: Controller, nx: number, nz: number, dist: number, kick: number): void {
    this.step.set(nx * dist, 0, nz * dist);
    this.physics.move(c.pos, this.step, 1);
    c.vel.x += nx * kick; c.vel.z += nz * kick;
  }

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
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: nameTexture(nick), depthTest: false, transparent: true }));
  s.scale.set(2.4, 0.6, 1);
  s.position.y = 3.8;   // выше шляпы волшебника и банана
  s.renderOrder = 10;
  return s;
}

function nameTexture(nick: string): THREE.CanvasTexture {
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
  return t;
}
