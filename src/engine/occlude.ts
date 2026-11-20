import * as THREE from 'three';

/**
 * «Прозрачность» препятствий между камерой и игроком (просьба заказчика: персонаж прячется за
 * ящиками и деревьями). Настоящая прозрачность ломает сортировку и стоит лишних проходов,
 * поэтому делаем «сито»: в трубке вдоль луча камера→игрок часть пикселей отбрасываем по
 * узору Байера — глаз видит блок полупрозрачным, а он остаётся обычным непрозрачным
 * материалом (один проход, тени не меняются: у теней свой материал глубины).
 */
export const occl = {
  player: { value: new THREE.Vector3(0, -999, 0) },
  cam: { value: new THREE.Vector3() },
};
/** Радиус трубки, м, и доля выбитых пикселей (~35% «прозрачности»). */
const R = 1.6, HOLE = 0.5;

const cache = new Map<THREE.Material, THREE.Material>();

/** Копия материала с ситом. Кэш по исходному — блоки одного цвета делят один материал. */
export function occludable(src: THREE.Material): THREE.Material {
  let m = cache.get(src);
  if (m) return m;
  m = src.clone();
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uOccP = occl.player;
    sh.uniforms.uOccC = occl.cam;
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vOccW;')
      .replace('#include <project_vertex>', '#include <project_vertex>\nvOccW = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vOccW;
uniform vec3 uOccP, uOccC;
float occBayer(vec2 p) {
  int x = int(mod(p.x, 4.0)), y = int(mod(p.y, 4.0)), i = x + y * 4;
  int b[16] = int[16](0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5);
  return (float(b[i]) + 0.5) / 16.0;
}`)
      .replace('#include <clipping_planes_fragment>', `#include <clipping_planes_fragment>
{
  vec3 seg = uOccP - uOccC;
  float L = length(seg);
  float s = dot(vOccW - uOccC, seg / L);
  // только то, что ближе к камере, чем игрок (минус 0,8 м — пол под ногами не трогаем)
  if (s > 0.0 && s < L - 0.8) {
    float d = distance(vOccW, uOccC + seg / L * s);
    float k = ${HOLE.toFixed(2)} * smoothstep(${R.toFixed(2)}, ${(R * 0.55).toFixed(2)}, d);
    if (occBayer(gl_FragCoord.xy) < k) discard;
  }
}`);
  };
  m.customProgramCacheKey = () => 'occl';
  cache.set(src, m);
  return m;
}

/** Каждый кадр: центр игрока (грудь) и позиция камеры. */
export function setOccluder(player: THREE.Vector3Like, cam: THREE.Vector3Like): void {
  occl.player.value.set(player.x, player.y + 1.0, player.z);
  occl.cam.value.set(cam.x, cam.y, cam.z);
}
