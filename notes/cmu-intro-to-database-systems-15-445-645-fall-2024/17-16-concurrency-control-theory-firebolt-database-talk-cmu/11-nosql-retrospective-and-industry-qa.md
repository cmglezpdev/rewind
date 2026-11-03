# 11 — The NoSQL Retrospective and Industry Q&A

## The NoSQL movement, ten years on

- About a decade ago the NoSQL movement declared transactions a bad idea — slow, not "web scale" ([`1:04:44`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3884)).
- The biggest proponent was **Google**, with **BigTable** — no transactions, faster, more web scale ([`1:04:56`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3896)).
- Then Google published the **Spanner** paper (~10 years ago), which contains the reversal: it is better to let application programmers hit performance problems from overusing transactions than to have everyone write code to cope with the lack of them ([`1:04:56`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3896)).
- Instructor's gloss: rather than every random JavaScript programmer reimplementing logic to handle inconsistent data, put smart people in one room and make transactions fast — far more productive for the organization ([`1:05:37`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3937), [`1:06:02`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3962)).
- **Outcome: essentially all the NoSQL systems that bragged about not supporting transactions — Cassandra, Couchbase and others — added them within ten years** ([`1:06:16`](https://www.youtube.com/watch?v=4y656idl8ZU&t=3976)).

## The dirty secret coming next class

- Next class covers two-phase locking, and then **isolation levels** — the dirty secret being that most systems don't support serializability, and don't give it by default. The default is a weaker level where the anomalies from [07](./07-conflicts-and-anomalies.md) can actually occur ([`1:06:42`](https://www.youtube.com/watch?v=4y656idl8ZU&t=4002), [`1:07:10`](https://www.youtube.com/watch?v=4y656idl8ZU&t=4030)).
- Does it matter? "Nobody knows." The class will open PostgreSQL and look ([`1:07:10`](https://www.youtube.com/watch?v=4y656idl8ZU&t=4030), [`1:07:22`](https://www.youtube.com/watch?v=4y656idl8ZU&t=4042)).

## Student Q&A

- **Do OLAP systems need transactions?** Yes — mainly for bulk updates: you load a batch of data, then apply corrections, and you want that to happen atomically ([`1:07:22`](https://www.youtube.com/watch?v=4y656idl8ZU&t=4042)).
- **Are there systems with no transaction support?** Plenty, on both the OLAP and operational sides, but pretty much all the major OLAP systems and most key-value stores support them now ([`1:08:01`](https://www.youtube.com/watch?v=4y656idl8ZU&t=4081), [`1:08:41`](https://www.youtube.com/watch?v=4y656idl8ZU&t=4121)).
- **DynamoDB's unusual approach**: Amazon long refused transactions, then added them with a twist — the transaction runs first without updating anything, recording its reads and writes, then submits the whole operation set so the system *can* see the schedule ahead of time. **FoundationDB** works similarly. Most systems do not ([`1:08:16`](https://www.youtube.com/watch?v=4y656idl8ZU&t=4096), [`1:08:41`](https://www.youtube.com/watch?v=4y656idl8ZU&t=4121)).
