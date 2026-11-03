# 4. Integrality Gaps: The Limit of an LP Relaxation

## The idea

- All the analyses so far prove: `algorithm cost <= alpha * OPT(LP relaxation)` ([`27:14`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=1634)).
- Natural question: can `alpha` be pushed from `log n` down to `sqrt(log n)` or a constant? ([`27:14`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=1634))
- Not if there is an **inherent gap** between `OPT(LP)` and `OPT(IP)` on some instance: the algorithm returns an *integral* solution, so on the gap instance it is off by at least that factor ([`27:51`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=1671), [`33:58`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2038)).

**Definition**: the **integrality gap** is the worst-case (max over instances) ratio `OPT(IP) / OPT(LP)`, usually stated as a function of the problem size `n` or another parameter ([`34:20`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2060), [`34:44`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2084), [`39:24`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2364)).

**Scope of the barrier**: it rules out beating the gap *via this particular LP relaxation*, not via any algorithm. A smarter integer formulation, relaxed differently, may still do better ([`29:01`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=1741), [`29:27`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=1767)) — which ties directly back to the earlier "an LP relaxation, not *the*" correction.

## Example 1 — Vertex cover: gap approaching 2

Instance: the **complete graph `K_n`** ([`30:27`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=1827)).

| Solution | Cost | Reasoning |
| --- | --- | --- |
| `OPT(LP)` | `n/2` | Put `x_v = 1/2` on every vertex; feasible and in fact optimal ([`31:34`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=1894)) |
| `OPT(IP)` | `n - 1` | Take all vertices but one. Any cover with `<= n/2` vertices leaves two vertices out, whose connecting edge is then uncovered ([`31:34`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=1894), [`32:05`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=1925)) |

- Ratio `(2n - 2)/n` **approaches 2 as `n` grows** ([`32:47`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=1967), [`35:06`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2106)).
- Conclusion: relaxing `x_u in {0,1}` to `x_u >= 0` **already loses a factor of 2** — the 2-approximations of the previous topic are the best this LP can certify ([`30:08`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=1808), [`30:27`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=1827)).

## Example 2 — Set cover: gap of `log n`

The instance is built from linear algebra over `F_2` ([`36:00`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2160)):

- Fix an integer `Q > 0` and set `n = 2^Q - 1`.
- **Universe** = the nonzero vectors of `F_2^Q`, i.e. length-`Q` bit strings (addition = bitwise XOR) ([`36:00`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2160), [`36:49`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2209)).
- **Sets** are indexed by `alpha in F_2^Q`, where `S_alpha = { e : alpha . e = 1 mod 2 }` (dot product mod 2) ([`37:25`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2245), [`37:57`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2277)).

**Goal**: fractional cost is a **constant**, integral cost is at least `Q ≈ log n` ([`39:53`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2393)).

### Fractional side: `OPT(LP) <= 2`

- Every element lies in **exactly half** the sets: for a random `alpha`, `Pr[alpha . e = 1] = 1/2`, which holds precisely because zero was removed from the universe ([`40:14`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2414), [`40:47`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2447)).
- So `x_S = 2/m` for every set is feasible (each element's constraint sums to `1`), with total cost `2` ([`41:21`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2481), [`42:07`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2527), [`42:30`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2550)).

### Integral side: `OPT(IP) >= Q`

By contradiction ([`42:30`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2550)):

1. Suppose `Q - 1` sets `S_{alpha_1}, ..., S_{alpha_{Q-1}}` cover the universe — i.e. the intersection of their complements is empty (only the excluded zero vector survives) ([`43:29`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2609), [`43:54`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2634)).
2. That intersection is `{ e : alpha_i . e = 0 for all i = 1..Q-1 }` — a `Q`-dimensional space cut by `Q - 1` linear constraints ([`44:25`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2665)).
3. Such a subspace has dimension **at least 1**, hence is non-empty — contradiction ([`44:55`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2695), [`45:32`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2732)).
4. Therefore at least `Q` sets are needed, and the gap is `Q / 2 = Theta(log n)` ([`45:32`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2732)).

## Beyond LP barriers: NP-hardness of approximation

A stronger kind of statement forgets LP relaxations entirely: *unless P = NP, no polynomial-time algorithm beats a given ratio* ([`47:13`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2833), [`47:37`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2857)).

- **Feige, 1998**: set cover cannot be approximated better than `ln n` unless SAT is solvable in time `n^(log log n)` ([`47:37`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2857), [`47:55`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2875)).
- Why that is strong evidence: the best known SAT algorithms run in **exponential** time, and `n^(log log n)` is far cheaper than that ([`47:55`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2875)).
- The proof rests on the **PCP theorem** (probabilistically checkable proofs), machinery not covered in this course — mentioned so students know it exists ([`48:23`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2903), [`48:42`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2922)).

## Notation caveat from the Q&A

A student points out the inequality was written backwards; the lecturer agrees. With `OPT(LP) >= beta * OPT(IP)`, the example where LP = 1 and IP = 2 has `beta = 1/2`, and the **integrality gap is `1/beta`** ([`38:28`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2308), [`38:59`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2339), [`39:24`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2364)).
