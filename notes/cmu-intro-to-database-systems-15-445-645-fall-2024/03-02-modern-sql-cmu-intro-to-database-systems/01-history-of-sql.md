# 01 — History of SQL and why it is not dying

## Scope of the lecture

- This is the **only** class of the semester that discusses databases at the *application level*; everything after it is about system internals ([`0:05`](https://www.youtube.com/watch?v=MzigBKf84aY&t=5)).
- The basics of SQL are assumed known; the focus is the **modern** features, which also map directly to Homework 1, released the same day ([`0:40`](https://www.youtube.com/watch?v=MzigBKf84aY&t=40)).
- Relational algebra from the previous class is the underpinning; the execution engine that runs those operators is covered later in the semester ([`1:21`](https://www.youtube.com/watch?v=MzigBKf84aY&t=81)).

## Origins (1970s, IBM)

- Ted Codd's relational model paper was purely mathematical — it defined **no programming language** ([`1:44`](https://www.youtube.com/watch?v=MzigBKf84aY&t=104)).
- IBM's first relational query language was **SQUARE**, a vertical notation you physically could not type; nobody implemented it ([`2:27`](https://www.youtube.com/watch?v=MzigBKf84aY&t=147)).
- **Chamberlin and Boyce** redesigned it into **SEQUEL** (spelled out). When IBM shipped DB2 in the '80s, a trademark holder sued over the name, so it was shortened to **SQL** ([`2:53`](https://www.youtube.com/watch?v=MzigBKf84aY&t=173)).
- The first version was closer to the pure relational model: no JSON, no arrays — those arrived in later spec revisions ([`3:27`](https://www.youtube.com/watch?v=MzigBKf84aY&t=207)).

## System R and the commercial line

- **System R** at IBM produced foundational work (e.g. two-phase locking) but was **never commercialized** — IBM was making too much money on **IMS** ([`3:27`](https://www.youtube.com/watch?v=MzigBKf84aY&t=207)).
- IMS still runs banks, insurance companies, and the US Social Security Administration; migrating off is too expensive, so IBM keeps collecting maintenance fees ([`4:06`](https://www.youtube.com/watch?v=MzigBKf84aY&t=246)).
- IBM's relational attempts: **System/38** (went nowhere), **SQL/DS** (still around), and **DB2** in **1983** — still an industry juggernaut ([`4:06`](https://www.youtube.com/watch?v=MzigBKf84aY&t=246)).
- Recurring theme for the semester: enterprise systems (Oracle, DB2, SQL Server) have far more advanced features than PostgreSQL or MySQL ([`4:31`](https://www.youtube.com/watch?v=MzigBKf84aY&t=271)).

## Standardization timeline

| Year | Event |
| --- | --- |
| ~1972–73 | First SQL paper ([`4:53`](https://www.youtube.com/watch?v=MzigBKf84aY&t=293)) |
| 1986 | ANSI standard ([`4:53`](https://www.youtube.com/watch?v=MzigBKf84aY&t=293)) |
| 1987 | ISO international standard ([`4:53`](https://www.youtube.com/watch?v=MzigBKf84aY&t=293)) |
| Late 90s–2000s | XML support added — XML was the hot thing ([`5:09`](https://www.youtube.com/watch?v=MzigBKf84aY&t=309)) |
| ~2010s | JSON support added, driven by MongoDB's popularity ([`5:09`](https://www.youtube.com/watch?v=MzigBKf84aY&t=309)) |
| March 2023 | Latest revision: **property graph queries** + multi-dimensional arrays ([`5:43`](https://www.youtube.com/watch?v=MzigBKf84aY&t=343)) |

- As of 2024, **Oracle is the only system that supports property graph queries** — they worked with the standards body and shipped their own version ([`5:43`](https://www.youtube.com/watch?v=MzigBKf84aY&t=343)).
- The practical bar for claiming "we support SQL" is **SQL-92**: SELECT, FROM, GROUP BY, aggregations ([`6:24`](https://www.youtube.com/watch?v=MzigBKf84aY&t=384)).

## "SQL is dead" — the recurring prediction

- Every ~10 years someone announces SQL's replacement; Google published a paper that week on an internal SQL rewrite that looks more like **pandas** ([`6:24`](https://www.youtube.com/watch?v=MzigBKf84aY&t=384)).
- Claims that natural-language queries / ChatGPT will kill SQL are dismissed: "SQL is not going to die in your lifetime" ([`7:00`](https://www.youtube.com/watch?v=MzigBKf84aY&t=420)).
- Nuanced position: using an LLM for a **first approximation** of a query is fine, but you still need controls and the judgment to verify the answer is correct ([`7:00`](https://www.youtube.com/watch?v=MzigBKf84aY&t=420)).
- Analogy: SQL may become like assembly — few write it daily, but you must understand it. Short term it remains essential ([`7:35`](https://www.youtube.com/watch?v=MzigBKf84aY&t=455)).
- Practicing what he preaches: he taught his four-year-old daughter to write her first SQL query ([`8:00`](https://www.youtube.com/watch?v=MzigBKf84aY&t=480)).
