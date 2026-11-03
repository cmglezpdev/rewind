# 1. Linear Probing Recap and the Corrected Full-Interval Lemma

Jelani Nelson opens by announcing this is the last day devoted exclusively to hashing, and by fixing a lemma from the previous lecture. [`0:00`](https://www.youtube.com/watch?v=edOWKZE1t84&t=0)

## Plan for the lecture

- Finish linear probing, showing the analysis works with only **5-wise independence** (nearly the same proof as 7-wise, plus one trick). [`0:20`](https://www.youtube.com/watch?v=edOWKZE1t84&t=20)
- Approximate membership, i.e. **Bloom filters**. [`0:20`](https://www.youtube.com/watch?v=edOWKZE1t84&t=20)
- **Cuckoo hashing**, **Bloomier filters** (a generalization solving a different problem), and a word on the power of two choices. [`0:50`](https://www.youtube.com/watch?v=edOWKZE1t84&t=50)

## The linear-probing setup being recapped

- Keys hash into an array of size `m`, with the assumption `m ≥ 2n`. [`1:34`](https://www.youtube.com/watch?v=edOWKZE1t84&t=94)
- For an interval `I` of array locations, `L(I)` = number of keys `j ∈ S` with `h(j) ∈ I`. [`2:22`](https://www.youtube.com/watch?v=edOWKZE1t84&t=142)
- `I` is **full** if `L(I) ≥ |I|`. [`2:45`](https://www.youtube.com/watch?v=edOWKZE1t84&t=165)

## The lemma as it should have been stated

> If inserting `x` takes `k` probes, then `h(x)` is contained in at least `k` full intervals, each of length at least `k`. [`3:34`](https://www.youtube.com/watch?v=edOWKZE1t84&t=214)

- Proof sketch: `h(x)` lands inside an occupied run bounded by a free spot; the interval containing that run plus `x` itself is full, and **any prefix interval of a full interval is also full**, giving `k` distinct full intervals. [`4:58`](https://www.youtube.com/watch?v=edOWKZE1t84&t=298) [`5:26`](https://www.youtube.com/watch?v=edOWKZE1t84&t=326)
- The intervals need not have length exactly `k` — start at the beginning of the run, extend to `h(x)`, and extend further if needed to reach length `k`. [`6:04`](https://www.youtube.com/watch?v=edOWKZE1t84&t=364)
- The lemma exists only to justify one inequality: **#probes to insert `x` ≤ #full intervals containing `h(x)`**, since the `k` intervals of the lemma are a subset of all full intervals containing `h(x)`. [`6:46`](https://www.youtube.com/watch?v=edOWKZE1t84&t=406) [`7:19`](https://www.youtube.com/watch?v=edOWKZE1t84&t=439)

## The resulting bound to be attacked

- Expected probes ≤ `Σ_k Σ_{I : |I|=k, h(x)∈I} Pr[I is full]`. [`7:41`](https://www.youtube.com/watch?v=edOWKZE1t84&t=461)
- Rewritten as a deviation bound: `Pr[L(I) − E[L(I)] ≥ E[L(I)]]`, because `E[L(I)] = |I|/2` while fullness means at least `|I|` keys landed there — a deviation of at least `|I|/2` above the mean. [`8:01`](https://www.youtube.com/watch?v=edOWKZE1t84&t=481) [`8:25`](https://www.youtube.com/watch?v=edOWKZE1t84&t=505)
