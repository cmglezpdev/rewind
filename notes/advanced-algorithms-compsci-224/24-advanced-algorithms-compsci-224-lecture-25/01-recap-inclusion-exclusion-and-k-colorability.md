# 1. Recap: inclusion–exclusion and the k-colorability formula

## Plan for the lecture

- Finish **faster exponential-time algorithms in small space** — specifically inclusion–exclusion, the **zeta transform** and **Möbius inversion** [`0:00`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=0).
- Then switch, for the rest of this class and the next, to **streaming and sketching** — the lecturer's own research area [`0:38`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=38).

## The inclusion–exclusion fact (proved last time)

- For all sets `R ⊆ T`: `Σ_{R ⊆ S ⊆ T} (−1)^{|T − S|} = [R = T]` [`1:25`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=85).
- Notation convention: a Boolean expression in brackets is **1 if true, 0 otherwise** [`1:25`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=85).

## The zeta transform

- For `f` mapping sets into some **ring**, the zeta transform is `f̂(S) = Σ_{R ⊆ S} f(R)` [`2:07`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=127).

## Last lecture's k-coloring claim

- Let `f(S) = [S is a non-empty independent set in G]` [`2:59`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=179).
- **Claim**: `G` is `k`-colorable **iff** `Σ_{S ⊆ V} (−1)^{|V − S|} · f̂(S)^k > 0` [`3:29`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=209), [`4:19`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=259).
- The scribe notes contain the direct inclusion–exclusion proof; the lecture instead **derives** the formula as a special case of something more general, because deriving is harder (and more useful) than verifying [`4:46`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=286), [`5:01`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=301).

## Known bounds for computing the transform

| Bound | Space | Source |
|---|---|---|
| `O*(3^n)` time | poly(n) | brute force / this lecture [`5:33`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=333) |
| `O*(2^n)` time | `O*(2^n)` | Yates's algorithm [`5:33`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=333) |
| `O*(2.2461^n)` time | poly(n) | Björklund–Husfeldt–Koivisto (FOCS '06) [`6:40`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=400) |

- Two **independent** papers published at the same time give the `O*(2^n)`-style results: Björklund–Husfeldt (FOCS '06) and Koivisto (FOCS '06) — the second name is garbled as "Kowalczyk" in the auto-transcript [`6:05`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=365), [`6:40`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=400).
- **Open problem**: achieve roughly `2^n` time with **polynomial space** [`7:16`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=436).
