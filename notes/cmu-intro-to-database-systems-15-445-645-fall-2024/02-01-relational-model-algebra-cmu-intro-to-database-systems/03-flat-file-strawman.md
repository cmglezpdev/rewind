# 03 — The Flat-File Strawman

The running example for the whole course: a **Spotify clone** / digital music store tracking artists and the albums they appear on ([`8:44`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=524)).

## The naive design

- One CSV file per entity — could equally be JSON or YAML; the format is irrelevant to the argument ([`9:08`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=548)).
  - `artist(name, year, country)`
  - `album(name, artist, year)`
- Inserts/updates append to the file; queries scan it line by line ([`9:41`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=581)).
- Example query "what year did GZA go solo?" → Python opens the file, reads every line, splits the CSV, checks field 0 against `"GZA"`, prints on match ([`10:09`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=609)).
- This is legitimately a database — with the DBMS logic embedded in the application ([`10:31`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=631)).

## Why it fails

| Problem | Detail |
| --- | --- |
| Full scans | Three lines fit in L1 cache; a **billion records** do not — you cannot scan and parse everything for one lookup ([`10:52`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=652)) |
| Query rigidity | Every new query, and every new field, means rewriting application code ([`11:23`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=683)) |
| No type/format enforcement | Someone reorders columns in a text editor, or puts a phone number where the year goes, and the parser chokes ([`11:43`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=703)) |
| Redundancy / typos | "Wu-Tang Clan" repeated per album; one dropped letter makes it a different value even though the entity is the same ([`12:13`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=733)) |
| No many-to-many | The model assumes one artist per album; mixtapes with multiple artists cannot be expressed ([`13:09`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=789)) |
| Dangling references | Delete an artist and the album file still references a nonexistent artist — a dangling pointer ([`13:09`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=789)) |
| No code sharing | A second application must copy-paste the parsing code; a Python→Rust rewrite means translating all of it ([`13:35`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=815)) |
| Distribution | Other machines/phones need access to the file, requiring a distributed filesystem — "which is a database, by the way" ([`13:35`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=815)) |
| Concurrency | Two threads writing the same file; letting the OS lock it is the lazy fix ([`14:13`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=853)) |
| Durability | A crash mid-write (power cord, lightning) leaves a half-written, invalid record ([`14:58`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=898)) |
| Availability | Serving from multiple machines with failover means hand-rolling load balancing ([`15:20`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=920)) |

## Two recurring themes introduced here

- **"The OS is our frenemy."** Database people never let the operating system do work for them — it is always less efficient, and we can always do it better ([`14:13`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=853)).
- Single-writer file locking *is* what SQLite does — acceptable on a phone, unacceptable on a thousand-core machine ([`14:46`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=886)).

This list is explicitly the syllabus: each problem maps to a lecture later in the semester ([`15:41`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=941)).
