# Preference data and bias

- Human preference labeling is difficult even with detailed instructions. Two plausible answers can differ mainly in presentation, and annotators may favor length instead of correctness. [`1:23:38`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5018) [`1:24:01`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5041) [`1:24:16`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5056) [`1:24:35`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5075)
- The lecture shows increasing output length with more RLHF. It connects this to annotators' preference for longer answers, illustrating how a convenient proxy can change model behavior. [`1:24:35`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5075) [`1:25:01`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5101)
- Annotator demographics and perspectives determine which preferences a model learns. The lecturer also raises low pay and exposure to toxic examples as ethical problems in crowdsourced labeling. [`1:25:01`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5101) [`1:25:20`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5120)

## Replacing some human labels with model labels

- In the presented study, collecting 1,000 crowdworker preference labels cost about $300. [`1:25:56`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5156)
- Human labels agreed with the modal human choice about 66% of the time. The authors themselves reached only about 67–68% despite discussing labeling guidelines for several hours. These measure agreement with a group preference, not factual accuracy. [`1:26:20`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5180) [`1:26:36`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5196)
- Model judges were cheaper and could agree with the human majority more often than individual humans. The lecturer interprets this as lower variability at the risk of systematic bias; it does not establish that model judges are always correct. [`1:26:51`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5211) [`1:27:08`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5228)
- The lecture describes combining human and LLM feedback as a practical way to scale preference-data collection. [`1:27:08`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5228)
- Preference datasets can be much larger than SFT datasets. The lecturer gives approximate scales of 5,000–50,000 SFT examples versus around one million preference examples, still far smaller than pretraining corpora. [`1:34:37`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5677) [`1:34:55`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=5695)
