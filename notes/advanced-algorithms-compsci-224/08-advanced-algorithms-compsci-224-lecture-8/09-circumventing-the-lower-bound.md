# 9. Circumventing the `k` lower bound

`k`-competitive is useless advice for a large cache, so the lecture lists **three escape routes** ([`1:06:11`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3971), [`1:07:41`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4061)).

## 1. Limited associativity

- Real caches are often only **partially associative**: a given page may live in only a few slots ([`1:08:08`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4088)).
- Then the competitive ratio scales with the **associativity**, not the full cache size — a much smaller number ([`1:08:36`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4116)).
- Fully non-associative caches leave nothing to analyse ([`1:08:08`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4088)).

## 2. Resource augmentation

- Also introduced in Sleator–Tarjan: give **the algorithm `k` slots and OPT only `k′ ≤ k` slots** ([`1:08:54`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4134)).
- **Result:** LRU and FIFO are `k / (k − k′ + 1)`-competitive ([`1:09:41`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4181)).
- Consequence: with `k′ = k/2`, LRU is roughly **2-competitive** against the halved-memory adversary — weakening the omniscient adversary slightly buys a much better ratio ([`1:09:41`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4181), [`1:10:20`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4220)).

## 3. Randomization — and which adversary you face

- The lower bound relies on an adversary who **knows what you will evict**; a random victim breaks that construction ([`1:10:48`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4248)).
- So one must classify adversaries ([`1:11:28`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4288)):

| Adversary | Knowledge | Effect on randomization |
| --- | --- | --- |
| **Omniscient** | Knows everything, including **future** coin flips ([`1:11:28`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4288)) | You are effectively deterministic; randomness does not help ([`1:12:08`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4328)) |
| **Adaptive** | Knows **past** coin flips and all past accesses; picks the next request from that ([`1:12:08`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4328), [`1:12:35`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4355)) | Still hopeless: it knows what is *not* in your cache right now and asks for it ([`1:13:16`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4396)) |
| **Oblivious** | Fixes the whole sequence `S` **before any coin is flipped**; not trying to hurt you ([`1:12:35`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4355), [`1:13:16`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4396)) | The `k` lower bound says **nothing** here — this is where randomization pays ([`1:14:20`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4460)) |
