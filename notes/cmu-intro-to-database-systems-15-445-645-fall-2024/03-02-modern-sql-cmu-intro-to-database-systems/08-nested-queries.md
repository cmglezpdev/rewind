# 08 — Nested queries

## Definition and placement

- The outermost query is the **outer query**; anything inside is an **inner query**. Inner queries can themselves nest **arbitrarily deep** ([`50:22`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3022)).
- A nested query can appear **almost anywhere** in a `SELECT` statement ([`49:51`](https://www.youtube.com/watch?v=MzigBKf84aY&t=2991), [`50:22`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3022)):
  - in the `SELECT` output list
  - in the `FROM` clause, as if it were a temp table
  - in the `WHERE` clause
  - even in `ORDER BY` (meaningless — every row gets the same value, like sorting by `1+1`) ([`50:54`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3054))

## Performance: the recurring theme of the semester

- **Correlated nested queries are what chokes most database systems** ([`50:54`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3054)).
- The **dumbest** execution strategy is to re-run the inner query once **per tuple** of the outer query. MySQL used to do exactly this, and other systems still fall back to it when they cannot reason about the query ([`50:54`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3054), [`51:39`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3099)).
- What you actually want is a **rewrite into a join** — joins execute fast ([`51:19`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3079)).
- **Only two systems handle arbitrary subqueries correctly**: **Umbra** (commercialized as **CedarDB**, from Germany) and **DuckDB**, which implemented the published Umbra techniques. CMU students contributed patches so DuckDB handles **lateral joins with nested queries** correctly. DuckDB is called the best open-source system for this today ([`52:19`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3139), [`52:54`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3174)).
- Asked whether a nested query is as fast as a temp table / CTE, the answer is **"it depends on the query plan"** — SQL defines *what* answer you want; *how* fast is the optimizer's job ([`52:19`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3139)).

## Set-membership operators

| Operator | Meaning |
| --- | --- |
| `ALL` | Every tuple must satisfy the subquery ([`1:03:34`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3814)) |
| `ANY` | At least one must ([`1:03:34`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3814)) |
| `IN` | Equivalent to `= ANY` ([`1:03:34`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3814)) |
| `EXISTS` | Give me back any tuple; the value doesn't matter ([`1:03:34`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3814)) |

- `IN`, `= ANY` are interchangeable for "names of students in 15-445" ([`1:04:08`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3848)).
- **Scoping rule**: an attribute like `sid` resolves according to where you are in the nesting — inside the inner query it refers to `enrolled`, in the outer query it refers to `student` ([`56:13`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3373)).

## Reading query plans with EXPLAIN

Asked "is a nested query the same as a join?", the lecturer answered by running `EXPLAIN` everywhere ([`56:49`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3409)):

| System | Result |
| --- | --- |
| PostgreSQL | `EXPLAIN` returns a plan tree: sequential scan on `student`, sequential scan + filter on `enrolled`, then a **nested loop join** — conceptually two for-loops ([`57:22`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3442)) |
| MySQL | Default output is unhelpful and emits a warning saying it **rewrote the query as a join**. `EXPLAIN FORMAT=TREE` reveals an **index nested loop join**: probe `student`'s primary-key index for each `enrolled` tuple ([`58:03`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3483), [`58:18`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3498)) |
| SQLite | Plain `EXPLAIN` dumps **VM opcodes**, not a tree; you need `EXPLAIN QUERY PLAN` ([`59:29`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3569), [`1:00:54`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3654)) |
| DuckDB | Renders a nice Unicode plan diagram ([`1:01:15`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3675)) |
| ClickHouse | Plan shows it reading from the **MergeTree** structure — a live demonstration of **data independence**: the storage structure changes, the SQL does not ([`1:01:37`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3697)) |
| Oracle | Deeply awkward: `EXPLAIN PLAN` produces no output — you then have to `SELECT * FROM PLAN_TABLE` to see it ([`1:02:34`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3754), [`1:02:59`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3779)) |
| SQL Server | Did not work in the demo ([`1:02:06`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3726)) |

**Answer to the question**: yes, it usually gets rewritten as a join — **if they do it correctly, which is not always** ([`1:03:34`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3814)).

### SQLite's compiled-VM design

- SQLite converts the query plan into **its own opcodes** and interprets them in an internal virtual machine, JVM-style ([`59:29`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3569)).
- Not a new idea: **IBM System R in the 1970s** compiled query plans directly to **assembly** rather than walking a plan tree ([`59:57`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3597)).
- The payoff is portability: SQLite runs on airplanes, satellites, and every phone — only the VM needs to work on each platform ([`1:00:26`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3626)).

## How to write one

The recommended method for a query like "find the student record with the highest ID enrolled in at least one course" ([`1:04:24`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3864), [`1:04:43`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3883)):

1. Start with the **outer** query — what answer do you want (`sid`, `name` from `student`)?
2. Write the `WHERE` clause **in plain English** first.
3. Translate that English into the **inner** query.
4. Figure out the matching operator (`= ANY`, `IN`, `EXISTS`) that links outer tuples to inner results.

Note: that query is invalid in strict SQL-92 because it references `name` alongside an aggregate without a `GROUP BY`, and grouping by name would be meaningless ([`1:04:24`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3864)).

## Caveat flagged for a later class

Nested queries can produce **weird evaluation orders** — e.g. when does an aggregate referenced by an inner query actually get computed, before or after tuples are processed? This can yield **different, wrong answers**, plus rounding issues; a dedicated demo was promised for the next class ([`54:49`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3289), [`55:14`](https://www.youtube.com/watch?v=MzigBKf84aY&t=3314)).
