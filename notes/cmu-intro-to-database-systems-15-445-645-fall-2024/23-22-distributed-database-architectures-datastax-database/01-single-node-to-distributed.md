# 01 — From Single-Node to Distributed: Why Coordination Changes Everything

## Where the course stands

- By this point in the semester students already have all the ingredients for a **single-node** DBMS like SQLite, MySQL or Postgres, built bottom-up through the projects: storage/buffer pool (P1), B+Tree index (P2), query execution & planning (P3), concurrency control (P4), plus logging & recovery [`1:00`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=60) [`1:38`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=98).
- Guest lecturer stands in because Andy Pavlo is in Chicago; these three distributed lectures are explicitly a **crash course** — the goal is vocabulary and design trade-offs, not building one [`3:02`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=182) [`3:23`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=203).

## The central theme: coordination

- Everything single-node still applies; what is new is that nodes must exchange **messages** — at the query planner, at the disk/buffer-pool layer, or anywhere between [`2:26`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=146).
- The recurring question becomes: should a query **pull data from other nodes**, or push work to a central location? [`2:48`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=168)

## Parallel vs. distributed databases

| | Parallel DB | Distributed DB |
|---|---|---|
| Node locality | Same data center / same rack [`3:38`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=218) | Geographically far apart (east coast vs. west coast, Asia) [`4:07`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=247) |
| Network | High-speed LAN [`3:38`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=218) | Public network / internet [`4:07`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=247) |
| Communication cost | Nanoseconds to microseconds, assumed small [`3:38`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=218) | Large — the **speed of light starts to matter** across continents [`4:30`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=270) |
| Reliability | Messages assumed to arrive [`3:38`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=218) | Messages can be lost, duplicated, delayed, or reordered; TCP/IP retries only go so far and undersea cables get cut [`4:40`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=280) |

## Why bother going distributed at all?

- **Availability zones / disaster tolerance.** A student asked whether it is just about cost; the answer was survivability: a west-coast-only parallel deployment goes dark when a cyclone cuts the region off, whereas an east+west deployment keeps serving [`5:08`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=308) [`5:30`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=330).

## What breaks per component

- **Query optimization/execution** — the cost model must now account for *where data lives* and the cost of moving it between nodes [`6:31`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=391).
- **Concurrency control** — the hardest part: every node must agree on (1) *what* happened and (2) *in what order*; even agreeing on the current time is hard [`6:56`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=416).
- **Logging & recovery** — a single node is simply up or down; with 20 nodes and 2 failures, "is the system up?" has no obvious answer [`6:56`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=416).

## Agenda for the lecture

1. System architectures 2. Design issues 3. Partitioning schemes 4. Fast preview of distributed concurrency control 5. DataStax flash talk [`7:37`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=457) [`7:57`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=477).
- Next lectures (with Andy back): distributed OLTP, then distributed OLAP [`6:18`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=378).
