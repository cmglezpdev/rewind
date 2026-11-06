# MCP evaluations and context reduction

## Turning observed failures into an evaluation

- T3 Code's MCP tools let agents create subagents, read and message threads, and open threads in projects. Theo observes mistakes such as opening a new thread when he wanted a subagent. [`26:48`](https://www.youtube.com/watch?v=xq0eB8vxeqk&t=1608) [`27:07`](https://www.youtube.com/watch?v=xq0eB8vxeqk&t=1627)
- He collects and categorizes failures from his own history, then turns them into evaluation cases. An early Sonnet 5.5 run gets approximately 60 of 88 correct, leaving about 28 failures. [`27:07`](https://www.youtube.com/watch?v=xq0eB8vxeqk&t=1627) [`27:30`](https://www.youtube.com/watch?v=xq0eB8vxeqk&t=1650)
- Access to the source data matters. He moves the work from a machine with only its local database to a laptop with access to all relevant databases. [`27:57`](https://www.youtube.com/watch?v=xq0eB8vxeqk&t=1677)
- The evaluation PR grows beyond 2,000 lines and remains unmerged at recording time. In a later 85-case run, changes reduce correct results from 66 to 63. The evaluation exposes a regression instead of assuming edits improved behavior. The transcript does not explain the change from 88 to 85 cases. [`28:40`](https://www.youtube.com/watch?v=xq0eB8vxeqk&t=1720)

## Optimize correctness before size

Theo gives the agent this sequence: [`29:07`](https://www.youtube.com/watch?v=xq0eB8vxeqk&t=1747)

1. Reach a perfect score so the known failures stop. [`29:07`](https://www.youtube.com/watch?v=xq0eB8vxeqk&t=1747)
2. Commit and stabilize that result. [`29:07`](https://www.youtube.com/watch?v=xq0eB8vxeqk&t=1747)
3. Check that all models of interest achieve a perfect score. [`29:07`](https://www.youtube.com/watch?v=xq0eB8vxeqk&t=1747)
4. Delete as much tool-description text as possible, targeting one-third of the original size while preserving the perfect score. [`29:07`](https://www.youtube.com/watch?v=xq0eB8vxeqk&t=1747)

## Reported outcome

- Theo says the optimization works and reduces context substantially. He reports 52% less context for T3 Code and 78% less with tool search enabled, partly by flattening the model list and placing other tools behind search. These percentages are distinct from the earlier one-third-size target. [`29:33`](https://www.youtube.com/watch?v=xq0eB8vxeqk&t=1773) [`29:51`](https://www.youtube.com/watch?v=xq0eB8vxeqk&t=1791)
- At recording time, he says the context improvements are in the nightly release and expected in stable soon. Publishing the evaluation would provide a way to test future changes. [`29:51`](https://www.youtube.com/watch?v=xq0eB8vxeqk&t=1791) [`30:21`](https://www.youtube.com/watch?v=xq0eB8vxeqk&t=1821)
- The broader lesson is to give the agent an explicit objective with a correctness constraint. Here, reducing context is useful only while the known behavior tests continue to pass. [`29:07`](https://www.youtube.com/watch?v=xq0eB8vxeqk&t=1747) [`31:05`](https://www.youtube.com/watch?v=xq0eB8vxeqk&t=1865)
