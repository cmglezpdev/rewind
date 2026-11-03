# 07 — Wrap-Up and What Was Not Covered

## The verdict on index choice

Despite everything covered today, the **B+Tree remains almost always the default choice** — over tries, over R-trees, and definitely over skip lists [`1:01:30`](https://www.youtube.com/watch?v=foMMYyycRgk&t=3690). Filters, however, will keep reappearing all semester [`1:01:30`](https://www.youtube.com/watch?v=foMMYyycRgk&t=3690).

## Topics deliberately deferred to other courses

- **Inverted indexes in depth** — tokenizers, language modeling: covered in LTI 11-642 [`1:01:50`](https://www.youtube.com/watch?v=foMMYyycRgk&t=3710).
- **Multi-dimensional data structures** — R-trees, quad-trees, KD-trees. Used for geospatial work: given a point in 2D space, which polygon does it fall in; shortest-path lookups in mapping systems [`1:01:50`](https://www.youtube.com/watch?v=foMMYyycRgk&t=3710), [`1:02:18`](https://www.youtube.com/watch?v=foMMYyycRgk&t=3738).
  - Covered in **15-826 Multimedia Databases**, taught by Christos Faloutsos [`1:02:33`](https://www.youtube.com/watch?v=foMMYyycRgk&t=3753).
  - These handle multi-dimensional data far better than a plain B+Tree [`1:02:33`](https://www.youtube.com/watch?v=foMMYyycRgk&t=3753).

## Next lecture

How to make indexes **thread-safe** — concurrency has been glossed over the entire semester up to this point [`1:02:50`](https://www.youtube.com/watch?v=foMMYyycRgk&t=3770).

## Quick reference — everything covered today

| Structure | Answers | Mutable | Primary use |
|---|---|---|---|
| Bloom filter | Membership (probabilistic) [`4:01`](https://www.youtube.com/watch?v=foMMYyycRgk&t=241) | Insert only | Skip unnecessary lookups |
| Counting Bloom | Membership + delete [`8:30`](https://www.youtube.com/watch?v=foMMYyycRgk&t=510) | Yes | Same, with removal |
| Cuckoo filter | Membership via fingerprints [`9:51`](https://www.youtube.com/watch?v=foMMYyycRgk&t=591) | Yes | Redis filter type |
| SuRF | Membership **+ range** [`10:50`](https://www.youtube.com/watch?v=foMMYyycRgk&t=650) | No | LSM SSTables |
| Skip list | Ordered point/range [`14:27`](https://www.youtube.com/watch?v=foMMYyycRgk&t=867) | Yes | In-memory MemTables |
| Trie / radix tree | Ordered point/range, O(k) [`30:50`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1850) | Yes | B+Tree replacement (ART) |
| Inverted index | Keyword / content [`43:57`](https://www.youtube.com/watch?v=foMMYyycRgk&t=2637) | Yes (via pending list) | Full-text search |
| Vector index | Semantic similarity (ANN) [`56:15`](https://www.youtube.com/watch?v=foMMYyycRgk&t=3375) | Varies | Embedding search |
