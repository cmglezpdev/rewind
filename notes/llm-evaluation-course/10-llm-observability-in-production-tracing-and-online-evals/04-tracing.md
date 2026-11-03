# Tracing

## What it captures

- Tracing captures user data for **every interaction** [`2:01`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=121)
- Log **complete sessions** and get **full transcripts** [`2:26`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=146)
- For complex systems (RAG, agents), also record **intermediate steps** — e.g. which database entries were retrieved and how long retrieval took [`2:26`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=146)

## How LLM tracing differs from traditional tracing

- Traditional tracing was almost purely technical (tracing server requests for later debugging) [`2:26`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=146)
- With LLM apps, the **contents** of traces matter: user questions and model answers [`2:42`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=162)
- Consequences [`2:42`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=162):
  - **product teams** must be involved, not only engineers
  - you need a **user-friendly way** to browse traces

## Privacy

- When traces contain personal data, apply **masking** so sensitive data is not exposed during manual review [`2:57`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=177)
