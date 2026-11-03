# Asking agents what data and tools they lack

## Use debugging to identify missing evidence

- After trouble diagnosing flickering when new T3 Code threads opened, Theo asks whether the agent has enough historical rendering data to investigate. If it does not, he asks what logging or data access should be added. The segment shows the question, not a completed diagnosis or instrumentation plan. [`18:45`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=1125) [`19:14`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=1154) [`19:38`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=1178)
- This turns an unsuccessful investigation into a concrete engineering question: what evidence would make the next investigation possible? [`18:45`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=1125) [`19:14`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=1154)

## Ask for a capability inventory

- To explore computer use for T3 Code, Theo asked the Codex desktop agent to describe its available capabilities, then passed that description to Opus as implementation guidance. He reports that work was still in a pull request. [`20:03`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=1203) [`20:32`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=1232)
- The described capabilities include discovering and opening apps, reading interfaces, screenshots, mouse actions, keyboard input, field editing, browser tabs, file handling, and verifying results. Interface reading uses both accessibility data and screenshots. These are capabilities described in his example, not a guarantee for every agent environment. [`20:32`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=1232) [`20:53`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=1253)
- Comparing two agents' available tools can expose the access or actions missing from one environment. [`20:32`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=1232)

## Follow-up questions suggested in the talk

- Ask why a pull request lacks a screenshot and which tool would enable screenshots in future pull requests. [`21:15`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=1275)
- Ask the agent to run the program itself to investigate a persistent bug. [`21:15`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=1275)
- Ask it to review another thread's transcript to identify what went wrong. The broader technique is to question the agent's workflow, tools, and previous requests as well as the application code. [`21:15`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=1275)
