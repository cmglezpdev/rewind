# 10 — Preview: Distributed Concurrency Control (and When Not to Go Distributed)

## The requirement

- Allow **multiple transactions to execute simultaneously across multiple nodes**. Much of the single-node machinery carries over, but new challenges appear [`1:03:16`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3796).

## New challenge 1 — replication

- How do you sync data across physically distant locations when communication is expensive and nodes fail? [`1:03:16`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3796)
- Failure taxonomy via the sheep: **chewed cable = temporary outage; eaten server = permanent outage** [`1:03:43`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3823).

## New challenge 2 — clock skew

- Getting computers on a network to agree on the time is hard (the lecturer's phone said 3:06 while the room clock said 3:03) [`1:03:43`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3823).
- **Google Spanner** famously puts **atomic clocks in every node** to keep time in sync — but those cost **$5,000 to $50,000 per clock**, out of reach for most. Andy describes Spanner as one of the most advanced transactional systems in existence [`1:04:08`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3848).
- The affordable approximation: **CockroachDB's hybrid logical clocks** (they have a write-up on it) [`1:04:08`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3848).
- **Takeaway: timekeeping is hard** [`1:04:08`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3848).

## New challenge 3 — distributed deadlock

- Setup: two app servers, two nodes; node 1 owns A, node 2 owns B. Server 1 locks A, server 2 locks B, then each wants the other's item → **deadlock** [`1:04:55`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3895).
- Single-node solution is a **waits-for graph** (already done in a homework). Distributed, you must decide **where the graph lives** — node 1, node 2, or a central location — and you cannot afford to do this on every operation because network cost is very high [`1:05:26`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3926) [`1:05:47`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3947).
- **Spoiler — the CAP theorem**: there is no magic solution; you have to pick what you are willing to give up [`1:05:47`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3947).

## Closing arguments

- **Distributed database systems are hard.** In real vendors there is a whole team for storage, another for query execution — nobody writes the whole thing alone [`1:05:47`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3947).
- **Most people do not need one.** Ignoring replication, most deployments are **tens to hundreds of gigabytes, not petabytes**. Search the terms "small data" and "DuckDB" to learn more [`1:06:17`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3977) [`1:06:34`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3994).
- If you truly need one, products like **Snowflake** have already solved these problems — as a developer it is usually far easier to pay them than to build and operate it yourself [`1:06:34`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=3994).
- Next class (Andy): distributed OLTP, replication, and CAP, with more real-world examples [`1:06:55`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4015).
