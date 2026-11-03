# Risk 4: Data leaks

- **Two main leak paths** [`2:18`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=138):
  1. The AI system has access to a database with sensitive information and leaks it into responses.
  2. The model was fine-tuned on data containing private information, which can resurface in later generations.
- **This risk list is not complete**: for a fuller catalog, the video points to the OWASP Top-10 LLM vulnerabilities list. [`2:34`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=154)

Mitigations covered later: constraining model data access, sanitizing fine-tuning data ([product design choices](07-product-design-choices.md)), and input screening ([guardrails](08-guardrails.md)).
