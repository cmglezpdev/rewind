# 02 — Database vs. Database Management System

## The distinction

- **Database** — an organized collection of data, related in some manner, that models some aspect of the real world ([`6:39`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=399)).
- **DBMS** — the *software* that manages a database. Class examples sorted by the instructor ([`6:20`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=380)):
  - ClickHouse → a DBMS.
  - A dictionary, a phone contact manager, IMDb → databases.
- Colloquially people say "database" when they mean the *system*; the lecture separates the two deliberately ([`6:20`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=380)).

## What "modeling the real world" means

- A dictionary models vocabulary: words → definitions, part of speech ([`6:39`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=399)).
- A contact manager models a pencil-and-paper contact list: names, phone numbers, email addresses ([`6:39`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=399)).
- Modeling includes capturing the **constraints** of that real-world concept, not just the values ([`7:13`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=433)).

## Why the instructor claims databases are central to CS

- A computer takes input, does something to data, produces output — that middle part is almost always a database ([`7:13`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=433)).
- Filesystems are databases; websites are forms talking to databases; an LLM is "more or less" a database ([`7:13`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=433)).
- SQLite is the most widely deployed DBMS in the world — it runs on every smartphone, and is used in homework 1 ([`8:32`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=512)).

## Why understanding internals matters

- Knowing how components are implemented tells you *why queries are slow* and *why a query returns garbage* ([`7:49`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=469)).
- Applies whether you build DBMS internals professionally or merely consume databases as an application developer ([`7:49`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=469)).
