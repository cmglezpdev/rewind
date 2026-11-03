# 13 — Conclusion and next class

## Wrap-up

- The **catalog** — metadata the DBMS keeps about its own data — is deferred to the next class [`1:20:30`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4830)
- Log-structured storage and index-organized storage are **alternatives** to tuple-oriented heap storage, each with pros and cons [`1:20:30`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4830)
- For **write-heavy workloads**, log-structured storage wins because it maximizes **sequential I/O**: whole SSTables are written at once, on flush and on compaction. Index-organized and heap storage produce mostly **random writes** [`1:20:52`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4852)
- The storage manager's abstraction is not truly airtight: once transactions and recovery enter the picture, metadata has to be exposed both upward and downward across the layers [`1:20:52`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4852)

## Next class

- **Storage models**: flip the mental model from rows (all attributes of a tuple contiguous) to **columns**, and examine the pros and cons of column stores [`1:21:27`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4887)
- Also pending from this lecture: compression schemes and the null-representation results for column stores [`1:18:38`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4718) [`1:15:19`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4519)

## Deferred to later lectures

| Topic | When |
| --- | --- |
| Buffer pool / memory management (Project 1) | Next lecture block [`0:50`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=50) |
| Indexes and B+Trees | ~2 weeks later [`41:09`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2469) |
| Bloom filters | A few weeks later [`37:05`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2225) |
| Multi-versioning (MVCC) | Later in the semester [`20:36`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1236) |
| Logging and recovery | Later in the semester [`34:40`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2080) |
| Specialized hardware | Later in the semester [`1:09:13`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4153) |
