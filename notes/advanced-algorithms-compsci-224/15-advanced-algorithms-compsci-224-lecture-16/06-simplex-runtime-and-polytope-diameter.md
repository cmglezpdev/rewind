# 6. Simplex running time and the polytope-diameter question

## Running time bound

- Each iteration (vertex → vertex) takes **polynomial time**; the number of iterations is at most the number of vertices ([`38:07`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2287), [`38:38`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2318)).
- Crudest bound on vertices: **`C(n, m)`** ("n choose m"), since vertices are represented by bases of size `m` — exponential ([`38:38`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2318)).
- Sharper bound: the number of vertices is at most **`C((n − m)/2, m/2)`** ([`39:02`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2342)).
  - Why any improvement is possible: given a basis, the vertex is `A_B⁻¹ b`, which may fail to be non-negative and therefore may be **infeasible** — not every basis yields a vertex ([`39:37`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2377), [`39:58`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2398)).
  - Attribution: this follows from the **upper bound theorem** of **McMullen**, per Michel Goemans; it was a major open problem for a long time before McMullen solved it, so it is not an easy fact ([`40:13`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2413), [`40:39`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2439)).
- Either way the count is still a very big number ([`40:39`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2439)).

## The polytope graph and its diameter

- Model the polytope as a **graph**: nodes = polytope vertices, edges = neighboring vertices ([`41:31`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2491)). Two vertices are adjacent iff their **bases differ by a single constraint** ([`51:36`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3096)).
- **Necessary condition** for a poly-time simplex: every polytope in `d` dimensions defined by `m` hyperplanes has graph diameter `poly(m, d)` ([`42:38`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2558)).
- It is **not sufficient** — simplex does not necessarily follow the shortest path ([`42:02`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2522), [`46:12`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2772)).
- What "an implementation of simplex" means here comes down entirely to the **pivoting rule**: which negative-reduced-cost `j` to increment, and which zero coordinate in `B` to kick out ([`42:02`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2522), [`42:21`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2541)).

## The Hirsch conjecture and its fall

| Item | Detail |
| --- | --- |
| Conjecture (Hirsch, **1957**) | Diameter is at most `m − d` ([`43:47`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2627)) |
| Disproof | **Santos**, *Annals of Mathematics*, **2011** ([`44:31`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2671)) |
| Counterexample | Explicit polytope with `d = 43`, `m = 86`, diameter ≥ **44** — off by one ([`44:31`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2671)) |
| Stronger follow-up | For fixed `d` and any `ε > 0`, an infinite family of polytopes with `m → ∞` and diameter ≥ `(1 + ε)m` ([`45:12`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2712)) |

- These lower bounds are only **nearly linear in `m`**, still far from ruling out a `poly(m, d)` upper bound — a bound like `m¹⁰ d⁵` would be perfectly acceptable for poly-time simplex ([`46:12`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2772)).
- Bottom line: for all we know a fast simplex implementation exists — **we just don't know one** ([`46:34`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2794)).
