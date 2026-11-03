# 14 — Conclusion and what comes next

## Verdict

- The B+Tree is **~50 years old, still widely used, and essentially always the right choice** for a database system [`1:20:27`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4827).
- The recommended build: classic B+Tree **plus the B-link tree's sibling pointers** plus the optimizations from topic 12 — that combination handles anything [`1:20:27`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4827).
- Building a new system from scratch? **This is your first choice** [`1:20:27`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4827).
- On skip lists: "I don't care what you read on Hacker News about skip lists, they're terrible" [`1:20:27`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4827).
- On tries: interesting, but you can **put tries inside your B+Trees** [`1:20:54`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4854).
- Opening claim, restated: the best data structure in computer science — "forget red-black trees, forget splay trees, nobody uses that" [`0:27`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=27).

## Next lecture

Other index data structures [`1:20:54`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4854):

- Skip lists (and why they're a bad idea)
- Bloom filters
- Tries
- Inverted indexes
- Vector indexes (briefly, at the end)

Also deferred to the following lecture: **latching and concurrent access** for B+Trees [`6:27`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=387) [`47:24`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=2844).
