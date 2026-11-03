# 08 — Using B+Tree Indexes Instead of Sorting

## The idea

- If an **order-preserving index** (a B+Tree) already exists on the `ORDER BY` columns, sorting again makes no sense — the data is already sorted for you [`41:44`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2504).
- Retrieval becomes: jump to a point in the tree, scan along the leaf nodes, return data [`42:34`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2554).

## How strict the match must be — Postgres vs the enterprise systems

- **Postgres**: requires an **exact match**. `ORDER BY a, b` needs an index on `(a, b)` [`42:07`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2527) [`42:34`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2554).
- **Oracle and enterprise systems**: `ORDER BY a` can use an index on `a` even as part of a wider ordering, since the `a` values arrive in the right order [`42:07`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2527).

## Clustered vs unclustered decides whether this is a good idea

- **Clustered**: the heap pages holding the tuples are in the same physical order as the index's leaf nodes. Sequentially scan the leaves, follow pointers, no extra sorting — "that's easy to do, that's really fast" [`42:53`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2573) [`43:19`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2599).
- **Unclustered**: fetching tuples in index order produces **random I/O**, thrashing pages in and out of memory [`43:19`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2599).
- **Exception — Top-N queries**: unclustered is usually fine, because the number of records needed is a small subset. Jump to one side of the tree, scan the first few keys, fetch only those pages [`43:19`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2599) [`44:17`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2657).
- **Index-organized storage** (leaves store the tuples themselves) removes the issue entirely, assuming `ORDER BY` matches the key the data is sorted on [`43:51`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2631).

## Index beats even Top-N heap sort

- Top-N heap sort is one pass, but it must scan **all** pages because it doesn't know where values live. Using an index to fetch exactly the minimum number of pages is **always better** [`44:17`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2657) [`44:58`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2698).

## Why unclustered indexes exist at all

- **Most systems use unclustered B+Trees**, and `CREATE INDEX` will not produce a clustered index by default [`44:58`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2698) [`46:21`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2781).
- Per-system behavior [`45:28`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2728) [`45:57`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2757) [`48:08`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2888):
  - **MySQL (InnoDB)**: always index-organized storage.
  - **SQLite**, and SQL Server optionally: leaf nodes are the data.
  - **Oracle / SQL Server**: you choose per table — unsorted heap pages or index-organized pages.
  - **Postgres**: the `CLUSTER` command sorts the data via external merge sort and rewrites it, but ordering is **not maintained** — updates drift it out of order over time.
- Semi-sorted data enables tricks that let you inspect less data than a full scan would require [`45:57`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2757).

## Why it's a design choice, not a bug

- It reflects assumptions made when the system was built about the expected workload [`46:49`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2809).
- Historical timeline: **Postgres 1984** (index-organized storage may not have been a known idea yet); **InnoDB ~1999**; **SQLite 2001** — it is a "semi-newer technique" [`47:07`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2827).
- **Flexibility argument**: unsorted heap pages plus separately built indexes let you add or change indexes as the important columns change over time, without throwing everything away. Index-organized storage exposes more of the underlying storage mechanism, since order is pinned to the primary key [`47:27`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2847).
