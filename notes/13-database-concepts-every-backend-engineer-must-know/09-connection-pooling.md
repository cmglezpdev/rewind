# 09 — Connection Pooling

- The application **never connects directly** to the database — it goes through a connection pool [`8:11`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=491).
- Per request, a thread **borrows** a connection from the pool, uses it, and **returns it** so the next thread can reuse it [`8:11`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=491) [`8:43`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=523).
- Why: **opening a connection is expensive**; the pool keeps a fixed set of connections open and hands them out, so requests avoid paying the setup cost every time [`8:43`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=523).
- Bonus benefit: the pool **caps the total number of connections** to the database [`8:43`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=523).
- Caveat: frameworks like Spring Boot hide this entirely — but once you go to production, you need to be aware of it [`9:20`](https://www.youtube.com/watch?v=pEzrn6PIxRo&t=560).
