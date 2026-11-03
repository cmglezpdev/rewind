# 03 — Running example: the Wikipedia schema

## The schema

- Derived from Wikipedia's real schema — PHP on one massive MySQL cluster, open source, so you can download the MySQL files and look ([`10:56`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=656)).
- Three tables: `useracct`, `pages`, `revisions` ([`10:56`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=656)).
  - `revisions` has foreign keys to the user ID that made the revision and to the page it belongs to.
  - `pages` carries a foreign key **back** to its latest revision, so looking up the current version of a page is a single FK hop ([`11:34`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=694)).

## Why physical layout is free to vary

- The relational model says **nothing** about how tuples are stored ([`11:49`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=709)).
- Nothing requires all values of one tuple to live in the same page — overflow pages already break that ([`12:07`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=727)).
- The intuitive "Excel spreadsheet" mental model (all values of a row contiguous) is a *design choice*, and it is not the most efficient one for OLAP ([`12:07`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=727)).

## The two example query shapes

**OLTP** ([`12:35`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=755)):
- Get the latest revision of a page: join `pages` × `revisions` following the FK — one tuple lookup on each side.
- Update the last-login timestamp for an account.
- Insert a new revision.

**OLAP** ([`13:16`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=796)):
- Single scan of `useracct`, aggregating logins by month for hostnames ending in `.gov`.
- Real motivation: a scandal where congressional staff edited Wikipedia from government computers — Wikipedia's revision history is public, so `.gov` hostnames exposed it ([`13:35`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=815)).
- Key property: only **two attributes** are needed (`hostname`, `lastLogin`), but **all tuples** must be examined ([`14:05`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=845)).

## Storage models

The storage model specifies how tuples are physically organized on disk and in memory; row store vs. column store makes a significant performance difference depending on the workload ([`14:22`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=862)).

| Academic name | Common name | Covered in |
| --- | --- | --- |
| N-ary Storage Model (NSM) | Row store | [04](./04-nsm-row-storage.md) |
| Decomposition Storage Model (DSM) | Column store | [05](./05-dsm-column-storage.md) |
| PAX (Partition Attributes Across) | Hybrid | [06](./06-pax-hybrid-storage.md) |

([`14:41`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=881))
