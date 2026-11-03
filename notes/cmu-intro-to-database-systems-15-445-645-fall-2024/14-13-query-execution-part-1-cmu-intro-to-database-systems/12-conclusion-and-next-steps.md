# 12 — Conclusion and Next Steps

## Closing points ([`1:21:22`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4882), [`1:21:52`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4912))

- The **same logical query plan can be executed in many different ways**; the right choice depends on the workload, the data, and the hardware.
- You must design the system with an expectation of what queries will arrive.
- In the OLTP world, use **index scans** as much as possible and avoid sequential scans — though the lecture showed many tricks (zone maps, compression, prefetching, late materialization) to make unavoidable sequential scans cheaper.
- **Expression trees are flexible** — they can represent anything — **but they are slow**.
- **JIT compilation can speed things up in the right situation**, not universally.

## Next lecture ([`1:22:16`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4936))

- **Parallel query execution**: taking the same query plan and, instead of one thread scanning one table at a time, scanning in parallel.
- Also flagged for next class: **SIMD** (data parallelization), which is distinct from the vectorization/batch model discussed here ([`29:01`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1741), [`41:09`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2469)).
- The week after: **query optimization** — how the system picks among the operator implementations and indexes discussed here ([`4:10`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=250), [`48:30`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2910)).
- Two weeks out: **transactions**, which answers the deferred rollback question ([`1:04:08`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3848)).

## Course logistics mentioned ([`0:27`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=27), [`1:20`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=80), [`1:47`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=107))

- Project 2 due that Sunday; Saturday office hours 3–5pm.
- Homework 2 out Wednesday, due November 3rd.
- Midterm grades to be posted.
- Optional guest speakers upcoming: Spice AI, Exon, Sonata (streaming) — several built on DataFusion.
- **Project 3 requires solving the Halloween problem** ([`1:02:15`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3735)).
