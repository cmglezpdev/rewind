# 08 — Conflict Serializability and Dependency Graphs

## Two levels of serializability

- **Conflict serializability** — what real systems implement when they claim serializable ([`45:55`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2755)).
- **View serializability** — broader, but no system implements it because it requires understanding application semantics ([`46:21`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2781)). See [09](./09-view-serializability.md).
- Caveat: **some systems lie**. Ask Oracle for serializable transactions and it says yes, but delivers a weaker isolation level — and has since the 1990s ([`45:55`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2755), [`46:21`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2781)).

## Definitions

- Two schedules are **conflict equivalent** if they involve the same operations on the same objects and every pair of conflicting actions is ordered the same way ([`46:57`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2817)).
- A schedule is **conflict serializable** if it is conflict equivalent to *some* serial ordering ([`46:57`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2817)).

## The dependency (precedence) graph algorithm

- One **node** per transaction in the schedule ([`47:42`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2862)).
- Draw an **edge Ti → Tj** when Ti has an operation on some object that conflicts with a later operation of Tj on the same object ([`47:42`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2862)).
- Also called a precedence graph in Wikipedia/textbooks ([`48:08`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2888)).
- **Rule: the schedule is conflict serializable if and only if the graph has no cycles** ([`48:08`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2888)).

## Worked examples

### Two transactions with a cycle

T1 and T2 each read/write A then read/write B. `W(A)` in T1 precedes `R(A)` in T2 → edge T1→T2. But `W(B)` in T2 precedes `R(B)` in T1 → edge T2→T1. **Cycle → not serializable** ([`48:24`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2904), [`49:18`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2958)).

- Intuition: T1's output depends on T2 doing something, and T2's output depends on T1 doing something — impossible in serial execution ([`49:39`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2979)).

### Three transactions, acyclic

Edges are collected the same way; `W(B)` followed by `W(B)` is a write-write conflict but does not add a new edge direction that closes a cycle. No cycle → **equivalent to the serial order T2 → T1 → T3** ([`49:58`](https://www.youtube.com/watch?v=4y656idl8ZU&t=2998), [`50:27`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3027)).

- Note T3's `BEGIN` came before T2's, yet T3 commits after T2 — that is allowed, since the requirement is serializability, not arrival order ([`50:57`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3057), [`51:21`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3081)).

### Aggregation example with a cycle

T1 does `R(A) W(A) R(B) W(B)` with local arithmetic (`A = A - 10` happens outside the DBMS, on a local variable); T2 computes `sum = A + B` and echoes it. The graph has a cycle → **not conflict serializable** ([`51:21`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3081), [`51:55`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3115), [`52:27`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3147)).

- **Why reading before a write is a problem**: T2 saw the first update but not the second — it should have seen either both or neither. Reading half the updates is wrong ([`54:30`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3270)).
- The instructor acknowledges two spurious edges on the slide as mistakes to ignore ([`52:27`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3147), [`54:10`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3250)).

## Q&A clarifications

- **If a transaction aborts?** Under the cyclic schedule, T2 already read a value it should not have, so **both** transactions must roll back ([`52:44`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3164)).
- **Aborts and the graph**: rollbacks are *not* modeled — build the graph purely from the read/write operations issued ([`53:56`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3236), [`54:10`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3250)).
- **Adding a pure read from a fourth transaction** does not introduce a cycle, since reads alone create no back edge ([`1:00:34`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3634), [`1:00:57`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3657)).
