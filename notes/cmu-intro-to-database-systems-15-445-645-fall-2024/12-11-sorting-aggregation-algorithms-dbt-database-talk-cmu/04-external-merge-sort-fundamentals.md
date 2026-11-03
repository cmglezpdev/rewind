# 04 — External Merge Sort: Fundamentals and Materialization

## Why it exists

- General sorting where the data does not fit in memory. Without it, a sort either runs out of memory or falls back to quicksort, which is "really, really slow" because it generates a lot of random I/O [`14:13`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=853) [`14:34`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=874).

## The shape of the algorithm

- **Divide and conquer**: split the data into chunks called **runs**, sort each run in memory, write it back out to make room for the next chunk, then merge runs over multiple **passes** until one globally sorted run remains [`14:34`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=874) [`14:59`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=899).
- **Pass 0** (sorting phase): read chunks that fit in memory, sort them, write sorted runs out [`15:25`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=925).
- **Passes 1..n** (merging phase): read sorted runs back in, merge them into larger runs, write out, repeat [`15:25`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=925).

> Naming warning: next class's **sort-merge join** has its own sort and merge phases and internally *uses* external merge sort — the two must not be confused [`14:59`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=899).

## What actually lives in the sorted pages: key/value pairs

- **Key** = whatever is in the `ORDER BY` clause / the thing being sorted on [`15:59`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=959).
- **Value** = either the full tuple, or just the **record ID** [`15:59`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=959) [`16:14`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=974).

## Early vs late materialization

| | Early materialization | Late materialization |
|---|---|---|
| Value stored alongside key | Full tuple | Record ID only |
| Cost during sort | Copies the whole payload around | Copies only key + RID |
| Cost after sort | None — tuple is already there | Must fetch the rest of the tuple from disk |
| Typical fit | Row stores | Some column stores |

[`16:29`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=989) [`17:32`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=1052)

- **When late materialization wins**: a billion tuples, a filter removing 99% of them, then a sort — you avoid copying payload for data you never needed [`17:06`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=1026).
- **When it loses**: if the filter removes little, you end up reading the data a second time to re-fetch tuples — "so that would suck" [`17:32`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=1052).
- **Rule of thumb**: row stores typically do early materialization (the page already has everything); column stores sometimes attempt late materialization [`17:32`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=1052).
- The slides show only keys for clarity, but the value can be **quite large** in practice — same as remembering that CS-101 quicksort on bare integers ignores the payload you must physically move [`17:32`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=1052) [`21:01`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=1261).

## Q&A: sorting on multiple keys

- Question: with `ORDER BY a, b`, can you sort on the primary key first and the secondary key afterward using indexes? [`18:23`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=1103) [`18:50`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=1130)
- Answer: it depends on whether the data is actually **clustered** on that primary key. Typically you need **both keys and sort them together**. Using two different indexes to sort simultaneously — "I don't think you can do that" [`19:26`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=1166) [`19:52`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=1192).
- Late materialization still brings only key + record ID into memory; even that can be too big and spill. The point is not copying tuple payload around [`20:30`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=1230).
