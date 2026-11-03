# 01 — Why Parallel Execution

## Context of the lecture

- Re-recording of the Wednesday class: the original audio was lost, so the lecture was recorded on a Saturday in the lab ([`0:24`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=24)).
- Previous class covered *how data moves between operators* in a query plan: single tuple vs. all tuples vs. batches, and push vs. pull control flow ([`1:06`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=66)).
- Everything in the course so far (except concurrency control and indexes) assumed **one worker, one thread**, no interference ([`1:47`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=107)).

## Terminology

- The lecture deliberately says **worker**, not thread or process: a worker is a higher-level computational component that may be a process, a thread, or a combination ([`2:13`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=133)).

## Why run queries in parallel

- Modern hardware exposes parallel resources everywhere: multiple cores per CPU (essentially every laptop has ≥ 4), multiple CPU sockets, multiple non-volatile storage devices ([`2:47`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=167)).
- Motivations ([`2:47`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=167), [`3:22`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=202)):
  - The database may not fit on one node → scale out horizontally or up vertically.
  - Higher performance: faster individual queries, more concurrent queries.
  - Fault tolerance and redundancy through replication (covered later, in distributed systems).

## The invariant that must hold

- A SQL query must produce the **same result** whether it runs on one laptop core or thousands of distributed cores ([`3:57`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=237)).
- This is the separation between the logical and the physical representation of data: the application declares *what* it wants; the DBMS decides *how* and *where* to execute it ([`3:57`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=237), [`4:24`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=264)).

## Parallel vs. distributed databases

| | Parallel DB | Distributed DB |
|---|---|---|
| Resource locality | Physically close — same silicon, same box, same rack ([`4:37`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=277)) | Far apart — different racks, data centers, regions, worst case another planet ([`6:08`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=368)) |
| Communication | Assumed fast, reliable, cheap; a lost message means the machine is already broken ([`5:30`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=330)) | Cannot assume fast **or** reliable ([`6:39`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=399)) |
| Protocol burden | None for message loss | Algorithms must tolerate message loss and node failure ([`6:39`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=399)) |

- This lecture is explicitly about **parallel** databases; distributed databases come at the end of the semester ([`7:07`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=427)).

## Lecture roadmap

1. Process models — how workers are organized ([`7:07`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=427)).
2. Variations of parallel query execution.
3. I/O parallelism.
4. A ClickHouse guest talk by Robert, which the instructor says covers essentially the same material from an industrial angle ([`7:07`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=427)).
