# 8. General capacities: `O(mn)` per blocking flow, and link-cut trees

Same advance/retreat/augment procedure, now charged carefully with arbitrary capacities [`1:21:06`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4866).

## Counting each operation

| Operation | Count | Cost each | Total |
| --- | --- | --- | --- |
| **Augment** | ≤ `m` — every augment saturates at least one edge, which is then deleted [`1:21:53`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4913), [`1:22:31`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4951) | `O(n)` — the built path has length ≤ `n` and flow is added edge by edge [`1:22:31`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4951), [`1:22:48`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4968) | **`O(mn)`** [`1:22:48`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4968) |
| **Retreat** | ≤ `m` — each retreat deletes an edge [`1:23:13`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4993) | `O(1)` [`1:23:13`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4993) | **`O(m)`** [`1:23:13`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4993) |
| **Advance** | ≤ `mn` — you cannot advance `n` times without either reaching `t` (augment) or hitting a dead end (retreat), and each of those deletes an edge; at most `m` deletions [`1:23:51`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=5031), [`1:24:16`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=5056), [`1:24:43`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=5083) | `O(1)` | **`O(mn)`** [`1:24:43`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=5083) |

- Note the vocabulary: "augment" inside this subroutine means adding the path's bottleneck capacity to the blocking flow being built — **not** modifying the residual graph [`1:21:53`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4913).

## Resulting bound

- **`O(mn)` per blocking flow** in general capacitated graphs [`1:24:43`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=5083).
- × at most `n` iterations ⇒ **`O(mn²)` max flow** [`1:24:43`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=5083), [`1:25:32`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=5132).
- Compare with Edmonds–Karp's `O(m²n)` — blocking flows trade an `m` for an `n` [`32:12`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=1932), [`32:44`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=1964).

## Where the waste is, and the fix (next lecture)

- The single-blocking-flow procedure is **wasteful**: it re-explores paths from scratch after each augment [`1:25:32`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=5132), [`1:26:04`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=5164).
- **Link-cut trees** (Sleator–Tarjan, 1983) cut the cost from `O(mn)` to **`O(m log n)`** per blocking flow [`1:26:04`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=5164), [`1:26:22`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=5182), [`1:26:48`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=5208).
- ⇒ **`O(mn log n)` max flow**, the bound that stood from 1983 until Orlin's `O(mn)` in 2013 [`50:40`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=3040), [`9:21`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=561).
- Details deferred to the next lecture [`1:26:22`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=5182), [`1:26:48`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=5208).
