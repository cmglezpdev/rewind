# 6. The purely primal analysis of online set cover

## The algorithm — continuous multiplicative growth

- Initialize **`x_S = 1/m` for every set** ([`41:37`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2497)).
- When element `i` arrives and its constraint `Σ_{S ∋ i} x_S ≥ 1` is **not** satisfied, run a continuous-time process on exactly the sets containing `i` (call them `S_{j1}, …, S_{jr}`) governed by the differential equation ([`42:20`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2540), [`43:00`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2580), [`43:50`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2630)):

  `dx_S(t)/dt = x_S(t)`

- Run it until the constraint becomes satisfied (tight) ([`43:50`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2630)).
- Solution to the ODE: after `t` time units each `x_S` is **multiplied by `e^t`** ([`44:51`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2691)).
- The lecturer notes this could have been stated as "multiply by `e^t` for the smallest satisfying `t`", but the continuous-time view **makes the analysis clearer** and generalizes to fancier covering LPs ([`45:32`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2732), [`45:49`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2749)).

## Primal feasibility

- Immediate: evolution runs until each constraint is satisfied, and nothing goes negative ([`46:11`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2771)).

## Bounding the total evolution time against OPT

1. When a constraint is violated, **OPT satisfies it**, so at least one set containing `i` is in OPT's solution — every evolution step grows some set that OPT owns ([`46:30`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2790), [`47:07`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2827)).
2. Each `x_S` starts at `1/m` and evolution only happens while the constraint is unsatisfied, meaning that `x_S < 1`. Growing from `1/m` to `1` at rate `e^t` takes **`ln m` seconds**, so **no set in OPT evolves for more than `ln m` seconds** ([`47:56`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2876), [`48:28`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2908)).
3. Therefore the **total evolution time over the whole run is at most `OPT · ln m`** ([`49:10`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2950)).

## Turning time into cost

- The derivative of the primal objective w.r.t. time is `Σ_j dx_{S_j}/dt = Σ_j x_{S_j}(t)` — only the evolving variables move ([`49:42`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=2982), [`50:14`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=3014), [`50:53`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=3053)).
- But that sum is **< 1** during evolution — otherwise the constraint would already be satisfied and we would not be evolving ([`50:53`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=3053), [`51:17`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=3077)).
- The objective starts at `m · (1/m) = 1` and grows by **at most 1 per time unit** ([`51:17`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=3077), [`51:49`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=3109)).
- Hence the final fractional primal objective is **`≤ OPT · ln m`** (the board says "log n" at this moment, but the quantity bounded throughout is `ln m`, as restated at [`1:00:40`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=3640)) ([`51:49`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=3109), [`52:18`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=3138)).

## Optimality of the bound, and the remaining gap

- The same paper shows you **cannot do better than this by more than log log factors** — up to `log log`, this is the right answer ([`52:18`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=3138), [`52:53`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=3173)).
- Closing the remaining `log log` gap is suggested as a **final-project topic** ([`52:53`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=3173)).
- Still unresolved: the solution is **fractional**; an actual set must be taken at each step ([`53:10`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=3190)).
