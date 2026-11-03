# 06 — Isolation and Serializable Schedules

## The abstraction

- Every transaction should run as if it had dedicated access to the database, unaware of anything else running ([`26:01`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1561), [`26:27`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1587)).
- Concurrency is achieved by **interleaving reads and writes**, while the final database state must be as if the transactions had executed one-by-one ([`26:41`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1601), [`26:58`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1618)).

## Concurrency control protocols = the traffic cop

The protocol dynamically generates the schedule: who runs when, and what each operation is allowed to read or write ([`26:58`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1618), [`27:28`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1648)).

| Family | Idea | Lecture |
|---|---|---|
| **Pessimistic** (e.g. two-phase locking) | Check before every operation; block or abort to prevent problems ([`27:50`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1670)) | Next Monday |
| **Optimistic** (OCC) | Let transactions do what they want, track reads/writes, validate at commit ([`27:50`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1670), [`28:23`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1703)) | Next Wednesday |

- Most systems implement one or the other, not both ([`28:23`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1703)).

## The two-account worked example

Setup: accounts `A` and `B` hold $1,000 each. `T1` transfers $100 from A to B; `T2` applies 6% interest to both ([`28:38`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1718), [`29:03`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1743)).

- Under any serial ordering, `A + B` must equal **$2,120** — that is the correctness criterion, not the individual values of A and B ([`29:49`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1789), [`30:23`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1823)).
- `A = A - 100` is **not** atomic to the DBMS: it sees `READ(A)` then `WRITE(A)` as two separate operations ([`29:25`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1765), [`35:10`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2110)).
- Two legal serial outcomes: T1→T2 or T2→T1. Both give different A and B values, both sum to $2,120 ([`31:28`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1888), [`31:44`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1904)).

### Good interleaving

T1 debits A, blocks on a page miss; T2 applies interest to A; T1 resumes, credits B, commits; T2 applies interest to B and commits. This is **equivalent to T1 followed by T2** — every update to a given object in T1 precedes the update to that same object in T2 ([`32:53`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1973), [`33:18`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1998)).

### Bad interleaving

T1 debits A; T2 applies interest to A **and** to B; T1 then credits B. Total comes to **$2,114 — $6 missing** ([`34:49`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2089), [`35:10`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2110)).

## Order of arrival does not matter

- The DBMS may execute submitted transactions in **any** order, regardless of arrival order ([`30:23`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1823)).
- To force T1 before T2, the application must sequence it itself — submit T2 only after T1's commit acknowledgement ([`30:43`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1843), [`39:00`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2340)).
- **Google Spanner** is the exception, providing *external consistency*: the submission order is the commit order. Most systems don't offer it and most applications don't need it ([`30:43`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1843), [`39:14`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2354)).

## Definitions

- **Serial schedule**: no interleaving between transactions ([`36:53`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2213)).
- **Equivalent schedules**: starting from the same database state, both end in the same database state ([`36:53`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2213)).
- **Serializable schedule**: an arbitrary interleaving whose final state matches some serial ordering — the gold standard isolation level ([`37:15`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2235)).
- Above it sits **strong serializability / strong consistency** (execution in arrival order), which most systems do not provide and most people do not need ([`37:15`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2235)).
- Correctness here is decoupled from arrival time *and* from commit time — the commit order may differ from both ([`37:53`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2273), [`38:08`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2288)).

## Real systems don't see the whole schedule

- In practice the DBMS never has the full schedule up front: the application issues one query, gets data back, computes, issues another ([`45:21`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2721), [`45:38`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2738)).
- This lecture answers "given a complete schedule, is it correct?"; the protocols next week answer "how do I enforce it dynamically?" ([`45:55`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2755)).
