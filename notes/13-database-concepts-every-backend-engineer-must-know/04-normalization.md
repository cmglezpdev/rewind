# 04 — Normalization

- Goal: **store each fact once** instead of repeating information across rows [`2:41`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=161).
- Example of the problem: an `orders` table where the customer email is duplicated on every order row [`2:41`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=161).
- The fix: extract the duplicated data into two tables — a `customer` table holding the email in **one place**, and an `orders` table referencing it by ID; the two are then combined via **foreign keys** [`3:09`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=189).
- Know the **normal forms**: first, second, third, and fourth normal form [`3:09`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=189).
- Observation: many people no longer talk about normalization because of AI — but it remains essential [`3:40`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=220).
