# 3. k-wise independence

## Why weaken independence at all?

- The Chernoff proof genuinely needs full independence of the `Xi`; the union-bound proof does not [`23:33`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1413), [`24:02`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1442).
- The union-bound proof only used `E[Π_{i∈T} Xi] = Π_{i∈T} E[Xi] = 1/n^k` for sets `T` of size `k` — an expectation over exactly `k` variables [`24:33`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1473), [`25:06`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1506), [`25:23`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1523), [`25:39`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1539).
- So any `k` items behaving as if independent suffices — strictly weaker than all `n` items being independent [`25:56`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1556).

## Two definitions

- **k-wise independent random variables**: `X1, …, Xn` are k-wise independent if for every index set `i1 < i2 < … < ik`, the variables `Xi1, …, Xik` are independent [`26:18`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1578).
- **k-wise independent hash family**: `H` is k-wise independent if, drawing `h` uniformly at random from `H`, the random variables `h(0), h(1), …, h(u-1)` are k-wise independent [`27:56`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1676), [`28:45`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1725), [`29:15`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1755), [`29:48`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1788).
- Later refinement raised by a student: the definition should also require **near-uniformity**, not only independence; many textbook definitions fold that in [`1:24:12`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=5052).

## Example families and their storage cost

| Family | Construction | Bits to store one `h` |
| --- | --- | --- |
| All functions `U → M` | any mapping; k-wise independent for every `k ≤ u` [`29:48`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1788), [`30:15`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1815), [`31:22`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1882) | `u·log m` (≈ `u log u`) [`32:26`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1946), [`32:51`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1971), [`33:39`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2019) |
| Degree `k-1` polynomials mod `p` | `u = m = p` prime, `h(x) = Σ_{i=0}^{k-1} a_i x^i mod p` [`31:22`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1882), [`31:57`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1917) | `k·log p = k·log u` [`33:22`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2002), [`33:39`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2019) |

- The storage gap is the whole point: for constant `k` (2-wise, 3-wise, …) a polynomial hash costs `O(log u)` bits versus `u log u` for a truly random function [`33:39`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2019), [`33:58`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2038).
- Applying this back to load balancing: `log n / log log n`-wise independence is enough for the balls-and-bins result — no truly random hash needed [`33:58`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2038), [`34:44`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2084).

## Why polynomials are k-wise independent: polynomial interpolation

- Fix any `k` distinct inputs `x1, …, xk` and any target values `y1, …, yk` [`37:17`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2237).
- By **polynomial interpolation** there is exactly one coefficient vector making `h(x1)=y1, …, h(xk)=yk` [`37:17`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2237), [`37:49`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2269).
- Counting: `p^k` possible `y`-tuples, `p^k` possible coefficient vectors, and the map is a bijection ⇒ each outcome has probability exactly `1/p^k`, the same as truly random [`38:19`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2299), [`38:33`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2313).
- A student's equivalent framing — the **Vandermonde matrix is nonsingular** — is correct, but interpolation is the less intimidating way to say it [`36:30`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2190), [`36:57`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2217).
- **Why not fully independent**: once any `k` evaluations are fixed, every remaining evaluation is determined — again by interpolation [`50:12`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3012), [`50:40`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3040).

## Handling m ≠ u: the "mod p mod m" family and its wraparound bias

- Real applications need `m ≈ n`, far smaller than `u`, so the `u = m = p` assumption must go [`34:44`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2084), [`35:48`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2148).
- Construction: take `u = p` prime (a prime always sits within a factor of 2 of any target, so assuming primality is cheap) and define `h(x) = (Σ a_i x^i mod p) mod m`, with `m < p` [`35:17`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2117), [`35:48`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2148), [`39:24`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2364), [`40:24`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2424).
- **The problem**: a uniform value in `[0, p-1]` reduced mod `m` is *not* uniform in `[0, m-1]`. Values before the last partial wraparound get extra mass [`39:03`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2343), [`41:48`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2508), [`42:13`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2533). It is the same reason truncating a random number to get a range gives nonuniform counts [`41:27`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2487).
- **The guarantee that survives**: no output gets more than a `2/m` share, so for all `x1..xk, y1..yk`,
  `Pr[h(x1)=y1 ∧ … ∧ h(xk)=yk] ≤ (2/m)^k` [`42:34`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2554), [`42:56`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2576), [`43:20`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2600).
- **Worst case is `p = m + 1`**: exactly one residue is hit twice, making it twice as likely as the others. More wraparounds even things out, so the factor 2 is a sloppy upper bound [`44:31`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2671), [`45:04`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2704), [`45:24`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2724), [`46:06`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2766).
- **Still good enough**: rerunning the balls-and-bins calculation with `(2/n)^k` instead of `(1/n)^k` still gives max load ≈ `log n / log log n` [`43:20`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2600), [`44:11`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2651).

## Student proposal: rejection sampling, and why it fails here

- Idea raised: re-feed the output through `h` (or resample) until it falls below `m`, i.e. deterministic rejection sampling [`47:23`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2843), [`47:48`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2868), [`48:05`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2885).
- Objections given [`48:21`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2901), [`48:36`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2916), [`48:53`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2933):
  - There are `n` hash values in play; rejecting whenever any of them is bad happens often and costs a lot of time.
  - Redrawing coefficients per-key means storing a different `h` per `x`, which destroys the entire space saving that motivated k-wise families in the first place.
