# Testing Agent Outcomes and Trajectories

Second principle: test just the final outcome — treat the agent as a black box. [`4:21`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=261)

## Final outcome (black box)

- Check whether the final result is what you expect: if the user asked to make a booking, did the agent actually complete it? [`4:32`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=272)

## Trajectory testing

- Separately, verify the agent's **trajectory** — you may know the expected set of steps to complete the task. [`4:32`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=272)
- Example: the agent must call a list of tools and check APIs in a certain order; test that this sequence was actually followed. [`4:44`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=284)
