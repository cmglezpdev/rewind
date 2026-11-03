# 5. Linear probing: the scheme, why it wins in practice, and known results

## Why linear probing is popular: cache behaviour

- Linear probing does not beat `O(1)` asymptotically — chaining is already constant. Its advantage is that it is **cache-friendly** on real machines [`59:13`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3553), [`59:36`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3576).
- **Prefetching**: on a cache miss the machine fetches not only the requested word but also the next few consecutive memory elements, guessing you will read them next (as when looping over an array) [`59:36`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3576), [`1:00:04`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3604), [`1:00:31`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3631).
- Consequence: sequential accesses are already in cache when touched, so they are much faster — which is precisely the access pattern linear probing generates [`1:00:51`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3651).

## The scheme

- Array `A` of `m` cells and a hash function `h : U → {0,…,m-1}` (family unspecified for now) [`1:01:27`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3687).
- Ideally store key `k` at `A[h(k)]`; on collision, **walk forward sequentially** until an empty cell is found and store it there [`1:01:59`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3719), [`1:02:16`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3736).
- Intervals — and therefore probe runs — are allowed to **wrap around** the end of the array [`1:18:05`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4685).

## Historical results

| Year | Who | Result |
| --- | --- | --- |
| ~1954 | Samuel, Amdahl, Boehme | First proposed linear probing; proved nothing about it [`1:03:03`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3783), [`1:03:51`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3831) |
| 1963 | Don Knuth | First analysis, assuming `h` truly random: with `m = (1+ε)n`, expected time per operation is `O(1/ε²)` [`1:03:51`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3831), [`1:04:36`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3876) |
| 2007 (journal 2009) | the "breakthrough" paper (Pagh et al., per the lecture's later reference to a Rasmus Pagh talk) | **5-wise independence suffices** for `O(1)` expected time when `m ≥ c·n` [`1:04:36`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3876), [`1:05:55`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3955) |
| ICALP 2010 | Pătraşcu and Thorup | **4-wise independence does not suffice**: they exhibit a 4-wise family under which expected probe time is `Θ(log n)` [`1:05:55`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3955), [`1:06:40`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4000) |

Two clarifications on the 2010 lower bound:

- It is an **existence** result: *some* 4-wise family fails, not *every* 4-wise family [`1:07:03`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4023).
- Independence is not the only thing that matters — there is a family that is only **3-wise** independent yet performs very well for linear probing because it has additional structural properties; promised for the next lecture [`1:07:24`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4044).

## Why "five"?

- Pătraşcu's own answer when asked: **conditioning on where one element lands leaves everything else 4-wise independent** [`1:07:44`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4064), [`1:08:11`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4091).
- The same logic explains the easier warm-up result proved in class: 7-wise independence, because conditioning on one element leaves the rest 6-wise [`1:08:11`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4091), [`1:08:34`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4114).
- The 7-wise warm-up is not in that paper; it comes from a lecture by Rasmus Pagh and is used here as a gentler introduction [`1:09:16`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4156).
