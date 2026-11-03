# 10. The randomized marking algorithm

## The theorem (Fiat, Karp, Luby, Naor, Sleator, Young — 1991)

- Attributed with a joke that **Tarjan is not on this one**; also noted that the "McGeoch" here is a different person from the Bentley–McGeoch one, both at Amherst ([`1:14:20`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4460), [`1:15:16`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4516)).
- **Upper bound:** there is a randomized paging algorithm with competitive ratio **`2·H_k`** against oblivious adversaries, where `H_k = 1 + 1/2 + 1/3 + … + 1/k = ln k + Θ(1)` ([`1:15:40`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4540)).
- **Lower bound:** any randomized scheme has competitive ratio **`Ω(log k)`** ([`1:15:40`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4540)).
- So randomization takes paging from **`Θ(k)` down to `Θ(log k)`** — the practical payoff of the oblivious-adversary assumption.

## The algorithm: MARK

- Take **one-bit LRU** and resolve its unspecified choice **uniformly at random**: **evict a uniformly random unmarked page** ([`1:16:43`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4603), [`1:17:17`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4637), [`1:17:44`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4664)).
- Contrast: LRU resolves the same choice by recency; MARK resolves it by a coin ([`1:17:17`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4637)).
- **Claim:** MARK is `2·H_k`-competitive ([`1:17:44`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4664)).

## Competitive ratio for randomized algorithms

- **Definition.** A randomized algorithm `A` is `r`-competitive if for all sequences `S`:

  `E[cost_A(S)] ≤ r · cost_OPT(S) + constant` ([`1:18:36`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4716), [`1:19:15`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4755))

## Proof sketch (started, finished next lecture)

- Break the sequence into **phases**, as in one-bit LRU: a phase begins when everything is unmarked and the new page arrives ([`1:19:57`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4797)).
- Classify pages at a point in time ([`1:20:38`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4838), [`1:21:53`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4913)):
  - **clean** — not accessed in the last phase and not yet in this phase
  - **stale** — accessed last phase but not yet this phase
- **Two bounds to prove:** if a phase has `L` clean accesses, then **OPT pays ≥ `L/2`** and **MARK pays ≤ `2·L·H_k` in expectation** ([`1:21:53`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4913), [`1:23:14`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4994)).
- Summing over phases yields the `H_k` competitive ratio; the lecturer flags that a correction term must be added and subtracted but **telescopes across phases** ([`1:23:14`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4994)).
- **The lecture ends here** — the full proof is deferred to the next class ([`1:23:14`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4994)).
