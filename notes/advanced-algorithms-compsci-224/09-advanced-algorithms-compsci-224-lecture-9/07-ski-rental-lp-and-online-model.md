# 7. Ski rental as an LP, and what "online" means for an LP

## The problem instance

Skiing lasts `K` days (unknown in advance); **renting costs \$1/day, buying costs `B`** ([`1:04:19`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3859)).

Variables ([`1:04:19`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3859), [`1:05:10`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3910)):

- `x ∈ {0,1}` — did we buy the skis?
- `z_i ∈ {0,1}` — did we rent on day `i`?

## The primal (covering LP)

```
minimize    B·x + Σ_{i=1}^{K} z_i
subject to  x + z_i ≥ 1     for all i = 1..K   (each day: bought, or rented that day)
            x ≥ 0,  z_i ≥ 0
```
([`1:05:10`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3910), [`1:05:40`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3940), [`1:06:16`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3976))

- Integrality constraints (`x, z_i ∈ {0,1}`) are **not allowed in an LP**, so the problem is **relaxed** to non-negativity. The relaxation no longer exactly captures ski rental ([`1:05:40`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3940), [`1:06:16`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3976)).
- All coefficients non-negative → it is a **covering LP** ([`1:06:16`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3976)).

## The dual (packing LP)

Obtained mechanically (right-hand side becomes the objective, `Aᵀ`, etc.) ([`1:06:16`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3976)):

```
maximize    Σ_{i=1}^{K} y_i
subject to  Σ_{i=1}^{K} y_i ≤ B
            y_i ≤ 1          for all i
            y ≥ 0
```
([`1:07:01`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4021), [`1:07:32`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4052))

**Key correspondence:** every primal constraint becomes a dual variable, and every dual constraint corresponds to a primal variable — `y_i ≤ 1` ↔ `z_i`, and `Σ y_i ≤ B` ↔ `x` ([`1:19:46`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4786), [`1:20:19`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4819), [`1:21:25`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4885)).

## The online LP model

The LP as written does not encode time — it never says *when* you bought ([`1:07:56`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4076), [`1:08:23`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4103)). Time enters through the **arrival model** ([`1:08:23`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4103), [`1:08:51`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4131), [`1:09:12`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4152)):

1. **Rows of `A` arrive one at a time** — not new LPs, just additional constraints on the same LP.
2. Each arriving constraint must be **satisfied immediately** by setting variables.
3. **Variables start at 0 and are monotonically non-decreasing** — you can never undo a past decision ([`1:09:38`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4178)).

Without rule 3 the model is vacuous: you could simply re-solve the LP from scratch at every step ([`1:09:12`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4152)). Concretely, monotonicity forbids "I rented on day `i`, but actually let me retroactively set `z_i = 0` and buy instead" ([`1:09:38`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4178), [`1:10:32`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4232)).

## Fractional vs. integral solutions

- LP variables may be **fractional**, and the `e/(e-1)` randomized algorithm will *depend* on setting them fractionally ([`1:10:32`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4232), [`1:10:52`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4252)).
- But "renting a third of a ski" is meaningless, so you must maintain **two** solutions online: a fractional LP solution, and an integral solution that makes sense for the actual problem ([`1:10:52`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4252), [`1:11:18`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4278)).
- **Standard recipe:** first solve the fractional problem online, then show the fractional solution can be rounded online into an integral one that is not much worse ([`1:11:50`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4310), [`1:12:14`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4334)).
