# 2. An FPTAS for Knapsack by rounding values

## Problem setup

- A knapsack of capacity `W`, and `n` items with weights `w₁…wₙ` and values `v₁…vₙ` [`3:45`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=225).
- Goal: pick a subset with total weight ≤ `W` maximizing total value [`3:45`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=225).

## The starting point: pseudo-polynomial DP

- There is an exact dynamic program running in `O(nV)`, where `V = Σᵢ vᵢ` [`4:28`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=268), [`4:58`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=298).
- This is **not** polynomial time: the running time depends on the *magnitude* of the numbers, not their bit-length. Writing `V` takes only `log V` bits, so the input can be exponentially smaller than `V` [`4:58`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=298).
- Fix: **make `V` small by rounding** [`5:17`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=317), [`3:14`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=194).

## The algorithm

1. Define rounded values `vᵢ′ = ⌊ (n/ε) · vᵢ / v_max ⌋` — i.e. scale by `α = n / (ε·v_max)` and floor to an integer [`5:17`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=317), [`5:47`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=347).
2. Run the exact `O(nV′)` DP on the rounded instance; it returns a set `A` [`5:47`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=347).
3. Output `A` as the solution to the *original* instance [`6:16`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=376).

## Running-time bound

- `V′ ≤ n · maxᵢ vᵢ′`, and since `vᵢ ≤ v_max`, each `vᵢ′ ≤ n/ε` [`6:41`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=401).
- So `V′ ≤ n²/ε`, giving total time `O(nV′) = O(n³/ε)` — polynomial in both `n` and `1/ε`, hence an FPTAS [`6:41`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=401).

## Why the value is preserved

- Pure scaling by a constant changes nothing: every set's value scales by the same factor, so the optimum is unchanged [`8:36`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=516).
- The **floor** is the only source of loss: each item loses at most 1 unit of rounded value, so any set `S` loses at most `|S| ≤ n` [`8:17`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=497), [`9:00`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=540).
- `OPT′ ≥ v′_max ≥ n/ε`, because the item achieving `v_max` alone contributes that much [`7:20`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=440), [`7:47`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=467).
- Hence the loss of at most `n` is at most `ε · OPT′` [`9:00`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=540).

## Formal claim and proof sketch

**Claim.** If the DP on the rounded instance returns `A ⊆ [n]`, then `v(A) ≥ (1 − ε)·OPT` for the original valuation [`9:34`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=574).

Key inequalities, for every set `S` and scaling factor `α = n/(ε·v_max)` [`10:13`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=613), [`10:48`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=648):

```
α·v(S) − |S|  ≤  v′(S)  ≤  α·v(S)
```

Chain of the proof, with `A*` an optimal set for the original instance [`10:48`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=648), [`11:34`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=694):

1. `v(A) ≥ (1/α)·v′(A)` — from the upper inequality [`11:34`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=694).
2. `≥ (1/α)·v′(A*)` — `A` is optimal for the rounded values [`11:51`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=711).
3. `≥ (1/α)·(α·v(A*) − |A*|) = OPT − |A*|/α ≥ OPT − n/α` [`11:51`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=711), [`12:32`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=752).
4. `n/α = ε·v_max` by definition of `α`, and `OPT ≥ v_max`, so the result is `≥ (1 − ε)·OPT` [`13:14`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=794).

## Best known bound for Knapsack

- A different algorithm achieves `O( n·log(1/ε) + 1/ε⁴ )`, due to **Lawler, 1979** [`2:18`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=138), [`2:48`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=168).
- The lecturer searched for post-1979 improvements and found none [`2:48`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=168).
