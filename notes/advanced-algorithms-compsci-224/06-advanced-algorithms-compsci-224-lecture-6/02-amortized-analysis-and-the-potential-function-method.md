# 2. Amortized analysis and the potential function method

## Definition of amortized cost

- Setting: a data structure supports operations A, B, C. Their amortized costs are `t_A`, `t_B`, `t_C` if **any** sequence of `n_A` A-operations, `n_B` B-operations and `n_C` C-operations takes total time at most `n_A·t_A + n_B·t_B + n_C·t_C` [`2:03`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=123), [`3:08`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=188).
- Contrast with worst case: a red-black tree searches in `O(log n)` worst case. Saying searches take `O(log n)` **amortized** only means that `k` searches together cost at most `k·log n` [`3:52`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=232), [`4:07`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=247).
- Individual operations may be expensive — even linear time — as long as the running total respects the bound [`4:07`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=247), [`4:23`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=263).

## The potential function method

Requirements on the potential function `Φ` [`5:00`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=300), [`5:38`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=338):

- `Φ` maps the **state space** of the data structure to the non-negative reals.
- `Φ(empty data structure) = 0`.

Setup [`7:08`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=428), [`7:26`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=446):

- Perform `k` operations with **actual** running times `t_1, …, t_k`.
- States `S_0` (before anything) through `S_k`, where `S_i` is the state after operation `i`.
- **Amortized cost of operation i** := `t_i + Φ(S_i) − Φ(S_{i−1})`.

## Why it is a valid upper bound

The proof is a telescoping sum [`8:59`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=539), [`9:34`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=574), [`9:57`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=597):

```
Σ_i (t_i + ΔΦ_i) = Σ_i t_i + Φ(S_k) − Φ(S_0)
                 = Σ_i t_i + Φ(S_k)          (since Φ(S_0) = 0)
                 ≥ Σ_i t_i                    (since Φ ≥ 0)
```

- Therefore bounding the per-operation cost by `t_i + ΔΦ` yields a correct upper bound on the true total cost [`9:57`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=597).
- To quote a bound for one *type* of operation (insert, delete, search), take the **worst case of `t_i + ΔΦ` over all instances of that operation type** [`10:27`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=627).
- Only these two conditions — `Φ(∅) = 0` and `Φ ≥ 0` — are needed for the whole argument to work [`1:18:47`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4727), [`1:19:19`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=4759).
