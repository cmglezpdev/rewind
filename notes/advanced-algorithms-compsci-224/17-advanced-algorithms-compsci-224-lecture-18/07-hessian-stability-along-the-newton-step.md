# 7. Verifying Newton's Hypothesis: How Much the Hessian Moves

**Question being answered:** Newton's theorem demands the Hessian barely change along the optimization line. Does `f_λ` satisfy that? [`41:59`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2519), [`43:16`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2596)

## Reduce Hessians to slacks

- `∇²f_λ(x) = AᵀS(x)⁻²A` depends on `x` **only through the slack matrix `S(x)`** [`43:16`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2596), [`44:01`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2641).
- So it suffices to ask for which `x'` we have [`44:37`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2677):
  `(1−ε)S(x) ⪯ S(x') ⪯ (1+ε)S(x)`
- A student presses on this reduction; the lecturer makes it explicit: `zᵀAᵀS(x)⁻²Az = ‖S(x)⁻¹Az‖₂²` and likewise for `x'`, so if the slack matrices' eigenvalues are close, the norms of the particular vector `Az` are close for every `z` — hence spectral similarity of the Hessians **follows from spectral similarity of the slack matrices alone** [`55:30`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3330), [`56:24`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3384), [`57:00`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3420), [`57:40`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3460), [`58:06`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3486).

## From Loewner ordering to an ∞-norm condition

1. Subtract and whiten as in topic 4 [`45:18`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2718), [`45:46`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2746):
   `−εI ⪯ S(x)⁻¹(S(x') − S(x)) ⪯ εI`
2. Everything here is **diagonal**, so the condition is just that every diagonal entry has magnitude `≤ ε` [`45:46`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2746), [`46:24`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2784):
   `‖S(x)⁻¹(s(x') − s(x))‖_∞ ≤ ε`

## Bound ∞-norm by L2 and unfold the slack

- Deliberately loose step: `‖·‖_∞ ≤ ‖·‖₂` [`46:53`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2813).
- Since `s(x) = Ax − b`, the `b`'s cancel in the difference [`47:33`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2853), [`48:10`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2890):
  `s(x') − s(x) = A(x' − x)`, so the quantity is `‖S(x)⁻¹A(x' − x)‖₂`.
- The relevant `x'` is really `x_t = x₀ + t(x₁ − x₀)`, i.e. a point along the **Newton optimization line** [`48:38`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2918), [`49:11`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2951).
- Substituting `x_t − x₀ = −t(∇²f)⁻¹∇f` gives `t·‖S(x)⁻¹A(∇²f(x))⁻¹∇f(x)‖₂` [`49:11`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2951), [`49:42`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2982).

## The punchline

- That expression is **exactly `t` times the centrality at `x₀`** [`50:54`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3054), [`51:44`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3104):

  `‖S(x)⁻¹(s(x_t) − s(x))‖_∞ ≤ t · δ(x₀) ≤ δ(x₀)`

- So **the `ε` in Newton's hypothesis can be taken to be the centrality of the starting point** [`51:44`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3104), [`53:45`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3225), [`54:09`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3249).
- Starting from a coarsely central point, `δ ≤ 1/3`, so the bound is `t/3` and **Newton's conditions hold with `ε = 1/3`** [`51:44`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3104), [`52:16`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3136).

## Why `ε < 1/2` is the thing that matters

- Newton kills the error by a factor `ε/(1−ε)` per step, so to make that factor non-trivial `ε` **must be strictly below `1/2`** — `1/3` clears the bar [`53:14`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3194), [`53:31`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3211), [`53:45`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3225).
- With `ε = 1/3` the contraction factor is `(1/3)/(2/3) = 1/2` — the error is roughly halved every step, so `1/3 → 1/100` takes `O(1)` steps [`40:05`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2405), [`53:31`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3211).
- What remains unproven at this point: that a finely central point for `λ_k` really *is* coarsely central for `λ_{k+1}` — the subject of topic 8 [`52:52`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3172), [`54:38`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3278).
