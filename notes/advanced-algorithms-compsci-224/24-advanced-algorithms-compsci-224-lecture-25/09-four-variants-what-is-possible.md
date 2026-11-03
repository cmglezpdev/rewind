# 9. The four variants: what is and isn't possible for `F₀`

Having killed the deterministic exact case, the lecture relaxes along two axes — **exact vs approximate**, **deterministic vs randomized** [`1:05:19`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=3919).

## The four cells

| | **Exact** | **Approximate** (within 1%) |
|---|---|---|
| **Deterministic** | ❌ impossible in sublinear space (encoding argument) [`56:47`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=3407) | ❌ impossible — AMS [`1:06:56`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=4016), [`1:07:20`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=4040) |
| **Randomized** (99% success) | ❌ impossible — AMS [`1:06:56`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=4016), [`1:07:20`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=4040) | ✅ **possible** in sublinear space — Flajolet–Martin, JCSS '85 [`1:07:20`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=4040) |

Definitions used [`1:06:16`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=3976), [`1:06:37`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=3997), [`1:06:56`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=4016):

- **Deterministic approximate**: always correct in the sense of returning a value within **1% of the true support size**, guaranteed.
- **Randomized exact**: returns the exact support size with **99% probability**; may output junk with the remaining 1%.
- **Randomized approximate** (the most relaxed): with 99% probability returns a value within 1% of the truth.

## Notes on the impossibility results

- Both impossible cells are also proved by **encoding arguments**, and all of them are due to **AMS** [`1:07:20`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=4040).
- The hardness is not about the 1%: **any constant-factor approximation** (e.g. a 2-approximation) is impossible deterministically [`1:08:16`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=4096).
- "Possible" always means **possible in sublinear space** — remembering everything always works [`1:07:20`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=4040).

## Las Vegas vs Monte Carlo

- **Las Vegas**: always correct, but running time / space is only *expected* [`1:08:16`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=4096).
- **Monte Carlo**: efficiency always guaranteed, **correctness is randomized** [`1:08:16`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=4096).
- The `F₀` algorithm to come is **Monte Carlo**; when it fails (that 1%) it can output anything [`1:08:58`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=4138).
- The failure probability can be driven down to any `δ`, paying a `log(1/δ)` factor in space [`1:08:58`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=4138).
