# 9. Amortized analysis of Fibonacci heaps

## Claim

```
t_insert       = O(1)      amortized
t_decrease-key = O(1)      amortized
t_delete-min   = O(log n)  amortized
```

[`59:50`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3590)

## The potential function

```
Φ(H) = trees(H) + 2 · marks(H)
```

where `trees(H)` is the number of top-level trees and `marks(H)` the number of marked nodes [`1:00:59`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3659), [`1:02:05`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3725).

- Origin of such functions: they are **engineered to make the proof work**. Look at what changes after an operation — the tree count, and which nodes gain or lose marks — then pick constants that bound everything by the target [`1:02:05`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3725), [`1:02:36`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3756), [`1:02:53`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3773).

## Insert

- Actual cost: `O(1)` — append to the root list [`1:03:18`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3798).
- `Δtrees = +1`, `Δmarks = 0`, so `ΔΦ = 1` [`1:04:00`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3840).
- **Amortized: constant** [`1:04:00`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3840).

## Delete-min

- Actual cost: `O(t)` where `t` is the number of trees — the entire root list is scanned to find the min and to consolidate [`1:04:32`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3872), [`1:05:21`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3921).
  - A pointer to the min *can* be maintained, but is unnecessary since the walk happens anyway [`1:04:32`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3872), [`1:05:21`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3921).
- `Δmarks ≤ 0`: delete-min marks nothing, and the deleted min might itself have been marked [`1:06:00`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3960), [`1:06:22`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3982), [`1:06:42`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4002).
- `Δtrees = t' − t`, so the `t` terms cancel and the amortized cost is `O(t')` [`1:06:42`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4002).
- Consolidation **re-enforces the binomial-heap invariant** of at most one tree per rank, so `t' ≤ max rank ≤ O(log n)` via the Fibonacci growth bound [`1:06:42`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4002), [`1:07:27`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4047), [`1:07:49`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4069).
- **Amortized: `O(log n)`.**

## Decrease-key

**Case 1 — no cut** (the new key does not violate heap order) [`1:08:07`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4087), [`1:08:49`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4129):

- Actual cost `O(1)`; `Δtrees = 0`, `Δmarks = 0`; `ΔΦ = 0` ⟹ **constant**.

**Case 2 — `c > 0` cascading cuts** [`1:09:44`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4184), [`1:10:04`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4204):

| Term | Value |
|---|---|
| Actual cost | `O(c)` [`1:10:26`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4226) |
| `Δtrees` | `+c` — each cut creates a new top-level tree [`1:10:26`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4226) |
| `2 · Δmarks` | `≤ −2c + O(1)` — each cut node clears its own mark, and at most one new mark is set (on the topmost surviving parent) [`1:10:58`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4258), [`1:11:35`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4295) |

The `+c` and `−2c` leave a **negative** leading term, so the total is constant [`1:10:58`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4258).

Worked sanity check for `c = 1`: cutting `x` means `x`'s parent was **not** previously marked, so the parent becomes marked (+1) while `x`'s own mark is cleared on the move (−1, if it had one) — net change in marked items is not an increase [`1:11:35`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4295), [`1:12:00`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4320), [`1:12:31`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4351).

## Caveats stated in the lecture

- **Worst case delete-min can be linear**: after `n` insertions the whole structure is one long root list [`1:12:58`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4378).
- All actual costs carry hidden big-O constants; multiplying the whole potential function by that constant handles it [`1:18:28`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4708), [`1:18:47`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4727).
