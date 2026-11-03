# Screenshot judges and the limits of visual feedback

## Turning a game brief into feedback

- The initial `/goal` brief requested a browser game with Skate 3-like controls and physics, controller input that could be simulated, and a small skate park. Theo calls the command a foot gun and discourages routine use. [`14:03`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=843) [`14:25`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=865)
- He prioritized right-stick trick motions, specified camera placement and core flip tricks, and required trick-name readouts and custom animation. Blender was available for model creation. [`14:47`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=887) [`15:06`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=906)
- The subjective completion test was whether screenshots could honestly be judged visually comparable to the original Skate game. That criterion made the task evaluable by other models. [`15:06`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=906) [`15:27`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=927)

## The implemented evaluation loop

1. When the agent has a build it considers promising, capture screenshots in specified game states. [`15:27`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=927)
2. Collect comparable frames from real Skate footage and the generated game. [`16:06`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=966)
3. Ask another LLM or a panel of LLMs to compare them, explain what looks better or worse, and return feedback. [`16:06`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=966) [`17:52`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1072)
4. Revise the game and repeat until the comparison is satisfactory. Theo says this simple loop was enough to produce the demonstrated result, although he was surprised it worked. [`16:06`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=966) [`16:36`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=996)

## Limits and an unimplemented alternative

- A check must align with the actual goal. Theo says feedback can keep an agent running, but the result only resembles the desired product to the extent that the check measures the right thing. [`17:03`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1023)
- He estimates at least $800 of tokens went into making the skybox more similar. Comparing against Skate 3 also pushed the game toward a brightness he disliked, so he changed the reference to Skate 1. [`17:29`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1049)
- His stronger planned evaluator would record controller input while playing Skate 1, replay that input in the generated game, and compare behavior and sampled frames. He did not implement that approach for this version. [`16:36`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=996)
- Visual feedback did not prevent the demonstrated trick-animation regression. Screenshot similarity therefore provides incomplete evidence of gameplay correctness. [`7:06`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=426) [`17:03`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1023)
