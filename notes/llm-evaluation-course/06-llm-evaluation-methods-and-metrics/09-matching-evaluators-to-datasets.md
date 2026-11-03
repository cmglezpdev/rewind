# Matching evaluation methods to test datasets

## The principle

- Each evaluation dataset needs a set of evaluators that matches its purpose [`4:18`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=258)

## Example 1 — "happy path" dataset (questions + reference answers)

- Compare new outputs to ground truth with: semantic similarity, exact matches, or LLM-as-a-judge [`4:18`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=258)
- Add simpler checks: the link is present where needed, the response isn't too long [`4:34`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=274)

## Example 2 — edge cases (e.g. questions about competitors, expecting a polite decline)

- Evaluate with an LLM judge [`4:34`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=274)
- Or semantic similarity against a polite-denial template [`4:34`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=274)
- Or a simple regular expression when a specific canned response is expected [`4:34`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=274)

## Wrap-up

- The video is an overview of LLM evaluation methods; the next one covers LLM-as-a-judge, one of the most popular approaches [`5:00`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=300)
