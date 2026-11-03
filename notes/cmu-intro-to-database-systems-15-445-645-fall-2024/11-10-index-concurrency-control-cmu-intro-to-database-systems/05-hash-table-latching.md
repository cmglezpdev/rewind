# 05 — Hash Table Latching

The easy case, presented first. Resizable schemes (extendible/linear hashing) are set aside, though the ideas carry over [`28:48`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=1728).

## Why deadlocks are impossible here

- All threads move in **the exact same direction**: hash to a slot, then linear-probe top-to-bottom [`29:13`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=1753).
- Since nobody ever traverses backwards, there is no cycle in which two threads each hold what the other needs [`29:51`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=1791).
- **Key consequence**: a thread can release the latch behind it *before* acquiring the next one, because no one can insert a new page in the middle while it descends. This is exactly what B+ trees cannot do [`32:03`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=1923) [`32:37`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=1957).

## Resizing

- Simplest approach: a **global latch on the hash table's header page** — read mode for normal access, write mode to resize, which locks the whole table while you double and rehash [`29:51`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=1791).

## Granularity: the core trade-off

Classic compute-vs-storage trade-off — granularity determines achievable parallelism [`30:23`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=1823).

| Granularity | Space cost | Parallelism |
|---|---|---|
| One latch for the whole structure | Tiny | Effectively single-threaded |
| Page / block latch | One latch per page | Moderate |
| Slot latch | One latch per slot | Highest |

Sources: [`30:42`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=1842).

## Page/block latches — worked example

1. T1 wants to find `D`: hashes to a block, takes a **read latch on the whole block**, which implicitly covers every slot in it, then linear-probes [`31:09`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=1869).
2. T2 wants to insert `E` into that same block: needs the block in **write mode**, which is incompatible with the held read latch, so **T2 stalls** [`31:36`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=1896).
3. Cost of coarse granularity: there may have been a free slot where T2's insert wouldn't have interfered at all, but the block latch cannot express that [`32:03`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=1923).
4. When T1 moves to the next page, it releases the first page's latch **before** acquiring the next one [`32:03`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=1923).

## Slot latches

- Same protocol, finer grain: latch the individual slot rather than the page, releasing the previous slot's latch as you probe forward [`33:24`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=2004) [`33:51`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=2031).
- A reader still blocks when it reaches a slot a writer holds in write mode, but only on that one slot [`33:24`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=2004).

## Recommendation for resizable hashing

- For extendible and linear hashing, use **page-level latches** plus a **separate latch for the split pointer** and other metadata held in front of the table [`34:05`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=2045).
