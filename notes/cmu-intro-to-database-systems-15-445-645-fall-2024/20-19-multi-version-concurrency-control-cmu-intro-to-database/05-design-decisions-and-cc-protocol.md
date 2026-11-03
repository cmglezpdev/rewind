# 05 — The four MVCC design decisions and the concurrency control protocol

## Versioning permeates the whole system

MVCC is not just another concurrency control protocol bolted on top. "The concept of versioning permeates all throughout the database system" — every layer must be aware it is dealing with multiple versions [`27:46`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1666) [`28:24`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1704).

## The four decisions

1. **Concurrency control protocol** — 2PL, OCC, or timestamp ordering [`29:35`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1775)
2. **Version storage** — append-only, time-travel, or delta [`28:24`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1704)
3. **Garbage collection** [`44:09`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2649)
4. **Index management** [`52:14`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=3134)

**These decisions are not independent.** How you store versions strongly determines what happens with index management, especially secondary indexes [`28:24`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1704) [`35:51`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2151).

## The lecture's headline verdict

> "The worst implementation of MVCC that is out there today... is actually PostgreSQL." MySQL and Oracle do it better, and every other modern system — unless it is a PostgreSQL fork — does it the MySQL/Oracle way [`28:59`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1739) [`29:35`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1775).

## Decision 1 — concurrency control protocol

You still need all the machinery from earlier lectures [`29:35`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1775):

- **Two-phase locking** — lock table, deadlock detection or prevention, all of it [`29:35`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1775).
- **OCC** — whether you keep a private workspace for new versions plus a validation step is implementation-dependent [`30:02`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1802).
- **Timestamp ordering** — assign a timestamp, commit in that order. This gives you snapshot isolation by default; **serializability requires extra work** (covered in the advanced course, not this one) [`30:02`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1802) [`30:26`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1826).
