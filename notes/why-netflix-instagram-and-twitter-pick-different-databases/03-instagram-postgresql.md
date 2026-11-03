# 03 — Instagram and PostgreSQL: Relational Access Patterns

## The problem: everything is a relationship

Instagram's core operations are **highly relational queries** ([`3:49`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=229)):

- Show a feed of posts from people you follow — requires **joining posts with follow relationships** ([`3:31`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=211), [`3:49`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=229))
- Load a profile with post count and follower count — requires **aggregating counts across multiple record types** ([`3:31`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=211), [`3:49`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=229))
- User search ([`3:31`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=211))
- Comments sorted by time or popularity — requires **sorting and pagination** ([`3:31`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=211), [`3:59`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=239))
- Likes, follows and DMs ([`3:31`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=211))

## The choice: PostgreSQL, for over a billion users

- Instagram ran its **entire backend on PostgreSQL for years** with over a billion users ([`3:59`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=239))
- The workload is **read heavy** — people scroll far more often than they post ([`4:16`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=256))
- The queries they need are exactly Postgres' strengths: **joins, aggregation, complex filtering, sorted pagination** ([`4:16`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=256))

## The counterfactual: what Cassandra would have cost them

- Every possible query pattern would have to be **pre-computed and denormalized** ([`4:16`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=256))
- The feed → a separate materialized table ([`4:16`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=256))
- Search → another table; follower counts → pre-aggregated in yet another table ([`4:37`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=277))
- Every new product feature that queries data differently means **building a new denormalized pipeline**; with Postgres, you just write a new query ([`4:37`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=277), [`4:53`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=293))

## How they actually scaled Postgres

Running Postgres at this scale is **not trivial** — it was not a single `db.r5.large` ([`4:53`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=293)). The combination used:

| Technique | Purpose |
|---|---|
| **Connection pooling (PgBouncer)** | Handle thousands of concurrent connections without overwhelming Postgres ([`4:53`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=293)) |
| **Read replicas** | Distribute read traffic across multiple instances ([`4:53`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=293)) |
| **Partitioning** | Split massive tables into manageable chunks ([`5:20`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=320)) |
| **Smart indexing** | Ensure common queries hit indexes and never do full table scans ([`5:20`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=320), [`5:28`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=328)) |

## The lesson

- You can stretch **any database far beyond its intended limits with good engineering** ([`5:28`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=328))
- High user count alone does **not** justify reaching for distributed NoSQL ([`5:28`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=328))
- If your access patterns are relational, **use a relational database and invest in making it scale** ([`5:28`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=328))

## Important nuance: Postgres is not used for everything

- Messaging, real-time notifications and the analytics pipeline all run on **different storage systems optimized for those patterns** ([`5:47`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=347))
- The win is that they did **not prematurely abandon Postgres for their core use case** just because someone claimed SQL doesn't scale ([`5:47`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=347), [`6:06`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=366))
