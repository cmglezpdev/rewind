# 12 — Conclusion and what comes next

## Closing points

- MVCC is "super important" — so important that **even systems that don't support transactions**, such as NoSQL stores, implement some variation of it [`1:25:31`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=5131).
- It is **not a single isolated decision**. You must design the system for multi-versioning from the very beginning, because that choice propagates through **all parts of the architecture** — storage, indexes, garbage collection, recovery [`1:25:31`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=5131) [`1:26:04`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=5164).
- The four design decisions (protocol, version storage, GC, index management) interact; picking append-only storage, for instance, forces index churn and expensive vacuuming downstream [`28:24`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1704) [`35:51`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2151).

## Next lecture

**Logging and recovery** — how to prepare for a crash, then how to recover from one [`1:26:04`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=5164).
