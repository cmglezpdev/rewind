# 04 — Intra-Operator Parallelism and the Exchange Operator

## The idea

- Operator invocations in the query plan are **replicated across workers**, and each instance processes a **disjoint subset** of the input data ([`22:33`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1353)).
- Example: a 1,000-tuple table with four worker threads → each worker gets 25% of the data, then scans, filters, and projects independently, with no coordination and no duplicated work ([`23:00`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1380)).
- The problem this creates: at some point the pieces must be **put back together** — you cannot probe a hash table until it is completely built, or you produce false negatives ([`23:22`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1402)).

## The exchange operator

- A new operator with **no counterpart in relational algebra**; it exists purely to coalesce data ([`23:45`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1425)).
- It acts as a **pipeline breaker / barrier**: the plan cannot proceed upward until every child operator below reports it has produced all its results ([`23:45`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1425), [`26:30`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1590)).
- Independent of push vs. pull and of the iterator / materialization / vectorized processing models ([`23:45`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1425)).
- Naming and lineage ([`24:11`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1451), [`24:36`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1476)):
  - PostgreSQL calls it **Gather**.
  - Conceptually the same as the barrier between MapReduce phases.
  - Originally described by **Goetz Graefe** (author of the B+tree survey, and the subject of the next lecture on query optimization) in the late 80s / early 90s for the **Volcano** project.

## Worked example: `A ⋈ B ON a.id = b.id` with filters on both values

```mermaid
flowchart BT
    subgraph Build side — table A
      SA1[Scan A shard 1] --> FA1[Filter a.value] --> PA1[Project a.id] --> HT1[Build hash table]
      SA2[Scan A shard 2] --> FA2[Filter a.value] --> PA2[Project a.id] --> HT2[Build hash table]
      SA3[Scan A shard 3] --> FA3[Filter a.value] --> PA3[Project a.id] --> HT3[Build hash table]
    end
    HT1 --> EX1[Exchange / barrier]
    HT2 --> EX1
    HT3 --> EX1
    EX1 --> J[Join]
    subgraph Probe side — table B
      SB1[Scan B shard 1] --> FB1[Filter + project]
      SB2[Scan B shard 2] --> FB2[Filter + project]
      SB3[Scan B shard 3] --> FB3[Filter + project]
    end
    FB1 --> J
    FB2 --> J
    FB3 --> J
    J --> EX2[Exchange / Gather] --> OUT[Single output stream]
```

Sequence of the example ([`24:36`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1476) → [`27:31`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1651)):

1. Table A is split into three partitions/shards, each assigned to a worker ([`25:08`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1508)).
2. Each worker builds its own pipeline — scan, then filter on `a.value` — without coordinating ([`25:22`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1522)).
3. The projection is **pushed down** to discard everything except `a.id`, since that is all the join needs; also fully parallel ([`25:42`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1542)).
4. All workers write into a **single global hash table** (simplified; high-end systems use multiple hash tables) ([`25:42`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1542)).
5. The exchange operator above the build side waits until every worker says "I processed everything, never come back to me" ([`26:30`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1590)).
6. Only then does the join operator run ([`26:53`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1613)).
7. Table B is likewise split in three, filtered, projected, and **probes the hash table in parallel** — no exchange is needed above the probe, since matched tuples just flow out ([`26:53`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1613)).
8. A final exchange above the probe pipelines signals completion and produces a single output stream ([`27:31`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1651)).

## Taxonomy of exchange operators (SQL Server terminology)

| Type | Inputs → outputs | Notes |
|---|---|---|
| **Gather** | many → 1 | The most common form ([`27:52`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1672)) |
| **Distribute** | 1 → many | Re-shards/repartitions a single stream ([`27:52`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1672)) |
| **Repartition** | many → many | No one-to-one match required — e.g. 3 inputs → 2 outputs ([`28:22`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1702)) |

## Repartition / shuffle and adaptive execution

- Distribute and repartition are frequent in distributed systems, where the data must be rebalanced as it arrives ([`28:22`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1702)).
- **Dremel / BigQuery** (Dremel is Google's internal name for BigQuery) inserts an explicit repartition step — a **shuffle** — between every single pipeline ([`28:49`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1729)).
- Why: the plan is built on assumptions about the data. At runtime the filters may prove more selective than expected (plan for 100 workers, need 80), less selective (need 200), or the assumed uniform distribution may turn out badly skewed — so the plan is reorganized dynamically/adaptively ([`29:11`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1751), [`29:35`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1775)).
- Most systems do **not** implement this adaptivity, but repartition is common in OLAP systems and data warehouses ([`29:35`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=1775)).
