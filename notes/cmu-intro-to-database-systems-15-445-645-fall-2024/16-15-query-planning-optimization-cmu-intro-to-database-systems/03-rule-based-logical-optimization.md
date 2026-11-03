# 03 — Rule-based (heuristic) logical optimization

## How it works

- Rules are **patterns** matched against the query plan; when a pattern matches, a **transformation rule** rewrites it ([`20:55`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1255), [`21:26`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1286)).
- Purpose: throw away what is known to be stupid, and nudge the plan toward a good starting point for the later, more expensive cost-based search ([`21:26`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1286)).
- **Key limitation**: with no cost model there is no way to compare "before" vs "after" — the benefit is baked into the rule by the engineers who wrote it. Optimality cannot be guaranteed, but in practice this gets you far ([`21:53`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1313), [`22:16`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1336)).
- Rules can be applied on the plan tree or directly on a more compact relational-algebra expression ([`22:16`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1336)).

## How systems implement rules

- **Postgres**: a mass of if/then/else statements — "which is not great" — and the rewrite rules must be applied in an exact order or the tree ends up in an invalid state ([`23:00`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1380)).
- **Better designs**: define rules in a DSL with priorities (check predicate pushdown first, then this, then that) ([`23:00`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1380)).
- In theory rules should be composable ([`23:34`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1414)).

## The three canonical rules

### 1. Predicate pushdown
Move filters below joins so you don't join tuples you'll throw away anyway ([`22:16`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1336), [`10:00`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=600)). Almost always correct — this is *the* most obvious rule ([`19:38`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1178)).

### 2. Replace cartesian product with an inner join
Pattern: a cartesian product with a filter directly above it whose predicate is the join condition → rewrite as an inner join and delete the filter entirely (the predicate moves inside the join operator). A "no-brainer" — nothing above or below matters ([`23:34`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1414), [`23:59`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1439)).

### 3. Projection pushdown
Duplicate a projection below the join so only the minimum set of attributes flows upward ([`24:13`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1453), [`24:29`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1469)).

- **This is where a cost model would help**: with a 3-column table the copying cost is wasteful; with 10,000 columns it's a huge win ([`24:29`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1469), [`25:02`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1502)).
- Since there is no cost model, rules (and cost models too) commonly carry **hardcoded magic numbers**, e.g. "if more than 10 columns, do the pushdown" ([`25:02`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1502)).
- **Q&A — is projection pushdown useful for row stores?** Yes. With 10,000 columns and only 2 needed, you discard ~9,000 either way. Under the materialization model you avoid copying unneeded columns between operators; under pipelining you keep more useful data in memory instead of polluting it ([`25:23`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1523), [`25:44`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1544)).

## The underlying principle

> The goal of the optimizer is to throw away as much useless data as quickly as possible, at a reasonable computational cost ([`25:44`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1544), [`26:13`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1573)).

Essentially every database system implements some version of these rules: they're fast, easy to implement reasonably, and almost always the right thing to do ([`26:13`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1573)).
