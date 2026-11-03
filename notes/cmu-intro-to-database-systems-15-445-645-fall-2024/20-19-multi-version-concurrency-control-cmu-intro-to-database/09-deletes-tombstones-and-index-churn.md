# 09 — Deletes, tombstones, and index churn

## Duplicate keys across snapshots

Scenario: A is updated to A1, then deleted, then a *new* A is inserted as A3 [`1:00:40`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3640) [`1:00:58`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3658) [`1:01:15`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3675).

- Deletion sets a **tombstone / delete flag in the tuple header**, plus the END timestamp bounding visibility [`1:00:58`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3658) [`1:08:11`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4091) [`1:08:29`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4109).
- Now the index holds **two entries for key A** referring to **different logical tuples**. Old transactions must still see A1; anything starting after timestamp 30 must see A3 [`1:01:15`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3675) [`1:01:39`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3699).
- Without version info in the index, a lookup may land on the wrong entry, traverse the chain, find it deleted, and miss the version it should have seen [`1:01:55`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3715).
- **You need extra version metadata in the index** to disambiguate identical index values that belong to different logical tuples. PostgreSQL always does this so it can jump anywhere in the chain quickly [`1:02:13`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3733) [`1:02:26`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3746).
- Practical effect: a single index lookup may return **multiple entries**, and you follow version chains to determine which one you actually want [`1:02:50`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3770).
- A logical tuple is physically deleted only when **all** its versions are invisible to every active transaction [`1:07:41`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4061).
- Deletes have no write-write conflict issue: **first deleter wins** [`1:08:11`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4091).

## Aborts do not immediately repair the index

- If T3's insert split a B+Tree leaf and T3 aborts, you do **not** undo the split immediately. Mark the transaction aborted, hand it to the garbage collector, and let a later sweep clean up [`1:03:24`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3804) [`1:03:38`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3818).
- Index cleanup by the GC "is no different than a transaction doing a delete" — if it triggers a merge, so be it [`1:04:05`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3845).

## Updating an indexed attribute

Sequence when a transaction changes the value an index is built on [`1:04:29`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3869) [`1:05:02`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3902):

1. Treat it as a **delete followed by an insert** into the index — but,
2. **Do not delete the old entry at update time.** It is still correct: another transaction may need it to reach the older version [`1:05:19`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3919).
3. During the transaction you only **insert the new entry**, pointing either at the chain head or (in PostgreSQL) directly at the version you just created [`1:05:19`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3919) [`1:05:41`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3941).
4. Later, the **garbage collector** determines the old value of that attribute at the dead version and deletes the corresponding index entry, keeping indexes navigable [`1:05:41`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3941) [`1:06:16`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3976).

Andy's summary: pre-MVCC, index and data just pointed at each other and deletes/inserts were trivial. With multi-versioning "you got to keep a bunch of crap around" so someone can still see the previous snapshot, and tidying happens at GC time [`1:06:16`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3976) [`1:06:34`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3994).

## Logical contents vs. physical layout — a key separation

- **Transactions do not care about the index's physical structure.** If the B+Tree wants to split or merge, let it. Rolling back a transaction does **not** require restoring the index's exact prior physical layout — only its logical contents [`1:06:34`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3994) [`1:06:48`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4008).
- Same principle as the buffer pool swapping pages to disk under memory pressure: it makes things slower but **does not affect correctness** [`1:07:25`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4045).
- "Transactions are wild... this is why doing this is really hard and people pay a lot of money for this — and you make it distributed and it all falls apart" [`1:07:41`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4061).
