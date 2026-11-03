# 10. Negative-cycle canceling for min-cost circulation

## The algorithm (one line)

> **While there exists a negative-cost cycle in the residual graph, augment along it.** [`1:02:25`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=3745), [`1:03:07`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=3787)

## Finding a negative cycle

- **Bellman–Ford**: `O(mn)` [`1:03:07`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=3787), [`1:03:58`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=3838).
- **Goldberg (1995)**, a **scaling algorithm**: `O(m √n log C)` — this is single-source shortest paths with possibly negative edge weights, and is **problem 2 of the current pset** (with many hints) [`1:03:58`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=3838), [`1:04:41`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=3881), [`1:05:22`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=3922).

## Correctness

1. Let `f` be the current circulation and `f★` the optimal one, and suppose `cost(f★) < cost(f)` [`1:05:47`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=3947).
2. Then `f★ − f` is (a) of **negative cost**, (b) itself a **circulation** — sums and differences of circulations are circulations — and (c) **feasible in the residual graph** [`1:06:53`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=4013), [`1:07:15`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=4035).
3. But the algorithm looks for negative **cycles**, not negative circulations. **Bridge**: every circulation **decomposes into at most `m` cycles** [`1:07:58`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=4078).
   - **How**: start at any edge with positive flow, follow it around a cycle, record the **minimum capacity** on that cycle, extract the cycle at that value. **At least one edge saturates**, so the remaining circulation has **one fewer edge**; repeat [`1:08:30`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=4110), [`1:08:56`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=4136).
4. If the total is negative, **at least one of those cycles is negative** — so the search finds one and progress is made [`1:08:56`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=4136), [`1:09:15`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=4155), [`1:09:35`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=4175).
   - Side remark: in an optimal circulation, **all** constituent cycles had better be negative — otherwise there is no point including them [`1:09:15`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=4155).

## Runtime — pseudo-polynomial

- With integer costs, each augmentation **decreases total cost by at least 1** [`1:10:15`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=4215), [`1:10:50`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=4250).
- How low can the cost be? **`m` edges × capacity ≤ `U` × cost ≥ `−C`** ⇒ at most **`mUC`** iterations [`1:10:50`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=4250).
- ⇒ **`O(mn · mUC)`** with Bellman–Ford inside — explicitly called **"the Ford–Fulkerson of min-cost circulation"**: correct, but **pseudo-polynomial** [`1:10:50`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=4250).
- This motivates everything that follows [`1:11:24`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=4284).
