# 08 — Non-negative matrix factorization (NMF)

## The problem

Recovering `A` from `M` is an instance of a problem studied **independently of topic models**: non-negative matrix factorization [`57:17`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=3437).

- **Input:** matrix `M ∈ R^{n×m}` [`57:17`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=3437).
- **Output:** `A ∈ R^{n×k}` and `W ∈ R^{k×m}` with **non-negative entries** such that `M = A·W` [`58:07`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=3487).

## Why non-negativity is the binding constraint

- It is required because `A` is the topic matrix and its entries are **probabilities**; same for `W` [`58:07`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=3487), [`59:09`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=3549).
- The normalization constraint (columns summing to 1) is **without loss of generality** — if `M` is normalized, `A` and `W` can always be rescaled to match, so it is not the difficulty [`59:09`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=3549), [`59:33`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=3573).
- **Without** non-negativity the problem is routine: factoring `M` into two smaller matrices is just **rank decomposition** — set `k` = rank(M), and find it via **singular value decomposition (SVD)** [`59:33`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=3573), [`59:57`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=3597).
- **SVD does not produce non-negative factors**, and without non-negativity the parameters cannot be interpreted as probabilities [`59:57`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=3597), [`1:00:19`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=3619).

## The hardness result

**NMF is NP-hard** — a result attributed in the lecture to Vavasis [`1:00:19`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=3619).

## Which escape route applies here

Revisiting the four options from topic 04 [`1:00:19`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=3619), [`1:01:25`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=3685):

- **Average case** — arguably already there, since the problem arrived via topic modeling [`1:01:25`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=3685).
- **Approximation** — not wanted in this case [`1:01:25`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=3685).
- **Natural assumptions** — the chosen route, and the subject of the next topic [`1:01:49`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=3709).
