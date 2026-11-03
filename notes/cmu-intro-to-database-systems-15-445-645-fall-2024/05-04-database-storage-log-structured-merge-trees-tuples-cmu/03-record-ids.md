# 03 — Record IDs

## Definition

- A **record ID** is the physical location of a tuple in the database — not a logical primary key [`7:29`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=449)
- Typically a composite of file ID + page ID + slot number; every system stores something slightly different [`7:58`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=478)
- Applications must not rely on it: under the relational model tables have no order, so tuples move and record IDs change [`7:29`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=449)
- Usually **not** stored inside the tuple, since it is derived from the tuple's location — storing "my page and slot" inside the tuple at that slot wastes space. SQLite is an exception: it stores the `rowid`, its synthetic primary key, with a B+Tree mapping rowid → data [`8:24`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=504)

## Live demo across four systems

Same experiment in each: scan, delete the second tuple (`101`), insert a new tuple (`103`), scan again.

| System | Exposed as | Format | Delete leaves a gap? | Where does the insert land? |
| --- | --- | --- | --- | --- |
| PostgreSQL | `ctid` | `(page, slot)` pair, slots start at **1** | Yes — gap left behind [`10:10`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=610) | At the end, not the free slot [`10:59`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=659) |
| SQLite | `rowid` | Monotonically increasing counter | Yes, counter keeps going [`11:49`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=709) | At the end; no vacuum/compaction exists [`12:09`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=729) |
| SQL Server | `%%physloc%%` | Hex blob → file ID, page number, slot [`12:51`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=771) | **No** — it compacts the page, slot 1 gets reused by the third tuple [`13:23`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=803) | At the end [`13:47`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=827) |
| Oracle | `rowid` | Byte array → object ID, file, block/page, row slot; slots start at **0** [`14:08`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=848) | Yes, no compaction [`14:44`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=884) | At the end [`14:44`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=884) |

Notes from the demo:

- `VACUUM FULL` in Postgres is the garbage collector: it makes a fresh copy of the table, writing out only visible tuples, and reclaims the gap [`10:59`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=659)
- Postgres leaving the empty slot is still relational-model-correct [`10:10`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=610)
- Internal data structures point at tuples via record IDs; the system decodes the byte array into file/page/slot [`15:20`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=920)
- Small divergences everywhere — e.g. Oracle row slots start at 0, Postgres at 1, with no principled reason [`15:38`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=938)
