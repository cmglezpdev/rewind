# Why switching models can lose access to skills

## The reported failure

1. Users run Claude through T3 Code and see their existing skills work. [`40:30`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=2430)
2. They switch to Codex and find that those skills are missing, then look for a T3 Code skills setting. [`40:30`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=2430)
3. Theo asks whether they configured the skills in Codex. Their expectation was that changing the model would preserve everything automatically. [`41:06`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=2466)

## What changed underneath

- Theo says T3 Code's apparent model picker is a harness picker. Moving between providers can change the harness, with its own tools, skills, plugins, and configuration. [`41:29`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=2489) [`41:52`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=2512)
- Adopting T3 Code replaces the human interface around a bundled model-and-harness product. It does not automatically transfer one harness's configuration into all the others. [`42:26`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=2546)
- His analogy is a food court: one interface offers access to several kitchens, but selecting a different kitchen changes what it can supply. [`41:29`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=2489)

## Product implication

- Theo sees the confusion as evidence that the abstraction is working: users have stopped thinking about the underlying harness. That also makes consistent access to capabilities T3 Code's problem to solve. [`41:06`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=2466) [`41:52`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=2512) [`42:54`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=2574)
- His desired experience is to switch harnesses as readily as changing a model identifier, without relearning the interface whenever the best available model changes. He presents this as a direction for the product, not a claim that all configuration already transfers. [`42:54`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=2574) [`43:19`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=2599)
