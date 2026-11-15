# How development friction blocks agents

## The gardener's responsibility

- Theo defines gardening as creating an environment in which code grows in the intended direction, with support and monitoring that make mistakes recoverable before they spread. [`32:48`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1968)
- The work includes watching where agents get stuck and changing the codebase or checks that confuse them. He sees this as an extension of the platform work he previously did for human teammates. [`42:25`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2545)

## Bottlenecks to inspect

1. Slow validation keeps an agent waiting. Theo uses a five-minute development startup as an example of a serious block. [`36:42`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2202)
2. With a five-minute cache TTL, long waits can also lose prompt-cache reuse and increase token costs. This is his conditional example, not a universal cache policy or a measured cost increase. [`36:42`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2202)
3. CI that consumes too much CPU or RAM restricts how much work can run in parallel. [`36:42`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2202)
4. A slow release pipeline discourages merging, especially when a bad release also takes a long time to repair. [`37:11`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2231)
5. Poor generated code can spread quickly if left in place. Theo argues for removing it as soon as it appears rather than relying on occasional cleanup. [`37:48`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2268) [`38:03`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2283)

## Interpreting the productivity claim

- For human developers, Theo offers an illustrative estimate of moving from 10 PRs per week to perhaps 12–15 after removing friction. He argues agents are more severely blocked, but provides no controlled comparison of the two groups. [`36:13`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2173) [`36:42`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2202)
- The recommended focus is the full path from making a change to validating and releasing it. Improvements matter when they remove an actual contributor bottleneck. [`36:42`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2202) [`37:11`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2231)
