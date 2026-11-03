# 5. Update time and the Thorup–Zhang sparse sketch

## Update time of the dense AMS sketch

- Streaming algorithms are small-space **dynamic data structures**, so space is not the only cost: update time and query time matter too [`36:42`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2202).
- An update means adding a multiple of a **column** of `Π` into `y`. Because `Π` is completely dense — every entry is a random sign — every coordinate of `y` must be touched [`37:45`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2265), [`38:14`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2294).
- **Update time = `Θ(m) = O((1/ε²)·log(1/δ))`** (ignoring hash evaluation, which is constant with the right family) [`37:20`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2240), [`37:45`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2265).

## Thorup–Zhang: make `Π` sparse

- Reference: **Thorup and Zhang**, conference version **SODA '04** [`38:14`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2294).
- **Construction**: `Π` still has `Θ(1/ε²)` rows and `n` columns, but each column has **exactly one non-zero** — a random sign placed at a uniformly random row; everything else is `0` [`38:56`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2336), [`39:31`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2371).
- The rest of the algorithm is unchanged: maintain `y = Πx`, estimate `‖x‖₂²` by `‖y‖₂²`, repeat `log(1/δ)` times, take the median [`39:31`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2371), [`40:26`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2426).
- **Same guarantees**: `E[‖y‖₂²] = ‖x‖₂²` and `Var[‖y‖₂²] = O(‖x‖₂⁴/m)` — a computation not very different from the dense one [`39:55`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2395).
- **Update time drops to `O(log(1/δ))`** — the `1/ε²` factor disappears entirely, since only one entry per copy changes [`40:50`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2450).
- Asked whether the dense version is ever preferable, the answer is a flat **no — the sparse sketch is strictly better** [`40:26`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2426).

| | Dense AMS | Thorup–Zhang |
|---|---|---|
| Non-zeros per column | `m` (all) | `1` |
| Space | `O((1/ε²)log(1/δ))` | `O((1/ε²)log(1/δ))` |
| Update time | `O((1/ε²)log(1/δ))` | `O(log(1/δ))` |

[`37:45`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2265), [`40:50`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2450)

## An open problem

- Can update time be pushed below `log(1/δ)` — say to constant, or `√(log(1/δ))` — while keeping optimal space? The lecturer flags this as **open and of personal interest** [`41:22`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2482), [`41:41`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2501).
- **Known partial answer**: for *linear sketches*, update time must be at least roughly `√(log(1/δ))` — leaving a gap between `√(log 1/δ)` and `log(1/δ)` [`41:41`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2501).
