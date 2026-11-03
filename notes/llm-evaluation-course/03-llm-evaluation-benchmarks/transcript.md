# LLM evaluation benchmarks

*Evidently AI · 3:06 · https://www.youtube.com/watch?v=32zkohJICgc*

## 1. <Untitled Chapter 1>

[`0:02`](https://www.youtube.com/watch?v=32zkohJICgc&t=2) [Music] Hi! In this video we're going to talk about LLM evaluation benchmarks: what they are, when you need them and how different from evaluating LLM-powered apps. As we've established,

## 2. What are LLM evaluation benchmarks?

[`0:14`](https://www.youtube.com/watch?v=32zkohJICgc&t=14) LLMs are models and LLM applications are what you build using these models. And evaluating them are not the same thing. Let's first talk about evaluating LLMs. New models come out all the time. How do you know new model is better than the previous and by which dimension? Of course, you can test them out on your own but that's probably not very systematic or fair.

[`0:31`](https://www.youtube.com/watch?v=32zkohJICgc&t=31) What community does is - we create benchmarks. Benchmarks are standardized tests for LLMs, kind of like school exams. In this case, you have known answers to a set of questions so you can actually compare how well the LLMs perform on each benchmark. Of course, there are also more fancy grading methods. There are ranking systems like Open LLM leaderboard which compare different models.

[`0:53`](https://www.youtube.com/watch?v=32zkohJICgc&t=53) Each

## 3. Examples of LLM benchmarks

[`1:00`](https://www.youtube.com/watch?v=32zkohJICgc&t=60) benchmark usually tests specific capabilities. For example, MMLU tests general knowledge on subjects like history and law. Hellaswag tests common sense reasoning. There are tons of mathematical benchmarks where they ask LLMs to solve mathematical problems. There are also code benchmarks where, well, you ask the model to write code or answer coding tasks. MT bench is an interesting one: it tests how LLMs handle multi-turn conversations.

[`1:25`](https://www.youtube.com/watch?v=32zkohJICgc&t=85) There are also risk and safety benchmarks. For example, here is the model card for Open AI O-1 model. Among other things, they share how the model performs on StrongReject which is a benchmark that tests model resistance against common attacks. Well, there are a lot of benchmarks and for a reason. First of all,

## 4. Why so many benchmarks?

[`1:51`](https://www.youtube.com/watch?v=32zkohJICgc&t=111) there are a lot of skills that you can evaluate. Second, some benchmarks can become outdated as new models are released, so you need to come up with new more complex ones. And lastly, there is always a risk that models can inadvertently memorize some of the benchmarks during their training process, so we always need new ones.

[`2:07`](https://www.youtube.com/watch?v=32zkohJICgc&t=127) But here's a thing: benchmarks don't necessarily test what you care

## 5. LLM benchmarks vs. LLM product evals

[`2:13`](https://www.youtube.com/watch?v=32zkohJICgc&t=133) about when you're building an LLM-powered product. For example, if you're creating a customer support chatbot you don't really care if your model can code and how well it does it. The difference between evaluating an LLM-powered product and LLM is that with a product you're evaluating the complete system.

[`2:28`](https://www.youtube.com/watch?v=32zkohJICgc&t=148) That means, it includes, well, the model but also the prompts you write, the business logic around them and external components like databases that they might utilize. And also you do this not on some standard test, but you do this on data that is representative of your use case. Benchmarks can still be useful.

[`2:45`](https://www.youtube.com/watch?v=32zkohJICgc&t=165) First, when you're choosing which models to try when you're building your products. And second, some of the benchmark data, for example, safety benchmark data can be useful to test your own product. But generally you want to design more specific tests for your application. That's what we're going to talk about next.
