# 10 — How real systems compare

Andy shows a table the CMU group assembled for a survey paper comparing MVCC implementations across production systems [`1:08:29`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4109).

## Version storage across systems

| System | Version storage | Chain order | Notes |
|---|---|---|---|
| **PostgreSQL** | Append-only | Oldest → newest | The standout outlier; HOT updates avoid index churn ~40% of the time [`1:08:29`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4109) [`56:17`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3377) [`1:25:03`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=5103) |
| **MS SQL Server Hekaton** | Append-only | — | Append-only chosen because it was grafted onto SQL Server to add in-memory storage [`1:09:00`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4140) |
| **MySQL / InnoDB** | Delta (rollback segment) | Newest → oldest | Secondary indexes store primary keys, so updates never touch them [`40:10`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2410) [`57:09`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3429) |
| **Oracle** | Delta | — | Its "serializable" level is really snapshot isolation [`26:48`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1608) [`29:35`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1775) |
| **MS SQL Server (classic)** | Time-travel | Newest → oldest | Retrofit onto an originally single-version 2PL engine [`39:04`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2344) [`39:32`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2372) |
| **SAP HANA** | Time-travel | Oldest → newest | GC/compaction promotes the latest version into the main table [`39:32`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2372) |
| **HyPer / Hyrise** | Delta | — | Hyrise abandoned append-only and switched to deltas [`1:09:00`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4140) |

## Headline conclusions

- **Append-only is a bad idea for most systems.** The systems still using it either predate the consensus or adopted it for a specific in-memory/distributed reason [`1:09:00`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4140).
- Every other modern system, unless it forks PostgreSQL, does it the MySQL/Oracle (delta) way [`29:35`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1775).
