# Нарезка выбранных earshot'ом кусков в assets/sfx: моно, пик −2 дБ, короткие фейды против щелчков.
import subprocess, re, json
C = 'art/sfx/cand/'
CUT = {  # имя: (файл, начало, конец, фейд-ин, фейд-аут)
 'spin': ('reelspin_1.mp3', 0.047, 1.48, 0.005, 0.25), 'reelstop': ('reelstop_1.mp3', 0.10, 0.40, 0.003, 0.08),
 'boom': ('explosion_3.mp3', 0.011, 1.915, 0.004, 0.5), 'whoosh': ('meteor_0.mp3', 4.003, 5.255, 0.05, 0.3),
 'thud': ('impact_2.mp3', 0.169, 0.525, 0.003, 0.1), 'bubble': ('lava_3.mp3', 3.036, 5.06, 0.25, 0.5),
 'fire': ('fire_0.mp3', 0.0, 0.645, 0.005, 0.2), 'freeze': ('freeze_2.mp3', 1.36, 2.36, 0.005, 0.3),
 'zap': ('zap_1.mp3', 0.509, 1.4, 0.005, 0.3), 'splash': ('splash_0.mp3', 0.331, 1.331, 0.005, 0.3),
 'cluck': ('chicken_2.mp3', 0.0, 1.0, 0.005, 0.2), 'meow': ('cat_2.mp3', 0.0, 0.917, 0.005, 0.2),
 'boing': ('boing_2.mp3', 0.029, 0.505, 0.003, 0.1), 'hurt': ('hurt_2.mp3', 0.0, 0.173, 0.002, 0.04),
 'cheer': ('cheer_1.mp3', 1.786, 3.655, 0.1, 0.5), 'fail': ('fail_1.mp3', 0.253, 2.134, 0.01, 0.3),
 'tada': ('win_4.mp3', 0.0, 1.742, 0.003, 0.3),
}
def peak(f, ss, to):
    r = subprocess.run(['ffmpeg', '-hide_banner', '-ss', str(ss), '-to', str(to), '-i', f, '-af', 'volumedetect', '-f', 'null', '-'], capture_output=True, text=True)
    return float(re.search(r'max_volume: (-?[\d.]+) dB', r.stderr).group(1))
for n, (f, a, b, fi, fo) in CUT.items():
    src = C + f; d = b - a; g = -2 - peak(src, a, b)
    af = f'afade=t=in:d={fi},afade=t=out:st={d - fo:.3f}:d={fo},volume={g:.2f}dB'
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-ss', str(a), '-to', str(b), '-i', src, '-af', af,
                    '-ac', '1', '-ar', '44100', '-b:a', '80k', f'assets/sfx/{n}.mp3'], check=True)
    print(n, f'{d:.2f}s gain {g:+.1f}dB')
