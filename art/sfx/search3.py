import json, time, urllib.request, urllib.parse, os
def get(url): return urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'game-sfx-search/1.0'}), timeout=60).read()
meta = json.load(open('art/sfx/cand/meta.json', encoding='utf-8'))
EXTRA = {'reelspin_1': '385c086b-aed0-49ad-8492-bb4e36fc4e82', 'reelspin_2': 'fe4b8a51-5c57-4c6e-a2c9-35f2edc4fa89',
  'button_1': 'a3df15c8-778d-40d4-be24-11b345cd3119', 'button_2': 'ebfcdd63-5b1b-4c19-9ad7-98cc71f2b444', 'button_3': '0a733d2c-826e-4e7a-8f9c-228bbd17b938',
  'win_3': 'f3bb59f0-e401-46c8-a338-331a54f20576', 'win_4': '5ae7fa1c-47d9-450c-b901-7d10a3bb3d66', 'win_5': '7e664a5f-fe87-42cc-9562-6318d16f9bc6',
  'hurt_1': 'bef94b66-8823-4898-9773-7b907a634fee', 'hurt_2': '3bd29be9-a64e-4fa5-9945-2cdec67c0343', 'hurt_3': '890d3fc1-3937-4568-965c-92f6fbf3e951'}
for name, i in EXTRA.items():
    r = json.loads(get(f'https://api.openverse.org/v1/audio/{i}/')); time.sleep(1)
    ext = (r.get('filetype') or 'mp3').split('/')[-1]; fn = f'art/sfx/cand/{name}.{ext}'
    try: open(fn, 'wb').write(get(r['url'])); meta[os.path.basename(fn)] = {k: r.get(k) for k in ('title','creator','license','license_version','foreign_landing_url','duration','attribution')}
    except Exception as e: print('fail', name, e)
json.dump(meta, open('art/sfx/cand/meta.json','w',encoding='utf-8'), ensure_ascii=False, indent=1)
for q in ['upbeat', 'happy', 'funny', 'game', 'cartoon', 'party', 'chiptune']:
    p = {'q': q, 'license': 'cc0,by', 'page_size': 20, 'source': 'jamendo,ccmixter,freesound'}
    try: res = json.loads(get('https://api.openverse.org/v1/audio/?' + urllib.parse.urlencode(p)))['results']
    except Exception as e: print('ERR', e); continue
    print('MUSIC', q)
    for r in res:
        d = (r.get('duration') or 0) / 1000
        if 45 <= d <= 300: print(f"  {r['id']} {r['license']} {d:.0f}s {r['source']} | {r['title'][:40]} | {r['creator']} | {','.join(g for g in (r.get('genres') or [])[:3])}")
    time.sleep(1.2)
