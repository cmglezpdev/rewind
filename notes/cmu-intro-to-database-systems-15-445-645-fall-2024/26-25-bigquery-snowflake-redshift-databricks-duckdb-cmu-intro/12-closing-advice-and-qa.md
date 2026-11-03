# 12 — Closing Advice and Q&A

## Closing message

- Even outside database work, everyone eventually hits "this query is slow, this database sucks" — this class puts you in a position to understand what the system is trying to do for you, and whether you are working with it or against it ([`1:18:55`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4735)).

## The technology-choice recommendation

- **Avoid premature optimization.** Do not assume your data will be huge and reach for Snowflake or another scale-out system ([`1:19:28`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4768)).
- Recommended order: **Postgres first, then DuckDB** — that covers roughly 99% of the way, and Postgres alone is good enough for nine out of ten people ([`1:19:28`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4768), [`1:19:57`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4797)).
- By the time Postgres or DuckDB falls apart, you will likely have the money to hire someone to build or migrate to a large-scale system ([`1:19:57`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4797)).

## Q&A — backups in Postgres

- Use **pg_dump / PG backup**; it can also do deltas that you append back. This is what he does nightly for the db.io website ([`1:20:17`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4817), [`1:20:48`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4848)).
- On a hosted service like RDS, the provider handles it for you ([`1:20:48`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4848)).
- For a hypothetical ~100 GB database: PG backup writing to external storage is good enough for a long time. **Replicas are for high availability, not backup** — Postgres has gotten better at standby replicas, but then you are managing that yourself ([`1:21:11`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4871), [`1:21:33`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4893), [`1:22:04`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4924)).

## Q&A — managed service vs self-hosting

- Depends on money and priorities. For a startup, **nobody cares whether you self-host Postgres** — that time is better spent making the application better, so offload to a managed provider (Neon's free tier is called out as generous) ([`1:22:04`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4924), [`1:22:28`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4948), [`1:22:51`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4971)).

## Q&A — MotherDuck

- MotherDuck is the **commercial offshoot of DuckDB**, founded not by the DuckDB creators but by the person who **ran BigQuery for 10 years** — and who wrote the "most data isn't that big" blog post behind the earlier slide ([`1:22:51`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4971), [`1:23:06`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4986)).
- What it does: a DuckDB **extension that offloads part of a query plan to the cloud**. If some data is local and some sits in S3, MotherDuck runs DuckDB in the cloud next to the remote data and returns results instead of pulling everything down — **no change to the SQL query** ([`1:23:06`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4986), [`1:23:32`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=5012), [`1:23:56`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=5036)).
- On whether DuckDB will scale out across nodes: VCs repeatedly asked whether DuckDB could become "the next Snowflake". The answer given was **that is a major rewrite**, the founders did not want it, and they did not do it — judged the smart call ([`1:24:17`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=5057), [`1:24:41`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=5081)).
