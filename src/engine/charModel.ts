import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/**
 * Персонаж из Blender (art/chars/build.py → assets/chars/<id>.glb) → данные для Avatar.
 *
 * Как и у старого аватара, весь персонаж — ОДИН SkinnedMesh: цвет детали уходит в цвет вершин,
 * лицо — в атлас (слева лицо, справа белое поле для остальных деталей), каждая вершина — к своей кости.
 * Один вызов отрисовки на персонажа, анимация прежняя (Avatar крутит те же кости).
 * Прозрачное стекло (шлем космонавта) отдельным мешем на кости головы: в общий непрозрачный не склеить.
 */

/** Порядок костей = порядок в скелете Avatar (skinIndex указывает сюда). */
export const BONES = ['body', 'torso', 'legL', 'legR', 'armL', 'armR', 'head'] as const;
export type BoneName = typeof BONES[number];

export interface CharModel {
  id: string;
  /** Геометрия в позе привязки (координаты мира, персонаж в начале координат). */
  geo: THREE.BufferGeometry;
  mat: THREE.Material;
  /** Мировые положения шарниров. */
  pivots: Record<BoneName, THREE.Vector3>;
  /** Отдельные прозрачные меши: геометрия уже в координатах своей кости. */
  extras: { bone: BoneName; geo: THREE.BufferGeometry; mat: THREE.Material }[];
}

const cache = new Map<string, Promise<CharModel>>();
const loader = new GLTFLoader();

function loadImage(url: string): Promise<HTMLImageElement | null> {
  return new Promise((res) => {
    const im = new Image();
    im.onload = () => res(im);
    im.onerror = () => res(null);   // нет лица — белое поле, но персонаж всё равно есть
    im.src = url;
  });
}

export function loadChar(id: string): Promise<CharModel> {
  let p = cache.get(id);
  if (!p) {
    p = build(id);
    cache.set(id, p);
    p.catch(() => cache.delete(id));   // сеть моргнула — следующий вызов попробует снова
  }
  return p;
}

async function build(id: string): Promise<CharModel> {
  const [gltf, face] = await Promise.all([
    loader.loadAsync(`./assets/chars/${id}.glb?v=${__BUILD__}`),
    loadImage(`./assets/chars/faces/${id}.webp?v=${__BUILD__}`),
  ]);
  const scene = gltf.scene;
  scene.updateMatrixWorld(true);

  const pivots = {} as Record<BoneName, THREE.Vector3>;
  pivots.body = new THREE.Vector3();
  scene.traverse((o) => {
    const m = /^pv_(\w+)$/.exec(o.name);
    if (m && (BONES as readonly string[]).includes(m[1])) pivots[m[1] as BoneName] = o.getWorldPosition(new THREE.Vector3());
  });
  for (const b of BONES) if (!pivots[b]) throw new Error(`${id}: нет шарнира ${b}`);

  const parts: THREE.BufferGeometry[] = [];
  const extras: CharModel['extras'] = [];
  const col = new THREE.Color();
  scene.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    // extras узла glTF попадают в userData; у многоматериальных узлов — у родителя
    const boneName = (mesh.userData.bone ?? mesh.parent?.userData.bone ?? 'torso') as BoneName;
    const bi = Math.max(0, BONES.indexOf(boneName));
    const src = mesh.material as THREE.MeshStandardMaterial;
    const g = (mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone()).applyMatrix4(mesh.matrixWorld);
    if (src.name === 'glass') {
      for (const k of Object.keys(g.attributes)) if (k !== 'position' && k !== 'normal') g.deleteAttribute(k);
      g.translate(-pivots[boneName].x, -pivots[boneName].y, -pivots[boneName].z);
      extras.push({ bone: boneName, geo: g, mat: new THREE.MeshStandardMaterial({ color: src.color, transparent: true, opacity: 0.3, roughness: 0.05, depthWrite: false }) });
      return;
    }
    const isFace = src.name.startsWith('face');
    const n = g.attributes.position.count;
    const c = new Float32Array(n * 3), uv = new Float32Array(n * 2);
    const si = new Uint16Array(n * 4), sw = new Float32Array(n * 4);
    // лицо — белое (цвет даёт текстура), остальное — цвет материала из Blender
    col.copy(isFace ? new THREE.Color(1, 1, 1) : src.color);
    const fuv = isFace ? g.attributes.uv : null;
    for (let i = 0; i < n; i++) {
      c[i * 3] = col.r; c[i * 3 + 1] = col.g; c[i * 3 + 2] = col.b;
      if (fuv) { uv[i * 2] = fuv.getX(i) * 0.5; uv[i * 2 + 1] = fuv.getY(i); } else { uv[i * 2] = 0.75; uv[i * 2 + 1] = 0.5; }
      si[i * 4] = bi; sw[i * 4] = 1;
    }
    for (const k of Object.keys(g.attributes)) if (k !== 'position' && k !== 'normal') g.deleteAttribute(k);
    g.setAttribute('color', new THREE.BufferAttribute(c, 3));
    g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    g.setAttribute('skinIndex', new THREE.BufferAttribute(si, 4));
    g.setAttribute('skinWeight', new THREE.BufferAttribute(sw, 4));
    parts.push(g);
  });
  const geo = mergeGeometries(parts);
  parts.forEach((g) => g.dispose());
  if (!geo) throw new Error(`${id}: пустая модель`);
  geo.computeBoundingSphere();

  // атлас 512×256: слева лицо, справа белое поле
  const cv = document.createElement('canvas');
  cv.width = 512; cv.height = 256;
  const ctx = cv.getContext('2d')!;
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, 512, 256);
  if (face) ctx.drawImage(face, 0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.flipY = false;   // UV из glTF — от верхнего края, как у текстур GLTFLoader
  tex.anisotropy = 4;
  const mat = new THREE.MeshStandardMaterial({ map: tex, vertexColors: true, roughness: 0.5 });
  return { id, geo, mat, pivots, extras };
}
