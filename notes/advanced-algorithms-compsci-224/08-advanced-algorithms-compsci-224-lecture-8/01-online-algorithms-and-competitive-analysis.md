# 1. Online algorithms and competitive analysis

## The online setting

- The input is a **sequence of requests** `σ = σ₁, σ₂, …, σ_m` revealed one at a time; the algorithm knows only what it has seen so far, never the future ([`1:28`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=88)).
- Each request can be satisfied in many ways, and each way has a **cost**; the decision must be made irrevocably before the rest of the sequence is known ([`2:38`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=158)).
- The goal is stated informally as "don't regret your decisions": at the end of the sequence you should not have spent much more than an omniscient being who knew the future — the **best in hindsight** ([`2:19`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=139), [`3:21`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=201)).
- Motivating analogy: a portfolio manager who made less money than last year's manager can defend himself by showing he was competitive with the best anyone could have done *this* year, even with foreknowledge ([`3:53`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=233)).

## Formal definition

- `A` = the online algorithm making decisions; `OPT` = an algorithm making the best decisions **while knowing the future** ([`4:54`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=294)).
- **Definition.** `A` is **r-competitive** if for all request sequences `σ`:

  `cost_A(σ) ≤ r · cost_OPT(σ) + (additive term)` ([`5:55`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=355))

- The additive constant matters: it lets the bound ignore bounded start-up costs.
- This framework is called **competitive analysis**, introduced by **Sleator and Tarjan** — a different paper from the splay-trees one, but the same year (at least in journal versions) ([`5:55`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=355), [`6:34`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=394)).

## Lecture plan

- Two toy examples first (ski rental, "free pizza"), then the two problems Sleator and Tarjan actually studied: **list update** and **paging** ([`6:34`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=394), [`19:11`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1151)).
