# 5. Complementary slackness

## The complementarity gap

- Define the **complementarity gap** as `xᵀ r`, where `r = c − Aᵀy` is the dual slack ([`33:19`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1999)).
- Expand: `xᵀ(c − Aᵀy) = cᵀx − (Ax)ᵀy`, and if `x` is primal-feasible then `Ax = b`, so the gap is exactly `cᵀx − bᵀy` ([`34:28`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2068)).
- **At optimality this gap is zero** ([`34:28`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2068)).

## The theorem

> If `x*` and `y*` are optimal for the primal and dual respectively, then for every `i`, either `x_i = 0` or the dual slack `(c − Aᵀy)_i = 0` ([`36:00`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2160), [`36:39`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2199)).

## Proof

1. By strong duality there is no primal–dual gap at optimality: `cᵀx − bᵀy = 0` ([`36:39`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2199)).
2. But `cᵀx − bᵀy = Σ_i x_i r_i` ([`37:08`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2228)).
3. Every term `x_i r_i` is non-negative, so a sum of zero forces each term to vanish: `x_i = 0` or `r_i = 0` ([`37:08`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2228)).

## Connection back to the course

- Earlier in the course, in the **online algorithms** unit, an "approximate complementary slackness" statement was used: if you are not quite at optimum but nearly satisfy complementary slackness, you can bound the quality of your primal solution ([`35:17`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2117), [`35:39`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2139)).
