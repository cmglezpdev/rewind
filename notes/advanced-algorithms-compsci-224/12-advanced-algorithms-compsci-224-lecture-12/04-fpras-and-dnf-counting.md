# 4. FPRAS and the DNF counting problem

## What an FPRAS is

- Like an FPTAS, but the algorithm is **randomized** and may fail to produce a good solution with probability at most `1/3` [`19:50`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1190).

## DNF formulas

- **DNF** = disjunctive normal form: `C₁ ∨ C₂ ∨ … ∨ C_m`, where each clause `Cᵢ = x_{j₁} ∧ x_{j₂} ∧ … ∧ x_{jr}` (literals may be negated) [`20:33`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1233), [`21:16`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1276).
- **CNF** flips the ANDs and ORs: an AND of clauses, each an OR of literals [`21:54`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1314), [`22:10`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1330).

## DNF satisfiability is easy

- A DNF is satisfiable iff **at least one clause** is satisfiable, so loop clause by clause; a clause is satisfiable unless it contains both `x` and `¬x` [`22:56`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1376), [`23:15`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1395).
- So DNF-SAT ∈ P, whereas CNF-SAT is NP-complete by Cook–Levin [`22:10`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1330), [`23:15`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1395).

## DNF **counting** is hard

**Problem**: given a DNF, count the satisfying assignments [`23:15`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1395).

**Reduction from SAT** [`24:05`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1445), [`25:38`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1538):

1. Take a CNF instance `φ` on `n` variables.
2. Negate it. By De Morgan, `¬(C₁ ∧ C₂) = ¬C₁ ∨ ¬C₂`, so `¬φ` is a **DNF** [`25:38`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1538), [`26:04`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1564).
3. If `¬φ` has `T` solutions, then `φ` has `2ⁿ − T` solutions [`26:04`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1564), [`26:31`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1591).
4. Exact counting therefore decides SAT (is the count zero or not?) [`25:13`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1513), [`26:31`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1591).

**Complexity classification**: exact DNF counting is not just NP-hard but **#P-complete** [`26:49`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1609), [`27:20`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1640).

- The complete problem for **#P** is counting SAT's solutions; DNF counting is also complete for the class [`27:20`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1640).
- Intuition: NP asks whether a polynomially verifiable **witness** exists; #P asks how many witnesses there are — a strictly harder question, and the class contains NP [`27:55`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1675), [`28:21`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1701).

## Why approximation is still on the table

- The hardness proof relied on **exactness** — distinguishing zero from nonzero [`29:02`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1742).
- With multiplicative `(1 ± ε)` error you can no longer separate zero from nonzero, so the reduction breaks [`29:28`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1768).
- **The answer is yes**: an FPRAS exists, due to **Karp, Luby and Madras (1989)** [`29:28`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1768), [`30:14`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1814).
