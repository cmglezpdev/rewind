# Prompting delegation and saving repeatable workflows

## Demonstrated request

1. A user wanted a selector for the model used by subagents. Theo's response is that the parent agent already chooses delegates, so the user can specify the desired models in the prompt. [`11:33`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=693) [`12:00`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=720)
2. He requests two Opus 5.5 delegates to explore T3 Code performance improvements, a summary of their findings, and a new Grok 4.7 thread to implement the findings. He also selects the machine where the work should run. [`12:00`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=720) [`12:32`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=752)
3. Two Opus 5.5 delegates appear, exploring server and client performance. That confirms delegate launch and model selection in the demonstration. The segment does not show completed findings or the final Grok implementation. [`12:59`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=779)

## When to make a request reusable

- Put instructions into skills or agent instruction files such as `AGENTS.md` and `CLAUDE.md` when you keep repeating them. Repetition is Theo's signal to persist a preference. [`12:59`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=779)
- Start with a requested output, refine it conversationally, then turn it into a skill if it proves useful. The context-window visualizer is his example. [`13:21`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=801)
- The lesson is to try expressing orchestration choices as instructions before adding a dedicated control for every choice. This example assumes the agent already has the tools to launch and select delegates. [`12:00`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=720) [`12:32`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=752) [`12:59`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=779)
