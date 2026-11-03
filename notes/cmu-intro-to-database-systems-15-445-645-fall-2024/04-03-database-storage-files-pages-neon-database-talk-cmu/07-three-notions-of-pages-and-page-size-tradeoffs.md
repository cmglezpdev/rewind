# 07 - The Three Notions of a Page and Page-Size Trade-offs

## Three page concepts stacked on each other

| Level | Size | Notes |
| --- | --- | --- |
| **Hardware page** | 4 KB for historical reasons | Largest **atomic write** the device guarantees ([`36:39`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2199)) |
| **OS page** | 4 KB by default (x86 legacy); huge pages of 2 MB or 1 GB available | Virtual-memory bookkeeping ([`38:18`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2298), [`38:34`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2314)) |
| **Database page** | Varies per system | Built on top of the OS page ([`38:51`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2331)) |

### Atomic write, defined in class

- All-or-nothing: the block either lands completely or not at all ([`37:01`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2221), [`37:29`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2249)).
- Write one 4 KB block, get an acknowledgement, crash, come back — the block should be there. Write 8 KB split across two blocks and the hardware guarantees nothing about both landing: the first may be written and the second lost ([`37:29`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2249), [`37:42`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2262), [`37:59`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2279)).
- Both the hardware and the OS will **lie** about durability — covered next class ([`37:59`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2279), [`38:18`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2298)).

## Database page sizes by system

- SQLite: 4 KB, configurable down to 512 bytes ([`38:51`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2331), [`39:07`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2347)).
- RocksDB and WiredTiger (MongoDB's storage engine): 4 KB ([`39:07`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2347)).
- SQL Server and Postgres: 8 KB ([`39:07`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2347)).
- MySQL: 16 KB by default ([`39:07`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2347)).
- DB2 and other enterprise systems: page size settable **per table**, e.g. 64 KB for one table and 4 KB for another ([`39:07`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2347), [`39:34`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2374)).
- Q&A: with OS huge pages you simply pack multiple database pages inside one OS page. **Transparent huge pages** — the OS silently converting pages — was "a disaster" and is covered later ([`39:34`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2374), [`39:57`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2397)).

## Choosing a page size

- Depends on **data structure** and on **workload**; "there's no free lunch" ([`40:29`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2429), [`41:41`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2501)).
- Larger pages ([`41:41`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2501), [`41:59`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2519)):
  - Good for read-heavy sequential scans — one fetch brings in a lot of rows, then rip through it.
  - Bad for small updates: updating 1 KB inside a 64 KB page forces writing the entire 64 KB back, because block storage cannot write partial pages and the whole page must be consistent ([`41:11`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2471)).
- Smaller pages ([`40:49`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2449), [`42:16`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2536)):
  - Good for finer-granularity reads and many small writes — you still pay random-write cost but avoid dragging in useless data.
- Teaser for next week: if data were stored **by column** rather than by row, a page could hold a single column — a different design axis entirely ([`42:30`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2550), [`42:42`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2562)).
