# 09 - Demo: Postgres Free Space Map and SQL Server Page Metadata

## Postgres walkthrough

Setup: a `student` table with 3 records ([`49:04`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2944)).

1. **Inspect free space** with the `pg_freespacemap` extension, which exposes free space per page as a table-like function ([`49:04`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2944), [`49:26`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2966)).
   - Block 0 reports **97% full** with only 3 tuples, which makes sense given Postgres' 8 KB pages ([`49:26`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2966), [`49:45`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2985)).
2. **Insert 1,000 tuples** using the `generate_series` idiom; the table now holds 1,003 tuples across **7 pages** ([`49:45`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2985), [`50:05`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3005), [`50:32`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3032)).
   - The free space query returns **all zeros** — implausible, since the last page cannot be exactly 100% utilized ([`50:05`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3005), [`50:32`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3032)).
3. **Find the files on disk** with `pg_relation_filepath` ([`50:52`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3052)).
   - Path resolves under the `base` directory to a per-database numeric directory (`16835`) containing the table's numeric file (`16653`) ([`51:11`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3071), [`51:24`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3084), [`51:46`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3106), [`52:08`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3128)).
   - The table data file is **56 KB** — a multiple of 8 KB, i.e. 7 pages ([`52:08`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3128)).
   - Sibling files: `_fsm` = **free space map**, `_vm` = visibility map (deferred to the transactions lectures) ([`52:28`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3148)).
4. **Why the zeros**: Postgres does not keep the in-memory free space map perfectly in sync with disk. Being slightly wrong only costs some unused space, which is eventually reclaimed ([`52:49`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3169)).
5. **Run `VACUUM`** — Postgres' garbage collector for tables. Afterwards the first six pages report full and the last one is only partially used ([`52:49`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3169), [`53:22`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3202), [`53:43`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3223)).
6. **Delete ~half the tuples** (coin flip via `random() < 0.5`). This time the free space map is updated immediately and many pages show free space ([`53:43`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3223), [`53:59`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3239), [`54:12`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3252)).
7. **Insert 10 more tuples, vacuum, re-query**: block 0 went from 46% free to 40% full — the new tuples were placed in the **first** page, not appended at the end ([`54:29`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3269), [`55:03`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3303)).
   - Demonstrates that the relational model is **unordered**: the DBMS puts tuples wherever free space exists ([`55:21`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3321)).

## SQL Server contrast

- A metadata command lists per-page IDs together with **page types** — index allocation map vs data page — i.e. SQL Server tracks both where a page is and what it contains. Postgres does not track this ([`55:40`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3340), [`56:01`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3361)).

## Q&A from the demo

- **Can Postgres compact partially filled pages?** Yes — `VACUUM FULL` rewrites the table into a new copy packed in order to minimize pages, but it is expensive: it locks the whole table and blocks other updates ([`56:23`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3383), [`56:40`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3400), [`57:00`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3420)).
- **When does an application call vacuum?** It should not — vacuum has triggers (e.g. roughly 10% of tuples updated) or can be scheduled nightly; it is an administrator-level concern ([`57:19`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3439), [`57:33`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3453), [`57:45`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3465)).
- **Why map both tables and indexes in the directory?** Same mechanism serves any database object; there is no reason not to reuse it ([`57:45`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3465), [`58:02`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3482), [`58:23`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3503)).
- **Does the index directory entry track values?** No. The page directory only says where to find a page. Interpreting it — B+ tree, hash table — happens after landing inside the page ([`58:23`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3503), [`58:40`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3520), [`58:55`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3535)).
