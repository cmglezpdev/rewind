# LLM-as-a-judge: evaluating LLMs with LLMs

*Evidently AI · 5:41 · https://www.youtube.com/watch?v=Qj3u_kzfJVo*

## 1. <Untitled Chapter 1>

[`0:02`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=2) [Music] Hi! In this video, we'll discuss a powerful but slightly controversial evaluation method - LLM as a judge. We will discuss what LLM as a judge is and why it works, different types of judges and how you can create one for yourself. LLM as a judge is exactly what it sounds like.

## 2. What is LLM-as-a-judge? How can you trust it?

[`0:18`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=18) You're using LLM to evaluate LLM outputs. Like you can ask: Is this text polite? or Is this text concise? and get a response. It's great both for experimentation and for live monitoring. I know that it sounds a little bit odd at first. Like, isn't it like cheating? How can you trust an LLM to evaluate its own outputs? The thing is, we are not asking LLM to redo its work.

[`0:35`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=35) Instead we asking the LLM evaluator to do something very specific: to classify or evaluate text by some criteria. And you know, it's much easier to critique than create. It's much easier to spot errors than to avoid them in the first place, even for LLMs. Your main LLM product like a chatbot has a lot to do.

[`1:00`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=60) It handles user inputs, keeps memory, uses tools and follows complex instructions. The evaluator has one simpler job. For example, you can ask: Is this response respectful? While the chatbot might get tricked by a malicious user, the evaluator just looks at the final text and can judge it by its merits. There are a few ways to use LLM as a judge.

## 3. Pairwise evaluations

[`1:23`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=83) First is pairwise comparison. If you're testing prompts you can show the LLM two outputs and ask: Which response is better? This can work but this does require some tuning. Next is direct scoring

## 4. Direct scoring

[`1:36`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=96) by criteria. I believe that's the more practical approach. You pass a text to an LLM and ask it to evaluate specific qualities like: Is this response concise? or Is it offensive or biased? You can add

## 5. Direct scoring with reference

[`1:48`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=108) more information to the evaluation prompt as well. For example, you can pass the chatbot response and the source it was based on. Then you can ask: Does this response contradict the source? to check for possible hallucinations. You can also pass a question and its answer and ask to evaluate completeness like: Does this response fully address the question?

[`2:03`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=123) This brings us to an

## 6. LLM-as-a-judge is not a metric

[`2:09`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=129) important point. LLM-as-a-judge is not a metric in a sense that precision or recall is. It's an evaluation method that helps you approximate your human judgment. It's like having an intern whom you can ask can you grade the responses following certain instruction. And you must actually give this instruction.

[`2:26`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=146) For example, you would maybe show some examples and say "hey, this is a good response" and "this is a bad response - and that's why". And that's how exactly it works for an LLM. And you must create a very good evaluation prompt to instruct it to do the labelling in a way that works for you. So how do you create an LLM judge?

[`2:40`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=160) First, you start by being the judge yourself and

## 7. How do you create an LLM judge

[`2:47`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=167) doing some manual labelling. For example, you may want to evaluate the correctness of a new response compared to a reference answer. As you start labelling the data yourself, you'll notice that there are nuances. Like, how big of a difference counts? Do you look at every detail or just the overall idea?

[`3:02`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=182) What if the LLM adds an extra greeting - does this make the answer incorrect or not? After you do this exercise manually you can write the evaluation prompt, run it and see how well the judge aligns with your labels. You'll likely need to iterate a bit to get it right. And yes, it's a bit meta: your LLM evaluator needs its own evaluation.

[`3:18`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=198) Of course, you can skip the labelling, just write the best prompt you can and then look at the results and maybe correct them. But I personally find that doing the labelling first is very helpful because it helps you clarify your own criteria so you'll just end up writing better prompts. Now,

## 8. Writing effective evaluation prompts

[`3:39`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=219) let's talk a bit about writing prompts. And here's the first rule. You should do this. You should write your own prompts. At the very least, you should read the prompts if you're using external tools. Because the evaluation context is inside the prompt, it's not in the name of the metric. There are a few tips on how you can write better prompts yourself. Let's cover them now.

[`3:54`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=234) First, use binary scoring. Try to stick to simple yes or no questions like "is this response professional?" Complex scales will only work if you can clearly define what each score means. If you can't score professionalism on a scale of 1 to 10, the LLM won't either. Next, split complex criteria. Don't just ask an LLM to classify responses into "good" and "bad".

[`4:17`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=257) Chances are, your definition of "good" means multiple things, like: Is the response complete? Is it factually correct? Does it sound professional? That's three separate criteria. You can have three evaluators. You will get better results this way. Third, ask for explanations. This is known as the Chain-of-Thought approach.

[`4:39`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=279) The simplest way is to ask the LLM to think step by step before giving the answer. This helps improve accuracy and it's also super useful for troubleshooting. Like it can point you to a specific contradiction that the LLM picked up. There are more advanced methods like complex reasoning chains or maybe using a jury of models to come up with a single decision.

[`4:56`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=296) But you should always start with simple things first. And if they work, just stick with them. To wrap it up,

## 9. Summing up

[`5:07`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=307) LLM as a judge is a powerful method. It's great because it works for nuanced criteria and for live monitoring when you don't have a ground truth reference answer, and also allows you to scale the expertise of your domain experts. Which is amazing. At the same time, it is not magic. It might not work for very complex criteria.

[`5:21`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=321) And even for simpler criteria you might need some work to get it done to make sure it aligns with your expectations. So saying LLM judges work or don't work is like saying machine learning works or doesn't work. It all depends on the use case and how exactly you apply it. So think it through well.
