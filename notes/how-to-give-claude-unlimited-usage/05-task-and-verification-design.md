# Choosing tasks, verification, and resources

## Theo's setup sequence

0. Budget for substantial model usage. Theo's "step zero" is having subscriptions he is willing to exhaust; he says viewers unwilling to spend that way should watch out of curiosity. [`19:08`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1148) [`20:02`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1202)
1. Pick a desired outcome with extensive tedious work. He uses a 100,000-plus-file rewrite as an example of work humans may avoid but agents can pursue. [`17:52`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1072) [`18:45`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1125)
2. Define an easy success/failure check. For TS Rust, compare real projects and deliberately injected errors with the reference compiler. [`20:02`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1202) [`20:25`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1225)
3. Prefer programmatic pass/fail checks. If those are unavailable, use another agent to assess results; requiring human judgment every iteration limits autonomous progress. [`20:50`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1250) [`21:09`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1269)
4. Supply the tools and hardware required to execute and verify the task. For the game, he cites Blender, browser inspection, and potentially a GPU and graphical desktop. Requirements change with the task and parallelism. [`21:36`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1296)

## Keep the cost categories separate

- Theo values TS Rust's total work at roughly $38,000 in API-equivalent usage and regards the saved build time as potentially worth that amount. He calls the economics of his other experiments much less sensible. [`19:08`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1148)
- He says the early working TS Rust build that achieved a 2× speedup represented about $500 of subscription usage. He recommends subscriptions rather than paying API rates for these experiments. [`19:34`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1174)
- Later he estimates the port's API-equivalent usage at about $40,000 versus $500–$800 of subscription usage, and claims a $200 plan yielded roughly $12,000 of usage. These are his estimates in the video, not guaranteed subscription entitlements. [`22:28`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1348)
- Model usage excludes the compute used to compile and test code. That separate expense becomes central in [topic 6](06-compute-and-blacksmith.md). [`24:14`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1454)

## Why verification must scale

- Theo reports roughly 1,800 revisions and 7,884 commits during TS Rust's loops. He gives both figures without defining their relationship. At that volume, waiting for a human to judge each attempt would defeat the workflow. [`20:50`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1250)
