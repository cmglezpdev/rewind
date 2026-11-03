# 09 — Columnar compression schemes

All of these are implemented **by the DBMS**, so the execution engine knows how to access data without decompressing it ([`55:28`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3328)). Names vary between systems ([`55:28`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3328)).

## 1. Run-Length Encoding (RLE)

- Replace repeated consecutive values with a **triplet**: `(value, start offset, run length)` ([`55:55`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3355), [`56:24`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3384)).
- Example table: 8 tuples with an `isDead` yes/no flag. Unsorted, the values are intermixed, so **the triplets are actually larger than the original data** ([`57:20`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3440), [`57:59`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3479)).
- Even so, `COUNT(*) GROUP BY isDead` can be answered by summing run lengths directly on compressed data ([`57:59`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3479), [`58:20`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3500)).
- **Sort the column and the win explodes**: the same 8 tuples collapse to **2 triplets**; a low-cardinality attribute (e.g. sex) can represent a billion people in a handful of triplets ([`58:20`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3500), [`58:50`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3530)).
- **Sorting is tricky**: reordering one column forces the other columns to be reordered identically, and the sort order that's best for one column may be the worst for another. Systems have heuristics for this ([`56:24`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3384), [`56:48`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3408)).
- Larger values can be mapped to an enum first, then RLE'd on the enum codes ([`57:41`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3461)).
- RLE composes: compress once, then RLE the result for a bigger win ([`59:06`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3546)).

## 2. Bit packing (a.k.a. bit shaving)

- If every value in a column is far smaller than the declared type's maximum, drop the leading zero bits ([`59:06`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3546), [`59:35`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3575)).
- Common case: an attribute declared `INT` (4 bytes) whose values all fit in 16 bits ([`59:35`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3575)).
- Worked example: values all under 200 need only ~2 bits of significance each; the column shrinks to **64 bits** total ([`1:00:02`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3602), [`1:00:28`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3628)).
- Bit shifting restores the original form when an operation needs it ([`1:00:28`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3628)).

## 3. Bit packing with patching (Redshift "mostly encoding")

- Bit packing breaks on **outliers** ([`1:01:24`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3684)).
- Fix: leave a special marker bit sequence at the outlier's offset pointing to an **auxiliary table** holding the real value ([`1:01:24`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3684)).
- Scan rips through the packed column ignoring outlier markers, then goes back for the few large values ([`1:02:08`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3728)).
- Example: original 26 bits → 122 bits with packing plus the outlier table (toy scale; think billions of tuples) ([`1:02:26`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3746)).

## 4. Bitmap encoding

- Keep one bitmap **per distinct value**; a 1 at offset *i* means tuple *i* has that value ([`1:02:26`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3746), [`1:03:00`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3780)).
- `isDead` example: 64 bits of original data → **16 bits** ([`1:03:17`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3797)).
- **Fails at high cardinality.** Zip-code example: ~43,000 US zip codes, 10 million tuples ([`1:03:17`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3797)):

| Representation | Size |
| --- | --- |
| Raw 10M 32-bit integers | **40 MB** |
| 43,000 bitmaps × 10M bits | **53 GB** |

- Second problem: inserting a tuple must append at the end, otherwise bits shift in the middle — expensive ([`1:04:04`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3844)).
- Real systems don't store raw bitmaps — they use **compressed bitmaps**, most popularly **roaring bitmaps**, which lazily expand only dense regions. Roaring bitmaps are widely used, including in **Pinot**, the engine behind StarTree ([`1:04:27`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3867)).

## 5. Delta encoding

- Store one absolute starting value, then only the increments/decrements from the previous value ([`1:05:07`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3907)).
- Ideal for time-series: timestamps increment by a fixed minute, and temperature doesn't jump from 99° to 0° in a minute ([`1:05:07`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3907)).
- **Stacks with RLE**: the deltas are a run of `+1`s, so RLE the delta column for a further win ([`1:05:51`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3951)).
- Example: 320 bits → **96 bits** ([`1:06:27`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3987)).
- **Frame of reference** is the sibling scheme: deltas are taken against one global reference value for the column rather than the previous row ([`1:06:27`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3987), [`1:07:00`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=4020)).

## 6. Dictionary encoding — the most important one

- Replace frequently occurring values with integer codes plus a mapping table ([`1:07:00`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=4020)).
- Nearly all systems map **one code to one value**, not multi-value/multi-tuple codes ([`1:07:27`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=4047)).
- Requirements: fast encode/decode, and the dictionary **exposed to the rest of the system** so queries can run on it directly ([`1:07:27`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=4047)).

### Order-preserving codes

- Sort the dictionary by value so codes carry the **same lexicographical ordering** as the original data ([`1:08:01`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=4081)).
- Then `WHERE name LIKE 'And%'` becomes `WHERE code BETWEEN 10 AND 20` ([`1:08:49`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=4129)).
- How the range is derived: sequentially scan the sorted dictionary for matches; once you hit a non-matching entry, nothing after it can match either ([`1:09:56`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=4196), [`1:10:40`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=4240)).
- **Payoff**: with a billion tuples but only ~100 dictionary codes, the query is answered from the dictionary alone — the billion tuples are never read ([`1:08:49`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=4129)).
- `SELECT DISTINCT name` is likewise answerable from the dictionary; only queries needing the actual per-tuple values touch the columns ([`1:09:28`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=4168)).
- **Where the dictionary lives**: in the page header, or in the row group in the case of Parquet ([`1:09:28`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=4168)).

## Stitching tuples back together

- Question from class: with different columns encoded differently (e.g. RLE), how do you reconstruct a tuple? Answer: walk the triplets to compute where the value *would* be if materialized — treat the RLE as a log — while avoiding materializing the empty/extra bits unnecessarily ([`1:00:28`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3628), [`1:00:51`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3651), [`1:01:24`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=3684)).

## Lecture wrap-up

- Main takeaway: know the pros and cons of row vs. column stores; analytical systems want a column store, typically realized as **PAX** ([`1:10:57`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=4257)).
- The early/mid-2000s attempts to contort row stores into column stores with extra data structures all went away — you want a system that operates natively on columnar data ([`1:10:57`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=4257)).
- Because a column's values share a small domain, many compression schemes apply, improving both storage size and query performance, and often letting queries run without decompressing ([`1:11:36`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=4296)).
- This closes the storage layer; next up is the buffer pool manager, which Project 1 is based on ([`1:11:54`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=4314)).
