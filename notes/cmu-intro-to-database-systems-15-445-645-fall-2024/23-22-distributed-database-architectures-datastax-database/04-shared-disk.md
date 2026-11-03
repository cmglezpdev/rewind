# 04 — Shared-Disk Architecture in Depth

## Definition

- Nodes access a **single logical disk** over an interconnect (think direct access to cloud storage like Amazon S3). Each node keeps its own CPU and memory, and may keep a local disk purely as a larger cache [`21:08`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1268) [`21:35`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1295).

## Why it failed in the 1980s and won in the 2010s

- The design dates to the **1980s but was not successful then**; what changed is the public cloud [`21:35`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1295).
- S3-style infrastructure let database developers **stop implementing the shared-storage layer themselves**: effectively infinite storage (bounded by your credit card) with replication handled for you [`21:51`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1311).

## The key benefit: decoupled scaling

- Compute (above the network) and storage (below it) scale **independently**. In shared-nothing, more storage forces more compute and more compute forces data duplication; here you buy CPU or disk separately [`22:20`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1340).
- Called out as "the really beautiful part" of the architecture [`22:20`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1340).

## What it enables

- **Data lakes** — users do not want to load data into a database; they want to point at a pile of CSV/JSON/Parquet files in S3 and say "query it, figure it out yourself." Shared-disk *facilitates* the data-lake model because any data is already abstractly accessible without native ingestion [`23:02`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1382) [`23:31`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1411) [`25:25`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1525).
- **Serverless** — stateless compute nodes whose data's final resting place is the cloud. Idle nodes can be shut down harmlessly; in shared-nothing, shutting a node down loses access to its data [`23:31`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1411) [`24:00`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1440).

## Worked example: reads are cheap to scale

1. Two nodes with own CPU/memory; catalog metadata still routes the app server; storage is one logical disk [`26:02`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1562).
2. The node must **translate the tuple ID into a shared-disk ID** — e.g. ID 101 → page ABC in an S3 bucket, ID 102 → page XYZ [`26:24`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1584).
3. If ID 101 becomes hot, **no data copying is needed**: a new node simply translates and reads it directly from the shared layer. This is the easy-scaling advantage over shared-nothing, where the tuple had to be copied [`26:59`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1619).

## The hard part: updates and cache invalidation

- Updating ID 101 is easy; ensuring **every node holding a local copy (in memory or on local disk) learns about it** is not [`27:31`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1651).
- Three options sketched (Andy covers them next lecture) [`27:31`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1651) [`27:58`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1678):
  - Broadcast an invalidation message to all nodes.
  - Flip an invalidation bit in the catalog metadata, checked on next access.
  - Use a gossip protocol between nodes.
