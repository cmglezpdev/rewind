# 6. Choosing Weights: O(log n) and Static Optimality

Everything follows from the master bound of the previous section:

> **amortized cost of `splay(x)` = O(1 + log(W / s(x)))**, `W` = total weight [`1:14:03`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4443).

The weights were left arbitrary precisely so that **different weight functions yield different properties** [`1:14:03`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4443), [`1:25:24`](https://www.youtube.com/watch?v=LbX51mey3vo&t=5124).

## Weight choice 1 — uniform: the O(log n) bound

- Set `w(x) = 1` for every `x` [`1:14:36`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4476).
- Then `W = n` and `s(x) ≥ 1`, so `log(W/s(x)) ≤ log n`.
- **Result: amortized cost of `splay(x)` = O(log n)** — a one-line corollary [`1:14:36`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4476).

## Weight choice 2 — exponential in depth: static optimality

### Framing

- The proof shown is **David Epstein's**, which the lecturer says he saw on Epstein's LiveJournal rather than in any paper; it is chosen because it **avoids defining entropy** [`1:15:57`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4557), [`1:17:57`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4677), [`1:18:18`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4698).
- The original Sleator–Tarjan phrasing goes through **Shannon entropy**: treating the fraction of accesses to item `i` as its probability, the optimal static tree is essentially **Huffman coding**, and its running time is proportional to the entropy — Sleator & Tarjan showed splay trees hit the **entropy bound** [`1:15:57`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4557), [`1:16:54`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4614), [`1:17:28`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4648).
- Setting: `n` fixed items, **no insertions**, only repeated finds; the comparison tree `T` is fixed [`1:17:28`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4648).

### Setup and weights

- Let `T` be any fixed BST placing item `i` at level `L_i` [`1:15:57`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4557).
- Define **`w(i) = 1 / 3^{L_i}`** [`1:18:18`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4698).
- If `find(i)` is called `m_i` times (total `m` operations), the cost of servicing the sequence with `T` is **O(m + Σ_{i=1..n} m_i · L_i)**, since a find in `T` costs `L_i` [`1:18:59`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4739), [`1:19:45`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4785).

### Result proved

> Splay trees achieve **O(m + n² + Σ_{i=1..n} m_i · L_i)** [`1:19:45`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4785).

- The splay tree may start in **any** arbitrary BST configuration; the `n²` is the one-time price of that arbitrary start. Once `m` is large enough, the structure **behaves like the optimal tree** [`1:20:31`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4831).
- A slightly different weight shrinks the `n²` term (the lecture cites roughly `n log n log log n`); in the original entropy-based Sleator–Tarjan analysis the extra term **disappears altogether**, giving the bound up to a constant. The `1/3^{L_i}` version is presented purely as the more intuitive one [`1:20:58`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4858), [`1:18:18`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4698).

### The two pieces of the proof

**(a) Bounding the potential swing by `n²`** [`1:21:30`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4890), [`1:22:26`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4946):

- Summed over the sequence: `actual time = amortized time + Φ_initial − Φ_final` (the tree does **not** start empty).
- Worst-case rank of a node: `T` might be a path, so some `L_i` can be `n`, making `log(1/3^{L_i}) ≈ −n`; best case is the root, giving `log 1 = 0` [`1:22:43`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4963), [`1:23:11`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4991).
- Each of `n` nodes contributes between `−n` and `0`, so **`Φ ∈ [−n², 0]`** and cannot change by more than `n²` [`1:23:11`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4991), [`1:23:37`](https://www.youtube.com/watch?v=LbX51mey3vo&t=5017).

**(b) Bounding the amortized cost of `find(i)` by `O(1 + L_i)`** [`1:23:54`](https://www.youtube.com/watch?v=LbX51mey3vo&t=5034), [`1:24:28`](https://www.youtube.com/watch?v=LbX51mey3vo&t=5068):

- The total weight is a **constant**: at most `2^L` nodes sit at level `L`, so
  `W ≤ Σ_L 2^L · (1/3^L) = Σ_L (2/3)^L`, a **convergent geometric series** [`1:24:28`](https://www.youtube.com/watch?v=LbX51mey3vo&t=5068), [`1:24:51`](https://www.youtube.com/watch?v=LbX51mey3vo&t=5091).
- Since `s(i) ≥ w(i) = 1/3^{L_i}`, the master bound gives `O(1 + log(3^{L_i})) = **O(1 + L_i)**` — exactly what was wanted [`1:25:24`](https://www.youtube.com/watch?v=LbX51mey3vo&t=5124).

## Closing point

- Static optimality is only **one** property; many others fall out of the same machinery by **choosing the weight function appropriately** [`1:25:24`](https://www.youtube.com/watch?v=LbX51mey3vo&t=5124).
- Audience question on compression: the static-optimal bound being the entropy is exactly the connection to compression, though the lecturer is not aware of a coding application that changes its encoding via splay trees [`1:25:54`](https://www.youtube.com/watch?v=LbX51mey3vo&t=5154).
