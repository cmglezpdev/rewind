# 07 — Why compress, and at what granularity

## Motivation

- I/O is the main bottleneck; a column store already fetches only the minimum needed data ([`40:52`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=2452), [`41:03`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=2463)).
- Next lever: increase the **useful information per I/O**. If an uncompressed page holds 10 tuples, a compressed one holds 20 ([`41:31`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=2491)).
- Classic trade-off: **compression ratio vs. compute/speed**. Aggressive schemes shrink storage but cost a lot to unpack ([`41:31`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=2491)).
- Analogy: a modern video codec gets tiny files with near-invisible loss but needs modern hardware to decode; 1990s MP3 is simple ([`42:03`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=2523)).
- The bargain: pay higher CPU cost, offset by reading far less from disk — and in some cases **operate directly on compressed data** without decompressing ([`42:23`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=2543)).

## Three goals for a DBMS compression scheme

1. **Produce fixed-length values** so columnar offset arithmetic still works. Off-the-shelf compression breaks this — which is why the DBMS implements compression itself ([`42:23`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=2543), [`43:03`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=2583)).
2. **Late materialization** — postpone decompression as long as possible. Rip through a billion compressed tuples, find the one match, then decompress *that one*, rather than decompressing a billion to find one ([`43:03`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=2583), [`43:38`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=2618)). The same principle applies to stitching columns back together: delay it until later in the query plan, after data has been thrown away ([`43:38`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=2618)).
3. **Lossless only** — compress then decompress must return the exact same bits ([`44:14`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=2654)).
   - Lossy schemes (MP3/MP4) exploit human perception; people *do* notice when a bank account has the wrong number ([`44:52`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=2692)).
   - Any lossy reduction must be **human-controlled** — e.g. rolling a year of 1-second temperature readings into 10-minute averages. A database will do it if you ask, but never automatically ([`45:13`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=2713)).

## Granularity levels

| Level | Notes |
| --- | --- |
| **Block level** | The lecture's straw man; common in OLTP systems and row stores ([`45:47`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=2747), [`46:45`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=2805)) |
| Tuple level | Possible in SQL Server; also TerarkDB, a RocksDB fork bought by ByteDance, did tuple-level compression for LSMs ([`46:45`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=2805), [`47:04`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=2824)) |
| Attribute level | PostgreSQL TOAST — compress an overflow page for one large value ([`45:47`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=2747), [`47:04`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=2824)) |
| **Column level** | Where the real wins are; every column store / PAX system does this, and Parquet and ORC give it to you ([`46:20`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=2780), [`47:04`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=2824)) |

The lecture focuses on block level (as the counterexample) and column level (as the answer) ([`45:47`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=2747)).
