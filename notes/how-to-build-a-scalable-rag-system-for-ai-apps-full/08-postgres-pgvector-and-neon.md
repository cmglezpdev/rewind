# 8. PostgreSQL + pgvector in Production

> This section is the video's **sponsored segment** — Neon is explicitly named as the sponsor ([`8:30`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=510)). The underlying architectural point (one database for vectors + relational) stands on its own; treat the vendor specifics accordingly.

## The setup

- **Neon = serverless Postgres** — full relational database power, plus **pgvector** support, so embeddings live alongside relational data ([`8:30`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=510)).
- Payoff: one system instead of two (one for vectors, one for metadata) ([`8:30`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=510)).

## What that unlocks

- Semantic search **and** date filtering **in the same query** ([`8:54`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=534)).
- Join chunks back to their parent documents ([`8:54`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=534)).
- Track versions and timestamps ([`8:54`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=534)).

## Serverless scaling

- No paying for idle capacity when the RAG system isn't in use; no scrambling to provision when traffic spikes ([`8:54`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=534), [`9:06`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=546)).
- **Scales down to zero** with no traffic, spins back up **in milliseconds** on a request ([`9:06`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=546)).

## The Databricks data point

- **Neon was acquired by Databricks for about $1 billion** ([`9:06`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=546)).
- Databricks' stated reason: **AI agents**. Per the video, they said **over 80% of databases created on Neon are now provisioned by AI agents, not humans** ([`9:23`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=563)).
- Framing: serverless + instant provisioning is a natural fit for agentic workflows ([`9:42`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=582)).

## Database branching — the RAG-specific win

- Postgres underneath means you can **branch the database**: instantly copy your entire knowledge base to test a **new chunking strategy** or a **new embedding model** without touching production, then merge back when satisfied ([`9:42`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=582)).
- Described as **"Git for your database"** ([`10:07`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=607)).
