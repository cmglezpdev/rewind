# 06 — Version storage

## The version chain

- Versions of a single logical tuple form a **singly linked list**. Each record carries a field with a record ID (page number + slot number) pointing to the next version [`30:26`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1826) [`30:55`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1855) [`34:21`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2061).
- Doubly linked lists don't help here — just extra maintenance [`30:55`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1855).
- The entry point is always the head of the chain; the open question is **what order** the chain runs in [`30:55`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1855).

## The three schemes

| Scheme | Where versions live | Used by | Verdict |
|---|---|---|---|
| **Append-only** | New version inserted into the *same* table as a regular tuple | PostgreSQL, Hekaton | "The worst case — don't do this" [`31:17`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1877) [`32:47`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1967) |
| **Time-travel** | Main table holds one version; a separate auxiliary table holds the rest | SQL Server (newest→oldest), SAP HANA (oldest→newest) | Retrofit for systems that started single-version [`31:43`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1903) [`39:04`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2344) [`39:32`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2372) |
| **Delta** | Only the *modified columns* (with prior values) go to a separate delta/rollback segment; main table is overwritten in place | MySQL (rollback segment), Oracle, HyPer | **"Actually the best one"** [`32:20`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1940) |

## Append-only storage

- Every update copies the **entire record** into new space in the table, installs the new value, and repoints the version chain [`33:42`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2022) [`34:08`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2048).
- **Why PostgreSQL did this:** the 1980s design assumed there would be *no write-ahead log*. The tuples themselves *were* the change record, so recovery would be instantaneous. In practice it is slow (lots of random writes); the WAL was added later, but the whole-tuple-copy behavior stayed [`32:47`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1967) [`33:14`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=1994) [`33:42`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2022).

## Version chain ordering — the real performance trade-off

- **Oldest→newest (O2N):** head is the oldest version. Index lookup lands on the head, then you must scan the chain to find your version. No index maintenance on update, but reads pay the traversal cost [`34:37`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2077).
- **Newest→oldest (N2O):** head is the latest version, so a lookup lands directly on what you usually want. But **every update must repoint all index entries** to the new head [`35:05`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2105).
- **With delta storage, N2O costs nothing extra**: the main-table slot is overwritten in place, so the head address never moves and indexes never need repointing. With append-only, the new version is a distinct physical tuple at a new location, so indexes must be updated [`35:32`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2132) [`35:51`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2151).

## Time-travel storage

- Same mechanics as append-only, but old versions are written to a dedicated time-travel table while the main table holds the master/latest version [`35:51`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2151) [`36:18`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2178).
- **It is not inherently better than append-only.** Its value is retrofitting: SQL Server was originally single-version 2PL, so MVCC was grafted on via an auxiliary table while all the existing single-version machinery kept working [`38:42`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2322) [`39:04`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2344).
- Same downside as append-only: full tuple copies — update 1 of 1,000 columns, copy all 1,000 [`39:32`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2372).
- SAP HANA variant (O2N): new versions go into the time-travel table first, then compaction/GC **promotes** the newest one into the main table [`39:32`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2372).

## Delta storage

- On update, copy only the modified columns with their **previous values** plus version info into the delta/rollback segment, then overwrite the main table with the latest version [`40:10`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2410) [`40:52`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2452).
- A reader that finds the main-table version invisible follows the pointer into the delta chain and **replays the log backwards** to reconstruct the older state [`40:52`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2452).
- Resembles LSM trees, but inverted: LSM appends the *new* changes; delta storage applies the new value in the main table and pushes the *previous* value into version storage [`41:05`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2465) [`41:23`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2483).

## Q&A on delta storage

- **A transaction updating A and B produces two delta entries, not one** — the version chain is per logical tuple, so mixing them would corrupt visibility for a transaction that touches only B [`41:37`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2497) [`42:10`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2530).
- **Finding your own changes to roll back:** naively, scan the delta records for entries whose END timestamp equals your transaction's timestamp. The efficient shortcut (used in Project 4) is for the transaction to keep a local write set [`42:23`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2543) [`42:59`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2579) [`43:22`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2602).
- The database guarantees it will not garbage collect your changes until you finish [`43:43`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2623).
- **Updating a primary key** is treated as a delete followed by an insert — philosophically it is a different logical tuple. You lose version chain continuity but the bookkeeping is far simpler [`36:39`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2199) [`36:54`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=2214).
