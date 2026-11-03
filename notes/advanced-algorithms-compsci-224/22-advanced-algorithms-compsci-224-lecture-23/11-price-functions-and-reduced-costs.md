# 11. Price functions, reduced costs, and the optimality characterization

## Definition

- A **price function** `p : V → ℝ` induces a **reduced cost** on edge `uv` [`1:11:24`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=4284), [`1:12:16`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=4336):

  > `c_p(uv) = c(uv) + p(u) − p(v)`

- **Intuition — the gold trader**: you **buy gold at `u`** (pay `p(u)`), **ship it** (pay `c(uv)`), and **sell it at `v`** (earn `p(v)`, i.e. negative cost) [`1:12:16`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=4336), [`1:13:10`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=4390).

## The characterization

> `f` is an **optimal min-cost circulation** **iff** there exists a price function `p` on the residual graph `G_f` such that **all reduced costs are non-negative** [`1:13:23`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=4403).

## The pivotal invariant

- **Cycle costs are identical under `c` and `c_p`** — the `p(u)` and `p(v)` terms **telescope and cancel** around any cycle [`1:14:08`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=4448).

## Proof, direction 1 (`p` exists ⟹ optimal)

- All reduced costs non-negative ⇒ every cycle's reduced cost is non-negative ⇒ (by cancellation) every cycle's **real** cost is non-negative ⇒ **no negative cycles** ⇒ optimal, by the previous section [`1:14:08`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=4448), [`1:14:53`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=4493).

## Proof, direction 2 (optimal ⟹ `p` exists) — the construction

Given that `G_f` has no negative cycles [`1:14:53`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=4493), [`1:15:29`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=4529), [`1:16:03`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=4563):

1. Introduce a **new vertex `s`** with **zero-cost edges to every vertex**.
2. Set `p(u) = ` **shortest-path distance from `s` to `u`** under the costs — **well defined precisely because there are no negative cycles**.
3. Non-negativity of all reduced costs is then exactly the **triangle inequality**. Left to the reader to verify offline.
