# 4. Strong duality out of simplex (plus a Q&A aside on rank)

## Q&A aside: removing redundant constraints

- Degeneracies like "bases don't have size exactly `m`" also afflict ellipsoid and interior point; the course deliberately skips them to avoid pedantry ([`23:17`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1397)).
- To enforce full row rank: add constraints one at a time; if the rank does not increase, the new row was already in the span of the earlier ones, so drop it ([`24:07`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1447)).
- Computing rank: a crude option is `det(AᵀA) ≠ 0` ([`24:44`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1484)). Better — rank is computable in **input-sparsity time**: number of non-zeros times a log factor, a result with Lap Chi Lau among the authors, around 2010 ([`24:44`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1484), [`25:05`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1505)). Either way it is clearly in **P** ([`25:29`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1529)).

## The dual

- Primal: `min cᵀx` s.t. `Ax = b`, `x ≥ 0`. **Dual:** `max yᵀb` s.t. `Aᵀy ≤ c` ([`26:57`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1617), [`27:38`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1658)).
- The primal right-hand side becomes the dual objective ([`27:38`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1658)).
- With **equality** primal constraints, the corresponding dual variable is **unrestricted in sign** ([`27:38`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1658)).

## Two routes to strong duality

- Non-algorithmic, via convex geometry — the usual choice in other graduate algorithms courses ([`25:45`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1545), [`32:34`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1954)).
- Algorithmic, as a **corollary of simplex working** — the route taken here, and considered a nice fact to know ([`25:45`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1545), [`32:54`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1974)).

## The shadow price vector

- Define `y = A_B⁻ᵀ c_B` — the **shadow price vector**. It changes as `B` changes during simplex ([`25:45`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1545), [`26:39`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1599)).

**Claim:** at every iterate, `cᵀ v_B = bᵀ y`, where `v_B` is the current vertex ([`28:15`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1695)).

**Proof** ([`29:22`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1762), [`30:11`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1811)):
- `A_B v_B = b` ⟹ `v_B = A_B⁻¹ b`.
- `cᵀ v_B = c_Bᵀ A_B⁻¹ b = bᵀ A_B⁻ᵀ c_B = bᵀ y`.

**Why this is not yet strong duality:** `v_B` is primal-feasible by construction, but `y` need not be **dual**-feasible — and in fact it is not feasible until the very end ([`28:48`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1728)).

## Closing the argument with the dual slack

- Define the **dual slack** `r = c − Aᵀy`; dual feasibility means `r ≥ 0` ([`30:11`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1811), [`31:09`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1869)).
- The definition of `y` forces `r_B = 0`, and — conveniently — `r_N = c̃_N`, the reduced cost ([`31:09`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1869)).
- Simplex **halts exactly when `c̃_N ≥ 0`**, which is precisely dual feasibility. Equal objective values plus feasibility on both sides gives strong duality ([`31:55`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1915)).

**Caveat stated openly:** the proof is incomplete only because Bland's rule (termination) was not proved ([`31:55`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1915), [`32:54`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1974)).
