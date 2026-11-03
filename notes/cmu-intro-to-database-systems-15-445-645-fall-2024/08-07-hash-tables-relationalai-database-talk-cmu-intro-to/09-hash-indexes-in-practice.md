# 09 — Wrap-up: why hash tables are rarely the index you get

## Conclusion

Hash tables give **O(1) lookups** and are used throughout a DBMS, including as table indexes [`1:08:49`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=4129) — **but they are not what you should use for indexes in practice**, for two reasons:

1. **No range queries.** Only equality predicates work; `<` and `>` are impossible on an unordered structure [`1:08:49`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=4129).
2. **No partial-key lookups.** A hash index on `(A, B)` cannot be probed with `A` alone — without the full key there is nothing to hash. B+ Trees support partial key lookups [`1:08:49`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=4129) [`1:09:31`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=4171).

## What `CREATE INDEX` actually gives you

- **99% of the time you get a B+ Tree** [`1:09:31`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=4171).
- PostgreSQL lets you request one explicitly with `USING HASH`, which yields the **linear hash table** described in the previous topic [`1:09:31`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=4171) [`1:09:52`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=4192).

## Looking ahead

- Next class: order-preserving trees, with heavy focus on the B+ Tree — called "the best data structure of all time." Tries are also good, but "you can put your tries in your B+ Tree" [`1:09:52`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=4192) [`1:10:18`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=4218).

## Quick comparison of the five schemes

| Scheme | Type | Collision handling | Fast at | Slow at |
|---|---|---|---|---|
| Linear probe | Static, open addressing | Sequential scan to next free slot [`26:39`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=1599) | Simplicity, sequential/disk access [`32:48`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=1968) | Blocking resize at the load-factor threshold [`28:15`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=1695) |
| Cuckoo | Static, open addressing | Multiple hash functions + eviction [`46:20`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=2780) | Guaranteed O(1) lookups/deletes [`46:20`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=2780) | Inserts; infinite-loop recovery requires doubling [`50:44`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3044) |
| Chained | Dynamic | Linked bucket chains [`52:29`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3149) | Simplicity, unbounded growth | Skew — chains grow without limit [`55:19`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3319) |
| Extendible | Dynamic | Split the overflowing bucket; global/local depth bits [`59:16`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3556) | Localized rebalancing, amortized cost [`1:01:54`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3714) | Rarely implemented [`55:57`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3357) |
| Linear | Dynamic | Split whatever the split pointer targets; two hash functions [`1:03:23`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3803) | Fully localized resize; used by PostgreSQL [`1:02:28`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3748) | Unintuitive — splits buckets that did not overflow [`1:08:09`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=4089) |
