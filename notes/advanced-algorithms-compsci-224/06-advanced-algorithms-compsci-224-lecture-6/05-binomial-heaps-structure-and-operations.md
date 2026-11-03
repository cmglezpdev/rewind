# 5. Binomial heaps: structure and operations

## Structural invariants

- Each item is a node; nodes are maintained in a **forest** [`27:56`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1676).
- **Heap order**: if `x` is the parent of `y` then `key(x) ≤ key(y)`, exactly as in binary heaps [`27:56`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1676), [`28:59`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1739).
- **Rank** of a tree = the degree of its root [`28:59`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1739).
- A rank-`k` tree contains **exactly `2^k` nodes** [`28:59`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1739).
- **At most one tree of each rank `k`** in the forest [`30:00`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1800).
- A rank-`k` root has exactly `k` subtrees, of ranks `0, 1, …, k−1` [`30:00`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1800).
- Recursive shape: rank 0 is a single node; rank 1 has one rank-0 child; rank 2 has a rank-0 and a rank-1 child; rank 3 has rank-0, rank-1 and rank-2 children [`30:58`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1858), [`31:43`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1903).
- Roots are kept in a **doubly linked list** [`33:25`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2005).

## The binary-counter analogy

The multiset of ranks present is a bit vector: bit `k` is 1 iff a rank-`k` tree exists. Inserting one element is **adding 1 in binary**, and merging two equal-rank trees is a **carry** [`33:59`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2039), [`34:24`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2064), [`34:43`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2083).

Worked example: with ranks 0,1,2,3 present (`1111`), inserting one element carries all the way up and produces a single rank-4 tree (`10000`) [`34:24`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2064), [`35:08`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2108).

## The three operations

- **decrease-key** — change the key, then **bubble up**: swap with the parent repeatedly while the heap order property is violated [`32:10`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1930), [`32:53`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1973).
- **insert** — add a new singleton tree to the forest, then repeatedly merge trees of equal rank (the smaller root becomes the parent) [`33:25`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2005), [`35:08`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2108), [`35:36`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2136).
- **delete-min** — scan the roots to find the minimum, remove that root, promote all its children to top-level trees, then merge equal-rank trees again [`35:36`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2136), [`36:39`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2199), [`37:05`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2225), [`38:28`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2308).

## Why scanning all roots is cheap

A student asked whether a "meta tree" over the roots would avoid the linear root scan [`37:50`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2270). It is unnecessary:

1. A rank-`k` tree has exactly `2^k` nodes, so with `n` items the maximum rank is `log n` [`37:50`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2270).
2. At most one tree per rank ⟹ **at most `log n` trees total** [`38:13`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2293).
3. Hence finding the minimum by checking every root costs at most `log n` [`38:13`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2293).

## Worst case

All operations, insert included, take `O(log n)` in the worst case — an insert into a forest holding one tree of every rank up to `log n` triggers a full cascade of carries [`38:28`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2308), [`39:26`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2366).
