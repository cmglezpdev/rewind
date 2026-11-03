# 6. Optimization background: oracles, Hessian bounds, Loewner ordering

A digression into optimization, needed to explain how each iteration refines its approximate solution ([`43:35`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2615), [`44:23`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2663)).

## The setting

- Goal: iteratively compute `x* = argmin_{x ∈ ℝⁿ} f(x)` for `f : ℝⁿ → ℝ` ([`44:43`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2683)).
- **First-order method assumptions**:
  1. An **oracle** that, given `x ∈ ℝⁿ`, returns `f(x)` and `∇f(x)` ([`45:58`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2758)).
  2. A **bound on the Hessian's behaviour** — the update rule may only use the oracle's output, but the *analysis* may use the Hessian bound ([`46:56`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2816), [`57:03`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3423), [`57:26`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3446)).
- **Hessian** at `x`: the `n × n` matrix with `(∇²f(x))_{ij} = ∂²f(x)/∂xᵢ∂xⱼ` ([`46:56`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2816)).

## The Hessian condition

- Assume constants `0 < μ < L` with `μ·I ⪯ ∇²f(x) ⪯ L·I` for all `x ∈ ℝⁿ` ([`48:38`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2918), [`49:13`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2953)).
- **Loewner ordering**: `A ⪯ B` means `B − A` is positive semidefinite, equivalently `xᵀ(B − A)x ≥ 0` for all `x` ([`49:13`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2953), [`49:56`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2996), [`50:56`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3056)).
- Interpretation: the Hessian's largest eigenvalue is at most `L`, its smallest is at least `μ` — the matrix is **well-conditioned**, with no eigenvalue too large or too close to zero ([`50:30`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3030)).
- Justification sketched via the **Rayleigh quotient**: the largest eigenvalue is `max_{‖x‖=1} xᵀAx`, i.e. `xᵀAx / xᵀx` in general; comparing against `xᵀ(L·I)x = L‖x‖²` gives the eigenvalue bound. Taken on faith for this course ([`51:37`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3097), [`52:07`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3127), [`52:29`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3149), [`52:50`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3170)).

## Orders of methods

- **k-th order method** = the update rule has access to k-th order partial derivatives; using the Hessian in the update rule makes a method second order ([`57:26`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3446)).
- Interior point will use a **second-order method (Newton's)** and will *not* assume control over third-order partials — a different kind of control is used instead ([`57:44`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3464), [`58:02`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3482)).
- Newton's method is not a pure first-order method here: its update rule genuinely needs the Hessian ([`58:24`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3504)).

## What an iterative method is

- Start at `x₀ ∈ ℝⁿ`, compute `x_{k+1}` from `x_k` via an update rule, stop after some number of iterations ([`53:36`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3216)).
- **Target guarantee**: `f(x_{k+1}) − f(x*) ≤ α·( f(x_k) − f(x*) )` with `α` small ([`55:08`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3308), [`56:38`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3398)).
- By induction the error after `k` steps is multiplied by `αᵏ`, so `α < 1` means **exponentially decaying error** ([`56:38`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3398), [`57:03`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3423)).
