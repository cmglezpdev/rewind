# Hill climbing, verifiable rewards, and TS Rust

## The conceptual model

- Theo uses "hill climbing" for repeated attempts guided by feedback that distinguishes success from failure. His introductory example is choosing the winning move on a tic-tac-toe board. [`8:28`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=508) [`8:53`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=533)
- In his simplified account of training, pretraining supplies knowledge and reinforcement learning shapes behavior such as tool use, testing a hypothesis, and trying again after failure. [`9:19`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=559) [`9:44`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=584)
- RLVR means reinforcement learning with verifiable rewards: training uses tools that can programmatically check whether the model succeeded. His example exposes five transformation cases while retaining 500 hidden cases. [`11:12`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=672) [`11:44`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=704)
- The long-running project strategy borrows this structure: give an already-trained agent concrete checks and let it revise its code. The described project loop is code iteration, not a claim that the user is retraining the model's weights. [`12:15`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=735) [`12:40`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=760)

## TS Rust's verification recipe

1. Choose real TypeScript projects and pin the reference TypeScript version. Record its emitted JavaScript and diagnostics. [`11:44`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=704) [`12:40`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=760)
2. Run the Rust port on the same inputs and require exactly matching outputs. This provides an explicit completion condition. [`12:40`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=760)
3. Insert random errors into projects and compare reference diagnostics with the port's diagnostics. A port that misses those errors fails the check. [`12:15`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=735)
4. Once behavior matches, set a performance goal while preserving all existing validation and tests. Theo used "two times faster." [`13:09`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=789)

## Reported outcome and lesson

- Theo says TS Rust began working in a day and improved over several weeks. Its initial working version was slower than TSGO; he then instructed the agent to continue until it was 2× faster and reports that it did. [`13:09`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=789) [`13:37`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=817)
- His explanation is that tasks with consistent, verifiable inputs and outputs resemble the environments used to train coding behavior. A concrete success test gives the agent something it can keep improving without repeated human judgment. [`12:15`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=735) [`13:37`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=817)
