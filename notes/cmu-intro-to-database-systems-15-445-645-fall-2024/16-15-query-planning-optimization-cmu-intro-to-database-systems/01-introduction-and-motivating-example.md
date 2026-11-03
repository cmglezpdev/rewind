# 01 — Introduction & the motivating example

## What this lecture is about

- Previous lectures covered how to **run** a plan (processing models, parallel execution, physical operators like hash join / nested loop join / index scan). This lecture covers where those plans **come from** ([`2:20`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=140), [`2:48`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=168)).
- Goal: go from a SQL query to a physical plan that the execution engine can run ([`3:21`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=201)).
- The **catalog** is the internal metadata database: tables, columns, types, indexes (clustered/unclustered), tuple counts, page counts ([`3:40`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=220), [`3:59`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=239)).

## The running example

`SELECT` employee names joined with departments on department ID, filtered to the "toy" department ([`3:21`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=201)).

A naive, literal translation of the SQL into relational algebra gives: scans → cartesian product → join-predicate filter → department-name filter → projection ([`3:59`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=239)).

## Cost walkthrough: 2,000,000 → 37 I/Os

Each step below is a single change to the plan, with the resulting estimated I/O count:

| Step | Change applied | Estimated I/Os |
|---|---|---|
| 1 | Naive plan: cartesian product + materialization to temp files | ~2,000,000 ([`6:00`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=360)) |
| 2 | Replace cartesian product with a page/block nested loop join | 54,000 ([`7:03`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=423)) |
| 3 | Replace nested loop join with a sort-merge join | 7,000 ([`7:44`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=464)) |
| 4 | Switch materialization model → vectorized/pipelined model (removes intermediate writes+rereads) | 3,000 ([`8:44`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=524), [`8:55`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=535)) |
| 5 | Push the department-name predicate below the join, swap inner/outer, use the index on department name and the index on department ID | 37 ([`10:21`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=621), [`11:00`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=660)) |

Assumptions used in the back-of-envelope math: 500 page reads for employees, ~1M for departments, ~2,000 matching join records, 50 employees per department under a **uniform distribution** assumption (which "causes problems for us later on") ([`4:47`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=287), [`5:45`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=345), [`6:00`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=360)).

Note on step 4: most systems implement only **one** processing model and cannot choose between materialization and vectorization at plan time; the win instead comes from choosing operator order so you avoid unnecessary spilling to disk ([`8:55`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=535), [`9:12`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=552)).

## Three warnings about this topic

1. **This is hard.** The in-joke: if you fail at query optimization, your backup career is rocket science, because optimizing a SQL database is harder ([`12:33`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=753)).
2. **The lecturer's weakest area.** He names Thomas Neumann (the "German" behind **Umbra**) as the real expert — he wrote his own optimizer *and* one of the best engines from scratch ([`13:14`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=794)).
3. **It pays.** Database companies asking CMU for hires consistently ask for query-optimizer people; demand will not go away, and LLMs will not make the problem disappear ([`13:37`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=817), [`14:00`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=840)).

## Lecture roadmap

1. Background on query optimization ([`11:54`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=714))
2. Rule-based / heuristic optimization — what most systems build first ([`11:54`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=714))
3. Cost-based optimization ([`12:33`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=753))
4. Cost estimation ([`12:33`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=753))
