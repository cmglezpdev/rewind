# 4. Worked example: fractional set cover

Finishing the example started in the previous lecture — the point is to show *how one actually builds a ρ-bounded oracle* for a concrete problem.

## The LP

- Minimize `Σ_S x_S` subject to: for every element `e`, `Σ_{S ∋ e} x_S ≥ 1`, and `x ≥ 0` ([`31:53`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1913)).
- The convex set is `P = { x : x ≥ 0, Σ_S x_S ≤ β }` ([`32:18`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1938)).
- MW only answers *feasibility*, so the objective is folded into `P` as the budget `β`: "can I cover at cost ≤ β?" ([`32:44`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1964)).
- With `m` sets, `OPT ∈ [1, m]`, so `β` is found by **binary search** in that range ([`32:44`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1964), [`33:13`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1993)).

## Building the oracle

- Right-hand side: `b = 𝟙`, so `pᵀb = Σ_e p_e = 1` (since `p` is a distribution). The oracle must decide whether `pᵀAx ≥ 1` is achievable ([`34:28`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2068)).
- Rewrite the objective: `pᵀAx = Σ_e p_e Σ_{S ∋ e} x_S = Σ_S x_S · p(S)`, where `p(S) := Σ_{e ∈ S} p_e` ([`34:53`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2093), [`35:14`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2114)).
- Since `x ≥ 0` with total mass ≤ `β`, this is (a scaling of) a convex combination of the values `p(S)` — so it is maximized by dumping **all** the mass on the single set with the largest `p(S)` ([`36:16`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2176), [`36:43`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2203)).
- **Oracle rule**: pick `S* = argmax_S p(S)`, output `x = β · e_{S*}` (β times the `S*`-th standard basis vector), achieving value `β · p(S*)` ([`37:03`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2223), [`37:41`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2261), [`38:09`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2289)).
- If `β · p(S*) < 1`, report **infeasible** — the maximum could not reach 1 ([`38:09`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2289), [`38:40`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2320)).

## Bounding ρ

For a constraint indexed by element `e`, examine `|a_e·x − b_e|` with `x = β·e_{S*}` ([`39:10`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2350), [`39:41`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2381)):

| Case | `a_e·x` | Violation magnitude |
|---|---|---|
| `e ∉ S*` | 0 | `1` ([`40:22`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2422)) |
| `e ∈ S*` | β | `β − 1` ([`40:42`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2442)) |

- So `ρ ≤ max(1, β − 1) ≤ β`, and since binary search keeps `β ∈ [1, m]`, `ρ ≤ m` ([`40:42`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2442), [`41:18`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2478)).

## Resulting cost

- Plugging `γ = ρ ≤ m` into the theorem: `O(m² log m / ε²)` iterations of multiplicative weights ([`41:38`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2498)).
- The output violates constraints by at most `ε`; rescaling repairs feasibility at a cost blow-up of roughly `(1 + ε)`, yielding a **`(1 + ε)`-approximate fractional set cover** ([`42:06`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2526)).

## Scope of the general theorem

- The proof never used non-negativity of `A`'s entries; that assumption only tends to help when *implementing* oracles ([`43:02`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2582)).
- Having the theorem is not enough — you still must supply a suitable `P` and an oracle with a good `ρ` ([`43:16`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2596)).
- Attribution: the approach comes from Plotkin–Shmoys–Tardos (who studied packing/covering LPs); the Arora–Hazan–Kale monograph states the theorem with no packing/covering restriction ([`43:38`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2618), [`43:54`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2634)).
