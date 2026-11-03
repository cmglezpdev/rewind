# Third line of defense: safety testing and red-teaming

- **Rule**: whatever protections you implement, you must test that they actually work — and test the *entire application together*: LLM plus guardrails, classifiers, extra steps, and data access. [`4:21`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=261)
- **Red-teaming**: act as a malicious user and try to break your own system to verify it responds as expected. [`4:38`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=278)
- **Concrete method**: build a dataset of tricky adversarial prompts designed to manipulate the LLM into generating something it shouldn't, then check the app *consistently* denies them. [`4:38`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=278)
- **Safety is ongoing**: new attack types keep appearing, so re-test the app continuously while it stays in production. [`4:55`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=295)
