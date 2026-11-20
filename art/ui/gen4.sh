#!/bin/bash
# фирменная кнопка СТОП с надписью (заказчик) — ждём, пока gen3 допишет stop.png, чтобы не перепутать файлы
until [ -f art/ui/src/stop.png ]; do sleep 5; done; sleep 3
for L in "ru:СТОП" "en:STOP"; do
  k=${L%%:*}; w=${L#*:}
  node tools/codex_image.cjs gen art/ui/src/stop_$k.png "The same big round glossy red arcade push button as the attached button image (same red glossy dome, white highlight, thick dark purple outline, golden-yellow rim with darker bottom thickness), now with the word '$w' written big across the center (spelled exactly, only this word): chunky bubbly white letters with thick dark purple outline and a subtle 3D extrusion, in the same candy cartoon lettering style as the attached logo. Centered, nothing else, no background." --transparent --ref art/ui/src/stop.png --ref art/ui/src/logo.png 2>&1 | grep saved
done
