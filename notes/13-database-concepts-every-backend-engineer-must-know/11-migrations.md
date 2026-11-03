# 11 — Migrations

- Context: in a team, the database schema constantly evolves — people add tables, remove things, change the schema [`9:48`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=588).
- Solution: manage schema changes over time with **versioned scripts kept in git**, just like normal source code [`10:26`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=626).
- Example evolution [`10:26`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=626):
  - **v1** — `users` table with only `id` and `name`.
  - **v2** — add `email` to `users`.
  - **v3** — add a new `orders` table.
- Benefit: you can **track the evolution of the database** across versions; the alternative — one giant SQL file — "doesn't work" [`10:26`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=626).
