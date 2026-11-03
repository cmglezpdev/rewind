# 11 — Wrap-up and next steps

## The one-paragraph summary of the lecture

Go from a **SQL query → logical plan → physical plan**. That physical plan can be produced either by **cost-based** search or purely by **rules**. Along the way, rewrite expressions and flatten nested queries. Cost-model estimates come from **summarizations collected from the real data** ([`1:18:42`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4722), [`1:19:09`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4749)).

Pavlo's own caveat: this was a surface-level brain dump of what you must consider when building an optimizer, not a complete treatment ([`1:18:42`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4722)).

## Course-specific notes

- **Project 3** requires touching the query optimizer, but it is **rule-based, not cost-based** ([`1:18:42`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4722)).
- BusTub has no statistics infrastructure ([`1:14:04`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4444)).
- 15-721 is **not** running next semester; instead there's a special topics course, **15-799, entirely on query optimization**. Pavlo's claim: do well in it and you'll have no problem finding a job ([`1:19:22`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4762), [`1:19:34`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4774)).

## Next lecture

**Transactions and concurrency control** — described as the *second* hardest part of database systems (query optimization being the first). The difficulty: reasoning about correctness when the order in which queries are submitted need not be the order in which they run ([`1:19:55`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4795)).
