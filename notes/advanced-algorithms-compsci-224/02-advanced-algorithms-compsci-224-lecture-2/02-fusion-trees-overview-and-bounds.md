# 2. Fusion trees: problem statement and known bounds

## The problem

- Fusion trees solve the **predecessor problem**, due to **Fredman and Willard (~1993)** ([`1:35`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=95)).
- The lecture covers the **static** predecessor version; the original paper was later made dynamic ([`1:35`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=95)).

## Bounds table

| Result | Update time | Query time | Notes |
| --- | --- | --- | --- |
| Fredman–Willard (~1993) | — (static) | `O(log_w n)` | polynomial preprocessing ([`1:35`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=95), [`3:19`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=199)) |
| Andersson–Thorup | `log_w n + log log u` (i.e. `log log n`), **deterministic** | `O(log_w n)` | ([`2:35`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=155)) |
| Raman | `log_w n`, **expected** (randomized) | `O(log_w n)` | ([`2:35`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=155), [`3:19`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=199)) |

- In **all** cases the query time is `O(log_w n)` ([`3:19`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=199)).
- Only the static version is presented in this lecture ([`3:19`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=199)).

## Why static fusion trees cannot be used for sorting

- Building the static structure needs a **polynomial amount of preprocessing** — "not that bad", but **more than sorting time** ([`3:19`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=199), [`3:48`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=228)).
- So the static structure gives no sorting algorithm; the **dynamic versions can** be used for sorting ([`3:48`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=228)).
