# 7. Making the Analysis Rigorous — Chernoff and a Gap

## The deterministic upper-bound sequence

Replace the random `B_i` with a **fixed sequence `α_i`** that obeys the same squaring law ([`1:04:44`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3884), [`1:05:36`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3936)):

- Base: **`α_6 = n / 2e`**.
- Recurrence: **`α_{i+1} = e · α_i² / n`** — the fake proof's `B_i²/n`, plus a **factor of `e` of slack** ([`1:05:36`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3936), [`1:06:15`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3975)).
- Event **`E_i` = "`B_i ≤ α_i`"**; the goal is to show **all** `E_i` hold w.h.p. ([`1:05:36`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3936), [`1:06:32`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3992)).

## Why the induction starts at level 6

- **`Pr[E_6] = 1`** deterministically: at most `n/6` bins can hold load `≥ 6`, and `n/2e > n/6` ([`1:06:32`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3992), [`1:08:14`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4094)).
- Any starting level `t` would work as long as `α_t > n/t`; 6 is chosen so the later **Chernoff bounds are small enough that a union bound over all levels is harmless** ([`1:08:14`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4094), [`1:08:41`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4121)).

## Claim 1 and the intended proof

**Claim** ([`1:09:08`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4148), [`1:10:00`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4200)):

```
Pr[B_{i+1} > α_{i+1} | E_i]  ≤  O(1) · Pr[ Bin(n, (α_i/n)²) > α_{i+1} ]
```

i.e. the conditional count is dominated by a **binomial** with success probability `(α_i/n)²` — exactly what the non-rigorous argument assumed ([`1:10:00`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4200)).

Then, mechanically ([`1:14:03`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4443), [`1:14:19`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4459), [`1:15:15`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4515)):

1. Bound the tail of that sum of Bernoullis with a **Chernoff bound**.
2. **Union bound over all levels `i`** to conclude all `E_i` hold simultaneously w.h.p.

## The gap the lecturer hit live

- He attempted the proof via **Bayes' rule** on `Pr[B_{i+1} > α_{i+1} | E_i] · Pr[E_i]` and via `B_{i+1} ≤ Σ_x Q_x` (indicators of `H(x) ≥ i+1`) ([`1:10:47`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4247), [`1:11:21`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4281), [`1:12:43`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4363)).
- **The problem**: once you condition on `E_i`, the per-item probability is **no longer simply `(B_i/n)²`** — conditioning introduces a **dependency issue** between the indicators ([`1:13:22`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4402)).
- He could not close it on the board and deferred the fix to the written notes, twice apologising ([`1:13:22`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4402), [`1:14:19`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4459), [`1:15:15`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4515)).
- **Taking the claim for granted, the rest is routine** — Chernoff plus a union bound ([`1:14:03`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4443)).
- On a student question about alternatives: you would **get the same bound as Chernoff up to constants in the exponent** ([`1:16:13`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4573)).
