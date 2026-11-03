# 06 — Transactions and ACID

## Transactions

- A transaction **groups several writes so they succeed together or not at all** [`5:06`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=306).
- Canonical example: debiting one account and crediting another inside one transaction [`5:06`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=306).
- Failure scenario without transactions: customer A is debited 100, the credit step fails — account B never receives the money and account A has lost it [`5:35`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=335).
- Rule of thumb: always use transactions — it's **all or nothing**, then you commit [`5:35`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=335).

## ACID — the characteristics of transactions

| Property | Meaning |
|---|---|
| **Atomicity** | All writes happen or none do |
| **Consistency** | Rules and constraints always hold |
| **Isolation** | Concurrent transactions don't corrupt each other |
| **Durability** | Once committed, it survives a crash |

All four defined at [`5:35`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=335)–[`6:29`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=389).
