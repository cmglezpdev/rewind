# 06 — Output control and redirection

Covered quickly and explicitly **skipped as non-essential for Homework 1**, with half an hour of class remaining ([`41:41`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2501)).

## Output redirection

- Query results do **not** have to travel back to the client (terminal or application code) — the system can write them into another table instead ([`41:41`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2501)).
- `SELECT ... INTO <table>` stores the result set into a target table ([`42:10`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2530)).
- **MySQL** can create the destination table on the fly: because SQL is **declarative**, the system already knows the types of the accessed data and can infer the schema ([`42:10`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2530), [`42:22`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2542)).
- **PostgreSQL** creates temporary tables this way by placing the `INTO` clause immediately **before the `FROM`** ([`42:22`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2542)).

## Output control

- `DISTINCT` and `ORDER BY` (one or many columns) behave as expected ([`42:36`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2556)).
- `LIMIT` returns the first *n* records; combined with an offset it produces **jumps** ([`42:36`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2556)).
- This is exactly the mechanism behind **web pagination** — search results showing 10 at a time, "next" fetching the next 10 ([`42:36`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2556)).
- Additional clauses exist for handling **ties** ([`42:59`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2579)).
