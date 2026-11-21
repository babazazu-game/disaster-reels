import * as THREE from 'three';
import { blockMaterial } from './world';
import { occludable } from './occlude';

/**
 * Текстуры карты (заказчик: «хочется красивой игры, а сейчас квадратики»): трава, земля, камень, доски ящиков,
 * кора, листва, дерево заборчика. Картинки нарисовал Codex (art/tex/gen.sh → art/tex/prep.py → assets/tex/*.webp).
 *
 * Как натягиваем: у склеенной арены UV = мировые метры (mergeStatic, worldUV), а масштаб задаёт repeat самой
 * текстуры — рисунок одного размера на плите 16 м и на ступеньке 2 м, ничего не растянуто. Ящики — исключение:
 * у них свои UV граней, на каждой грани целый ящик с рамкой.
 *
 * Цвет: материал умножает текстуру на «оттенок» = цвет палитры / средний цвет картинки. Так палитра арены
 * остаётся прежней (тёмный камень — та же текстура камня, только темнее), а текстура добавляет рисунок.
 * Нет картинки (сеть, старый кэш) — блок остаётся гладким цветным, как раньше: игра от текстур не зависит.
 */
export const TEX_NAMES = ['grass', 'dirt', 'stone', 'planks', 'bark', 'leaves', 'wood', 'sand', 'sandstone', 'palmbark', 'palmleaf', 'cactus'] as const;
export type TexName = typeof TEX_NAMES[number];

/** Метров на один повтор рисунка. planks — 1: у ящиков UV граней 0..1, одна грань = одна картинка. */
const TILE: Record<TexName, number> = { grass: 4, dirt: 3, stone: 2.5, planks: 1, bark: 1.5, leaves: 2, wood: 1.2, sand: 5, sandstone: 3, palmbark: 1.2, palmleaf: 1.6, cactus: 1.2 };

interface Loaded { tex: THREE.Texture; mean: THREE.Color }

function load(name: TexName, anisotropy: number): Promise<Loaded | null> {
  return new Promise((res) => {
    const im = new Image();
    im.onload = () => {
      // средний цвет картинки — по уменьшенной копии 16×16
      const c = document.createElement('canvas');
      c.width = c.height = 16;
      const g = c.getContext('2d')!;
      g.drawImage(im, 0, 0, 16, 16);
      const d = g.getImageData(0, 0, 16, 16).data;
      let r = 0, gg = 0, b = 0;
      for (let i = 0; i < d.length; i += 4) { r += d[i]; gg += d[i + 1]; b += d[i + 2]; }
      const n = d.length / 4;
      const mean = new THREE.Color().setRGB(r / n / 255, gg / n / 255, b / n / 255, THREE.SRGBColorSpace);
      const tex = new THREE.Texture(im);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.setScalar(1 / TILE[name]);
      tex.anisotropy = anisotropy;
      tex.needsUpdate = true;
      res({ tex, mean });
    };
    im.onerror = () => res(null);
    im.src = `./assets/tex/${name}.webp?v=${__BUILD__}`;
  });
}

/**
 * Загрузить текстуры и надеть их на материалы блоков. `use` — какой цвет палитры какой текстурой покрыть.
 * Звать до первого кадра раунда: материал с картой пересобирается один раз.
 */
export async function applyMapTextures(use: Record<number, TexName>, anisotropy = 4): Promise<void> {
  const need = [...new Set(Object.values(use))];
  const got = new Map<TexName, Loaded>();
  await Promise.all(need.map(async (n) => { const l = await load(n, anisotropy); if (l) got.set(n, l); }));
  for (const [hex, name] of Object.entries(use)) {
    const l = got.get(name);
    if (!l) continue;
    const color = Number(hex);
    const target = new THREE.Color(color);
    // оттенок в линейном пространстве (так считает шейдер); не темнее 0,2 — иначе чёрное пятно от яркой картинки
    const tint = new THREE.Color(
      Math.max(0.2, target.r / Math.max(0.02, l.mean.r)),
      Math.max(0.2, target.g / Math.max(0.02, l.mean.g)),
      Math.max(0.2, target.b / Math.max(0.02, l.mean.b)),
    );
    const src = blockMaterial(color);
    // и сам материал, и его копия с «ситом» прозрачности (occlude.ts) — у раскладки арены стоит копия
    for (const m of [src, occludable(src)] as THREE.MeshStandardMaterial[]) {
      m.map = l.tex;
      m.color.copy(tint);
      m.roughness = 0.6;   // пластик с рисунком бликует меньше — иначе текстура «пересвечена» на солнце
      m.needsUpdate = true;
    }
  }
}
