"""Текстуры карты: art/tex/src/<имя>.png (Codex) -> assets/tex/<имя>.webp 512 px.

Шов: сравниваем разницу на стыке (последний столбец/строка с первым) с обычной разницей соседних пикселей.
Если стык заметно резче (> SEAM_MAX раз) — делаем бесшовной: смесь картинки с её копией, сдвинутой на половину,
маска 1 в центре и 0 у краёв. У сдвинутой копии края непрерывны, а её собственный шов в центре — под весом 0.
planks (ящик) не трогаем: там рамка по краю, картинка на всю грань, а не плитка.

  python art/tex/prep.py            # все
  python art/tex/prep.py grass dirt # выбранные
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
SRC, OUT = ROOT / 'art/tex/src', ROOT / 'assets/tex'
SIZE, SEAM_MAX = 512, 1.6
NO_TILE = {'planks', 'wood'}   # wood: доска ровно по краю — «шов» ложный, сглаживание двоило линию


def seam_ratio(a: np.ndarray) -> float:
    inner_x = np.abs(a[:, 1:] - a[:, :-1]).mean()
    inner_y = np.abs(a[1:] - a[:-1]).mean()
    seam_x = np.abs(a[:, 0] - a[:, -1]).mean()
    seam_y = np.abs(a[0] - a[-1]).mean()
    return max(seam_x / inner_x, seam_y / inner_y)


def make_tileable(a: np.ndarray) -> np.ndarray:
    h, w = a.shape[:2]
    rolled = np.roll(np.roll(a, h // 2, 0), w // 2, 1)
    yy = 1 - np.abs(np.linspace(-1, 1, h))[:, None]
    xx = 1 - np.abs(np.linspace(-1, 1, w))[None, :]
    m = np.clip(np.minimum(yy, xx) * 3, 0, 1)[..., None]   # плато в центре, переход у краёв
    return a * m + rolled * (1 - m)


def main(names):
    OUT.mkdir(parents=True, exist_ok=True)
    for p in sorted(SRC.glob('*.png')):
        if names and p.stem not in names:
            continue
        im = Image.open(p).convert('RGB')
        s = min(im.size)
        im = im.crop(((im.width - s) // 2, (im.height - s) // 2, (im.width + s) // 2, (im.height + s) // 2)).resize((SIZE, SIZE), Image.LANCZOS)
        a = np.asarray(im, dtype=np.float32)
        r = seam_ratio(a)
        fixed = ''
        if p.stem not in NO_TILE and r > SEAM_MAX:
            a = make_tileable(a)
            fixed = f' -> {seam_ratio(a):.2f} (сглажен)'
        Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).save(OUT / f'{p.stem}.webp', quality=86, method=6)
        print(f'{p.stem}: шов {r:.2f}{fixed}, {(OUT / f"{p.stem}.webp").stat().st_size // 1024} КБ')


if __name__ == '__main__':
    main(set(sys.argv[1:]))
