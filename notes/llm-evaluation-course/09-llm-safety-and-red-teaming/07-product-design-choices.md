# First line of defense: product design choices

Design the system so risk is reduced from the start — each risk maps to a design-level countermeasure. [`3:05`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=185)

| Risk | Design countermeasure |
|---|---|
| Hallucinations | Implement RAG: give the LLM a trusted information source and optionally require it to always quote that source [`3:05`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=185) |
| Off-topic use | Put a classifier in front of the app that decides whether a query should even reach the LLM; unrelated questions get a "cannot answer" response [`3:05`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=185), [`3:21`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=201) |
| Data leakage / unauthorized actions | Constrain model access — simply don't give it access to sensitive data [`3:21`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=201) |
| Risky agent actions | Add human-in-the-loop approval for any risky action an AI agent could take [`3:21`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=201) |
| Private data in fine-tuning | Carefully sanitize the training data before fine-tuning [`3:37`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=217) |
