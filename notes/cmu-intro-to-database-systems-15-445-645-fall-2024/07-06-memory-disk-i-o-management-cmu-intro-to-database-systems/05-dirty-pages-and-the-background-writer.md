# 05 — Dirty Pages and the Background Writer

## Fast path vs slow path on eviction

| | **Clean page** | **Dirty page** |
|---|---|---|
| Action | Virtually "drop" the frame — no zeroing needed, just copy the new page over it (frames are all the same size, so no stale bytes leak) ([`51:06`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=3066), [`51:30`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=3090)) | Must be written out and confirmed safe on disk before the frame can be reused ([`51:30`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=3090)) |
| Cost | Immediate reuse | Blocking write I/O |

## The trade-off

- The eviction policy must weigh the cheap drop against the expensive write-back ([`51:48`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=3108)).
- The catch: sometimes all the **clean** frames hold pages you definitely want to keep, while the page you truly want gone is **dirty** — written once and never to be read again ([`51:48`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=3108), [`52:15`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=3135)).
- Why not a side buffer to park dirty pages in? Because if you had that memory, you should just be using it for the buffer pool itself ([`52:28`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=3148)).

## Background writer

Mitigation, not a cure ([`52:46`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=3166)):

1. A worker periodically scans the frames for dirty pages.
2. It writes them out eagerly, **without evicting** — the page stays in memory.
3. Once the write is safe on disk, the dirty flag is flipped to clean.
4. The eviction policy now sees a clean page and can take the fast path.

Effect: eviction no longer blocks on I/O ([`52:46`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=3166), [`53:19`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=3199)).

### Why the OS version of this is not equivalent

- `mmap` has a background writer that does roughly the same thing, but the OS **knows nothing about transactions or the write-ahead log**, so it cannot know a page must not be flushed until its log record is flushed. You cannot tell it to wait; inside your own system you can enforce it ([`53:19`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=3199), [`53:44`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=3224), [`53:58`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=3238), [`54:23`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=3263)).

### Tuning it

- **Too aggressive**: resources spent flushing dirty pages instead of running queries ([`54:23`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=3263)).
- **Never runs**: every eviction blocks the query on a flush ([`54:23`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=3263)).
- There is no single magic setting — systems expose different policies ([`54:23`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=3263)).
- Enterprise "secret sauce" lives here. A simple, effective trick: **piggyback on the replacement policy** — flush the dirty pages that are most likely to be evicted soon, rather than arbitrary dirty pages ([`54:57`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=3297)).
