# 6. Amortized analysis of binomial heaps

Goal: prove that insertion is `O(1)` **amortized** even though it is `O(log n)` in the worst case [`39:26`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2366), [`38:28`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2308).

## Identifying the actual cost

- Elicited from the class: the real cost of an insertion is governed by **the number of trees already in the forest**, since each merge destroys one tree [`40:49`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2449), [`41:19`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2479), [`41:40`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2500).
- Writing `t` for the old number of trees and `t'` for the new number: `actual cost of insert = O(t − t' + 1)` [`41:40`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2500), [`42:15`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2535).

## The potential function

```
Φ(state) = number of trees in the forest
```

[`42:15`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2535)

## Insert: amortized O(1)

```
amortized = actual + ΔΦ
          = (t − t' + 1) + (t' − t)
          = 1
```

The `t` terms cancel exactly, leaving a constant [`42:58`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2578), [`43:23`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2603).

> Note on the `O(·)`: hiding a constant `c` in the actual cost just means putting the same `c` in front of the potential term; it does not affect the conclusion [`42:58`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2578).

## The other operations

- The actual cost of delete-min and decrease-key is at most `log n` [`43:23`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2603), [`43:57`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2637).
- The potential difference is bounded too, because the forest never holds more than `log n` trees [`43:57`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2637).
- So the same calculation rebounds the other operations at `O(log n)` amortized [`43:57`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=2637).
