# 01 - Introduction and recovery goals

## Framing

- Recovery is called "the third hardest lecture of the semester"; losing data is unacceptable, which is why application programmers should not write their own recovery components and should rely on a battle-hardened DBMS instead ([`0:27`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=27)).
- Last lecture covered the write-ahead log (WAL) built during *normal* processing: transaction ID, modified object, before value, after value ([`1:51`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=111)).
- This lecture covers the *other half*: after a crash or unclean shutdown, how to use that WAL to put the database back into the correct state and preserve atomicity, consistency and durability ([`1:51`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=111)).
- Deliberate methodology: present the basic, conservative, correct version first; optimizations come afterwards ([`2:40`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=160), [`3:02`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=182)).

## Buffer pool policy assumed: STEAL + NO-FORCE

- **STEAL** — dirty pages of *uncommitted* transactions may be flushed out of the buffer pool, but only if the corresponding WAL records were written first ([`3:23`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=203)).
- **NO-FORCE** — a committing transaction is *not* required to flush its dirty pages; only its log records must be written ([`3:23`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=203)).

## The target scenario

Three transactions, then a crash ([`3:23`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=203)):

| Transaction | Activity | Required post-recovery state |
|---|---|---|
| T1 | write, then commit | changes must be **durable** — the outside world was told it committed ([`4:02`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=242)) |
| T2 | write, then abort | **no** changes visible ([`4:20`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=260)) |
| T3 | read, write, crash | **no partial updates** visible ([`4:02`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=242)) |

## Why ARIES

- ARIES is the canonical definition of how to make a database safely recoverable; the paper dates from ~1992 and runs about 70 pages of methodical case analysis ([`5:08`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=308)).
- Recovery protocols existed before ARIES, but they optimized for specific situations and missed corner cases ([`5:08`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=308)).
- The defining capability ARIES adds: **recovering correctly even if the system crashes during recovery** ([`5:38`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=338), [`5:53`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=353)).
- Real systems (PostgreSQL included) do not implement ARIES literally — e.g. most do not flush all pages when recovery finishes — but they are "close enough" ([`4:46`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=286), [`5:08`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=308)).

## Simplifying assumptions for the lecture

Stated at [`15:08`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=908), [`16:06`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=966) and [`16:30`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=990):

- Every log record fits in a single page. Real systems segment oversized records ("1 of 2", "2 of 2") so recovery can detect an incompletely flushed record ([`15:08`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=908), [`15:45`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=945)).
- Disk writes are atomic.
- Single-version concurrency control with strong strict 2PL.
- STEAL + NO-FORCE.
- B+Tree logging is ignored.
