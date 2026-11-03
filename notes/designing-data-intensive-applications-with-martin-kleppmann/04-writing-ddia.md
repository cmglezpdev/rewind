# 04 — Writing Designing Data-Intensive Applications

Covers `14:09`–`23:00`. Leaving LinkedIn, the goal of the book, how Martin researched it, and how long it took.

## Leaving LinkedIn

- Martin moved back to the UK (his girlfriend, now wife, was there; he never felt at home in the Bay Area) and kept working for LinkedIn remotely. [`14:33`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=873)
- LinkedIn gave him **50% of his time free** to work on the book alongside engineering duties — getting only an internal training resource in return. [`14:52`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=892)
- Even at 50%, writing in parallel with on-call engineering didn't work: too much context switching, urgent on-call work dominated. He left LinkedIn and took an unpaid sabbatical ("i.e. unemployment") to write full-time; academia only came after that. [`15:29`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=929) [`15:57`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=957)

## The goal of the book

- A **broad conceptual overview**: not how to use one specific tool, but comparing trade-offs between many types of tools; practitioner-focused, not a theoretical textbook. [`16:24`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=984) [`16:44`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1004)
- It's the book he wished he'd had at Rapportive, where they had database performance problems and were "searching around in the dark" for lack of foundations. Knowing how data systems work internally gives you intuition to diagnose issues. [`16:44`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1004) [`17:19`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1039)

## How he learned the material

- Mostly curiosity plus talking to people: LinkedIn had senior data systems engineers who understood the internals deeply but hadn't written it down; he quizzed them to build a mental model. [`18:22`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1102) [`18:36`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1116)
- With the basics in place, he could then read research papers and tons of blog posts, distilling the essential ideas. The extensive references at the end of each chapter are literally the material he used to learn — cited so readers can go deeper. [`18:58`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1138) [`19:29`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1169)

## Structure and process

- The three-part structure (foundations of data systems / distributed data / derived data) was retrofitted after the fact; what was clear from the initial proposal were the chapter topics: transactions, replication, sharding/partitioning, consistency and consensus. [`19:51`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1191) [`20:04`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1204)
- He wrote one chapter at a time, starting each with heavy background research; internal structure was decided per chapter (e.g. replication → single-leader, multi-leader, leaderless). [`20:27`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1227) [`20:45`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1245)

## Timeline

- First edition took **~4 years** (~2.5 years full-time equivalent); he missed the publisher's deadline by about **2.5 years**. O'Reilly was laid-back about the first edition; for the second edition they were pushier about deadlines because the book was established and readers were waiting. [`21:35`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1295) [`21:55`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1315)
