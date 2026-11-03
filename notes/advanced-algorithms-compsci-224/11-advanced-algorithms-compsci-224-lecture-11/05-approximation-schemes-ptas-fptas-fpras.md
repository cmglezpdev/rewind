# 5. Approximation Schemes: PTAS, FPTAS, FPRAS

Definitions are stated for **minimization** problems; the maximization analogues are symmetric ([`46:21`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2781), [`1:16:30`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=4590)).

| Scheme | Guarantee | Running time | Notes |
| --- | --- | --- | --- |
| **PTAS** (polynomial time approximation scheme) | `1 + epsilon` for every **fixed** `epsilon in (0,1)` | `n^{f(1/epsilon)}` | `f` may be arbitrarily terrible — e.g. a tower of exponentials in `1/epsilon` — and it is still a polynomial for constant epsilon ([`49:01`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2941), [`49:45`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=2985), [`50:22`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3022)) |
| **FPTAS** (F = *fully*) | `1 + epsilon` | `poly(n / epsilon)` | No crazy dependence on epsilon allowed — in particular **no epsilon in the exponent of `n`** ([`50:36`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3036)) |
| **FPRAS** (fully polytime **randomized** approximation scheme) | `1 + epsilon`, failing with probability at most ~`1/3` | `poly(n / epsilon)` | Randomized; "failure" means missing the `1 + epsilon` bound, not producing garbage ([`51:35`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3095), [`52:16`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3136)) |

Maximization versions: aim for **at least** `1 - epsilon` times OPT instead of at most `1 + epsilon` times OPT ([`1:16:30`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=4590)).

## Digression: why the failure probability `1/3`?

Student question, answered at length ([`52:16`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3136)):

- The exact constant does not matter for the definition — you can drive failure down to any `delta` by running many independent trials and taking the **median** ([`53:02`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3182), [`53:24`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3204)).
- Median amplification matters when the algorithm outputs a *number* you cannot verify: with per-run failure `<= 1/3`, the median of many runs is good with high probability ([`54:06`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3246), [`54:22`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3262)).
- **This breaks at `1/2`** ([`54:22`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3262)). So `1/3` is the largest `1/integer` that still works — the standard convention for bounded-error polynomial time ([`53:24`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3204), [`54:40`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3280)).

## Examples announced

- **FPRAS** for counting the number of satisfying assignments of a **DNF formula**, due to Karp, Luby and Madras (year not recalled in lecture) ([`54:40`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3280), [`55:15`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3315)).
- **PTAS and FPTAS for knapsack**; the most efficient FPTAS found by the lecturer's search is due to **Eugene Lawler, 1979**, though the most efficient variants are not covered ([`55:15`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3315), [`55:51`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3351)).
- Only the knapsack **PTAS** is actually completed in this lecture; the FPTAS is deferred to next time ([`1:24:20`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=5060)).
