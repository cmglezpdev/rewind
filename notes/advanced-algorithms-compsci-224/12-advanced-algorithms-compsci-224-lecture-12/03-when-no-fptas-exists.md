# 3. When no FPTAS exists — hardness and strong NP-hardness

## Not every problem admits an approximation scheme

- **Set cover**: you cannot beat a `log n` approximation. This is not merely an integrality-gap obstruction — there is a proof that beating it would let you solve SAT unexpectedly fast [`14:25`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=865).
- **Vertex cover**: a fixed constant `> 1` is known such that, unless P = NP, you cannot beat that ratio; more recent evidence (under a conjecture) suggests you cannot beat the factor-2 approximation at all [`14:25`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=865), [`14:54`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=894).
- Sometimes, though, the obstruction is much simpler than these hardness-of-approximation results [`14:54`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=894).

## Bin packing — the easy counterexample

**Input**: `n` items with sizes `s₁…sₙ ∈ [0,1]`; bins have capacity exactly 1; pack all items into as few bins as possible, without cutting items [`15:14`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=914), [`16:01`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=961), [`16:44`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1004).

**Known hardness**: bin packing is NP-hard, and even the decision problem "can these items fit into 2 bins?" is NP-complete [`16:44`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1004).

**No FPTAS unless P = NP** [`18:32`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1112):

1. Suppose an FPTAS exists, returning a packing with at most `(1+ε)·OPT` bins in time poly(`n`, `1/ε`) [`17:12`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1032), [`17:50`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1070).
2. Run it with `ε ≪ 1/n`. The additive error in the number of bins is then less than 1 [`18:32`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1112).
3. The number of bins is an **integer**, so an answer of e.g. "2.2 bins" pins the truth down to exactly 2 [`18:32`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1112).
4. That solves the NP-complete 2-bin decision problem in polynomial time [`18:32`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1112).

## Terminology

- A problem with no FPTAS (under P ≠ NP) for this kind of reason is called **strongly NP-hard** [`19:22`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1162).

## The dual question: why doesn't this argument kill Knapsack?

An audience question raised the same integrality objection for Knapsack, whose optimum is also an integer when values are integers [`30:51`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1851), [`31:09`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1869):

- Naive attempt: `OPT ≤ n·v_max`, so set `ε ≪ 1/(n·v_max)`, run the FPTAS, round to an integer [`31:34`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1894).
- **Why it fails**: writing `v_max` takes only `log v_max` bits, so `1/ε` is exponential in the input size — poly(`1/ε`) is not polynomial in the input [`32:03`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1923).
- The same escape applies to DNF counting: a DNF of size `n` can have exponentially many solutions, e.g. `x₁ ∨ x₂ ∨ … ∨ xₙ` has `2ⁿ − n` satisfying assignments (only the all-false-ish cases fail), so a small enough `ε` would be exponentially expensive [`32:03`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1923), [`32:42`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=1962).
