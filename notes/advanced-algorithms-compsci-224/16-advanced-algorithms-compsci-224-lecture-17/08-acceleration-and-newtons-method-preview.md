# 8. Acceleration, and what comes next (Newton's method)

## Gradient descent is not optimal

- Question raised: in this oracle model (value + gradient, with Hessian bounds), is `O((L/μ)·log(1/ε))` the best possible? ([`1:20:48`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4848), [`1:21:08`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4868)).
- **No.** **Accelerated gradient descent** halves the error in `O(√(L/μ))` iterations — due to **Nesterov, Soviet Math 1983** ([`1:21:08`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4868), [`1:22:02`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4922)).
- Not covered in the course: for the interior point application **all control parameters will be constants**, so `L/μ` versus `√(L/μ)` makes no difference here. Mentioned purely so students know it exists for other problems ([`1:22:02`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4922), [`1:22:42`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4962)).

## Preview of the next lecture

- Next up: state the **second-order method — Newton's method — and its bounds**; the proof will be left to the course notes ([`1:22:58`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4978), [`1:23:39`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=5019)).
- Then: show how to use Newton's method to go from `x̃_{λk}` to `x̃_{λk+1}` ([`1:23:39`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=5019)).
- **Why not gradient descent for IPM**: interior point needs to explicitly *compute* the Hessian, not merely have bounds on it ([`1:24:14`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=5054)).
- The warm-start mechanics to keep in mind: `x̃_{λk}`, the approximate minimizer of `f_{λk}` already in hand, becomes the **`x₀` that seeds Newton's method** for minimizing `f_{λk+1}`; run the update rule until the error is small enough, and the result is `x̃_{λk+1}`, which seeds the next round for `f_{λk+2}` ([`1:24:35`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=5075), [`1:24:58`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=5098), [`1:25:22`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=5122)).

## Course admin (end of class)

- A problem set and the **project proposal** are due; the proposal deadline is confirmed by students as Thursday 11:59 PM, with the instructor deferring to the course website ([`1:25:48`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=5148), [`1:26:07`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=5167), [`1:26:22`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=5182)).
