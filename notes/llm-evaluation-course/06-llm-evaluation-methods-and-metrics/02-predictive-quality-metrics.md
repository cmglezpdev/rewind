# Predictive quality metrics

Traditional predictive ML metrics — the first ground truth-based group.

## When they apply

- Require ground truth [`0:58`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=58)
- Fit when the LLM app solves predictive tasks, typically classification: classifying user questions into topics, assigning tags to support tickets, flagging content as spam [`0:58`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=58)
- In these tasks every test example has a literal ground truth label — e.g. a specific user query should be tagged as "billing" [`0:58`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=58)

## Metrics

- Compare model outputs against ground truth with standard metrics: **accuracy**, **precision**, **recall** [`1:14`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=74)
- Pick the metric that matches the risk: in content moderation, **recall** matters more because it measures how well the system flags *all* risky content [`1:14`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=74)
