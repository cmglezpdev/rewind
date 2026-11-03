# Built-in tools, plugins, and external data

## Tools expand the agent's available actions

- Theo contrasts Pi's minimal tool set, which he characterizes as essentially Bash, with Claude Code and the Agent SDK's broader built-ins. Examples include subagent spawning, file reading and editing, skills, artifacts, and Bash. [`18:46`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=1126)
- Tools can come from plugins. His TypeScript example adds go-to-definition and find-references operations. [`19:10`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=1150)
- His computer-use example, transcribed as "KUA," provides screenshot, click, and type operations. At the time of the recording, he describes its arrival in T3 Code as upcoming. [`19:10`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=1150)
- A plugin or computer-control library does not become a harness merely by providing tools. It adds capabilities to an existing harness. [`19:36`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=1176)

## Theo's tool plane and data plane distinction

- The "tool plane" is his name for capabilities the harness exposes to the model. The "data plane" describes access to systems outside the harness. He acknowledges that external access can also be implemented as tools. [`17:17`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=1037) [`20:05`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=1205)
- He compares built-in tools to kitchen equipment and MCP-provided external information to a cookbook the model can choose to consult. Both tools and information can be ignored by the model. [`20:05`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=1205) [`20:36`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=1236)
- Supabase and PostHog are his examples of external systems accessed through MCP, respectively for product database data and analytics. [`20:36`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=1236) [`20:59`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=1259)
- His implementation distinction is where code runs: a custom harness tool ships code for that harness to execute, while an MCP binding lets the harness request execution from another system. This is his architectural framing of the comparison. [`20:59`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=1259) [`21:23`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=1283) [`21:48`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=1308)
