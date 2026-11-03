# Experiments and work triage

## Broaden what agents handle

- The provocatively named "using tokens poorly" section advocates low-stakes experiments to discover capabilities. Examples include explaining a teammate's PR, summarizing an ongoing rewrite, prioritizing open PRs, and searching several email inboxes. [`51:00`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=3060) [`51:22`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=3082)
- He describes having Codex spend over 30 minutes collecting surgery-related medical records from inboxes and browser dashboards while he starts four unrelated development tasks. This is an example of concurrent work, not an accuracy evaluation. [`51:45`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=3105)
- His project-audit prompt asks agents to inspect local unfinished work and GitHub projects, then identify abandoned ideas worth reviving because demand may have changed. He says it found several candidates but gives no names or measured returns. [`55:25`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=3325) [`55:44`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=3344)
- For forgotten work, ask the agent for its current state, value, and rationale for merging. For nearly completed work, request a live test environment, PR, and monitoring. [`56:22`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=3382) [`56:40`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=3400)
- The next-day review loop is one thread at a time: merge, request a follow-up, or discard. His example has over 12 tasks, some taking 30 minutes and others 18 hours, across five Claude subscriptions with capacity left. [`57:26`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=3446) [`57:45`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=3465) [`58:01`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=3481) [`58:18`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=3498)
- He reports being surprised by agents' ability to triage many PRs and find overlooked work. The lesson he draws is to try uncertain tasks before deciding agents cannot help. [`58:42`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=3522)

## Remote connection options shown

- He says the free default T3 Connect relay allows three connected devices at the time of filming. Direct Tailscale connections avoid that relay path, and the same interface can control work across machines and a phone. [`52:55`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=3175) [`53:19`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=3199)
- His setup sketch is SSH into a machine with Claude Code or Codex installed, run the T3 Connect command through npx, and authenticate via its link. Alternatively he describes T3 Serve with Tailscale support for direct access. The transcript does not provide verified package spelling or a complete shell command. [`53:40`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=3220) [`54:06`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=3246)
- He folds T3 Code connectivity into fleet provisioning instructions so agents configure it along with coding clients and proxy access on new machines. [`54:31`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=3271)
