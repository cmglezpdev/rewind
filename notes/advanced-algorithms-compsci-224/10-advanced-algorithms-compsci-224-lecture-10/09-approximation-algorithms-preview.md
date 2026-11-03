# 9. Approximation algorithms (setup for next lecture)

## The new topic

- Primal-dual **online** algorithms are done; the course moves to **approximation algorithms** — now strictly **offline** ([`1:12:17`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4337), [`1:12:46`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4366)).

## The setting

- An optimization problem whose **best known algorithm is slow** — NP-hard with exponential-time exact algorithms, or polynomial but with an impractical exponent like `n^10` ([`1:13:25`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4405)).
- The course focus will be **approximation algorithms for NP-hard problems** ([`1:13:59`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4439)).
- Target: a fast algorithm with cost **≤ α·OPT** for minimization, or value **≥ α·OPT** with `α < 1` (e.g. half of OPT) for maximization ([`1:14:22`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4462), [`1:14:59`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4499)).
- The primal-dual method for approximation algorithms is **much older** than for online algorithms — the example to come dates to the **'70s** ([`1:15:34`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4534), [`1:15:54`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4554)).
- Reference: **Vijay Vazirani, *Approximation Algorithms*** — this is a broad advanced-algorithms class, so only a slice of the field will be covered ([`1:15:54`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4554), [`1:16:20`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4580)).

## Weighted set cover, offline

- Everything is known up front; sets now carry **costs `c_S`**, and the goal is to minimize `Σ_{S chosen} c_S` while covering the universe. Previously all `c_S = 1` ([`1:16:52`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4612), [`1:17:08`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4628)).
- **Primal:** minimize `Σ_S c_S·x_S` s.t. `Σ_{S ∋ i} x_S ≥ 1` for all `i`, `x ≥ 0` ([`1:18:55`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4735)).
- **Dual:** maximize `Σ_{i=1..n} y_i` s.t. `Σ_{i ∈ S} y_i ≤ c_S` for all `S`, `y ≥ 0` ([`1:19:22`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4762)).

## The greedy algorithm

- Unit-cost version (from CS 124): repeatedly take the set covering the **most uncovered elements** ([`1:18:21`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4701), [`1:18:38`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4718)).
- Weighted generalization: while an uncovered element exists, take the `S` minimizing **`c_S / (number of new elements S covers)`** ([`1:20:08`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4808), [`1:20:56`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4856)).

## Primal-dual analysis of greedy (started)

- Start `x = y = 0`. On taking `S`: set `x_S = 1`, and for each **newly covered** element `i ∈ S` set **`y_i = c_S / (number of newly covered elements)`** ([`1:21:28`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4888)).
- Interpretation: taking `S` raises the primal objective by `c_S`, and the newly covered elements **share that cost** among their `y_i`, so the **primal and dual costs are exactly equal** ([`1:22:41`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4961), [`1:23:06`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4986)).
- The primal is obviously feasible; the dual is **not** — each constraint `Σ_{i ∈ S} y_i ≤ c_S` will be violated by at most a **`log n`** factor, to be shown next lecture ([`1:23:24`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=5004)).
- Scaling the dual down by that factor yields feasibility and proves **greedy is a `log n` approximation** ([`1:23:48`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=5028)).

## Named technique

- Deliberately violating dual feasibility and then scaling down is called **dual fitting** ([`1:24:04`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=5044)).

## Admin

- **Pset 3 due Monday night** ([`1:24:22`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=5062)).
