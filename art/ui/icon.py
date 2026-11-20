# Иконка: обрезка по альфе, квадрат, 160 px webp. Если фон не прозрачный — убираем почти-белый фон.
import sys
from PIL import Image
src, dst = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGBA')
if im.getchannel('A').getextrema()[0] == 255:
    px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            if r > 238 and g > 238 and b > 238: px[x, y] = (r, g, b, 0)
box = im.getchannel('A').point(lambda a: 255 if a > 10 else 0).getbbox()
im = im.crop(box); s = max(im.size)
sq = Image.new('RGBA', (s, s)); sq.alpha_composite(im, ((s - im.width) // 2, (s - im.height) // 2))
sq.resize((160, 160), Image.LANCZOS).save(dst, quality=90)
print(dst, box, im.getchannel('A').getextrema())
