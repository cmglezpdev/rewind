# Measuring wire-protocol regressions in PRs

## The recurring problem

- T3 Code transfers thread data from the server on a user's machine to the client displaying it. Theo optimized that protocol to load even a large thread with as little as about 5 KB, but apparently small PRs kept undoing the gains. The figure is an example, not a guaranteed size for every thread. [`39:46`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2386) [`40:20`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2420)

## The thread transfer impact tool

1. A PR action takes real thread event data and runs it through a fully simulated end-to-end transfer pipeline. [`40:20`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2420)
2. It measures the data sent through that pipeline and reports results on each PR, flagging meaningful regressions. The transcript does not specify a numeric failure threshold. [`40:20`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2420) [`40:55`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2455)
3. Reviewers, developers, and agents watching the PR can see whether a change harms the metric and respond. [`40:55`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2455)
4. The check also tells agents that transfer size is an explicit project priority. Theo considers this steering effect its most important contribution. [`40:55`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2455)

## Cost and reported outcome

- Theo estimates the action takes under 45 seconds, perhaps around 30 seconds. He reports that it worked well, but gives no quantified post-installation regression rate. [`40:55`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2455) [`41:25`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2485)
- This is his concrete example of adding a useful check while deleting low-value tests elsewhere. The check measures a behavior he had repeatedly seen regress. [`38:27`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2307) [`40:20`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2420) [`41:25`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2485)
