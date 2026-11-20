# Музыка

music1..5 — петли по 30 с, ElevenLabs (Sound Effects, loop), вторая версия: современная электроника без меди и ксилофонов (первую заказчик забраковал).
Играют подряд в случайном порядке, каждая два круга (src/engine/sfx.ts → startMusic).
Исходники и промпты — art/music/gen2, art/music/gen2.py (старые — art/music/gen). Громкость выровнена к ~−16 LUFS.
.ogg (Opus 64k) — основной формат, .mp3 — запасной для Safari без Opus.
