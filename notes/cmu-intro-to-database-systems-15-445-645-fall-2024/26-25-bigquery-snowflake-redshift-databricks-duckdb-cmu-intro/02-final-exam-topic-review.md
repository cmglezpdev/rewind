# 02 — Final Exam Topic Review

Speed review of everything covered since the midterm, plus what is explicitly out of scope.

## Query optimization

- Heuristic rewrites: predicate pushdown, projection pushdown, nested sub-query handling ([`7:24`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=444)).
- Statistics and cardinality estimation: histograms, and simple selectivity reasoning (e.g. equality on a unique key ⇒ selectivity = 1/number of tuples). Formulas are not examined ([`7:44`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=464)).
- Plan enumeration, two methods and their trade-offs ([`7:44`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=464), [`8:31`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=511)):
  - **Bottom-up (System R)** — dynamic programming, build join order by adding edges.
  - **Top-down** — start from the goal, branch-and-bound search downward.

## Transactions and concurrency control

- ACID, conflict serializability, conflict equivalence to a serial ordering ([`8:31`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=511)).
- View serializability only at a high level: it permits extra parallelism conflict serializability forbids, but no real system implements it ([`8:55`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=535)).
- Isolation levels and their anomalies: phantom reads, unrepeatable reads, dirty reads, lost updates, write skew under MVCC ([`9:23`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=563)).
- Two-phase locking variants ([`9:43`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=583)):
  - Basic 2PL (growing/shrinking phases).
  - **Strong strict 2PL** — hold all locks until commit.
  - **Strict 2PL** — hold write locks to the end, release read locks during the shrinking phase.
- Multi-granularity locking and intention locks (IX, IS, SIX) and their place in the hierarchy ([`9:43`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=583), [`10:24`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=624)).
- OCC: read phase into a private workspace, then write-back; **timestamps are assigned when a transaction enters validation, not when it starts**. Backward validation (checking previously committed transactions) was covered in lecture; forward validation checks currently active transactions ([`10:41`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=641), [`11:12`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=672)).
- MVCC: like OCC but versions live in the global database rather than a private workspace. Version storage options — Postgres-style append new tuples, time-travel table, and delta versioning (called out as the best) — plus garbage collection and secondary-index maintenance over version chains ([`11:34`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=694), [`11:58`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=718)).

## Crash recovery

- Buffer pool policies: steal/no-steal (evicting dirty pages before commit) and force/no-force (flushing dirty pages at commit). **Write-ahead logging = steal + no-force**, and it is the dominant architecture ([`12:20`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=740), [`12:53`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=773)).
- Shadow paging only needs to be placed relative to those policies ([`12:53`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=773)).
- Logging schemes: physical vs logical; most systems use physical or physiological because logical-log replay ordering is hard, especially at low isolation levels ([`12:53`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=773), [`13:16`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=796)).
- ARIES: fuzzy checkpoints (checkpoint begin/end), then the three phases — **analyze**, **redo**, **undo** — plus the dirty page table, the active transaction table, and CLRs (compensation log records) written while undoing ([`13:16`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=796), [`13:42`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=822), [`14:03`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=843)).

## Distributed databases

- System architectures (shared-disk, shared-nothing, shared-everything), replication, horizontal vs vertical partitioning, and the basics of two-phase commit. Proving Paxos or Raft correctness is not asked ([`14:32`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=872)).

## Not on the exam

- Industry flash talks, seminar talks, and any "what does Postgres/MySQL do" slides — those exist for general education only ([`15:12`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=912)).
