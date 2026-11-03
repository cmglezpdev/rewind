# 4. Bounding Double Cycles and Closing the Proof

The only genuinely dangerous case: the double cycle `D`, which triggers a full rebuild ([`26:37`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1597)).

## Setting up `D`

- A **length-`k` tour** means `k` edges; by the lecturer's count a double-cycle tour of length `k` has **`k − 2` vertices** ([`27:04`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1624), [`27:36`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1656)).
- Define `D_k` = indicator of a length-`k` double-cycle tour, so `Pr[D = 1] ≤ Σ_k Pr[D_k = 1]` ([`28:16`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1696)).
- A student objection prompted a sharpening: the `D_k` events are **disjoint** (the `k`-th step is exactly where the second cycle closes), so the union bound is in fact an **equality** ([`29:24`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1764), [`30:25`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1825), [`31:25`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1885)).
- **Goal**: make `Σ_k Pr[D_k = 1]` a geometric series of order `O(1/n²)`, so multiplying by `n` in the recurrence leaves something that can be moved to the other side ([`29:02`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1742), [`29:24`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1764)).

## Probability of one fixed double-cycle configuration

- `1/m²` — that `g(x)` and `h(x)` hit their two prescribed vertices ([`31:46`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1906), [`32:34`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1954)).
- `(1/m²)^k` — every other item must place both hash values correctly ([`32:34`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1954)).
- `2^k` — the `g`/`h` orientation factor again ([`32:54`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1974)).

## Counting the configurations

Three independent choices ([`34:24`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2064), [`36:18`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2178), [`36:44`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2204)):

1. **Vertices**: at most `m^{k−2}`.
2. **Edges (items)**: at most `n^k`.
3. **Cycle structure**: where the first cycle starts, how long it is, and where the second starts — at most **`k³`**. The second cycle's length is forced by the tour length `k`.

Combining with `m = 4n` ([`37:39`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2259), [`38:28`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2308), [`39:11`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2351)):

```
Pr[D_k = 1] ≤ m^{k−2} · n^k · k³ · (1/m^{2k+2}) · 2^k  ≈  (1/n³) · k³/2^k
```

- The `4^{k−2} · 2^k / 4^{2k+2}` powers collapse, leaving `k³/2^k` over a polynomial in `n` ([`39:11`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2351)).
- `Σ_k k³/2^k` converges to a **constant**, so `Pr[D = 1] = 1/poly(n)` ([`41:04`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2464)).

## The acknowledged off-by-one

- The lecturer landed on `1/n³` (and momentarily `1/n⁴`) where the target was `1/n²`, and openly flagged an **off-by-one he could not locate live**, promising to fix it in the written notes ([`39:55`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2395), [`40:46`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2446), [`43:34`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2614)).
- His best guess for the source: the **number of items is not `k`** — a length-9 tour reuses items, so it carries about **`k − 2` items**, not `k`; tour length counts edges traversed, not distinct items ([`42:21`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2541), [`42:59`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2579), [`43:22`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2602)).
- The **conclusion is unaffected**: the bound is comfortably `≪ 1/n`, which is all the recurrence needs ([`40:46`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2446), [`41:04`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2464)).

## Bounding the `C log n` cutoff term — for free

The last term of the recurrence needs no new work ([`41:38`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2498), [`42:00`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2520)):

- Running past `C log n` steps requires **either** `D` to occur (already shown tiny) **or** `P_{C log n}` / `C_{C log n}` to occur.
- Since `Pr[P_k] ≤ 1/2^k`, taking `k = C log n` gives `1/2^{C log n} = 1/poly(n)` — with the polynomial degree **tunable by the constant `C`**.
- Both rebuild terms are therefore negligible, and **`E[insert] = O(1)`** follows ([`42:00`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2520)).
