# Портреты для карточек: обрезка по силуэту, квадрат с небольшим полем, 256 px webp.
import glob, os
from PIL import Image
for f in sorted(glob.glob('art/chars/render/*.png')):
    n = os.path.basename(f)[:-4]
    im = Image.open(f).convert('RGBA')
    box = im.getchannel('A').point(lambda a: 255 if a > 8 else 0).getbbox()
    im = im.crop(box)
    s = int(max(im.size) * 1.08)
    sq = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    sq.alpha_composite(im, ((s - im.width) // 2, s - im.height - int(s * 0.03)))
    sq.resize((256, 256), Image.LANCZOS).save(f'assets/chars/{n}.webp', quality=90)
    print(n, box)
