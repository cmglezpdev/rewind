# 05 — Cascading aborts and strong strict 2PL

## The cascading abort problem

Scenario: T1 does `R(A), W(A)`, unlocks A (legally entering the shrinking phase), then works on B and eventually **aborts**. Meanwhile T2 acquired the exclusive lock on A and read T1's uncommitted write [`19:30`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1170), [`19:42`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1182), [`19:58`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1198).

Consequences:

- T2 must also be rolled back, because it cannot commit having seen an uncommitted change [`19:58`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1198).
- The system must **track read/write dependencies** — any transaction that read from an uncommitted transaction has to wait at commit time to learn whether that other transaction committed [`20:17`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1217).
- The thing being avoided is **leaking** T1's rolled-back changes to the outside world via T2's commit [`20:41`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1241).
- All of T2's work is wasted. The lecture's extreme framing: if T2 did **a billion reads and a billion writes** before being cascaded into abort, all of it is thrown away and the application must resubmit [`21:29`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1289), [`21:41`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1301).

## The fix: strong strict two-phase locking (SS2PL)

Also called **rigorous** 2PL in the textbook and other systems [`21:56`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1316), [`22:39`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1359).

- Growing phase is unchanged; there is effectively **no shrinking phase** — **all locks are released at commit time**, all at once [`22:39`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1359).
- The point: hold exclusive locks on everything you wrote until commit, so nobody can read your writes until you know they are durable [`23:16`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1396).

### Variants compared

| Protocol | Shared locks released | Exclusive locks released |
|---|---|---|
| Basic 2PL | any time in shrinking phase | any time in shrinking phase |
| **Strict 2PL** | in shrinking phase | at commit [`23:38`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1418) |
| **Strong strict 2PL** | at commit | at commit [`23:38`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1418) |

**Strict schedule** — formal definition: a schedule where no transaction reads or writes data from another transaction until that other transaction has committed; no modifying or reading in-flight data [`23:56`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1436).

## Benefits

- **No cascading aborts** [`24:22`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1462).
- **Simpler rollback implementation**: since no other transaction could have read your writes, aborting means rolling back exactly one transaction [`24:22`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1462). Otherwise you would have to trace a long dependency chain of who-read-from-whom and unwind it in the right order [`24:50`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1490).

## What real systems do

Most systems that offer serializable isolation via locking give you **strong strict 2PL by default** — partly because there is no SQL `UNLOCK` command to release locks early anyway [`25:05`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1505), [`25:26`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1526), [`25:41`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1541).

## Where the schedule classes sit

Nested regions, from broadest to narrowest [`28:45`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1725), [`29:16`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1756), [`29:44`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1784):

- **All schedules** ⊃ **view serializable** ⊃ **conflict serializable** ⊃ **serial**
- **No cascading aborts** partially overlaps the serializable regions — some NCA schedules are not serializable
- **Strong strict 2PL** schedules live inside the intersection of *conflict serializable* and *no cascading aborts*
