# 3. Proof that MARK is `2·H_K` competitive

The whole proof is two per-phase inequalities that combine into a global ratio.

## The two claims

1. **OPT lower bound.** In phase `i`, OPT pays at least `ℓ_i/2 + d'_i − d_i` cache misses ([`12:13`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=733)).
2. **MARK upper bound.** `E[cost of MARK in phase i] ≤ ℓ_i · H_K` ([`13:00`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=780)).

## Why the two claims give the ratio

Summing claim 1 over all phases and using `d'_i = d_{i+1}`, the difference terms telescope ([`13:00`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=780), [`13:53`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=833)):

```
OPT ≥ Σ_i (ℓ_i/2) + d_final − d_initial  =  Σ_i (ℓ_i/2)     [since d_initial = 0, d_final ≥ 0]
MARK ≤ H_K · Σ_i ℓ_i
```

Dividing gives a gap of `2·H_K` ([`14:49`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=889)).

## Proof of claim 1: OPT pays at least `max(ℓ_i − d_i, d'_i)`

The `max` is at least the average — **that average is exactly where the factor of 2 is lost** ([`15:55`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=955), [`16:32`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=992)).

- **Why `≥ ℓ_i − d_i`**: MARK holds none of the clean pages at the start of the phase, so each clean request forces MARK to fetch. OPT differs from MARK on only `d_i` pages, so OPT can hold at most `d_i` of the `ℓ_i` clean pages — it must fetch the other `ℓ_i − d_i` ([`16:32`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=992), [`17:21`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1041)).
- **Why `≥ d'_i`**: at the end of a phase MARK's cache is *exactly* the set of pages requested in that phase. OPT also had to bring every one of those pages in. So each of OPT's `d'_i` differing pages corresponds to an eviction OPT performed ([`17:59`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1079), [`18:36`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1116), [`19:22`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1162)).

## Proof of claim 2: MARK's expected cost

**Only clean and stale requests can cause an eviction for MARK.** Anything else was already requested this phase, hence already marked and in cache, hence a hit ([`19:22`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1162), [`20:08`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1208)).

### Clean requests
Deterministically cost `ℓ_i` misses — a clean page was not requested last phase, so MARK does not hold it ([`20:49`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1249)).

### Stale requests (where randomness enters)
Snapshot the cache after `s` stale and `c` clean requests in the current phase ([`21:18`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1278), [`21:56`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1316)):

- All `c` clean pages occupy slots; all `s` already-served stale pages occupy slots — nothing requested this phase is ever evicted ([`22:42`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1362), [`23:12`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1392)).
- The remaining `K − s − c` slots hold a **uniformly random subset of the remaining stale pages**, because evictions were uniformly random ([`23:51`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1431), [`24:14`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1454)).
- Expected cost of the next stale request = `Pr[page not kept] = 1 − Pr[kept]`. After `s` stale requests there are `K − s` stale pages still in play, and the question is whether one of the `c` clean requests clobbered this page — giving **`c/(K − s)`** ([`24:59`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1499), [`27:25`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1645)). (The lecturer briefly mis-derives this at [`25:50`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1550) before the class corrects it.)
- Bound `c ≤ ℓ_i`, so each stale request costs at most `ℓ_i · 1/(K − s)` ([`27:57`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1677)).

### Summing over stale requests
`s` ranges from `0` to `K − ℓ_i − 1` ([`27:57`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1677)):

```
E[cost of stale requests] ≤ ℓ_i · Σ_{s=0}^{K−ℓ_i−1} 1/(K−s)
                          = ℓ_i · Σ_{j=ℓ_i+1}^{K} 1/j
                          = ℓ_i · (H_K − H_{ℓ_i})
                          ≤ ℓ_i · (H_K − 1)
```
([`28:30`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1710), [`28:54`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1734), [`29:28`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1768), [`29:43`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1783))

Adding the `ℓ_i` clean misses cancels the `−1`, giving **total expected phase cost `ℓ_i · H_K`** ([`29:43`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1783), [`30:25`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1825)). ∎
