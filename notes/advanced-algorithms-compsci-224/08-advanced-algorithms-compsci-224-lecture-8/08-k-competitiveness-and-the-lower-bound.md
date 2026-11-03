# 8. LRU/FIFO are k-competitive — and no deterministic algorithm does better

## The two results

- **Upper bound (Sleator–Tarjan):** LRU and FIFO are **k-competitive**, `k` = cache size ([`51:42`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3102)).
- Sounds terrible for an 8 GB memory — a huge competitive ratio ([`51:42`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3102), [`52:47`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3167)).
- **Lower bound (same paper):** **no online (deterministic) algorithm can have competitive ratio below `k`** ([`52:47`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3167)).

## Proof of the lower bound

- Restrict the universe to **`k + 1` pages**, so the cache always misses exactly one page ([`53:53`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3233)).
- The adversary **always requests the page the algorithm just evicted** ⇒ a page fault on *every* access ([`54:19`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3259), [`55:25`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3325)).
- OPT, evicting the page requested farthest in the future, **faults at most once every `k` accesses** — because that victim must have at least `k` other requests ahead of it ([`54:45`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3285), [`55:25`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3325)).
- Ratio: `k` ([`55:25`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3325)).

## `k`-competitiveness is not automatic

- Not every policy achieves ratio `k`: **LFU has an unbounded competitive ratio** — there are sequences where OPT pays about `1` and LFU faults essentially on every request ([`56:10`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3370), [`56:34`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3394)).

## One-bit LRU (the marking scheme)

Rather than analysing LRU directly, the lecture analyses a relaxation ([`57:29`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3449)):

1. Initially **all pages unmarked** ([`58:22`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3502)).
2. **Mark every accessed page.**
3. On an eviction, **evict any unmarked page** (choice unspecified/arbitrary) ([`58:22`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3502), [`59:32`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3572)).
4. If **all pages are marked** and an eviction is needed, **clear all mark bits**, then evict and bring in the new page marked ([`1:00:01`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3601)).

**LRU is a special case of one-bit LRU**, so one-bit LRU being `k`-competitive implies LRU is ([`1:01:09`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3669), [`1:01:38`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3698)):

- The least recently used page is always at least `k` accesses in the past, so it belongs to the previous marking phase and is therefore always unmarked — a legal victim ([`1:02:29`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3749), [`1:02:49`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3769)).

## Phase argument (the whole proof)

- A **phase** is the interval between two consecutive "clear all bits" operations ([`1:03:39`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3819)).
- Starting a new phase requires **`k + 1` distinct pages** to have been accessed, so even OPT — which also holds only `k` pages — **faults at least once per phase** ([`1:04:19`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3859), [`1:04:50`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3890)).
- One-bit LRU faults **at most `k` times per phase**: each fault raises the number of marked pages by exactly one, and the phase ends at `k` marks ([`1:05:20`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3920), [`1:06:26`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3986), [`1:06:49`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4009)).
- A student correction: it is **"at most `k`"**, not "exactly `k`", because a page surviving from the previous phase can get marked by a hit without a fault ([`1:07:20`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4040)).
- `≤ k` faults vs `≥ 1` fault per phase ⇒ **`k`-competitive** ([`1:05:45`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3945)).
