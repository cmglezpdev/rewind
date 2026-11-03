# No-code evaluation: review results

## The summary report

- The run produces a report summarizing all evaluations; the dataset below it shows the added per-row scores (the report can be hidden). [`7:37`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=457) [`8:18`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=498)
- Findings:
  - LLM-judged "Decline" evaluation: **1 denial** found. [`7:37`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=457)
  - Semantic similarity: all values **above 0.78**, so no answer is completely irrelevant or unrelated. [`7:37`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=457)
  - Text length: **1 unusually long answer** worth checking. [`7:59`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=479)
  - Regex-based denial check: also flagged **1 denial**. [`7:59`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=479)

## Drilling into individual rows

- The LLM-judge denial is a genuine one: the model declined because the question was about **medication** — arguably desirable behavior (no medical advice) — and the judge provides an explanation for its label. [`8:34`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=514)
- The too-long response looks almost as if it was copied from some document — flagged as worth investigating. [`8:53`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=533)
- The regex check correctly detected the **same** denial as the LLM judge because the answer contained the word "cannot" ("I cannot provide specific answer"). [`8:53`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=533)

## Key comparison

- Regex-based denial detection worked here, but it **will not generalize as well as an LLM judge**. [`9:21`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=561)
