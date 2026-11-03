# Online quality evaluations

## Execution model

- Run **over captured trace data**, usually with **some delay** — e.g. wait until enough traces accumulate, then evaluate the last hour of data [`3:08`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=188)
- At high traffic, evaluate only a **sample** of the data — e.g. 10% [`3:08`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=188)

## What and how to evaluate

- Any quality metric works: politeness, response relevance, hallucination rate [`3:23`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=203)
- Same methods as offline evaluation [`3:23`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=203):
  - LLM judges
  - semantic similarity
  - regular expressions

## Outputs

- Build a **dashboard** of quality metrics for a full picture of app performance [`3:23`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=203)
- Use some evaluators purely as **flags for manual review** — e.g. detect conversations where users express frustration, then read them to understand why [`3:45`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=225)
