# 11 — Why SQL Beats Writing Relational Algebra

## Relational algebra is procedural

- Despite mathematical notation, it defines the **steps** the DBMS must perform — you are writing the query plan ([`1:00:41`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3641), [`1:00:58`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3658)).
- A 1970s complaint about Codd's paper was that it was "too mathematical". The lecturer disagrees — any CS undergrad should be able to follow it ([`1:00:41`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3641), [`1:00:58`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3658)).

## The ordering problem — worked example

Two ways to express the same query ([`1:01:18`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3678)):

1. Join R and S first, then apply the select filter.
2. Apply the select on S first (filtering on `b_id`), then join the smaller result against R.

- Performance differs **dramatically** depending on the actual data ([`1:01:44`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3704)):
  - 10 tuples → irrelevant.
  - Billions of tuples → you want to filter S as aggressively as possible *before* joining.
- **Relational algebra has no concept of reordering** — you have specified exactly what must happen ([`1:01:44`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3704)).
- Declarative SQL lets the DBMS choose. Change the physical layout or data structures and the query does not change ([`1:02:12`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3732), [`1:03:30`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3810)).

## Query language history

- The relational model shipped with **no programming language**; SQL was added by IBM a few years later ([`1:02:41`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3761)).
- Codd proposed his own language, **Alpha** — never implemented ([`1:02:41`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3761)).
- **SQUARE**, an early SQL precursor, required a keyboard that did not exist because expressions were written vertically ([`1:02:41`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3761), [`1:03:06`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3786)).
- **QUEL**, invented by Stonebraker for Ingres (which became Postgres), was a competing language ([`1:03:06`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3786)).
- SQL became the de facto standard; a formal SQL standard exists but no system implements it exactly ([`1:03:06`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3786), [`1:03:30`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3810)).

## Q&A: where did the keys go in relational algebra?

- **Question:** relational algebra never mentions primary keys — what if a union produces two tuples with the same key? ([`1:03:52`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3832))
- **Answer:** keys are declared in the *schema*, and the DBMS enforces uniqueness there. At **query execution** time the primary key is irrelevant — joins and intersections work without knowing it. Foreign keys are the same: they are integrity constraints, not query mechanics ([`1:04:12`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3852), [`1:04:36`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3876)).
