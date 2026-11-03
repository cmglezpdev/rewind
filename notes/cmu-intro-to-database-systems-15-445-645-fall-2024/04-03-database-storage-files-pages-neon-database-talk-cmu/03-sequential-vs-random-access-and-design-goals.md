# 03 - Sequential vs Random Access and Design Goals

## The access-pattern distinction

- Unlike theory courses where access pattern is free, real devices care: **random access is almost always slower than sequential access** ([`14:19`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=859), [`14:34`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=874)).
- Random access = reading from arbitrary, scattered locations; sequential access = reading contiguous data ([`14:55`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=895), [`15:12`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=912)).
- Spinning-disk intuition: a platter spinning in helium with a record-player-style arm. Sequential = move the arm once and read a lot; random = physically move the arm repeatedly, which is slow ([`15:12`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=912), [`15:37`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=937)).
- On HDDs the sequential-vs-random gap is orders of magnitude; on SSDs it is smaller but sequential still wins ([`15:55`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=955)).
- SSDs additionally show a large read-vs-write asymmetry (reads much faster than writes) that HDDs do not ([`17:09`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1029)).

## Consequences for system design

- Data structures and algorithms are chosen to **maximize sequential I/O** ([`16:12`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=972), [`16:28`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=988)).
- **MySQL double-write example** ([`16:39`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=999), [`16:57`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1017), [`17:09`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1029)):
  1. Dirty pages are first written sequentially to a side buffer and flushed.
  2. The commit is acknowledged to the outside world as safe.
  3. In the background the real (randomly located) pages are updated.
  - Data is deliberately written **twice** because avoiding random access is still cheaper.
- **Allocation in extents**: instead of allocating 4 KB at a time, allocate large chunks (e.g. a megabyte) so the OS is more likely to lay data out sequentially. Some space is wasted, but storage is cheap ([`17:28`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1048), [`17:50`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1070)).
  - Caveat noted for the later demo: Postgres does not appear to do this ([`18:09`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1089)).

## Design goals for the rest of the semester

- Assume any data access may miss memory and require a disk fetch, and protect the system while that happens ([`18:25`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1105)).
- Support databases **larger than available memory** on a single machine — i.e. the same illusion as virtual memory, but implemented by the DBMS itself, not the OS, because the DBMS can always do it better ([`18:25`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1105), [`18:46`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1126), [`19:07`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1147)).
- Avoid large stalls: keep something doing useful work while I/O is in flight (not always possible when everyone is blocked on a slow disk) ([`19:07`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1147)).
- Maximize sequential access even at the cost of extra CPU work ([`19:29`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1169)).
