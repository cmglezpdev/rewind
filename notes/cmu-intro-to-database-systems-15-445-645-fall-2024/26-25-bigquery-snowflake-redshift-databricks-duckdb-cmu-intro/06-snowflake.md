# 06 — Snowflake

The original cloud-native data warehouse designed from day one as a public product, unlike Dremel which was internal first ([`39:27`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2367)).

## Architecture

- Managed OLAP system written in **C++**, shared-disk, with **very aggressive compute-side caching** on local EC2 disks — because Snowflake, not the customer, pays for the S3 reads ([`39:55`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2395)).
- **Everything written from scratch**: no borrowed components, custom SQL dialect, custom network protocol. Rare today — most new systems reuse the Postgres front-end (Yugabyte) or an existing storage engine (CockroachDB started on RocksDB) ([`39:55`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2395), [`40:29`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2429)).
- **Push-based vectorized query processing** — the vectorized model came from the Snowflake co-founder's work at CWI/VectorWise; the push-based model came from the German (TU Munich) line of work ([`40:55`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2455), [`41:21`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2481)).
- **Pre-compiled operator primitives** via C++ templates over all possible data types, linked into the binary — inherited from VectorWise ([`41:21`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2481), [`42:08`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2528)).
- **JIT with LLVM in exactly one place**: codegen for serializing/deserializing data between workers — conceptually the same trick as Google protocol buffers ([`42:08`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2528), [`42:32`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2552)).
- **Metadata separated from data**: FoundationDB runs internally as the catalog, instead of the Postgres approach of storing catalog and table data in the same database ([`41:21`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2481), [`41:46`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2506)).
- **No buffer pool** — no spilling to disk logic, just "is it in my cache, yes or no", handled by a separate service ([`41:46`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2506)).
- Internal PAX columnar file format, with newer support for reading Parquet and others ([`41:46`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2506)).
- **No partial query retries**: the argument is that they are fast enough that restarting the whole query is fine — and the customer, not Snowflake, pays for it ([`42:32`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2552), [`42:54`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2574)).

## Adaptive optimization 1 — aggregation pushdown

- The query runs first **without** the pushdown. If Snowflake observes a scan producing far more data than expected and the plan only aggregates it after a join, it turns on an **early aggregation** below the join and rewrites the top of the plan to compensate ([`42:54`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2574), [`43:22`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2602)).

## Adaptive optimization 2 — flexible compute ("the bullpen")

- Only possible in the cloud: on-prem you cannot conjure extra nodes ([`44:03`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2643)).
- When a large scan looks like it will run slowly, Snowflake carves that portion out of the plan and runs it on **idle nodes borrowed from other customers** ([`44:27`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2667), [`44:46`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2686)).
- The idle customer is already paying for those nodes and is not told; the borrowing customer is **not charged extra** ([`44:46`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2686)).
- The borrowed work materializes its output to local cache (or S3 if too big); the plan is rewritten to table-scan that materialized result as if it were a native table. The borrowed nodes can die at any time ([`45:11`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2711)).
- Rationale: cloud resources are fungible and most machines are idle most of the time ([`45:47`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2747)).
