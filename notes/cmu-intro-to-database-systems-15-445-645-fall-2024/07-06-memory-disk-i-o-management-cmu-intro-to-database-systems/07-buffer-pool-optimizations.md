# 07 — Buffer Pool Optimizations

Four optimizations the OS could never do for you, because it does not know what the queries want ([`1:08:34`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4114)). Ranked: **multiple buffer pools is the biggest win and the easiest**; the rest are more complicated with real trade-offs ([`1:08:58`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4138)).

## 1. Multiple buffer pool instances

- Instead of one giant pool, partition memory: one pool per table, per index, per table space, or per logical database ([`1:08:58`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4138)).
- **Benefit**: reduced latch contention — different workers hit different pools and update their own LRU-K metadata independently ([`1:09:34`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4174)).

Two ways to route a page to its pool ([`1:09:58`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4198) → [`1:11:25`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4285)):

| Approach | How | Used by |
|---|---|---|
| **Object ID** | Decompose the record ID (file number, object ID, page number, slot number) and use a mapping table to pick the pool | Enterprise systems; also lets you configure page size, LRU-K variant and priority policy **per pool** ([`1:10:48`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4248)) |
| **Hashing + round robin** | `hash(record_id) mod n`, where *n* is a fixed number of pools defined up front | MySQL ([`1:11:04`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4264)) |

- Either way the mapping is deterministic, so **a page can never live in two pools at once** — coordinating that would be impossible or very difficult ([`1:11:25`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4285)).

## 2. Prefetching

- SQL is declarative, so the query plan reveals which pages will be needed ahead of time ([`1:11:44`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4304)).
- **Sequential prefetching**: while fetching page 1, also fetch pages 2 and 3 ([`1:12:09`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4329)).
  - It works because the execution engine spends a few microseconds per page interpreting bytes, running predicates, building hash tables — enough time to fetch the next pages ([`1:12:09`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4329)).
  - The OS can already do this via `mmap`, forwards and backwards ([`1:12:52`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4372)).
- **Index prefetching** is what the OS **cannot** do — it sees pages, not the logical structure built on top of them ([`1:12:52`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4372)).
  - Example: root page 0 → inner page 1 → leaf page 3, then leaves continue at pages **5 and 6**, not contiguously. Naive sequential prefetch would fetch page 2, which is never needed ([`1:12:52`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4372), [`1:13:37`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4417)).
  - **Oracle** follows the sibling pointers in the leaf nodes to prefetch the right pages ([`1:13:55`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4435)).
- Q&A: sibling leaf pages are **not** guaranteed contiguous in memory either — the buffer manager gives no ordering guarantee, it may just happen to work out. That level of concern is cache-line optimization; disk I/O is so much more expensive that it dominates ([`1:14:08`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4448), [`1:14:25`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4465), [`1:14:48`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4488)).

## 3. Scan sharing (synchronized scans)

- Two or more concurrent queries touching the same pages **piggyback on one cursor**: a late-arriving query joins the in-flight scan and reads the same pages ([`1:15:04`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4504)).
- **Not** result caching. Result caching reuses a finished query result; scan sharing reuses pages at the storage layer ([`1:15:38`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4538)).
- Supported by SQL Server, DB2, Teradata and **PostgreSQL** — one of the nicer features Postgres has over other open source systems ([`1:15:58`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4558)).
- **Oracle's restriction**: only when the query strings are **literally identical**. `select * from employees` in lowercase vs uppercase, or with an extra space, hash differently and count as different queries. Other systems treat them as logically the same ([`1:15:58`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4558), [`1:16:25`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4585), [`1:16:39`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4599)).

Walkthrough ([`1:16:39`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4599) → [`1:17:47`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4667)):

1. Q1 scans table A, reaching page 3 and evicting page 0 as LRU.
2. Q2 arrives wanting the same scan. Starting at page 0 would force a re-read of the page just evicted.
3. Instead Q2 attaches to Q1's cursor from the middle and processes the same pages — legal because the relational model leaves page/tuple order unspecified.
4. When Q1 finishes, Q2 **loops back around** for the pages it missed — or skips them if a `WHERE` clause makes them unnecessary.

Caveat: with a `LIMIT` and no `ORDER BY`, the same query can return **different results on different runs** depending on which pages it read — acceptable under the relational model ([`1:18:02`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4682), [`1:18:29`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4709)).

## 4. Buffer pool bypass ("light scans")

- Originally invented in Informix, where it is called *light scans* ([`1:18:29`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4709)).
- The query gets a **small private memory buffer**; pages are read into it, used, then discarded — no page table update, no replacement-policy metadata churn ([`1:19:02`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4742), [`1:19:19`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4759)).
- Similar in spirit to the Postgres ring buffer, but the memory is invisible to everyone else ([`1:18:29`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4709)).
- Ideal for **temp data**: a temp table written to disk and read back belongs in a private buffer, not in buffer-manager-managed memory ([`1:19:19`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4759)).
- Not common — another example of something proprietary systems have and open source ones do not ([`1:19:19`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=4759)).
