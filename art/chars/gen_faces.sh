#!/bin/bash
# Лица персонажей (текстуры на переднюю грань кубической головы) — по очереди: codex_image берёт свежий PNG.
B="Flat 2D texture for the FRONT FACE of a blocky cube-headed cartoon kids game character, in the exact cartoon style of the faces in the reference sheet (big glossy black-and-white eyes with white highlights, thick dark outlines, simple expressive mouth). Perfectly front-on, flat, NO shading on the background, NO head outline, NO hair, NO hat, NO neck, NO ears: ONLY the facial features painted on a completely flat solid background colour that fills the ENTIRE square image edge to edge. Square image, features centred and occupying the middle ~75% of the square, a little lower than centre. No text."
SK="Background: flat solid skin colour #F0B486 everywhere."
gen() { [ -f "art/chars/faces/$1.png" ] && return; node tools/codex_image.cjs gen "art/chars/faces/$1.png" "$B $2" --ref art/concepts/characters_v1.jpg 2>&1 | grep -i saved; }
gen rookie "$SK Face: friendly cheerful boy, big round eyes looking forward, simple short dark-brown eyebrows, wide happy open smile showing a little tongue."
gen sparky "$SK Face: like 'Sparky' in the reference: excited big eyes, raised brows, very wide open grin with white top teeth and pink tongue."
gen orbit "$SK Face: like 'Orbit': amazed wide eyes looking up-right, small raised brows, small round surprised 'O' mouth with pink inside."
gen biscuit "$SK Face: like 'Biscuit': happy closed eyes drawn as upward arcs, wide open laughing smile with pink tongue, pink blush ovals on both cheeks."
gen patch "$SK Face: like 'Patch': black pirate eyepatch over the character's LEFT eye (viewer's right) with its strap going diagonally up across the forehead to the edges, other eye winking as a happy arc, big toothy grin."
gen bleep "Background: flat solid very dark navy #12192e everywhere (it is a robot's screen). Face: like 'Bleep': cute robot screen face drawn in bright lime-green chunky pixel-art lines: two happy upside-down U arc eyes and a wide U smile. Nothing else."
gen clank "$SK Face: like 'Clank': nervous worried look, eyebrows tilted up in the middle, eyes glancing sideways, awkward wide clenched grin showing white teeth with dark gaps."
gen chomps "$SK Face: like 'Chomps': eyes squeezed shut drawn as '>' and '<' shapes, huge open mouth laughing with pink tongue and small white pointy fangs on top."
gen wizzle "$SK Face: like 'Wizzle': sly smug look, half-closed confident eyes, one eyebrow raised high, mischievous lopsided smirk."
gen nana "$SK Face: like 'Nana': goofy silly face, big round eyes looking in slightly different directions, open smile with a pink tongue sticking out to one side."
gen zoom "$SK Face: like 'Zoom': confident superhero, determined eyes, strong angled eyebrows, big cocky toothy grin."
node tools/codex_image.cjs gen art/ui/src/coin.png "A single game UI icon: a shiny gold coin with a star embossed in the middle, seen almost from the front, glossy candy cartoon style like the reference (thick dark purple outline, bright yellow-orange gradient, white glossy highlight). Centered, nothing else, no background, no text." --transparent --ref art/ui/v1_candy.jpg 2>&1 | grep -i saved
node tools/codex_image.cjs gen art/ui/src/ad.png "A single game UI icon meaning 'watch a video ad for a reward': a small glossy TV screen / video player with a white play triangle in the middle, glossy candy cartoon style like the reference (thick dark purple outline, bright green-teal gradient, white glossy highlight). Centered, nothing else, no background, no text." --transparent --ref art/ui/v1_candy.jpg 2>&1 | grep -i saved
echo DONE
