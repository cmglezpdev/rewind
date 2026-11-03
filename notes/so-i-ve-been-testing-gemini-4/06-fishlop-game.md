# Fishlop: visuals versus game-system reasoning

## Controlled game prompt and first attempt

- Theo uses the same Fishlop game prompt, setup, and tools as with other models. Gemini implements the full five-tank progression, but the initial water rendering is broken and the submarine model disappoints him. [`16:59`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1019) [`17:26`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1046)
- Fish animation and eye direction are reasonable. Visual competence does not prevent failures in the game's interacting mechanics. [`17:53`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1073) [`18:07`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1087)

## Feeding failure and revision

1. Food falls to the floor without expiring, and fish cannot successfully eat it there. [`18:07`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1087)
2. Uneaten food keeps occupying the limited food allowance, preventing replacement feeding; fish remain at the bottom trying to eat and eventually die. [`18:32`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1112)
3. Theo asks for fixes to feeding, water shimmer, and graphics. The next version looks better and repairs enough feeding behavior to become playable, but leaves the submarine model unchanged. [`18:54`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1134) [`19:20`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1160)

## A mechanic that exists but cannot help

- Monsters spawn every 60 seconds. Clearing a wave drops a power-up lasting 30 seconds. An attack boost therefore expires before the next monsters arrive, leaving no targets during its active window. [`20:13`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1213)
- Theo calls this a failure to reason about the whole game system. The attack boost is a plausible local feature whose timing makes it useless. [`20:49`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1249) [`21:11`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1271)
- He explicitly distinguishes this design mistake from hallucination. His broader interpretation is that 3D ability can be trained separately and does not demonstrate general understanding. That training explanation is his interpretation, not evidence about Gemini's architecture. [`19:50`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1190) [`21:11`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1271)
