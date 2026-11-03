# 3. Feasibility and the competitive ratio

## Primal feasibility — immediate

- `z_i = 1 − x` makes each constraint **tight**, and nothing is ever made negative ([`13:24`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=804), [`13:47`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=827)).

## Dual feasibility — the real work

- `0 ≤ y_i ≤ 1` holds trivially; the binding constraint is **`Σ_i y_i ≤ b`** ([`13:47`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=827), [`14:14`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=854)).
- `y_i` is set to 1 only while `x < 1`, i.e. only inside the `else` branch. So it suffices to show **`x < 1` can happen at most `b` times** ([`14:14`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=854), [`14:43`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=883)).

## The geometric-increment argument

- Let `x_i` be the increment added to `x` on day `i`, so `x = Σ_i x_i` ([`15:13`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=913)).
- From the update rule: **`x_1 = 1/(cb)`**, and the increments are **geometric with ratio `q = 1 + 1/b`** ([`15:42`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=942)).
- Summing the first `b` increments: `Σ_{j=0}^{b−1} q^j / (cb) = (1/(cb)) · ((1 + 1/b)^b − 1)/(1/b)` — the `b`'s cancel, leaving **`((1 + 1/b)^b − 1)/c`** ([`16:17`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=977), [`16:52`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=1012)).

## Choosing `c`

- We want `x = 1` after `b` days, so **set `c = (1 + 1/b)^b − 1`** ([`17:38`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=1058), [`18:03`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=1083)).
- That makes the competitive ratio `1 + 1/c` exactly the bound promised at the start of the lecture ([`18:03`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=1083)).

## Chaining weak duality

- Weak duality: for any feasible pair, `cost(D) ≤ opt(P) ≤ cost(P)` ([`18:20`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=1100), [`18:45`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=1125)).
- Combined with `cost(P) ≤ (1 + 1/c)·cost(D)`, we get **`cost(P) ≤ (1 + 1/c)·opt(P)`**, i.e. `(1 + 1/c)`-competitive ([`18:45`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=1125), [`19:12`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=1152)).

## The catch

- The solution is **fractional, not integral** — "buying a fraction of the skis and renting a fraction" is not a valid ski-rental solution ([`19:12`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=1152)).
- And **no randomness has been used yet**, despite the promise of a randomized algorithm ([`19:51`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=1191)).
