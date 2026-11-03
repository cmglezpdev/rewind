# Skate 3 Bench: a playable game built by agents

## Why change the benchmark?

- The original SkateBench asks models to identify skateboard tricks from descriptions. Theo created a private second version after observing perfect answers on public questions alongside failures on unseen questions, which he interpreted as benchmark contamination. [`4:15`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=255) [`4:46`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=286)
- He says Gemini 4 Argan then scored perfectly on the private version, motivating a harder task. This is his reported observation, with the model name preserved as transcribed. [`4:46`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=286)
- Skate 3 Bench changes the task entirely: Claude builds a new game and engine inspired by the Skate games, rather than naming tricks or porting an existing game. [`5:41`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=341)

## Scope and result

- The thread ran for four days with only 25 prompts from Theo, mostly continuation requests after machine reboots. He estimates nearly $5,000 of inference-equivalent usage and reports over 12 billion tokens. These are the transcript's figures; it supplies no accounting breakdown that reconciles them. [`5:09`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=309) [`5:41`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=341)
- Theo specified preferred controls, park contents, and gameplay requirements. Claude apparently obtained a rough human model for Blender and customized it. [`6:08`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=368)
- The demonstrated game runs in a browser using a Three.js-based engine. Its right-stick flick motions determine tricks, recreating a central control mechanic of Skate. [`6:39`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=399)
- Theo judges the game playable and its physics surprisingly decent. It still has regressions, including a broken inward heelflip animation. His quality assessment is subjective. [`6:39`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=399) [`7:06`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=426)

## Distinguish creation from reconstruction

- He contrasts his project with Skate 3 Rust Engine, a separate effort to reconstruct Skate 3 from decompiled code in Bevy. [`7:28`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=448)
- A reconstruction has existing behavior to match. His new game instead needed an evaluation method for how it looked and felt, leading to the screenshot judges in [topic 4](04-screenshot-judges.md). [`8:03`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=483) [`15:27`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=927)
