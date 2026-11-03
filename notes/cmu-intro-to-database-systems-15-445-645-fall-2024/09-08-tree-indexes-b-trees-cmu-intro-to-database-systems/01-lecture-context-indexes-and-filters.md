# 01 — Lecture context: indexes vs. filters

## Where this lecture sits

- Course logistics: Project 1 (buffer pool) due that Sunday, a profiling/`perf` + flame-graph recording was published, Homework 3 releases on the 25th, midterm on **October 9th** covering material through lecture 10 [`0:52`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=52) [`1:27`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=87).
- **Project 2 is a B+Tree**, built from the material of this lecture [`7:15`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=435).
- Recap of the previous lecture: hash tables give average **O(1)** lookup, but they are used mostly for *internal* DBMS bookkeeping during query and transaction execution, not as user-facing indexes [`3:21`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=201) [`3:50`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=230).
  - Exception: some systems are essentially just a hash table exposed to users — Redis is roughly that [`4:17`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=257).
  - When you write `CREATE INDEX` in most systems, you get a B+Tree, not a hash index [`3:50`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=230).

## Two data structures, two jobs

| | Index | Filter |
|---|---|---|
| Answers | "where is key K?" | "does key K exist?" (set membership) |
| Precision | exact location (tuple / small set of tuples) | probabilistic: "probably yes" or "definitely no" |
| Example | B-Tree / B+Tree | Bloom filter |
| Declared by | a human, explicitly (`CREATE INDEX`) | usually internal; some systems let you declare them |

- An **index** is a data structure built over some subset (or all) of a table's attributes, kept organized/sorted so lookups find a single tuple quickly [`4:59`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=299) [`5:09`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=309).
  - Not always a single tuple: Postgres indexes can return *blocks* of tuples [`5:09`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=309).
- A **filter** answers set-membership queries — it tells you a key probably exists, but never where it is; the canonical example is the Bloom filter, covered in a later lecture [`5:24`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=324) [`6:01`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=361).
- Bloom filters *can* be declared on tables in some systems for query optimization, but they are usually an internal structure [`6:01`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=361).

## The maintenance obligation

- Anything in the table must be reflected in its indexes and filters, otherwise lookups produce **false negatives** [`6:27`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=387) [`6:55`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=415).
- Keeping indexes synchronized and thread-safe under concurrent access is the subject of the following lecture [`6:27`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=387).

## Roadmap for the lecture

1. B+Tree basics [`6:55`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=415)
2. Design choices when building one inside a DBMS
3. Optimizations to make them run faster [`7:15`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=435)
