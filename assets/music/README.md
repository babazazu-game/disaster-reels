# Музыка

menu, round1, round2 — петли по 30 с, сгенерированы для этой игры через ElevenLabs (Sound Effects, loop).
Исходники mp3 и промпты — art/music/gen, art/music/gen_sfx.py. Громкость выровнена к −16 LUFS.
.ogg (Opus 64k) — основной формат, .mp3 — запасной для Safari без Opus. Подключение — src/engine/sfx.ts → music().
