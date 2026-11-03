# 5. Counting the operations: why `O(m log n)` is the target

## Every loop iteration falls into one of three cases

| Case | How often | Why |
| --- | --- | --- |
| **Link** (advance) | ≤ `m` | Each link explores an edge for the **first time** [`39:39`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=2379) |
| **Cut** (retreat) | ≤ `m` | Each cut deletes an edge; you cannot delete more edges than exist [`39:53`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=2393) |
| **Augment** | ≤ `m` in aggregate | Detecting the augment is **one** `find-root`; every `find-min` in the cleanup loop except possibly the last deletes an edge [`40:12`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=2412) |

- **Total link-cut operations per blocking flow: `O(m)`** [`40:31`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=2431).
- Therefore: **`O(log n)` per operation ⇒ `O(m log n)` per blocking flow.** "The name of the game is get everything in log `n` time" [`40:31`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=2431).

## What this lecture will and will not prove

- Today: **amortized** bounds — possibly only `O(log² n)`, with `O(log n)` achievable [`41:07`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=2467).
- A **worst-case** `O(log n)` bound also exists, but the data structure gets more complicated; see the paper [`41:07`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=2467), [`41:33`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=2493).
- Plan announced at the end: `O(log² n)` proved next class, `O(log n)` left as a hinted final-problem-set exercise [`1:18:59`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4739).

## The core representation idea

> Store the potentially **unbalanced** represented trees using **balanced binary search trees** — specifically splay trees [`37:49`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=2269), [`38:42`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=2322).

- The trees in the collection are **not binary** and can be arbitrarily unbalanced [`38:42`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=2322).
- Plain balanced BSTs give `O(log² n)`; **splay trees** are what buy the `O(log n)` [`50:07`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=3007), [`50:18`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=3018).
