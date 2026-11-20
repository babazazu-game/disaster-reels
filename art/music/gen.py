# Музыка через ElevenLabs Music API (ключ — из .env рабочей папки, в файлы проекта не пишется)
import json, os, sys, urllib.request
key = next(l.split('=',1)[1].strip().strip('"') for l in open(r'D:/work/CLAUDE/GAME/Простые логические игры/.env', encoding='utf-8') if l.startswith('ELEVENLABS_API_KEY='))
TRACKS = {
 'menu': ("Bouncy playful cartoon game menu music, cheerful and light, plucky marimba and pizzicato strings, "
          "soft claps, ukulele, 110 BPM, kids party game, seamless loop feel, instrumental, no vocals", 60000),
 'round1': ("Energetic chaotic cartoon action music for a kids party game where silly disasters fall from the sky, "
            "fast funky bassline, punchy drums, brass stabs, playful synth lead, slightly zany and comedic, 140 BPM, "
            "constant high energy, instrumental, no vocals", 90000),
 'round2': ("Upbeat frantic comedic chase music for a cartoon kids game, bouncy tuba and staccato strings, "
            "xylophone runs, driving drums, playful whistles, sense of fun panic, 150 BPM, instrumental, no vocals", 90000),
}
for name, (prompt, ms) in TRACKS.items():
    if len(sys.argv) > 1 and name not in sys.argv[1:]: continue
    body = json.dumps({'prompt': prompt, 'music_length_ms': ms, 'model_id': 'music_v1'}).encode()
    req = urllib.request.Request('https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128', data=body,
        headers={'xi-api-key': key, 'Content-Type': 'application/json'}, method='POST')
    try:
        data = urllib.request.urlopen(req, timeout=600).read()
        open(f'art/music/gen/{name}.mp3', 'wb').write(data); print('ok', name, len(data))
    except urllib.error.HTTPError as e:
        print('fail', name, e.code, e.read()[:300])
