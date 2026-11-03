# Risk 1: Off-topic use

- **Definition**: users make the app do things it wasn't built for. LLMs are instruction-followers, so without careful design any capable model behind your app can be repurposed. [`0:30`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=30)
- **Real case**: a user asked Klarna's customer-support chatbot to help with Python coding — and it complied. [`0:30`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=30)
- **Why it matters**: not directly harmful in itself, but the app gets hijacked for tasks that waste resources (you pay for the tokens) and confuse users. [`0:48`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=48)

Mitigation covered later: a topic classifier in front of the LLM ([product design choices](07-product-design-choices.md)).
