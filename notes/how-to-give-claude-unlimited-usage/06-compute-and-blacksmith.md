# Compute bottlenecks and Blacksmith offloading

## The bottleneck moved from reasoning to execution

- TS Rust's model usage represented an estimated $500–$800 of subscriptions, but agents also needed machines to build and test the code. Theo recruited stored computers and installed T3 OS on them. [`22:28`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1348) [`23:00`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1380)
- The setup reached about eight local computers plus two VPSs accessible by SSH. Theo excludes those machines and their electricity from his later compute-cost figure. [`23:26`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1406)
- Under contention, a ten-minute job could wait up to an hour before starting. More agent activity could therefore increase queues without delivering prompt validation. [`24:14`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1454)

## What Blacksmith changed

- Theo used Blacksmith to offload jobs to cloud compute. He discloses that Blacksmith is a sponsor and says its intended strengths are predefined repository jobs such as GitHub Actions. [`23:26`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1406) [`23:48`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1428)
- He spent over $2,000 on TS Rust's offloaded test compute. This was separate from ordinary CI, which he estimates cost under $30. [`24:14`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1454)
- Reported waiting for compute per run fell from upwards of 12 hours to 1.2 hours once agents could create and run cloud jobs. This is a waiting-time comparison, not a claim that the compiler itself became ten times faster. [`25:05`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1505)
- Builds still took 20–40 minutes before their results could be checked. This remaining cost motivated Lust, a compiler focused on speeding up TS Rust's development loop. [`25:30`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1530)

## Boundaries of the recommendation

- Theo recommends Blacksmith for established verification, CI, and release jobs. He specifically discourages using it for arbitrary local agent development loops, except to check existing CI work. [`25:54`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1554)
- The next approach, [Boat sandboxes](07-boat-sandboxes.md), addresses agents that need disposable machines on demand. [`26:49`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1609) [`27:12`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1632)
