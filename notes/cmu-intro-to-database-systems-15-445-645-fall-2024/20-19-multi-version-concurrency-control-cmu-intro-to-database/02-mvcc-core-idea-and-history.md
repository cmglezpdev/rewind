# 02 — MVCC: core idea and history

## The two key properties

1. **Writers do not block readers.** A writer creates a *new* version, so it never interferes with someone reading the old one [`9:19`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=559) [`9:46`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=586).
2. **Readers do not block writers.** A reader holds no explicit lock; it reads at its assigned timestamp, so a writer never waits for it to finish [`10:17`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=617).

Consequences:

- Every transaction gets a timestamp **at BEGIN**, which defines the consistent snapshot it is allowed to view [`9:19`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=559).
- It sees no uncommitted changes, and changes committed *after* its start never materialize for it [`9:46`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=586).
- Consistent snapshots come **without acquiring explicit locks** [`10:17`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=617).
- You get a new isolation level for free: **snapshot isolation** — viewing the database as it existed at a point in time [`10:37`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=637).

## Time-travel queries

- Big 1980s selling point: "run this query on the database as it existed three weeks ago" is trivial if you never garbage collect [`10:50`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=650).
- PostgreSQL originally shipped time travel as a founding design point (early/mid-1980s) and **removed it in the 1990s** — without garbage collection you run out of storage fast; Tom Lane was part of the team that took it out around 1999 [`11:14`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=674) [`13:06`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=786).
- Realistically almost nobody needs time travel — the audit/securities-exchange case is the exception [`44:35`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2675).

## Origin story

| Milestone | Detail | Citation |
|---|---|---|
| First description | MIT PhD dissertation, **1978**, in the systems world (not databases) | [`6:51`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=411) |
| First DB implementations | **Rdb/VMS** and **InterBase**, built at DEC in the early 1980s by Jim Starkey (who also claims to have invented BLOBs) | [`6:51`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=411) [`7:21`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=441) |
| DEC's fate | DEC → Compaq → HP; Rdb bought by Oracle and rebranded **Oracle Rdb** (distinct from the Oracle database) | [`7:21`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=441) [`8:34`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=514) |
| InterBase's fate | Enterprise code forked and open-sourced as **Firebird**; Mozilla wanted "Firebird" for its browser, couldn't use it, and landed on **Firefox** | [`8:00`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=480) |

## PostgreSQL lineage (aside)

- Berkeley academic project, **originally written in Lisp**, transpiled to C then compiled — eventually rewritten directly in C [`11:51`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=711).
- Commercialized by Stonebraker: Montage → Miro → **Illustra** → bought by Informix → bought by IBM [`11:51`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=711).
- In **1996** two grad students stripped QUEL, added SQL, and produced **PostgreSQL** [`12:35`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=755).

## Bottom line

Essentially every database system built in the last 20–30 years — and any new one built from scratch today — uses some variation of MVCC [`9:08`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=548) [`28:24`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1704).
