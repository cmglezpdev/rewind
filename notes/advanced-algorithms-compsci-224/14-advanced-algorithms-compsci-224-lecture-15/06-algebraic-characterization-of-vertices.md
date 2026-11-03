# 06 — Vertices ⟺ linearly independent columns

## The definition of the support submatrix

- For `x ∈ P`, let **`B(x) = { j : x_j > 0 }`** (the support) and **`A_{B(x)}`** the submatrix of `A` restricted to those columns [`50:23`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3023), [`51:04`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3064), [`52:11`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3131).

## Theorem

> **`x` is a vertex of `P` ⟺ the columns of `A_{B(x)}` are linearly independent** [`51:04`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3064).

## Immediate size consequence

- `A` has only `m` rows, so by **column rank = row rank**, `A_{B(x)}` cannot have column rank above `m`; linear independence therefore forces **`|B(x)| ≤ m`** [`52:11`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3131), [`52:32`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3152), [`52:53`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3173), [`53:15`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3195).
- **`A` has full row rank `m` in standard form** — after removing redundancies. Linearly dependent rows are either **redundant** (drop them) or **contradictory** (e.g. `x + y = 5` alongside `x + y = 7`, in which case the LP is simply infeasible) [`53:15`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3195), [`53:52`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3232), [`54:05`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3245).
- Hence a support of size `< m` can be **padded with extra columns up to exactly `m`**, keeping independence and making the matrix square [`54:24`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3264), [`54:43`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3283).

## Proof — both contrapositives

### (1) not a vertex ⟹ columns dependent

- Not a vertex gives `y ≠ 0` with `x ± y ∈ P` [`55:59`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3359).
- This yields `Ay = 0`, hence **`A_{B(y)}·y = 0`**, and the support fact **`xᵢ = 0 ⟹ yᵢ = 0`** [`56:36`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3396).
- So `A_{B(y)}` has dependent columns, and since `B(y) ⊆ B(x)` (`y` puts mass only where `x` does), **`A_{B(x)}` has dependent columns** too [`57:10`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3430), [`57:38`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3458), [`58:43`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3523).

### (2) columns dependent ⟹ not a vertex

- Dependence gives `y ≠ 0` (of dimension `|B(x)|`) with `A_{B(x)}·y = 0`; **extend `y` to `ℝⁿ` by zeros** to get `y ≠ 0` with `Ay = 0` [`59:11`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3551), [`59:53`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3593), [`1:00:21`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3621).
- `y` has mass only where `x` is strictly positive, so for a **sufficiently small `t > 0`** both `x + t·y` and `x − t·y` stay non-negative and hence lie in `P` — **`x` is not a vertex** [`1:00:50`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3650), [`1:01:41`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3701), [`1:02:04`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3724).
