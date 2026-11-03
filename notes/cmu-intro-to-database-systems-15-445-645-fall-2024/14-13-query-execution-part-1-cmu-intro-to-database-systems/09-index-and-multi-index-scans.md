# 09 — Index Scans and Multi-Index Scans

## Choosing an index

At runtime the DBMS must pick which index (if any) to use. Factors ([`47:53`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2873)):

- Does the index contain the attributes referenced by the query?
- Is the predicate **selective** enough, or will it degenerate into a full leaf-node scan?
- Is the index unique or non-unique?

The actual decision procedure is **query optimization**, deferred to next week ([`48:30`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2910)).

## Selectivity example ([`48:50`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2930))

Table of 100 tuples, two indexes (`age`, `dept`), query = under 30 **and** in CS **and** in the US:

| Scenario | Data | Best index | Why |
| --- | --- | --- | --- |
| 1 | 99 people under 30, only 2 in CS | **dept** | Returns 2 tuples immediately; `age` would force a leaf scan ([`49:05`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2945)) |
| 2 | 99 people in stats dept, only 2 under 30 | **age** | Same reasoning, inverted ([`49:49`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2989)) |

- When **both** indexes look good, use both — a **multi-index scan** ([`50:09`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3009)).

## Multi-index scan

Same technique, three vendor names ([`50:09`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3009)):

- Oracle — **multi-index scans**
- PostgreSQL — **bitmap scans** (it literally builds bitmaps: one bit per tuple, set if matched) ([`52:50`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3170))
- MySQL — **index merges**

### Procedure ([`50:35`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3035), [`51:23`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3083), [`52:20`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3140))

1. Probe each index, collecting **record IDs** of matching tuples.
2. Combine the sets: **union** for `OR`, **intersection** for `AND`.
3. Convert surviving record IDs into (file, page number, offset) and fetch the actual records.
4. Apply the remaining predicates (e.g. `country = 'US'`) and emit survivors.

- Under the iterator model, all this work happens on the **first** `next()` call; subsequent calls just walk the cached result set ([`50:52`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3052), [`51:23`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3083)).
- Oracle takes intersections of **sets** rather than bitmaps ([`52:50`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3170)).
- This is exactly why the generic composable operator API matters: the parent never has to know that its child did index probes and set intersection ([`50:52`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3052)).

## Indexes built on the fly

- Whether the index already exists or is built during the query **does not matter** to the rest of the plan ([`53:24`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3204), [`53:41`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3221)).
- SQL Server has a **spooling index scan** operator: a sequential scan feeds tuples up, the operator builds an index (a blocking call), then the index is probed to produce output — invisible to everything above ([`53:41`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3221), [`54:01`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3241)).
