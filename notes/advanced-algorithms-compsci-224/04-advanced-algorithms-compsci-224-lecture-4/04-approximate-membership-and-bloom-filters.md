# 4. Approximate Membership and Bloom Filters

A different problem from dictionaries: the **membership problem**. [`48:12`](https://www.youtube.com/watch?v=edOWKZE1t84&t=2892) [`48:42`](https://www.youtube.com/watch?v=edOWKZE1t84&t=2922)

## Problem statement

- Maintain `S ⊆ U` under two operations: [`48:42`](https://www.youtube.com/watch?v=edOWKZE1t84&t=2922)
  - `update(x)`: `S ← S ∪ {x}` (**insertions only**, no deletions). [`49:14`](https://www.youtube.com/watch?v=edOWKZE1t84&t=2954) [`52:27`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3147)
  - `query(x)`: is `x ∈ S`? [`49:14`](https://www.youtube.com/watch?v=edOWKZE1t84&t=2954)
- **No values, only keys** — unlike dictionaries, which associate values with keys. [`49:14`](https://www.youtube.com/watch?v=edOWKZE1t84&t=2954)
- **The space goal drives everything:** dictionaries use `n` *words* (`≈ n log|U|` bits); membership aims for `n` *bits*. [`49:57`](https://www.youtube.com/watch?v=edOWKZE1t84&t=2997)

## The relaxation: allow false positives

- `x ∈ S` ⇒ `Pr[query(x) = 1] = 1` (**no false negatives**). [`50:20`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3020)
- `x ∉ S` ⇒ `Pr[query(x) = 1] ≤ 1/2`. [`50:55`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3055)

## The basic single-array solution

Assume `n` is known and the problem is static. [`52:27`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3147)

- A **bit array** `A` of length `m = 2n` (not an array of words). [`52:49`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3169) [`53:13`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3193)
- `update(x)`: set `A[h(x)] ← 1`. [`55:32`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3332) [`55:59`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3359)
- `query(x)`: output `A[h(x)]` — **one bit**, not two. [`55:31`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3331) [`55:59`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3359)

**Correctness:**

- No false negatives is immediate: the bit was set on insertion. [`53:39`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3219)
- For `x ∉ S`, a false positive means `∃ y ∈ S` with `h(x) = h(y)`. [`54:18`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3258)
- **Union bound** over the `n` candidates `y`, each colliding with probability `1/m`: `n · (1/m) = 1/2`. [`54:50`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3290) [`56:56`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3416)
- **Only 2-wise independence is needed**, because every argument reasons about exactly two hash evaluations at a time. [`1:05:33`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3933) [`1:05:54`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3954)

## Driving the error rate down to ε

A 50% false-positive rate is unusable in practice — a user wants 0.01%, not 50%. [`56:56`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3416) [`57:27`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3447)

Two options are proposed by the class:

| Approach | Space | Query time |
|---|---|---|
| **Widen the array** to `m = n/ε` (so `n/m = ε`) [`58:22`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3502) [`58:35`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3515) | `n/ε` bits | `O(1)` |
| **`log(1/ε)` independent copies**, each of length `m = 2n` [`58:45`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3525) | `n·log(1/ε)` bits | `O(log 1/ε)` |

The repetition scheme — **this is the Bloom filter**: [`58:45`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3525) [`1:00:21`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3621)

- `k = log(1/ε)` hash functions `h_1 … h_k`, one per bit array. [`58:45`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3525)
- Update writes into **every** array; query answers yes only if **all** `k` bits are set. [`59:16`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3556)
- To be fooled you must be fooled `k` times: `2^{-k} = ε`. [`59:41`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3581)
- Repeating the *same* query on the *same* structure always returns the same answer — boosting requires genuinely independent copies. [`52:03`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3123) [`52:14`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3134)
- Due to **Bloom, 1970**. More sophisticated variants get query time down to constant and support deletions, but are not covered. [`1:00:21`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3621) [`1:00:39`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3639)
