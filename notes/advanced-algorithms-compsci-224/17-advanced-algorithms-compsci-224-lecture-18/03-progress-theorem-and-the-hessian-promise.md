# 3. The Progress Theorem and the Hessian Promise

## The segment being assumed about

- For `t ∈ [0,1]`, define `x_t = x₀ + t(x₁ − x₀)` — the line segment from the current iterate to the Newton iterate [`7:35`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=455).

## The promise (hypothesis)

- Suppose there is an `ε > 0` such that **for all `t ∈ [0,1]`** [`8:13`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=493):

  `(1 − ε)·∇²f(x₀)  ⪯  ∇²f(x_t)  ⪯  (1 + ε)·∇²f(x₀)`

- `A ⪯ B` means `B − A` is **positive semi-definite** (Loewner ordering) [`9:02`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=542).
- Why a promise is needed at all: gradient descent could not compute the Hessian either, but its analysis relied on a promise that the **Hessian is well-conditioned** (small gap between largest and smallest singular values). Newton's method likewise needs *some* promise [`8:41`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=521).
- The promise used here is different in kind: **the Hessian must not change much along the line connecting `x₀` to the next iterate** [`9:02`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=542).

## Measuring progress: the matrix norm

- For a PSD matrix `A`, define `‖x‖_A := √(xᵀAx)` [`10:16`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=616), [`10:56`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=656).
- Progress is measured by the gradient's norm under the **Hessian-inverse norm** at the iterate [`9:31`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=571).

## What the theorem says

- The norm itself changes between iterates, but **not by much**, because the Hessians along the segment are spectrally close — so `∇²f(x₁)` is very similar to `∇²f(x₀)` [`10:56`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=656), [`11:22`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=682).
- Pretending the two norms are the same, the theorem reads: **the new gradient norm is at most roughly `ε` times the old gradient norm** [`11:22`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=682). (The proof produces the sharper factor `ε/(1 − ε)` — see topic 5, [`33:20`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2000).)
- Interpretation: the minimizer is exactly where the gradient is zero, so shrinking the gradient norm means **getting closer to the minimizer** [`11:41`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=701).
- Attribution: the lecturer credits the proof to **Aaron Sidford**, and disclaims knowing its original citation [`12:05`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=725).
