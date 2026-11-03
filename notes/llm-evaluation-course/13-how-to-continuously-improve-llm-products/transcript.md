# How to continuously improve LLM products?

*Evidently AI · 2:33 · https://www.youtube.com/watch?v=x9mfMkBWwCY*

## 1. Course recap

[`0:02`](https://www.youtube.com/watch?v=x9mfMkBWwCY&t=2) [Music] Hi there! In this final video let's recap everything we learned about LLM evaluations and talk about building a system of continuous improvements for your LLM apps. Throughout the course we talked about two type of evals: first, evaluating LLM models, second, evaluating LLM systems that you built with this.

[`0:18`](https://www.youtube.com/watch?v=x9mfMkBWwCY&t=18) The second part is where we spent most of the time. Some even say evaluations are surprisingly all you need. Why are they so important? Well, they help you move faster, they help you prevent failures and they help you deliver value to the users.

[`0:34`](https://www.youtube.com/watch?v=x9mfMkBWwCY&t=34) Where you want to get in the end is to build a system of measurable continuous improvements to your product. Let's connect the dots. You start with evaluation datasets, you

## 2. An evaluation workflow

[`0:47`](https://www.youtube.com/watch?v=x9mfMkBWwCY&t=47) create test cases that reflect your key scenarios, edge cases and safety risks. These datasets become your foundation. Then, you can iterate. You can test different models, prompts and configurations. You can start with manual evaluations and then scale with automated metrics. And this is an ongoing cycle: you make changes, you run tests and you refine step by step.

[`1:05`](https://www.youtube.com/watch?v=x9mfMkBWwCY&t=65) Once you know your app is well tested, you can deploy it. You can also add guardrails to prevent bad outputs in production. And after deployment, observability is all you need. You must collect real interaction data and run evals over it to be able to see what's going on and catch issues. And if something goes wrong, you can go back to the experimental cycle to test solutions, and after you run regression tests, you can deploy the fixes.

[`1:35`](https://www.youtube.com/watch?v=x9mfMkBWwCY&t=95) Additionally, you should feed the new failure cases back into your evaluation datasets. At the heart of evaluations is the data and it becomes your major asset. You

## 3. Continuous improvement loop

[`1:48`](https://www.youtube.com/watch?v=x9mfMkBWwCY&t=108) have this loop where real user data helps you improve the tests and having solid tests helps you make smart decisions about your product. As an added bonus, you can eventually collect enough labeled data to first, build your own evaluators and maybe replace LLM as a judge with smaller

[`2:04`](https://www.youtube.com/watch?v=x9mfMkBWwCY&t=124) fine-tuned models and two, fine-tune your main LLM to perform even better for your specific use

## 4. Summing up

[`2:10`](https://www.youtube.com/watch?v=x9mfMkBWwCY&t=130) case. Evaluations are more than just metrics it's a core part of your AI product. Yes, you can start small but you have to start somewhere. An AI product without evaluations is the product no one cares about. Thank you for sticking with me throughout the course. I do hope you found it useful and you will apply these ideas for your LLM products. Let me know and happy evaluations!
