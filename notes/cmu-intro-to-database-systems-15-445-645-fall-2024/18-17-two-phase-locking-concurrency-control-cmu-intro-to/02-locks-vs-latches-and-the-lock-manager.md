# 02 — Locks vs. latches, and the lock manager

## The distinction

Earlier in the semester latches protected critical sections *inside* the DBMS (B+Tree nodes, buffer pool frames). In OS terminology a "lock" is what this course calls a latch; in the database world **locks are a higher-level construct** that protect *logical database contents* from other transactions [`4:28`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=268).

| | **Locks** | **Latches** |
|---|---|---|
| Protects | Database objects: database, table, page, tuple, attribute [`4:28`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=268) | Internal data structures: B+Tree nodes, pointers [`4:28`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=268) |
| Held for | Potentially the whole lifetime of a transaction [`5:28`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=328) | A very short critical section — grab, operate, release immediately [`5:28`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=328) |
| Modes | Shared / exclusive (plus intention modes later) [`5:48`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=348), [`6:04`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=364) | Read / write [`5:48`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=348) |
| Deadlocks | Handled by protocols inside the system — detection or prevention [`6:36`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=396) | Avoided by writing correct code; on failure, abort the attempt immediately [`6:23`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=383) |
| Stored where | Centralized lock manager [`7:09`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=429) | Inside the data structure itself (e.g. in the B+Tree node) [`7:09`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=429) |

Why the DBMS must handle deadlocks itself: "some random JavaScript programmer" can submit queries that deadlock, and the system has to protect applications from shooting themselves in the foot [`6:36`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=396).

## The lock manager

- A centralized component (also called the transaction manager) — essentially a **hash table** tracking which locks exist, who holds them, in what mode, plus queues of waiting transactions [`7:30`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=450), [`13:05`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=785).
- It is heavier and more expensive machinery than latching, and that cost is acceptable precisely *because* locks are held for long durations [`7:30`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=450), [`7:57`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=477).
- The payoff is a **complete global view** of all running transactions on a single node, enabling better conflict decisions and better parallelism [`7:57`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=477), [`8:28`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=508). Distributed databases make this harder [`7:57`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=477).

### The lock table is a special kind of table

- In Postgres you can query it as if it were a real table, but it's a view over a function reading the internal structure [`13:05`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=785).
- **No transactions on it** — you'd need a lock table to have a transaction on the lock table [`13:33`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=813).
- **Still needs latches** to protect the structure [`13:33`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=813).
- **Never written to disk** — after a crash the transactions are gone, so held locks are irrelevant [`13:33`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=813).
- It is **dynamic**: entries are deleted when nobody holds a lock, so bulk-loading a billion tuples doesn't create a billion lock entries [`52:27`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3147), [`52:52`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3172).

## Locks are acquired automatically

Transactions do not issue explicit lock/unlock calls. Running a `SELECT` acquires a shared lock for you; committing releases locks. The explicit `LOCK`/`UNLOCK` in the lecture's schedules is pedagogical notation only [`10:20`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=620). There is in fact **no SQL `UNLOCK` command**, so you cannot tell the system "I'm done reading this, release it early" [`25:05`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1505), [`25:26`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1526).
