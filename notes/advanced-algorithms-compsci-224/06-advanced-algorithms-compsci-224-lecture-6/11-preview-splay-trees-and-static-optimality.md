# 11. Preview: splay trees and static optimality

## What splay trees are

- A kind of **binary search tree**, covered next lecture [`1:20:16`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4816).
- They match a balanced BST's `O(log n)` per operation, but **amortized rather than worst case** [`1:20:16`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4816).
- A single query can take **linear** time in the worst case; the `log n` holds only in the amortized sense [`1:20:47`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4847).

## Static optimality

The offline problem [`1:20:47`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4847), [`1:21:11`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4871):

- Given `n` keys **and the frequency with which each is searched**, build the BST minimizing the cost of serving those queries.
- This optimal tree can be computed with **dynamic programming** [`1:21:32`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4892).
- The optimum is frequency-shaped, not balance-shaped: a perfect binary tree is best in the worst case, but if two items are always the ones queried they belong at the top, and everyone else can go anywhere [`1:21:32`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4892), [`1:22:12`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4932).
- For some frequency distributions the optimal tree is a **completely unbalanced path** [`1:22:12`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4932), [`1:22:30`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4950).

## The amazing property

- Splay trees **restructure themselves after every query**, using only the query just seen — they do not know the future [`1:22:30`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4950), [`1:22:48`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4968).
- Yet over an entire query sequence they cost, **up to a constant factor**, as little as the DP-optimal tree built with full knowledge of the frequencies. This is the **static optimality** property [`1:22:48`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4968), [`1:23:05`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4985).
- Splay trees have other such properties beyond static optimality [`1:23:05`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4985).

## Closing reminders

- Sign up to scribe September 30, and fill out the Piazza poll [`1:23:05`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4985), [`1:23:27`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=5007).
