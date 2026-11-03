# 10. Q&A: what potential functions are actually doing

A student objected that the potential function `trees(H) + 2·marks(H)` "seems arbitrary" and asked what it buys us [`1:13:18`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4398).

## The charging / bank account intuition

- Potential functions let you **charge expensive future work back to earlier operations** [`1:13:39`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4419).
- Concrete case: a delete-min may cost `n` steps, but it can only cost that much if `n` prior insertions built up that root list — and after the delete-min everything is consolidated [`1:13:39`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4419), [`1:13:59`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4439).
- **Bank account metaphor**: `Φ` is a balance. An insert *deposits* 1 (it adds a tree); a delete-min *spends* what was deposited [`1:14:14`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4454), [`1:14:33`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4473).
- Decrease-key does both: with no cascading it **deposits a mark**, which a later decrease-key can then **spend** [`1:15:02`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4502).

## Why the coefficient is 2 (and why it need not be exactly 2)

- Asked whether the coefficient could just be made large: yes — **any coefficient at least 2 works**; 2 is not uniquely correct [`1:15:26`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4526), [`1:16:19`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4579), [`1:16:47`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4607), [`1:17:44`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4664).
- The requirement is structural: **the coefficient on marks must be at least twice the coefficient on trees** [`1:16:47`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4607).
- A student supplied the mechanical reason: a mark-and-cut event creates **two additional trees** while removing one mark, so the mark term must be worth 2 to cancel that growth [`1:17:08`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4628), [`1:17:20`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4640).

## Two further clarifications

- **Negative amortized cost is fine.** Quoting "operation X has amortized cost B" means B is the **worst case** of `actual + ΔΦ`; here the worst case is `c = 0`, which gives the constant [`1:15:26`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4526), [`1:15:53`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4553), [`1:17:44`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4664), [`1:18:06`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4686).
- **Constraints on `Φ` are minimal**: only `Φ(∅) = 0` and `Φ ≥ 0`. Given those, any proved amortized bound upper-bounds the true cost of any operation sequence [`1:18:47`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4727), [`1:19:19`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4759).
- Asked for a conceptually different potential function that also works: none offered — no formalization of "this is the only one that works" is known off-hand [`1:19:19`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4759), [`1:19:43`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4783), [`1:20:16`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4816).
