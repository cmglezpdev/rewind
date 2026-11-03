# 1. Lecture roadmap

What this lecture sets out to cover, in order.

## Agenda

- **Analysis of the MARK algorithm** — the randomized paging algorithm achieving a `log K` competitive ratio, where `K` is the cache size ([`0:05`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=5)).
- **The online primal-dual framework** — a generic recipe for designing *and* analyzing online algorithms, developed by Buchbinder and Naor ("bookbinder and naor" in the audio), c. 2005 ([`0:40`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=40)).
- Target results announced up front:
  - `2·H_K` competitiveness for randomized paging (MARK) ([`0:40`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=40)).
  - Ski rental re-derived in primal-dual language — the same `2`-competitive algorithm from last lecture, restated as a warm-up exercise in the new vocabulary ([`1:11`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=71)).
  - Randomized ski rental beating `2`, reaching `e/(e-1)` ([`1:11`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=71)).
  - **Online set cover** ([`2:26`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=146)).

## Attributions and caveats mentioned

- The `e/(e-1)` randomized ski rental bound is **not** due to Buchbinder–Naor; it was already known from Karlin and others. The primal-dual framework just makes it fall out more naturally ([`2:09`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=129)).
- Online set cover setup: `m` sets known only by name (set 1 … set m); items arrive one at a time; each arriving item must be covered immediately, buying a set if it is not already covered; compare total cost to OPT ([`2:26`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=146), [`2:52`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=172)).
- Prerequisite check with the room: set cover and linear programming were both covered in CS124, so brief recaps are promised for both ([`3:05`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=185), [`3:30`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=210)).
- The whole online primal-dual approach is built around linear programming formulations of problems — hence the LP recap has to come first ([`3:51`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=231)).

## What actually got covered

Time ran out before the randomized `e/(e-1)` algorithm and online set cover; both were deferred to the next lecture ([`1:24:01`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=5041)).
