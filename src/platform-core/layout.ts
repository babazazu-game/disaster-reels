/**
 * Раскладка.
 *
 * Перенесено из «Зверо-Микса», где этот код выстрадан замечаниями модерации,
 * и развёрнуто на обе ориентации.
 *
 * ПРИНЦИП, который нельзя ломать: раскладка считается ОТ КРАЁВ ВНУТРЬ.
 *   1) из размера экрана вычитаются системные вырезы (чёлка, домашний
 *      индикатор) — получается полезная область;
 *   2) внутри неё резервируются высоты HUD-блоков, посчитанные от РЕАЛЬНОГО
 *      содержимого, а не как «процент от высоты с независимым клампом»;
 *   3) игровому полю отдаётся остаток.
 *
 * Ни один блок не позиционируется как «край экрана плюс сколько-то». Именно
 * так элементы уезжают за границу — прямое нарушение п. 1.10.1 «элементы
 * не должны обрезаться».
 */

export interface Insets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface SafeArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Реальные вырезы устройства.
 *
 * index.html объявляет viewport-fit=cover, значит innerHeight включает зону
 * чёлки и домашнего индикатора — рисовать туда HUD нельзя. Значения env()
 * доступны только из CSS, поэтому читаем их через скрытый служебный div.
 * Пересчитываем при каждом вызове (при повороте они меняются), но сам div
 * создаём один раз.
 */
let probe: HTMLDivElement | null = null;

export function safeInsets(): Insets {
  try {
    if (!probe || !probe.isConnected) {
      probe = document.createElement('div');
      probe.setAttribute('aria-hidden', 'true');
      probe.style.cssText =
        'position:fixed;top:0;left:0;width:0;height:0;visibility:hidden;pointer-events:none;' +
        'padding-top:env(safe-area-inset-top,0px);' +
        'padding-right:env(safe-area-inset-right,0px);' +
        'padding-bottom:env(safe-area-inset-bottom,0px);' +
        'padding-left:env(safe-area-inset-left,0px);';
      document.body.appendChild(probe);
    }
    const cs = getComputedStyle(probe);
    return {
      top: parseFloat(cs.paddingTop) || 0,
      right: parseFloat(cs.paddingRight) || 0,
      bottom: parseFloat(cs.paddingBottom) || 0,
      left: parseFloat(cs.paddingLeft) || 0,
    };
  } catch {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }
}

/**
 * Технический отступ поверх safe-area: страховка от округлений
 * devicePixelRatio и от «почти вплотную» — элемент у самой кромки модератор
 * тоже читает как обрезанный.
 */
export const EDGE_PAD = 4;

/**
 * Полезная область в координатах игры.
 *
 * `scale` — отношение логического размера канваса к CSS-размеру: вырезы
 * приходят в CSS-пикселях, а раскладка считается в логических.
 */
export function safeArea(logicalW: number, logicalH: number, scale = 1): SafeArea {
  const ins = safeInsets();
  const l = (ins.left + EDGE_PAD) * scale;
  const r = (ins.right + EDGE_PAD) * scale;
  const t = (ins.top + EDGE_PAD) * scale;
  const b = (ins.bottom + EDGE_PAD) * scale;
  return {
    x: l,
    y: t,
    width: Math.max(0, logicalW - l - r),
    height: Math.max(0, logicalH - t - b),
  };
}

export type Orientation = 'landscape' | 'portrait';

export function orientation(): Orientation {
  if (typeof window === 'undefined') return 'landscape';
  return window.innerWidth >= window.innerHeight ? 'landscape' : 'portrait';
}

/**
 * Минимальный физический размер интерактивного элемента (п. 1.8).
 * Возвращает размер в ЛОГИЧЕСКИХ единицах, который на этом экране даст
 * не меньше 44 CSS-пикселей.
 */
export function minTapSize(scale: number): number {
  return 44 * scale;
}

/**
 * Раскладка «от краёв внутрь»: сверху и снизу резервируются полосы под HUD,
 * остаток отдаётся полю. Высоты полос передаёт игра, посчитав их от реального
 * содержимого.
 */
export function splitVertical(area: SafeArea, topBar: number, bottomBar: number): {
  top: SafeArea; field: SafeArea; bottom: SafeArea;
} {
  const t = Math.min(topBar, area.height);
  const b = Math.min(bottomBar, area.height - t);
  return {
    top: { x: area.x, y: area.y, width: area.width, height: t },
    field: { x: area.x, y: area.y + t, width: area.width, height: area.height - t - b },
    bottom: { x: area.x, y: area.y + area.height - b, width: area.width, height: b },
  };
}
