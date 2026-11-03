# Scenario Testing and Online Evaluation

Third principle: test the complete interaction. [`4:44`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=284)

## Scenario testing (offline)

- Manual option: interact with your agent yourself and replay certain scenarios. [`5:00`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=300)
- Programmatic option: implement a second agent that plays the role of the user. [`5:00`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=300)
- Example: simulate a user booking a hotel room with certain requirements, then changing them halfway through — the test verifies the agent adjusts and reacts only to the latest version of the request. [`5:00`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=300) [`5:15`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=315)

## Online evaluations

- Evaluating the complete interaction is also what you do online, using the usual LLM-as-a-judge approach applied at the **conversation level**. [`5:24`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=324)
- Pass the complete conversation transcript and ask questions like: did the user express frustration at any point? Did the agent communicate politely? Was the user task resolved by the end? [`5:24`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=324)
- Also track harder metrics such as function call usage. [`5:40`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=340)

## Closing point

- Evals and monitoring for complex systems follow the same principles as simple ones — design test cases, pick metrics, run online evaluations — just at a bigger scale with more complex checks. [`5:40`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=340)
