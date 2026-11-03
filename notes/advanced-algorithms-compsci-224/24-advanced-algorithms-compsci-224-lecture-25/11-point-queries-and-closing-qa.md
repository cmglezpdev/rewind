# 11. Closing Q&A: point queries and other streaming problems

## The question

- `F₀` is unusual: there is **only one kind of query**. Most data-structure problems admit many query types [`1:22:54`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=4974), [`1:23:09`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=4989).
- Natural alternative: a **point query** — given `i`, return `x_i`. That is `n` possible queries instead of one [`1:23:09`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=4989), [`1:24:20`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=5060).

## What is possible for point queries

| Variant | Point query `x_i` |
|---|---|
| Deterministic exact | ❌ impossible [`1:23:33`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=5013) |
| Randomized exact | ❌ impossible [`1:23:33`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=5013) |
| Deterministic approximate | ✅ possible [`1:23:33`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=5013) |
| Randomized approximate | ✅ possible, and slightly more efficient [`1:23:33`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=5013) |

- Note the contrast with `F₀`: for point queries, the **deterministic approximate** cell flips from impossible to possible [`1:23:33`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=5013).
- "Approximate" here means outputting `x_i ± (error term)`, where the error is allowed to be `ε · ‖x‖` for some norm of `x` — e.g. the **L1 norm** [`1:23:57`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=5037).
- Impossibility results for these variants are proved the same way as for support size [`1:23:33`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=5013).

## Why point queries don't yield a deterministic `F₀` approximation

- If `x_i = 0`, the point-query algorithm may still report `ε · ‖x‖₁`, so you **cannot tell zero coordinates from near-zero ones** — which is exactly what counting the support requires [`1:24:20`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=5060), [`1:24:42`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=5082).
- Integrality doesn't rescue it: with e.g. `ε = 1/10` and an L1 norm divisible by 10, the error term is itself an integer and the ambiguity survives [`1:24:42`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=5082), [`1:25:11`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=5111).
- Shrinking `ε` doesn't rescue it either — **space grows as a function of `ε`** [`1:25:11`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=5111).

## Space dependence on `ε` for point queries

- **Deterministic**: space about `1/ε²` [`1:25:38`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=5138).
- **Randomized**: space about `1/ε`, up to extra `log` and `log(1/δ)` factors [`1:25:38`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=5138).

## End of class

- Out of time; continues Tuesday [`1:25:38`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=5138), [`1:25:56`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=5156).
