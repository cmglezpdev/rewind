# 5. Max flow: definitions and LP formulation

New topic for the second half of the lecture. CS 124 is a prerequisite, so some standard facts are asserted rather than proved ([`44:28`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2668)).

## Input and goal

- A **directed** graph `G = (V, E)` with non-negative capacities `c_e`, plus a source `s` and sink `t` ([`44:51`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2691)).
- Goal: output a feasible `s`–`t` flow vector obeying the capacity constraints, of **maximum value** ([`44:51`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2691), [`45:59`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2759), [`52:27`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3147)).

## Notation conventions

- `n = |V|`, `m = |E|` ([`46:42`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2802)).
- The graph is assumed connected — otherwise run a DFS first and keep only the component containing `s` and `t` ([`46:42`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2802)).
- Consequently `m ≥ n − 1`, so bounds are written treating `m ≥ n` ([`47:18`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2838)).

## Definition of a flow

A vector `f` indexed by edges satisfying ([`47:18`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2838)):

1. **Non-negativity**: `f ≥ 0` ([`47:18`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2838)).
2. **Conservation**: for every `v ∉ {s, t}`, flow in equals flow out ([`47:56`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2876), [`48:37`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2917)).
3. **Endpoint balance**: total flow out of `s` equals total flow into `t` — the water shipped from `s` all lands in `t` ([`48:37`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2917), [`49:22`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2962)).

Additional definitions:

- `f` is **feasible** if `f_e ≤ c_e` for every edge ([`49:49`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2989)).
- `val(f)` = the amount of water shipped, i.e. flow out of `s` ([`49:49`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2989)).

## Board example

- A small graph on `s`, `t`, and two other vertices, all edges of unit capacity ([`50:54`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3054), [`51:34`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3094)).
- The zero flow is feasible, with value 0 ([`51:34`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3094)).
- A single routed path gives value **1** (the "yellow" flow); splitting across two disjoint routes gives value **2** (the "purple" flow) — the purple one is better for maximization ([`51:34`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3094), [`52:04`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3124), [`52:27`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3147)).

## Max flow is a linear program

Asked "given everything we've studied, how would you find a max flow?", the answer is linear programming — every piece of the definition is linear ([`53:21`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3201)):

- **Objective**: maximize `Σ_{e = (s,u)} f_e` ([`53:21`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3201)).
- **Constraints**: `f ≥ 0`; `f_e ≤ c_e` for all `e`; plus the conservation and endpoint-balance constraints ([`54:06`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3246), [`54:25`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3265)).
