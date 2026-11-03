# 4. Brute force: `O*(3^n)` time in polynomial space

## Claim

- All `f̂(S)` (or all `f̃(S)`) values can be computed **sequentially** in `O*(3^n)` time and **poly(n) space** [`24:20`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=1460).
- Time accounting assumes **evaluating `f` costs unit time**; for k-colorability evaluating `f` is poly-time, since you only have to check whether a set is independent [`24:20`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=1460), [`25:11`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=1511).

## The algorithm

- Loop over all `S`, and for each `S` compute `f̂(S) = Σ_{R ⊆ S} f(R)` by brute force — no recursion, no memoization [`25:55`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=1555), [`26:24`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=1584).
- **Do not store** the result: fold each `f̂(S)` immediately into the running sum `Σ_S (−1)^{|V−S|} f̂(S)^k`, then throw it away [`26:42`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=1602). That is what keeps the space polynomial.

## Time analysis

- Cost for one `S` is proportional to its number of subsets, `2^{|S|}` [`27:06`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=1626).
- Total: `Σ_{S ⊆ V} 2^{|S|} = Σ_{i=0}^{n} C(n,i) · 2^i = 3^n` — the same binomial identity used last lecture [`27:31`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=1651), [`27:47`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=1667).

## Why this matters

- Last lecture's **dynamic programming** algorithm for k-colorability used roughly `3^n` time **and `2^n` space** [`28:05`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=1685).
- Inclusion–exclusion gets the same `3^n` time with only **polynomial space** — the space is the win [`28:05`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=1685).
