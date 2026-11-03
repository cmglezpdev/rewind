# 09 — Statistics and selectivity estimation

## Where statistics come from

- Every system with a query optimizer maintains catalog statistics about what the data looks like, and uses them to estimate **predicate selectivity** ([`1:08:45`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4125), [`1:09:07`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4147)).
- Usually maintained in the background; can be triggered manually with `ANALYZE`, `ANALYZE TABLE`, or `UPDATE STATISTICS`. These run a background sequential scan over the tables and recompute the internal representation (histograms, sketches, …) ([`1:09:07`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4147)).
- Refresh policies in practice ([`1:09:45`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4185), [`1:19:34`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4774), [`1:19:55`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4795)):
  - **Oracle** — nightly cron job around 9–11 pm.
  - **Postgres** — triggered when roughly **20%** of a table has changed; `VACUUM` also maintains statistics.
  - The two options generally: **time-based** (daily) or **change-threshold-based** (20% of data changed). Updating on every insert/delete is too expensive to maintain.

## Selectivity, worked

**Selectivity** = the fraction of a table's tuples expected to satisfy a predicate, i.e. the expected output size of the operator ([`1:10:19`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4219)).

With a histogram of ages ([`1:10:19`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4219), [`1:10:44`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4244), [`1:11:01`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4261)):

- Predicate `age = 9`; jump to that offset; cardinality = **4** occurrences.
- Total tuples = **45** → selectivity = **4/45**.
- So even if the table holds 45,000 rows, the optimizer expects ~4 tuples out of the scan.

That estimate then drives **join ordering**: after predicate pushdown, you know how much data reaches each join input and can decide which side is larger ([`1:11:01`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4261), [`1:11:27`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4287)).

**Difficulty ranking of predicates** ([`1:11:27`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4287), [`1:11:44`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4304)):

1. Equality on a **unique** column — easiest, best case.
2. Equality on a non-unique column — the example above.
3. `!=` — trivially `1 −` the equality estimate.
4. **Non-equality predicates on non-unique values** — the hard case.

## The three dangerous assumptions

| Assumption | What it says | Why it breaks |
|---|---|---|
| **Uniform data** | Values are evenly distributed inside a bucket | You can keep exact counts for **heavy hitters** (top-most-frequent values), but you can't store a per-value histogram when a billion records hold a billion unique values — so you aggregate and lose fidelity ([`1:11:44`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4304)) |
| **Independent predicates** | Multiply the individual probabilities to get the joint probability | Real columns are correlated ([`1:12:25`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4345)) |
| **Inclusion principle** | When joining, assume at least one matching key exists in the other table | Not always true ([`1:12:25`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4345)) |

## The Honda Accord example

A cars table with **10 makes** and **100 models**, and the predicate `make = 'Honda' AND model = 'Accord'` ([`1:12:57`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4377)):

- Under independence + uniformity: `1/10 × 1/100 = 1/1000`.
- The truth: only Honda makes an Accord, so the real selectivity is `1/100`.
- **The estimate is off by an order of magnitude** on this trivial two-predicate query ([`1:13:17`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4397), [`1:13:46`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4426)).

## Correlated statistics

- Some systems support **correlated statistics**: you declare that two columns are correlated so their statistics are computed **jointly** rather than separately ([`1:13:46`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4426)).
- **The system does not discover correlations on its own** — a human operator has to tell it ([`1:14:04`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4444)).
- **Q&A — does any system learn correlations from repeated query patterns?** Pavlo doesn't think so; high-end systems *might*, Oracle maybe, but he doesn't know of one ([`1:14:04`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=4444)).
