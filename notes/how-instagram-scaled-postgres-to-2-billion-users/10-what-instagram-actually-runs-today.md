# 10. What Instagram actually runs today

An important caveat the video makes explicitly before wrapping up ([`20:06`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=1206)):

## The story has an end date

- Everything covered so far is **the historical story: how Instagram scaled Postgres from 2010 to roughly 2015** ([`20:06`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=1206)).
- That story is still foundational: the **architecture pattern remains influential today and the lessons remain completely valid** ([`20:06`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=1206)).
- But **Instagram today does not run on Postgres**. After the Facebook acquisition, Meta integrated Instagram into its broader internal infrastructure ([`20:06`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=1206)).

## What replaced it

- The **entire social graph** — who follows whom, who liked what — is served by **TAO**, a distributed system Meta built specifically for **graph workloads at their scale** ([`20:33`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=1233)).

## How to read this

The "2 billion users on Postgres" headline describes the **lineage** of the architecture, not the current production stack. The transferable value is in the patterns — connection pooling, logical/physical shard decoupling, Snowflake-style IDs — not in the claim that Postgres alone is serving Instagram in 2026 ([`20:06`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=1206), [`20:33`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=1233)).
