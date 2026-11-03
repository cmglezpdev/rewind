# LLM evaluation methods and metrics

*Evidently AI · 5:09 · https://www.youtube.com/watch?v=6eOcgYP5D4Q*

## 1. <Untitled Chapter 1>

[`0:02`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=2) [Music] In this video, we're going to talk about LLM evaluation methods. We will discuss predictive quality metrics, generative quality metrics, methods like semantic similarity and using machine learning based models, using LLMs to evaluate LLMs - also known as LLM as a judge - and a few simpler methods like text statistics and regular expressions.

[`0:19`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=19) We already talked a lot about manual evaluations and that's where you should always start. Always look at your data. Don't skip this. Involve domain experts. But automated evaluations is where you scale. So let's take a look at how you do this using different methods. We can split all the methods into two big groups.

[`0:36`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=36) The first

## 2. Ground truth-based vs. open-ended evals

[`0:41`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=41) ones are the one that require ground truth where you compare responses to a correct answer. And the second group are open-ended methods which don't rely on ground truth and are useful for monitoring. First, let's talk about traditional predictive machine learning metrics. They do

## 3. Predictive quality metrics

[`0:58`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=58) require ground truth. Often your LLM app solves predictive tasks, like typically a classification task. For example, you might classify user questions into topics, assign tags to support tickets, maybe flag content as spam and so on. In these cases you have literal ground truth for every test example. For example, a specific user query should be tagged as "billing".

[`1:14`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=74) You can then compare your model outputs against this ground truth using standard metrics like accuracy, precision and recall. For example, in content moderation recall could be more relevant because it helps you measure how well the system flags all risky content. Next are generative machine

## 4. Generative quality metrics

[`1:36`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=96) learning metrics. They do require ground truth. They're less useful but still worth a mention. These are metrics like BLEU and ROUGE which were originally designed for tasks like translation and summarization. They work by comparing your generated text to an ideal reference text, like an ideal summary or an ideal translation, and they measure the overlap in words or symbols in a few more complicated ways.

[`1:58`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=118) This can be useful in some scenarios but often overlap in symbols is not very meaningful. The next method is more interesting. Semantic similarity uses pre-trained embedding

## 5. Semantic similarity

[`2:09`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=129) models. These models transform text into vectors that represent their meaning. You can then compare two texts by calculating the distance between the vectors. A common method is cosine similarity. When normalized, it gives a score between 0 and 1. A score of 1 means identical meanings, 0.5 is unrelated and 0 means opposite meanings. That's the idea behind semantic similarity checks.

[`2:34`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=154) It works with or without ground truth. With ground truth, it's great option to compare responses to reference answers without expecting a word-by-word match. Without ground truth, you can use it, for example, as a proxy in evaluating relevance when you compare the answer and the question. They should be at least about the same topic semantically.

[`2:48`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=168) Next is LLM as a judge,

## 6. LLM-as-a-judge

[`2:54`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=174) a method where you use an LLM to evaluate your LLM outputs. This can work with or without ground truth. For example, you might ask the LLM: Is this response polite? Or, does this address the question well? It is especially useful for nuanced or subjective tests. I know it may seem odd to have an LLM judge another LLM but that's a very practical approach.

[`3:10`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=190) We'll explore it in another video. Now, you don't always need an LLM for evaluation. You can also use smaller machine

## 7. ML-based evaluators

[`3:21`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=201) learning models to check for specific things like sentiment, toxicity or emotion. These models are lightweight, don't require ground truth and are often available off-the-shelf. For instance, you can use a sentiment analysis model to flag if response is overly negative. Finally, you can use deterministic methods like regular expressions.

[`3:35`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=215) It might seem old school but

## 8. Regular expressions and text stats

[`3:41`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=221) they are still great for spotting patterns. For example, you can check if there are any banned or forbidden words in the responses or maybe check for phrases like as "an AI language model" or verify that the response contains a link. This approach is fast, simple and easy to control. You can even look at basic text statistics like length or share of special symbols.

[`3:57`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=237) Finally, you

## 9. Functional testing

[`4:02`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=242) can do functional testing. This checks if your LLM output works for its specific task. For example, if your LLM generates SQL queries or Python code, you can actually test if the code is valid and maybe even run it in sandbox. Now, let's connect it to the real-world examples that we discussed

## 10. Connecting evaluation methods and test datasets

[`4:18`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=258) before. For each evaluation dataset you have you will need to have a set of evaluators that match its purpose. If you have a "happy path" dataset with questions and reference answers, you can use semantic similarity, exact matches or LLM as a judge to compare new outputs to your ground truth.

[`4:34`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=274) You can also use simpler checks like making sure that the link is where it's needed or that response isn't too long. Now, let's say you're testing edge cases like questions about competitors where you expect to politely decline the answer. You can evaluate this with an LLM judge, you can use semantic similarity and compare responses to a polite denial template or you can even set up a simple regular expression if you're expecting a specific canned response.

[`5:00`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=300) Now, that was an overview of different methods you can use to evaluate LLMs. In the next video we'll discuss LLM as a judge which is one of the most popular approaches.
