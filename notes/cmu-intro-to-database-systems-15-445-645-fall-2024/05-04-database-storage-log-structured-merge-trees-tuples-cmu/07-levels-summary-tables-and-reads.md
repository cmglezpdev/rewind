# 07 — Levels, reads, and summary tables

## Levels (the LevelDB / RocksDB layout)

- SSTables are organized into **levels**, analogous to levels of a B+Tree; data slowly moves down and SSTables get larger at each level [`29:53`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1793)
- Within a single SSTable, records go from **low key to high key** [`29:35`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1775)
- New SSTables land at **Level 0**, ordered newest → oldest left to right [`30:22`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1822)
- When a level fills, adjacent/related SSTables are sort-merged into a larger compacted SSTable pushed to the level below; the same rule then applies from Level 1 to Level 2, and so on [`30:22`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1822) [`31:16`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1876)

## Writes are fast, reads are the cost

- Writes become **blind inserts**: no page to find, no page to fault in — just insert into the MemTable and let a background process sort it out later [`34:40`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2080)
- Not drawn in the diagrams but present in real systems: a separate **write-ahead log** for the MemTable, so a crash can be recovered from; once the SSTable is on disk that log can be discarded [`34:40`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2080)
- The trade-off: reads can be expensive depending on where the wanted version lives [`34:40`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2080)

## Read path

1. Check the **MemTable**; if the key is there, that is the latest version and the query is answered [`35:23`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2123)
2. Otherwise, brute force would be: binary search each SSTable at Level 0, then Level 1, and so on — worst case scanning everything, "stupidly slow" [`35:44`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2144)

## Summary tables — the fix

Extra metadata about what lives in the SSTables and levels below, so the read can jump close to the right SSTable instead of scanning [`36:02`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2162):

- **Min/max key per SSTable per level** — is the wanted key even in range? [`36:29`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2189)
- **Filters per level** — is the key anywhere in this level at all? Matters because a level can hold thousands of SSTables; a single filter check skips them all [`36:44`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2204)
  - Typically implemented as **Bloom filters** (covered a few weeks later) [`37:05`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2225)
  - **Index vs. filter**: an index (like a B+Tree) tells you *where* a key is; a filter only tells you *whether* it exists [`37:05`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2225)
- **Per-SSTable header metadata** — even a 1 GB SSTable can be entered at the right offset via an index/metadata in its header [`37:32`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2252)

Both mechanisms are needed: filters answer point lookups, min/max answers **range scans** (e.g. all keys between 101 and 200) where individual keys cannot be probed one by one [`38:02`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2282) [`38:31`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2311)

## Key/value semantics

- The store holds only appended log records: PUTs and DELETEs [`38:39`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2319)
- A **delete** writes a **tombstone marker**: insert an entry with the tombstone set if the key is absent from the MemTable, or set the marker to true if present; the flush writes a delete entry just like a put entry [`38:39`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2319)
- The value is typically the **entire tuple** [`39:11`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2351)
  - **Blind write** (set a new email address): just PUT, no read needed [`39:32`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2372)
  - **Read-modify-write** (age + 1): requires a lookup of the previous value first [`39:32`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2372)
- For insert-heavy workloads this is excellent — it approaches bare-metal SSD write speed [`39:52`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2392)
- The key is a synthetic ID (like SQLite's rowid), either supplied by the application or internal to the DBMS [`39:52`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2392)
- Finding the key for a given tuple is what **indexes** are for; a non-primary-key lookup (e.g. phone number) needs a secondary index to get the record ID first [`40:29`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2429) [`40:57`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=2457)
