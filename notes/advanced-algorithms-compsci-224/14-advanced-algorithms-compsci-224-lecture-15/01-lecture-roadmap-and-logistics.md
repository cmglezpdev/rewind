# 01 — Course logistics and lecture roadmap

## Logistics

- Project proposals are due **next Thursday**; with no time posted on the website, the deadline is taken as 11:59 p.m. that Thursday [`0:00`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=0).
- The final project itself is due in December, on the last day of reading period [`0:26`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=26).
- The proposal exists purely to force early thinking about project ideas; changing projects later is allowed but requires submitting a new proposal [`0:47`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=47).

## Where the course stands

- Previous lectures used linear programming as a black box — "some magic machine that can solve linear programs" — without ever giving an algorithm; this lecture starts filling that gap [`1:21`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=81).
- Immediately preceding material: FKG/PSD-style topics and **SDP integrality gaps**, followed by two guest lectures [`1:21`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=81).

## Plan for "solving LPs"

1. **Simplex** — the algorithm itself [`3:04`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=184).
2. **Strong duality and complementary slackness** — obtained essentially for free from the proof that Simplex works: at halting you can read off a dual feasible solution achieving OPT [`2:07`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=127), [`2:26`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=146), [`3:04`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=184).
3. **Ellipsoid** — a sketch of what it is and roughly how it gives polynomial time [`3:33`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=213).

## The tension that motivates the whole lecture

- Simplex works well in practice, but **all known implementations take exponential time in the worst case**, which is why polynomial-time LP algorithms are also needed [`2:26`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=146), [`2:45`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=165).
