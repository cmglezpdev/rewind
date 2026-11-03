# 03 — The Transaction Model and ACID

## Simplifying assumptions for this lecture

- The database is an abstract collection of **objects** named `A`, `B`, `C`, … — no tuples, no tables. The algorithms work regardless of object granularity; finer granularity means more parallelism but more tracking overhead ([`13:22`](https://www.youtube.com/watch?v=4y656idl8ZU&t=802), [`13:48`](https://www.youtube.com/watch?v=4y656idl8ZU&t=828)).
- The database has a **fixed size**: only reads and updates, no inserts or deletes (those introduce phantoms, covered next class) ([`13:48`](https://www.youtube.com/watch?v=4y656idl8ZU&t=828)).

## Definition of a transaction

- A transaction is a **sequence of read and write operations** on database objects ([`14:22`](https://www.youtube.com/watch?v=4y656idl8ZU&t=862)).
- It starts with an explicit `BEGIN`; single statements outside one are wrapped implicitly — **autocommit** ([`14:32`](https://www.youtube.com/watch?v=4y656idl8ZU&t=872)).
- It ends with `COMMIT` or `ROLLBACK`. Asking to commit is not the same as committing — the DBMS may refuse and kill the transaction, and only the acknowledgement counts ([`15:02`](https://www.youtube.com/watch?v=4y656idl8ZU&t=902), [`15:16`](https://www.youtube.com/watch?v=4y656idl8ZU&t=916)).

## ACID

Acronym coined in the early 1980s ([`15:44`](https://www.youtube.com/watch?v=4y656idl8ZU&t=944)):

| Letter | Meaning | Covered in |
|---|---|---|
| **A**tomicity | All operations in a transaction happen, or none do ([`15:44`](https://www.youtube.com/watch?v=4y656idl8ZU&t=944)) | [04](./04-atomicity-logging-vs-shadow-paging.md) |
| **C**onsistency | A consistent database plus a consistent transaction yields a consistent database ([`16:07`](https://www.youtube.com/watch?v=4y656idl8ZU&t=967)) | [05](./05-consistency.md) |
| **I**solation | Transactions run under the illusion of exclusive access; no intermediate updates from others are visible ([`17:07`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1027), [`17:22`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1042)) | [06](./06-isolation-and-serializable-schedules.md)–[09](./09-view-serializability.md) |
| **D**urability | Once committed and acknowledged, changes survive a crash ([`17:22`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1042)) | [10](./10-durability-and-acid-recap.md) |

- Aside: the instructor notes the "C" was shoehorned in to make the acronym work, and repeats the book's story that the author wanted it there because his wife disliked sugar — "an acid woman" ([`16:46`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1006), [`17:07`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1027)).
- This lecture stays at the concept level; concrete algorithms start the following Monday ([`17:44`](https://www.youtube.com/watch?v=4y656idl8ZU&t=1064)).
