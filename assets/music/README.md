# Музыка

music1..5 — петли по 30 с, сгенерированы для этой игры через ElevenLabs (Sound Effects, loop).
Играют подряд в случайном порядке, каждая два круга (src/engine/sfx.ts → startMusic).
Исходники mp3 и промпты — art/music/gen, art/music/gen_sfx.py. Громкость выровнена к ~−16 LUFS.
.ogg (Opus 64k) — основной формат, .mp3 — запасной для Safari без Opus.
