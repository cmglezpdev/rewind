# 6. From `Θ(u)` space to `Θ(n)`: hashing and the dictionary problem

## The space recurrence

- `S(u) = √u · S(√u) + S(√u) + O(1)` — `√u` clusters, one summary, plus constant storage for the min [`54:55`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3295).
- This solves to **`S(u) = Θ(u)`**, which is unusable [`55:20`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3320).
- What's silly about it (student answer): **a lot of the clusters are empty** and are still being allocated [`55:20`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3320), [`55:55`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3355).

## The fix: replace the cluster array with a hash table

- Keys = **cluster IDs**; values = **pointers to the corresponding non-empty cluster**. Empty clusters simply don't appear [`56:33`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3393), [`57:10`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3430), [`57:51`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3471).

## Why the space becomes `Θ(n)` — the charging argument

1. Each stored `(cluster ID, pointer)` pair costs **two words** [`59:13`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3553).
2. Every non-empty tree has a minimum element, so **charge those two words to the minimum element of cluster `c`** [`59:13`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3553), [`59:44`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3584).
3. Every element ends up stored as a minimum somewhere in the recursion (possibly at a leaf cluster), and each minimum is charged **exactly once** — in the parent of the vEB tree containing it [`59:44`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3584).
4. So each `x ∈ S` is charged exactly once ⇒ total space `Θ(n)` [`1:00:39`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3639).

## Aside: state the problem, then pick the solution

The lecturer's methodological point — think in terms of **problems**, then find algorithms or data structures that solve them. What is actually needed here is not "hashing" but a **dictionary** [`1:01:30`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3690), [`1:01:54`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3714).

### The dictionary problem

- Store key–value pairs, both fitting in a machine word [`1:01:54`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3714).
- `query(k)` → the value associated with `k`, or **null** if `k` is unassociated [`1:02:31`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3751).
- `insert(k, v)` / `associate(k, v)` → binds value `v` to key `k` [`1:02:31`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3751).
- **Static**: all pairs given up front, no further associations. **Dynamic**: updates and deletions allowed [`1:03:29`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3809).

### The black-box result used

- **Dynamic dictionary with linear space, worst-case constant query, and expected constant insertion/deletion** — attributed to Dietzfelbinger and others, a fairly recent result and some form of hash table [`1:03:52`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3832), [`1:04:42`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3882).
- Plain **universal hashing** gives only *expected* constant query, not worst case; the cited result upgrades that to worst case [`1:04:42`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3882), [`1:05:28`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3928).
- You can even get constant time **with high probability**, not merely in expectation [`1:05:28`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3928), [`1:06:05`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3965).
- Hashing is deferred to a later lecture and taken as a black box here [`1:05:47`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3947).
- Open-ish: the only remaining improvement would be making it **fully deterministic**; the lecturer doesn't know offhand whether that's been ruled out [`1:06:05`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3965), [`1:06:29`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3989).

> Caveat worth noting: this linear-space vEB is therefore **randomized**, which is why the earlier table said `Θ(n)` space "with randomization" [`21:16`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=1276).
