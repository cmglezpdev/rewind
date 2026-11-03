# 02 — Why Sorting Is a DBMS Backbone

## Relations are unsorted by definition

- The relational model is built on **set algebra**: an unordered collection with no duplicates [`5:33`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=333).
- Real implementations use **bag algebra**: still unordered, but duplicates are allowed — so sorting becomes a tool for removing duplicates when needed [`6:01`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=361).

## Two reasons to sort

1. **The query asks for it** — an `ORDER BY` clause [`6:18`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=378).
2. **The operator is faster on sorted input** — aggregations, and joins next class, run faster if the data is sorted first, even when no `ORDER BY` was requested [`6:18`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=378).

The counter-intuitive part: paying an upfront sort cost (and possibly spilling to disk) is worth it because the downstream operator becomes far cheaper and the I/O becomes sequential [`6:43`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=403) [`7:18`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=438).

- **SQL Server example**: it will build a B+Tree purely for one query — called a *spooling index* — let the operator process the data through it, then throw the index away immediately afterward [`6:43`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=403) [`7:18`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=438).

## If everything fits in memory, the problem is trivial

- Use any classic in-memory sort — merge sort, quicksort, Timsort, gnome sort, cocktail shaker sort. In practice **quicksort and Timsort are the two best choices** [`7:34`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=454) [`8:00`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=480).
- Most DBMSs use quicksort, variations of it, or insertion sort when data fits. **Postgres uses quicksort and reports it in the query plan** [`8:29`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=509).

## How a system chooses in-memory vs disk-based sorting

- It **estimates** the size of the data flowing up the plan and compares against available buffer-pool memory for the sort [`8:29`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=509).
- If the estimate is wrong, some systems can abort and revert to disk-based sorting or adapt the query plan mid-flight — **Postgres cannot do this** [`8:29`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=509) [`9:06`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=546).

## Lecture roadmap

- **Top-N heap sort** — special case when the query tells you exactly how much sorted output it needs [`9:28`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=568).
- **External merge sort** — the core disk-based sorting algorithm [`9:28`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=568).
- **Aggregations** via sorting vs hashing, which sets up joins next class [`9:28`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=568).
- **Guest talk from dbt** — a tool students likely haven't needed yet but "pretty much every single company in the world is using" [`9:28`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=568).
