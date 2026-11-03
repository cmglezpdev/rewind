# 13. Red Teaming & Stress Testing

## The premise

- Before deploying to production, **you need to know how your system breaks** ([`14:22`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=862)).
- Red teaming = **deliberately trying to break your own system** ([`14:22`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=862)).

## The three attack categories tested

| Category | Question it asks |
|---|---|
| **Prompt injection** | Can someone inject a prompt that makes the system ignore its instructions? ([`14:22`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=862)) |
| **Information evasion** | Can someone get it to leak information it shouldn't share? ([`14:22`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=862)) |
| **Biased opinions** | Can someone get biased or harmful outputs by phrasing questions in certain ways? ([`14:47`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=887)) |

- Goal: **find the weakness before your users do** ([`14:55`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=895)).
- Stated as **not optional**: if the RAG system touches real users or real business decisions, you need to know its failure modes ([`14:55`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=895)).

## Closing recap of the full architecture

The eight pieces, as summarized at the end ([`14:55`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=895), [`15:24`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=924)):

1. Data ingestion that **preserves structure** and creates **rich metadata**
2. A database layer combining **vectors + relational data**
3. **Hybrid retrieval** — semantic and keyword
4. A **reasoning engine** that plans and executes complex queries
5. **Multi-agent coordination** for multi-step problems
6. **Validation nodes** that catch errors before users see them
7. **Evaluation** to measure how well things actually work
8. **Stress testing** to find the cracks

> "It's a lot more than chunk, embed, retrieve, generate" — but it's what production requires ([`15:24`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=924)).
