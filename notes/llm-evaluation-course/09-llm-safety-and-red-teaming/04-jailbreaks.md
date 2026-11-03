# Risk 3: LLM jailbreaks

- **Definition**: users intentionally trick the LLM into doing something it shouldn't, which can lead to biased, offensive, dangerous, or harmful outputs. [`1:48`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=108)
- **Real cases** [`1:48`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=108):
  - A Chevrolet dealership chatbot "sold" a car for $1 after a user manipulated it into agreeing with every request.
  - A DPD chatbot swore at a customer and wrote poems mocking the company after being prompted to — which went viral on social media.
- **Distinction from hallucinations**: jailbreaks are adversarial (deliberate manipulation), not accidental model error.

Mitigations covered later: [guardrails](08-guardrails.md) and adversarial [red-teaming](09-safety-testing-and-red-teaming.md).
