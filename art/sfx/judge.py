# Оценка кандидатов earshot'ом в одном процессе (модели грузятся один раз).
import json, os, glob, sys
from earshot import api
D = 'D:/work/CLAUDE/GAME/disaster-reels/art/sfx/cand'
Q = {
 'explosion': 'a cartoon explosion boom', 'meteor': 'a fireball whooshing through the air',
 'impact': 'a heavy thud impact on the ground', 'lava': 'bubbling hot lava', 'fire': 'a burst of fire flames',
 'freeze': 'an icy freeze crackle', 'zap': 'an electric zap', 'splash': 'a water splash',
 'chicken': 'a chicken clucking', 'cat': 'a cat meowing', 'boing': 'a cartoon spring boing',
 'hurt': 'a short cartoon hit ouch', 'cheer': 'a crowd of kids cheering', 'fail': 'a sad trombone fail jingle',
 'win': 'a happy victory fanfare jingle', 'reelspin': 'a slot machine reel spinning with clicks',
 'reelstop': 'a slot machine reel stopping with a clunk', 'button': 'a soft UI button click pop',
}
out = {}
for role, q in Q.items():
    files = [f for f in sorted(glob.glob(f'{D}/{role}_*')) if os.path.getsize(f) > 0]
    if not files: continue
    r = api.rank(files, q)
    rows = r.get('results', r) if isinstance(r, dict) else r
    best = []
    for row in rows[:2]:
        p = row.get('path') or row.get('file')
        f = api.find(p, q, top=1)
        seg = (f.get('segments') or f.get('results') or [{}])[0] if isinstance(f, dict) else {}
        best.append({'file': os.path.basename(p), 'z': row.get('z'), 'verdict': row.get('verdict'),
                     'seg': {k: seg.get(k) for k in ('start', 'end', 'kind', 'z', 'head', 'tail', 'flags', 'note') if k in seg}})
    out[role] = best
    print(role, json.dumps(best, ensure_ascii=False), flush=True)
M = 'D:/work/CLAUDE/GAME/disaster-reels/art/music/gen'
for f in sorted(glob.glob(f'{M}/*.mp3')):
    d = api.describe(f, top=6)
    m = api.match(f, 'upbeat cheerful cartoon game music', alts=['sound effects without music', 'ambient noise', 'speech'])
    out['music:' + os.path.basename(f)] = {'tags': d.get('tags'), 'audioset': d.get('audioset') or d.get('labels'), 'match': m}
    print(os.path.basename(f), json.dumps(out['music:' + os.path.basename(f)], ensure_ascii=False, default=str)[:1500], flush=True)
json.dump(out, open('D:/work/CLAUDE/GAME/disaster-reels/art/sfx/judge.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1, default=str)
