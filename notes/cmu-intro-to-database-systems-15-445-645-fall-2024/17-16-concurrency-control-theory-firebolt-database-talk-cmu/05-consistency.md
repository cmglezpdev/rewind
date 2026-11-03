# 05 — Consistency

The fuzziest letter in ACID: if the transaction is correct and the database is consistent, running the transaction leaves the database consistent ([`23:22`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1402)).

## Database consistency — integrity constraints

- The **application** tells the DBMS what "correct" means, via integrity constraints: `CHECK` clauses in `CREATE TABLE`, or constraints added after the fact ([`23:22`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1402)).
- Example: nobody's age can be negative — the DBMS rejects any transaction that would violate it ([`23:58`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1438)).
- The DBMS guarantees constraints hold both before and after a transaction ([`24:18`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1458)).
- Checks can in principle be **deferred** to commit time and batched, but as far as the instructor knows most systems check **per query**, as soon as the update happens ([`24:18`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1458)).

## Transaction consistency (distributed context)

Consistency makes far more sense once data is replicated across machines ([`16:07`](https://www.youtube.com/watch?v=4y656idl8ZU&t=967)):

- **Strong consistency**: commit on node 1, immediately read the record on node 2, and you see the update ([`24:49`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1489)).
- **Eventual consistency**: the update propagates eventually; a read on another node may return a stale value, or multiple versions depending on whether vector clocks are used ([`25:18`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1518), [`25:31`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1531)).
- Strong consistency is achieved with **Paxos, Raft, or two-phase commit** — covered in lecture 23 near the end of the semester ([`25:31`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1531)).
