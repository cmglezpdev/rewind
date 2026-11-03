# 09 - Optimizations, wrap-up and what comes next

## Making redo faster

- Skip the immediate `fsync`/flushes while redoing and let pages drift out lazily — valid **only** if you assume you will not crash again immediately, which is not always true since crashes can be correlated, especially on older hardware ([`1:06:58`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=4018), [`1:07:30`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=4050)).
- Collapsing multiple updates to the same page into a single write is possible but deliberately not done in the basic protocol ([`53:47`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3227)).

## Making undo faster — the lazy/incremental idea

- **No system does this**, but a paper exists ([`1:07:30`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=4050)).
- After redo, the set of transactions to reverse is known. Build a per-page list of pending undos — the same "mod log" trick used in MySQL and the Bε-tree ([`1:07:30`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=4050)).
- New queries can start immediately; a query touching a page blocks only while that page's pending undos are applied, instead of waiting for the entire undo phase ([`1:07:57`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=4077)).
- Alternative, unpopular fix: rewrite the application to remove long-running transactions, which makes undo finish fast — but most people will not rewrite their applications ([`1:08:18`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=4098)).

## The paper vs. the lecture

The real ARIES paper descends into low-level detail such as handling bad-sector writes; not needed to grasp the core concepts ([`1:08:35`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=4115)).

## Final summary of the protocol ([`1:08:58`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=4138) – [`1:10:17`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=4217))

- **STEAL + NO-FORCE**: dirty pages of uncommitted transactions can be flushed once their log records are out; commit does not force pages, because the log carries enough information to reapply ([`1:08:58`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=4138)).
- **Fuzzy checkpoints** never block transactions; they only record which pages were dirty and which transactions were running when the checkpoint began ([`1:09:20`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=4160)).
- **Redo** starts at the earliest log record of a page/transaction active at checkpoint start and reapplies everything ([`1:09:29`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=4169)).
- **The LSN comparison is the only signal available**: if the `pageLSN` is newer than the record being redone, the change is already applied. There is no log entry saying a page was flushed, so LSNs alone convey flush ordering ([`1:09:29`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=4169)).
- **Undone transactions never commit**, but CLRs must be applied to reverse them; being ordinary log records, they let a restarted recovery tell whether a compensation already happened ([`1:10:05`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=4205)).
- **LSNs** exist to provide ordering across all of the above ([`1:10:17`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=4217)).

## Course milestone

With this lecture the student knows how to build a **single-node database system** — a SQLite, PostgreSQL, MySQL or DuckDB equivalent ("not saying it'd be good, but you could do it") ([`1:10:17`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=4217)).

## Next: distributed databases

- The next lecture is given by PhD student Wan Shen Lim and starts distributed databases ([`1:09`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=69), [`1:10:45`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=4245)).
- **Advice: build a single-node system first and push it to its limits before scaling out** — "you need to walk before you can run" ([`1:10:45`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=4245), [`1:11:12`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=4272)).
- Everything covered this semester still applies in a distributed setting, just much harder: the node you were talking to 10 ms ago may be gone, or two transactions on opposite sides of the world may want the same record ([`1:11:12`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=4272)).
- **Very few people need distributed databases — roughly 99% of workloads fit on a single box.** They are for Google/Amazon/Microsoft-scale organizations who can pay for them ([`1:11:45`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=4305)).
