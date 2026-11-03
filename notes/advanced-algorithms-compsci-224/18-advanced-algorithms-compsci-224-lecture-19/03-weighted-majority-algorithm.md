# 3. The weighted majority algorithm

## Notation

- `M(T)` = number of **our** mistakes by the end of day `T` [`15:43`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=943).
- `mᵢ(T)` = number of mistakes **expert i** has made by the same point [`15:43`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=943).

## The target bound (stated before the algorithm)

> `M(T+1) ≤ 2(1 + ε) · minᵢ mᵢ(T+1) + 2·ln n / ε`, for any `ε ∈ (0, ½)`
> [`16:25`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=985) [`16:53`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=1013)

Comparison with the warm-up algorithms [`17:37`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=1057):

| Algorithm | Guarantee |
| --- | --- |
| Majority + revive | ≈ `log n · e` |
| Weighted majority | ≈ `2e` + additive `2 ln n / ε` |

The multiplicative factor drops from `log n` to a **constant (≈ 2)**; the price is an additive term that depends on `ε` and `ln n`. The additive `log n` was already there before, so little is lost [`17:37`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=1057).

## The key idea: soften the punishment

- Killing an expert for a single mistake is too extreme [`18:03`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=1083) [`18:24`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=1104).
- Instead: **trust experts in proportion to past performance** — keep counting a frequently-wrong expert's vote, just count it less [`18:24`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=1104) [`18:59`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=1139) [`19:17`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=1157).

## The algorithm

1. Initialize the weight vector `w = (1, 1, …, 1) ∈ ℝⁿ` [`19:17`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=1157).
2. Each day, take a **weighted majority vote**, where expert `i` carries weight `wᵢ` [`19:52`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=1192).
3. At the end of the day, for every expert `i` who was wrong: `wᵢ ← (1 − ε)·wᵢ` [`19:52`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=1192) [`20:44`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=1244).

## Why only punishing (and not also rewarding) is WLOG

- Decreasing wrong experts by `(1 − ε)` *and* boosting correct ones by `(1 + ε)` is equivalent to boosting the correct ones by the ratio `(1 + ε)/(1 − ε)` and leaving the wrong ones alone — the vote only depends on relative weights [`21:26`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=1286).
- So without loss of generality you either **reward the correct** or **punish the incorrect**, never both [`21:44`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=1304).
