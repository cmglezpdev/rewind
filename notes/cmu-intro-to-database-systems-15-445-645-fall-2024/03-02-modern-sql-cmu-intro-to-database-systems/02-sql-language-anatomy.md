# 02 — Anatomy of the SQL language: DML, DDL, DCL, and bags

## The three sub-languages of the SQL spec

- **DML — Data Manipulation Language**: `SELECT`, `INSERT`, `UPDATE`, `DELETE` ([`8:17`](https://www.youtube.com/watch?v=MzigBKf84aY&t=497)).
- **DDL — Data Definition Language**: `CREATE TABLE`, `CREATE INDEX`, `CREATE VIEW` — anything that defines entities or constructs inside the database ([`8:52`](https://www.youtube.com/watch?v=MzigBKf84aY&t=532)).
- **DCL — Data Control Language**: the ACL layer of SQL. Some systems let you specify who may read a table, a column, or even an **individual row** — conceptually a WHERE clause applied as an access predicate. Not a focus of this course ([`8:52`](https://www.youtube.com/watch?v=MzigBKf84aY&t=532)).

## Sets vs bags — the key semantic gap

The relational model is defined on **sets**; SQL is defined on **bags** ([`8:52`](https://www.youtube.com/watch?v=MzigBKf84aY&t=532)).

| Collection | Duplicates | Defined order |
| --- | --- | --- |
| Set | No | No |
| List | Yes | Yes |
| **Bag** (SQL) | **Yes** | **No** |

([`9:36`](https://www.youtube.com/watch?v=MzigBKf84aY&t=576))

Consequences:

- The *same* query on the *same* database can return rows in a **different order** at different times — e.g. after the system reorganizes storage — and from SQL's perspective **both results are correct** ([`9:36`](https://www.youtube.com/watch?v=MzigBKf84aY&t=576)).
- If you care about order or uniqueness you must say so explicitly with `ORDER BY` / `DISTINCT`; nothing else guarantees it ([`10:07`](https://www.youtube.com/watch?v=MzigBKf84aY&t=607)).

## Agenda for "Modern SQL"

Ordered as presented ([`10:17`](https://www.youtube.com/watch?v=MzigBKf84aY&t=617)):

1. Aggregations + `GROUP BY`
2. String / date / time operations
3. Output control and redirection
4. **Window functions**
5. **Nested queries**
6. **Lateral joins**
7. **Common table expressions (CTEs)**

The last four are flagged as "super important for understanding how modern SQL works" ([`10:17`](https://www.youtube.com/watch?v=MzigBKf84aY&t=617)).

A warning is issued up front: the basics are portable across systems, but **once you reach dates and times, it all falls apart** ([`10:17`](https://www.youtube.com/watch?v=MzigBKf84aY&t=617)).

## The running example database

A tiny university schema used for every demo ([`11:03`](https://www.youtube.com/watch?v=MzigBKf84aY&t=663)):

- `student` — students, with `sid`, `name`, `login`, `gpa`
- `course` — courses, with `cid`
- `enrolled` — students take courses and receive a letter `grade`

## The seven systems on the demo machine

Every feature is tested live against all of them ([`15:38`](https://www.youtube.com/watch?v=MzigBKf84aY&t=938)):

- PostgreSQL
- MySQL
- SQLite
- DuckDB
- SQL Server
- Oracle
- ClickHouse
