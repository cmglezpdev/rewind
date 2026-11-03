# Managing agents by removing blockers

## Separate execution from diagnosis

- Theo ran one TS Rust thread with a continuing optimization goal and a second thread for checking history, reporting status, and identifying bottlenecks. He used the second thread when progress slowed. [`32:01`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1921)
- His key question was what was currently blocking the work, rather than simply requesting more output. [`32:01`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1921) [`32:31`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1951)

## The sequence of interventions

1. Too many concurrent Rust jobs caused the machine to run out of memory and crash. The agent introduced a queue to control which run could build. [`32:31`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1951)
2. The queue exposed a capacity shortage. Theo added computers, gave the agent SSH access, and distributed work. [`32:31`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1951)
3. He moved work to Blacksmith when he wanted those computers back, then pursued further acceleration through Lust. [`32:54`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1974)

## Treat environment design as an ongoing loop

- Supplying resources and asking about blockers are recurring steps. Once an objective and evaluator exist, Theo's proposed human role is to keep improving the environment in which agents work. [`32:54`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1974)
- On one machine, he could exhaust only one or two Claude subscriptions a week. After removing compute constraints, he could consume all seven much faster. Lower waiting time increases model demand. [`33:47`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=2027)
- His management analogy means setting agents up to succeed and asking what slows them down. He contrasts that role with checking every individual piece of work himself. This describes his operating approach, not evidence that review is unnecessary for every project. [`33:47`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=2027)
- A bottleneck may itself become a new verifiable project. Slow Rust compilation during TS Rust led him to create Lust, returning the loop to task selection. [`34:07`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=2047)
