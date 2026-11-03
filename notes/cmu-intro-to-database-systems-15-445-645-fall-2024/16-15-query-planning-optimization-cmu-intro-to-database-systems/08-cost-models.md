# 08 — Cost models

## What a cost model does

- Predicts the behavior of a query plan for a given **database state**: the hardware, the data, and the system configuration. It emits an internal number used only for relative comparison, because actually running every plan is impossible ([`1:05:50`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3950), [`1:06:13`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3973)).
- Operator formulas alone aren't enough: the runtime cost of a sort-merge join or hash join depends on **what is fed into it**, so you also need predicate selectivity and join output sizes ([`1:03:56`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3836), [`1:04:22`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3862)).

## Two cost components

| Component | Contents |
|---|---|
| **Physical costs** | CPU time, I/O, and at the fine-grained end, expected cache misses per operator. Aggregated and weighted (CPU costs less than disk, etc.) into one number ([`1:06:13`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3973)) |
| **Logical costs** | Expected number of output tuples per operator and the size of those tuples (column count) — which feeds the next operator and informs decisions like early projection ([`1:06:13`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3973), [`1:06:46`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4006)) |

Most systems combine both; high-end enterprise systems lean more on physical costs, while **Postgres uses mostly I/O cost** (SQLite likewise) ([`1:06:46`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4006)).

## How constants get set

- **DB2**: when you turn it on, it runs **micro-benchmarks** to measure your actual CPU, disk, and network speed, and uses those as the constants in its physical cost calculations ([`1:06:46`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4006), [`1:08:45`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4125)).
- **Postgres**: only **relative** magic constants you tune yourself ([`1:07:26`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4046), [`1:07:51`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4071)):
  - `seq_page_cost` defaults to **1**; `random_page_cost` is a multiple of it.
  - Rough defaults quoted: memory is ~**400x** faster than reading from disk; sequential I/O is ~**4x** faster than random I/O.
  - The Postgres documentation carries an explicit warning that these are magic constants you must tune yourself, and that adjusting them can produce wildly different — possibly worse — plans ([`1:08:07`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4087)).

## Constants drift over time

**SSDs get slower as they fill up** — less free room for the garbage collector to move things around. So the parameters that are optimal on an empty disk are wrong when the disk is 90% full. This is precisely why commercial systems re-run micro-benchmarks ([`1:08:26`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4106), [`1:08:45`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4125)).

## Why estimation is a house of cards

- You can't run the real queries to find out — the problem is NP-hard, so running NP-hard queries to pick the best one defeats the purpose ([`1:04:49`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3889)).
- **MongoDB is the exception**: it literally runs the candidate queries and picks whichever comes back first. Workable with no joins; with joins the number of choices explodes and it becomes a bad idea ([`1:04:49`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3889)).
- Estimates compound: bad estimates feed operators that produce worse estimates that feed operators that produce worse ones still — "crap built on crap built on crap." **Beyond three joins the whole thing starts to fall apart** ([`1:05:32`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3932)).
- Pavlo's framing of the lecture: "here's what you can do and here's why it sucks" — the problem is not solved ([`1:04:49`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3889), [`1:05:32`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3932)).
