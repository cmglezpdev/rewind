# 04 — Propagation Schemes, Timing, and Execution Models

## Propagation scheme: how many acknowledgements do we wait for?

This is where the hand-wavy single-node notion of ACID "consistency" finally becomes concrete ([`25:11`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1511), [`25:35`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1535)).

| Scheme | Waits for | Guarantee |
|---|---|---|
| **Synchronous / strong consistency** | *All* replicas acknowledge the flush | Once told "committed", any node you read shows the change ([`25:52`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1552)) |
| **Quorum** | A majority (e.g. 2 of 3) | Middle ground; bets that simultaneous failures are rare ([`28:37`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1717), [`28:58`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1738)) |
| **Asynchronous / eventual consistency** | Nobody | Acknowledge immediately; a read elsewhere may miss the change ([`26:15`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1575), [`26:38`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1598)) |

- Synchronous means the primary **stalls**: send flush → replica flushes WAL (steal / no-force rules still apply) → acknowledgement → only then tell the application ([`27:07`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1627), [`27:37`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1657)).
- Asynchronous failure mode: the primary crashes, a replica is elected primary, and the transaction is simply **missing** because the flush message never arrived. Always send the flush *before* the client acknowledgement, or the replica never learns the transaction's fate ([`27:53`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1673), [`28:08`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1688)).
- **Who uses what**: NoSQL systems sit at the eventual-consistency end; classic distributed relational systems — **DB2, Oracle, NonStop SQL** — use synchronous commit because they will not lose data ([`29:13`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1753), [`29:32`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1772)).

## Propagation timing: when do we ship the log records?

- **Continuous** — emit log records to replicas as soon as queries execute, batching optionally, without waiting for commit. Requires also sending a commit *or abort* message; on abort the replicas must roll back work they already applied ([`30:06`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1806), [`30:45`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1845)).
- **On commit** — stage all log records at the primary and ship only once the transaction is known to commit; replicas never see uncommitted work and never roll back ([`30:45`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1845), [`31:12`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1872)).
- **Verdict: continuous wins**, because aborts are rare in real workloads (think how rarely a banking or browsing session aborts), so assuming commit and streaming early pays off ([`31:29`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1889)).

## Execution model: active-passive vs active-active

### Active-passive

- The transaction executes on **one** node; other replicas passively apply the WAL records it produced ([`31:55`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1915), [`32:35`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1955)).
- Note: this is **not** the same axis as primary-replica vs multi-primary — you can run either execution model under either configuration ([`37:08`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=2228), [`37:34`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=2254)).

### Active-active

- The **same transaction runs independently on multiple nodes**; no WAL is exchanged. The only message needed is at the end: "did you commit?" "yes, same result" ([`32:56`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1976), [`33:19`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1999)).
- **Requires determinism.** Handling non-determinism: same random seed on both nodes; same transaction timestamp assigned at start — typically by a centralized component that stamps the transaction before dispatching it to all nodes ([`33:41`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=2021), [`33:58`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=2038)).
- **What is actually saved** (answer to a student question): the end-of-transaction round trip still happens; what is avoided is the **intermediate data** — updating a billion records means a billion WAL records over the network in active-passive, and none in active-active ([`34:23`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=2063), [`34:35`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=2075)).
- Determinism must be a **DBMS guarantee**, not an application responsibility: the system must enforce the same serial order on every node and eliminate non-determinism ([`35:05`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=2105), [`35:48`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=2148)).
- **Almost no system does this.** The named example is **VoltDB** (based on H-Store, which the lecturer helped build) ([`36:18`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=2178)).
- It works there because transactions run as **stored procedures** — an RPC-style call carrying application logic (if-clauses, loops, exceptions) interleaved with SQL, run start to finish server-side, removing client/server timing skew ([`36:33`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=2193), [`37:08`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=2228)) — and because VoltDB's execution engine is **single-threaded per CPU core** with serializable ordering, so fixing the arrival order fixes the final state ([`38:00`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=2280), [`38:22`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=2302)).

### Which costs more? It depends

- Worked example against active-active: `UPDATE ... SET a = a + 1` with **no WHERE clause over a billion tuples** — every node repeats the billion-record scan, whereas active-passive scans once and ships one log record ([`39:51`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=2391)).
- Worked example for active-active: a **simple query performing a billion updates** — active-passive must ship a billion log records and wait for acknowledgement, while active-active nodes just finish independently and exchange one "we're done" ([`40:19`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=2419), [`40:44`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=2444)).
- **Lower isolation levels break active-active**: results then depend on which transactions ran concurrently, which differs per node. "Super hard, nobody does it, not worth it" ([`41:17`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=2477)).

**Bottom line: almost every system uses active-passive**, because it reuses the WAL infrastructure already in place, and most applications neither use stored procedures nor avoid non-determinism ([`38:39`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=2319), [`40:44`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=2444), [`41:34`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=2494)).
