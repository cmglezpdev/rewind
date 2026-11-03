# 08 — Compaction, RocksDB, and the trade-offs

## How compaction works

- A background process watches level sizes; when a threshold trips, SSTables in that level are combined into new ones [`41:15`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2475)
- Because in-place updates are impossible, compaction **always produces a new SSTable** [`41:15`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2475)
- It speeds reads by removing redundant entries [`41:45`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2505)
- Algorithm: a **sort-merge** with one iterator per SSTable, comparing keys; when two entries share a key, keep the **newest** [`41:45`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2505) [`31:39`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1899)

### Worked two-table merge [`42:16`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2536)

- Key 100 appears only in the older table and is less than key 101, so it is emitted unchanged [`42:16`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2536)
- In the older SSTable, the entries for keys 101, 102 and the DELETE of 103 are **dropped**, because the newer SSTable has PUTs for all of them [`42:43`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2563)
- The older table's PUT for key 104 is **retained**, since 104 is absent from the newer table [`42:43`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2563)
- Whether the merged result stays at the same level or moves down varies by system, with pros and cons either way [`43:17`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2597)

## Q&A

- *Range scans within a level?* Yes, you would have to touch every SSTable at that level — "that sucks, don't do that"; use a secondary index instead [`43:34`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2614)
- *How often should compaction run?* "It depends" — on the data, the workload, and the hardware. RocksDB exposes so many tuning knobs that nobody gets it right; it is genuinely hard [`44:22`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2662)

## RocksDB and its lineage

- Log-structured storage is far more common now than in the 1990s or mid-2000s, largely because RocksDB is so widely embedded [`44:59`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2699)
- Lineage: **BigTable / Jeff Dean at Google → LevelDB → Facebook forked it into RocksDB** [`45:19`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2719)
- The **first thing Facebook did** on forking LevelDB was rip out `mmap` — letting the OS manage pages is "a terrible idea" — and write a proper buffer manager (the same thing students build in Project 1) [`45:19`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2719)
- RocksDB is **embedded** (runs inside your process); systems build larger architectures on top — e.g. **CockroachDB** started as a distributed layer over RocksDB [`45:57`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2757)
- **Neon** replaced Postgres's tuple-oriented heap-file storage with distributed log-structured storage, plus a **page server** that materializes Postgres-shaped pages from log records on demand [`46:14`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2774) [`46:28`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2788)

## Downsides

- **Write amplification** is the big one: a single logical write is rewritten many times over the tuple's lifetime — MemTable → first SSTable → compacted into the next level, and so on. One write can become dozens or hundreds of physical writes, burning out an SSD or running up a cloud bill [`46:51`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2811) [`47:19`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2839)
- By contrast, in tuple-oriented storage with slotted pages, an inserted tuple lands in a page and (ignoring vacuum/MVCC) lives there for the life of the database, never rewritten [`47:37`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2857)
- **Compaction is not cheap**: fast inserts are paid for later by background cleanup work [`47:54`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2874)
- The general framing: "there's no free lunch" — tuple-oriented pays up front and reads cheaply; log-structured is the opposite [`47:54`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2874) [`48:24`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2904)
