# 08 — Data Skipping and Zone Maps

## The idea

- Use pre-computed information about a table to conclude that certain pages or blocks **do not need to be read at all** for the current predicate ([`43:33`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2613), [`43:48`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2628), [`44:05`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2645)).
- Two families, mirroring lossy vs. lossless compression ([`44:05`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2645)).

## Lossy: approximate query processing

- If exact results are not required, **sample** pages instead of scanning all of them and attach statistical confidence ([`44:05`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2645)).
- Cloud/OLAP systems expose approximate variants of `COUNT`, `MIN`, `MAX`, `AVG` (Oracle has an approximate count) ([`44:41`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2681)).
- Motivating example: daily website visitors — 999 million vs. 998 million rarely matters ([`45:03`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2703)).
- Key constraint: the DBMS will **never** do this implicitly — the application must explicitly ask for approximation ([`45:03`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2703)).

## Lossless: zone maps

- A **zone map** is pre-computed aggregate metadata (min, max, avg, sum, count) describing the data inside a page or a set of pages ([`45:31`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2731), [`46:01`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2761)).
- **Granularity trade-off**: fine-grained (per page) is more selective; coarse-grained (many pages) is cheaper but forces you to read more data than needed ([`45:31`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2731)).

### Worked example ([`46:01`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2761))

- Query: `SELECT * FROM table WHERE value > 600`.
- The page's zone map says **max = 400**.
- Therefore no tuple on that page can match → **skip the entire page** without reading it.
- At scale (thousands or billions of tuples) this is a huge win.

## Support in practice

- Essentially every OLAP system supports some notion of zone maps ([`46:01`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2761)).
- **Parquet** and **ORC** support them out of the box; all column stores generate something equivalent ([`46:58`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2818)).

## Naming

- "Zone map" is **Oracle's** term but has become the canonical name — compared to saying "Kleenex" for a facial tissue ([`46:58`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2818)).
- The original paper calls them **Small Materialized Aggregates (SMA)**; "materialized" meaning the result is pre-computed and stored rather than computed on the fly ([`46:58`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2818)).
