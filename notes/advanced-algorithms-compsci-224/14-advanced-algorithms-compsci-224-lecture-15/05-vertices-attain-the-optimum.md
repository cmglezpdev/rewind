# 05 — Vertices attain the optimum

## Definitions

- `x` is **feasible** if `x ∈ P`; an LP is **feasible** if some feasible `x` exists, **infeasible** otherwise [`26:06`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1566), [`26:37`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1597).
- An LP is **bounded** if `min { cᵀx : x ∈ P } ≠ −∞`, i.e. the objective cannot be made arbitrarily small [`26:37`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1597).

## The claim

> If the LP is **bounded**, then for every feasible `x` there is a **vertex** `x′` with `cᵀx′ ≤ cᵀx` [`27:38`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1658), [`28:14`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1694).

The proof is a **procedure that gradually pushes `x` toward a vertex** without ever making the objective worse [`31:54`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1914).

## Proof setup

- If `x` is already a vertex, take `x′ = x` [`28:14`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1694), [`28:48`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1728).
- Otherwise there is `y ≠ 0` with `x ± y ∈ P`. Both give `A(x ± y) = b`; subtracting yields **`Ay = 0`**, i.e. `y ∈ ker(A)` [`28:48`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1728), [`29:11`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1751), [`29:30`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1770), [`29:54`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1794).
- **WLOG `cᵀy ≤ 0`** — if not, replace `y` by `−y` [`29:54`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1794), [`30:50`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1850).
- **If `cᵀy = 0`, WLOG some coordinate `y_j < 0`** — since `y ≠ 0`, one of `y` or `−y` has a negative entry, and both keep `cᵀy = 0` [`30:50`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1850), [`31:28`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1888).
- Key support fact: **`xᵢ = 0 ⟹ yᵢ = 0`**, otherwise one of `x ± y` has a negative coordinate [`33:46`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2026), [`34:25`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2065).

## Case 1 — some `y_j < 0` (progress toward a vertex)

- Walk along `x + t·y` for `t > 0`; every coordinate `j` with `y_j < 0` **decreases toward zero** [`32:49`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1969), [`34:45`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2085), [`35:34`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2134).
- Take `t` as large as possible while staying in `P` — the **explicit formula**:

  **`t* = min over { j : y_j < 0 } of (−x_j / y_j)`** [`41:28`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2488)

  (per-coordinate, feasibility needs `t·y_j + x_j ≥ 0`, and dividing by the negative `y_j` flips the inequality to an **upper** bound on `t`; take the smallest such bound [`40:05`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2405), [`40:40`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2440), [`41:10`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2470)).
- **`t* > 0` strictly**: `y_j < 0` forces `y_j ≠ 0`, which by the support fact forces `x_j ≠ 0`, and feasibility makes `x_j > 0` — so there is room to move [`39:28`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2368), [`40:05`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2405).
- Each application of Case 1 **creates at least one new zero coordinate**, so it can happen **at most `n` times** [`37:14`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2234), [`41:49`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2509).
- Worked illustration of why the sign matters: with `x = (1,5,0,3,2)` and `y = (0,1,−2,0,1)`, no positive step is possible in the direction chosen naively, because a coordinate immediately goes negative [`38:29`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2309), [`38:59`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2339).

## Case 2 — all `y_j ≥ 0` (impossible when bounded)

- Then `A(x + t·y) = Ax + t·Ay = b` and `x + t·y ≥ 0` for **all** `t > 0`, so the ray stays feasible forever [`42:15`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2535), [`42:45`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2565), [`43:09`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2589).
- In Case 2 the inequality `cᵀy ≤ 0` must be **strict**: if `cᵀy = 0` there would be a `j` with `y_j < 0`, putting us in Case 1 — Case 1 covers a superset of the `cᵀy = 0` situations [`43:51`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2631), [`44:45`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2685), [`45:31`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2731), [`46:02`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2762), [`46:19`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2779).
- So `cᵀ(x + t·y) = cᵀx + t·cᵀy → −∞` as `t → ∞`: **the LP is unbounded**, contradicting the hypothesis. **Case 2 cannot occur for a bounded LP** [`44:11`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2651), [`44:30`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2670).
- When neither case applies, no such `y` exists — **you are at a vertex, and done** [`44:30`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2670).

## Corollaries

1. **If the LP is finite (bounded and feasible), some vertex of `P` achieves OPT** [`46:59`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2819).
2. **If `P ≠ ∅` then `P` has at least one vertex** [`48:15`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2895).
   - Proof: apply corollary 1 to the **made-up objective `min 0ᵀx`** — any objective works, so pick a trivial one, and the vertex achieving its optimum is a vertex of `P` [`49:22`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2962), [`49:55`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2995).
   - **Standard form is essential here**: with general constraints (e.g. "below this line and below that line") the feasible region can be a vertex-free strip/wedge [`48:59`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2939), [`49:22`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2962).
