# 01 — Course Logistics and Announcements

## Project 1 results

- Typical leaderboard result is around **25,000 QPS**; this semester someone hit **150,000 QPS** [`0:55`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=55).
- The previous all-time best on the non-index workload was **95,000 QPS**, so 150,000 is a record [`1:10`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=70).
- Some students used ChatGPT or a random GitHub implementation; the **buffer pool semantics were changed this year**, so those submissions kept failing tests for reasons the students couldn't diagnose [`2:19`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=139).

## Deadlines

- Homework 3 is out, due the following Sunday (October 6) [`1:10`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=70).
- Project 2 write-up is out today; code not yet pushed [`1:10`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=70).
- **Project 2 is much harder than Project 1** — start immediately, and `printf` debugging will no longer be enough; a real debugger is required [`1:44`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=104).
- Midterm exam in class on **Wednesday, October 9**; study guide posted later that week [`1:44`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=104).

## Optional database talks

- **DataFusion Comet** (Apple) — a Spark accelerator; Spark is Java-based and row-based, so it's slow, and queries can drop down into DataFusion instead. Databricks' equivalent, **Photon**, is proprietary; Comet is open source [`2:44`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=164).
- Oracle talk on their **JSON storage system** [`3:12`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=192).
- **ParadeDB** — Postgres that drops down into DataFusion and other Rust libraries to accelerate query execution: "looks like Postgres on the outside" but does more inside [`3:12`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=192).

## Lecture roadmap

1. What latches are and how to implement them [`8:16`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=496)
2. A simple latching scheme for hash tables [`8:16`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=496)
3. B+ tree latching — the bulk of the class, and what Project 2 needs [`8:38`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=518)
4. Leaf-node scans over sibling pointers, then Project 2 details [`8:38`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=518)
