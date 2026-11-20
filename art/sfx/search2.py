import json, time, urllib.request, urllib.parse
def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'game-sfx-search/1.0'}), timeout=30).read()
def s(q, lic='cc0,by', extra=None, lo=0, hi=10**9, n=8):
    p = {'q': q, 'license': lic, 'page_size': 20, 'mature': 'false'}; p.update(extra or {})
    try: res = json.loads(get('https://api.openverse.org/v1/audio/?' + urllib.parse.urlencode(p)))['results']
    except Exception as e: print('ERR', q, e); return
    k = 0
    for r in res:
        d = r.get('duration') or 0
        if lo <= d <= hi and k < n:
            k += 1; print(f"  {r['id']} {r['license']} {d/1000:.1f}s {r['source']} | {r['title'][:45]} | {r['creator']}")
    time.sleep(1.2)
for q in ['upbeat game music loop', 'happy cartoon music', 'funny chaotic music', 'chiptune upbeat', 'kids game music']:
    print('MUSIC', q); s(q, extra={'category': 'music'}, lo=40000, hi=400000)
for q, hi in [('slot machine', 8000), ('wheel spinning clicks', 8000), ('ratchet clicking', 6000), ('button press', 2000), ('cartoon hit', 2000), ('ouch', 2000), ('victory', 6000), ('tada', 5000)]:
    print('SFX', q); s(q, lic='cc0', lo=150, hi=hi, n=5)
