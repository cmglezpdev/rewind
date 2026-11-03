# 10 — Locking hints in SQL

## Default behavior

In practice you never write lock/unlock. Running `SELECT`, `INSERT`, `UPDATE`, or `DELETE` makes the DBMS acquire the appropriate locks in the appropriate modes automatically [`58:35`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3515). But sometimes you want to **override** what the system would pick, giving it a hint about how you plan to use the data later [`58:57`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3537), [`59:20`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3560). Postgres also offers **advisory locks** on named objects, covered next class [`59:20`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3560).

## `SELECT ... FOR UPDATE`

- Problem: the **read-modify-write** pattern (the bank transfer). A plain `SELECT` takes a **shared** lock, so the later `UPDATE` forces a second trip into the lock manager to **upgrade** to exclusive [`59:40`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3580), [`1:00:16`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3616).
- Fix: append `FOR UPDATE`. The query returns the same result as a normal `SELECT`, but locks everything it reads in **exclusive mode up front** [`1:00:16`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3616), [`1:00:46`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3646).
- Postgres documents several variations, including `SELECT ... FOR SHARE`, which is useful at **lower isolation levels** to force transactions to hold locks longer than they otherwise would [`1:00:46`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3646).
- `FOR UPDATE` is very common and supported by most systems [`1:00:46`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3646), [`1:01:22`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3682).

## `SELECT ... FOR UPDATE SKIP LOCKED`

- Instead of blocking on locked rows, the scan **skips anything already locked** by another transaction [`1:01:22`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3682), [`1:01:54`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3714).
- **Killer use case: using the database as a work queue** [`1:01:54`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3714).
  - A table holds the tasks; many workers pull from it [`1:02:19`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3739).
  - A worker starts a transaction, reads the table, takes the first task, deletes it or marks it complete, and commits [`1:02:19`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3739).
  - A second worker doesn't want that same first row — it just skips the locked one and picks the next [`1:02:19`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3739).
- Lecturer's take: it "leaks the abstraction" of transactions into the application, arguably good or bad, but a worthwhile variation for handling different application scenarios [`1:02:46`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3766), [`1:03:11`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=3791).
