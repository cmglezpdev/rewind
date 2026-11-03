# 05 — Problems with tuple-oriented storage

Four problems motivate the alternatives covered later in the lecture [`20:58`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1258).

## 1. Fragmentation

- Without compaction, pages are not fully utilized [`20:58`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1258)
- Even *with* compaction, the slot array grows one way and tuple data the other, so unless alignment is perfect there is always leftover unusable space in the middle [`20:58`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1258)

## 2. Useless disk I/O

- Disk access granularity is the page. Updating a single tuple in a page that holds ~1000 tuples still requires reading Postgres's full **8 KB** page [`21:22`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1282)
- Inserts are cheap (append-like, no read needed); updates are what pay the cost [`21:51`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1311)

## 3. Random I/O

- Worst case: one UPDATE query touching 10 tuples spread over 10 different pages means reading 10 pages and writing 10 pages, most of the fetched bytes irrelevant [`22:05`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1325)

## 4. The in-place update assumption may not hold

- SSDs do not truly do in-place updates — they rewrite the whole block [`22:32`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1352)
- Some storage layers are **append-only**: once a page is written it can be deleted but never overwritten without creating a new page [`22:53`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1373)
- Real examples of append-only access methods: **HDFS** (Hadoop), **Amazon S3**, **Google Colossus** [`23:28`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1408)

## Where the lecture goes next

- **Log-structured storage / LSM trees** — assume append-only; faster writes, slower reads [`24:10`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1450)
- **Index-organized storage** — keep slotted pages, but replace the heap with an index (e.g. B+Tree) [`24:23`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1463)
- **Tuple internals** — what the bytes of a tuple actually look like [`24:23`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=1463)
