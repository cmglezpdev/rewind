# 7. Sharper iteration bounds and bipartite matching

The `O(m)`-per-blocking-flow bound is already good; this section attacks the **other** factor — how many blocking flows are needed [`1:15:54`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4554).

## The path-decomposition argument (unit capacity)

1. After `d` iterations, `d(s, t)` in the level graph is **at least `d`**, since it strictly increases each round [`1:14:58`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4498).
2. Decompose any remaining max flow in the residual graph into paths; **every path has length ≥ d** [`1:14:58`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4498), [`1:15:54`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4554).
3. With only `m` edges, there are **at most `m/d` such paths**, so the residual max flow is at most `m/d` [`1:15:54`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4554).
4. Each remaining blocking flow kills at least one unit ⇒ **total iterations ≤ `d + m/d`, for every `d`** [`1:16:55`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4615).
5. Minimized at `d ≈ √m`, giving **`O(√m)` iterations** [`1:16:55`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4615).

**Result**: `O(m)` per blocking flow × `O(√m)` iterations = **`O(m^{3/2})` max flow**, or more precisely `O(m · min(√m, n))` [`1:17:22`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4642).

## Unit graphs and bipartite matching

- Consider the layered graph: `s`, one layer, another layer, `t`, all edges going forward, **all capacities 1** — this is the standard reduction of **maximum bipartite matching** to `s`–`t` max flow (from CS124) [`1:18:35`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4715), [`1:19:36`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4776), [`1:19:52`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4792).
- On such graphs the same argument gives **`d + n/d` iterations**, minimized at `d ≈ √n` [`1:19:52`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4792).
- ⇒ **`O(m√n)` max flow**, hence **maximum bipartite matching in `O(m√n)`** [`1:20:26`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4826).
- Comparison: Ford–Fulkerson on the same instance has `f* ≈ n`, giving only `O(mn)` [`1:20:26`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4826).

| Approach | Bipartite matching time |
| --- | --- |
| Ford–Fulkerson (`f* ≈ n`) | `O(mn)` [`1:20:26`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4826) |
| Blocking flows | `O(m√n)` [`1:20:26`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4826) |
