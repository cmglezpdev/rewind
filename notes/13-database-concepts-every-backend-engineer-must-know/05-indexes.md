# 05 — Indexes

## The problem

- Without an index, finding an element in a table means reading **every single row**: with a million records, a lookup is **O(N)** [`3:40`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=220).
- The best case is O(1) (element at the very start), but in practice that never happens — production databases hold millions of records [`4:07`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=247).

## The solution

- Indexes are **separate data structures** that speed up queries [`4:29`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=269).
- With an index, lookups go from **O(N) to O(log N)** [`4:29`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=269).
- Where to apply them: columns used in **frequent `WHERE` clauses** (`WHERE <column> = <value>`) [`4:29`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=269).

## Interview angle

- Common interview questions: benefits of indexed vs non-indexed queries, and the different types of indexes available [`4:29`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=269).
- Indexing is a complete topic on its own — this video only touches on it [`5:06`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=306).
