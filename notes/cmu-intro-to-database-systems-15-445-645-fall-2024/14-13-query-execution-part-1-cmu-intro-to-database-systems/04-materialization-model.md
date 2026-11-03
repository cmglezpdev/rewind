# 04 — The Materialization Model

## How it works

- Each operator exposes an `output()` function that returns **all** of its tuples at once into an output buffer ([`20:15`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1215), [`21:34`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1294)).
- Because the parent gets everything in one shot, it **never calls back** into the child ([`20:15`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1215), [`24:45`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1485)).
- The operator can emit all attributes or a **subset** — pushing projection down into the scan matters enormously ("if I have a one petabyte table… maybe I only need a small portion of it") ([`20:39`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1239), [`20:54`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1254)).

## Origin

- Developed in the **1990s** in the **MonetDB** project at **CWI, Amsterdam** ([`20:54`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1254)).
- MonetDB was designed as an OLAP system and was one of the first **column stores**, built around processing entire arrays/columns at once — which is why materialization seemed natural ([`24:07`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1447)).
- Historical note: the first version of **DuckDB** was called "MonetDBLite", an embedded MonetDB; the code was later thrown away and rewritten ([`20:54`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1254)).

## The obvious problem

- Passing a billion tuples up to a filter that matches only two means copying and then throwing away ~99.9% of the data ([`22:28`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1348), [`22:54`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1374)).

## Operator fusion

- **Operator fusion** = inline/combine operators inside the same pipeline to avoid the excess copying — e.g. scan `R` *and* apply the predicate in one loop, writing only survivors to the output buffer ([`22:54`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1374), [`23:27`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1407)).
- Applies to projections, filters, and limits (the latter only if there is no `ORDER BY` above) — not to everything ([`23:27`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1407)).
- Fusion is **not exclusive** to this model; it can be applied in the others too ([`34:11`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2051)).

## Why it can be fast (for OLTP)

- Avoids per-tuple `next()` calls, which "add up" — each is a jump in the CPU, and this dominates when the database is in memory and queries are very fast ([`25:01`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1501)).
- With an array-like plan layout there is **no indirection** to figure out what calls what; you just rip through the array ([`25:24`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1524)).
- Only viable for **OLTP**, where operator output is small ([`24:29`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1469), [`25:24`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1524)).

## Adopters

- **H-Store** (implemented "over 15 years ago"), which fed into the commercial **VoltDB** ([`25:24`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1524)).
- **CrateDB**, **RavenDB** (a document store, MongoDB-like) ([`25:24`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1524)).
- **MonetDB** still uses it; **HyRise** dropped it and moved to vectorization ([`25:53`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1553)).

## Verdict

- **Good for OLTP, bad for OLAP** ([`25:53`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1553)).
