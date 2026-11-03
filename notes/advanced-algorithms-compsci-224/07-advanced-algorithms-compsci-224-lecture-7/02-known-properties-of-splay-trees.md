# 2. The Known Properties of Splay Trees

The lecture catalogues the "amazing properties" splay trees satisfy *without knowing the future* — the reason the structure is interesting beyond its O(log n) amortized bound [`10:35`](https://www.youtube.com/watch?v=LbX51mey3vo&t=635).

Convention used throughout: the `n` keys are assumed to be exactly `1, 2, …, n`, since only relative order matters in a comparison-based structure [`16:32`](https://www.youtube.com/watch?v=LbX51mey3vo&t=992).

## Static optimality — Sleator & Tarjan 1985

- For **any** sequence of operations and **any fixed** binary search tree `T`, the time a splay tree takes is **O(time taken by `T`)** [`10:35`](https://www.youtube.com/watch?v=LbX51mey3vo&t=635), [`11:18`](https://www.youtube.com/watch?v=LbX51mey3vo&t=678).
- The comparison tree can be the *offline optimum*: given the whole future access sequence, the best static BST can be computed by **dynamic programming** (CLRS; CS124 notes) [`12:20`](https://www.youtube.com/watch?v=LbX51mey3vo&t=740), [`12:53`](https://www.youtube.com/watch?v=LbX51mey3vo&t=773).
- The punchline: splay trees **do not know the future** yet stay within a constant factor of the best tree for that sequence [`13:07`](https://www.youtube.com/watch?v=LbX51mey3vo&t=787), [`13:23`](https://www.youtube.com/watch?v=LbX51mey3vo&t=803).

## Working set property — Sleator & Tarjan 1985

- Define `t_j` = the number of **distinct items accessed since the last access** to the `j`-th item in the sequence [`13:52`](https://www.youtube.com/watch?v=LbX51mey3vo&t=832), [`14:39`](https://www.youtube.com/watch?v=LbX51mey3vo&t=879), [`15:02`](https://www.youtube.com/watch?v=LbX51mey3vo&t=902).
- Bound achieved: **O(m + n log n + Σ_{j=1..m} log t_j)** [`15:02`](https://www.youtube.com/watch?v=LbX51mey3vo&t=902), [`15:35`](https://www.youtube.com/watch?v=LbX51mey3vo&t=935).
- Interpretation: the cost is log of the *recency* rank, not log `n`. Hammering the same 10 nodes repeatedly costs ~log 10 per access — those 10 nodes are the "working set" [`15:35`](https://www.youtube.com/watch?v=LbX51mey3vo&t=935).

## Static finger property — Sleator & Tarjan 1985

- Fix any item `f`. The amortized cost of `find(i)` is **O(log(|f − i| + 1))**, and this holds for every `f`, hence for the best (minimizing) `f` [`16:04`](https://www.youtube.com/watch?v=LbX51mey3vo&t=964), [`16:32`](https://www.youtube.com/watch?v=LbX51mey3vo&t=992), [`17:10`](https://www.youtube.com/watch?v=LbX51mey3vo&t=1030).
- The `+1` guarantees the bound is at least constant when `i = f` [`18:35`](https://www.youtube.com/watch?v=LbX51mey3vo&t=1115).
- Meaning: if most searches cluster near a fixed key `f`, the sequence is serviced cheaply — cost is log of the distance to `f` [`18:17`](https://www.youtube.com/watch?v=LbX51mey3vo&t=1097), [`18:53`](https://www.youtube.com/watch?v=LbX51mey3vo&t=1133).

## Dynamic finger property — Cole, Mishra, Schmidt & Sigal; Cole (SICOMP 2000)

- Not due to Sleator & Tarjan. Two companion papers: Cole–Mishra–Schmidt–Sigal, and Cole alone [`18:53`](https://www.youtube.com/watch?v=LbX51mey3vo&t=1133), [`19:19`](https://www.youtube.com/watch?v=LbX51mey3vo&t=1159).
- For a sequence `x_1, …, x_m`, the amortized cost of the `i`-th operation is **O(log(|x_i − x_{i−1}| + 1))** [`19:19`](https://www.youtube.com/watch?v=LbX51mey3vo&t=1159).
- Difference from static finger: the "finger" **moves to the last item searched** instead of staying pinned at `f` [`20:26`](https://www.youtube.com/watch?v=LbX51mey3vo&t=1226).
- The proof is **more than 100 pages** — explicitly not covered in class [`20:26`](https://www.youtube.com/watch?v=LbX51mey3vo&t=1226), [`20:46`](https://www.youtube.com/watch?v=LbX51mey3vo&t=1246).

## Unified bound — Iacono 2001 (open for splay trees)

- Attempts to **combine** the working set and finger properties: amortized cost of operation `j` should be **O(min_{i<j} log(|x_i − x_j| + (j − i)))** [`21:47`](https://www.youtube.com/watch?v=LbX51mey3vo&t=1307), [`22:16`](https://www.youtube.com/watch?v=LbX51mey3vo&t=1336), [`23:16`](https://www.youtube.com/watch?v=LbX51mey3vo&t=1396).
- Intuition: you are cheap if there exists an earlier access that was both **spatially close** and **not too far in the past** [`23:16`](https://www.youtube.com/watch?v=LbX51mey3vo&t=1396).
- Status [`23:16`](https://www.youtube.com/watch?v=LbX51mey3vo&t=1396), [`23:44`](https://www.youtube.com/watch?v=LbX51mey3vo&t=1424):
  - It is **not known** whether splay trees achieve it.
  - It is **not known** whether *any* BST-model structure achieves it — an open problem.
  - Iacono gives a structure that does achieve it, but it is **not** a BST / does not operate in the BST model.
- Closest BST-model result: **Derryberry & Sleator (2009)** service `m` operations in **O(m log log n + unified bound)**; the goal would be `m` rather than `m log log n` [`23:44`](https://www.youtube.com/watch?v=LbX51mey3vo&t=1424), [`24:28`](https://www.youtube.com/watch?v=LbX51mey3vo&t=1468), [`24:56`](https://www.youtube.com/watch?v=LbX51mey3vo&t=1496).

## Aside: Tarjan-style research

- The algorithms and data structures themselves are simple; the **analysis** carries all the difficulty [`20:46`](https://www.youtube.com/watch?v=LbX51mey3vo&t=1246).
- Argued as a virtue for implementers: a proof is done once, but an implementation is ported, tweaked, and debugged repeatedly — so complicated structures are a liability [`21:18`](https://www.youtube.com/watch?v=LbX51mey3vo&t=1278).
