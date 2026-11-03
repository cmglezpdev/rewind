# 11 — Wrap-up and what's next

## Closing points

- **Two-phase locking is used in almost every database system** you can think of. Optimistic concurrency control (OCC), covered next class, is **less common** but still important and used in some systems [`1:03:11`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3791).
- At its core 2PL **automatically generates interleavings of transactions that are guaranteed conflict serializable**, without seeing the queries ahead of time [`1:03:11`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3791).
- **Strong strict 2PL** additionally guarantees **no cascading aborts** [`1:03:11`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3791), [`1:03:45`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3825).
- Deadlocks are handled through **detection** or **prevention protocols** [`1:03:45`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3825).
- Transactions are called "the second hardest thing after query optimization" — still an active research area today [`1:03:45`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3825), [`1:04:12`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3852).

## Not covered (deferred)

- Nested transactions [`1:03:45`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3825)
- Savepoints beyond the brief mention [`1:03:45`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3825)
- Multi-node / distributed transactions — later in the semester [`1:03:45`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3825)

## Next class

- Timestamp ordering and optimistic protocols [`1:04:12`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3852)
- Isolation level variations and additional anomalies not yet discussed [`1:04:12`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3852)

## Production note

This lecture was **re-recorded from home on a Monday night** after the third botched classroom recording of the semester [`0:27`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=27).
