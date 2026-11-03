# 09 — Index-organized storage

## The idea

- Normally an index is an associative array: key → **record ID**, and you then go through the page directory (or the LSM summary table) to find the actual tuple [`48:58`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2938)
- **Index-organized storage**: make the index *be* the table. The leaf nodes (or hash buckets) hold the tuples themselves, so the lookup lands directly on the data — no second step [`49:22`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2962) [`49:42`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2982)

## Position on the trade-off curve

- More common in the 1990s / early 2000s; most new systems are log-structured [`50:13`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3013)
- It is the **opposite** of log-structured storage: you pay index-maintenance cost at insert/delete time, and reads are then very fast [`50:13`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3013)

## Physical layout

- Inner nodes are just guideposts for navigation and splits; **leaf nodes hold the tuples** [`50:45`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3045)
- Leaf pages look almost exactly like slotted pages, except the offset array is **sorted by the index key** rather than unordered [`50:45`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3045) [`51:13`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3073)
- Same growth pattern as slotted pages: tuples from the end backwards, offset array from the beginning forwards [`51:50`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3110)
- Lookup: traverse the tree to the leaf page, **binary search** the sorted key array in the header, jump to the tuple [`51:32`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3092)
- The data structure is interchangeable — B+Tree, trie, skip list, hash table [`50:45`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3045)

## Who uses it

| System | Default |
| --- | --- |
| SQLite, MySQL | Index-organized [`51:50`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3110) |
| Oracle, SQL Server | Heap files by default, but `CREATE TABLE ... ORGANIZATION INDEX` style options exist — high-end enterprise systems support **both** [`51:50`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3110) |

## Three storage architectures in total

Tuple-oriented (heap + slotted pages) · log-structured storage · index-organized storage — each with pros and cons [`52:31`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3151)
