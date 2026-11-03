# 04 — String operations

## What SQL-92 mandates

- Strings (`VARCHAR`) support equality, `<`, `>`, plus a library of manipulation functions ([`21:42`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1302)).
- **Two rules in the standard** ([`21:42`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1302)):
  1. String comparisons are **case sensitive** — `'A' != 'a'`.
  2. String literals are wrapped in **single quotes** only.

## What systems actually do

| System | Case sensitivity | Quoting |
| --- | --- | --- |
| PostgreSQL | **Sensitive** (follows the standard) | Single quotes only |
| MySQL | **Insensitive** | Single **and** double quotes |
| SQLite | Sensitive | Historically accepted double quotes |

([`22:17`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1337))

### Live demo results

- Postgres: `WHERE name = 'TUPAC'` fails to match `'Tupac'` — expected, correct ([`22:41`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1361), [`23:06`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1386)).
- MySQL: matches regardless of case, **even with strict mode on** ([`23:06`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1386)).
- MySQL accepts double-quoted literals in `traditional` mode but rejects them in `ANSI` mode ([`23:32`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1412)).
- SQLite **no longer** accepts double-quoted string literals as of the current release — a behavior change the lecturer discovered live ("every year I upgrade") ([`24:06`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1446)).
- Portable workaround for case-insensitive comparison: cast **both sides** with `UPPER(...)` before comparing ([`22:17`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1337)).
- Double quotes are properly a way to **escape identifiers** (e.g. a column name containing a space), not string literals — and using them that way is discouraged ([`23:32`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1412)).

## Aside: SQLite

- Written essentially by **one person in North Carolina** (Richard Hipp), released into the **public domain**; the SQLite company exists but is held in his wife's name ([`24:06`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1446)).

## Version pinning across vendors

- **MySQL** appears to be the only system where you can flip the SQL mode itself — a deliberate attempt to correct past mistakes ([`24:51`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1491)).
- **Oracle** lets you tell a modern server (e.g. Oracle 22) to accept an older dialect (Oracle 11), so you can upgrade the engine without rewriting applications ([`25:20`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1520)).
- **PostgreSQL** simply updates every year ([`25:52`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1552)).

## Concatenation — the classic divergence

The simplest possible string operation, done three different ways ([`26:06`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1566)):

| Dialect | Syntax |
| --- | --- |
| SQL standard / PostgreSQL | `a \|\| b` (double bars) |
| SQL Server | `a + b` |
| MySQL | Neither — requires `CONCAT(a, b)` |

Verdict: string functions are otherwise straightforward; concatenation is the exception, and it is historical accident you simply have to live with ([`26:37`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1597)).
