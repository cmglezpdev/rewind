# 04 — Physical node layout and what leaf values hold

## Page layout of a node

A node is a page containing [`21:38`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1298) [`22:06`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1326):

- **Header metadata**: tree level (so you know how to interpret the contents), free-slot count, prev/next sibling page IDs, null bitmaps, etc.
- **Key/value data** at the end of the page.

### Two data layouts

| Layout | Description | Assessment |
|---|---|---|
| Interleaved pairs | `(k1,v1)(k2,v2)(k3,v3)...` — a struct/pair repeated | what BusTub uses [`22:29`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1349) |
| Split arrays | all keys contiguous, then all values contiguous | **better** — like a column store: binary search rips through keys without skipping over values you don't care about [`22:29`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1349) |

## What the leaf value is

Three options [`23:04`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1384) [`23:26`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1406):

1. **Record ID** (page number + offset) — the most common choice; most systems do this.
2. **The tuple itself** — index-organized storage. Always used by **SQLite** and **MySQL/InnoDB** for the primary key index; **optionally declarable** in Oracle and SQL Server.
3. **The primary key** — used by secondary indexes in index-organized systems.

### Why secondary indexes store the primary key, not a record ID

- Leaf nodes move around when the tree rebalances, so a page-number+offset would go stale [`24:15`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1455).
- So a secondary-index lookup is a **two-hop lookup**: secondary index → primary key → primary-key index → tuple [`23:26`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1406).
- This complicates MVCC, covered later in the semester [`24:36`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1476).

## Making leaf scans actually sequential

A student asked: what if the leaf pages are not physically contiguous, so the "sequential" scan becomes random I/O? Answers given [`27:58`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1678) [`28:33`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1713):

- At allocation time you know a page is a **leaf** page, so you can size it differently from inner pages.
- You can **pre-allocate a run of leaf pages** so that logical contiguity is also physical contiguity.
