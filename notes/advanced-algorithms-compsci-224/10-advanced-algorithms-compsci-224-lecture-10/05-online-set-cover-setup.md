# 5. Online set cover: problem, hardness, and LPs

## Problem definition

- Universe of elements `{1, …, n}`; `m` sets `S_1, …, S_m`, each a subset of the universe ([`31:05`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=1865), [`31:52`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=1912)).
- Goal: pick a subcollection whose union covers the universe, **minimizing the number of sets taken** (clarified after an audience question about the optimality criterion) ([`31:52`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=1912), [`35:43`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2143), [`36:09`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2169)).

## What makes it online

- `m` is known up front, but **nothing about the sets' contents is known** ([`32:35`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=1955)).
- Elements arrive one at a time; on arrival you are told which sets contain that element, and if none of them is already picked you must **immediately pick one** ([`32:54`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=1974), [`33:15`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=1995)).

## Hardness backdrop

- Set cover is **NP-hard**, so no polynomial-time exact algorithm is expected ([`34:02`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2042)).
- It is also **hard to approximate**: even offline, beating a **log n approximation** is hard ([`34:24`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2064), [`34:49`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2089)).
- Consequence: an **efficient** online algorithm should not be expected to beat a log n competitive ratio, since that would imply a better offline algorithm ([`36:09`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2169)).

## What will be proved

- An online **`O(log n · log m)`-competitive** algorithm, due to **Alon, Awerbuch, Azar, Buchbinder and Naor, SICOMP '09** ([`30:18`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=1818), [`31:05`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=1865), [`36:09`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2169)).
- The **same algorithm** is analyzed twice: first a purely **primal** proof, then a **primal-dual** proof ([`36:43`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2203)).

## The LP relaxation

**Primal** — one variable `x_S` per set ([`37:06`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2226), [`37:57`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2277)):

- minimize `Σ_{S ∈ C} x_S`
- subject to `Σ_{S ∋ i} x_S ≥ 1` for every element `i`, and `x ≥ 0` ([`38:39`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2319))
- Integrality **cannot** be enforced — that would make it integer programming, which is NP-hard (3-SAT encodes into it) ([`38:19`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2299)).
- An `x_S ≤ 1` constraint is unnecessary: no optimal solution exceeds 1 ([`38:39`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2319)).

**Dual** — one variable `y_i` per element ([`39:21`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2361)):

- maximize `Σ_{i=1..n} y_i`
- subject to `Σ_{i ∈ S} y_i ≤ 1` for every set `S`, and `y ≥ 0` ([`39:21`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2361), [`39:58`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2398)).
