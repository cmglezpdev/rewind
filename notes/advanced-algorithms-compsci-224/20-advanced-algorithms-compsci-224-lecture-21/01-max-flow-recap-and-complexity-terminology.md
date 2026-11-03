# 1. Max-flow recap and complexity terminology

## Where the lecture picks up

- Goal of the day: **faster max-flow algorithms** — scaling, blocking flows, and how link-cut trees speed blocking flows up [`0:27`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=27).
- Setup carried over from last lecture: a capacitated directed graph `G = (V, E)`, every edge `e` with capacity `c_e` [`1:17`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=77).
- Capacities are **integers in `[1, U]`**; the task is to find an `s`–`t` flow of maximum value [`1:59`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=119).
- Integrality is assumed throughout — fractional capacities can be handled by clearing denominators; with fractions `log U` stops making sense as a bound unless you normalize somehow [`33:14`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=1994), [`33:42`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2022), [`34:02`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2042).
- Model: **word RAM** with words of at least `log n` bits, so arithmetic/comparison on capacities costs `O(1)` [`14:47`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=887).

## Flow constraints (restated)

- A flow is a vector on the edges [`1:59`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=119).
- **Capacity constraints**: never push more flow than an edge's capacity [`2:43`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=163).
- **Conservation**: flow out of `s` equals flow into `t`; every other vertex has flow in = flow out [`2:43`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=163).
- **Value** of a flow = amount leaving `s` [`2:43`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=163).
- **Residual graph** `G_f`: residual capacity = original capacity minus the flow already on the edge, i.e. how much more can still be sent [`3:08`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=188). Flow pushed the opposite way counts as negative flow, so a reverse edge gets residual capacity (e.g. `0 − (−1) = 1`) [`47:31`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2851), [`48:04`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=2884).

## Ford–Fulkerson

- Algorithm: repeatedly find an augmenting path in the current residual graph, augment, rebuild the residual graph, stop when no augmenting path exists — this is correct [`3:08`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=188), [`4:02`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=242).
- Each augmenting path pushes at least **one** unit of flow; finding one path is linear in `m` via **DFS or BFS** [`4:50`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=290), [`5:29`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=329).
- Running time: **`O(m · f*)`**, `f*` = value of the max flow [`5:29`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=329).
- Why that is bad: `f*` can be as large as `n · U`, and writing a capacity takes only `log U` bits — so the runtime is exponential in the input's representation [`5:59`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=359).
- Ford–Fulkerson leaves the path-selection rule open (DFS, BFS, max-bottleneck, ...), and the choice changes the bound [`31:11`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=1871), [`32:12`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=1932).
  - Augment along the path with **largest minimum capacity** → much better than vanilla FF (a problem-set exercise) [`31:11`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=1871), [`32:12`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=1932).
  - Augment along **BFS** shortest paths → `O(m²n)`, i.e. Edmonds–Karp [`32:12`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=1932).

## Three flavors of "polynomial"

| Term | Running time depends on | Example |
| --- | --- | --- |
| **Weakly polynomial** | `poly(m, log U)` — polynomial in the representation [`6:33`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=393) | scaling algorithms [`7:58`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=478) |
| **Strongly polynomial** | `poly(m)` only; step count independent of capacity magnitudes (arithmetic on capacities still assumed `O(1)`) [`7:23`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=443) | blocking flows [`7:58`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=478) |
| **Pseudo-polynomial** | `poly(m, U)` — worst of the three [`7:23`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=443), [`7:58`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=478) | Ford–Fulkerson [`7:58`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=478); exact knapsack DP, whose state count is linear in total weight [`8:18`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=498), [`8:51`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=531) |

- The lecture will deliver **one strongly polynomial and one weakly polynomial** algorithm [`7:58`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=478).
