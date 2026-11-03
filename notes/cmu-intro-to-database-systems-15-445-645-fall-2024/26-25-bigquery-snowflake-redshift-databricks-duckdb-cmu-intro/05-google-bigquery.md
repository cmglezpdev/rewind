# 05 — Google BigQuery (Dremel)

## History

- Internal project **Dremel**, built in 2006 to run SQL over files (CSV etc.) sitting in GFS ([`32:45`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=1965)).
- Originally **shared-nothing**: data had to be copied from the object store into the compute node before querying. Rewritten in 2010 to be **shared-disk** on top of GFS / Colossus ([`33:12`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=1992)).
- Google was publicly the NoSQL company, but Dremel is credited with making SQL popular again internally; Spanner and others followed ([`33:34`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2014)).
- Commercialized as **BigQuery in 2012**. It predates Snowflake as an internal project. The papers still call it Dremel; the product name changed because Dremel is a real power-tool company ([`33:58`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2038), [`34:17`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2057)).

## Architecture at a glance

- Shared-disk / disaggregated storage, **vectorized query processing**, explicit shuffle operator ([`34:42`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2082)).
- Internal file format, believed to be called **Capacitor**; not public, but described as "smells like Parquet/ORC" — PAX columnar storage ([`34:42`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2082)).
- Zone maps, Bloom filters, dictionary and RLE compression ([`35:12`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2112)).
- Only extra index type: **inverted indexes**, for finding keys inside JSON/text fields ([`35:12`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2112)).
- **Hash joins only** — no sort-merge joins ([`35:12`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2112)).
- Optimizer is rule/heuristic-based, plus runtime adaptivity enabled by the shuffle phase ([`35:12`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2112)).

## The shuffle service — BigQuery's differentiator

This is the key thing BigQuery does that Snowflake does not ([`35:44`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2144)).

- There is an **explicit shuffle between every pipeline**, run on dedicated hardware with custom silicon (FPGA-like) ([`35:44`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2144)).
- Shuffles are **pipeline breakers** by definition — data has to move elsewhere to be processed ([`36:15`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2175)).

What it buys:

1. **Fault tolerance** — results always live in the in-memory shuffle service, so a dead worker is replaced and the new one resumes from the shuffle ([`36:31`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2191)).
2. **Straggler mitigation** — a slow worker is simply killed and its work reassigned; nobody is blocked on it because everyone pulls from the shuffle service ([`36:56`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2216), [`37:22`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2242)).
3. **Dynamic scaling** — statistics kept on partition fullness let the coordinator decide whether the next stage needs more or fewer workers; **worker count need not be the same between stages** ([`37:22`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2242), [`37:48`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2268)).
4. **Dynamic partition load balancing** — if one partition gets too full mid-shuffle, the coordinator broadcasts a re-partition instruction and workers apply another hash round to just that partition, exactly like recursive partitioning in a grace hash join; the overflow is later fed back through a worker to redistribute ([`38:10`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2290), [`38:26`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2306), [`38:48`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2328)).

- Side benefit: individual operator implementations never need to know how many nodes they run on — the shuffle phase hides all scale-out/scale-down complexity ([`39:05`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2345), [`39:27`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2367)).
