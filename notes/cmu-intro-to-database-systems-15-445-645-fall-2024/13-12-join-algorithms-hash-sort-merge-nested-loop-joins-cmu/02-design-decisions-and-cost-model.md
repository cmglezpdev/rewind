# 02 — Two Design Decisions: Output Format and Cost Model

Two things must be decided for any join operator ([`10:15`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=615)):

1. What the join operator emits (early vs late materialization).
2. How to tell whether one join algorithm beats another (the cost model).

## Decision 1 — Operator output

- **The logical output is identical for every join algorithm**: the same unordered set of tuples, whether hash join or sort-merge join ([`11:03`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=663)).
- **Physical properties differ**: sort-merge join emits data already sorted (a free side effect), hash join emits it in effectively random order ([`11:28`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=688)).
- Other physical choices (one tuple at a time vs batch vs all tuples, where spilled data goes) are out of scope for this lecture ([`11:28`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=688)).

### Early materialization

- Build the **entire tuple contents at retrieval time**, stitch both sides together at the join, and pass the full tuple up the plan ([`12:05`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=725), [`12:24`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=744)).
- Upper operators (e.g. projection) never go back to fetch more data ([`12:42`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=762)).

### Late materialization

- Retrieve only the **bare minimum** needed at that moment — typically the join key plus the **record ID** of the source tuple ([`13:15`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=795)).
- Upper operators use the record IDs to fetch remaining attributes on demand ([`13:45`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=825)).
- Big win with wide tables — a thousand columns are not dragged up the plan ([`13:45`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=825)).
- **Common in column stores**: attributes live in separate files, so only fetch the files you actually need ([`15:39`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=939)).

### Student question: why not just carry the needed fields along?

- That is **projection push-down**, covered later ([`14:17`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=857)).
- It is not automatically right: over a network you may not want to ship a field that gets filtered later; you may push a billion tuples' worth of a column that filters down to two ([`14:38`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=878), [`15:15`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=915)).
- Andy's blunt caveat: figuring out the minimum work is very hard because **your statistics are always wrong — you're guessing on bad data** ([`15:29`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=929)).

## Decision 2 — The cost model

Running example for the entire lecture: `SELECT ... FROM R JOIN S ON R.id = S.id` ([`15:57`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=957)).

| Symbol | Meaning |
|---|---|
| `M` | number of pages in R (outer) |
| `m` | number of tuples in R |
| `N` | number of pages in S (inner) |
| `n` | number of tuples in S |

Source: [`16:20`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=980)

**Cost metric = number of I/Os to compute the join** ([`16:20`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=980)). Deliberately ignored:

- **Cost of writing out the result** — identical for all algorithms since the logical output is the same ([`16:55`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=1015)).
- **CPU cost** — nested loop join is CPU-cheap, hashing is far more CPU-expensive, but disk cost dominates and hash implementations are heavily optimized ([`17:16`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=1036), [`17:47`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=1067)).
- **Network cost** — still assuming a single box; distributed joins come later ([`17:47`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=1067)).
- **Anything already cached** — a moving target you cannot account for, so assume everything starts on disk ([`18:16`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=1096)).

## Menu of algorithms and where each is used

- Order of the lecture: nested loop join → sort-merge join → hash joins (most of the time spent on hash variants) ([`18:35`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=1115)).
- **OLTP workloads** typically use **index nested loop join** — one account tuple, ~10 order tuples, index available, extremely fast; hash join would be too slow here ([`18:58`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=1138)).
- **OLAP workloads** want all of them ([`18:58`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=1138)).
- Support in real systems: Postgres does all three; **MySQL only added hash joins about five years ago** and likely still lacks sort-merge join; Snowflake, Databricks, Redshift, and DuckDB support all three ([`19:23`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=1163)).
