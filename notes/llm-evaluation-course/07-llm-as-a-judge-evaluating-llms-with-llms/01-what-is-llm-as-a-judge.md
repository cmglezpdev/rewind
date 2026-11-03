# What is LLM-as-a-judge and why can you trust it?

- LLM-as-a-judge = using an LLM to evaluate LLM outputs, e.g. asking "Is this text polite?" or "Is this text concise?" and getting a response [`0:18`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=18)
- It works both for experimentation (offline testing) and for live monitoring in production [`0:18`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=18)

## Why it isn't "cheating"

The common objection — "how can an LLM be trusted to evaluate its own outputs?" — misses what the judge is actually asked to do:

- The evaluator is **not redoing the work**; it does something narrower: classify or evaluate text against specific criteria [`0:35`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=35)
- It's much easier to critique than to create — spotting errors is easier than avoiding them, even for LLMs [`0:35`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=35)
- Asymmetry of jobs: the main product (e.g. a chatbot) handles user inputs, memory, tools, and complex instructions; the evaluator has one simpler job, e.g. "Is this response respectful?" [`1:00`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=60)
- The chatbot might get tricked by a malicious user mid-conversation, but the evaluator only looks at the final text and judges it on its merits [`1:00`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=60)
