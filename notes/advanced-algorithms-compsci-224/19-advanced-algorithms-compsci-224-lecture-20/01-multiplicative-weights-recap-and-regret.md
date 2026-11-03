# 1. Multiplicative weights recap and regret

Quick review of the guarantee proved in the previous lecture, plus the standard way of restating it in terms of *regret*. This is the tool that the rest of the first half of the lecture applies to linear programs.

## The theorem from last time

- Setting: `N` experts. On day `T` the algorithm outputs a probability vector `p_T` over experts; the adversary then reveals a cost vector `m_T`, whose `i`-th coordinate is the cost of expert `i` on that day ([`1:22`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=82)).
- Guarantee: `Σ_T ⟨m_T, p_T⟩ ≤ min_i Σ_T m_i(T) + ε·Σ_T |m_i(T)| + log N / ε`, for any `ε ∈ (0, 1/2)` ([`1:55`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=115), [`2:31`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=151)).
- Standing assumption: every cost entry lies in `[-1, 1]` ([`2:31`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=151)).

## Weakened, easier-to-use form

- Since each `|m_i(T)| ≤ 1`, the sum `Σ_T |m_i(T)| ≤ T`, giving the simpler bound `min_i Σ_T m_i(T) + εT + log N / ε` ([`3:02`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=182)).
- `ε` is free to choose. Balancing the two error terms (valid as long as `T ≳ 2 log N`) yields an additive error of order `√(log N / T)` per day ([`3:22`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=202), [`3:44`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=224)).
- The natural quantity to state is the **average** regret, which decays as `T` grows; stated per-day it goes down like `1/T`-style averaging of the `√T` total ([`4:58`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=298)).

## Terminology

- The excess over the best expert's total cost is called the **regret**; minimizing it is the standard framing in the online-learning literature ([`5:25`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=325)).
- The familiar `√T` regret bound is exactly this theorem with the tuned choice of `ε` ([`5:43`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=343)).
