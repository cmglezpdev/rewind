# 07 — Why Discord Moved to ScyllaDB

## Drop-in compatibility was the enabler

ScyllaDB is **built to behave like Cassandra** ([`12:36`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=756)):

- Same data model.
- Same query language.
- Same core ideas.
- → Discord did not have to throw away what they had learned; from the outside it speaks the same language.

## The headline difference: no JVM, no garbage collector

- ScyllaDB is written in **C++, not Java** → **no JVM → no garbage collector** ([`12:36`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=756)).
- What that removes ([`13:06`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=786)):
  - The thing behind the 20-second reads.
  - The thing that froze nodes for 10 seconds.
  - The thing engineers were restarting by hand on weekends.
- The entire category of problem is **designed out**, not tuned away: ScyllaDB manages its own memory directly in a controlled way instead of relying on an automatic cleaner that freezes everything to work ([`13:06`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=786)).

## The second idea: shard-per-core

This is the reason Discord could later run on **less than half the machines** ([`13:29`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=809), [`13:37`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=817)).

| | Cassandra's older model | ScyllaDB shard-per-core |
|---|---|---|
| Threads | Share resources, contend over the same memory | Each core owns its slice |
| Memory | Shared, contended | Per-core, private |
| Data / work | Shared responsibility | Each core manages its own data and work |
| Coordination | Threads stepping on each other's toes | Cores "pass notes" only when needed |

Source for the comparison: ([`13:37`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=817), [`14:05`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=845)).

**Results of the design** ([`14:05`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=845)):

- No fighting over shared resources.
- Far more throughput squeezed out of the same hardware.
- Background work like **compaction runs in parallel across all cores** instead of crawling.

## But the database swap alone was not enough

Discord did not simply swap engines — they added a layer in front of it that is just as important ([`14:05`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=845), [`14:29`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=869)) → see [08 — Request Coalescing](08-request-coalescing-the-rust-layer.md).
