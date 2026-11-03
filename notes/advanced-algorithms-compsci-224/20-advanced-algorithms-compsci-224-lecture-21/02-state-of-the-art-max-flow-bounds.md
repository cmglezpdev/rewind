# 2. State of the art for max flow (as of the lecture)

A survey of the best known bounds before the algorithms are developed [`8:51`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=531).

## Strongly polynomial

- **`O(mn)`** — Orlin, STOC 2013. Recent, after roughly **30 years** with no improvement [`8:51`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=531), [`9:21`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=561).
- The previous champion `O(mn log n)` dates to **1983**; the whole 30-year gain was shaving that single `log n` [`9:21`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=561), [`9:45`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=585).
- In between, the `log n` was improved to a factor never larger than `log n` but better on dense graphs — the lecturer recalls the log base becoming something like `n²/m` [`9:45`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=585).
- The lecture's own target: reach **`O(mn log n)`**, and at least show `O(mn log² n)` [`9:21`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=561).
- The lecturer has not read Orlin's paper and says it looks complicated [`50:57`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=3057), [`51:19`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=3079).

## Weakly polynomial — two incomparable bounds

- **Goldberg–Rao**: `O(m · min(m^{1/2}, n^{2/3}) · log(n²/m) · log U)` [`10:17`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=617), [`10:55`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=655). The lecturer first wrote `m^{1/3}`, was corrected by students, and settled on `min(1/2, 2/3)` powers, promising to fix it in the scribe notes [`13:27`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=807), [`15:32`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=932), [`16:09`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=969).
- **Lee–Sidford**, via the **interior point method**, published less than a month before the lecture: `Õ(m √n log² U)` [`10:55`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=655), [`11:41`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=701).
- **Neither dominates**: on dense graphs (`m ≈ n²`) Goldberg–Rao behaves like `m·n^{2/3}` versus Lee–Sidford's `m√n`, so Lee–Sidford wins; when `m ≪ n^{3/2}` the `m^{1/2}` term makes Goldberg–Rao smaller [`11:41`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=701), [`12:10`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=730), [`12:33`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=753).

## Unit-capacity graphs

- **Even–Tarjan, 1975**: the same bound without the log factors [`12:33`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=753), [`13:03`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=783).
- **`m^{10/7}`** up to logs — Mądry, FOCS 2013 [`13:03`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=783).
