# 11. Validation Layer — Stopping Hallucinations Before They Ship

## Where it sits

- At the bottom of the architecture: a **conditional router** sends output through validation nodes **before anything reaches the user** ([`12:49`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=769)).

## The three nodes

| Node | What it checks |
|---|---|
| **Gatekeeper** | Does the response actually **answer the question**? ([`12:49`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=769)) |
| **Auditor** | Is the information **grounded in the retrieved context** and not hallucinated? ([`12:49`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=769)) |
| **Strategist** | Does the response **make sense given the broader context**? ([`12:49`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=769)) |

- The design goal is to **mimic how a human would think** before sending an answer: *Does this address what was asked? Is this accurate? Does this make sense?* ([`12:49`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=769), [`13:15`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=795)).

## What these nodes catch in production

Stated as things they catch "a lot of" before reaching users ([`13:15`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=795)):

- A response that **sounds confident but contradicts the source documents**.
- An answer that **addresses a different question** than the one asked.
- A recommendation that **doesn't account for important constraints**.
