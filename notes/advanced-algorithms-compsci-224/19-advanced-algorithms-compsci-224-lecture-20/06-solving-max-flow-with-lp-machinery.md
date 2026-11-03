# 6. Solving max flow with LP machinery

Since max flow is an LP, all the general solvers apply. This section walks the menu and the running times each one yields.

## Simplex and ellipsoid

- **Simplex**: no pivot rule is known to be guaranteed polynomial-time ([`55:54`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3354)).
- **Ellipsoid**: polynomial time, but the iteration count depends on precision — roughly `poly(n)` times a polylog in the largest capacity ([`55:54`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3354), [`56:32`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3392), [`56:50`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3410)).

## Interior point methods (the one covered in class)

- Iteration count: `Õ(√m · L)`, with `L` absorbing precision/log factors ([`57:24`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3444)).
- Each iteration is one **Newton step**: `x₁ = x₀ − H⁻¹∇f`, i.e. apply the inverse Hessian to the gradient ([`58:03`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3483), [`58:39`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3519)).
- For LPs the Hessian has the form `Aᵀ S(x)⁻² A` (slack-weighted), so a Newton step is equivalently `H(x₁ − x₀) = v` — a **linear system solve** ([`59:10`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3550), [`59:52`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3592)).
- Generic cost: `√m` iterations × `m³` (or `m^ω`) per solve × `L` ⇒ about **`O(m^{7/2} L)`**, i.e. `m^3.5` ([`1:00:31`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3631), [`1:03:16`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3796)).
- For flow problems `L` can always be made polylog in the maximum capacity `U` ([`1:00:55`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3655)).

## The improvements that exploit flow structure

The linear system solves dominate the cost, and for flow they are not arbitrary systems ([`1:00:55`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3655), [`1:01:25`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3685)):

- **Daitch–Spielman (STOC 2008)**: `Õ(m)` time per linear system solve when `A` comes from a flow problem — essentially Laplacian system solvers ([`1:01:44`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3704), [`1:02:28`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3748)). The `m³` term collapses to `Õ(m)`, giving an overall **`m^{3/2} · log²U`** max-flow algorithm (and other flow problems too) ([`1:02:43`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3763), [`1:03:16`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3796)).
- **Lee–Sidford weighted barrier**: the standard barrier `Σ log(slack_i)` weights every constraint equally, which is odd — duplicating a constraint over-counts it even though it matters once. Reweighting turns the `√m` iteration count into `√n` for max flow, yielding an **`m√n`** algorithm instead of `m√m` (and `m` can be as large as `n²`) ([`1:03:46`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3826), [`1:04:12`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3852), [`1:04:39`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3879)).

## Summary of bounds

| Method | Running time | Reference |
|---|---|---|
| Generic IPM | `O(m^{3.5} L)` | [`1:00:31`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3631) |
| IPM + Daitch–Spielman solvers | `m^{3/2} log² U` | [`1:02:43`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3763) |
| Lee–Sidford weighted IPM | `m√n` | [`1:04:39`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3879) |
| Ford–Fulkerson (combinatorial) | `O(m · f*)` | [`1:05:32`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3932) |
