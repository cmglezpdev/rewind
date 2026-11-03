# 06 — Database Partitioning

## What and why

- **Partitioning** = dividing the database into **disjoint subsets** so load spreads evenly and you get full use of the hardware you pay for. If a node costs ~$5,000 and half of your 10 nodes sit idle, you are burning money [`32:05`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1925).
- Also called **sharding** in NoSQL systems (and in MMORPGs). The DBMS runs **query fragments** on each partition and combines the results into one answer [`32:05`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1925).
- **Limit**: partitioning only helps so much — if everyone asks the *same* question, every request hits the same tuple no matter how you split it [`37:54`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2274).

## 1. Naive table partitioning

- Each **whole table** is assigned to a different node [`33:04`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1984).
- Only works if a node can hold an entire table; fine when queries never span tables and access patterns are uniform — rarely true in practice, hence "naive" [`33:22`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2002).
- **Real use case**: MongoDB implemented it because a customer asked. They had an audit/logging table — extremely write-heavy, almost never read — and wanted those writes **isolated to their own partition** so they could not degrade the rest of the system [`33:22`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2002) [`34:20`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2060) [`34:48`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2088).

## 2. Vertical partitioning

- Split a table by **attributes** — "a hacky version of turning a row store into a column store" [`34:48`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2088).
- Like a column store you must keep metadata to reconstruct the tuple; **unlike** a column store you get none of the columnar query-execution optimizations (e.g. run-length encoding) [`34:48`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2088) [`37:07`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2227).
- Reference: work by **Daniel Abadi** (University of Maryland) exploring the limits of approximating a column store with a row store [`34:48`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2088).
- Example: a table with three INT columns and one large, rarely-accessed TEXT column → split attribute 4 into its own partition [`35:37`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2137) [`35:55`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2155).
- **Problem**: most queries now hit partition 1 → load imbalance returns. In practice you combine vertical **and** horizontal partitioning [`36:24`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2184).

## 3. Horizontal partitioning

Split a table's **tuples** into disjoint subsets by a partitioning key and scheme [`36:46`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2206).

| Scheme | How it works | Notes |
|---|---|---|
| **Hash** | Hash a column, use the hash value to pick the partition [`38:22`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2302) | See worked example below |
| **Range** | Contiguous key ranges per node (the earlier IDs 1–150 / 150–300 example) [`38:22`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2302) | |
| **Predicate** | Manually define partitions with a WHERE clause (e.g. species=human AND awake vs. asleep) [`38:45`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2325) | Very effective when done well, but **uncommon because it requires deeply understanding the workload** [`38:45`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2325) |

### Hash partitioning worked example

- Rows 101–105, partition key = the second column; compute `hash(key) mod 4` because there are 4 partitions [`39:18`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2358) [`39:44`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2384).
- At query time, `SELECT * FROM t WHERE partition_key = <value>` re-hashes the supplied value to locate the single relevant partition [`39:44`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2384).
- **Q&A**: a predicate on a *different* key forces scanning **every** partition — which is why choosing a good partition key matters [`40:20`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2420).

## Partitioning under each architecture

- **Shared-disk**: stateless compute nodes are assigned *responsibility* for ID ranges (node A → IDs 1,2; node B → IDs 3,4); the data itself stays in the shared logical disk [`40:48`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2448).
  - Are they really stateless? Yes — the "which IDs am I responsible for" mapping lives in the catalog metadata service, not in the node [`41:35`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2495).
  - **Why route deterministically at all? Caching.** Sending the same query to the same node lets it reuse data already fetched from S3 and lowers your AWS bill [`44:10`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2650) [`44:23`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2663).
- **Shared-nothing**: identical picture, except the **data physically lives with the node** [`44:34`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2674).

## Who assembles multi-partition answers

- The node the application server is talking to is **always** the one that returns the result. It internally contacts whatever other nodes it needs — it never tells the app server "now go talk to that node," because a single SQL query may encode many ID accesses at once [`42:15`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2535) [`42:55`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2575).
- The app server can talk to any node, but should be **guided by the catalog metadata service** to minimize cross-node communication [`42:55`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2575) [`43:49`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=2629).
