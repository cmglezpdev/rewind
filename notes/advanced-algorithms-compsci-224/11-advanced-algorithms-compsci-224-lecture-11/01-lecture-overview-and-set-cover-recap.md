# 1. Lecture Overview and Set Cover Recap

## Agenda for the lecture

1. Finish the **dual fitting** analysis of the greedy algorithm for (weighted) set cover, plus a second, very simple dual-fitting example: unweighted vertex cover — related to a problem on the homework released that night ([`0:00`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=0)).
2. A **limitation of the whole LP framework** for approximation algorithms, introduced as the *integrality gap* of an LP relaxation ([`0:31`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=31)).
3. **Polynomial time approximation schemes**: not just a 2- or log n-approximation, but a `1 + epsilon` approximation for an epsilon fixed in advance. Sometimes impossible, but an example where it works is shown ([`0:46`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=46)).

## The (weighted) set cover problem

- Input: `m` sets, each a subset of the universe `{1, ..., n}`; set `S` has cost `c_S` ([`1:14`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=74)).
- Goal: pick a sub-collection covering the entire universe while minimizing the sum of the costs of the chosen sets ([`1:39`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=99)).

## The greedy algorithm

- **Unweighted case** (all costs = 1): repeatedly take the set that covers the most new elements ([`1:39`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=99)).
- **Weighted case**: while an uncovered element remains, pick the set minimizing the *price ratio*

  `c_S / (number of new elements S covers)` ([`2:00`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=120)).

- **Theorem**: greedy is a `log n` approximation — and the analysis will actually give something slightly stronger ([`2:00`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=120)).

## History

| Case | Attribution | Year |
| --- | --- | --- |
| Unweighted greedy | Johnson | ~1974 ([`2:33`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=153)) |
| Unweighted, independent (discrete math) | second, uncited author | 1975 ([`2:56`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=176)) |
| Weighted greedy | author whose name the lecturer declined to pronounce | 1979 ([`2:56`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=176)) |

## Why the primal-dual view

- The algorithm was already analyzed in CS 124 without primal-dual; here the point is the primal-dual *lens* ([`3:44`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=224)).
- The lens is not just an analysis convenience: **it helps you invent the algorithm in the first place**, e.g. for the weighted vertex cover problem on the upcoming problem set ([`4:03`](https://www.youtube.com/watch?v=vnS9_NKoEKI&t=243)).
