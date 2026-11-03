# 4. Lower bound: no randomized paging algorithm beats `Ω(log K)`

Also from the Fiat et al. paper; the sharp version of the bound is `H_K` ([`14:49`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=889), [`15:23`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=923)).

**Theorem.** Any algorithm has competitive ratio `Ω(log K)` ([`31:33`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1893)).

## The adversarial construction

- Universe of exactly **`K + 1` pages** ([`31:33`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1893)).
- Request sequence: **`M` pages chosen uniformly at random**, independently ([`32:11`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1931)).

## Cost of any algorithm

You hold `K` of the `K + 1` pages, so each uniformly random request misses with probability exactly `1/(K+1)`:

**`E[cost of any algorithm] = M/(K+1)`** ([`32:59`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1979))

Reframed to avoid randomness in the statement: *for any algorithm there exists a length-`M` request sequence on which it pays this much* — the averaging argument guarantees one such sequence exists ([`33:31`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2011), [`34:11`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2051)).

## Cost of OPT on the same sequence

OPT sees the whole sequence in advance. Use **furthest-in-the-future eviction** (MIN); optimality is not even needed, only that it is *an* algorithm ([`34:38`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2078)).

- When OPT evicts page `p` (the one furthest in the future), it does not fault again until `p` reappears — and for `p` to be furthest, **every other page must be requested before `p`** ([`35:16`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2116), [`35:43`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2143)).
- Seeing all `K + 1` values in a uniform random stream is the **coupon collector / balls-and-bins** problem: expected time **`Θ(K log K)`** ([`35:16`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2116), [`36:33`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2193)).

## The gap

- Any algorithm faults on a **`1/K` fraction** of requests ([`36:33`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2193)).
- OPT faults on a **`1/(K log K)` fraction** ([`37:07`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2227)).
- Ratio: **OPT is better by a factor of `log K`** ([`37:07`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2227)). ∎

## Caveat noted in passing

If the randomness of the sequence is uncomfortable, a concentration argument shows a good fraction of sequences simultaneously make the algorithm pay ≈ `M/(K+1)` and keep OPT cheap, so a single deterministic bad sequence exists in the intersection ([`37:32`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2252), [`37:53`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2273), [`38:15`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2295)).
