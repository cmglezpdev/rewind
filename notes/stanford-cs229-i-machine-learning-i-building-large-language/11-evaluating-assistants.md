# Evaluating assistants

## Why pretraining metrics are insufficient

- Assistant tasks have many valid answers and cover open question answering, generation, summarization, and more. Matching one exact token sequence cannot measure all acceptable responses. [`1:27:39`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5259) [`1:28:16`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5296) [`1:28:36`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5316)
- Validation objectives from PPO and DPO are not directly comparable. Preference optimization also changes the objective away from modeling all plausible human text, so perplexity is not a sufficient measure of assistant quality. [`1:17:38`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=4658) [`1:17:52`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=4672) [`1:27:59`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5279)
- Clarification: these models still output token probability distributions. The lecturer's concern is that a reward-optimized policy need not assign useful likelihoods to every semantically valid answer, not that probabilities cease to exist. [`1:29:14`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5354) [`1:29:36`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5376) [`1:29:51`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5391)

## Human and model comparisons

- Chatbot Arena gathers blind comparisons: users ask two anonymous models questions and select the better response. Aggregated preferences produce rankings. [`1:30:10`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5410)
- Arena users can overrepresent technical interests. Large-scale human comparisons also take too much time and money for frequent development experiments. [`1:30:30`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5430) [`1:30:44`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5444)
- Model-based evaluation generates a candidate answer and baseline answer for each instruction, asks another LLM which is better, then averages preferences into a win rate. The result is relative to that baseline, judge, and prompt set. [`1:31:03`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5463) [`1:31:24`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5484) [`1:31:41`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5501)
- The lecturer reports that AlpacaEval obtains 98% correlation with Chatbot Arena, runs in under three minutes, and costs under $10 for the setup shown. These are reported results for that evaluation configuration. [`1:31:41`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5501) [`1:32:02`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5522)

## Length bias can distort rankings

- LLM judges and humans can prefer longer responses. Repeatedly optimizing a model judge's systematic bias can amplify it. [`1:32:17`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5537) [`1:32:32`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5552)
- In the illustrated GPT-4 comparison against itself, the baseline win rate is 50%. Asking one side to be verbose raises its win rate to 64.4%; asking it to be concise lowers it to 20%. The model did not change, only the instruction about answer length. [`1:32:50`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5570) [`1:33:06`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5586)
- AlpacaEval's mitigation uses regression and causal-inference tools to control for output length. The lecturer says this reduces, rather than eliminates, the benefit of verbosity. [`1:33:24`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5604)
