---
title: "LLM-as-a-judge: evaluating LLMs with LLMs"
description: "Educational explainer on LLM-as-a-judge: using an LLM to evaluate the outputs of another LLM. It explains why the approach is trustworthy despite sounding circular (critiquing is easier than creating; the judge has one narrow job), walks through the main judge types (pairwise comparison, direct scoring, direct..."
url: https://www.youtube.com/watch?v=Qj3u_kzfJVo
image: ./cover.webp
tags:
  - llm-evaluation
  - courses
language: en
channel: Evidently AI
duration: 5:41
---
# LLM-as-a-judge: evaluating LLMs with LLMs

![Video cover](cover.webp)

*Evidently AI · 5:41 · [Watch on YouTube](https://www.youtube.com/watch?v=Qj3u_kzfJVo)*

Educational explainer on LLM-as-a-judge: using an LLM to evaluate the outputs of another LLM. It explains why the approach is trustworthy despite sounding circular (critiquing is easier than creating; the judge has one narrow job), walks through the main judge types (pairwise comparison, direct scoring, direct scoring with reference), reframes the technique as a method that approximates human judgment rather than a metric, and gives a practical workflow for building a judge plus concrete tips for writing evaluation prompts.

## Topics

1. [What is LLM-as-a-judge and why can you trust it?](01-what-is-llm-as-a-judge.md)
2. [Types of LLM judges](02-types-of-llm-judges.md)
3. [LLM-as-a-judge is not a metric](03-not-a-metric.md)
4. [How to create an LLM judge](04-creating-an-llm-judge.md)
5. [Writing effective evaluation prompts](05-writing-effective-evaluation-prompts.md)
6. [Summing up: strengths and limits](06-summing-up.md)

## Key takeaways

- An LLM judge is trustworthy because it never redoes the product's work: it performs one narrow classification task on final text, so it can't be tricked the way the chatbot mid-conversation can [`0:35`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=35) [`1:00`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=60)
- Direct scoring by criteria is the more practical judge type in practice, over pairwise comparison; adding a reference (source or question) turns it into a hallucination or completeness check [`1:36`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=96) [`1:48`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=108)
- LLM-as-a-judge is not a metric like precision or recall — it's a method for approximating your human judgment, so its quality lives entirely in the instructions you give it [`2:09`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=129)
- Build a judge by labelling data manually first, then writing the prompt and iterating until the judge aligns with your labels — the evaluator needs its own evaluation [`2:47`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=167) [`3:02`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=182)
- Prompt rules that measurably help: binary yes/no scoring over vague scales, splitting "good vs bad" into separate criteria with separate evaluators, and asking for step-by-step explanations (Chain-of-Thought) for accuracy and troubleshooting [`3:54`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=234) [`4:17`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=257) [`4:39`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=279)
- Whether LLM judges "work" depends on the use case and how you apply them — they shine for nuanced criteria, live monitoring without ground truth, and scaling expert judgment, but need alignment work even for simple criteria [`5:07`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=307) [`5:21`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=321)
