# 07 — Access Methods and Sequential Scans

## The three access methods

Access methods sit at the **leaves** of the query plan and are independent of processing model and direction ([`38:04`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2284)):

1. **Sequential scan** — brute force, read every page ([`38:43`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2323)).
2. **Index scan** — many variants depending on the structure (hash table, B+Tree, trie, …) ([`38:43`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2323)).
3. **Multi-index scan** — use several indexes and combine their results ([`38:57`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2337)).

Clustered vs. non-clustered data changes which optimizations apply ([`39:14`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2354)).

## Sequential scan mechanics

- Default when there is no index, or no index that helps ([`39:14`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2354)).
- It is the first access method you implement in a new DBMS, because it proves the data you stored is actually there ([`39:14`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2354)).
- Loop: for each page, retrieve it from the buffer pool by page ID (via the page directory); for each tuple on the page, evaluate the predicate ([`39:42`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2382), [`40:05`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2405)).
- The scan operator keeps a **cursor** — last page and last slot — so it can resume on the next `next()` call ([`40:28`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2428)).
- **LSM trees are worse here**: for `SELECT *` with no `WHERE`, you must examine everything, because a lower SSTable may hold a record absent from the upper levels ([`39:42`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2382), [`40:05`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2405)).

## Optimizations for sequential scans

Listed at [`41:09`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2469) / [`41:53`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2513) / [`42:14`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2534):

- **Data compression** — more tuples per fetched page ([`41:09`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2469)).
- **Prefetching / pre-loading pages** ([`41:09`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2469)).
- **Scan sharing** and **buffer pool bypass** — avoid polluting the buffer pool with pages you will not need again ([`41:09`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2469)).
- **Task parallelization / multi-threading** and **data parallelization (vectorization)** — covered next class ([`41:09`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2469), [`41:53`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2513)).
- **Clustering / sorting** the data to match the `WHERE` clause ([`41:53`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2513)).
- **Late materialization** — pass record IDs around in a column store and only fetch the data you finally need ([`41:53`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2513)).
- **Data skipping** — see the next topic ([`42:14`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2534)).
- **Materialized views / result caching** — cache the result of a repeated query; materialized views let queries pull subsets out of a stored intermediate result. The hard part is keeping them in sync with the base table ([`42:14`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2534), [`42:34`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2554)).
- **Code specialization / compilation** — instead of giant switch statements on operator or data type, JIT or pre-compile specialized functions using the known schema ([`42:58`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2578), [`43:15`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2595)).
