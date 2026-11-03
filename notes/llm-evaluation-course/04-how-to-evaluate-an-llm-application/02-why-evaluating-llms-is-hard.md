# Why evaluating LLMs is hard

## Non-determinism is the root difficulty

- LLMs and LLM-powered apps are **non-deterministic**: the exact same input can produce different outputs [`0:39`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=39).
- This is a feature (creativity, generating new things) and a bug (it generates problems) at the same time [`0:39`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=39).
- Example: a customer support chatbot should not invent answers — its responses must be **grounded** [`0:39`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=39).

## What this means for testing

- LLM testing is **not** about checking that the system "works" (as in traditional software) [`1:00`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=60).
- It is about checking that the **range of possible outputs stays within your expectations** [`1:00`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=60).

---

Previous: [Introduction & when we need LLM evals](01-introduction-and-when-evals-are-needed.md) · Next: [What is LLM product quality](03-what-is-llm-product-quality.md)
