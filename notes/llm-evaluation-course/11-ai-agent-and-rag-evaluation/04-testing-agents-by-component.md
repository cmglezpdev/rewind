# Testing AI Agents by Component

The same "split into testable components" principle applies to agents. The video lists five component-level test types. [`2:54`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=174)

## 1. Correct tool choice

- Check the agent picks the right tool for the task — a weather question should hit the weather API. [`2:54`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=174)
- Design scenarios with known correct tools and verify the LLM chooses them. [`3:11`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=191)

## 2. Data unit tests

- Check the LLM correctly extracts details from user input and returns the right information — e.g. asking for the departure time of a specific flight number should return a known specific answer after querying the right API. [`3:11`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=191)

## 3. Intent classification

- Agents often first classify the user request and route the conversation to a specific step — a pure classification problem. [`3:34`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=214)
- Simulate many inputs with known classification types and measure how well the LLM assigns them. [`3:34`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=214)

## 4. First response quality

- Even long-chat agents are worth testing in a simple input-output manner: run a question bank against ground-truth responses. [`3:34`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=214) [`4:04`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=244)

## 5. Single steps in scenarios

- For longer chats, provide a fixed prior conversation history and test that the agent's **next** action or response is correct. [`4:04`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=244) [`4:21`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=261)
