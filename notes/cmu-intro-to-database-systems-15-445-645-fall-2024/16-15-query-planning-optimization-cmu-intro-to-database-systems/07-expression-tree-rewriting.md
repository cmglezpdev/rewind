# 07 — Expression tree rewriting

## What and why

- Predicates in `WHERE` / `ON` clauses form expression trees. The goal is to reduce them to the minimum work that still produces the correct result ([`57:38`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3458)).
- Same technique as plan rewriting: **rule-based pattern matching**, applied to expressions instead of operators ([`57:38`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3458)).
- **No cost model is needed** here — the only exception is reordering predicates, which isn't really rewriting. Most systems don't use a cost model for this ([`58:07`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3487)).

## Example rewrites

| Pattern | Rewrite | Detail |
|---|---|---|
| Impossible predicate: `WHERE 1 = 0` | → `false` | Two constants with an equality; evaluate at plan time. Postgres and others then **bypass the scan entirely** and return no results rather than testing `false = false` per tuple ([`58:07`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3487), [`58:39`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3519)) |
| `NOW() IS NULL` | → `false` | Look up the function in the catalog: `NOW()` can never return null based on its return type ([`58:57`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3537)) |
| UDF nullability | *no rewrite* | User-defined functions are **black boxes**; you may have to actually run them to know, so no optimization is possible ([`59:21`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3561)) |
| `x BETWEEN 1 AND 100 OR x BETWEEN 50 AND 150` | → `x BETWEEN 1 AND 150` | Merge overlapping disjunctive ranges into one `BETWEEN` ([`1:03:38`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3818)) |

## Q&A — is checking for impossible predicates worth the overhead?

**Yes.** The check itself costs microseconds. No human writes `WHERE 1 = 0`, but queries are largely **machine-generated** by dashboards with heavy nesting; after evaluating nested layers down you can easily end up with `1 = 0`. Short-circuiting saves testing it against a billion tuples ([`59:36`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3576), [`1:00:15`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3615)).

## Q&A — tight human SQL vs 200 lines of generated garbage: how close are the plans?

"It depends" — on the data, the query, and which optimizer ([`1:01:32`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3692)). Concrete points made:

- **Postgres chokes on stupid things.** It won't pick an index if the `ORDER BY` contains an expression: `ORDER BY id + 0` on an integer column is provably identical to `ORDER BY id`, but Postgres sees the `+ 0` and gives up on the index ([`1:01:32`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3692), [`1:02:05`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3725)).
- **Machine-generated queries are large not because they're superfluous**, but because dashboards produce huge selection sets and massive `IN` clauses ([`1:02:24`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3744)).
- **The 10 MB query**: an unnamed, very well-known cloud company generates SQL where the query string itself is 10 megabytes, from dashboards enumerating every possible combination in `IN` clauses ([`1:02:42`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3762)).
- Counterintuitively, more verbose SQL can give the optimizer *more* information about what you want — but if the optimizer is crap it will choke on it anyway ([`1:02:58`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3778)).

## Q&A — are most queries written by humans or machines?

**Machines, at this point.** Loading a single web page fires off a batch of computer-generated SQL queries ([`1:03:21`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3801)).
