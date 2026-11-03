# 02 — Netflix and Cassandra: Write Throughput at Scale

## The problem: everything is a write

- Netflix tracks what you watch, pause, search, hover over, and which device you use — **every interaction generates data** ([`0:56`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=56))
- Multiplied across **260 million subscribers**, many watching simultaneously ([`0:56`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=56))
- Result: **3+ million writes per second**, a volume that would crush most databases ([`1:22`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=82))

## The choice: Apache Cassandra

- Cassandra is Netflix's primary database for most services ([`1:24`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=84))
- Single reason: it is **built for write throughput at horizontal scale** ([`1:24`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=84))
- At its core, Cassandra is essentially a **distributed hash map** ([`1:24`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=84))

## How a Cassandra write actually works

1. Cassandra **hashes the partition key** and routes the write to the responsible nodes ([`1:46`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=106))
2. The write lands in an in-memory structure called a **memtable** ([`1:46`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=106))
3. The client gets an acknowledgement and moves on ([`1:46`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=106))
4. **No locks, no cross-node coordination** for the primary write ([`1:46`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=106))
5. Each write is essentially an **append with minimal overhead** ([`2:05`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=125))

```mermaid
flowchart LR
    C[Client write] --> H[Hash partition key]
    H --> N[Route to responsible nodes]
    N --> M[Memtable in memory]
    M --> A[Ack returned to client]
```

## What Netflix gave up

- Cassandra's **read flexibility is extremely limited**: no joins, no ad hoc queries ([`2:10`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=130))
- You cannot write a SQL query to answer a random business question ([`2:10`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=130))
- Netflix's response: **model data around queries, not entities** ([`2:10`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=130))

### Concrete example of query-first modeling

| Access pattern | Table design |
|---|---|
| Viewing history by user | One table with **user ID** as partition key ([`2:26`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=146)) |
| Trending by region | A **completely different table**, same data organized differently ([`2:26`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=146)) |

- The same data is deliberately stored **multiple times** ([`2:26`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=146))

## Denormalization is the strategy, not a sin

- In a relational database, data duplication is a sin; in Cassandra it is **the strategy** ([`2:42`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=162), [`2:46`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=166))
- Denormalize aggressively so **every query is a simple partition key lookup** ([`2:46`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=166))
- Failure mode: engineers who treat Cassandra like a relational database — multi-partition queries, secondary index lookups — end up with **200 ms read latencies** and blame the database instead of their design ([`2:46`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=166), [`3:04`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=184))

## Why not PostgreSQL at Netflix

- For **reads**, Postgres is fantastic — flexible queries are its strength ([`3:06`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=186))
- But at **3 million writes/sec a single Postgres instance would fall over** ([`3:06`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=186))
- Even with read replicas, connection pooling and partitioning, you would need an **army of Postgres instances plus a complex sharding layer** ([`3:06`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=186))
- Cassandra provides that **horizontal write scaling natively** ([`3:06`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=186))
