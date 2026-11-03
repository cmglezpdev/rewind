# 04 — Query Compilation vs Pre-Compiled Primitives

The second code-specialization technique: turn the query itself into machine code ([`27:22`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=1642)).

## Holistic query compilation (code generation)

- Origin: a 2010 project out of Edinburgh; the author was later hired by a big cloud vendor ([`27:22`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=1642)).
- Flow: SQL → optimizer → physical plan → **generate C/C++ source that does exactly what this query does** → compile with GCC/Clang → invoke the resulting function ([`27:56`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=1676), [`29:12`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=1752)).
- Contrast with the interpreted plan (BusTub-style): `GetTuple` must consult the catalog for the schema, compute tuple offsets from data types, return a pointer, then walk the predicate expression tree node by node to evaluate the WHERE clause ([`28:16`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=1696), [`28:49`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=1729)).
- Compiled code is as fast as it gets because it is a hard-coded program for that one query ([`28:16`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=1696)).

## Pre-compiled primitives (the VectorWise approach)

- Motivating question from a student: is the compiled code run more than once? ([`29:32`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=1772))
- Key insight: the space of WHERE-clause shapes × data types is **theoretically infinite but practically small**. `SELECT * FROM foo WHERE id = <int>` is roughly what 99% of applications do ([`29:51`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=1791)).
- So: pre-compile a library of primitives for the common patterns (e.g. `integer == integer`) and at runtime just dispatch to the right one ([`30:19`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=1819)).
- **Why it matters**: invoking GCC costs on the order of 500 ms to 1 second even for a small program — unacceptable when the query itself only runs for 10 ms ([`30:48`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=1848)).
- Cost of dispatch: function calls and jumps are bad on superscalar CPUs — but with vectorized execution each call processes a **batch** of tuples, amortizing the jump cost ([`31:13`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=1873)).
- Composition example: a string predicate primitive returns matching offsets; that positions array is passed into the integer predicate primitive, which returns exactly the final answer ([`31:37`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=1897), [`32:01`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=1921)).

## The two camps

| Approach | What happens at runtime | Systems |
| --- | --- | --- |
| Holistic compilation | Codegen the exact query, then compile it | Redshift, Yellowbrick, (earlier) Databricks |
| Pre-compiled primitives | Stitch pre-built kernels together | Snowflake, DuckDB, Databricks Photon |

- Both approaches exist, and at least one system covered in this lecture does **both** ([`32:20`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=1940)) — that is Redshift ([`47:54`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=2874)).
