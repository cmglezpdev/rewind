# 8. Closing Q&A — Constructing k-wise Independent Hash Families

A student asks whether degree-`(k−1)` polynomials are what people actually use in practice. [`1:24:14`](https://www.youtube.com/watch?v=edOWKZE1t84&t=5054) [`1:24:40`](https://www.youtube.com/watch?v=edOWKZE1t84&t=5080)

## Alternatives to polynomial families

- **Tabulation hashing** — Thorup, FOCS 2013: constructs `k`-wise independent families very fast. [`1:24:40`](https://www.youtube.com/watch?v=edOWKZE1t84&t=5080) [`1:25:07`](https://www.youtube.com/watch?v=edOWKZE1t84&t=5107)
- **Multiply-shift hashing** — Dietzfelbinger et al.: a pairwise-independent family with **no mod operation at all**, only multiplications and bit shifts, by choosing primes so that mod/division become bit shifts. [`1:25:07`](https://www.youtube.com/watch?v=edOWKZE1t84&t=5107) [`1:25:30`](https://www.youtube.com/watch?v=edOWKZE1t84&t=5130) [`1:26:04`](https://www.youtube.com/watch?v=edOWKZE1t84&t=5164)

## The state of the art at the time

- There are not many families in circulation, but it is a **very active area of research**; FOCS and STOC are the two big annual theory conferences. [`1:26:04`](https://www.youtube.com/watch?v=edOWKZE1t84&t=5164)
- **Evaluating a degree-`k` polynomial costs `k` time.** An upcoming FOCS paper gives `k`-wise independent families with the same small storage but **constant evaluation time, independent of `k`** — with the caveat that evaluations must be made **in sequential order** (`h(1)`, then `h(2)`, then `h(3)`, …). [`1:26:26`](https://www.youtube.com/watch?v=edOWKZE1t84&t=5186) [`1:26:41`](https://www.youtube.com/watch?v=edOWKZE1t84&t=5201)
- That restriction rules out many applications, including several covered in this course. [`1:26:41`](https://www.youtube.com/watch?v=edOWKZE1t84&t=5201)
- The order matters because the algorithm's running-time bounds only hold in the sequential regime; Nelson notes he has only read the abstract — the paper is on the arXiv but not yet presented. [`1:27:04`](https://www.youtube.com/watch?v=edOWKZE1t84&t=5224) [`1:27:28`](https://www.youtube.com/watch?v=edOWKZE1t84&t=5248)
- Take-away framing: **getting better hash families is an open area of research**. [`1:27:04`](https://www.youtube.com/watch?v=edOWKZE1t84&t=5224)
