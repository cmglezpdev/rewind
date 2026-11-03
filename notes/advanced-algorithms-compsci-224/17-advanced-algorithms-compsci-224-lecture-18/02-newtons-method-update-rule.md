# 2. Newton's Method: the Update Rule and Where It Comes From

## The update rule

- From the current iterate `x₀ ∈ ℝⁿ`, the next iterate is [`4:10`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=250):

  `x₁ = x₀ − (∇²f(x₀))⁻¹ ∇f(x₀)`

- This is the exact rule that gets analyzed for the rest of the lecture [`5:01`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=301).

## Derivation: minimize the second-order Taylor model

- **Gradient descent** minimizes the *first-order* Taylor approximation plus the error term from Taylor's theorem [`5:01`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=301), [`5:26`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=326).
- **Newton's method** instead minimizes the *second-order* Taylor expansion [`5:26`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=326):

  `f(y) ≈ f(x₀) + ⟨∇f(x₀), y − x₀⟩ + ½⟨y − x₀, ∇²f · (y − x₀)⟩`  [`5:48`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=348)

- Newton's method **pretends this approximation is an equality** and minimizes the right-hand side; doing the calculus gives exactly `x₁ = x₀ − (∇²f)⁻¹∇f` [`6:32`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=392).

| Method | Oracle access | Model minimized | Step |
|---|---|---|---|
| Gradient descent | `f`, `∇f` | 1st-order Taylor + error bound | step along `−∇f` [`5:01`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=301) |
| Newton's method | `f`, `∇f`, `∇²f` | 2nd-order Taylor, treated as exact | `−(∇²f)⁻¹∇f` [`4:10`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=250), [`6:32`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=392) |

- The remaining task is purely quantitative: **how well does this step do?** [`6:58`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=418)
