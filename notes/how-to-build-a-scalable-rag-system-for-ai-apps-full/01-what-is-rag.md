# 1. What Is RAG and Why It Exists

## The problem

- LLMs know nothing about your private data — they were trained on the public internet, not your internal wiki ([`0:00`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=0)).

## The RAG loop

RAG = **R**etrieval **A**ugmented **G**eneration. The name is literally the three steps ([`0:21`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=21)):

1. **Retrieve** — the user query is converted into an embedding (a numerical representation of the text), and you search a vector database for chunks similar to that embedding ([`1:37`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=97), [`1:46`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=106)).
2. **Augment** — the retrieved chunks become context, combined with the original query into a single prompt ([`1:46`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=106)).
3. **Generate** — the prompt goes to the LLM, which answers based on the supplied context ([`2:04`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=124)).

```mermaid
flowchart LR
    Q[User query] --> E[Embed query]
    E --> V[(Vector DB)]
    V --> C[Retrieved chunks]
    C --> P[Prompt = query + context]
    Q --> P
    P --> L[LLM]
    L --> A[Answer]
```

## Why it's attractive

- **No retraining required** — no millions of dollars in compute ([`0:21`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=21)).
- You only need two things: a way to search your documents, and a way to pass that context to the LLM ([`0:37`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=37)).
- The caveat that drives the whole video: it's simple, powerful, and it works — *at least in demos* ([`0:37`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=37)).

## What the video sets out to answer

- What separates a RAG system that works in a Jupyter notebook from one that holds up in production ([`1:02`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=62)).
- Coverage: document processing → storage → retrieval → validation, before answers reach users ([`1:02`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=62)).
