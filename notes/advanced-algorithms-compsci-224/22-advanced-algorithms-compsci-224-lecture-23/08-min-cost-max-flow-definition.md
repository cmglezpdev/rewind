# 8. Min-cost max flow: the problem and residual costs

The second half of the lecture; the link-cut tree material existed only to speed up **blocking flow** for plain max flow [`47:22`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2842).

## The problem

- Each edge `e` carries **both** a capacity `u(e)` **and** a cost `c(e)`, where the cost may be **negative, zero, or positive** [`47:59`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2879).
- Normalization used throughout: **capacities are integers in `[1, U]`**, **costs are integers in `[-C, C]`** [`48:43`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2923).
- **Goal**: among *all* max `s`–`t` flows, find one minimizing

  > `cost(f) = Σ_e f(e) · c(e)`

  — max flow is a hard constraint, cost is the tiebreaker [`49:11`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2951), [`49:44`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2984).

## Costs in the residual graph

- Recall what the residual graph encodes: **along which paths flow can still be augmented**. Edge of capacity 2 carrying 1 unit ⇒ forward residual edge of capacity 1 **and** a reverse residual edge of capacity 1 [`50:32`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=3032), [`51:01`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=3061).
- **Forward residual edge**: keeps the **same cost** `c(e)` [`51:27`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=3087).
- **Reverse residual edge**: has cost **`−c(e)`** — pushing flow back **refunds** the cost you paid [`51:27`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=3087), [`51:52`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=3112).

This sign flip is the source of nearly every complication in the rest of the lecture.
