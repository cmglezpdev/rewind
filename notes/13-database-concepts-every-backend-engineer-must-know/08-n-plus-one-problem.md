# 08 — The N+1 Problem

## What it is

- You select N rows (e.g., 10 users) in one query, but the related data (each user's orders) wasn't fetched with them [`7:34`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=454).
- Then, inside a loop, you fire **one extra query per row** to fetch that related data — 1 query for the users plus N queries for their orders [`7:34`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=454).
- Described as "very dangerous", and a frequent interview question [`7:34`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=454).

## How to fix it

- Use **joins** so everything comes back in **one round trip** — constant number of queries regardless of N; this is called the best way to tackle it [`8:11`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=491).
- In the Spring ecosystem specifically: use `JOIN FETCH` (and similar techniques) [`8:11`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=491).
