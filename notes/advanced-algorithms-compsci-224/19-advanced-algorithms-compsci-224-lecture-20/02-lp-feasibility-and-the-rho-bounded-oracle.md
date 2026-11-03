# 2. LP feasibility and the ρ-bounded oracle

The reduction target: instead of solving a linear program directly, reduce it to repeatedly answering a *single-constraint* relaxation, handled by an oracle.

## The problem being solved

- Decide feasibility of: does there exist `x ∈ P` with `Ax ≥ b`, where `P` is a convex set and `A` is an `m × n` matrix ([`5:43`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=343), [`6:29`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=389)).
- Only feasibility is treated; optimization is recovered later by binary searching on the objective value ([`32:44`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1964)).

## The relaxed subproblem (⋆)

For a probability vector `p`, ask: does there exist `x ∈ P` with `pᵀAx ≥ pᵀb`? ([`6:29`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=389), [`8:47`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=527))

- Key observation: if the original `m`-constraint problem is feasible, so is (⋆) — take a feasible `x` and multiply both sides by `pᵀ`, using non-negativity of `p` ([`9:12`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=552)).
- Contrapositive: if the oracle reports (⋆) infeasible, the original LP is infeasible ([`19:30`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1170)).
- Intuition for why this is easier: (⋆) has **one** constraint (plus membership in `P`), the original has `m` ([`14:30`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=870)).

## Definition: ρ-bounded oracle

An algorithm that, given `P`, `A`, `b`, and the probability vector `p` ([`9:35`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=575)):

- If (⋆) is feasible, it outputs an `x` satisfying (⋆) **and** additionally `|aᵢ·x − bᵢ| ≤ ρ` for all `i` ([`7:25`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=445)).
- Otherwise it outputs `infeasible` ([`7:25`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=445)).
- The extra `ρ` promise is a strengthening: the oracle must not return just *any* feasible `x`, but one with bounded constraint violation magnitude ([`30:52`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1852)).

## What ρ does and does not say

- The bound is on **absolute value**, so it says nothing about which side of the constraint `aᵢ·x` falls on; the returned `x` need not be feasible for the original LP ([`9:57`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=597), [`10:41`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=641), [`11:01`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=661)).
- `ρ` is the price paid in running time: a badly-shaped polytope forcing a large `ρ` means multiplicative weights must run more iterations ([`13:02`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=782), [`13:39`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=819)).
- Notation warning: capital `P` is the convex set, lowercase `p` is the probability distribution over experts ([`14:01`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=841)). Because `ρ` looks like `p` on the board, it is renamed `γ` mid-proof ([`20:51`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1251)).
