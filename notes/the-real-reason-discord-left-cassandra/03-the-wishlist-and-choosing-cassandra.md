# 03 — The Wishlist That Led to Cassandra

## The five requirements Discord wrote down

Before shopping for a tool, they defined what they needed ([`4:14`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=254), [`4:31`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=271)):

1. **Scale easily** by just adding machines.
2. **Survive failures on its own** — nobody paged at 3:00 AM.
3. **Need very little babysitting**.
4. **Be battle-tested at massive scale**, not experimental.
5. **Be predictable / consistent** — the most important one.

## Why "predictable" outranks "fast"

- A database that is fast most of the time but **randomly slow** is harder to live with than one that is steadily a bit slower ([`4:31`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=271)).
- This requirement is the through-line of the whole story — it is exactly what they finally get years later with ScyllaDB.

## The pick: Apache Cassandra

- Only one database ticked every box: **Apache Cassandra** ([`4:31`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=271)).
- Justification at the time ([`4:55`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=295)):
  - Big names already ran **thousands of Cassandra nodes** in production.
  - It scaled horizontally.
  - It self-healed.
  - It was open source.

## Lesson

> Write the wishlist **first**, then go find the tool. Most teams do it backwards — they fall in love with a tool, then try to justify it ([`4:55`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=295), [`5:10`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=310)).
