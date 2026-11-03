# 07 — Bases and rewriting the LP around a vertex

## Bases

- Every vertex `x ∈ P` has a **base** `B = { j : x_j > 0 }`, with **`|B| ≤ m`** [`1:02:04`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3724), [`1:02:56`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3776), [`1:03:23`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3803).
- **Vertices are in correspondence with bases** — changing the base *is* changing the vertex [`1:21:09`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4869).

## Linear-algebra fact used

- A matrix-vector product is a **linear combination of columns**: `Cz = Σᵢ zᵢ·Cᵢ` [`1:03:23`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3803), [`1:03:56`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3836), [`1:04:18`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3858).
- So `Ax = Σᵢ xᵢ·Aᵢ`, and since `xᵢ ≠ 0` only on `B`, this collapses to **`A_B·x_B = b`** [`1:04:18`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3858), [`1:04:41`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3881).

## A vertex is determined by its base

- If `|B| = m`, then `A_B` is `m × m` with linearly independent columns (theorem in `06`), hence **full rank and invertible**, giving

  **`x_B = A_B⁻¹·b`** [`1:05:05`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3905), [`1:05:33`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3933).
- So **knowing which columns form the base is enough to recover the vertex** — just solve a linear system [`1:06:06`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3966).
- If `|B| < m`, **pad `B` with extra columns preserving linear independence** until `|B| = m`; the padded coordinates are zero so the identity still holds [`1:06:06`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3966), [`1:06:36`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3996), [`1:07:04`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4024).

## Rewriting the LP in a fixed base

Fix a vertex and its (extended) base `B`; let `N` be the complementary coordinates. Partition everything [`1:07:04`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4024), [`1:08:18`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4098), [`1:09:51`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4191), [`1:10:11`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4211):

```
min  c_Bᵀ x_B + c_Nᵀ x_N
s.t. A_B x_B + A_N x_N = b
     x_B, x_N ≥ 0
```

- Multiply the equality by `A_B⁻¹` (legal — `A_B` is full rank) to eliminate `x_B` [`1:09:12`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4152), [`1:10:39`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4239):

  **`x_B = A_B⁻¹ b − A_B⁻¹ A_N x_N`**, valid for every `x ∈ P` [`1:11:03`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4263).

## The reduced-cost objective

Substituting into `cᵀx = c_Bᵀ x_B + c_Nᵀ x_N` gives [`1:11:03`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4263), [`1:11:56`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4316), [`1:13:08`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4388):

```
cᵀx = c_Bᵀ A_B⁻¹ b            ← constant, independent of x
      + ( c_N − A_Nᵀ (A_B⁻¹)ᵀ c_B )ᵀ x_N
```

- The bracketed vector is named **`c̃_N`** — the **reduced costs** of the non-basic variables [`1:14:09`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4449), [`1:14:34`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4474).
- The whole point: the objective splits into a **constant term plus a term depending only on `x_N`**, which is exactly what makes the greedy step in Simplex well-defined [`1:13:56`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4436), [`1:14:09`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4449).
