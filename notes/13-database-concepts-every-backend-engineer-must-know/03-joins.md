# 03 — Joins

- Joins only really make sense once data is **normalized** — normalization splits facts across tables, and joins bring them back together [`1:31`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=91).
- A join **combines two or more tables into one result** [`1:31`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=91).

## Types covered

- **Inner join** — returns only the matching records between the tables. Example: users Alice and Bob appear in both `users` and `orders`, so their rows get bundled into the result [`1:31`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=91) [`2:09`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=129).
- **Left join** — returns all rows from the left table; where there is no match on the right, the result comes back as `NULL` [`2:09`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=129) [`2:41`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=161).
- You can use a `WHERE` clause to filter the joined result (e.g., keep only one side) [`2:41`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=161).
