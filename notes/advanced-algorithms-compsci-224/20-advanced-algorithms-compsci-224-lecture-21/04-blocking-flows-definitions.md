# 4. Blocking flows: levels, admissibility, definition

## Definitions (all relative to the **current** residual graph `G_f`)

- **Level** `ℓ(v)` = shortest-path (unweighted) distance from `s` to `v` in `G_f` [`31:11`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=1871), [`34:02`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2042).
- An edge `(u, v)` is **admissible** iff `ℓ(v) = ℓ(u) + 1`, i.e. it lies on a shortest path from `s` [`34:02`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2042).
- A **path is admissible** iff all its edges are admissible [`34:45`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2085).
- The **level graph `L`** = the subgraph of admissible edges (only those with positive residual capacity) [`43:19`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2599), [`52:47`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=3167).
- A **blocking flow** is an admissible flow `f` — it decomposes into admissible augmenting `s`–`t` paths — such that **every** admissible `s`–`t` path has at least one edge saturated by `f` [`35:48`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2148).
- Admissibility is **not stable**: it is defined against the residual graph of the moment, and the residual graph changes every augmentation step [`45:45`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2745).
- Attribution: blocking flows are credited to **Dinitz**, sometime in the 1970s (the lecturer states it from memory) [`34:45`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2085), [`35:48`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2148).

## Structure of the level graph

- Edges of `L` only connect **adjacent layers** [`52:47`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=3167).
- **Forward layer-skipping edges cannot exist** — such an edge would contradict the shortest-path distances [`54:07`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=3247).
- What *can* exist in `G_f` but not in `L`: backward edges (possibly skipping layers) and edges within a level [`54:34`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=3274), [`55:54`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=3354).
- Consequence used later: **`L` is a DAG**, so a DFS on it cannot hit cycles [`1:11:42`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4302), [`1:12:23`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4343).

## Blocking flow ≠ max flow

- A max flow **is** a blocking flow, but the converse fails — the lecture works two counterexamples with the class [`37:58`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2278), [`38:30`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2310).
- **Counterexample 1** (student-proposed, non-unit capacities): capacities `c(s,u) = 2`, `c(u,v) = 1`, `c(v,t) = 2`, everything else 1 — the flow through `u → v` is blocking but not maximum [`39:57`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2397), [`40:24`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2424).
- **Counterexample 2** (all unit capacities): one flow path can block two otherwise-disjoint augmenting paths; the max flow would send one unit along each, but the blocking flow saturates the shared edge [`40:24`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2424), [`41:16`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2476), [`41:33`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2493).
- Non-admissible edges are simply excluded: in the toy residual graph drawn on the board, one edge is not admissible and so plays no part [`37:27`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2247), [`37:58`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2278), [`39:26`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2366).

## Worked residual-graph example

- After augmenting along a blocking flow, saturated edges reverse; in the board example the new residual graph has exactly **one** `s`–`t` path, of length **5**, so the new level graph is just that path `s → a → b → c → d → t` [`47:00`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2820), [`48:04`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2884), [`48:40`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2920), [`49:09`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2949).
