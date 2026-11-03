# 6. The Knapsack Problem and Its Exact Algorithms

## Problem statement

- A knapsack (literally a backpack) with capacity `W` pounds ([`56:21`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3381), [`57:39`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3459)).
- `n` items; item `i` has weight `w_i` and value `v_i` ([`56:21`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3381), [`57:39`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3459)).
- Pack to maximize total value ([`57:39`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3459)):
  - maximize `sum_{i=1..n} v_i * x_i`
  - subject to `sum_{i=1..n} w_i * x_i <= W` and `x_i in {0,1}` ([`58:11`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3491), [`58:41`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3521)).
- **Knapsack is NP-hard** ([`1:01:10`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3670)).

## Fractional knapsack is easy (and solved greedily)

- Relax to `0 <= x_i <= 1` — **not** just `x_i >= 0`, otherwise you would be incentivized to take many copies of a single valuable item. (Multiple copies is a different variant; here you may only take a subset of the `n` items.) ([`58:41`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3521), [`59:23`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3563), [`59:45`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3585))
- **Optimal fractional algorithm**: sort items in decreasing order of `v_i / w_i` ("most bang per buck") and fill greedily; the last item is taken as whatever fraction still fits ([`1:00:06`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3606), [`1:00:54`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3654)).

## Exact integral knapsack via dynamic programming

### DP 1 — `O(nW)`, indexed by remaining capacity

`f(i, b)` = max value achievable using only items `1..i` with `b` space left; the answer is `f(n, W)` ([`1:01:10`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3670), [`1:01:48`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3708), [`1:02:18`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3738)).

```
f(i, b) = 0                                              if i = 0
f(i, b) = max( f(i-1, b),                                 (skip item i)
               v_i + f(i-1, b - w_i)  if b - w_i >= 0 )   (take item i)
```
([`1:02:53`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3773), [`1:03:15`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3795))

### DP 2 — `O(nV)`, indexed by achieved value

With `V = sum_i v_i`, define `f(i, p)` = the **minimum weight** needed to achieve value exactly `p` using items `1..i`; a symmetric recurrence fills the table ([`1:04:12`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3852), [`1:04:42`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3882), [`1:05:11`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3911)). These are simply two different algorithms, not one derived from the other ([`1:05:11`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3911), [`1:05:47`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3947)).

## Why NP-hardness is not contradicted: pseudo-polynomial time

- "Polynomial time" means polynomial in the **bit representation** of the input ([`1:03:44`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3824)).
- Writing `W` down takes only `log W` bits, so genuine polynomial time means `poly(n, log W)` ([`1:03:44`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3824)).
- Hence `O(nW)` is **not** acceptable as polynomial — it is exponential in the input size ([`1:04:12`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3852)).
- The goal for the rest of the lecture: an approximation with `log W`-style dependence ([`1:05:47`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=3947)).
