import json, time, urllib.request, os
def get(url): return urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'game-sfx-search/1.0'}), timeout=120).read()
IDS = {'m_victory': 'eb4d5218-b1ce-4eb6-8232-6fb356a33dac', 'm_heist': '4340f759-795c-495a-abd7-0a36782e1258',
  'm_orchloop': 'cd153214-cbec-46fd-b4a1-afe20a193612', 'm_upbeatloop': '12966e50-ea5e-4600-9359-892b35661602',
  'm_behappy': '745ea2ac-be6c-4317-b0d6-c27f97bdc7f2', 'm_happy': '91a9d8f4-ffa1-467b-96de-aedbd9db1112', 'm_chipbirds': 'fe483dc0-6089-4468-a310-0a58fe713fe5'}
meta = {}
for n, i in IDS.items():
    r = json.loads(get(f'https://api.openverse.org/v1/audio/{i}/')); time.sleep(1)
    ext = (r.get('filetype') or 'mp3').split('/')[-1]; fn = f'art/music/cand/{n}.{ext}'
    try: open(fn, 'wb').write(get(r['url'])); meta[os.path.basename(fn)] = {k: r.get(k) for k in ('title','creator','license','license_version','foreign_landing_url','duration','attribution')}; print('ok', fn)
    except Exception as e: print('fail', n, e)
json.dump(meta, open('art/music/cand/meta.json','w',encoding='utf-8'), ensure_ascii=False, indent=1)
