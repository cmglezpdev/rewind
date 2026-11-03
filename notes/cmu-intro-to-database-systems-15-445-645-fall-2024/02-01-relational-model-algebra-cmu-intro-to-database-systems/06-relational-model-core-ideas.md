# 06 — The Relational Model: Core Ideas

**Definition:** a data model that abstracts a database as *relations*, so applications never carry implicit knowledge of the physical data layout ([`30:22`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=1822)).

## Three key ideas

1. **Store the database in simple data structures (relations/tables)** and do not expose them to application code ([`30:22`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=1822)).
2. **Physical storage is left to the implementation.** In theory you can move a database from a disk-based engine to an in-memory engine — or a brand-new storage device — without touching application code ([`30:59`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=1859)).
   - Caveat given immediately: "in theory". Nobody implements the SQL standard exactly; the *de facto* standard is Postgres, largely because everyone reuses its parser. Two relational databases are not automatically compatible ([`31:39`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=1899)).
3. **Write high-level queries, not procedural loops.** State the answer you want; the DBMS decides how to execute it efficiently ([`32:04`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=1924)).
   - Payoff example: the billion-record slow query is fixed by **adding an index** — like a textbook glossary letting you jump straight to the page — with *zero* application-code changes, because both data and query plan are abstracted away ([`32:32`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=1952)).

## The compiler analogy

- In the 70s people insisted no C compiler could generate assembly as good as a human. Obviously false today ([`33:07`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=1987)).
- CODASYL people said the same about SQL: no program could produce a query plan as good as a hand-written one. Today **nobody writes query plans by hand** ([`33:07`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=1987), [`33:36`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=2016)).

## Three components of the relational model

| Component | What it defines |
| --- | --- |
| **Structure** | The relations and their contents, defined independently of physical representation. "Table" and "relation" are interchangeable, but *relation* is the pedantically correct term ([`33:36`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=2016)) |
| **Integrity constraints** | What the data is *allowed* to look like, per the real-world thing being modeled — e.g. an age can never be less than zero ([`34:07`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=2047)) |
| **Manipulation** | The API for accessing and modifying contents — this is what **relational algebra** provides ([`34:32`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=2072)) |
