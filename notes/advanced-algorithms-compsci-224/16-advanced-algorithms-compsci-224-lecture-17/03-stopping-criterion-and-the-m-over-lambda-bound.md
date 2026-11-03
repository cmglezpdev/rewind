# 3. Stopping criterion: the `m/λ` suboptimality bound

## The precision parameter L

- `L ≈ max( log‖b‖_∞ , log det_max , log‖c‖_∞ )` ([`16:37`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=997)).
- `det_max` is the largest magnitude determinant over submatrices of `A`; it appears because vertices are found by solving linear systems on submatrices of `A`, and the bits of precision needed to invert a matrix scale with the log of its determinant ([`16:37`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=997), [`17:23`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1043), [`17:47`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1067)).
- Practical reading: "just think of this as precision" ([`17:47`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1067)).

## When can we stop?

- Stop when `cᵀx_λ − cᵀx* < ε`, with `ε` exponentially small in the precision; at that point the iterate rounds to the true minimizing vertex ([`18:16`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1096), [`19:11`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1151), [`19:32`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1172)).
- If one is uncomfortable with the rounding step, the weaker reading is that the LP is minimized up to very small error ([`19:53`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1193)).

## The derivation

1. `f_λ` is **strictly convex** in `x`, so it has a unique minimizer `x_λ`, characterized by `∇f_λ(x_λ) = 0` — the multivariate analogue of setting the derivative to zero ([`20:10`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1210), [`21:11`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1271)).
2. With the log barrier, `∇f_λ(x) = λc − Aᵀ S(x)⁻¹ 𝟙`, where `𝟙` is the all-ones vector and `S(x)` is the diagonal **slack matrix** with entries `s(x)₁,…,s(x)_m`; `S(x)⁻¹` exists precisely because an interior point has no zero slack ([`22:45`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1365), [`23:23`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1403), [`23:55`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1435)).
3. Dot the zero gradient with `x_λ − x*`: `0 = (λc − AᵀS(x_λ)⁻¹𝟙) · (x_λ − x*)` ([`24:37`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1477), [`25:02`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1502)).
4. Hence `λ·cᵀ(x_λ − x*) = 𝟙ᵀ S(x_λ)⁻¹ A(x_λ − x*)`; the `b` terms cancel, so `A(x_λ − x*) = s(x_λ) − s(x*)` ([`26:10`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1570), [`27:08`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1628), [`27:37`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1657)).
5. Expanding the diagonal product: `Σᵢ ( s(x_λ)ᵢ − s(x*)ᵢ ) / s(x_λ)ᵢ` ([`28:13`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1693), [`28:38`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1718)).
6. **The only inequality used**: every slack vector is non-negative, so `s(x*)ᵢ ≥ 0` and the sum is at most `Σᵢ s(x_λ)ᵢ / s(x_λ)ᵢ = m` ([`28:38`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1718), [`29:19`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1759)).

## The result

- **`cᵀx_λ − cᵀx* ≤ m/λ`** ([`29:42`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1782)).
- Therefore it suffices to run until `λ ≥ m/ε`, i.e. `λ ≈ m · exp(CL)` since `ε` is exponentially small in the precision ([`30:30`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1830), [`30:52`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1852)).
- This fixes the *target* for `λ` but not yet the iteration count, since the step size for `λ` has not been proved ([`30:52`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1852)).
