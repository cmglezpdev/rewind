# Model capabilities, files, and skills

## Capabilities that support persistent work

- Longer instruction following lets models work for hours or days when paired with suitable context compression and compaction. This is Lee's qualitative account, not a measured reliability rate. [`6:14`](https://www.youtube.com/watch?v=L1OBRtfPS34&t=374)
- Sub-agents provide fresh working context for expensive tool calls or research, then report results to the main agent. Delegation reduces the main conversation's context burden. [`6:41`](https://www.youtube.com/watch?v=L1OBRtfPS34&t=401)
- Better tool use allows agents to work with shell commands, files, a full Linux computer, and demo recording. [`7:15`](https://www.youtube.com/watch?v=L1OBRtfPS34&t=435) [`7:32`](https://www.youtube.com/watch?v=L1OBRtfPS34&t=452)
- Computer use lets agents click through websites and SaaS products that lack an API or MCP server. Files give the agent a searchable record of information it may need later. [`7:48`](https://www.youtube.com/watch?v=L1OBRtfPS34&t=468)
- Demonstrated workflows can become reusable skills, memories, or routines. [`8:17`](https://www.youtube.com/watch?v=L1OBRtfPS34&t=497)

## What gets stored

| Artifact | Purpose | Source |
| --- | --- | --- |
| User profile | Include stable preferences, such as lowercase messaging, in every prompt | [`8:39`](https://www.youtube.com/watch?v=L1OBRtfPS34&t=519) |
| Working log | Record work over time so questions such as “What did I do last week?” can be answered by searching files | [`8:39`](https://www.youtube.com/watch?v=L1OBRtfPS34&t=519) [`9:04`](https://www.youtube.com/watch?v=L1OBRtfPS34&t=544) |
| Skill | A Markdown file encoding the process and success criteria for a task | [`9:18`](https://www.youtube.com/watch?v=L1OBRtfPS34&t=558) |
| Plugin | Install tools through skills or servers; Grokbot is the example in the transcript | [`9:44`](https://www.youtube.com/watch?v=L1OBRtfPS34&t=584) |
| Routine | Run a prompt on a schedule, analogous to a cron job | [`9:44`](https://www.youtube.com/watch?v=L1OBRtfPS34&t=584) |
