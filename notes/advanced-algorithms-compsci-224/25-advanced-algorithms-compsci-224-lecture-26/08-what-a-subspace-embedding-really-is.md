# 8. What a subspace embedding really is (and how to build one)

## Reducing the definition to a matrix condition

Let `V` be a `d`-dimensional subspace, and let `U` be an `n × d` matrix whose columns are an **orthonormal basis** for `V`, so `UᵀU = I` [`1:03:45`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3825).

- Why `UᵀU = I`: entry `(i,j)` is the dot product of columns `i` and `j` — `1` when `i = j`, `0` otherwise [`1:04:29`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3869).
- Every `v ∈ V` is `Ux` for some `x ∈ ℝᵈ`, so the definition becomes: for all `x ∈ ℝᵈ`, `‖ΠUx‖² = (1 ± ε)‖Ux‖²` [`1:05:16`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3916).
- But `‖Ux‖² = xᵀUᵀUx = ‖x‖²`, so the condition is `‖ΠUx‖² = (1 ± ε)‖x‖²` [`1:05:58`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3958).

**Three equivalent restatements** [`1:05:58`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3958), [`1:06:31`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3991):
1. All singular values of `ΠU` lie in `[1−ε, 1+ε]` (squared singular values within `1 ± ε`).
2. All eigenvalues of `(ΠU)ᵀ(ΠU)` are `1 ± ε`.
3. **`‖(ΠU)ᵀ(ΠU) − I‖_op < ε`** — the operator norm, i.e. the largest eigenvalue in absolute value [`1:07:21`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4041).

### Sanity check at `d = 1`

- If `U` is a unit *vector* rather than a matrix, `(ΠU)ᵀ(ΠU)` is just `‖ΠU‖²` and `UᵀU` is `‖U‖²`; both are scalars, and operator norm collapses to absolute value [`1:07:41`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4061), [`1:07:56`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4076).
- So a subspace embedding is the **matrix generalization** of the single-vector norm preservation from the AMS analysis: preserving orthonormal matrices under operator norm rather than preserving vectors [`1:07:56`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4076), [`1:08:16`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4096).

## The matrix Chebyshev argument

Run the *same* proof, one level up [`1:08:16`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4096):

- `Pr[ ‖(ΠU)ᵀ(ΠU) − I‖_op > ε ] ≤ E[ ‖(ΠU)ᵀ(ΠU) − I‖_op² ] / ε²` — Chebyshev [`1:08:16`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4096).
- **Replace operator norm by trace**: the largest squared eigenvalue is at most the *sum* of squared eigenvalues (all non-negative), and that sum is the trace of the squared matrix. So bound `E[ tr(((ΠU)ᵀ(ΠU) − I)²) ] / ε²` instead [`1:08:45`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4125), [`1:09:13`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4153).
- The computation (not done on the board) gives `(1/ε²)·O(d²/m)`, so **`m = O(d²/ε²)` rows suffice** — no dependence on `n` [`1:09:32`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4172).
- This works with the **Thorup–Zhang sketch** (one non-zero per column) [`1:09:59`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4199).

### Attribution

- **Clarkson–Woodruff** were first, via a more complicated argument with a slightly worse bound [`1:09:59`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4199).
- The clean chain of inequalities above is due to **Mahoney–Meng** and, in the same conference, **Nelson–Nguyen** [`1:10:21`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4221).

## Cost of computing `ΠA` with a sparse `Π`

- **`ΠA` costs `O(nnz(A))`** — proportional to the number of non-zero entries of `A` [`1:11:06`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4266).
- **Why**: each non-zero entry of `A` triggers adding the corresponding column of `Π` into the sketch, and that column has exactly **one** non-zero ⇒ constant time per non-zero [`1:11:06`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4266), [`1:12:03`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4323).
