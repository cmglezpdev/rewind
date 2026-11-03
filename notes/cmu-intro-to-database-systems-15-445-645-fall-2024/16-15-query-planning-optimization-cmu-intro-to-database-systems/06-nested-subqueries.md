# 06 — Nested subqueries

## The problem

- Subqueries are not joins, so they need separate reasoning ([`54:23`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3263)).
- The naive execution — re-invoke the inner query once per tuple of the outer query — is catastrophically slow ([`54:23`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3263)).

## The two strategies

1. **Decorrelate and flatten into joins** — always the better option when it's possible ([`54:23`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3263), [`55:11`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3311)).
2. **Extract the subquery and run it once**, like a CTE, then inject the result into the outer query — the **fallback** when the subquery is not (or is only partially) correlated ([`54:23`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3263), [`55:11`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3311)).

## Example 1 — rewrite as a join

Sailors/reservations: find people who reserved a boat on a given day. The inner query references the outer query, so it can be lifted out and rewritten as a join. Best case — instead of running the inner query per sailor tuple, one join rips through it quickly ([`55:11`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3311), [`55:31`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3331)).

## Example 2 — extract as a CTE

A nested block computing an aggregation over the sailors table, checked for every outer record. Extract it as a separate query, run it **once** at the top, then compare against that value ([`55:53`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3353), [`56:20`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3380)).

For the hard cases, break the query into **blocks** (same idea as System R) and reason about one block at a time ([`55:53`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3353)).

## Who does this well

**Umbra** and **DuckDB** are currently the best at decorrelating subqueries; **SQL Server** is catching up fast ([`56:40`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3400)).

## Q&A — what does a modern optimizer do with a CTE?

It wants to **rewrite the CTE as joins** — that's the ideal case. When the CTE contains an aggregation that always yields exactly one tuple no matter how many times it's invoked, the system just does a join for it ([`56:56`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3416), [`57:21`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3441)). Conversely, the nested-aggregation example above could equivalently have been written as a CTE and would produce the same result ([`57:21`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3441)).
