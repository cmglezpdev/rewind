# 09 — Weaviate's Vector Index: HNSW, Updates, and Filtered Search

## HNSW as the base

- Weaviate uses **HNSW**, considered state of the art (or, at minimum, graph-based vector indexes as a family are) ([`1:14:05`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4445)).
- Intuition: it is a **similarity graph** — things close in vector space are close in the graph ([`1:14:05`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4445)).
- Weaviate's implementation diverges from the paper and reference implementation in **two areas** ([`1:14:31`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4471)).

## Divergence 1 — supporting massive update/delete volume

- An **async repair process** continuously repairs the graph ([`1:14:31`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4471)).
- Neither **latency nor recall degrades** while it runs ([`1:14:31`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4471)).
- It is **highly parallelizable**: if repairs fall behind, add more threads. The speaker considers this unique to Weaviate and the reason it can sustain the 150M-updates/day workload ([`1:14:31`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4471), [`1:14:59`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4499)).

## Divergence 2 — in-place filtering (the minority-filter problem)

**The problem**: when a hard filter (e.g. a price condition) allows only a small subset of graph points, and those points are not the semantically closest ones, you face a lose-lose ([`1:14:59`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4499), [`1:15:39`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4539)):

| Strategy | Consequence |
| --- | --- |
| Skip disallowed points during traversal | The graph is no longer well connected → **recall drops** ([`1:15:39`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4539)) |
| Traverse them and prune later (post-filtering) | You must **score far too many points** you'll never return → **kills performance** ([`1:15:39`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4539)) |

**The fix — the ACORN approach**: a pruning strategy that inspects **your neighbors' neighbors** and evaluates whether they are on the allowed list, avoiding scoring them when it doesn't have to. Disallowed points are then used **purely for navigation**, not scoring — a substantial performance improvement ([`1:14:59`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4499), [`1:16:32`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4592)).
- **Shipped in Weaviate 1.27** ([`1:16:32`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4592)).

## The negative-correlation problem

- **Example**: search "luxury watches" with a filter `price < $10`. The semantically closest matches are, by definition, expensive — so similarity search pulls in one direction while the filter pulls in the opposite one ([`1:16:32`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4592), [`1:17:19`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4639)).
- **Weaviate's answer** (also described as unique): **enrich the graph at search time with new entry points** drawn from the allowed list, so traversal doesn't march in the wrong direction and scores the genuinely relevant candidates ([`1:17:19`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4639)).
