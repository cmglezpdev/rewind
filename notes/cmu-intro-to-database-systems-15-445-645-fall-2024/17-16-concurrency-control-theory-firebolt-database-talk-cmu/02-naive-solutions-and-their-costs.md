# 02 — Naive Solutions and Why They Fail

Two straw-man designs are presented and demolished before the real theory begins.

## Straw man 1 — single queue, one transaction at a time

- One global queue, one worker that pulls a transaction and runs it to completion before starting the next ([`7:10`](https://www.youtube.com/watch?v=4y656idl8ZU&t=430)).
- **It works** for the lost-update problem: only one thing runs at a time. This is effectively the global write lock the student proposed ([`7:30`](https://www.youtube.com/watch?v=4y656idl8ZU&t=450)).
- **It does not solve the crash problem** — a crash still leaves a half-applied transaction ([`7:50`](https://www.youtube.com/watch?v=4y656idl8ZU&t=470)).
- Cost: parallelism is essentially zero.

## Straw man 2 — copy the whole database (shadow copy)

- Before each transaction, copy the entire database file/directory; the transaction mutates the copy; on commit, flip a pointer so the copy becomes the new version; on failure, discard the copy ([`8:05`](https://www.youtube.com/watch?v=4y656idl8ZU&t=485), [`8:34`](https://www.youtube.com/watch?v=4y656idl8ZU&t=514)).
- **Correct, but a bad idea** ([`8:47`](https://www.youtube.com/watch?v=4y656idl8ZU&t=527)).
- Not scalable: fine for 10 MB or a 4 KB page, hopeless for a petabyte on every transaction. Filesystem tricks (XFS delta / copy-on-write snapshots) help but do not save the approach ([`10:01`](https://www.youtube.com/watch?v=4y656idl8ZU&t=601)).
- This technique is **shadow paging**, used by System R, one of the first relational systems ([`10:34`](https://www.youtube.com/watch?v=4y656idl8ZU&t=634)).

## Why "just parallelize non-overlapping transactions" is not enough

- A student argues most transactions don't share data. Counter-argument: transactional workloads have a **hot set** — the Hacker News / Reddit front page, Taylor Swift's or Justin Bieber's Twitter account (which had to run on dedicated machines) ([`9:24`](https://www.youtube.com/watch?v=4y656idl8ZU&t=564), [`9:40`](https://www.youtube.com/watch?v=4y656idl8ZU&t=580)).

## The actual goal

- Allow transactions to run concurrently, interleave their operations cleverly, maximize parallelism, and still guarantee correctness ([`11:15`](https://www.youtube.com/watch?v=4y656idl8ZU&t=675)).
- Motivation: overlap a transaction blocked on disk I/O with another; use all the cores of a modern CPU ([`11:15`](https://www.youtube.com/watch?v=4y656idl8ZU&t=675)).
- SQLite allows many readers but only one writer, which simplifies things; PostgreSQL, MySQL and other OLTP systems allow multiple concurrent transactions for performance ([`11:39`](https://www.youtube.com/watch?v=4y656idl8ZU&t=699)).
- "Correct" is in big quotation marks — today's gold standard is **serializable** scheduling, but most systems don't actually give it to you ([`12:22`](https://www.youtube.com/watch?v=4y656idl8ZU&t=742)).
