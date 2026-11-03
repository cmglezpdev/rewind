# 08 - Heap Files, the Page Directory, and the Free Space Map

## Ways to organize pages in files

| Organization | Description | Status |
| --- | --- | --- |
| **Heap file** | Unordered collection of pages; tuples land anywhere ([`43:03`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2583), [`43:45`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2625)) | Most common; the focus of this lecture |
| **Tree / index-organized files** | Table organized as a tree structure ([`43:03`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2583)) | Covered next week |
| **Sequential / sorted files / ISAM** | Pages sorted on a tuple value with an index on top; from the 1970s–80s ([`43:03`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2583)) | Effectively deprecated ([`43:32`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2612)) |

- Note: none of this requires knowing what is *inside* a page yet — only how to address it ([`43:45`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2625)).

## Heap file API

The storage manager only needs to expose ([`44:08`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2648), [`44:34`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2674)):

- Create a page (append as the table grows)
- Get a page by page ID
- Write data to a page and have it flushed to disk
- Delete a page
- Expose an iterator for page-by-page scans

Supporting metadata: where files physically live and how much space is available inside them ([`44:51`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2691)).

## Locating a page

- **Single file**: pure arithmetic — `offset = page_number * page_size`. This is essentially SQLite, plus extra metadata about what each page represents (index vs other) ([`45:04`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2704), [`45:30`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2730)).
- **Multiple files**: you need a **page directory**, conceptually a hash table mapping a page number to a file location plus an offset ([`45:30`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2730), [`45:49`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2749), [`46:02`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2762)).
- One directory entry per **database object** — table, index, etc. ([`46:22`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2782), [`46:35`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2795)).
- The page directory is "the database of the database": it must itself be pages on disk kept in sync and durably written alongside the data pages ([`46:35`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2795)).
- It is not updated often: rather than allocating a page at a time (which Postgres does), a system may allocate a gigabyte, update the directory, flush it, then start writing table data ([`46:55`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2815), [`47:11`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2831)).

```mermaid
flowchart LR
    Q["lookup: table X, page 0"] --> PD[Page directory]
    PD --> F["file location for table X"]
    F --> A["offset = page_id * page_size"]
    A --> P[(Page on disk)]
```

## The free space map

- Tracks how much free space each page has so an insert does not have to scan pages sequentially looking for a slot ([`47:11`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2831)).
- Deliberately **not** flushed as strictly as the page directory, so it may be wrong; the system must handle finding a page it believed was empty and is not ([`47:33`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2853), [`47:46`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2866)).
- Free/empty pages are also tracked so space can be reclaimed via compaction ([`47:56`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2876)).
- Some systems additionally record per-page **type** (data page, metadata page, etc.) ([`47:56`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2876), [`48:12`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2892)).
- Q&A: where does the free space map live? **Both** memory and disk — some systems fold it into page-directory metadata, Postgres keeps it in a separate file loaded into memory (explicitly not `mmap`) ([`59:09`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3549), [`59:27`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=3567)).
