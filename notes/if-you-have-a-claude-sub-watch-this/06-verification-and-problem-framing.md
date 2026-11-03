# Spend tokens on verification and problem discovery

## Make merging and recovery cheap

- The guiding question is how extra agent work can reduce human attention: start agents earlier and let them proceed further before the next review. [`29:32`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1772) [`29:53`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1793)
- Theo estimates only 10–15% of his tokens write code, with roughly 85–90% verifying it. He presents reducing the likelihood of a flawed PR from 5% to 1% as a useful target, not a measured result from this video. [`30:20`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1820) [`30:48`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1848)
- Reduce risk both before and after merge: agents should verify changes before review, while deployment systems should detect failures and make reversions fast. His proposed recovery threshold is under 15 seconds. [`30:48`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1848) [`31:17`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1877) [`32:56`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1976)
- A task may include implementation, tests, filing a PR, waiting for review, and fixing feedback across multiple rounds. His example takes over an hour, leaving time to start other independent tasks. [`38:03`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=2283) [`38:28`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=2308)

## Delegate the problem before prescribing a fix

- Bring the agent in when thinking starts. Theo describes spending three weeks considering a problem before an agent suggested a simple shortcut he had missed. [`33:20`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=2000) [`33:45`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=2025)
- Supply the observed problem and ask for simpler approaches. Prescribing a premature solution can cause the agent to implement the wrong change and require repeated corrections. [`34:05`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=2045) [`34:29`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=2069)
- For a reported UI bug, he now gives the screenshot and asks for a fix. If the agent fails, that signals a problem needing his investigation and direction. [`34:55`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=2095) [`35:20`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=2120)
- His management analogy is to assign interesting problems and intervene when solutions repeatedly miss. The intended role for human reasoning is unresolved, difficult work and learning from successful solutions. [`35:20`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=2120) [`37:02`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=2222) [`37:29`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=2249)
- While one agent works, start the next task and return when results need attention. The goal is parallel execution with sequential human decisions. [`37:51`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=2271) [`38:28`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=2308)
