# 03 — Replication Configurations and K-Safety

Replication is **orthogonal** to partitioning and to shared-disk vs shared-nothing. Shared-disk systems like **Aurora** do the same replication work, just hidden under the covers ([`16:09`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=969), [`16:23`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=983)).

The design questions to answer ([`16:23`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=983)):

1. Where do writes go and where can reads go? (configuration)
2. How many copies must survive? (K-safety)
3. When do changes become visible / how long do we wait for acknowledgements? (propagation scheme)
4. When are changes propagated? (timing)
5. What do we send — queries or log records? (active-active vs active-passive)

## Configuration 1: Primary–Replica

Also known as **leader/follower**; older papers call it master/slave, so search that term to find historical documentation ([`17:02`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1022)).

- One node is anointed/elected **primary**; **all writes go to the primary**, which propagates changes to followers ([`17:29`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1049)).
- The primary always holds the latest version, so a consistent read must go there ([`17:54`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1074)).
- Read-only queries can be offloaded to replicas, taking load off the primary — at the price of possibly stale data, which many applications accept ([`18:06`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1086), [`18:25`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1105)).
- Why offloading matters: writes are expensive (index updates, WAL records, concurrency control), and **most workloads are read-heavy** — roughly 1% writes vs 99% reads, like normal web browsing ([`20:42`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1242)).
- The primary *will* go down — power cord, hardware/software failure, or a forced version upgrade (Amazon periodically forces restarts) — so you must elect a new primary from the replicas ([`18:25`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1105), [`18:50`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1130)).
- The mechanism is usually WAL shipping: replicas sit in a **pseudo-recovery mode**, replaying an effectively never-ending log arriving over the network instead of from a file ([`19:40`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1180), [`19:59`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1199), [`20:27`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1227)).

**Recommendation: about 99% of people should use this** — it gives scalability for reads plus durability/availability via failover ([`15:47`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=947)).

## Configuration 2: Multi-Primary (multi-home)

- Any transaction can update any object on any node; replicas must then synchronize to decide who wins ([`19:01`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1141), [`21:33`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1293)).
- Can be tiered: one leader per data center that propagates to local followers ([`21:33`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1293)).
- Some process must resolve two writes to the same object on different nodes ([`22:10`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1330)).
- **Only the very large players need it.** Facebook is the canonical case ([`22:10`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1330)); **Google Spanner** is also multi-primary ([`23:35`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1415)).

### The Facebook cookie anecdote

A user in Brazil posting to their timeline writes to a California data center; refreshing the page reads a Brazilian replica that has not received the change yet, so the post appears missing. Facebook's workaround was to **store the post in a browser cookie** and render it locally until replication caught up — a trick that only works inside a browser, which is why they eventually moved to a proper multi-primary scheme ([`22:45`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1365), [`22:59`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1379), [`23:35`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1415)).

## K-Safety

- **Definition**: the threshold number of copies of the data that must remain available before the system halts reads and writes ([`23:35`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1415), [`24:11`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1451)).
- The danger it guards against: committing a change on the *last* surviving copy, then losing that node — the returning replicas never had the change ([`24:11`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1451)).
- Called K-safety in the database world; distributed-systems literature uses different names ([`24:11`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1451)).
- **Split in practice**: NoSQL systems will let the count drop below a majority; distributed relational systems set the threshold conservatively and **halt rather than risk losing data** — the argument being that for some applications unavailability beats data loss ([`24:35`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1475), [`25:11`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=1511)).
