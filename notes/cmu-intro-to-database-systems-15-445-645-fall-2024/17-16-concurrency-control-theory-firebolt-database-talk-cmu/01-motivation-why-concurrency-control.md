# 01 — Motivation: Why Concurrency Control

## Where this sits in the course

- The previous lectures covered query optimization, execution, access methods, and memory/disk management — enough to build an end-to-end database system ([`1:13`](https://www.youtube.com/watch?v=4y656idl8ZU&t=73)).
- SQL parsing is deliberately skipped as a solved problem: use existing libraries (Rust SQL parsers, `libpg_query` for C/C++). The hard part is binding to catalog object IDs and running the optimizer ([`2:14`](https://www.youtube.com/watch?v=4y656idl8ZU&t=134)).
- What is missing: what happens on a crash, and what happens when two queries update the same thing simultaneously. That is the next three weeks — concurrency control now, recovery in two weeks ([`2:30`](https://www.youtube.com/watch?v=4y656idl8ZU&t=150)).
- Concurrency control and recovery cut across *all* layers: e.g. the buffer pool eviction policy must ask "is the log record for this page already on disk?" before evicting ([`3:10`](https://www.youtube.com/watch?v=4y656idl8ZU&t=190)).

## The ATM motivating example

Application logic for a withdrawal ([`3:53`](https://www.youtube.com/watch?v=4y656idl8ZU&t=233)):

1. Read the current balance.
2. Check for sufficient funds.
3. Pay out / transfer $25.
4. Deduct and write the new balance back.

This is a unit of work *above* the level of a single SQL query — it may comprise multiple queries plus application logic ([`4:54`](https://www.youtube.com/watch?v=4y656idl8ZU&t=294)).

## Two failure modes

**1. Crash mid-transaction** ([`5:07`](https://www.youtube.com/watch?v=4y656idl8ZU&t=307))

- Balance read as $100, $25 transferred out, then the system crashes before the write-back.
- The recipient has the $25 *and* the sender still shows $100 — money is created, the database is corrupted ([`5:25`](https://www.youtube.com/watch?v=4y656idl8ZU&t=325)).

**2. Lost update from concurrent execution** ([`5:39`](https://www.youtube.com/watch?v=4y656idl8ZU&t=339))

- Two workers share an account, both read $100, both take $25, both write $75.
- Each execution is individually correct, but $25 vanishes when they run concurrently ([`6:13`](https://www.youtube.com/watch?v=4y656idl8ZU&t=373)).
- A student proposes a write latch; the instructor notes the database term is **lock**, and that this is the topic of the next class ([`6:45`](https://www.youtube.com/watch?v=4y656idl8ZU&t=405)).

## Scope of what a DBMS can control

- The DBMS only has purview over reads and writes it performs on the application's behalf ([`12:40`](https://www.youtube.com/watch?v=4y656idl8ZU&t=760)).
- Side effects outside the system — sending a confirmation email, "launching a missile" — cannot be rolled back ([`13:03`](https://www.youtube.com/watch?v=4y656idl8ZU&t=783)).
