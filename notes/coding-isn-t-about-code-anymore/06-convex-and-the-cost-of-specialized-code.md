# The Convex migration and specialized code

## Starting point

- T3 Chat used Theo's custom synchronization engine. It worked, but he describes maintaining it as extremely difficult. Convex combined a backend, database, API layer, and client/server SDK, offering an alternative to that custom infrastructure. [`26:16`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1576) [`26:39`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1599)
- He describes the migration as his last major hand-coded overhaul. Agents he tried at the time could not complete the work, so he did it himself. [`25:56`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1556)

## Scope and immediate effect

- The migration took about a month and culminated in a PR involving more than 25,000 lines. The most obvious user improvement was more reliable synchronization between devices, rather than a large visible product change. [`27:08`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1628)
- T3 Chat's scale exposed unusual Convex edge cases. Theo reports that Convex resolved them quickly. [`27:37`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1657)

## Why the migration mattered

- High database costs and unpleasant maintenance were problems, but Theo identifies the main motivation as team dependence on him. He alone understood the backend database code, which repeatedly blocked Mark and Julius. [`27:54`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1674) [`28:20`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1700)
- Moving to Convex reduced that fragility and let the team continue improving the product while his hand recovery prevented him from coding for several months. [`28:39`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1719)
- He judged the payoff by how much more easily Mark and Julius could submit and land PRs afterward. No numerical before/after PR count is supplied for this migration. [`28:55`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1735)
- His broader lesson is that human-written code can create the same obstructive "slop" as generated code. The relevant issue is how it blocks subsequent contributors, regardless of who wrote it. [`29:23`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1763) [`29:50`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1790) [`30:11`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1811)
