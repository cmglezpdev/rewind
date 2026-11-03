# 3. Bland's rule — a pivoting rule that terminates

## The problem it solves

- When `v_B > 0` fails (a basic variable is already zero), the optimality case is still fine — a non-negative reduced cost still certifies optimality ([`17:34`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1054)).
- The trouble is the other branch: with some `c̃_j < 0` you must **add `j` to `B` and kick `k` out of `B`**, and it is not obvious which `j` and which `k` ([`18:08`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1088)).
- Careless choices produce an **infinite loop** — the same variables swap back and forth with no progress ([`18:53`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1133)). There may be several `j` with negative reduced cost and several already-zero `v_k` ([`19:05`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1145)).
- Multiple pivoting rules exist; some do not terminate. **Bland's rule does terminate** ([`19:44`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1184)). The proof is left to a link in the course notes ([`19:20`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1160)).

## The rule

**Entering variable `j`** — pick `j` minimizing `c̃_j` among those with `c̃_j < 0`; on ties take the **first** such `j` ([`19:44`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1184)).

**Leaving variable `k`** ([`20:53`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1253), [`21:43`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1303), [`22:35`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1355)):

1. Define `r` with `r_B = 0` and `r_N = c̃_N` (the reduced cost).
2. Define `A' = A_B⁻¹ A` and `b' = A_B⁻¹ b`.
3. Define the ratio `q = min_i { b'_i / A'_{ij} : A'_{ij} > 0 }`.
4. Pick `k` attaining that minimum; on ties take the **first** such `k`.

## Guarantee

- It is provable that this rule **terminates**, and at termination the reduced cost is non-negative — i.e. you land in the optimality case ([`22:35`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1355)).
- Timeline note: simplex dates from 1947; Bland's rule from the 1970s — before that, termination was apparently not a concern people pressed on ([`52:28`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3148)).
