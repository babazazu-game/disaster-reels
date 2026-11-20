# Сводный лист портретов на голубом фоне — для проверки глазами.
import sys, glob, os
from PIL import Image
fs = sys.argv[2:] or sorted(glob.glob('art/chars/render/*.png'))
n = len(fs); cols = min(n, 6); rows = (n + cols - 1) // cols
c = Image.new('RGBA', (cols * 300, rows * 300), (90, 160, 230, 255))
for i, f in enumerate(fs):
    im = Image.open(f).convert('RGBA').resize((300, 300))
    c.alpha_composite(im, ((i % cols) * 300, (i // cols) * 300))
c.convert('RGB').save(sys.argv[1], quality=85)
