# 8. Preview: Amortized Analysis and Fibonacci Heaps

Hashing ends here; the course moves to data structures ([`1:16:13`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4573)).

## What is coming

- **Data structures and amortized analysis**, including **potential function arguments** ([`1:17:23`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4643), [`1:18:18`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4698)).
- **Binomial heaps and Fibonacci heaps** — likely Thursday ([`1:17:23`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4643)).
- **Splay trees** — the following week ([`1:17:23`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4643)).

## The heap interface

Store `n` items with **comparable keys**, supporting ([`1:18:45`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4725), [`1:19:26`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4766)):

- `insert(item, key)`
- `decrease-key(x, k)` where `k ≤ key(x)`
- `delete-min()` — returns and removes the minimum

## Why it matters: Dijkstra

For a graph with `n` vertices and `m` edges ([`1:19:26`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4766)):

```
cost = m · insert + m · decrease-key + n · delete-min
```

| Heap | insert | decrease-key | delete-min | Dijkstra total |
| --- | --- | --- | --- | --- |
| Binary heap (CS 124 material) | `log n` | `log n` | `log n` | `(m + n) log n → m log n` on a connected graph ([`1:20:28`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4828), [`1:20:45`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4845)) |
| **Fibonacci heap** | `O(1)` | `O(1)` | `O(log n)` | **`m + n log n`** ([`1:20:45`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4845)) |

- The payoff: a speed-up for **single-source shortest paths with non-negative edge weights**, and for **all-pairs shortest paths** when Dijkstra is run `n` times ([`1:20:45`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4845)).

## Course logistics mentioned

- A **"how many hours did you spend"** poll will be added to Piazza from pset 2 onward ([`0:01`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1), [`0:16`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=16)).
- **Half-TF** positions available — contact after lecture ([`33:32`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2012)).
- **Grading duty**: once per student per semester; pset 1 has three problems (TF plus two students), assigned **first come, first served** like scribing ([`33:49`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2029), [`34:05`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2045)).
