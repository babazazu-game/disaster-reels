"""Режет листы иконок от Codex в атлас барабана assets/reel.webp (4 колонки x 5 рядов, ячейка 128 px).
Каждая иконка обрезается по альфе и ставится по центру ячейки.
  art/reel/sheet_raw.png  — 4x4: 8 существ + 6 свойств (ячейки 0..13)
  art/reel/sheet2_raw.png — 2x2: зомби, динозавр, НЛО, торнадо (ячейки 14..17; в игре пока только зомби)"""
from PIL import Image
COLS, ROWS, OUT, PAD = 4, 5, 128, 6
atlas = Image.new('RGBA', (OUT * COLS, OUT * ROWS), (0, 0, 0, 0))

def cut(path, n, count, first):
    src = Image.open(path).convert('RGBA')
    cw, ch = src.width / n, src.height / n
    for k in range(count):
        i, j = k % n, k // n
        cell = src.crop((round(i * cw), round(j * ch), round((i + 1) * cw), round((j + 1) * ch)))
        ic = cell.crop(cell.getchannel('A').point(lambda a: 255 if a > 24 else 0).getbbox())
        s = (OUT - PAD * 2) / max(ic.size)
        ic = ic.resize((max(1, round(ic.width * s)), max(1, round(ic.height * s))), Image.LANCZOS)
        d = first + k
        atlas.alpha_composite(ic, ((d % COLS) * OUT + (OUT - ic.width) // 2, (d // COLS) * OUT + (OUT - ic.height) // 2))

cut('art/reel/sheet_raw.png', 4, 14, 0)
cut('art/reel/sheet2_raw.png', 2, 4, 14)
atlas.save('assets/reel.webp', 'WEBP', quality=88, method=6)
atlas.save('art/reel/atlas_preview.png')
