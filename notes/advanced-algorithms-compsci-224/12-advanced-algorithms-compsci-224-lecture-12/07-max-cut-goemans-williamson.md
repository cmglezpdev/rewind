# 7. Max-Cut and the Goemans–Williamson algorithm

## The problem

- **Input**: an undirected graph `G = (V, E)` [`1:11:46`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4306), [`1:12:16`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4336).
- **Goal**: find a partition `(S, V∖S)` maximizing the number of edges crossing it [`1:12:16`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4336), [`1:12:37`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4357).
- Max-Cut is NP-hard [`1:18:04`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4684).

## Two classic ½-approximations

**1. Random partition** [`1:13:14`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4394), [`1:13:45`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4425):

- Flip a fair coin per vertex. Each edge crosses with probability ½, so in expectation `m/2` edges cross.
- `OPT ≤ m`, hence this is a `2`-approximation (≥ `OPT/2`).

**2. Deterministic local search** [`1:14:09`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4449), [`1:14:36`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4476):

- Start from an arbitrary partition; while some vertex has more neighbours on its own side than the other, swap it.
- Terminates (the crossing count strictly increases each swap); at termination every vertex has ≥ half its neighbours across, giving ≥ `m/2` crossing edges.

**These were the best known for a long time — until Goemans–Williamson** (journal version 1995; the work is earlier) [`1:14:36`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4476), [`1:15:07`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4507).

## The Goemans–Williamson result

- Approximation ratio **0.878** instead of 0.5 [`1:15:07`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4507).
- The constant is

```
min over θ ∈ (0, π] of   (2/π) · θ / (1 − cos θ)
```

  [`1:15:35`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4535).
- The algorithm itself is simple; what was new was **using SDPs to build approximation algorithms**. The paper was highly influential and set off a wave of SDP-based approximation work [`1:15:35`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4535), [`1:16:10`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4570).
- Caveat: just like LPs, **SDPs also have integrality gaps** [`1:16:25`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4585).

## Step 1 — Max-Cut as a quadratic program

```
maximize    Σ_{(i,j) ∈ E}  (1 − xᵢ xⱼ) / 2
subject to  xᵢ ∈ {−1, +1}  for all i
```

[`1:17:03`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4623).

- `xᵢ` encodes which side of the cut vertex `i` is on [`1:17:37`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4657).
- Same side ⇒ `xᵢxⱼ = 1` ⇒ term is `0`; opposite sides ⇒ `xᵢxⱼ = −1` ⇒ term is `2/2 = 1`. So the objective counts crossing edges exactly [`1:17:49`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4669).
- Corollary noted in passing: since Max-Cut is NP-hard, **quadratic programming is NP-hard** [`1:18:04`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4684).

## Step 2 — Relax to an SDP / VP

Replace each quadratic term `xᵢxⱼ` with `vᵢ · vⱼ`: instead of `±1` scalars, use **unit vectors**, with multiplication becoming the dot product [`1:16:44`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4604), [`1:17:03`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4623).

```
maximize    Σ_{(i,j) ∈ E}  (1 − vᵢ · vⱼ) / 2
subject to  vᵢ · vᵢ = 1     for all i
```

[`1:18:27`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4707).

This is solvable efficiently, but the output is unit vectors, not a partition [`1:19:05`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4745).

## Step 3 — Random hyperplane rounding

- Pick a single random vector `r ∈ ℝⁿ` (the `vᵢ` are `n`-dimensional, being columns of `M`) [`1:19:31`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4771).
- Put vertex `i` in `S` if `sign(r · vᵢ) ≥ 0`, otherwise in the other side [`1:20:02`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4802).
- Geometrically: `r` is the **normal** to a random hyperplane; which side of the hyperplane `vᵢ` lands on determines its side of the cut [`1:20:02`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4802), [`1:23:48`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=5028), [`1:24:33`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=5073).

```mermaid
flowchart LR
    A["Graph G"] --> B["Quadratic program<br/>xᵢ ∈ {−1,+1}<br/>(NP-hard)"]
    B -->|"xᵢxⱼ → vᵢ·vⱼ"| C["SDP/VP relaxation<br/>unit vectors vᵢ"]
    C -->|"solve efficiently"| D["unit vectors v₁…vₙ"]
    D -->|"random r ∈ ℝⁿ<br/>sign(r·vᵢ)"| E["cut S / V∖S"]
    E --> F["E[cut] ≥ 0.878 · OPT"]
```

## Where 0.878 comes from

- Expected cut size = `Σ_{(i,j) ∈ E} Pr[ sign(r·vᵢ) ≠ sign(r·vⱼ) ]` [`1:20:33`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4833), [`1:21:06`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4866), [`1:23:22`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=5002).
- `vᵢ` and `vⱼ` span a 2-D plane and both lie on the unit sphere; let `θ` be the angle between them. The hyperplane separates them exactly when it falls in that angular window, so **`Pr[separated] = θ/π`** [`1:21:06`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4866), [`1:21:38`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4898), [`1:21:55`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4915), [`1:24:33`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=5073).
- The relaxation's contribution for that edge is `(1 − vᵢ·vⱼ)/2`, and `vᵢ·vⱼ = cos θ` exactly (both are unit vectors) [`1:21:55`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4915), [`1:22:54`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4974).
- Per-edge ratio:

```
(θ/π) / ((1 − cos θ)/2)  =  (2/π) · θ / (1 − cos θ)
```

  [`1:21:55`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4915), [`1:22:54`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4974).
- The approximation factor is the **infimum of this ratio over all `θ`** — numerically 0.878 [`1:22:54`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4974), [`1:15:35`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4535).
- The lecturer ran out of time and said the rigorous details would be filled in in the course notes [`1:22:54`](https://www.youtube.com/watch?v=2Gl-yNso0_0&t=4974).
