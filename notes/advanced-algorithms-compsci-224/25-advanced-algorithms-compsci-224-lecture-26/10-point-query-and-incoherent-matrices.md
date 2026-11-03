# 10. Point query via incoherent matrices

## The problem

- Same streaming setup: `xᵢ ← xᵢ + v` [`1:19:25`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4765).
- **Query `fᵢ(x)` asks for a single entry `xᵢ`** — there is one query function per coordinate [`1:19:25`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4765), [`1:20:10`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4810).
- Again we settle for approximation: output `xᵢ ± ε‖x‖` [`1:20:10`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4810).

## The required matrix property (incoherence)

Suppose `Π` with columns `π₁, …, πₙ` satisfies [`1:20:45`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4845):

- each `πᵢ` has **unit norm**, and
- for all `i ≠ j`, **`|⟨πᵢ, πⱼ⟩| ≤ ε`**.

## The algorithm and its error

- Sketch as usual: `y = Πx` [`1:21:32`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4892).
- **Estimator**: `x̃ᵢ = (Πᵀy)ᵢ = (ΠᵀΠx)ᵢ` [`1:21:32`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4892).
- Expanding — since `Πx = Σⱼ πⱼxⱼ` (a matrix–vector product is a linear combination of columns) —
  `x̃ᵢ = xᵢ + Σ_{j≠i} xⱼ⟨πᵢ, πⱼ⟩` [`1:21:32`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4892), [`1:22:24`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4944).
- Every inner product is bounded by `ε` in magnitude, so **`x̃ᵢ = xᵢ ± ε‖x‖₁`** [`1:22:24`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4944).

## Building such a `Π`: apply JL

- **Apply the Johnson–Lindenstrauss lemma to the point set `{0, e₁, …, eₙ}`** — the origin plus the `n` standard basis vectors [`1:22:51`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4971).
- With `N = n + 1` points, JL needs **`m = O((1/ε²)·log n)` rows** [`1:22:51`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4971).
- **Why the two properties fall out** [`1:23:26`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=5006), [`1:23:54`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=5034), [`1:24:11`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=5051):
  - Preserving pairwise distances ⇒ preserving dot products (the polarization identity again). The basis vectors have pairwise dot product `0`, so the images have dot products of magnitude at most `ε` — **incoherence**.
  - Preserving distances *to the origin* means preserving norms. Each `eᵢ` had norm `1`, so each image has norm `1 ± ε`; **renormalizing to exactly 1** barely changes the bound.
- Note that `Πeᵢ` is precisely the `i`-th column of `Π`, so this construction directly produces the columns needed [`1:22:51`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4971).

## Closing

- The lecture ends here: **"there are many more ways to use random sign matrices, but that's all I can fit into the time"** [`1:24:27`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=5067).
