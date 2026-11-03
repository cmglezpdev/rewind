# 06 — Final System Design Takeaways

## All three were right

- Netflix, Instagram and Twitter made **different database choices and all were correct** ([`10:03`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=603))
- They were not picking the *best database* — they were picking the **best database for their specific access pattern** ([`10:03`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=603))

## The real system design skill

- It is **not memorizing which database is fastest or most scalable** ([`10:03`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=603))
- It is understanding **your data, your queries, your trade-offs**, then matching them to the right tool ([`10:19`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=619), [`10:24`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=624))

## Summary table

| Company | Database | Driving access pattern | Accepted trade-off |
|---|---|---|---|
| Netflix | Cassandra | 3M+ writes/sec, key-based reads | No joins, aggressive denormalization |
| Instagram | PostgreSQL | Read-heavy relational queries | Requires heavy scaling engineering (pooling, replicas, partitioning, indexing) |
| Twitter | Redis (cache) + durable store | Instant pre-computed timelines | Redis is not durable; hybrid fan-out needed for celebrities |

## Outro

- The author points to a system design master course covering these architectural patterns in more depth with hands-on examples ([`10:24`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=624))
