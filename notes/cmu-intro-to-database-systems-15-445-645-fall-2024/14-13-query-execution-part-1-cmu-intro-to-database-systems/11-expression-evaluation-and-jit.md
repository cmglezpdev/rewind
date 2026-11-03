# 11 — Expression Evaluation and JIT Compilation

## Expression trees

- Predicates in `WHERE`/`ON` clauses and projection expressions (e.g. `a_id + 1`) are represented as **expression trees**, traversed **depth-first** from the root ([`1:04:34`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3874), [`1:04:56`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3896)).
- Node types cover conjunctions/disjunctions, arithmetic operators, tuple attribute references, constants, and function calls ([`1:05:22`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3922)).

### Execution context

For every tuple, the evaluator supplies ([`1:06:59`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4019)):

- **Query parameters** passed in (prepared statements substitute `$1` etc., "like a simple macro thing") ([`1:05:42`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3942)).
- The **table schema**, so attribute names map to column offsets and types.
- The **current tuple** being examined.

### Worked example ([`1:06:26`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3986) → [`1:07:50`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4070))

`WHERE s.value = $1 + 9`, with `$1 = 991`:

1. Root is `=`. Descend left → attribute lookup `s.value` → resolve offset via schema → get 1000.
2. Descend right → `+` node → left leaf is parameter `$1` = 991, right leaf is constant 9 → 1000.
3. Compare at the root → true → tuple is emitted.

### The cost

- This tree must be traversed **for every single tuple**, which "could be very slow" ([`1:08:09`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4089)).
- Heavy indirection: the type of each expression node and of each value must be checked at runtime ([`1:08:09`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4089)).
- Following pointers down a tree is the opposite of what a modern CPU wants ([`1:08:37`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4117)).

## JIT compilation

- Better approach: **generate code** for the expression, compile it with GCC/Clang/LLVM/ICC, and call a machine-code function per tuple instead of walking a tree ([`1:08:51`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4131), [`1:09:33`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4173), [`1:09:52`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4192)).
- An integer comparison then becomes essentially a **single CPU instruction** ([`1:09:19`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4159)).

### Why keep the tree at all? (student question, [`1:09:52`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4192), [`1:10:15`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4215))

1. Not every system **can** compile — it is rare.
2. You need the tree representation anyway, both to convert into imperative form and to apply other optimizations.
3. Compiling the **entire query plan** (not just predicates) is done by very few systems.

## PostgreSQL JIT demo ([`1:10:44`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4244) → [`1:14:03`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4443))

Setup: table `fake_data`, single `BIGINT` column, ~50 million tuples, pre-warmed with `pg_prewarm` so everything is in memory ([`1:11:10`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4270), [`1:14:03`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4443)). Query: `SELECT count(*) FROM fake_data WHERE <arithmetic predicate>`.

| Configuration | Planning | Execution | Notes |
| --- | --- | --- | --- |
| JIT **off** | 0.2 ms | **1.7 s** | ([`1:11:50`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4310)) |
| JIT **on** | 0.2 ms + **200 ms JIT** | **1.3 s** | ([`1:12:42`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4362), [`1:13:38`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4418)) |

- **Result: 200 ms spent compiling saved 400 ms of execution — the query ran ~600 ms faster overall** ([`1:13:38`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4418)).
- PostgreSQL does a **cost calculation** first: how many tuples, how long to compile, is it worth it ([`1:14:03`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4443)).
- With `LIMIT 1` on a simple `SELECT *`, PostgreSQL correctly **declines to compile** ([`1:19:04`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4744)).
- Caveat: if compilation is expensive it makes the first run **worse** ([`1:17:14`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4634)).

### Side lesson from the demo: estimates vs. actuals ([`1:19:36`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4776) → [`1:20:55`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4855))

- On `SELECT * FROM fake_data LIMIT 1`, PostgreSQL estimated **50,000 tuples** but actually read **1** — off by orders of magnitude, blamed on not having run `ANALYZE` after loading ([`1:20:01`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4801), [`1:20:19`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4819)).
- Root cause explained: because PostgreSQL uses the **iterator model, top-to-bottom**, the `LIMIT` operator sits at the top and knows it needs one tuple, but the **sequential scan below knows nothing about the limit** and reports its own 50-million-tuple estimate ([`1:20:19`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4819), [`1:20:55`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4855)).

## The alternative: pre-compilation ("the Snowflake model")

- Snowflake does **not** JIT. It pre-compiles a library of functions for each data type and comparison (`<`, `>`, `=`, `!=`, …) and stitches them together at runtime via **function pointers** ([`1:14:32`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4472), [`1:14:56`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4496)).
- This works **only because they use the vectorization model**: the function-call overhead is amortized across ~1000 tuples in a tight kernel. Under the iterator model, one function call per tuple "would be terrible… would not be scalable" ([`1:15:14`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4514)).
- **Databricks / Spark SQL** used to compile whole queries with the Scala compiler and **abandoned it** — too difficult to maintain and engineer; the pre-compile-and-stitch approach is better ([`1:15:14`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4514), [`1:16:11`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4571)).

### JIT vs. pre-compiled: which wins? ([`1:16:29`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4589), [`1:16:49`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4609))

- Per a research paper co-authored with TUM and CWI: it is **a wash** — sometimes JIT wins, sometimes pre-compiled does.
- Engineering conventional wisdom: **pre-compiling is better for OLTP**.
- You do **not need any of this for OLTP row stores** — those do index lookups for single tuples. You need it for **analytics/OLAP**. PostgreSQL is a row store not designed for analytics; JIT was added anyway a few years ago ([`1:16:49`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4609), [`1:17:14`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4634)).

## Two quick expression optimizations ([`1:20:55`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4855), [`1:21:22`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=4882))

- **Constant folding** — e.g. applying `UPPER()` to a constant once and reusing the result.
- **Common subexpression elimination** — compute a repeated subexpression once and reuse it.
