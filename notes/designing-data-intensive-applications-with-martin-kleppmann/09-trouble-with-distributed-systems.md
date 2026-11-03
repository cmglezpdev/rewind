# 09 — The trouble with distributed systems

Covers `42:53`–`49:02`. The famous chapter on everything that goes wrong, plus what got cut and added in the second edition.

## The point of the chapter

- Distributed systems theory deliberately avoids timing assumptions: a message might arrive in 100 microseconds or take 10 years, and assuming otherwise is dangerous because delays occasionally spike far beyond typical. [`42:54`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2574) [`43:18`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2598)
- "Nodes can crash" hides many realities: software crash, hardware failure, unplugged power cable, or a node still running but disconnected from the network. [`43:41`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2621)
- The chapter **defends and justifies the theoretical models** through real stories and case studies: tons of stuff does go wrong — "don't believe anyone who says failures are rare". Reliability requires worrying about weird but possible edge cases. [`43:41`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2621) [`44:06`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2646) [`44:20`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2660)
- Clocks: mostly correct, but not precise enough to rely on. The general moral is to drop assumptions of well-behavedness. [`44:20`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2660) [`44:43`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2683)
- Research method: reading tech companies' published postmortems for root causes. Fun findings: sharks used to bite undersea cables; with better shielding, now it's cows on land stepping on cables causing interruptions. [`44:43`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2683) [`45:32`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2732)

## Failure frequency depends on your scale

- For teams like AWS S3, the whole chapter is day-to-day routine — at that scale these events happen on a regular cadence. At a small company the same failure is a once-in-10-years big deal. [`45:57`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2757) [`46:19`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2779)
- Again a risk-vs-cost business decision: the chapter's goal is to inform an educated decision, not to make it for you. [`46:19`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2779) [`46:45`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2805)

## What changed in the second edition

- **Removed/reduced**: MapReduce coverage — "MapReduce is dead. Nobody uses it anymore." Its successors Spark and Flink are used; MapReduce stays only as a learning tool for partitioned batch processing. [`47:11`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2831) [`47:27`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2847)
- **Added**: data systems in support of AI — notably **vector indexes** in the storage engine chapter (fits naturally as another indexing strategy), and **data frames** as a new first-class data model alongside relational, graph, and JSON documents (good representation for training data). The book's direction doesn't change; it's not an AI book. [`47:27`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2847) [`47:55`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2875) [`48:21`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2901)
