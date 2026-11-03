# 08 — Composite indexes and partial-key lookups

## Composite index

- An index over **multiple attributes**, e.g. `CREATE INDEX ON xxx (a, b, c)` [`48:13`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=2893).
- Extra declarable metadata per column [`48:13`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=2893):
  - **Sort order** per column — ascending by default.
  - **NULL placement** — first or last; in Postgres the default is last.
- The key is treated as a byte array with known offsets, because the catalog knows each column's type — so the tree decomposes it into individual components at comparison time [`50:12`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3012) [`50:28`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3028).

## The B+Tree advantage over hash indexes

A hash index needs **all** key bytes to compute the hash — a partial key hashes to nothing meaningful. A B+Tree can look up on **portions** of the key [`49:03`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=2943) [`49:18`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=2958).

| Query shape on index `(a, b, c)` | Supported? | How |
|---|---|---|
| `a=1 AND b=2 AND c=3` | yes, everywhere | ordinary full-key descent [`49:18`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=2958) |
| `a=1 AND b=2` (prefix) | yes, everywhere | descend on the prefix, then scan the leaves via sibling pointers to collect all matches — like a trailing wildcard [`50:28`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3028) |
| `b=2 AND c=…` (no prefix) | **only Oracle and SQL Server** | parallel searches down all possible branches, multiple coordinated threads, then consolidate results [`49:47`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=2987) [`50:57`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3057) |

- Oracle calls the last one **skip scans**; the instructor is "pretty sure they have a patent," and that plus the extra machinery is why most systems don't implement it [`50:57`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3057) [`51:21`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3081).
