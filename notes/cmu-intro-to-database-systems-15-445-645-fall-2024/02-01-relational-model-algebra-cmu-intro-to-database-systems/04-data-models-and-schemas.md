# 04 — DBMS, Data Models & Schemas

## What a DBMS gives you

- Software that lets applications store, analyze, and query data in a database ([`16:00`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=960)).
- A **general-purpose** DBMS supports arbitrary schemas and arbitrary queries — not hardcoded to one lookup ([`16:00`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=960)).
- Database systems are among the most widely deployed, tested, and vetted software in the world — rivaled only by operating systems, with multi-billion-dollar companies riding on their correctness ([`16:30`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=990)).
- **Advice: never build your own DBMS inside your application.** Use an existing one ([`17:09`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=1029)).

## Data model vs. schema

- **Data model** — a high-level abstraction for defining collections of data and the relationships between them ([`17:31`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=1051), [`19:20`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=1160)).
- **Schema** — within a chosen data model, the specific tables/collections, their attributes, and their types ([`18:12`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=1092)).
- Without a schema the data is "a bunch of random bits" and is meaningless — the schema is what makes queries possible ([`18:12`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=1092)).
  - Log-file example: raw text lines are unqueryable; declaring `timestamp → event code → message` turns them into something you can query ([`18:41`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=1121)).
- Most DBMSs support exactly one data model, but the boundary is now blurry: relational databases store JSON, and document databases have added SQL ([`17:47`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=1067)).

## Catalogue of data models

| Model | Examples / notes |
| --- | --- |
| **Relational** | The course's focus; most real systems ([`20:10`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=1210)) |
| Key/value | RocksDB, LevelDB, Redis — value has no meaning beyond what the app imposes; used for simple apps and caching ([`20:53`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=1253)) |
| Document / JSON | MongoDB ([`21:31`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=1291)) |
| Wide column / column family | A subset of document DBs — Google BigTable, Cassandra ([`21:31`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=1291)) |
| Array / matrix / vector / tensor | Tensors are the *one* thing awkward in the relational model; the SQL standard only added multidimensional arrays recently ([`21:31`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=1291)) |
| Hierarchical, network, semantic, entity-relationship | 1970s–80s experiments — "they were doing cocaine back then" ([`22:13`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=1333)) |

## The "NoSQL" arc

- NoSQL originally meant "no SQL"; it now means "**not only SQL**" — the camp came back around to relational ideas ([`20:53`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=1253)).
- The claimed 10-year cycle: someone declares the relational model and SQL obsolete, Hacker News gets excited, and eventually everyone concedes the relational model was right ([`22:13`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=1333)).
- Prediction stated in lecture: vector databases are the current iteration and will also come around to SQL ([`22:38`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=1358)).
