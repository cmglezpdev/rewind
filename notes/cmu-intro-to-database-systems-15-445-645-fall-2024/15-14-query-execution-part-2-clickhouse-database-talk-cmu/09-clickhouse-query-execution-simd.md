# 09 — ClickHouse: Parallel Query Execution and SIMD

## Using all cores: lanes

- Like every modern DBMS, ClickHouse tries to use **all server resources**, and all cluster resources when there is more than one server ([`53:36`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3216)).
- The physical plan is **unfolded into N lanes** (N = 3 in the slide's example); each lane processes a **disjoint range** of the source data — the source table split into three equally large ranges ([`53:36`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3216)).
- In practice lanes become **imbalanced**, e.g. when the selectivities of the ranges differ a lot, which leaves cores underutilized ([`53:36`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3216)).
- The fix: **insert exchange operators at certain points in the plan** ([`54:23`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3263)) — exactly the repartition/distribute case the lecture predicted ([`56:01`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3361)).

## Vectorized volcano model

- Operators pass **multiple tuples at a time** rather than single tuples — ClickHouse calls this the **vectorized volcano model** ([`54:23`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3263)).
- Three performance benefits ([`54:23`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3263)):
  1. Good cache locality.
  2. Amortizes the cost of virtual function calls.
  3. Enables SIMD operations across multiple tuples.
- The instructor's clarification: "volcano model" in the course meant the iterator model; terms are used loosely, and what ClickHouse describes is the **vectorized batch model** — batches of tuples flowing between operators ([`56:01`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3361), [`56:32`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3392)).

## SIMD and compute kernels

- Hot loops are implemented in **multiple versions called compute kernels**: always a generic version plus one or more vectorized versions, built either through compiler auto-vectorization or **handwritten intrinsics** ([`54:52`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3292), [`55:07`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3307)).
- **At runtime** the database checks the system's capabilities and executes the fastest available kernel — so it exploits modern hardware while staying compatible with the legacy systems many customers still run ([`55:07`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3307), [`55:36`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3336)).
- These multi-target functions are **pre-compiled primitives**; at runtime the system picks e.g. the SIMD version of "32-bit integer equals 32-bit integer", always able to fall back to the scalar version ([`59:04`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3544)).
- The instructor's SIMD explanation: instead of looping one tuple at a time, take **8 values of the same column across 8 tuples** and use specialized CPU instructions to compute them in parallel — single instruction, multiple data. Combined with query-level parallelism, this is parallelism at the hardware level inside a single worker ([`56:47`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3407), [`56:58`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3418), [`57:30`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3450)).
- Reference offered: the ClickHouse **overview paper published this year at VLDB** ([`55:36`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3336)).

## Q&A: ClickBench, Umbra, and the specialization strategy

- **ClickBench**, ClickHouse's public benchmark site, tracks many DBMSs on a workload of `SELECT` queries with **no joins** ([`57:45`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3465)).
- Ranking discussed on air: **Umbra** (the TUM/"Germans" system) is number one, then **ClickHouse tuned**, then **Doris** ([`57:45`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3465), [`58:14`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3494)).
- Asked what holds ClickHouse back from beating Umbra, Robert answers that **Umbra's code is closed source**, so they cannot inspect it; Umbra is built entirely around **query compilation**, whereas ClickHouse uses it only to some degree — and admits it is hard to answer precisely ([`58:26`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3506)).
- **How Umbra works** (per the instructor): a query arrives, Umbra **generates x86 assembly on the fly**, runs it through the assembler and starts executing immediately, while in the background LLVM compiles the same code at **-O2** and swaps the optimized version in when it is ready ([`1:00:22`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3622)).

### Two contrasting performance philosophies

| | **ClickHouse** | **Umbra** |
|---|---|---|
| Strategy | "Throw everything at it" — many specialized components ([`1:00:22`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3622)) | Specialize on one technique: query compilation ([`1:00:22`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3622)) |
| Concrete evidence | ~**20 different hash table implementations**, specialized by data type and size, where most systems have one; plus many storage engines and pre-compiled primitives ([`59:39`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3579), [`59:58`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3598), [`1:01:07`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3667)) | Runtime x86 codegen + background LLVM -O2 recompilation ([`1:00:22`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3622)) |
| Specialization axis | Data types and workload patterns (still all analytics) ([`59:58`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3598)) | Compilation pipeline |

- Closing recommendation: read the ClickHouse source code to see how the ~20 hash table variants are done ([`1:01:07`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3667)).
- Final framing from the instructor: DuckDB is nice for small things on your laptop; "if you want to go hard you do something like ClickHouse" ([`1:01:40`](https://www.youtube.com/watch?v=Vy2t_wZx4Is&t=3700)).
