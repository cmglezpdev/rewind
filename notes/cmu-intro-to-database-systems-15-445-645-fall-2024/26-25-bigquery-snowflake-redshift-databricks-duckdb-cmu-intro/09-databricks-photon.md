# 09 — Databricks and Photon

## Why Photon exists

- Databricks is built on **Apache Spark**, but Spark is slow for OLAP: it was **row-based** and written in Java/Scala on the **JVM**, which gets in the way of a database engine the same way the OS does ([`1:03:12`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3792)).
- Lineage of attempts ([`1:04:00`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3840)):
  1. **Shark** — SQL compiled to MapReduce jobs (Hive-style) running on Spark. Slow.
  2. **Spark SQL** with a custom Scala **code-generation** engine. On large tables and large queries the **JVM would refuse to compile** the generated code and fall back to a slow interpreted path.
  3. **Photon** — not a standalone engine but a C++ enhancement to the Spark runtime; when Java hits an operator that has a Photon kernel, it invokes the C++ version instead ([`1:03:34`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3814), [`1:04:37`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3877)).
- A Photon paper exists; many CMU alumni (including 15-445/645 and 15-721 students, and a former PhD student) work on it ([`1:04:37`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3877)).

## How Photon works

- Shared-disk storage, **pull-based vectorized query processing** with **pre-compiled operator primitives** ([`1:05:02`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3902)).
- At runtime: build the query plan → identify which portions can be offloaded to Photon operators → cross into C++ through **JNI (Java Native Interface)** and run there ([`1:05:02`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3902)).

## Why they abandoned JVM code generation — the engineering lesson

- Building that engine required knowing **both** database internals **and** JVM internals; they struggled to hire for the intersection ([`1:05:41`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3941), [`1:06:08`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3968)).
- The team ended up spending its time running tools to figure out **what the JVM was doing**, rather than making the query engine faster ([`1:06:30`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3990)).
- The first C++ prototype was **slower than the previous engine**, but the team could iterate faster, hire from a much larger pool of C++ + database engineers, and exploit SIMD — so it overtook it ([`1:06:30`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3990), [`1:06:52`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4012)).

## Expression fusion — horizontal, not vertical

- Classic **vertical / operator fusion** merges a scan and its predicate into one for-loop; codegen engines do this, but Databricks avoids it because it hurts usability and observability ([`1:06:52`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4012), [`1:07:16`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4036)).
- Instead they do **horizontal fusion**: multiple predicates inside a single WHERE clause collapse into one compiled primitive ([`1:07:43`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4063)).
- Example: a `BETWEEN` on a date normally means two separate primitives (`>=` and `<=`) invoked sequentially, feeding one's output into the other. Fused, it is a **single function call** ([`1:07:43`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4063), [`1:08:11`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4091)).
- This works because, as a cloud service, they see every query and know the real (finite, reasonably sized) set of predicate patterns ([`1:08:11`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4091)).

## Shuffle: reverse recursive partitioning

- Where BigQuery splits an overfull partition, Databricks handles the opposite case: after the initial shuffle, an extra step **merges underutilized partitions** into fuller ones — recursive partitioning in reverse ([`1:08:41`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4121), [`1:09:06`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4146)).
