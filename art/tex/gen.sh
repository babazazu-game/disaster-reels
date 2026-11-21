#!/bin/bash
# Текстуры карты (этап 8+): Codex рисует бесшовные мультяшные текстуры, потом art/tex/prep.py делает webp в assets/tex/.
cd "$(dirname "$0")/../.."
S="Seamless tileable square game texture, flat top-down orthographic view filling the whole frame edge to edge, stylized cartoon look like a bright kids block game (Roblox-style materials), soft hand-painted shapes, gentle low contrast so it reads well when tiled, bright cheerful colors, no text, no border, no vignette, no lighting gradient, no perspective, no shadows from a light source. Must tile seamlessly left-right and top-bottom."
gen() { [ -f "art/tex/src/$1.png" ] && { echo "skip $1"; return; }; node tools/codex_image.cjs gen "art/tex/src/$1.png" "$S Subject: $2"; echo "done $1"; }
gen grass "short lush meadow grass, many small rounded grass tufts and a few tiny yellow and white flower dots, fresh green #5cc44a"
gen dirt "earth soil cliff side, warm brown #9a6a3c with small rounded pebbles and soft darker clumps, a few tiny roots"
gen stone "light grey cobblestone rock surface, irregular large rounded flat stones with soft cracks between them, cool grey #a3a9b3"
gen planks "wooden crate face: square frame of four planks around the edge and a diagonal plank brace across, warm orange-brown #c4843f wood with soft grain and small nail dots; the frame touches the image edges"
gen bark "tree bark, vertical rough grooves and ridges, warm brown #8a5a33, soft cartoon style"
gen leaves "dense tree foliage made of many overlapping rounded cartoon leaves, fresh green #3fae4f with lighter highlights on leaf tips"
gen wood "light painted wooden plank surface, horizontal grain lines, cream white #fff4dc, soft"
# Пустыня (карта «Пирамида»): песок вместо травы, песчаник вместо камня, пальмы, кактусы
gen sand "fine desert sand with soft wind ripple lines and a few tiny pebbles, warm golden beige #e6c47c, very gentle"
gen sandstone "sandstone building blocks of an ancient pyramid, large rectangular blocks laid in rows with soft worn edges and thin darker joints, warm ochre #d9b06a"
gen palmbark "palm tree trunk bark, horizontal overlapping rough rings and diamond scale pattern, warm tan brown #a87a4a"
gen palmleaf "palm frond foliage, long narrow pointed green leaflets in parallel diagonal rows, bright tropical green #5bbf3c with yellow-green highlights"
gen cactus "cactus skin, vertical ribs with small white spine dots in rows, fresh cactus green #4fa64a"
