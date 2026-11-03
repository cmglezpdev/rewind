# Risk 2: LLM hallucinations

- **Definition**: the app gives misleading or incorrect information. [`1:01`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=61)
- **Key framing**: hallucination is "not a bug but a feature" — everything an LLM produces is made up, so LLMs should never be used for factual information without some form of fact-checking. In business contexts, responses are usually grounded in a specific information source. [`1:01`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=61)
- **Real cases with consequences** [`1:18`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=78):
  - Air Canada's chatbot gave refund advice that contradicted company policy; a court ruled the airline had to compensate the customer.
  - A New York City business chatbot told users to break local laws, exposing missing safeguards for factual accuracy.

Mitigation covered later: RAG grounding with required citations ([product design choices](07-product-design-choices.md)).
