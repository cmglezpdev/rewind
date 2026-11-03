# 3. The link-cut tree interface

A link-cut tree stores a **collection of vertex-disjoint rooted trees** subject to the operations below — chosen precisely so the blocking-flow algorithm can be written on top of them [`9:47`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=587).

Drawing convention used throughout the lecture: **roots are drawn to the right**, so "jumping right" = jumping toward the root [`11:16`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=676).

## The operations

| # | Operation | What it does |
| --- | --- | --- |
| 1 | `make-tree()` | Creates a new vertex as a singleton tree. Blocking flow starts by calling it `n` times, giving the empty graph [`10:22`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=622) |
| 2 | `find-root(v)` | Returns the root of the tree containing `v` — the "skip ahead to the end of the fragment" primitive [`10:47`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=647), [`11:34`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=694) |
| 3 | `cut(v)` | Destroys the edge `(v, parent(v))` — used on retreat [`15:38`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=938), [`16:19`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=979) |
| 4 | `find-min(v)` | Returns the **lowest-capacity edge** on the `v`-to-root path; **ties broken toward the root** (return the edge closest to the root) [`16:35`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=995), [`17:14`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1034) |
| 5 | `subtract(v, x)` | Subtracts `x` from the capacity of **every** edge on the `v`-to-root path [`17:14`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1034), [`18:00`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1080) |
| 6 | `add-flow(v, x)` | Adds `x` to the flow variable of every edge on the `v`-to-root path [`18:38`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1118) |
| 7 | `link(v, w, x)` | Assumes `v` is the root of its tree and `w` is in a **different** tree; makes `v` a child of `w` with edge capacity `x` [`22:09`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1329), [`22:42`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1362), [`23:31`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1411) |

- Every live edge remembers both its **capacity** and its **flow**, readable directly [`18:38`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1118).
- **Operation 6 is redundant**: record the initial capacities, and at the end infer every edge's flow from the change in its capacity [`20:06`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1206), [`20:40`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1240).

## Two graphs, one vertex set

- `L` = the **level graph** everything is built on top of [`23:31`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1411).
- `H` = the **forest of fragments** the link-cut tree maintains — a subgraph of `L` on the **same vertex set** [`24:08`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1448).
- `H` starts with **no edges at all** and gains edges as the blocking flow is built [`23:31`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1411), [`24:08`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1448).
- Because the vertices correspond one to one, from a vertex in `H` you can always look up its neighbours in `L` [`25:17`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1517).
