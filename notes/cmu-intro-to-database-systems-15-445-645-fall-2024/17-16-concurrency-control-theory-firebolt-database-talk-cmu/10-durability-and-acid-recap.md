# 10 — Durability and ACID Recap

## Durability

- If the DBMS tells the outside world a transaction committed, those changes must survive a crash and be visible on restart ([`1:02:22`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3742), [`1:02:53`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3773)).
- Stricter levels exist: surviving a machine fire or a data-center burning down requires backups on other machines / other data centers ([`1:02:53`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3773)).
- The mechanisms are logging and shadow paging; making them fast is a dedicated lecture on write-ahead logging, checkpoints, and recovery in a few weeks ([`1:03:18`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3798)).

## Which mechanism delivers which ACID property

| Property | Mechanism ([`1:03:30`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3810), [`1:03:47`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3827)) |
|---|---|
| Atomicity + Durability | Redo/undo mechanisms — the write-ahead log gives both redo and undo; shadow paging gives undo |
| Consistency | Integrity constraints, plus consensus protocols (Paxos, Raft) in the distributed case |
| Isolation | Concurrency control protocols — two-phase locking, OCC (starting next week) |

## Closing argument: don't roll your own

- This is genuinely hard to get right. Rely on a battle-hardened DBMS with proven concurrency control and recovery rather than "winging it with a hash map" ([`1:04:08`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3848), [`1:04:30`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3870)).
