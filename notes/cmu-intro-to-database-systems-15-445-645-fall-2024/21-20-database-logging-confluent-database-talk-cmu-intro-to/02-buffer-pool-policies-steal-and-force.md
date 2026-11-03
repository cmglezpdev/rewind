# 02 — Buffer Pool Policies: STEAL and FORCE

## The problem: page granularity leaks transactions into each other

- Two non-conflicting transactions, T1 writing A and T2 writing B, can land on the **same page** ([`11:15`](https://www.youtube.com/watch?v=mbelzgz-97s&t=675), [`11:39`](https://www.youtube.com/watch?v=mbelzgz-97s&t=699)).
- When T2 commits and the DBMS flushes that page, **T1's uncommitted change to A rides along** — disk writes are page/block-addressable, not byte-addressable ([`12:32`](https://www.youtube.com/watch?v=mbelzgz-97s&t=752)).
- If T1 then rolls back, the DBMS must go back to disk and undo it — bad ([`13:00`](https://www.youtube.com/watch?v=mbelzgz-97s&t=780), [`13:19`](https://www.youtube.com/watch?v=mbelzgz-97s&t=799)).

## The two policies

| Policy | Definition | Consequence |
|---|---|---|
| **STEAL** | The DBMS **may evict a dirty page modified by an uncommitted transaction** ([`13:19`](https://www.youtube.com/watch?v=mbelzgz-97s&t=799), [`14:12`](https://www.youtube.com/watch?v=mbelzgz-97s&t=852)) | Overwrites the last committed version on disk → UNDO needed |
| **NO-STEAL** | Every page dirtied by a live transaction stays **pinned** in memory ([`14:12`](https://www.youtube.com/watch?v=mbelzgz-97s&t=852)) | No UNDO needed, but you're stuck if a transaction dirties more pages than you have memory ([`15:03`](https://www.youtube.com/watch?v=mbelzgz-97s&t=903)) |
| **FORCE** | On COMMIT, **all** the transaction's dirty pages must be flushed before acking the client ([`15:21`](https://www.youtube.com/watch?v=mbelzgz-97s&t=921), [`15:38`](https://www.youtube.com/watch?v=mbelzgz-97s&t=938)) | Recovery is trivial (nothing to REDO), but commit is slow — a billion updated tuples means a billion pages flushed ([`15:52`](https://www.youtube.com/watch?v=mbelzgz-97s&t=952), [`16:18`](https://www.youtube.com/watch?v=mbelzgz-97s&t=978)) |
| **NO-FORCE** | COMMIT does not require flushing dirty pages ([`15:38`](https://www.youtube.com/watch?v=mbelzgz-97s&t=938)) | REDO needed at recovery |

- STEAL is what WAL wants, because letting the replacement policy (the LRU-K built in Project 1) evict uncommitted dirty pages gives it far more frames to free ([`14:41`](https://www.youtube.com/watch?v=mbelzgz-97s&t=881)).

## Walking NO-STEAL + FORCE (the trivial-recovery corner)

- T1 writes A, T2 writes B, both on the same page; T2 commits ([`16:35`](https://www.youtube.com/watch?v=mbelzgz-97s&t=995)).
- FORCE says flush the page; NO-STEAL forbids writing T1's dirty change — a direct conflict ([`17:09`](https://www.youtube.com/watch?v=mbelzgz-97s&t=1029)).
- Fix: **copy the page in the buffer pool, strip out the uncommitted change, write the copy** ([`17:29`](https://www.youtube.com/watch?v=mbelzgz-97s&t=1049)).
- Result: T1's rollback is trivial (nothing of its own reached disk), and a crash after T2's commit leaves a correct disk image ([`17:29`](https://www.youtube.com/watch?v=mbelzgz-97s&t=1049), [`17:56`](https://www.youtube.com/watch?v=mbelzgz-97s&t=1076)).

### Why nobody actually does this

- **The copy is the killer**: a billion dirtied pages means a billion copies, and in a highly concurrent system with thousands of live transactions you must track and copy every page each of them touched ([`18:12`](https://www.youtube.com/watch?v=mbelzgz-97s&t=1092), [`18:48`](https://www.youtube.com/watch?v=mbelzgz-97s&t=1128)).
- You still must maintain write-sets, and you can run out of memory quickly ([`19:17`](https://www.youtube.com/watch?v=mbelzgz-97s&t=1157)).
- **Hardware wear**: SSD cells tolerate on the order of hundreds of thousands of writes; force-flushing every transaction burns them out. Vendors over-provision (a "128 GB" SSD really holds ~150 GB) precisely because cells die ([`19:17`](https://www.youtube.com/watch?v=mbelzgz-97s&t=1157), [`19:56`](https://www.youtube.com/watch?v=mbelzgz-97s&t=1196)).
- At 100,000 transactions/sec flushing every dirtied page, a single SSD burns through fast ([`20:14`](https://www.youtube.com/watch?v=mbelzgz-97s&t=1214)).

## The quadrant to aim for

|  | **NO-STEAL** | **STEAL** |
|---|---|---|
| **NO-FORCE** | no UNDO, REDO needed | **WAL — the target ✅** (UNDO + REDO) |
| **FORCE** | **Shadow paging** — no UNDO, no REDO, terrible runtime | UNDO needed, no REDO |

- Target quadrant: **STEAL + NO-FORCE** — eviction freedom plus commits that only append sequentially to the log ([`35:03`](https://www.youtube.com/watch?v=mbelzgz-97s&t=2103), [`35:32`](https://www.youtube.com/watch?v=mbelzgz-97s&t=2132), [`36:20`](https://www.youtube.com/watch?v=mbelzgz-97s&t=2180)).
- FORCE costs response time; NO-STEAL wastes memory that other transactions need ([`35:47`](https://www.youtube.com/watch?v=mbelzgz-97s&t=2147), [`36:04`](https://www.youtube.com/watch?v=mbelzgz-97s&t=2164)).
