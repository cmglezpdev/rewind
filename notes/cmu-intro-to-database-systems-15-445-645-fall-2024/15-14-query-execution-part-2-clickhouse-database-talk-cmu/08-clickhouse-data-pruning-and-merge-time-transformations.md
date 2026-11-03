# 08 — ClickHouse: Data Pruning and Merge-Time Transformations

## Aggressive data pruning

Principle: make `SELECT` skip as much data as possible — **every byte you don't read and don't process helps performance** ([`48:07`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2887)). Three techniques ([`48:37`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2917)):

### 1. Primary key indexes

- Each part is already sorted by the primary key columns; ClickHouse additionally builds an index structure mapping **primary key values → granules** ([`48:37`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2917)).
- The mapping is tiny relative to the table and is **kept in memory**: **1,000 entries index ~8 million rows** ([`48:37`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2917)).
- A query filtering on a **prefix of the primary key columns** uses the index to locate the right granules directly instead of scanning ([`48:37`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2917), [`49:19`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2959)).

### 2. Table projections

- A projection is an **alternative version of a table**: the same rows, sorted by a **different primary key** ([`49:19`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2959)).
- Use them when many queries filter on columns other than the original primary key ([`49:19`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2959)).
- They exist at **part granularity**: a part can have zero, one, or several projections, and the query engine picks the optimal representation to read **per part at query time** ([`49:42`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2982)).

### 3. Skipping indexes

- Annotate granules with metadata so the scan can decide whether **no rows / some rows / all rows** in a granule match the predicate ([`49:57`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2997)).
- Types: min/max value per granule, unique values, or a **bloom filter** per granule ([`49:57`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2997)).
- Trade-off: **more lightweight than projections, but far more data-dependent and hard to tune** ([`49:57`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=2997), [`50:34`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3034)).

## Merge-time data transformation

The background merge job can apply extra transformations while combining parts ([`50:34`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3034)).

| Merge type | Behavior |
|---|---|
| **Replacing merge** | Rows with the same primary key values across input parts are treated as duplicates; only the row from the **most recently inserted part** survives — conceptually a merge-time update mechanism ([`51:05`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3065)) |
| **TTL merge** | Looks at the age of input parts and compresses, moves, or deletes tuples based on age ([`51:27`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3087)) |
| **Aggregating merge** | Pre-computes aggregates at merge time ([`51:27`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3087)) |

### Aggregating merges in detail

- **Problem**: `GROUP BY` over billions/trillions of rows is very expensive — a normal aggregation scans the whole table, builds a hash table, and updates aggregates per row ([`51:27`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3087)).
- **Solution**: do the aggregation at merge time; the `SELECT` then reads **pre-calculated aggregates** instead of scanning everything ([`52:04`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3124)).
- Aggregate columns use special data types that can be **updated incrementally** — e.g. average latency is stored internally as a **(sum, count)** pair ([`52:04`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3124), [`52:37`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3157)).
- **Worked example** for region APAC ([`52:37`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3157), [`53:07`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3187)):

  | Input part | sum | count |
  |---|---|---|
  | Top-left | 80 | 1 |
  | Top-right | 180 | 3 |
  | **Merged** | **260** | **4** |

### Trade-off

- Upside: calculations are **decoupled from normal queries** and do not affect them ([`53:07`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3187)).
- Downside: **you cannot control when the transformation happens or on which parts**. For use cases where that matters, ClickHouse can run at least some of these transformations at **query time** instead ([`53:07`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3187), [`53:36`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3216)).
