# 4. Iteration count and the history of IPM bounds

## Step size for λ

- The lecture announces (to be proved later) that one may take **`λk+1 = (1 + 1/√m)·λk`** ([`31:41`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1901)).
- The binding constraint on the step size: the current approximate solution for `f_{λk}` must remain a decent solution for `f_{λk+1}`; a small multiplicative bump preserves that ([`32:15`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1935), [`32:31`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1951)).

## Counting the iterations

- Heuristic used: `(1 + 1/x)^x ≈ e`, so **√m steps multiply λ by a constant factor** ([`33:31`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2011), [`34:04`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2044)).
- Going from an exponentially small `λ₀` up to `≈ m·exp(CL)` therefore costs **`√m · (L + log m)` iterations** ([`33:10`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1990), [`34:20`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2060)).
- Since some papers fold `log n` and `log m` into `L`, this is usually just written as **`√m · L` iterations** ([`35:10`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2110), [`35:28`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2128)).

## Historical progression of iteration bounds

| Result | Bound | Reference |
| --- | --- | --- |
| Original IPM for LP | `O(mL)` iterations | Karmarkar, Combinatorica 1984 ([`35:28`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2128)) |
| Improvement | `O(√m · L)` | Renegar, 1988 ([`35:28`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2128)) |
| State of the art at lecture time | `Õ(√rank(A) · L)` | Lee and Sidford, FOCS — presented roughly a week before this lecture ([`36:57`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2217), [`37:27`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2247)) |

- The lecture teaches the **Renegar-level `√m·L` bound**, but borrows the notation and exposition from the Lee–Sidford paper, credited to Aaron Sidford explaining it to the lecturer directly ([`37:27`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2247), [`37:45`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2265)).

## What happens inside a single iteration

- The algorithm **never computes exact minimizers** of `f_λ` — only approximate ones, with a definition of "approximate minimizer" given later in the course ([`38:35`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2315), [`38:52`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2332)).
- Per iteration the work is **a constant number of solves of linear systems on `n × n` matrices** ([`39:08`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2348)).
- The per-iteration cost differs from IPM to IPM ([`39:40`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2380)).
