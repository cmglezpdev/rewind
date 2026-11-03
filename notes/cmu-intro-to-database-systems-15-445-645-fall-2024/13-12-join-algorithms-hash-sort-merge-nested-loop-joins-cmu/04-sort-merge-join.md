# 04 — Sort-Merge Join

## Idea

- Sort both tables on the join key, then walk both sorted runs with cursors — **no hunting, and in most cases no backtracking**, because you know a matching key cannot appear further down ([`34:06`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2046), [`34:35`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2075)).
- **Phase 1 — Sort**: typically external merge sort (from the previous lecture), but any sort works ([`34:35`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2075), [`35:02`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2102)).
- **Phase 2 — Merge**: two cursors advance in lock-step; the inner cursor may need to **backtrack** when the outer table repeats a value ([`35:02`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2102)).

## Merge phase mechanics

- Compare outer cursor value vs inner cursor value ([`35:44`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2144)):
  - **Equal** → emit joined tuple, advance the inner cursor ([`36:49`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2209)).
  - **Inner > outer** → advance the outer cursor ([`37:22`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2242), [`37:39`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2259)).
  - **Outer < inner** → keep advancing the outer cursor until it reaches or passes the inner value ([`39:03`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2343), [`39:28`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2368)).
- The algorithm keeps a **"last value" marker** (plus a jump-back offset) so that when the outer table repeats a key it can rewind the inner cursor to the start of that key's run ([`36:17`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2177), [`38:22`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2302)).
- Backtracking is not "jump to offset 3" — it may mean **jumping back several pages** ([`40:52`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2452), [`41:11`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2471)).
- You must scan one step past the last match before stopping, since you cannot yet know whether a backtrack is needed ([`39:28`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2368), [`40:06`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2406)).

## Clarifications from Q&A

- **Are the runs physically sorted?** Yes — external merge sort writes sorted temp files ([`40:38`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2438)).
- **Already sorted on the join key?** Skip the sort phase entirely ([`41:11`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2471)).
- **Unclustered index does not guarantee sorted data**; with a clustered index, bits inside a slotted page may be out of order but the **slot array is sorted**, so cursors iterating slot offsets still see logical sort order ([`41:11`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2471), [`41:52`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2512)).
- Data can be sorted **without any index at all** — e.g. Parquet-style immutable files written out in sorted order ([`1:10:50`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=4250)).
- If data is clustered/sorted you do **not** probe the index — you just walk pages in order, so no thrashing ([`1:11:21`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=4281)).

## Cost

**Cost = sort(R) + sort(S) + (M + N)** — with no backtracking, each table's pages are read exactly once in the merge, no multiplicative term ([`42:24`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2544), [`42:47`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2567)).

With 100 buffers on the running example ([`43:00`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2580), [`43:29`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2609)):

| Component | I/Os |
|---|---|
| Sort R | 4,000 |
| Sort S | 2,000 |
| Merge (M + N) | 1,500 |
| **Total** | **7,500 I/Os ≈ 0.75 s** |

- That is **1.1 hours → ~750 ms** versus naive nested loop join, but still worse than index nested loop join ([`43:29`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2609), [`43:43`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2623)).
- **The sort phase dominates** (6,000 of the 7,500 I/Os). Skip it and you are essentially at index nested loop join cost ([`44:51`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2691)).

## Best and worst cases

- **Worst case**: every tuple has the same join key — sorting achieves nothing and the merge backtracks endlessly ([`43:43`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2623), [`44:09`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2649)).
- **Best cases** where sort-merge genuinely wins ([`44:09`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2649), [`44:30`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2670), [`44:42`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2682)):
  - The query has an `ORDER BY` on the same column as the join key — two birds, one stone.
  - The data is already sorted on disk — the sort phase is skipped outright.
