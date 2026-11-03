# 12. Evaluation Metrics

Evaluation lives on the right side of the diagram and answers: **is the system actually working?** ([`13:15`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=795), [`13:42`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=822))

## The three types

### 1. Qualitative — LLM judges

Assess ([`13:42`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=822)):

- **Faithfulness** — is the response faithful to the retrieved context?
- **Relevance** — is it relevant to the query?
- **Depth** — is it thorough enough?

> Transcript note: at [`13:42`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=822) this is called "quantitative", but the architecture walkthrough at [`5:27`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=327) names it **qualitative evaluation using LLM judges** — the earlier label is the consistent one.

### 2. Quantitative — retrieval precision and recall

- **Precision** — of the chunks you retrieved, how many were actually relevant? ([`14:00`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=840), [`14:05`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=845))
- **Recall** — of all the relevant chunks in your database, how many did you successfully retrieve? ([`14:05`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=845))

### 3. Performance — latency and cost

- How long does each query take? How many tokens are you using? ([`14:05`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=845))
- Explicitly framed as mattering **at scale** ([`14:05`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=845)).

## Why it's non-negotiable

- **Without evaluation, you're flying blind** — you might think your system is working great while users are quietly getting bad answers ([`14:05`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=845), [`14:22`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=862)).
