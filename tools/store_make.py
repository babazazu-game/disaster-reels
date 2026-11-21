"""Сборка материалов витрины Playgama: ролик и скриншоты из кадров tools/store_media.cjs, обложки — арт Codex (art/store/gen_covers.sh) + логотип.

  python tools/store_make.py

Результат (только локально, ничего не загружается) — store/playgama/:
  video_1920x1080.mp4        — ~28 с геймплея: барабан → хаос → лава и финал, музыка игры с затуханием
  screenshots/1..7.jpg       — 1920×1080: меню, барабан, хаос, лава, победа, персонажи, энциклопедия
  cover_landscape.jpg 1920×1080, cover_portrait.jpg 1080×1920, cover_square.jpg 800×800 — арт Codex + логотип
"""
import json
import os
import shutil
import subprocess

from PIL import Image, ImageFilter, ImageDraw

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
OUT = os.path.join(ROOT, 'store', 'playgama')
FRAMES = os.path.join(OUT, 'frames')
MUSIC = os.path.join(ROOT, 'assets', 'music', 'music2.mp3')
LOGO = os.path.join(ROOT, 'assets', 'ui', 'logo_en.webp')
FPS = 30


def frame(i):
    return os.path.join(FRAMES, f'{i:05d}.jpg')


def pick(log, t_from, t_to):
    """Кадры, где время раунда в [t_from, t_to)."""
    return [i for i, s in enumerate(log) if t_from <= s['t'] < t_to]


def video(log):
    n = len(log)
    first_go = next((i for i, s in enumerate(log) if s['t'] > 0), 0)
    segs = [
        list(range(max(0, first_go - 150), min(n, first_go + 75))),   # барабан крутится, СТОП, первая волна (7,5 с)
        pick(log, 14.0, 23.0),                                          # второй барабан и хаос (9 с)
        pick(log, 47.0, 60.5),                                          # лава и финал (13,5 с)
    ]
    wins = [i for i, s in enumerate(log) if s['st'] == 'win']
    segs.append(wins[:76])                                              # конфетти и экран «YOU SURVIVED!» (2,5 с)
    seq = os.path.join(OUT, '_seq')
    shutil.rmtree(seq, ignore_errors=True)
    os.makedirs(seq)
    k = 0
    for seg in segs:
        for i in seg:
            shutil.copy(frame(i), os.path.join(seq, f'{k:05d}.jpg'))
            k += 1
    dur = k / FPS
    out = os.path.join(OUT, 'video_1920x1080.mp4')
    subprocess.run([
        'ffmpeg', '-y', '-loglevel', 'error', '-framerate', str(FPS), '-i', os.path.join(seq, '%05d.jpg'),
        '-i', MUSIC, '-filter_complex',
        f'[1:a]atrim=0:{dur:.2f},afade=t=in:d=0.5,afade=t=out:st={dur - 1.5:.2f}:d=1.5,volume=0.95,alimiter=limit=0.89[a]',
        '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '22', '-maxrate', '6M', '-bufsize', '12M', '-preset', 'slow',
        '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', '-t', f'{dur:.2f}', out,
    ], check=True)
    shutil.rmtree(seq, ignore_errors=True)
    print('ролик:', out, f'{dur:.1f} с')


def screenshots(log):
    d = os.path.join(OUT, 'screenshots')
    shutil.rmtree(d, ignore_errors=True)
    os.makedirs(d)
    shots = os.path.join(OUT, 'shots')
    n = len(log)
    first_go = next((i for i, s in enumerate(log) if s['t'] > 0), 0)

    def at(t):
        c = pick(log, t, t + 0.5)
        return frame(c[0]) if c else frame(n // 2)

    wins = [i for i, s in enumerate(log) if s['st'] == 'win']
    seq = [
        os.path.join(shots, 'menu.jpg'),
        frame(max(0, first_go - 40)),            # барабан
        at(18.0),                                # хаос
        at(33.0),
        at(53.0),                                # лава
        frame(wins[min(len(wins) - 1, 40)]) if wins else at(58.0),
        os.path.join(shots, 'characters.jpg'),
        os.path.join(shots, 'encyclopedia.jpg'),
    ]
    for k, src in enumerate(seq, 1):
        Image.open(src).convert('RGB').resize((1920, 1080)).save(os.path.join(d, f'{k}.jpg'), quality=92)
    print('скриншоты:', d, len(seq))


KEY = os.path.join(ROOT, 'art', 'store')


def cover(name, size, logo_w, logo_y, anchor_y=0.5):
    """Обложка: ключевой арт Codex (art/store/key_<name>.png, без текста) + настоящий логотип игры сверху."""
    bg = Image.open(os.path.join(KEY, f'key_{name}.png')).convert('RGB')
    W, H = size
    k = max(W / bg.width, H / bg.height)
    bg = bg.resize((round(bg.width * k), round(bg.height * k)), Image.LANCZOS)
    x0, y0 = (bg.width - W) // 2, round((bg.height - H) * anchor_y)
    bg = bg.crop((x0, y0, x0 + W, y0 + H))
    logo = Image.open(LOGO).convert('RGBA')
    lh = round(logo.height * logo_w / logo.width)
    logo = logo.resize((logo_w, lh), Image.LANCZOS)
    # мягкое белое свечение и тень под логотипом; холст с запасом, чтобы размытие не обрезалось рамкой
    m = logo_w // 12
    alpha = Image.new('L', (logo.width + 2 * m, logo.height + 2 * m), 0)
    alpha.paste(logo.split()[3], (m, m))
    glow = Image.new('RGBA', alpha.size, (255, 255, 255, 0))
    glow.putalpha(alpha.filter(ImageFilter.GaussianBlur(logo_w / 40)).point(lambda a: int(a * 0.6)))
    shadow = Image.new('RGBA', alpha.size, (30, 10, 70, 0))
    shadow.putalpha(alpha.filter(ImageFilter.GaussianBlur(logo_w / 30)).point(lambda a: int(a * 0.45)))
    pos = ((W - logo_w) // 2, logo_y)
    bg = bg.convert('RGBA')
    bg.alpha_composite(shadow, (pos[0] - m, pos[1] - m + logo_w // 60))
    bg.alpha_composite(glow, (pos[0] - m, pos[1] - m))
    bg.alpha_composite(logo, pos)
    out = os.path.join(OUT, f'cover_{name}.jpg')
    bg.convert('RGB').save(out, quality=93)
    print('обложка:', out, size)


def main():
    import sys
    if '--covers' not in sys.argv:
        log = json.load(open(os.path.join(OUT, 'frames.json'), encoding='utf8'))
        video(log)
        screenshots(log)
    cover('landscape', (1920, 1080), 760, 22, anchor_y=0.0)
    cover('portrait', (1080, 1920), 940, 48)
    cover('square', (1200, 1200), 700, 14)
    sq = os.path.join(OUT, 'cover_square.jpg')
    Image.open(sq).resize((800, 800), Image.LANCZOS).save(sq, quality=93)


if __name__ == '__main__':
    main()
