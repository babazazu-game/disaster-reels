"""Режет лист иконок от Codex (art/reel/sheet_raw.png, сетка 4x4) в атлас барабана
assets/reel.webp: каждая иконка обрезается по альфе и ставится по центру ячейки 128 px."""
from PIL import Image
src = Image.open('art/reel/sheet_raw.png').convert('RGBA')
N, OUT, PAD = 4, 128, 6
cw, ch = src.width / N, src.height / N
atlas = Image.new('RGBA', (OUT * N, OUT * N), (0, 0, 0, 0))
for k in range(14):
    i, j = k % N, k // N
    cell = src.crop((round(i * cw), round(j * ch), round((i + 1) * cw), round((j + 1) * ch)))
    bb = cell.getchannel('A').point(lambda a: 255 if a > 24 else 0).getbbox()
    ic = cell.crop(bb)
    s = (OUT - PAD * 2) / max(ic.size)
    ic = ic.resize((max(1, round(ic.width * s)), max(1, round(ic.height * s))), Image.LANCZOS)
    atlas.alpha_composite(ic, (i * OUT + (OUT - ic.width) // 2, j * OUT + (OUT - ic.height) // 2))
atlas.save('assets/reel.webp', 'WEBP', quality=88, method=6)
atlas.save('art/reel/atlas_preview.png')
