import * as THREE from 'three';

/**
 * Уровни качества — главный ответ на жалобу «Blox Obby тормозит на встроенной графике».
 *
 * Там всё было включено всегда: полный DPR экрана, сглаживание, тени PCF от каждой
 * детали каждого аватара. Здесь цена кадра задаётся уровнем:
 *   0 low  — DPR 1, без теней;
 *   1 med  — DPR до 1.5, тень 1024 (отбрасывают игрок и арена);
 *   2 high — DPR до 2, тень 2048 (дальше сюда же добавятся пост-эффекты).
 *
 * Стартовый уровень — догадка по видеокарте, дальше только ВНИЗ по замеру кадров.
 * Вверх сами не поднимаемся: при вертикальной синхронизации кадр всегда 16.7 мс,
 * и «запаса мощности» по времени кадра не видно — подъём качался бы туда-сюда.
 * Ручной выбор: ?q=0|1|2 (и клавиша Q в разработке).
 */

export interface QualityPreset {
  name: 'low' | 'med' | 'high';
  /** Потолок плотности пикселей. Главная цена кадра на встроенной графике — число пикселей. */
  dpr: number;
  shadows: boolean;
  shadowMap: number;
}

export const PRESETS: readonly QualityPreset[] = [
  { name: 'low', dpr: 1, shadows: false, shadowMap: 0 },
  { name: 'med', dpr: 1.5, shadows: true, shadowMap: 1024 },
  { name: 'high', dpr: 2, shadows: true, shadowMap: 2048 },
];

/** Средний кадр дольше этого (≈ 50 FPS) два окна подряд — понижаем уровень. */
const SLOW_FRAME = 1 / 50;
/** Окно усреднения, с. */
const WINDOW = 1.5;
/** Первые секунды не меряем: компиляция шейдеров и загрузка дают ложные рывки. */
const WARMUP = 3;

class Quality {
  tier = 1;
  /** Уровень задан руками (?q=) — автоматика его не трогает. */
  private manual = false;
  private listeners: ((p: QualityPreset) => void)[] = [];
  private acc = 0;
  private frames = 0;
  private slowWindows = 0;
  private age = 0;

  get preset(): QualityPreset { return PRESETS[this.tier]; }

  onChange(fn: (p: QualityPreset) => void): void { this.listeners.push(fn); }

  /** Догадка по видеокарте до первого кадра. */
  guess(renderer: THREE.WebGLRenderer): void {
    const q = new URLSearchParams(location.search).get('q');
    if (q !== null && /^[012]$/.test(q)) { this.tier = +q; this.manual = true; return; }
    const gpu = gpuName(renderer);
    if (/swiftshader|llvmpipe|software|basic render/i.test(gpu)) this.tier = 0;
    else if (/nvidia|geforce|rtx|gtx|radeon rx|apple m\d/i.test(gpu)) this.tier = 2;
    // Intel UHD/Iris, мобильные Mali/Adreno/PowerVR/Apple GPU и всё неизвестное — середина
    else this.tier = 1;
  }

  set(tier: number): void {
    tier = THREE.MathUtils.clamp(tier, 0, PRESETS.length - 1);
    if (tier === this.tier) return;
    this.tier = tier;
    this.slowWindows = 0;
    for (const fn of this.listeners) fn(this.preset);
  }

  /** Раз в кадр, с НАСТОЯЩИМ временем кадра (до ограничения шага игры). */
  frame(realDt: number): void {
    this.age += realDt;
    if (this.manual || this.age < WARMUP || this.tier === 0) return;
    // Рывок дольше 0.25 с — это не нагрузка сцены, а вкладка, сборка мусора или реклама.
    if (realDt > 0.25) return;
    this.acc += realDt; this.frames++;
    if (this.acc < WINDOW) return;
    const avg = this.acc / this.frames;
    this.acc = 0; this.frames = 0;
    this.slowWindows = avg > SLOW_FRAME ? this.slowWindows + 1 : 0;
    if (this.slowWindows >= 2) this.set(this.tier - 1);
  }
}

function gpuName(renderer: THREE.WebGLRenderer): string {
  const gl = renderer.getContext();
  const ext = gl.getExtension('WEBGL_debug_renderer_info');
  return String(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
}

export const quality = new Quality();
