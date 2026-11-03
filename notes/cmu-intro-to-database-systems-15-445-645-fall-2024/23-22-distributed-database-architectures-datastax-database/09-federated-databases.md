# 09 — Federated Databases

## The premise

- Nodes in a distributed database do **not** have to run the same software — they can run different versions, or entirely different DBMSs (some Postgres, some MySQL) [`59:31`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3571).
- Typical enterprise reality: Postgres, plus Oracle for the financial system, plus ten stray SQLite instances — a pile of **data silos** that would ideally share one query interface [`59:56`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3596).

## Definition

- A **federated database** is a distributed architecture using a **single middleware layer** that exposes one query interface able to reach data at any location — for example by rewriting a query into the Postgres dialect for Postgres and the MySQL dialect for MySQL [`59:56`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3596) [`1:00:22`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3622).

## Why it is hard

- Different systems have **different data models and query languages**, forcing you down to the **lowest common denominator** [`1:00:22`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3622).
- Query optimization is already hard for a single node (Project 3), harder distributed, and "kind of a mess" across heterogeneous systems [`1:00:43`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3643).
- **Q&A — which query language?** There is a SQL standard, but everyone interprets it differently, so in practice you speak a **very limited subset**. There is no standard answer [`1:01:10`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3670).
- **Q&A — who picks the backend?** The middleware exposes an API; the application speaks that API and the middleware translates into each dialect [`1:01:51`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3711).

## Real implementations

- **Connectors** are the industry term for the middleware's per-backend adapters (example architecture: app server → middleware → MySQL, Redis, and others) [`1:00:43`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3643) [`1:01:10`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3670).
- **Postgres foreign data wrappers** — query external sources (Parquet files, other database instances) from Postgres SQL, exposed as a Postgres table [`1:02:09`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3729).
- **Trino / Presto** (from Meta/Facebook) — connectors to different systems; when a query is simple enough they **push it down** to the backend (e.g. speak MySQL directly and only pull the result back), otherwise they pull the raw data up and process it in their own layer [`1:02:09`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3729) [`1:02:57`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3777).
