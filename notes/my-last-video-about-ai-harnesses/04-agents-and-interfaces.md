# Models, agents, harnesses, and interfaces

## Distinguishing the parts

- An interface is the part a human uses to interact with a system. Theo classifies Twitch and YouTube as straightforward examples. [`14:40`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=880) [`15:06`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=906)
- A harness supplies the execution capabilities around the LLM. Theo uses the Claude Agent SDK as his example, describing tools, an agent loop, and context management. [`15:06`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=906) [`15:32`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=932)
- An agent, in his definition, combines an LLM and a harness. The harness supplies tools, context, and a system prompt describing the model's role so it can complete tasks. [`18:09`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=1089) [`18:46`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=1126)

## Why product names are confusing

- Theo calls Claude Code an interface that bundles a harness. He distinguishes the desktop interface, the SDK used to embed the agent, and the underlying binary that performs the harness role. [`15:58`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=958) [`16:29`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=989)
- The CLI is a terminal interface for interactive development and one-off tasks. The Agent SDK exposes the underlying agent functionality to a Python or TypeScript application. [`15:58`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=958) [`16:29`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=989)
- A product can package multiple layers under one name. This is why asking whether "Claude Code" is a harness or an interface needs a more specific answer about which component is meant. [`15:58`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=958) [`16:29`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=989)
- Theo explicitly classifies T3 Code as an interface, while acknowledging that it adds capabilities and changes some behavior around the harness. [`16:55`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=1015) [`17:17`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=1037)
