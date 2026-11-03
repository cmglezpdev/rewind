# 01 — Why Joins Exist and What This Lecture Covers

## Why we need joins

- Relational schemas are **normalized**: one big table is split into smaller referencing/dimension tables via keys ([`4:35`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=275)).
- Andy explicitly skips normal-form theory ("nobody uses that in the real world") — you only need to know normalization exists ([`5:02`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=302)).
- The join operator is the **mechanism to reconstruct the original tuple/entity** (e.g. Andy's account + all of Andy's orders) ([`5:39`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=339)).
- Correctness requirement: joins must be lossless — no missing matches, exact answer ([`5:39`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=339), [`6:01`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=361)).

## Scope restrictions for the lecture

- **Inner equi-joins only**: exact match, predicate is equality ([`6:01`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=361)).
  - Most real-world queries are inner equi-joins; left outer join is the second most common; anti-joins and semi-joins are special cases covered later ([`6:30`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=390)).
- **Binary joins only**: two tables at a time. A 3-table query feeds the output of the first join into the next binary join ([`6:53`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=413), [`7:14`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=434)).
- **Multi-way joins** exist in the literature but nobody ships them: performance is too variable. Microsoft added them to SQL Server around 1998 and **removed them in 2001** ([`7:14`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=434)).
- **Worst-case optimal joins** (graph-style traversals) are rare — only Umbra, CedarDB, and RelationalAI are cited; taught in the advanced course, not here ([`8:04`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=484)).
- **Join ordering and algorithm choice** belong to the query optimizer + cost model, covered after fall break ([`8:32`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=512)).

## Recurring theme from the previous lecture

- Datasets (base tables or intermediate results) can be **larger than available memory**; the answer is always **divide and conquer** — break into memory-sized chunks, then merge back ([`3:09`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=189)).
- Every data-intensive algorithm reduces to one of two choices: **sorting or hashing** ([`4:11`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=251)).
- Spoiler stated up front: **hash joins are almost always the faster choice** ([`4:11`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=251)).

## Rule of thumb introduced early

- The **left/outer table should always be the smaller one**, for performance reasons demonstrated by every algorithm that follows ([`8:32`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=512), [`9:21`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=561)).
- Query plans are trees (some systems use DAGs); data flows bottom-up and the root emits the query output ([`9:21`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=561), [`9:50`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=590)).
- The logical plan does not specify the join algorithm nor which side is inner vs outer ([`9:50`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=590), [`10:15`](https://www.youtube.com/watch?v=MFazkaZKs1s&t=615)).
