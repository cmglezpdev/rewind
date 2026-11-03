# 06 — I/O Parallelism

## Why computational parallelism is not enough

- Everything so far was **computational** parallelism. If the bottleneck is the disk, more workers do not help — even modern NVMe SSDs have bandwidth limits when a query must read a lot of data ([`33:11`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1991)).
- A latched page table can also become a bottleneck ([`33:11`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1991)).
- If all parallel workers block on disk, parallelism stops paying off ([`33:45`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2025)).
- Mitigation preview: schedule the in-memory worker first while the disk-bound worker's I/O happens asynchronously in the background, so useful work always progresses — but if the disk is simply slow, parallelism only goes so far ([`33:45`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2025)).

## Spreading data across storage devices

Increasing disk bandwidth by reading from several devices concurrently ([`34:24`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2064)). Options ([`34:53`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2093)):

- One disk per database.
- Multiple disks per database — logically one database, physically many devices.
- One relation per disk, or one relation split across disks.
- Separate the **write-ahead log** (write-intensive) onto its own disk so log writes never interfere with table reads.

### How different systems expose it

| System | Mechanism |
|---|---|
| Oracle | Explicit control: put the WAL on this drive, split tables across those drives; the DBMS manages it ([`35:37`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2137)) |
| MySQL | Symlinks inside the data directory to different drives — the DBMS has no idea, but the parallelism is real ([`36:05`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2165)) |
| PostgreSQL | **Tablespaces** map tables to physical locations on disk ([`36:05`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2165)) |

## Striping vs. mirroring

Example: a database of six pages across three disk drives ([`36:31`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2191)).

| | **Striping (RAID 0)** | **Mirroring (RAID 1)** |
|---|---|---|
| Layout | Pages written round-robin: p1→disk1, p2→disk2, p3→disk3, then wrap ([`36:51`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2211)) | Every page written to every disk ([`37:38`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2258)) |
| Reads | One-to-one page→disk mapping ([`37:38`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2258)) | Faster — any drive can serve any page ([`37:38`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2258)) |
| Writes | Cheap, single write | Expensive — written in triplicate ([`37:38`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2258)) |
| Capacity | Full | Cut to 1/3 with three drives ([`39:43`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2383)) |
| Durability | Weaker ([`39:43`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2383)) | Survives a drive crash ([`39:21`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2361)) |

- The **page directory** introduced earlier in the semester is what records which drive and location holds each page when the DBMS manages this itself ([`36:51`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2211)).
- **Hardware RAID** makes many devices look like one logical, faster/larger disk; the DBMS is unaware ([`38:20`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2300)).
- **Software-managed** approaches allow blends beyond pure striping or mirroring — e.g. **erasure coding** — and are typically faster and more flexible than hardware support, but not every system implements them ([`38:54`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2334)).
- The core trade-off triangle: **performance vs. durability vs. capacity** ([`39:21`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2361)).

## Object storage changes the calculus

- S3 (or the equivalent cloud object store) stores data roughly **five times** over, entirely transparently — the DBMS does not know where a read or write physically lands ([`39:43`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2383)).
- S3 is **not fast** — potentially hundreds of milliseconds per read/write — but Amazon manages all of it for you. The trade-off is how much you do yourself vs. delegate to hardware or a cloud service ([`40:34`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2434)).

## Partitioning / sharding

- Horizontal intra-operator parallelism needs the data partitioned or sharded on some attribute so each operator instance gets a disjoint portion ([`40:51`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2451)).
- Separate directories make this trivially easy ("this operator reads that directory"), but the goal is **explicit partitioning inside the DBMS**, which decides how to divide, where to store, and how to bring data back into memory in parallel ([`40:51`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2451)).
- Again the SQL advantage: the same query should work whether or not the database is partitioned, because it only addresses logical tables — the goal, though it does not always hold in practice ([`41:44`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2504)). Details deferred to the distributed databases lectures around Thanksgiving ([`41:44`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2504), [`42:17`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2537)).

## Wrap-up of the lecture half

- Parallel execution is essential — **every** major DBMS does some variation of it ([`42:17`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2537)).
- Even SQLite, an embedded system without the feature set of Oracle/DB2/SQL Server, supports **inter-query** parallelism: multiple readers plus a single writer ([`42:17`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2537)).
- The hard parts are coordinating workers, scheduling them, handling writes, and handling simultaneous disk reads — and ideally you do all of it yourself rather than trusting the OS ([`42:51`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2571), [`43:10`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2590)).
- Next class: **query optimization** — turning a SQL query into the physical plan the workers execute. Only one lecture this semester; the instructor calls it the topic he knows the least about, and notes a full course on it is taught in Spring 2025 ([`43:10`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2590), [`43:34`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2614)).
