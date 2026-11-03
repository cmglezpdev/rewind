# 2. Dual Fitting Analysis of Greedy Set Cover

## The LP relaxation and its dual

**Primal** ([`4:23`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=263)):

- minimize `sum_S c_S * x_S`
- subject to `sum_{S : i in S} x_S >= 1` for all `i = 1..n`
- and `x_S >= 0` for all `S`

**Dual** ([`6:31`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=391)):

- maximize `sum_{e=1..n} y_e`
- subject to `sum_{e in S} y_e <= c_S` for all sets `S`
- and `y >= 0`

## "An" LP relaxation, not "the" LP relaxation

- Prompted by a student question, the lecturer corrects himself: a problem has **many** LP relaxations, because it has many integer-program formulations ([`4:49`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=289)).
- Set cover *is* the primal above with `x_S in {0,1}`; relaxing that constraint to a linear inequality is only one choice, and a different formulation could give better results ([`4:49`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=289)).
- There is a **systematic** way to produce successively tighter LP relaxations of an integer program: the **Sherali-Adams hierarchy** (pointer only, not covered in the course) ([`5:26`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=326), [`5:45`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=345)).
- Eventually the hierarchy reproduces the integer program exactly — but by then the LP has blown up to exponential size ([`6:08`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=368)).

## The dual fitting scheme

Maintain a dual solution while building the primal ([`7:00`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=420)). When greedy takes a set `S` ([`7:37`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=457)):

1. Set `x_S = 1`.
2. For each element `e` newly covered by `S`, set `y_e = c_S / (number of elements newly covered by S)` — i.e. `y` is a **price vector**, each newly covered element paying its share ([`12:40`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=760)).

### Why this works

- **Weak duality**: for any feasible primal/dual pair, `dual cost <= OPT <= primal cost` ([`8:32`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=512), [`8:52`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=532)).
- The catch: this `y` **need not be dual-feasible**. The fix is to scale it down entry-wise — dividing by roughly `log n` makes it feasible ([`8:52`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=532)).

**Observations** ([`9:09`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=549)):

- The primal cost of `x` **equals** the dual cost of `y` — the scheme is rigged that way.
- `y / H_n` is feasible for the dual (`H_n` = the n-th harmonic number).
- The primal `x` is feasible because the while-loop runs as long as a constraint is violated ([`9:48`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=588)).
- Together these imply the `log n` approximation ([`9:48`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=588)).

## Proof of the claim: `y / H_n` is dual feasible

Only the constraint `sum_{e in S} y_e <= c_S * H_n` can be violated; non-negativity is automatic ([`10:25`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=625), [`10:55`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=655)).

1. Fix a set `S` of size `K`; order its elements `e_1, ..., e_K` by **when they were first covered** ([`10:55`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=655), [`11:41`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=701)).
2. Right before `e_i` was covered, `S` had not yet been chosen, so greedy *could* have chosen `S` at price `c_S / (K - i + 1)` — since at least `K - i + 1` of its elements were still uncovered ([`12:55`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=775), [`13:34`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=814)).
3. Greedy always picks the lowest available price, so `price(e_i) <= c_S / (K - i + 1)` ([`14:06`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=846)).
4. Summing: `sum_{e in S} y_e <= c_S * sum_{i=1..K} 1/i = c_S * H_K` ([`14:28`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=868)).

Note that `e_i` may be covered by some *other* set, not by `S` — the argument only needs an upper bound on the price actually charged ([`12:22`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=742), [`12:40`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=760)).

## The stronger corollary

- `K = |S| <= n`, so the bound gives `H_n` ([`14:56`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=896)).
- **Stronger result proved along the way**: if every set in the set system has size at most `K`, greedy is an `H_K` (i.e. `log K`) approximation ([`14:56`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=896)).
