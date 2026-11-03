# 02 — Why Index Concurrency Control

## The assumption being dropped

- Previous lectures on B+ trees, hash tables, skip lists, inverted indexes, vector indexes and Bloom filters assumed the data structure was **single-threaded**, purely to simplify the discussion [`3:35`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=215).
- Real systems need multiple workers (threads or processes) mutating the structure simultaneously without breaking it [`4:08`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=248).
- Motivation: exploit many-core CPUs, and when one thread stalls on disk or network, let others keep running to **hide the stall** [`4:36`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=276).

## The counter-argument: don't do any of this

- There's a class of systems that skips latching entirely, on the argument that latching protocols only add overhead and running **one thread at a time gets you bare-metal speed** [`4:58`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=298) [`5:19`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=319).
- Examples given:
  - **Redis** — single process, single thread; only one query can touch the database at a time, so no latches are needed [`5:19`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=319).
  - **VoltDB** — takes it to the extreme; based on H-Store, which the lecturer helped build [`5:46`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=346).
  - **kdb** (KX) — ubiquitous on Wall Street, uses its own K language rather than SQL; core engine is single-threaded [`5:46`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=346).

## Concurrency control protocol

- Think of it as the **traffic cop** inside the DBMS: it decides which worker may read which data, when, and in what way, to protect a shared object [`6:26`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=386).

## Two notions of correctness

| Notion | Question it answers | Covered where |
|---|---|---|
| **Logical correctness** | Can my thread see the data it is supposed to see? (e.g. I inserted key 5 — will my read find it, or did someone delete it first?) | After the midterm, with transactions [`6:44`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=404) |
| **Physical correctness** | Is the internal representation sound? Does a page pointer lead somewhere real? | **This lecture** [`7:15`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=435) |

- The physical failure mode: you read a pointer, someone changes what it points to before you follow it, and you land "in no man's land" and segfault [`7:53`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=473).
- Design consequence: because a higher layer will own logical correctness, this lecture can make optimizations that would otherwise be unsafe [`7:15`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=435).
