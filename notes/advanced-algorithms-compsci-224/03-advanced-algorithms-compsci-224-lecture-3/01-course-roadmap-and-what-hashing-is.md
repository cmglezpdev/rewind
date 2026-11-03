# 1. Course roadmap and what hashing is

## Where this lecture sits

- The lecture continues the **word RAM** thread from the previous classes; hashing is the last topic in that block [`0:01`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1).
- Planned agenda for the day [`0:01`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1), [`0:52`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=52), [`1:22`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=82):
  1. Load balancing (balls and bins)
  2. k-wise independence
  3. The dictionary problem
  4. Perfect hashing (brief review only — covered in CS 124)
  5. Linear probing
  6. The retrieval problem → cuckoo hashing, Bloomier filters
  7. Membership → Bloom filters
- Simple tabulation hashing was listed as a stretch goal, expected not to fit in the time available [`2:04`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=124).
- Administrative note: Problem Set 1 has been up since Friday and is due Monday 11:59 PM (deliberately late at night rather than in the morning, to avoid all-nighters) [`50:40`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3040).

## The formal setup for hashing

- A **hash family** `H` is a set of functions mapping the universe `{0, …, u-1}` into a table of slots `{0, …, m-1}` [`2:37`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=157).
- There is a set `S ⊆ U` with `|S| = n` — the items we actually care about. We want to pick some `h ∈ H` that "behaves nicely" on `S`; what nicely means depends on the application (e.g. no two elements of `S` collide) [`3:16`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=196).
- Mental picture: `n` items `i1, …, in` from the universe, hashed by `h` into an array of `m` cells indexed `0 … m-1`, with collisions possible [`3:58`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=238), [`4:24`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=264).

## Key symbols used throughout the lecture

| Symbol | Meaning |
| --- | --- |
| `u` | size of the universe of keys |
| `n` | number of items / active keys |
| `m` | number of table cells (or machines) |
| `h` | a single hash function drawn from the family |
| `H` | the hash family itself |
