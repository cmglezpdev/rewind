# 03 — Top-N Heap Sort

## When it applies

- The query has an `ORDER BY` **plus a `LIMIT`** (or `FETCH FIRST n ROWS`), so the DBMS knows it does not need a globally sorted result — only the n greatest or smallest values [`10:18`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=618).
- Worked example: `SELECT ... FROM enrolled ORDER BY sid ASC FETCH FIRST 4 ROWS WITH TIES` — `WITH TIES` decides whether tied records are included [`10:43`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=643).

## The algorithm

1. Allocate a small **sorted heap / priority queue** sized to the limit [`11:07`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=667).
2. Scan the source data once. For each value:
   - If the heap has a free slot, insert in sorted position [`11:07`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=667).
   - If the heap is full, compare against the current worst value in the heap. For `ASC`, if the new value is greater than the heap's maximum, **discard it and move on** [`11:07`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=667).
   - Otherwise shift the heap and insert, evicting the worst entry [`11:59`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=719).
3. With `WITH TIES`, the heap is allowed to grow slightly past n, and the system must track how far past n it has gone [`11:59`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=719) [`12:36`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=756).

Trace from the lecture on input `3, 4, 6, 2, 9, 1, 4, 4, 8` with a 4-slot heap: 3 → 4 → 6 → 2 shifts in; **9 is skipped** because it exceeds the heap max; 1 evicts 6; the duplicate 4s are appended as ties; **8 is skipped**; done [`11:07`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=667) [`11:49`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=709) [`11:59`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=719) [`12:36`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=756).

## Why it wins

- **One pass over the data**, and nothing is actually sorted — no quicksort pivots, no partitioning [`12:50`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=770).
- One pass is "always going to be a huge win"; the caveat is petabyte-scale input where even one pass is expensive [`12:50`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=770) [`13:17`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=797).
- **Memory footprint is tiny**: roughly one buffer-pool frame for the scan (with prefetching possible) plus one buffer for the heap [`13:42`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=822).

## Adoption and use cases

- Postgres does this; DuckDB is believed to as well; MySQL uncertain [`13:17`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=797).
- Classic workload: **leaderboards** — "give me the top 10 players by ranking" [`13:17`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=797).
