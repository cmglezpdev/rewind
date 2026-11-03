# 7. Gradient descent: where it comes from and how fast it converges

Gradient descent is the worked example of a first-order update rule, chosen because few students had seen it analyzed rigorously ([`58:42`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3522), [`59:49`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3589)).

## Step 1 — Taylor with explicit remainder

- For `x₀, x₁ ∈ ℝⁿ` define `x_t = x₀ + t(x₁ − x₀)`, so `t = 0` gives `x₀` and `t = 1` gives `x₁` ([`1:00:08`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3608), [`1:01:06`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3666)).
- Taylor's theorem with remainder (stated, not proved — any calculus text has it):
  `f(x₁) = f(x₀) + ∇f(x₀)·(x₁ − x₀) + ∫₀¹∫₀ᵗ (x₁−x₀)ᵀ ∇²f(x_α) (x₁−x₀) dα dt` ([`1:01:06`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3666), [`1:01:44`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3704), [`1:02:02`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3722)).

## Step 2 — Bound the remainder with the Hessian upper bound

- Since `∇²f ⪯ L·I`, each quadratic form is at most `L‖x₁ − x₀‖₂²` ([`1:02:55`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3775), [`1:03:22`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3802)).
- Integrating `α` from `0` to `t` gives `t`; integrating `t` from `0` to `1` gives `1/2`. Result — **inequality (⋆)**:
  `f(x₁) ≤ f(x₀) + ∇f(x₀)·(x₁ − x₀) + (L/2)‖x₁ − x₀‖₂²` ([`1:03:48`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3828), [`1:04:14`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3854)).

## Step 3 — The update rule

- **Gradient descent = minimize the right-hand side of (⋆)**; that is the entire derivation, obtained by calculus ([`1:04:42`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3882), [`1:17:14`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4634), [`1:17:42`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4662)).
- The move is a scaled step against the gradient from `x₀` (a student catches that the gradient must be scaled, not squared, in the update itself) ([`1:04:42`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3882), [`1:05:53`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3953)).
- **Progress bound**: `f(x₁) ≤ f(x₀) − (1/2L)·‖∇f(x₀)‖₂²` ([`1:06:26`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3986)).
- The motivation for a lower Hessian bound appears here: without it, the gradient term could be zero or tiny and no progress is guaranteed ([`1:07:01`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4021)).

## Step 4 — Lower bound via the strong-convexity side

- Flipping the inequality direction swaps `L` for `μ`: for all `x, y`,
  `f(y) ≥ f(x) + ∇f(x)·(y − x) + (μ/2)‖x − y‖₂²` ([`1:08:31`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4111), [`1:08:55`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4135), [`1:09:43`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4183)).
- Minimizing the right-hand side over `y` (again pure calculus) gives `f(x*) ≥ f(x) − (1/2μ)‖∇f(x)‖²` ([`1:10:24`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4224), [`1:10:50`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4250)).
- Rearranged at `x = x_k`: **`‖∇f(x_k)‖² ≥ 2μ·( f(x_k) − f(x*) )`** — the gradient cannot be small while the error is large ([`1:11:36`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4296), [`1:12:29`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4349), [`1:13:08`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4388)).

## Step 5 — Combine

- Subtract `f(x*)` from the progress bound: `f(x_{k+1}) − f(x*) ≤ f(x_k) − f(x*) − (1/2L)‖∇f(x_k)‖²` ([`1:13:54`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4434), [`1:14:44`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4484)).
- Substituting the gradient lower bound yields the **convergence rate**:
  **`f(x_{k+1}) − f(x*) ≤ (1 − μ/L)·( f(x_k) − f(x*) )`**, i.e. `α = 1 − μ/L` ([`1:15:22`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4522), [`1:15:53`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4553)).
- The guarantee is governed entirely by the conditioning ratio `μ/L`: the larger `μ/L`, the better the per-step contraction ([`1:15:53`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4553), [`1:16:22`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4582)).

## Iteration counts

- Using `(1 − 1/x)^x ≈ 1/e`: halving the error needs **`O(L/μ)` iterations** ([`1:19:07`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4747), [`1:19:34`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4774), [`1:20:03`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4803)).
- Reducing error from `δ` to `ε·δ` needs **`O( (L/μ)·log(1/ε) )` iterations** ([`1:20:03`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4803)).
