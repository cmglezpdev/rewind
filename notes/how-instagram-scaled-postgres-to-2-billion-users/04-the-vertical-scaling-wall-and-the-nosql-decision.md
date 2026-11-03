# 4. The vertical scaling wall and the NoSQL decision

## Hitting the ceiling

Even with PgBouncer working, the next wall is harder ([`3:42`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=222)):

- Database is **2 TB** on the **biggest EC2 instance Amazon will rent them** ([`3:42`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=222)).
- RAM maxed out, disk speed maxed out — at the ceiling ([`4:06`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=246)).
- The workload is simply bigger than one machine can hold ([`4:06`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=246)).

## The standard advice — and why they rejected it

- The conventional system-design answer at this point: **switch to NoSQL — Cassandra, DynamoDB or MongoDB** ([`4:06`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=246)).
- The story we're told is that relational databases don't scale horizontally, so you must change paradigm ([`4:06`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=246)).
- Instagram **seriously evaluated Cassandra, MongoDB and the other NoSQL options of the era** — and chose to stay on Postgres ([`4:32`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=272)).

## Their reasoning

- The problems they were hitting **were not Postgres problems** — any database running Instagram's workload would hit the same walls ([`4:32`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=272), [`4:51`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=291)).
- **Switching to Cassandra does not make horizontal partitioning go away** — it just hides it behind a different abstraction ([`4:51`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=291)).
- The migration is one-way: *"once you switch to Cassandra, you've burnt the boats, you don't really get to come back"* ([`4:51`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=291)).

## The decision

Instead of switching databases, they made **Postgres itself horizontal** — they would shard ([`4:51`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=291)).

The specific way they approached sharding became *"one of the most influential architecture patterns of the last decade"* ([`4:51`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=291)). It splits into two decisions, covered next:

- **What to shard by** → [05-sharding-by-user-and-the-shard-key-tradeoff.md](05-sharding-by-user-and-the-shard-key-tradeoff.md)
- **How to shard** → [06-logical-vs-physical-shards.md](06-logical-vs-physical-shards.md)
