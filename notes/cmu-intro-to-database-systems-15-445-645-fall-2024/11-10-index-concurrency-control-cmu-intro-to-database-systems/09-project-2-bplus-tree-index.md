# 09 — Project 2: Thread-Safe B+ Tree Index

Build a thread-safe B+ tree whose pages are backed by the buffer pool manager from Project 1 — so **buffer-manager bugs make this project much harder**, because you won't know whether a segfault comes from your tree or your buffer manager [`1:08:13`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4093) [`1:08:34`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4114).

## The four tasks

1. **Page layout** — define what the pages look like [`1:08:34`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4114).
2. **Basic insert / delete** operations [`1:08:34`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4114).
3. **C++ iterator** over the leaf nodes [`1:08:34`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4114).
4. **Make it thread safe** with latch crabbing/coupling [`1:08:34`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4114) [`1:10:28`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4228).

Tasks 1–3 do **not** need to be thread safe; separate tests cover them [`1:09:53`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4193).

## Scope and constraints

- **The page layout differs from previous years** — ChatGPT-derived code will break [`1:09:05`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4145).
- Only **unique keys** are required, so no overflow pages [`1:09:05`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4145).
- Start with point queries (single-key lookups), then inserts without splitting, then removal with sibling stealing, then merging [`1:09:05`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4145).
- The iterator follows the STL iterator API so it works in a normal `for` loop; only **ascending** scans are needed (`++` only, no reverse) [`1:09:53`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4193) [`1:10:28`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4228).
- Only **fixed-length keys** — no varchars. A constexpr computes keys-per-node from the templated key size [`1:12:31`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4351).

## Practical advice

- **When slides and textbook disagree, follow the textbook** — not the slides, online guides, or Wikipedia [`1:10:48`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4248) [`1:11:11`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4271).
- **Set the page size small — 512 bytes** — to trigger splits and merges far more often during testing [`1:11:11`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4271).
- **Always protect the root page ID member**: a split at the root produces a new root, and this trips students up every year [`1:11:32`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4292).
- Use a debugger, not `printf` [`1:44`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=104).

## Grading

- Leaderboard as in Project 1: **first place earns 50% bonus points**, requires passing all test cases, and **must be submitted on time** — no submitting late and optimizing for an extra day [`1:11:47`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4307).
- Plagiarism is reported [`1:12:14`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4334).

## Q&A points

- **Does P1 performance affect P2?** Everything is in memory, so there's no disk spilling and the LRU-K path barely runs; but an inefficient **page table** will slow you down [`1:14:02`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4442) [`1:14:29`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4469).
- **Pointer swizzling**, if allowed, means almost never going to the buffer manager — the lecturer wasn't sure whether the project permits it [`1:14:51`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4491).
- P1 submissions remain possible via a new ungraded Gradescope entry with the P1 tests [`1:13:48`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4428).

## The warning, repeated

- "Every year people wait till the last week to try to implement this and it always fails." Looking at submission history, the lecturer cannot recall **anyone** who started at the last minute and pulled it off [`1:15:11`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4511) [`1:15:28`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4528).

## Next lecture

- Query execution: the execution engine at a high level, then sorting algorithms and aggregations, then joins — running up to the midterm [`1:07:50`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=4070).
