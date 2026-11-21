import * as THREE from 'three';

/**
 * Гроза над тем, кто отсиживается (заказчик: «забрался на гору — и сижу всю игру»).
 *
 * Простое правило, понятное ребёнку: стоишь долго на одном месте — над тобой собирается туча и бьёт молния.
 * Работает везде — на башне, холме, ящике, просто в углу, — поэтому укрытие перестаёт быть «местом на весь раунд»:
 * сидеть можно, но придётся то и дело уворачиваться.
 *
 *   idle   — считаем, сколько игрок стоит в круге CAMP_R вокруг точки «лагеря»; ушёл из круга — счёт заново;
 *   gather — туча собирается над игроком и ползёт за ним медленнее бега (убежал — отстала), по земле тень;
 *   lock   — туча замерла, под ней мигает жёлтый круг: последние доли секунды, чтобы отпрыгнуть;
 *   flash  — молния в центр круга (урон и поджог решает игра в hooks.strike), туча тает.
 * Остался сидеть в том же месте — следующая туча придёт быстрее (REPEAT), а не через полный срок.
 */
export interface StormHooks {
  /** Верх опоры с кронами деревьев: молния бьёт в крону, а не в землю под ней. */
  impactAt(x: number, z: number): number;
  /** Туча начала собираться (надпись, гром вдали). */
  gather(x: number, z: number): void;
  /** Удар молнии в точку (x, y, z) радиусом r. */
  strike(x: number, y: number, z: number, r: number): void;
  /** Игрок сидит на возвышении (башня, вершина холма) и лава не поднимается — «насест». */
  perched?(): boolean;
}

/** Радиус «лагеря», м: переминаться внутри него — всё ещё отсиживаться. */
const CAMP_R = 3.5;
/** На насесте (башня с флажком, вершина холма) лагерь — вся площадка, туча быстрее, удар шире: стоять там и
 *  переминаться — больше не способ пройти раунд (заказчик 21.11: «гора с флажком — имба»). */
const PERCH_CAMP_R = 7, PERCH_DELAY = 0.55, PERCH_R = 3.1, PERCH_REPEAT = 2;
/** Повторная туча над тем же местом, с. */
const REPEAT = 3.5;
/** Фазы, с. */
const GATHER = 2.2, LOCK = 0.9, FLASH = 0.6;
/** Радиус удара, м: с площадки 5×5 увернуться можно, с ящика 2×2 — только спрыгнуть. */
export const STORM_R = 1.8;
/** Скорость тучи, м/с — медленнее бега игрока (~7): убежал — не догонит. */
const FOLLOW = 3;
/** Высота тучи над опорой, м. */
const CLOUD_H = 7.5;

type Phase = 'idle' | 'gather' | 'lock' | 'flash';

export class Storm {
  /** Сколько стоять на месте до тучи, с (зависит от сложности). */
  delay = 7;
  private phase: Phase = 'idle';
  private t = 0;
  private campT = 0;
  private readonly anchor = new THREE.Vector3(0, -999, 0);
  private readonly pos = new THREE.Vector3();
  private ground = 0;
  private readonly cloud = new THREE.Group();
  private readonly cloudMat = new THREE.MeshStandardMaterial({ color: 0x353a48, roughness: 1, flatShading: true, transparent: true, opacity: 0 });
  private readonly ring: THREE.Mesh;
  private readonly ringMat = new THREE.MeshBasicMaterial({ color: 0x20242e, transparent: true, opacity: 0, depthWrite: false });
  private readonly bolt = new THREE.Group();
  private readonly boltMat = new THREE.MeshBasicMaterial({ color: 0xfff6a8 });
  private readonly glowMat = new THREE.MeshBasicMaterial({ color: 0xffe14d, transparent: true, opacity: 0.45, depthWrite: false });

  constructor(scene: THREE.Scene, private readonly h: StormHooks) {
    // туча — несколько угловатых «шаров», как облака мира, только тёмная
    const ball = new THREE.IcosahedronGeometry(1, 1);
    for (const [x, y, z, s] of [[0, 0, 0, 1.5], [1.4, -0.2, 0.3, 1.1], [-1.3, -0.1, -0.2, 1.2], [0.3, 0.5, -0.9, 1.0], [-0.4, -0.3, 1.0, 0.9]]) {
      const m = new THREE.Mesh(ball, this.cloudMat);
      m.position.set(x, y, z);
      m.scale.setScalar(s);
      this.cloud.add(m);
    }
    this.cloud.visible = false;
    scene.add(this.cloud);

    this.ring = new THREE.Mesh(new THREE.RingGeometry(STORM_R * 0.15, STORM_R, 40), this.ringMat);
    this.ring.rotation.x = -Math.PI / 2;
    this.ring.renderOrder = 2;
    this.ring.visible = false;
    scene.add(this.ring);

    // молния — ломаная из 6 звеньев: яркая сердцевина и полупрозрачное свечение вокруг
    const unit = new THREE.BoxGeometry(1, 1, 1);
    for (let i = 0; i < 6; i++) {
      const core = new THREE.Mesh(unit, this.boltMat);
      const glow = new THREE.Mesh(unit, this.glowMat);
      core.add(glow);
      glow.scale.set(3, 3, 1);
      this.bolt.add(core);
    }
    this.bolt.visible = false;
    scene.add(this.bolt);
  }

