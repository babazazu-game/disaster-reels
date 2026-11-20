# Вторая попытка музыки (заказчику не понравилась первая: «труба, звонкие, дебильная»).
# Современная электроника для детской экшен-игры: плотные барабаны, бас, цепляющий синт. Без меди, ксилофонов, укулеле.
import json, sys, urllib.request
key = next(l.split('=',1)[1].strip().strip('"') for l in open(r'D:/work/CLAUDE/GAME/Простые логические игры/.env', encoding='utf-8') if l.startswith('ELEVENLABS_API_KEY='))
NO = " No brass, no trumpets, no xylophone, no ukulele, no whistles, no vocals. Instrumental."
T = {
 'a_futurebass': "Seamless loop of catchy upbeat future bass game music, warm supersaw chords, punchy kick and snare, deep sub bass, bright plucky synth hook, 140 BPM, energetic modern mobile game soundtrack." + NO,
 'b_electrohouse': "Seamless loop of energetic electro house music, driving four-on-the-floor kick, groovy pumping bassline, catchy synth lead riff, claps, 126 BPM, exciting action game soundtrack." + NO,
 'c_trapbeat': "Seamless loop of cool modern trap beat for a game, hard 808 bass, crisp hi-hat rolls, dark but fun catchy synth bell melody, 145 BPM half-time groove, confident and hype." + NO,
 'd_synthwave': "Seamless loop of upbeat retro synthwave music, punchy gated drums, driving arpeggiated bass, catchy analog synth lead melody, 118 BPM, adventurous and cool." + NO,
 'e_dnb': "Seamless loop of fast energetic liquid drum and bass, rolling breakbeat, warm reese bass, catchy synth pad and lead hook, 172 BPM, intense chase game music." + NO,
 'f_popedm': "Seamless loop of happy catchy pop EDM drop, big punchy drums, bouncy bass, memorable synth lead hook, 128 BPM, fun party game soundtrack." + NO,
 'g_funkybeat': "Seamless loop of groovy funky electronic beat, slap-style synth bass, tight drums, catchy chopped synth chords, 115 BPM, cool and playful game menu music." + NO,
 'h_dubstep': "Seamless loop of fun melodic dubstep game music, heavy but friendly wobble bass, big drums, catchy bright synth melody, 140 BPM, epic and exciting." + NO,
}
for name, text in T.items():
    if len(sys.argv) > 1 and name not in sys.argv[1:]: continue
    body = json.dumps({'text': text, 'duration_seconds': 30, 'prompt_influence': 0.6, 'loop': True, 'model_id': 'eleven_text_to_sound_v2'}).encode()
    req = urllib.request.Request('https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128', data=body,
        headers={'xi-api-key': key, 'Content-Type': 'application/json'}, method='POST')
    try:
        d = urllib.request.urlopen(req, timeout=300).read(); open(f'art/music/gen2/{name}.mp3', 'wb').write(d); print('ok', name, len(d), flush=True)
    except urllib.error.HTTPError as e: print('fail', name, e.code, e.read()[:300], flush=True)
