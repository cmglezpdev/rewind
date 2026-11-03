# 4. Median amplification, optimal space, and limited independence

## The median trick

- To push failure probability from `1/3` down to `δ`, **stack `k = O(log 1/δ)` independent copies** of the sketch: `Π`, `Π'`, … each with `6/ε²` rows [`28:58`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1738), [`29:49`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1789).
- This yields `k` independent trials `y¹, …, yᵏ`; report the **median** of the `k` estimates [`30:13`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1813).
- **Why it works**: each trial succeeds with probability `2/3`, so the expected number of good trials is `2k/3`; the median fails only if fewer than `k/2` succeed — a constant-factor deviation whose probability decays exponentially in `k` by a **Chernoff bound**. Exponential in `k` means `δ` [`31:24`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1884), [`31:43`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1903), [`32:00`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1920), [`32:40`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1960).

**Result**: space `O((1/ε²)·log(1/δ))` for success probability `1 − δ` [`32:40`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1960).

## This space bound is optimal

- A long line of work settled it: first `1/ε`, then `1/ε²`, and only much later the **product** `(1/ε²)·log(1/δ)` [`33:39`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2019).
- The lecturer cites the most recent link in the chain: **Jayaram–Woodruff**, *Transactions on Algorithms* (journal version) [`34:02`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2042).

## Storing `Π` itself: limited independence

- **The problem**: `Π` has `n` columns, so writing it down explicitly costs more space than storing `x` — defeating the whole point [`34:38`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2078).
- **The fix**: reread the proof. Both the expectation and the variance calculation only ever expanded to **degree-4 polynomials in the signs**, and only ever needed products of four signs to behave independently [`35:02`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2102), [`35:22`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2122).
- So **4-wise independent signs suffice** — and from earlier in the course, a 4-wise independent hash family is specified by only `O(log n)` bits [`35:22`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2122), [`35:42`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2142).
- `log n` bits is one machine word, so **each copy of the sketch needs `O(1)` words for its hash function**, and there are `log(1/δ)` copies [`36:01`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2161), [`36:18`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2178).
- Total to describe the whole matrix: **`O(log(1/δ) · log n)` bits ≈ `log(1/δ)` words** — "I'm not hiding anything, that's really the entire analysis" [`36:01`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2161), [`36:18`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2178).
