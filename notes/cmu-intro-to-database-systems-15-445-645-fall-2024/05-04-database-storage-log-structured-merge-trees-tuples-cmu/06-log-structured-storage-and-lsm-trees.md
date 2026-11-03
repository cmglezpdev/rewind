# 06 — Log-structured storage and LSM trees

## The idea

- Instead of slotted pages with in-place updates, maintain a **log**: a ledger of changes made to tuples [`24:51`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1491)
- Each log entry is one of exactly two operations: **PUT** (install a record) or **DELETE** [`25:13`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1513)
- Reads are answered by replaying / searching the log [`25:13`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1513)

## Provenance

- Log-structured merge trees date to a **1996** seminal paper (recalled as out of UMass Boston) [`25:13`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1513)
- Derived from earlier **early-1990s** work on log-structured file systems [`25:13`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1513)

## The two data structures

| Structure | Where | Role |
| --- | --- | --- |
| **MemTable** | Memory | Accepts in-place updates; holds only the working set / latest changes, not all keys [`25:55`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1555) |
| **SSTable** | Disk | Immutable file of log records, sorted by key, produced when the MemTable fills [`26:25`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1585) |

- Over time SSTables accumulate redundant information, so they must be **compacted** to speed up reads and reclaim space [`26:25`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1585)
- The MemTable can be any ordered structure: RocksDB uses a **skip list**; a B+Tree or trie works equally well. All that matters is that leaves are ordered by key and map key → value [`26:56`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1616) [`32:52`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1972)

## Worked example

- PUT key 101 → A1: new leaf entry in the MemTable [`27:21`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1641)
- PUT key 102 → B1: another leaf entry [`28:12`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1692)
- PUT key 101 again: the MemTable is checked first; since 101 exists, its entry is **updated in place** — cheap because it is in memory [`28:28`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1708)
- PUT key 103: MemTable is now full (toy limit of three entries) [`28:47`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1727)
- Flush: allocate a fresh MemTable for new writes, then in the background walk the leaf nodes (already key-sorted), emit one log record per key, and write the SSTable out; the old MemTable memory is then freed [`28:47`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1727) [`29:35`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1775)

```mermaid
flowchart LR
  W[PUT / DELETE] --> M[MemTable in memory<br/>in-place updates]
  M -->|full| F[Flush: walk sorted leaves<br/>emit log records]
  F --> S0[SSTable at Level 0<br/>sorted low → high key]
  S0 -->|compaction| S1[Larger SSTables at Level 1]
  S1 -->|compaction| S2[Level 2 ...]
```

## Q&A points

- *Why convert to log records instead of serializing the MemTable itself?* Because the tree's guideposts (split bookkeeping etc.) are unnecessary on disk — a plain sorted log plus binary search is enough [`32:28`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1948)
- *Are there stacked PUTs for the same key in an SSTable?* No — the MemTable overwrote them in memory before the flush [`33:28`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2008) [`33:49`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2029)
- *Why a tree rather than a log in memory?* For fast lookups; the MemTable is only a few hundred MB, while the disk levels can be GBs, TBs, or PBs [`33:49`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2029) [`34:06`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2046)
