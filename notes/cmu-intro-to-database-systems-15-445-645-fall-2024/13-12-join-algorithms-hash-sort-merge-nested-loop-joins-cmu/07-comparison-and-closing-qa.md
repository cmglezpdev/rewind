# 07 — Algorithm Comparison and Closing Q&A

## Summary table (running example: R = 1,000 pages / 100,000 tuples, S = 500 pages / 40,000 tuples, 0.1 ms per I/O)

| Algorithm | I/O cost | Example I/Os | Example time | Source |
|---|---|---|---|---|
| Naive nested loop join | `M + (m × N)` | ~50,000,000 | 1.3 hours | [`22:33`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=1353) |
| Block nested loop join | `M + (⌈M/(B−2)⌉ × N)` | 6,000 (B = 102) | ~0.6 s | [`27:45`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=1665), [`28:29`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=1709) |
| Index nested loop join | `M + (m × C)` | variable | variable | [`32:48`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=1968) |
| Sort-merge join | `sort(R) + sort(S) + (M + N)` | 7,500 | ~0.75 s | [`42:24`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2544), [`43:29`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=2609) |
| Partitioned (Grace) hash join | `3 × (M + N)` | 4,500 | ~0.45 s | [`1:01:41`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=3701), [`1:03:20`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=3800) |

## The verdict

- **Hash join is almost always preferable for large datasets** ([`1:06:34`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=3994), [`1:12:40`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=4360)).
- It seems crazy to build a data structure and throw it away after one query, but **paying the sequential I/O cost once beats repeated random I/O or repeated sequential rescans** ([`1:06:47`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=4007), [`1:07:14`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=4034)).
- **Sort-merge join can still win** when data is already sorted or the query needs sorted results — and a good DBMS makes that call on the fly ([`1:12:40`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=4360)).

## Q&A highlights

### Why is index nested loop join's cost "variable"?

- The constant `C` depends on the unknown index type — B+Tree (`log n`), trie, or hash table (~O(1)) ([`1:07:14`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=4034), [`1:07:40`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=4060)).
- Also because of **one-to-many joins**: one outer key may match many inner tuples, forcing a scan across multiple leaf nodes — it depends on data, schema, and query ([`1:07:40`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=4060), [`1:08:16`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=4096)).
- If you *know* the join is one-to-one, block nested loop join can **break out of the inner loop on first match** — but you have to know that ([`1:08:16`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=4096), [`1:08:38`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=4118)).

### How accurate are these cost numbers in practice?

- **The formulas themselves are fine**; the problem is estimating `M` and `N` ([`1:08:50`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=4130), [`1:09:14`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=4154)).
- In a multi-join query, the output cardinality of join #1 becomes the input of join #2 — with a thousand joins (rare but real) you are **"building crappy statistics off crappy statistics off crappy statistics"** ([`1:09:14`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=4154), [`1:09:46`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=4186)).
- Systematic bias: **all DBMSs underestimate the number of tuples coming out of a join**, because they assume predicates are uncorrelated when they are actually correlated ([`1:09:46`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=4186), [`1:10:02`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=4202)).

### Sorted vs clustered vs indexed

- Data can be sorted **without** an index (e.g. Parquet files written in sorted order) ([`1:10:50`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=4250)).
- If data is clustered, you **walk pages with a cursor rather than probing the index**, so there is no thrashing ([`1:11:21`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=4281)).
- Most data is **not** sorted ahead of time; a hash probe (~O(1)) is potentially much faster than a B+Tree probe (`log n`) ([`1:11:43`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=4303)).

### Is index nested loop join over a hash index the same as hash join?

- Roughly yes — but you **lose the recursive partitioning** that lets hash join spill gracefully to disk. Andy is unsure whether Postgres will pick up a hash index for a join ([`1:12:07`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=4327), [`1:12:27`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=4347)).
