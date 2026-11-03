# SQLite case study: diagnosis, implementation, and review

## Task and initial diagnosis

- T3 code users, particularly heavy Windows users, report connection instability associated with SQLite. Theo asks Gemini what to prioritize, already knowing much of the intended fix and providing an async-SQLite hint. [`29:33`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1773)
- Theo identifies the desired connection structure as a read pool with a single writer. Gemini eventually identifies that split after reading many files serially. [`29:57`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1797)

## What Gemini shipped

- Asked to implement its first priority, Gemini takes about 30 minutes and opens a roughly 1,200-line PR. Theo initially estimates the change should have been about 30 lines. [`30:22`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1822) [`30:47`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1847)
- The description ignores repository instructions to start with two or three sentences explaining the user's problem. Theo finds the replacement summary difficult to read. [`31:10`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1870)
- Both check and lint fail. Gemini leaves those failures and high-severity review-bot comments unresolved. [`31:37`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1897)

## Why the fix misses the mechanism

- Theo asks Opus 5.5 to inspect the thread and PR and close it if the criticism is justified. Opus closes it, describing the diagnosis as mostly correct but lacking evidence. [`32:03`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1923)
- In Opus's review, reader connections still perform synchronous SQLite work on the main thread. A slow read therefore continues blocking heartbeats. Reducing contention on a semaphore does not remove that event-loop blockage. [`32:22`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1942)
- Gemini misses two existing PRs addressing the issue. Theo contrasts this with Muse previously locating an existing fix and advising him to merge it. [`32:45`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1965)
- Opus's criticism is that Gemini never tested whether its proposed reader pool would stop blocking the event loop, then implemented its own proposed priority without revisiting that assumption. [`33:07`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1987) [`33:33`](https://www.youtube.com/watch?v=NE006pkiAnk&t=2013)

## Outcome and lesson

- Theo has Opus make the replacement changes, reports a 21-line change, and says it is merged for the next nightly. The transcript does not show enough code to reconstruct that patch. [`33:33`](https://www.youtube.com/watch?v=NE006pkiAnk&t=2013) [`33:45`](https://www.youtube.com/watch?v=NE006pkiAnk&t=2025)
- The case illustrates the difference between naming the right components and proving that an implementation changes the failing behavior. The evidence here is a PR that preserved main-thread blocking despite adding reader-pool machinery. [`32:22`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1942) [`33:07`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1987)
