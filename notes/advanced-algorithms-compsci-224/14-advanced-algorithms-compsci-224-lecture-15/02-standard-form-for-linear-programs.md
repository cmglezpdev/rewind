# 02 — Putting any LP into standard form

## Why bother

- Simplex, at least as presented here, **operates only on LPs in standard form**; the form has no other significance [`5:47`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=347), [`9:43`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=583).

## Standard form

```
min  cᵀx
s.t. Ax = b
     x ≥ 0        (coordinate-wise)
```

- `x ∈ ℝⁿ`, `A` is `m × n`, and **`n ≥ m`** [`4:36`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=276), [`5:02`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=302).
- A general LP starts as `min cᵀx` subject to arbitrary linear (in)equalities: `aᵢᵀx = bᵢ`, `≤ bᵢ`, or `≥ bᵢ` [`3:33`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=213), [`4:11`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=251).

## The four reductions

1. **Maximization → minimization.** `max cᵀx` equals minimizing `−cᵀx`: flip the sign of every entry of `c` [`5:02`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=302), [`5:34`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=334).
2. **Equalities → two inequalities.** `aᵢᵀx = bᵢ` ⟺ `aᵢᵀx ≥ bᵢ` **and** `−aᵢᵀx ≥ −bᵢ` [`6:11`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=371).
3. **`≤` → `≥`.** `aᵢᵀx ≤ bᵢ` ⟺ `−aᵢᵀx ≥ −bᵢ`, so **only `≥` constraints remain** [`6:37`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=397), [`6:59`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=419).
4. **`≥` → equality via slack variables.** For each constraint `i` introduce `sᵢ ≥ 0` measuring the gap between the two sides, and replace `aᵢᵀx ≥ bᵢ` with `aᵢᵀx − sᵢ = bᵢ` [`6:59`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=419), [`7:31`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=451), [`7:56`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=476).
5. **Free variables → non-negative pairs.** Write `xᵢ = xᵢ⁺ − xᵢ⁻` with `xᵢ⁺, xᵢ⁻ ≥ 0`; any real number is a difference of two non-negatives [`8:37`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=517).

## Consequences

- After the transformations **every variable (originals split into ±, plus slacks) is non-negative and every constraint is an equality** [`9:07`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=547), [`9:26`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=566).
- **`n ≥ m` comes for free**: each of the `m` constraints contributes a slack variable on top of the original variables, so the variable count is at least the constraint count [`9:26`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=566), [`9:43`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=583).
