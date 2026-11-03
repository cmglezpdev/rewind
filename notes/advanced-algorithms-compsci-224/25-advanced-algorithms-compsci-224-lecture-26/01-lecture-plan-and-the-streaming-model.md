# 1. Lecture plan and the streaming model

## What this final lecture covers

- Title the lecturer gives the day: **"the power of random signs"** — one matrix construction reused across four problems [`0:03`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3).
- The four applications [`0:03`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3), [`1:28`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=88):
  1. L2-norm estimation in a stream
  2. Fast least-squares regression
  3. Point query
  4. Dimensionality reduction
- Caveat: all of these are covered in depth in **CS 229R, Algorithms for Big Data**; this lecture gives a taste and **skips most proofs** [`1:28`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=88).

## The streaming model (recap from the previous lecture)

- A vector `x ∈ ℝⁿ` with `n` huge; we want to compute `f(x)` **without storing `x`** [`2:19`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=139).
- `x` starts as the zero vector, and updates arrive as `xᵢ ← xᵢ + v`; queries ask for `f(x)` [`2:49`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=169).
- **Last lecture's restriction**: `v` was always `1` (insert-only), and `f(x)` was the support size of `x` — the **distinct-elements** problem, solved non-trivially under an idealized hash function [`2:49`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=169), [`3:31`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=211).
- **This lecture's target function**: `f(x) = ‖x‖₂²`. Estimating it to `1 ± ε` gives `‖x‖₂` to roughly `1 ± ε` by taking a square root [`3:53`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=233).
- The algorithm shown is due to **Alon–Matias–Szegedy (AMS)** [`4:21`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=261).

## The unavoidable price: randomization *and* approximation

- As with support size, **sublinear space is impossible unless you accept both** randomization and approximation [`4:21`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=261).
- Concretely, the output is within `1 ± ε` (say 1% error) and the algorithm fails with some small probability (say 1%) [`5:05`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=305).
