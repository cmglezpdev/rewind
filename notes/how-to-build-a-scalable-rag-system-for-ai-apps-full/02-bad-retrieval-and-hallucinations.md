# 2. Why Bad Retrieval Causes Hallucinations

## The core finding

- A Google Research study cited in the video: when retrieval is off, the LLM doesn't give *slightly* wrong answers — it **hallucinates more than if you had given it no context at all** ([`0:37`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=37)).
- The stated rule: **bad retrieval is worse than no retrieval** ([`0:37`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=37)).

## Worked example — "What's your parental leave policy for employees in California?"

The system finds chunks mentioning *parental leave* and chunks mentioning *California*. Looks relevant. Three ways it silently fails ([`2:24`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=144)):

| Failure | What happened |
|---|---|
| **Stale version** | The chunk comes from a 2019 policy updated twice since; the system only knows the words matched ([`2:46`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=166)) |
| **Bad split** | The document was chunked mid-sentence, cutting off the eligibility criteria — the LLM gets half the information ([`2:46`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=166)) |
| **Destroyed structure** | A table listing state-specific policies became a jumbled mess of words during text extraction ([`2:46`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=166)) |

- In all three, **search "worked"** — it found text that looked relevant. The context was incomplete, outdated, or wrong ([`3:10`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=190)).

## The counterintuitive part

- You'd expect the LLM to say "I don't know" when the context is insufficient. It doesn't ([`3:10`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=190)).
- **Giving an LLM context makes it more confident — even when the context is bad.** It fills gaps with information that sounds right but is completely made up ([`3:26`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=206)).
- Result: a **confidently wrong** system, far worse than one that admits it doesn't know ([`3:36`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=216)).
