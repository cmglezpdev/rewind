# 10 — Clustered indexes and index-scan optimization

## The problem: index order vs. heap order

- A heap file is **unsorted**. An index imposes a sort order that the heap does not share [`55:59`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3359).
- Scanning leaves in key order and immediately fetching each tuple therefore produces **random access** across heap pages [`57:32`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3452).
- Worst-case illustration used in the lecture: a buffer pool with **one frame**. Since two adjacent keys rarely point at the same page, you thrash — repeatedly evicting and re-reading pages [`57:32`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3452).

## Fix 1 — Clustered index

- Physically sort the table according to an index [`55:59`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3359).
- **Postgres `CLUSTER`** takes an index and literally rewrites the table in that order. It is a **one-shot** operation — it is *not* maintained; new inserts fall out of order [`56:26`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3386).
- Index-organized storage gives the same property permanently [`56:43`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3403).
- Payoff: scanning the leaves visits each page **exactly once** [`56:43`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3403) [`57:11`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3431).

## Fix 2 — Sort the page IDs before fetching

- Don't fetch tuples while scanning the index. Collect the list of tuples, **sort by page ID**, then fetch — each page is retrieved once [`58:13`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3493).
- Postgres calls this a **bitmap heap scan**: scan the index, gather pages, sort, combine [`58:33`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3513).
- Extension: gather page IDs from **multiple indexes** and **intersect** them according to the `WHERE` clause, yielding a single deduplicated page list to retrieve [`58:33`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3513) [`58:58`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3538).
