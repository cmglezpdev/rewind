# 05 - Database Files and the Storage Manager

## File formats

- A disk-oriented DBMS is one or more files on disk; SQLite keeps everything in a single file, other systems spread across many ([`24:40`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1480)).
- Files use a **proprietary format** specific to the DBMS: you cannot open Postgres data files with MySQL ([`24:54`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1494)).
  - Exception: DuckDB deliberately reads other formats, e.g. SQLite database files, and can connect to Postgres ([`25:14`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1514)).
- Counter-trend of the last ~10 years: open, portable formats — **Parquet, ORC, Apache Arrow** — meant to be readable by any system (covered next week). Oracle, MySQL, Mongo, Postgres still use proprietary formats ([`25:32`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1532)).

## Sitting on the OS file system vs raw storage

- Default assumption: files live on an off-the-shelf file system (EXT4, XFS, the Windows equivalent) with nothing special about them ([`25:32`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1532), [`25:59`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1559)).
- In the 1980s some systems shipped **custom file systems** operating directly on raw blocks; most abandoned it because building a DBMS is already hard enough ([`25:59`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1559), [`26:20`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1580)).
- **Oracle ASM (Automatic Storage Management)** is the surviving enterprise example ([`26:20`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1580)):

| Without ASM | With ASM |
| --- | --- |
| DBMS → OS file system → logical volume manager → disks ([`26:51`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1611)) | DBMS → user-space manager doing direct I/O → disks ([`27:01`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1621)) |

- Benefits beyond performance: one interface to manage all storage instead of SSH-ing into the box and poking at the file system ([`27:15`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1635)).
- The course ignores this path and assumes an off-the-shelf file system ([`27:15`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1635), [`27:33`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1653)).

## The storage manager

- Also called disk manager, file manager, or storage engine — same component, different names ([`27:33`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1653), [`27:46`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1666)).
- Responsibilities ([`27:46`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1666), [`27:59`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1679), [`28:21`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1701), [`28:34`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1714)):
  - Manage the files on disk and the pages inside them.
  - Optionally do its **own disk scheduling** (batching and ordering requests) instead of delegating to the OS via `fread`.
  - Track what is read/written, reuse space after deletes, do compaction, spread or move data across pages.

## Replication is somebody else's problem

- Most systems do **not** keep multiple copies of pages on disk; redundancy is expected either below (storage appliances, S3 replication) or above the storage manager (a higher layer dispatching the write to other replicas) ([`28:51`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1731), [`29:12`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1752)).
- The MySQL double write is a **performance** trick, not redundancy: the sequential file is discarded once the random pages are updated ([`29:33`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1773)).
- The lecture discusses table data, but the same properties hold for indexes and other database objects ([`29:33`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1773)).
