# Музыкальные петли через ElevenLabs Sound Effects (бесплатный тариф: Music API недоступен). Ключ — из .env рабочей папки.
import json, sys, urllib.request
key = next(l.split('=',1)[1].strip().strip('"') for l in open(r'D:/work/CLAUDE/GAME/Простые логические игры/.env', encoding='utf-8') if l.startswith('ELEVENLABS_API_KEY='))
T = {
 'menu': "Seamless loop of bouncy cheerful cartoon game menu music, plucky marimba melody, pizzicato strings, ukulele, soft claps, 110 BPM, happy kids party game, instrumental",
 'round1': "Seamless loop of energetic chaotic cartoon action music, fast funky bassline, punchy drums, brass stabs, playful zany synth lead, 140 BPM, kids party game with silly disasters, instrumental",
 'round2': "Seamless loop of frantic comedic chase music, bouncy tuba, staccato strings, xylophone runs, driving drums, playful whistles, 150 BPM, cartoon kids game, instrumental",
}
for name, text in T.items():
    if len(sys.argv) > 1 and name not in sys.argv[1:]: continue
    body = json.dumps({'text': text, 'duration_seconds': 30, 'prompt_influence': 0.6, 'loop': True, 'model_id': 'eleven_text_to_sound_v2'}).encode()
    req = urllib.request.Request('https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128', data=body,
        headers={'xi-api-key': key, 'Content-Type': 'application/json'}, method='POST')
    try:
        d = urllib.request.urlopen(req, timeout=300).read(); open(f'art/music/gen/{name}.mp3', 'wb').write(d); print('ok', name, len(d))
    except urllib.error.HTTPError as e: print('fail', name, e.code, e.read()[:300])
