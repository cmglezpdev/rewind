# 02 — Probabilistic models and the learning problem

## Defining "structure" with a probabilistic model

- The popular way to specify what structure to look for is a **probabilistic model**: it takes parameters and tells you how to generate points; the **parameters are the structure** you want [`6:14`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=374).
- Informal definition: a function mapping a parameter `θ` to a data distribution `D(θ)` [`7:04`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=424).
- Simplest instance — a single **Gaussian**: parameters are mean and variance; learning = estimate them from samples [`7:04`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=424), [`8:05`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=485).
- Key framing: **the learning problem is the inverse of the data-generating process** [`8:36`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=516).

## Running example: mixture of Gaussians

Generative story with k = 3: pick a Gaussian with probabilities 0.4 / 0.3 / 0.3, then sample a point from it [`9:12`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=552), [`9:40`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=580), [`10:05`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=605).

The **hardness**: the learner sees only the points, never which Gaussian produced each one [`10:05`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=605), [`10:28`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=628).

Parameters:

| Parameter | Meaning | Reference |
|---|---|---|
| `k` | number of Gaussians | [`10:28`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=628) |
| `μᵢ`, i ∈ [k] | means (centers) of the Gaussians | [`11:06`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=666) |
| `wᵢ`, i ∈ [k] | mixing weights — fraction of points from each Gaussian | [`12:04`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=724), [`12:30`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=750) |

Simplifying assumption used here: all Gaussians are **spherical with the same known covariance**, so covariance is not part of `θ` [`11:46`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=706).

## The formal learning problem

- Given polynomially many samples from `D(θ)` for unknown `θ`, recover `θ` [`13:05`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=785).
- Better framing (in reply to a student question): the algorithm has **oracle access** to a sampler for `D(θ)`; the sample count need not be polynomial — it depends on how strong a theorem you want [`14:13`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=853), [`14:42`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=882), [`15:33`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=933).
- Runtime spectrum for mixtures of Gaussians: `D^k` time (already non-trivial) vs. `poly(D, k)` time (much harder), where `D` is the dimension [`14:42`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=882), [`15:08`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=908).

## Why the output must be approximate and high-probability

- Exact recovery of `θ` is generally impossible **even ignoring computation time** — averaging samples to estimate a Gaussian mean still leaves error depending on the sample count [`16:08`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=968).
- And only **with high probability**, since the samples drawn may happen to be uninformative [`16:33`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=993).
