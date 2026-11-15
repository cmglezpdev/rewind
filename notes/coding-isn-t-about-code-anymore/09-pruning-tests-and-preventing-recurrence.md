# Pruning tests and tracing recurrence

## The T3 Code cleanup

- Theo describes deleting around half of T3 Code's unit tests because many tested unnecessary edge cases and encouraged more tests of the same kind. [`38:27`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2307)
- He reports removing about 250,000 lines in one PR. Of roughly 11,000 removed tests, he says only four were restored, and he reports no regressions that the deleted tests would have caught. These are his retrospective observations, not independent proof that similar deletions are safe elsewhere. [`38:57`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2337)

## How the team responds when bad tests return

1. Remove misleading examples and adjust repository and agent guidance to discourage unnecessary tests. Theo says deletion helped, but guidance did not eliminate recurrence. [`39:20`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2360)
2. When another poor test appears, ask the contributor to find the agent conversation that produced it. [`39:20`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2360)
3. Ask the agent what led it to add that test and why it considered the test useful. Use that explanation to identify and correct the source of the behavior. [`39:20`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2360) [`39:46`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2386)

## The lesson

- Monitoring remains necessary after cleanup. This repeats Derek's documentation lesson: remove the bad contribution and inspect the context that made it seem correct. [`13:01`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=781) [`39:20`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2360) [`39:46`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=2386)
