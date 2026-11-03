# 3. The AMS sketch: expectation, variance, Chebyshev

## The analysis template

- The standard recipe for streaming algorithms, this one included: **bound the expectation, bound the variance, apply Chebyshev's inequality** [`10:50`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=650).
- Goal: `Pr[ | ‖y‖₂² − ‖x‖₂² | > ε‖x‖₂² ]` is small (a third, or 1%) — which is exactly the statement `‖y‖₂² = (1 ± ε)‖x‖₂²` [`11:34`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=694), [`12:18`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=738).
- Chebyshev bounds it by `E[(‖y‖₂² − E‖y‖₂²)²] / (ε²‖x‖₂⁴)` — "just Markov after you square things" [`12:55`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=775).

## Step 1 — the estimator is unbiased

- `yᵣ = (1/√m) Σᵢ σᵣᵢ xᵢ` [`15:01`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=901).
- Squaring gives a diagonal part `(1/m) Σᵢ σᵣᵢ² xᵢ²` plus a cross part `Σ_{i≠j} σᵣᵢσᵣⱼ xᵢxⱼ` [`15:01`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=901).
- `σᵣᵢ² = 1`, and the cross terms vanish because independence makes `E[σᵣᵢσᵣⱼ] = E[σᵣᵢ]·E[σᵣⱼ] = 0` [`15:55`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=955).
- So `E[yᵣ²] = ‖x‖₂²/m`, and summing the `m` rows by linearity: **`E[‖y‖₂²] = ‖x‖₂²`** [`14:00`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=840), [`16:32`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=992).

## Step 2 — the variance

- With the expectation pinned down, the Chebyshev numerator **is** `Var[‖y‖₂²]` by definition [`17:15`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1035).
- Independent entries of `Π` ⇒ independent coordinates of `y` ⇒ **variances add**: `Var[‖y‖₂²] = Σᵣ Var[yᵣ²]` [`17:15`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1035), [`17:51`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1071).
- `Var[yᵣ²] = E[yᵣ⁴] − (E[yᵣ²])²`, and the subtracted term is `‖x‖₂⁴/m²` [`18:34`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1114), [`19:32`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1172).

### Computing the fourth moment

- Expanding `yᵣ⁴` produces roughly `n⁴` monomials in the signs; push the expectation inside by linearity [`20:39`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1239).
- Monomial shapes: `σᵣᵢ⁴`; `σᵣᵢ²σᵣⱼ²`; `σᵣᵢ³σᵣⱼ`; and three-index terms — the exponents must sum to 4 [`21:06`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1266), [`21:27`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1287), [`21:48`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1308).
- **Key cancellation**: independent factors split, and `E[sign^{odd}] = 0`, so **every monomial with an odd exponent dies** — the same mechanism as the moment-based Chernoff proof from an earlier problem set [`22:32`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1352), [`22:56`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1376).
- Terms with even exponents lose their randomness entirely, since a squared sign is `1` [`26:22`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1582).
- What survives: `(1/m²)·[ Σᵢ xᵢ⁴ + c·Σ_{i≠j} xᵢ²xⱼ² ]`. The lecturer initially omits the multinomial constant `c` (an audience member catches it; he believes `c = 3`, and notes it does not matter) [`22:56`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1376), [`24:12`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1452), [`24:58`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1498).
- Since `Σᵢ xᵢ⁴ + Σ_{i≠j} xᵢ²xⱼ² = ‖x‖₂⁴`, the `(E[yᵣ²])²` term cancels cleanly, leaving **`Var[yᵣ²] ≤ 2‖x‖₂⁴/m²`** [`23:35`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1415), [`25:38`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1538).

## Step 3 — setting `m`

- Summing over the `m` rows: **`Var[‖y‖₂²] ≤ 2‖x‖₂⁴/m`** [`26:47`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1607).
- Chebyshev: failure probability `≤ (2/m)·‖x‖₂⁴ · 1/(ε²‖x‖₂⁴) = 2/(mε²)` — the norms cancel [`27:13`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1633).
- Choosing **`m = 6/ε²`** drives the failure probability below `1/3` [`27:13`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1633).

**Conclusion of the base algorithm**: `O(1/ε²)` words of space give a `(1 ± ε)` estimate of `‖x‖₂²` with probability at least `2/3` [`28:58`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1738).
