# 10 — DuckDB

"DuckDB is the opposite of all this" ([`1:09:06`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4146)).

## Positioning

- A **parallel but not distributed** system: shared-everything, running on a single machine — not a scale-out system ([`1:09:06`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4146)).
- Supports the **Postgres dialect**, plus deliberate ergonomic deviations from the SQL standard, e.g. `FROM table SELECT *` clause reordering — it breaks the standard but makes people happy ([`1:09:06`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4146), [`1:09:42`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4182)).
- Designed as an **embedded** system. From a Python/Jupyter notebook, data passes as in-memory **Arrow buffers** (columnar) that both sides understand, so there are **no extra copies** in either direction ([`1:09:42`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4182), [`1:10:05`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4205)).
- Almost entirely custom C++ with **no third-party dependencies** (even SSL is a separate extension) — which is what lets it compile to WASM and run in a browser ([`1:10:05`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4205), [`1:10:31`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4231)).

## The "most data isn't big" argument

- Evidence: an analysis by the Fivetran CEO of published Redshift and Snowflake query data found **most queries process less than about 1 GB** — not terabytes or petabytes ([`1:11:09`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4269), [`1:11:38`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4298)).
- 1 GB fits on a phone, so why pay for Snowflake or Redshift when a laptop will do? The lecturer agrees there is **a lot of merit** to this ([`1:11:38`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4298)).
- Caveat: Snowflake and friends offer data sharing and report generation that a single box cannot. But for **quick and dirty data processing, DuckDB should be the default choice for a lot of people** ([`1:12:00`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4320)).

## Execution model — and the 2021 rewrite

- Uses **pre-compiled primitives** (VectorWise lineage) and **morsel-driven parallelism** (another German idea) for splitting work across workers ([`1:12:00`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4320), [`1:12:22`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4342)).
- DuckDB started **pull-based** and did a complete rewrite to **push-based in 2021**; the design rationale is documented in a public PR by Mark ([`1:12:22`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4342)).
- Core reason: in a pull-based `GetNext` chain, a leaf node blocking on a network read from S3 has **no clean way to yield back up the stack**. A push-based model gives a centralized view of all running jobs and therefore better scheduling decisions ([`1:12:22`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4342), [`1:13:14`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4394)).

## Compressed execution and the unified vector format

- Unlike BusTub, where tuples are just passed up as-is, a vectorized engine can apply **lightweight compression to data moving between operators**, avoiding copying whole tuples ([`1:13:14`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4394), [`1:13:37`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4417)).
- Special-case vectors ([`1:14:06`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4446)):
  - **Constant vector** — one value plus a repeat count (run-length encoding).
  - **Dictionary vector**.
  - **Delta / sequence vector** — for a primary key column, send "6 values starting at 1, increment 1" instead of 1,2,3,4,5,6.
- Result: faster and less memory, on the fly ([`1:14:28`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4468)).
- The problem this creates: you cannot afford a pre-compiled primitive for every (predicate variant × vector encoding) combination ([`1:14:28`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4468)).
- The fix: a **unified data format** where every vector has the same layout — data plus a **selection vector** plus metadata flagging its type — so the *same* pre-compiled primitives work on all of them ([`1:14:54`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4494), [`1:15:12`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4512)).
