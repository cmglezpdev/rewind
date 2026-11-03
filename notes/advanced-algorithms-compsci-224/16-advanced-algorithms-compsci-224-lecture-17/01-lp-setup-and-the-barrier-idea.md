# 1. LP setup and the barrier-function idea

## The problem being solved

- The lecture covers the **interior point method (IPM)**, a method for convex programs, presented here only for **linear programming**; introduced for LPs by **Karmarkar, Combinatorica 1984** ([`1:35`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=95), [`2:36`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=156)).
- Standard form used throughout: minimize `cᵀx` subject to `Ax ≥ b` coordinate-wise, with `A` an `m × n` matrix, `b ∈ ℝᵐ`, `x ∈ ℝⁿ` ([`2:36`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=156), [`3:18`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=198)).
- Feasible region `P = { x : Ax ≥ b }` ([`6:35`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=395)).

## The penalized objective

- Instead of the LP directly, IPM minimizes `f_λ(x) = λ·cᵀx + p(s(x))` ([`3:18`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=198)).
- **Slack**: `s(x)ᵢ = aᵢ·x − bᵢ`, where `aᵢ` is the i-th row of `A`; for any feasible `x` each slack is a non-negative real, and the vector of them is the **slack vector** ([`4:14`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=254), [`4:44`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=284)).
- **Barrier function** `p`: required to blow up to `+∞` whenever any slack `s(x)ᵢ → 0` ([`4:44`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=284)).
  - A zero slack means sitting on the boundary of the feasible region, so the penalty keeps iterates away from the boundary — hence the name *barrier*, and hence *interior* point method ([`5:16`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=316), [`5:39`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=339)).
- The concrete barrier chosen in this lecture: `p(s(x)) = − Σᵢ₌₁ᵐ log s(x)ᵢ`, picked because its properties make the analysis work; it satisfies the blow-up requirement since `log 0 = −∞` and the minus sign flips it to `+∞` ([`21:52`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1312), [`22:22`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1342)).

## What the parameter λ controls

- Let `x_λ = argmin f_λ`. Two limits ([`6:00`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=360), [`6:35`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=395)):
  - `λ → 0`: the cost vector `c` stops mattering; `x_λ` tends to the **analytic center** of `P`.
  - `λ → ∞`: `x_λ → x*`, the LP minimizer.

## Uniqueness of the optimal vertex

- The analysis assumes that a feasible, bounded LP has a **unique** optimal vertex ([`7:09`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=429)).
- Standard trick to force this: the LP entries carry `L` bits of precision, so add random noise to the cost vector at the `10L`-th bit and beyond; that perturbation makes the optimal vertex unique ([`7:30`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=450), [`7:52`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=472)).
- The lecturer deliberately skips precision minutiae and defers them to links in the course notes ([`7:52`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=472)).
