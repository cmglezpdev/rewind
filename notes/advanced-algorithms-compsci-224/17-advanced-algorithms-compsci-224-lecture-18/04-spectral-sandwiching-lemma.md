# 4. Preliminary: Rewriting the Spectral Sandwich

The proof needs the hypothesis `(1−ε)A ⪯ B ⪯ (1+ε)A` in a *whitened* form. This section derives that restatement.

## The chain of rewrites

1. Subtract `A` throughout [`12:33`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=753), [`13:05`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=785):
   `−εA ⪯ B − A ⪯ εA`
2. Unfold the Loewner ordering into quadratic forms, for all `x ∈ ℝⁿ` [`13:27`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=807):
   `−ε·xᵀAx ⪯ xᵀ(B−A)x ⪯ ε·xᵀAx`
3. Use the **spectral theorem**: a real symmetric matrix factors as `A = UΛUᵀ` with `U` orthogonal and (here, PSD) non-negative eigenvalues in `Λ` [`13:56`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=836).
   - Applying a function `g` to a matrix means applying `g` to **each eigenvalue** in that decomposition [`14:19`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=859).
4. Hence `xᵀAx = ‖A^{1/2}x‖₂²`. Substitute `y = A^{1/2}x`, i.e. `x = A^{−1/2}y` [`14:39`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=879), [`15:33`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=933).
5. The condition becomes, for all `y` [`15:33`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=933), [`16:02`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=962):

   `−ε·I  ⪯  A^{−1/2}(B − A)A^{−1/2}  ⪯  ε·I`

- This whitened form is exactly what reappears inside the Newton proof [`16:31`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=991).

## Invertibility caveat

- The derivation assumes `A` is invertible; for `f_λ` the Hessian is invertible, so the lecture proceeds under that assumption [`16:55`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1015).
- Aside on the general case: for the sandwich inequality to hold at all, **`A` and `B` must have the same column space**; one can restrict to that subspace via a matrix `U` with orthonormal columns forming a basis for it, and work with `A·Ux` instead [`16:55`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1015), [`17:23`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1043), [`17:39`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1059).
