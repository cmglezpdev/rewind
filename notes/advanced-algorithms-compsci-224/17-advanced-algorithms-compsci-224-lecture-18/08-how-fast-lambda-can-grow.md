# 8. How Fast Can `λ` Grow? The `1 + 1/√m` Bound

> Notation note: in this stretch the lecturer alternates between "√n" and "√m" on the board. The all-ones vector has length `m` (the number of constraints), and the final stated result is `1 + 1/√m`, so `√m` is the intended quantity throughout [`1:10:58`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4258), [`1:12:05`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4325), [`1:12:30`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4350).

## The question

- Assume `x̃(λ_k)` is **finely central** for `λ_k`: `δ_k(x̃) ≤ 1/100` [`59:09`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3549), [`1:00:10`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3610).
- Larger `λ` means `f_λ` is closer to the true LP, so we want `λ_{k+1}` as large as possible — but push too far and the point **falls off the central path** [`1:00:10`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3610), [`1:00:38`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3638).
- Take a multiplicative increase `λ_{k+1} = (1 + α)λ_k` and ask how `δ` changes [`1:01:24`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3684).

## The calculation

- Only the **gradient** depends on `λ`; the Hessian `AᵀS(x)⁻²A` does not, so the norm is unchanged [`1:01:58`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3718), [`1:02:58`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3778).
- Write `∇f_{λ_{k+1}}(x̃) = (1+α)λ_k c − AᵀS(x̃)⁻¹𝟙`, then **add and subtract `α·AᵀS(x̃)⁻¹𝟙`** so that the first group becomes exactly `(1+α)·∇f_{λ_k}(x̃)` [`1:03:22`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3802), [`1:04:40`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3880), [`1:05:39`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3939).
- Triangle inequality then gives two terms [`1:06:12`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3972), [`1:06:33`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3993):
  1. `(1 + α)·δ_k(x̃) ≤ (1 + α)/100` — harmless, `1/100` merely becomes something like `1/50`.
  2. `α · ‖AᵀS(x̃)⁻¹𝟙‖_{(AᵀS(x̃)⁻²A)⁻¹}` — the term that actually needs work.

## The projection-matrix trick

- Expanding term 2 gives `𝟙ᵀ S⁻¹A (AᵀS⁻²A)⁻¹ AᵀS⁻¹ 𝟙` [`1:07:11`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4031), [`1:07:48`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4068), [`1:08:35`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4115).
- The inner sandwich is **the orthogonal projection onto the column space of `S(x̃)⁻¹A`** — the identity only if everything is full rank, a projection in general [`1:08:35`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4115), [`1:09:34`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4174).
- General fact used: projection onto `col(A)` is `A(AᵀA)⁻¹Aᵀ`; easiest seen by taking the **SVD of `A`**, which collapses the expression to `UUᵀ` with `U` the left singular vectors [`1:10:19`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4219).
- A projection never increases length, so the whole term is at most `√(𝟙ᵀ𝟙) = √m` [`1:10:58`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4258).

## The result

- Combining [`1:11:33`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4293):

  `δ_{k+1}(x̃(λ_k)) ≤ (1 + α)·δ_k(x̃(λ_k)) + α√m ≤ (1 + α)/100 + α√m`

- Requiring this to stay under `1/3` and solving: choose **`α ≈ 1/(10√m)`**, i.e. `λ` grows by a factor `1 + Θ(1/√m)` per step, and the point stays coarsely central [`1:12:05`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4325), [`1:12:30`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4350).

## Iteration count

- Initial `λ` is roughly `exp(−L)`; the algorithm terminates once `λ ≈ m·exp(L)`, where `L` is the precision [`1:12:30`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4350).
- Multiplying by `1 + 1/√m` each round therefore takes **`≈ √m · L` iterations** of the outer loop [`1:12:52`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4372).
- That completes the main analysis of interior point; only initialization remains [`1:12:52`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4372), [`1:13:18`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4398).
