# Лица: цвет фона (= цвет кожи головы, чтобы шов не был виден) и сжатые текстуры для игры.
import json, glob, os
from PIL import Image
out = {}
for f in sorted(glob.glob('art/chars/faces/*.png')):
    n = os.path.basename(f)[:-4]
    im = Image.open(f).convert('RGB')
    w, h = im.size
    px = [im.getpixel((x, y)) for x in range(0, w, w // 32) for y in (2, h - 3)] + [im.getpixel((x, y)) for y in range(0, h, h // 32) for x in (2, w - 3)]
    c = [sorted(p[i] for p in px)[len(px) // 2] for i in range(3)]
    out[n] = '#%02x%02x%02x' % tuple(c)
    im.resize((256, 256), Image.LANCZOS).save(f'assets/chars/faces/{n}.webp', quality=88)
json.dump(out, open('art/chars/faces.json', 'w'), indent=1)
print(out)
