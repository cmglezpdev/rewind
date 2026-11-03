# 11 — Conclusion and Homework 1

## The standard itself

- The SQL standard is a **purchasable document that costs a lot of money**. Companies building databases buy it for their engineers; there are also (offline-discussed) free routes ([`1:15:30`](https://www.youtube.com/watch?v=MzigBKf84aY&t=4530)).

## The closing argument

- Claim stated flatly: **SQL is the most important programming language right now** — "it was here before you were born, it will be here after you die" ([`1:15:30`](https://www.youtube.com/watch?v=MzigBKf84aY&t=4530)).
- Evidence cited: an **IEEE survey (2023)** asking programmers which language matters most — **SQL is always at the top** ([`1:16:00`](https://www.youtube.com/watch?v=MzigBKf84aY&t=4560)).
- Contrast with the CMU CS department's own talent-day poll, where SQL never ranks; the lecturer's opinion is that SQL is "way more important than Standard ML or OCaml" ([`1:16:00`](https://www.youtube.com/watch?v=MzigBKf84aY&t=4560)).

## The unifying purpose of everything shown

All the "modern SQL" tricks share one goal: **do as much computation as possible inside a single SQL query**, instead of round-tripping between application code / terminal and the database server ([`1:16:27`](https://www.youtube.com/watch?v=MzigBKf84aY&t=4587)).

## Homework 1

- Released the day of the lecture ([`0:40`](https://www.youtube.com/watch?v=MzigBKf84aY&t=40), [`1:16:27`](https://www.youtube.com/watch?v=MzigBKf84aY&t=4587)).
- Implement roughly **five SQL queries** in **both SQLite and DuckDB** ([`1:16:27`](https://www.youtube.com/watch?v=MzigBKf84aY&t=4587)).
- The syntax will be *mostly* but **not exactly** the same between the two — you are expected to adapt, not copy verbatim ([`1:17:25`](https://www.youtube.com/watch?v=MzigBKf84aY&t=4645)).
- Recommendation: **start with DuckDB**, then port to SQLite ([`1:17:25`](https://www.youtube.com/watch?v=MzigBKf84aY&t=4645)).
- Set up as a teaser: one of the two will be markedly faster. **DuckDB will be much faster than SQLite** for these queries, and *why* is what the rest of the semester explains ([`1:16:55`](https://www.youtube.com/watch?v=MzigBKf84aY&t=4615)).

## What comes next

- The following class begins the **internals of a database system** — and "we're not talking about SQL ever again" ([`1:16:55`](https://www.youtube.com/watch?v=MzigBKf84aY&t=4615), [`1:17:25`](https://www.youtube.com/watch?v=MzigBKf84aY&t=4645)).
