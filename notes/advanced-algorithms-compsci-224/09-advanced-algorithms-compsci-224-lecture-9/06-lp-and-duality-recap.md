# 6. Linear programming and duality recap

Prerequisite for the primal-dual framework. Primal-dual as an *algorithm design* technique (e.g. for approximation algorithms) long predates Buchbinder–Naor; their contribution is applying it to the **online** setting to bound competitive ratios ([`49:48`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2988)).

**Reference:** Buchbinder & Naor — conference version SODA 2005, journal version 2009 (an operations-research journal) ([`50:20`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3020)).

## Canonical LP form used in this lecture

```
minimize    cᵀx
subject to  Ax ≥ b
            x ≥ 0   (component-wise)
```
([`50:45`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3045), [`51:18`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3078), [`51:45`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3105), [`55:08`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3308))

- More general LPs (mixed `≤`/`≥`/`=`, no non-negativity) exist, but **any program with linear constraints converts to this form** by introducing extra variables ([`51:45`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3105), [`52:05`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3125)).
- Written out with `A` an `m × n` matrix: minimize `Σ_j c_j x_j` s.t. `Σ_j a_ij x_j ≥ b_i` for all `i ∈ [m]`, and `x_j ≥ 0` ([`54:45`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3285), [`56:02`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3362)).

## Covering and packing LPs

- **Covering LP:** the minimization form above where **all entries of `A`, `b`, `c` are non-negative** ([`52:24`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3144), [`55:38`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3338)).
- **Packing LP:** the maximization dual form with all entries non-negative ([`1:00:22`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3622)).
- **The dual of a covering LP is a packing LP** ([`1:01:00`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3660)). The framework works exactly for these two families ([`52:24`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3144)).

## Deriving the dual as "the best provable lower bound"

The dual is *motivated*, not just defined: it answers "what is a systematic way to prove that `cᵀx` cannot be made smaller than some value?" ([`53:27`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3207), [`53:46`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3226)).

Derivation ([`56:30`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3390) → [`1:00:00`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3600)):

1. Multiply constraint `i` by a multiplier `y_i ≥ 0` — non-negativity preserves the inequality direction ([`56:30`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3390)).
2. Add all `m` scaled inequalities: `yᵀAx ≥ yᵀb` ([`57:12`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3432), [`57:58`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3478)).
3. Rewrite the left side as `(Aᵀy)ᵀx` ([`58:21`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3501), [`59:06`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3546)).
4. If `Aᵀy = c`, this *is* a lower bound on `cᵀx`. It suffices that **`Aᵀy ≤ c` component-wise**, because `x ≥ 0` ([`59:06`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3546), [`59:34`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3574)).
5. Maximizing that lower bound is itself an LP — **the dual** ([`1:00:00`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3600)):

```
maximize    bᵀy
subject to  Aᵀy ≤ c
            y ≥ 0
```

## Duality theorems

- **Weak duality:** `OPT_primal ≥ OPT_dual`. This is immediate from the construction — the dual was *defined* as a lower bound on the primal ([`1:01:00`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3660), [`1:01:48`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3708), [`1:02:21`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3741)).
- **Strong duality:** when both are finite/bounded, `OPT_primal = OPT_dual`. **Not needed today**, possibly later ([`1:03:44`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3824)).

## How this will be used

Write an LP capturing the quantity to minimize (for ski rental: dollars spent). Every day's rent-or-buy decision introduces a **new constraint** that must be satisfied online. The algorithm works with the primal and the dual simultaneously and compares its primal solution against its dual solution ([`1:02:21`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3741), [`1:03:27`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3807)).
