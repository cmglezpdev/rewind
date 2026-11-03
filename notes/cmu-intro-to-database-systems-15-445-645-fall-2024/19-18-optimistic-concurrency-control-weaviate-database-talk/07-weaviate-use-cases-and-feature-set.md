# 07 — Weaviate Guest Talk: Use Cases and Feature Set

Speaker: **Etienne, CTO and co-founder of Weaviate**, a vector database ([`1:05:23`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=3923)).

## The four (plus one) use cases

| Use case | What it is | Status |
| --- | --- | --- |
| **Semantic search** | Search by *meaning* instead of exact keyword matching, via LLM-generated vector embeddings. Very common in e-commerce ([`1:06:02`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=3962)) | Core |
| **RAG** (retrieval-augmented generation) | The "ask AI" pattern — chat with your own data: Dropbox, Notion, email ([`1:06:02`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=3962)) | Core |
| **Recommendations** | Similarity search alone makes *bad* recommendations: "if you like this pepperoni pizza you'll like this pepperoni pizza" — similarity returns near-identical items, which isn't useful ([`1:06:02`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=3962), [`1:06:52`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4012)) | **Beta** |
| **Generative feedback loops** | Apply generation on the *write* side, not just retrieval — a self-updating (or self-learning) database. Example: "translate everything to Spanish, summarize to 80 words, write it back" ([`1:06:52`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4012)) | **Alpha**, working title |

## Feature set (database-centric view)

Design premise stated by the speaker: **architecture follows business functions**, so features come first ([`1:07:36`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4056)).

- **Object *and* vector storage** — Weaviate does not just return IDs to be looked up in a secondary system; objects live in the same database. Simplifies the end-to-end case, at the cost of its own challenges ([`1:07:36`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4056), [`1:08:09`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4089)).
- **Advanced filtering** — equality, inequality, range (e.g. products in a price band), and *minority* filters ([`1:08:09`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4089)).
- **Hybrid search** — combine keyword search with vector search, fused via e.g. reciprocal rank fusion ([`1:08:42`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4122)).
- **High updatability** — trivial for a normal DB, genuinely hard for vector indexes. Real production case: **150 million vector updates per day in a single cluster** ([`1:08:42`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4122)).
- **Distributed** — replication, sharding, and offloading to cloud storage to decouple storage from compute ([`1:08:42`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4122), [`1:09:15`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4155)).
- **Performance focus** — SIMD optimization, algorithmic optimization, and dedicated indexes per data type ([`1:09:15`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4155)).
