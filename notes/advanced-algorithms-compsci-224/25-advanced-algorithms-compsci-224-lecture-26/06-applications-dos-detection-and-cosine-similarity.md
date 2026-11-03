# 6. Applications: DoS detection and cosine similarity

## Why Thorup and Zhang built the sparse sketch

- Both authors were at **AT&T Research**, which operates a very large number of routers [`42:28`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2548).
- **The vector**: `n` = number of destination IP addresses; `xᵢ` = how many packets destination `i` received in a time window. Deletions were not even needed [`42:51`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2571).
- **Why L2**: `‖x‖₂²` measures **spikes / skewness** in the traffic distribution — used as part of a system for detecting **denial-of-service attacks** [`42:51`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2571), [`43:37`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2617).
- **Why not L∞**: the infinity norm measures spikes best, but **no space-efficient streaming algorithm for `‖x‖_∞` exists**. The largest `p` for which a space-efficient `Lp` algorithm exists is **`p = 2`** — a known, proven boundary [`43:17`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2597), [`43:37`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2617).
- **Why speed mattered so much**: the sketch runs on the router at network line rate. At 1% error, `1/ε² = 100² = 10,000` — so the sparse construction removed a **factor of 10,000** from their update cost [`44:03`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2643).

## Cosine similarity between documents

- Contrast with **Jaccard similarity** from a problem set, which used the minimum of a hash function to compare sets (e.g. web pages) [`44:27`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2667), [`44:48`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2688).
- **Setup**: `xᵢ` = number of occurrences of word `i` in document `x`; normalize `x` to unit norm so all documents lie on a sphere [`44:48`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2688), [`45:32`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2732).
- Similarity of two documents = the **angle `θ` between them**; small angle ⇒ similar [`45:56`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2756).
- **The trick**: forget streaming — treat `Πx` as a **compression (a "sketch") of the document**, and estimate `⟨x, y⟩ = cos θ` by `⟨Πx, Πy⟩` with the *same* `Π` [`46:23`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2783), [`46:49`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2809).
- **Guarantee**: an expectation/variance analysis gives additive `ε` error on the true dot product with probability `1 − δ` [`47:16`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2836).

### Norms ⇒ dot products, via the polarization identity

- `‖a − b‖² = ‖a‖² + ‖b‖² − 2⟨a,b⟩`, hence `⟨a,b⟩ = (‖a‖² + ‖b‖² − ‖a−b‖²)/2` [`47:40`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2860).
- Apply with `a = Πx`, `b = Πy`. Since `Π` preserves the squared norms of `x`, `y`, **and `x − y`** (which is just another vector), each of the three terms is preserved up to `ε` [`48:15`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2895), [`48:43`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2923).
- **Takeaway used repeatedly for the rest of the lecture**: *preserving L2 norms ⇒ preserving dot products ⇒ preserving cosines of angles* [`48:43`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2923), [`48:58`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2938).
