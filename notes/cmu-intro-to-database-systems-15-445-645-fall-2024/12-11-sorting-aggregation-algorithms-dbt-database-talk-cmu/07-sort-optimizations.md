# 07 — Sort Optimizations: Double Buffering and Cheaper Comparisons

## Problem 1: the CPU stalls waiting on I/O

- The naive algorithm alternates between reading and writing while the CPU sits idle. Disk writes are slow: **tens of milliseconds worst case, hundreds of milliseconds against S3** [`34:59`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2099) [`35:10`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2110).

## Solution: double buffering

- Split memory in **half**: one half merges data already in memory, the other half prefetches the next chunk. Alternate ("ping-pong") between the two sets so the system always has useful work [`35:28`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2128) [`35:40`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2140) [`36:24`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2184).
- **Cost**: effective memory available for the merge is halved [`36:50`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2210).
- **Benefit**: if the disk is slow, this is "a huge win" because the I/O latency is hidden behind useful work [`36:50`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2210).
- **Requires non-blocking I/O in the disk manager** — a blocking OS syscall would stall the main worker thread on the flush; you want a separate thread to do the write while the worker keeps processing [`36:50`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2210) [`37:19`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2239).
- Triple buffering is possible until you run out of memory; Postgres is believed to do double buffering, MySQL unknown. **If your disk is very fast, the technique helps less** [`37:34`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2254) [`37:55`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2275).

## Problem 2: key comparison itself is expensive

- Comparing two 32-bit ints is a **single CPU instruction** — fast. Real data is variable-length, and you may compare billions of times [`37:55`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2275) [`38:26`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2306).
- To avoid reimplementing the sort per data type, systems pass a **function pointer** to the comparator — but that jump call is expensive on modern CPUs when executed a billion times [`38:41`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2321) [`38:59`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2339).

### Fix A — code specialization

- **Inline / hardcode** the comparator per type so, e.g., float comparisons emit floating-point instructions directly inside the sort, with no indirection [`39:16`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2356) [`39:37`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2377).
- Two ways to do it: **codegen at runtime** based on the data type, or **at compile time** [`39:55`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2395).
- **Postgres does the compile-time version**: a Perl script duplicates the sorting implementation into one variant per type (integers, floats, etc.). Called "a bit of a hack, but it works" — the C equivalent of C++ templates [`39:55`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2395) [`40:21`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2421).

### Fix B — key prefix comparison

- For long varchars/strings, compare only a **prefix** of the key (e.g. the first few characters) — usually enough to decide direction, and the comparison can be inlined [`40:49`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2449) [`41:11`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2471).
- Fall back to the full comparison function only when prefixes are equal [`41:20`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2480).
- Same idea as the prefix trick from the B+Tree lecture; mostly seen in **commercial OLAP systems** [`40:49`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2449) [`41:20`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2480).
