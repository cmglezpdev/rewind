# 09 — DML: Procedural vs. Declarative

The **DML** (data manipulation language) is how you interact with the database under a data model ([`46:07`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=2767)).

## Two categories

| Category | Meaning | Basis |
| --- | --- | --- |
| **Procedural** | You specify the exact steps the DBMS must execute — effectively writing the query plan yourself | **Relational algebra** ([`46:07`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=2767), [`46:39`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=2799)) |
| **Non-procedural / declarative** | You specify the *answer you want*, not how to compute it | **Relational calculus** ([`46:39`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=2799), [`47:05`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=2825)) |

## Practical notes

- **No DBMS exposes a relational algebra interface** — it is too cumbersome to write by hand, and it forces you to define the query plan ([`46:39`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=2799)).
- Most systems support a declarative language instead (SQL) ([`47:05`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=2825)).
- **Relational calculus is not required for this course.** It surfaces in the advanced/query-optimizer classes. Earlier versions of the course taught it, but nobody uses it in practice unless writing query optimizers ([`47:05`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=2825), [`47:30`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=2850)).
- The lecture focuses on relational algebra because it is the procedural foundation the query engine is built on ([`46:39`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=2799)).
