# 3. The heap ADT and what Dijkstra needs from it

## The abstract data type

A heap is an **abstract data type** supporting three operations [`10:47`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=647), [`11:11`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=671):

| Operation | Signature | Semantics |
|---|---|---|
| Insert | `insert(x)` | Adds `x`; keys are comparable under a total order [`11:11`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=671) |
| Delete-min | `delete-min(H)` | Returns the minimum key in `H` **and** removes it [`11:50`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=710) |
| Decrease-key | `decrease-key(p, k)` | `p` is a **pointer to an item**; replaces that item's key with `k`, which must be at most the item's current key [`11:50`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=710), [`12:33`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=753) |

## Dijkstra as the motivating application

- The heap ADT is precisely the abstraction Dijkstra's algorithm needs [`12:33`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=753).
- Dijkstra's usage pattern: insert every vertex with key `∞` (the source gets `0`), then loop over delete-mins; each **relax** step is a decrease-key [`13:25`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=805).
- Problem solved: single-source/single-pair shortest paths with **non-negative** edge weights [`13:54`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=834).
- Running time in terms of heap costs, with `n` vertices and `m` edges [`13:54`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=834), corrected by a student to put decrease-key on the `m` term [`17:22`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1042), [`17:45`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1065):

```
O( n · (t_insert + t_delete-min) + m · t_decrease-key )
```

- This is exactly why constant-time decrease-key matters: the `m` term dominates in dense graphs [`19:34`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1174).
