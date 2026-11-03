# 8. Rank versus size: where the Fibonacci numbers come from

The lecture derives, by drawing the **most-cut-away tree that still has rank `k`**, the minimum size of a rank-`k` Fibonacci heap tree [`54:29`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3269).

## The construction, rank by rank

| Rank `k` | Minimum size | Reasoning |
|---|---|---|
| 0 | 1 | A single node [`54:29`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3269) |
| 1 | 2 | Root plus one child; cutting that child would drop the rank [`55:15`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3315) |
| 2 | 3 | Full shape is root + rank-0 + rank-1 child; one decrease-key can cut the rank-1 child's own child away [`55:36`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3336), [`55:55`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3355) |
| 3 | 5 | Cut as much as the mark rule allows; a further cut would make a node lose its second child and cut *itself* out, dropping the rank below 3 [`56:21`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3381), [`56:54`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3414), [`57:14`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3434) |
| 4 | 8 | Same maximal pruning of a full rank-4 binomial tree [`57:14`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3434), [`58:41`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3521) |

The sizes 1, 2, 3, 5, 8 are the **Fibonacci numbers** — this is where the data structure gets its name [`58:41`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3521), [`59:23`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3563).

## The resulting bound

- **Claim**: a rank-`k` tree has size at least `F_{k+2}` (exact index depends on the Fibonacci indexing convention) [`59:23`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3563), [`1:07:49`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4069).
- Fibonacci numbers grow **exponentially**, so `F_{k+2} ≥ (something)^k` and `n ≥ F_{k+2}` forces `k = O(log n)` [`1:07:27`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4047), [`1:07:49`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4069).
- This replaces the binomial heap's `2^k` argument and is what keeps delete-min at `O(log n)` [`1:07:27`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4047).
- Status in the lecture: the picture-based derivation above is **not a formal proof**; the (short) formal proof is deferred [`1:07:49`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4069), [`1:08:07`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4087).
- Side detail: a drawing error in the rank-4 example was caught by the class — a subtree had one extra node and had to be contracted from rank 3 to rank 2 [`57:40`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3460), [`58:17`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=3497).
