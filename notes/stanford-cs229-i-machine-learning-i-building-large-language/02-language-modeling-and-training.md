# Language modeling and training

## Probability model and generation

- A language model assigns a probability to a sequence of tokens, written as \(p(x_1,\ldots,x_L)\). A good model should favor grammatical, plausible sentences such as "the mouse ate the cheese" over malformed or semantically unlikely alternatives. [`3:43`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=223) [`4:04`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=244) [`4:17`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=257)
- Modeling a distribution makes generation possible: sample from that distribution to produce new text. [`4:56`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=296)
- Autoregressive modeling uses the exact probability chain rule, \(p(x_1,\ldots,x_L)=\prod_{t=1}^{L}p(x_t\mid x_{<t})\). The factorization itself introduces no approximation. [`5:15`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=315) [`5:40`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=340)
- Generation is sequential: sample a token, append it to the context, and repeat. Longer outputs therefore require more sequential generation steps. [`6:12`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=372)

## From text to a prediction

1. Tokenize the context into token IDs. [`6:36`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=396) [`6:54`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=414)
2. Embed each ID into a vector and process the sequence with a transformer. [`8:48`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=528)
3. Apply a linear output layer whose dimension equals the vocabulary size, followed by softmax to obtain next-token probabilities. [`8:25`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=505) [`9:06`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=546)
4. At inference, sample a token and detokenize it. Training instead compares the predicted distribution with the observed next token and updates the weights. [`7:07`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=427) [`7:28`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=448)

## Objective

- Next-token prediction is classification over the vocabulary. The target is a one-hot distribution for the token that actually occurred, and training uses cross-entropy. [`9:30`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=570) [`9:51`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=591)
- In notation, the sequence loss is \(\mathcal L=-\sum_t\log p_\theta(x_t\mid x_{<t})\). Minimizing this loss is equivalent to maximizing the training text's log-likelihood. [`10:08`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=608) [`10:31`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=631)
