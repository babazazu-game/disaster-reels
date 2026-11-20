# Поиск CC0/CC BY звуков на Openverse по ролям, скачивание по 4 кандидата на роль
import json, time, urllib.request, urllib.parse, os, sys
ROLES = {
 'explosion':   ['cartoon explosion', 'explosion boom', 'small explosion'],
 'meteor':      ['fireball whoosh', 'falling bomb whistle', 'meteor'],
 'impact':      ['heavy impact thud', 'ground impact'],
 'lava':        ['lava bubbling', 'boiling mud bubbles'],
 'fire':        ['fire whoosh ignite', 'fire burst'],
 'freeze':      ['ice crack', 'freeze ice'],
 'zap':         ['electric zap', 'electric shock spark'],
 'splash':      ['water splash small', 'splash'],
 'chicken':     ['chicken cluck', 'hen clucking'],
 'cat':         ['cat meow', 'cartoon meow'],
 'boing':       ['cartoon boing', 'spring boing'],
 'hurt':        ['cartoon ouch hit', 'cartoon bonk'],
 'cheer':       ['kids cheering', 'crowd cheer short'],
 'fail':        ['sad trombone', 'cartoon fail'],
 'win':         ['victory fanfare short', 'level complete jingle'],
 'reelspin':    ['slot machine spinning', 'slot machine reel'],
 'reelstop':    ['slot machine stop clunk', 'mechanical clunk lever'],
 'button':      ['arcade button press', 'big button click'],
}
out = 'art/sfx/cand'; meta = {}
def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'game-sfx-search/1.0'})
    return urllib.request.urlopen(req, timeout=30).read()
for role, qs in ROLES.items():
    seen, picks = set(), []
    for q in qs:
        u = 'https://api.openverse.org/v1/audio/?' + urllib.parse.urlencode({'q': q, 'license': 'cc0', 'page_size': 20, 'mature': 'false'})
        try: res = json.loads(get(u))['results']
        except Exception as e: print(role, q, 'ERR', e); time.sleep(2); continue
        for r in res:
            d = r.get('duration') or 0
            if r['id'] in seen or not (150 <= d <= (20000 if role in ('lava','reelspin','cheer') else 6000)): continue
            seen.add(r['id']); picks.append(r)
        time.sleep(1.2)
    picks = picks[:4]
    for i, r in enumerate(picks):
        ext = (r.get('filetype') or 'mp3').split('/')[-1]
        fn = f'{out}/{role}_{i}.{ext}'
        try:
            open(fn, 'wb').write(get(r['url']))
            meta[os.path.basename(fn)] = {k: r.get(k) for k in ('title', 'creator', 'license', 'license_version', 'foreign_landing_url', 'duration', 'attribution')}
        except Exception as e: print('dl fail', fn, e)
    print(role, len(picks), [p['title'][:28] for p in picks]); sys.stdout.flush()
json.dump(meta, open('art/sfx/cand/meta.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
