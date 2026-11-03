# 05 — Date and time operations: the portability disaster

## The exercise

One deliberately trivial task, run on all seven systems: **count the number of days from January 1st to today (August 28th)** — expected answer **240** ([`27:03`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1623)).

## Step 1 — just getting "now"

`NOW()` is in the SQL spec. Support in practice ([`27:20`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1640)–[`28:40`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1720)):

| System | `NOW()` function | `CURRENT_TIMESTAMP` keyword | `CURRENT_TIMESTAMP(n)` with precision |
| --- | --- | --- | --- |
| PostgreSQL | Yes | Keyword, **not** a function | Function form needs an argument to work ([`32:01`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1921)) |
| MySQL | Yes | Yes | Yes ([`27:48`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1668), [`28:59`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1739)) |
| SQLite | **No** | Keyword only ([`28:59`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1739)) | — |
| DuckDB | **No** | Keyword only ([`29:24`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1764)) | Rejects the argument ([`32:01`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1921)) |
| Oracle | **No** | Two different errors ([`29:41`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1781)) | Precision **required** ([`31:21`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1881)) |
| SQL Server | Something else entirely ([`27:48`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1668)) | — | No ([`32:01`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1921)) |
| ClickHouse | Yes | **No keyword**, and no argument form ([`32:25`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1945)) |

### Oracle's `DUAL` table

- Oracle **cannot run a query without a `FROM` clause** (as of Oracle 21; believed fixed in 24) ([`29:41`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1781)).
- Every other system happily runs `SELECT 1+1` ([`30:35`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1835)).
- Oracle's workaround is **`DUAL`**, a magic built-in table with one dummy tuple, so you can write `SELECT CURRENT_TIMESTAMP FROM DUAL` ([`30:35`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1835), [`30:55`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1855)).
- Oracle's opaque `NOW()` error, "date time interval precision out of range", was explained **by ChatGPT**: it wants an explicit precision argument ([`31:21`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1881)).

### Time zones

There are two distinct types: **datetime** and **datetime with time zone**. In PostgreSQL you can store the zone explicitly, or fall back to the system default ([`29:41`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1781)).

## Step 2 — computing the day difference

Every system needed a different idiom:

- **PostgreSQL** — `EXTRACT(DAY FROM ...)` / `EXTRACT(DOY FROM ...)`. `DOY` returns **241**, off by one because it counts January 1st itself; casting both dates and **subtracting** gives the correct **240** ([`32:53`](https://www.youtube.com/watch?v=MzigBKf84aY&t=1973), [`33:21`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2001), [`33:38`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2018)).
- **PostgreSQL syntax sugar**: the `::` cast shorthand. Only Postgres and DuckDB have it — DuckDB because it **borrowed the PostgreSQL grammar** ([`33:38`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2018)).
- **MySQL** — subtracting dates returns a nonsense number (`728`-style) that went unexplained for years until a **YouTube commenter** decoded it: it is the month difference (8−1=7) concatenated with the day difference (28−1=27) ([`34:11`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2051)). Working approaches: convert to **Unix timestamps** and divide by 60·60·24, or use MySQL's `DATEDIFF` ([`34:51`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2091), [`35:17`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2117)).
- **PostgreSQL has no `DATEDIFF`** ([`35:17`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2117)).
- **DuckDB** — the Postgres cast-and-subtract approach works ([`35:17`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2117)).
- **Oracle** — cannot cast a string to a date without an explicit **format mask** (`YYYY-MM-DD`); the answer came from ChatGPT ([`35:47`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2147), [`36:08`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2168)).
- **SQL Server** — explicit `CAST(...)`, plus a proprietary `CONVERT`. Its `DATEDIFF` returns a **negative** number unless you put the start of year first ([`36:08`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2168), [`36:34`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2194), [`36:55`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2215)).
- **ClickHouse** — `TODAY()` (an alias for `NOW()`) minus a cast string date → 240 ([`36:55`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2215)).
- **SQLite** — no usable Unix-timestamp function; the working answer (and ChatGPT's) is to convert both timestamps to the **Julian calendar** via `JULIANDAY(...)` and subtract, casting to integer to round ([`39:00`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2340), [`40:54`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2454), [`41:11`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2471)).
- Unix timestamps are **seconds**, stored as an integer — verified live ([`37:52`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2272)).
- A student proposed Unix-timestamp conversion as the universal portable approach; testing it live showed it does **not** work everywhere either ([`38:37`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2317)).

## Historical aside: why the Julian calendar is in databases

- Banks in the 1960s–80s computed **interest** on the Julian calendar because its months are a fixed length, unlike the Gregorian calendar ([`39:46`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2386)).
- When Stonebraker's team tried to sell **Ingres** to banks, the banks demanded Julian dates — forcing a modification of the Ingres **source code** ([`39:46`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2386)).
- **PostgreSQL's answer** was **user-defined types**: implement the C API, load your own type, define its operators (`+`, `-`, `/`). UDTs are widely used in systems today ([`40:29`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2429)).

## Bottom line

Something that should be trivial ends up "widely different" in **both syntax and semantics** across every engine ([`37:30`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2250), [`41:24`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2484)).
