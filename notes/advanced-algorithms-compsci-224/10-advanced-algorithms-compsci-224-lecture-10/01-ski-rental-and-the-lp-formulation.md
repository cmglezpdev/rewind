# 1. Ski rental: goal and LP formulation

## Where the lecture starts

- The session finishes the **primal-dual method for online algorithms** and then sets up **approximation algorithms** as the next topic ([`0:00`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=0)).
- Ski rental recap: renting costs **$1/day**, buying costs **$b** once; a deterministic **2-competitive** algorithm was shown in the previous lecture ([`0:29`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=29)).

## The target bound

- Today's goal is a **randomized** algorithm with competitive ratio exactly `1 + 1/((1 + 1/b)^b − 1)` ([`1:00`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=60)).
- Since `(1 + 1/b)^b → e` for large `b`, the ratio tends to **e/(e − 1) ≈ 1.58** ([`1:46`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=106)).
- The ratio is always **at least e/(e − 1)** and decreases toward it; the worst case is `b = 1`, which gives **2**. `b ≥ 1` always, otherwise you would never rent ([`2:18`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=138), [`2:32`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=152)).

## Attribution

- The bound is due to **Karlin et al., Algorithmica '94**, but it will be re-derived here through a primal-dual lens ([`2:32`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=152)).
- The primal-dual approach to online algorithms is due to **Buchbinder and Naor ('05)**, later expanded in their book (~'07/'09) where ski rental is one worked example ([`3:21`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=201)).

## The online model

- We face a **covering LP**. Constraints arrive **one at a time**; if an arriving constraint is violated we must immediately raise variables to satisfy it, and variables must be **monotonically non-decreasing** over time ([`3:55`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=235)).

## The primal LP (ski rental, `k` days)

- Minimize `b·x + Σ_{i=1..k} z_i`, where `x` = fraction of skis bought and `z_i` = renting on day `i` ([`4:14`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=254)).
- Constraints: for every day `i`, `x + z_i ≥ 1`; plus `x ≥ 0`, `z_i ≥ 0` ([`4:42`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=282)).
- **`k` is not known in advance** ([`4:42`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=282)).

## The dual LP

- Duality bookkeeping: primal constraints become dual variables; the primal right-hand side becomes the dual objective ([`5:16`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=316)).
- Maximize `Σ_{i=1..k} y_i` subject to `Σ_{i=1..k} y_i ≤ b` and `0 ≤ y_i ≤ 1` for all `i` ([`5:36`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=336)).

## The plan

- Build **both** primal and dual solutions online, keep **both feasible**, and show the primal objective is not much larger than the dual ([`6:15`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=375)).
- Intuition for `y_i` (asked from the floor): in this construction each `y_i` is **0 or 1** — it is 1 on the days you rent and 0 afterwards ([`6:38`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=398), [`7:14`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=434)).
- A more intuitive reading of the duals is promised for the **set cover approximation algorithm** later ([`7:43`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=463)).
