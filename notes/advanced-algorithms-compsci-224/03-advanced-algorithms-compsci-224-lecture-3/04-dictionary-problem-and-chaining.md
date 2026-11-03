# 4. The dictionary problem and hashing with chaining

## Problem definition

Two operations on key/value pairs, with keys and values drawn from the universe [`51:37`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3097), [`52:05`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3125):

- `update(k, v)` — associate key `k` with value `v`.
- `query(k)` — return the value associated with `k`, or report that nothing is associated with it [`53:14`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3194).

Two variants exist: the **dynamic** dictionary (updates allowed) and the **static** dictionary (fixed key set) [`53:39`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3219). The existence of a solution had been asserted without proof in the earlier van Emde Boas lecture [`51:37`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3097).

## Hashing with chaining

Structure [`54:22`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3262), [`55:34`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3334):

- An array `A` of size `m`, each cell a pointer to a doubly linked list, all initially null.
- Each list node stores a `(key, value)` pair.
- `h` is drawn once at the start, from a **2-wise independent family** — full randomness is not required [`54:22`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3262), [`56:09`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3369).

Operations:

- `update(k, v)` — hash to `h(k)`, scan that list; if `k` is present overwrite its value, otherwise append `(k, v)` to the end [`56:09`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3369), [`56:30`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3390).
- `query(k)` — hash to `h(k)`, scan that list, return the associated value [`56:30`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3390).

## Cost

- Runtime of an operation = length of the linked list at `A[h(k)]`, a random variable because `h` is random [`57:31`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3451), [`57:46`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3466).
- One can show `E_h[ length of list at h(k) ] = O(1)`, giving **expected constant time** per operation — provided `m ≥ n` (with `m = 1` everything shares one list) [`57:46`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3466), [`58:39`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3519).
- The full analysis, plus perfect hashing, is deferred to links added to the course notes rather than done on the board [`53:14`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3194), [`58:39`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3519), [`59:13`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3553).
