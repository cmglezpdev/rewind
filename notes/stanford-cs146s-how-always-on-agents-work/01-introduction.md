# Introduction to always-on agents

- A basic agent harness is a model calling tools in a loop. Running that loop only in a local terminal ties its lifetime to the laptop and process. [`0:20`](https://www.youtube.com/watch?v=L1OBRtfPS34&t=20) [`0:38`](https://www.youtube.com/watch?v=L1OBRtfPS34&t=38)
- An always-on agent runs on a server, can survive restarts or crashes, and can use its own cloud Linux computer with files, a browser, and a desktop. [`0:38`](https://www.youtube.com/watch?v=L1OBRtfPS34&t=38) [`0:58`](https://www.youtube.com/watch?v=L1OBRtfPS34&t=58)
- Persistence also includes continuity of work: saved files and accumulated memory help the agent understand progress over time. [`0:58`](https://www.youtube.com/watch?v=L1OBRtfPS34&t=58)
- Proactive behavior includes knowing when to stay quiet. The agent can work in the background and report only meaningful updates instead of replying to every event. [`1:23`](https://www.youtube.com/watch?v=L1OBRtfPS34&t=83)
- Messages are only one trigger. Slack, email, and other events can wake the agent; work lasting weeks or months is the architectural goal, rather than a demonstrated guarantee here. [`1:45`](https://www.youtube.com/watch?v=L1OBRtfPS34&t=105)