  /** Для автотеста: фаза и место тучи. */
  info(): { phase: Phase; x: number; z: number } { return { phase: this.phase, x: this.pos.x, z: this.pos.z }; }

  /** Новый раунд: всё убрать, счёт с нуля. */
  reset(): void {
    this.phase = 'idle';
    this.campT = 0;
    this.anchor.set(0, -999, 0);
    this.cloud.visible = this.ring.visible = this.bolt.visible = false;
  }

  /** Раз в кадр, пока идёт раунд. p — позиция игрока (ноги). */
  update(dt: number, p: THREE.Vector3): void {
    this.t += dt;
    if (this.phase === 'idle') {
      const perch = this.h.perched?.() ?? false;
      if (Math.hypot(p.x - this.anchor.x, p.z - this.anchor.z) > (perch ? PERCH_CAMP_R : CAMP_R)) { this.anchor.copy(p); this.campT = 0; }
      else if ((this.campT += dt) >= this.delay * (perch ? PERCH_DELAY : 1)) this.begin(p, perch);
      return;
    }
    if (this.phase === 'gather') {
      // туча ползёт к игроку не быстрее FOLLOW
      const dx = p.x - this.pos.x, dz = p.z - this.pos.z, d = Math.hypot(dx, dz), step = Math.min(d, FOLLOW * dt);
      if (d > 1e-3) { this.pos.x += (dx / d) * step; this.pos.z += (dz / d) * step; }
      this.ground = this.h.impactAt(this.pos.x, this.pos.z);
      const k = Math.min(1, this.t / GATHER);
      this.cloudMat.opacity = 0.95 * k;
      this.ringMat.color.setHex(0x20242e);
      this.ringMat.opacity = 0.35 * k;
      if (this.t >= GATHER) { this.phase = 'lock'; this.t = 0; }
    } else if (this.phase === 'lock') {
      // мигает жёлтым всё чаще — вот-вот ударит
      const blink = Math.sin(this.t * (10 + this.t * 30)) > 0;
      this.ringMat.color.setHex(blink ? 0xffe14d : 0xff9a1a);
      this.ringMat.opacity = 0.75;
      if (this.t >= LOCK) this.fire();
    } else if (this.phase === 'flash') {
      this.bolt.visible = this.t < 0.18 && Math.floor(this.t * 40) % 3 !== 2;   // молния мерцает
      this.cloudMat.opacity = 0.95 * Math.max(0, 1 - this.t / FLASH);
      this.ringMat.opacity = 0.6 * Math.max(0, 1 - this.t / 0.3);
      if (this.t >= FLASH) {
        this.cloud.visible = this.ring.visible = this.bolt.visible = false;
        this.phase = 'idle';
        // остался рядом — следующая туча придёт быстрее; ушёл — idle сам сбросит счёт
        this.campT = Math.max(0, this.delay * (this.perch ? PERCH_DELAY : 1) - (this.perch ? PERCH_REPEAT : REPEAT));
      }
    }
    this.cloud.position.set(this.pos.x, this.ground + CLOUD_H + Math.sin(this.t * 2) * 0.15, this.pos.z);
    this.cloud.rotation.y += dt * 0.3;
    this.ring.position.set(this.pos.x, this.ground + 0.06, this.pos.z);
  }

  private perch = false;
  private begin(p: THREE.Vector3, perch = false): void {
    this.perch = perch;
    this.ring.scale.setScalar(perch ? PERCH_R / STORM_R : 1);
    this.phase = 'gather';
    this.t = 0;
    this.pos.copy(p);
    this.ground = this.h.impactAt(p.x, p.z);
    this.cloud.visible = this.ring.visible = true;
    this.h.gather(p.x, p.z);
  }

  private fire(): void {
    this.phase = 'flash';
    this.t = 0;
    // ломаная от тучи до земли со случайными изломами
    const top = this.ground + CLOUD_H - 0.8, n = this.bolt.children.length;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= n; i++) {
      const k = i / n, j = i === 0 || i === n ? 0 : 0.9;
      pts.push(new THREE.Vector3(this.pos.x + (Math.random() - 0.5) * j, top + (this.ground - top) * k, this.pos.z + (Math.random() - 0.5) * j));
    }
    this.bolt.children.forEach((seg, i) => {
      const a = pts[i], b = pts[i + 1];
      seg.position.copy(a).add(b).multiplyScalar(0.5);
      seg.lookAt(b);
      seg.scale.set(0.16, 0.16, a.distanceTo(b) + 0.1);
    });
    this.bolt.visible = true;
    this.h.strike(this.pos.x, this.ground, this.pos.z, this.perch ? PERCH_R : STORM_R);
  }
}
