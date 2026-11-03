# 11 — Design choices when building a B+Tree

Source material flagged in the lecture: the book *Modern B-Tree Techniques* (~10 years old) and a follow-up, *more* modern B+Tree techniques, published the month before the lecture. There is no comparable book on red-black trees or skip lists — evidence of how central this structure is [`58:58`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3538) [`59:29`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3569).

## 1. Node size

- Rule: **the slower the storage device, the larger the node**, to maximize sequential access per fetch [`59:46`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3586).
  - Very slow disk → **1 MB or larger**.
  - In-memory / very fast → **~512 bytes** [`28:58`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1738) [`59:46`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3586).
- Enterprise systems like **DB2** let you declare, per index, which buffer pool manager to use and what page size it has [`1:00:14`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3614).
- Also depends on workload: point queries want a different size than long scans [`1:00:14`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3614).
- **Inner nodes are often made larger than leaf nodes**, since they see most of the traffic [`1:01:23`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3683) [`1:01:39`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3699).

## 2. Merge threshold

- Textbook rule (merge below half full) causes **thrashing** under alternating insert/delete: split, merge, split, merge [`1:00:44`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3644).
- Fix: **relax the constraint** — let nodes sit below half full, and only merge when a node becomes completely empty [`1:01:09`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3669).
- This is precisely why Postgres calls its implementation a **non-balanced** B+Tree in the code [`1:01:23`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3683).

## 3. Variable-length keys

Four options [`1:01:39`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3699):

| Option | How | Verdict |
|---|---|---|
| **Pointers** | store a record ID instead of the key; follow it to compare | **bad** — see below [`1:01:39`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3699) |
| **Variable-length nodes** | let node size vary | only in academic systems; too much memory management [`1:03:22`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3802) |
| **Padding** | pad every key to the type's max length so it aligns | works, wastes space [`1:03:22`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3802) |
| **Slotted pages inside the node** | a slot array within the node page, with overflow allowed | **most common**; Postgres allows within-node overflow [`1:03:56`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3836) [`1:04:16`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3856) |

**Why the pointer approach fails — the T-Tree story:**

- **T-Trees** were an in-memory data structure (1990s) that stored pointers instead of keys [`1:02:09`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3729).
- Problem: with no keys in the node, every comparison during a descent requires **following a pointer and fetching a tuple** — so a binary search inside one inner node dereferences a bunch of tuples [`1:02:31`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3751).
- Only defensible if keys are enormous (~1 GB), which they never are [`1:02:31`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3751).
- Outcome: **Oracle TimesTen originally used T-Trees and got rid of them** — everyone now uses B+Trees [`1:02:31`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3751).

## 4. Intra-node search

| Method | Description | Practical status |
|---|---|---|
| **Linear scan** | walk from start to end | simple, works on unsorted nodes [`1:04:16`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3856) [`1:04:33`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3873) |
| **SIMD-accelerated linear scan** | broadcast the search key into a vector register and compare 4 lanes (32-bit ints) — or many more with **AVX-512** — in one instruction, then bit-shift to locate the match | a **better** linear scan; uses x86 intrinsics, ARM has its own [`1:04:56`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3896) [`1:05:26`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3926) [`1:06:09`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3969) |
| **Binary search** | requires sorted keys; jump to midpoint, go left/right | standard [`1:06:20`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3980) |
| **Interpolation search** | if keys are monotonically increasing with no gaps, compute the offset directly | **fastest, but exists only in academic papers** — no system implements it [`1:06:37`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3997) [`1:07:03`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4023) |

> Practical recommendation: **binary search, or linear search with SIMD** [`1:07:03`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4023).
