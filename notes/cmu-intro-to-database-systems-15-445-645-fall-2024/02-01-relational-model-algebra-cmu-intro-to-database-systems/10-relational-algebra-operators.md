# 10 — Relational Algebra: The Seven Primitives

Codd's 1970s paper defined **seven primitives** intended to express any query over a relational database ([`47:44`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=2864)).

- Caveat stated up front: this is *not entirely true* — the original set handles no sorting, aggregation, or `GROUP BY`. Those were added later ([`47:44`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=2864)).
- Operators **chain**: the input to any operator is either a base relation or the output of another operator ([`48:16`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=2896), [`48:29`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=2909)).

## Quick reference

| Operator | Symbol | Meaning | SQL equivalent |
| --- | --- | --- | --- |
| Select | σ | Filter tuples by a predicate | `WHERE` clause |
| Projection | π | Choose/reorder/transform output attributes | `SELECT` list |
| Union | ∪ | Concatenate two relations | `UNION` / `UNION ALL` |
| Intersection | ∩ | Tuples present in both | `INTERSECT` |
| Difference | − | Tuples in the first but not the second | `EXCEPT` |
| Cartesian product | × | All combinations of tuples | `CROSS JOIN` |
| Join | ⋈ | Matching tuples across relations | `JOIN ... ON` |

## 1. Select (σ)

- First-order predicate logic identifying which tuples to keep; non-matching tuples are dropped, matches are emitted ([`48:29`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=2909), [`48:54`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=2934)).
- Predicates combine with conjunctions and disjunctions — e.g. `a_id = 'a2' AND b_id > 102` ([`49:28`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=2968)).
- Mnemonic offered: lowercase **σ** (sigma) → **S** for Select ([`49:47`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=2987)).
- SQL: `SELECT * FROM R WHERE <predicate>` ([`49:47`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=2987)).

## 2. Projection (π)

- Defines what the output looks like: which attributes come through, in what order, and how they are transformed ([`50:10`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3010)).
- Example: `π(b_id − 100, a_id)` applied to the output of `σ(a_id = 'a2')(R)` ([`50:10`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3010)).
- Supports arithmetic, string functions, reordering — anything ([`51:06`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3066)).
- SQL: the projection clause of a `SELECT` ([`51:06`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3066)).

## 3. Union (∪)

- Concatenates R and S: takes R and puts S underneath it ([`51:20`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3080), [`51:48`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3108)).
- **Requires identical attributes with identical types** ([`51:48`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3108)).
- **Duplicate handling differs between theory and SQL** ([`52:28`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3148)):
  - Relational model: duplicates are removed.
  - SQL: `UNION` removes duplicates, `UNION ALL` keeps them — the default is set up so the system avoids the extra deduplication work when you don't need it.

### Ordering is undefined

- The relational model and SQL leave result order **undefined** — tuples can come back in a different order than inserted ([`53:21`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3201)).
- This is a feature: it opens up optimization opportunities, since the system need not preserve order ([`53:21`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3201)).
- Concrete cause: a background garbage collector during transaction processing can reorder tuples arbitrarily ([`53:54`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3234)).
- If order matters, use `ORDER BY` — which the original relational model did not have ([`53:54`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3234)).

## 4. Intersection (∩)

- Tuples appearing in both relations; requires matching attributes ([`54:20`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3260)).
- SQL: `INTERSECT`.

## 5. Difference (−)

- Tuples in the first relation but not the second — plain set theory ([`54:37`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3277)).
- SQL: `EXCEPT` ([`54:37`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3277)).

> Union, intersection, and difference all require the same columns on both sides. **Joins do not** ([`55:33`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3333)).

## 6. Cartesian product (×)

- Every tuple of R paired with every tuple of S ([`55:49`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3349)).
- Real uses: generating all input combinations for experiments and testing ([`56:30`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3390)).
- Theoretical importance: it is the **basis of joins** ([`56:48`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3408)).
- SQL: `SELECT * FROM R CROSS JOIN S`, or the (not-recommended) comma-separated table list ([`57:06`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3426)).

## 7. Join (⋈)

- Finds all matches between relations on the given attributes; unlike intersection, the two schemas need not be identical ([`57:28`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3448)).
- Mechanically: mash the two tuples together, check that the matching attributes agree, then **discard the duplicate attributes**. Non-key attributes "come along for the ride" ([`57:57`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3477), [`58:15`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3495)).
- **Joins are where DBMSs spend most of their query time** — the single biggest optimization target, with a whole lecture devoted to them ([`58:32`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3512)).

### Natural join vs. explicit join

- **`NATURAL JOIN`** matches implicitly on identically named columns. **Not recommended** — it infers the join condition instead of stating it ([`58:47`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3527), [`59:35`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3575)).
- Prefer `JOIN ... USING (...)` or, best, `JOIN ... ON R.a_id = S.a_id AND R.b_id = S.b_id` — explicit, carries more information, and survives schema evolution without breaking application code ([`58:47`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3527), [`59:35`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3575), [`59:49`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3589)).

## Later additions (post-Codd)

Rename, assigning relations to variables, duplicate elimination, aggregation, sorting, and division. Most systems implement everything except division ([`59:49`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3589), [`1:00:23`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=3623)).
