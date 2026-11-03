# 03 — The Validation Phase: Forward vs. Backward Validation

## Serial vs. parallel validation

- The lecture assumes **serial validation**: only one transaction validates at a time, protected by a single **global validation latch** ([`22:50`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1370), [`31:54`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1914)).
- **Parallel validation** is possible but harder: transactions must inspect each other's read/write sets concurrently, requiring latches and a deadlock-avoidance ordering ([`22:50`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1370), [`23:25`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1405)).
- Deadlock-avoidance trick: examine objects in **lexicographic order** so every transaction latches in the same direction — same principle as descending a B+Tree in 2PL ([`32:28`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1948)).
- The single global validation latch is obviously a bottleneck in practice ([`32:28`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1948)).

## The two directions

| | Forward validation | Backward validation |
| --- | --- | --- |
| Question asked | "Will other **active** transactions miss changes I am about to make?" | "Did I miss changes that already-**committed** transactions made?" |
| Who is examined | Read/write sets of all transactions still running (not yet validated) ([`23:59`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1439), [`34:59`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=2099)) | Recently committed transactions ([`35:14`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=2114)) |
| How the check is done | Set intersections against active workspaces | Compare each object's global WTS against the WTS captured when it was copied into the workspace ([`36:13`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=2173)) |

- Everyone must go in **the same direction**; mixing is unnecessary, because in backward validation the next transaction will look backwards too and catch anything missed ([`36:39`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=2199)).
- Either way you **abort yourself**, not the other transaction ([`29:23`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1763)).
- Neither direction is materially better; the lecturer does not know which is more commonly used, and notes most real systems use 2PL or timestamp ordering with multi-versioning anyway ([`37:18`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=2238), [`37:57`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=2277)). The lecture covers forward validation; backward is a homework exercise ([`24:49`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1489)).

## Forward validation: three conditions

A committing transaction Tᵢ is safe if **for every** concurrently active transaction Tⱼ, **at least one** of the following holds ([`25:02`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1502), [`25:46`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1546)):

1. **Tᵢ finished its write phase before Tⱼ began.** Trivially serial — "I commit today, you start tomorrow, you cannot know about me." Also covers transactions that have begun but done nothing at all ([`25:46`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1546), [`26:07`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1567), [`26:28`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1588)).
2. **Tᵢ finished its write phase before Tⱼ started its write phase, and `WriteSet(Tᵢ) ∩ ReadSet(Tⱼ) = ∅`.** Overlapping read sets are fine — reads commute. The danger is writing something the other transaction physically read in the past but logically should read in the future ([`26:54`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1614), [`27:18`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1638), [`27:36`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1656)).
3. **Extended case 2**: `WriteSet(Tᵢ) ∩ ReadSet(Tⱼ) = ∅` **and** `WriteSet(Tᵢ) ∩ WriteSet(Tⱼ) = ∅` ([`33:03`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1983)).

## Three worked examples

**Example A — abort** ([`28:02`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1682) → [`29:23`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1763))
- T1: `BEGIN`, `READ(A)`, `WRITE(A)` (WTS=∞ in workspace). T2: `BEGIN`, `READ(A)` — sees the version at WTS 0, cannot see T1's private write.
- T1 validates: `WriteSet(T1) ∩ ReadSet(T2) ≠ ∅` → **T1 must abort**.
- Why: T1 would get timestamp 1, T2 later gets timestamp 2, so T2 *should* have seen the DB at timestamp 1 but actually saw it at timestamp 0 — a read backwards in time ([`29:06`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1746)).

**Example B — both commit** ([`29:50`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1790) → [`31:05`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1865))
- T2 validates first with an empty write set → gets timestamp 1. T1 then validates → timestamp 2.
- Both read `A` at WTS 0, which was the latest version for both. Logically T2's read happened before T1's read, and T1's write after both — even though T1's write occurred **physically earlier** ([`31:05`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1865)).
- Key mental model: **physical time vs. logical (enforced) time** ([`31:40`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1900)).

**Example C — case 3 passes** ([`33:03`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=1983) → [`34:25`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=2065))
- T1 read and wrote `A`; T2 has read `B` but has **not yet read `A`**. No intersection at validation time, so T1 commits with timestamp 1. T2 later reads the *new* `A` and validates at timestamp 2 — timestamps still move forward correctly.
- Caveat: the system cannot know future queries, so it can only judge on what has happened so far ([`33:41`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=2021)).

## Why timestamps are assigned at validation, not at BEGIN

- Assigning at `BEGIN` fixes a serial order in advance and yields **less parallelism** ([`38:51`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=2331), [`39:08`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=2348)).
- Worse, under OCC a transaction cannot see another's private-workspace write, so it may unavoidably read a stale version and be forced to abort for a non-conflict-serializable read ([`39:59`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=2399), [`40:19`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=2419)).
- Google **Spanner** does assign on arrival — that is exactly what makes it *strict serializable* ([`1:00:36`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=3636)).
