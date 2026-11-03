# 6. Proof of the general MW theorem

Same recipe as before: **upper-bound `Φ`, lower-bound `Φ`, compare, take logs** [`50:30`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=3030) [`50:48`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=3048).

## Upper bound

Starting from `Φ(t+1) = Σᵢ wᵢ(t+1)` and plugging in the update [`51:11`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=3071) [`51:38`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=3098):

1. `Φ(t+1) = Σᵢ wᵢ(t)·(1 − ε·mᵢ(t))` (after distributing) [`51:38`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=3098)
2. `= Φ(t) − ε·Σᵢ wᵢ(t)·mᵢ(t)` [`52:10`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=3130)
3. Substituting `wᵢ(t) = pᵢ(t)·Φ(t)` [`52:10`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=3130):
   `= Φ(t)·(1 − ε·⟨m(t), p(t)⟩)` [`53:09`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=3189)
4. The favourite trick `1 − x ≤ e^{−x}` again: `≤ Φ(t)·e^{−ε⟨m(t),p(t)⟩}` [`53:09`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=3189)
5. By induction from `Φ(1) = n`:
   **`Φ(T+1) ≤ n · e^{−ε·Σ_t ⟨m(t), p(t)⟩}`** [`54:06`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=3246)

## Lower bound

- Again `Φ(T+1) ≥ wᵢ(T)` for any fixed expert `i` [`54:50`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=3290).
- Unrolling the update: `wᵢ(T) = Π_{t=1}^{T} (1 − ε)^{mᵢ(t)}` [`56:11`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=3371).
- Splitting by sign of `mᵢ(t)` gives [`57:39`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=3459) [`1:00:28`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=3628):

  ```
  wᵢ(T) ≥ (1 − ε)^{Σ_{mᵢ(t) ≥ 0} mᵢ(t)} · (1 + ε)^{−Σ_{mᵢ(t) < 0} mᵢ(t)}
  ```

## The two calculus claims

Stated as "calculus claims" and used without full derivation [`58:23`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=3503) [`59:15`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=3555):

| Claim | Range |
| --- | --- |
| `(1 − ε)^x ≤ 1 − εx` | `x ∈ [0, 1]` |
| `(1 + ε)^{−x} ≤ 1 − εx` | `x ∈ [−1, 0]` |

- **Cleaner proof than Taylor:** `f(x) = (1 − ε)^x` is convex (check the second derivative is positive), so `f((1−x)·0 + x·1) ≤ (1−x)·f(0) + x·f(1)` — which is exactly the claim. The lecturer notes his earlier Taylor's-theorem route was "a little clumsy" [`59:15`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=3555) [`59:42`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=3582) [`1:00:02`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=3602).

## Combining

Chaining both bounds [`1:01:06`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=3666) [`1:01:24`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=3684):

```
(1 − ε)^{Σ_{≥0} mᵢ(t)} · (1 + ε)^{Σ_{<0} mᵢ(t)}  ≤  n · e^{−ε·Σ_t ⟨m(t), p(t)⟩}
```

Take logs and rearrange — the theorem follows, with no further ideas involved. The lecturer skips the algebra and points to the paper/notes [`1:01:53`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=3713).
