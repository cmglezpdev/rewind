# LLM evaluation datasets: test cases and synthetic data

*Evidently AI · 6:06 · https://www.youtube.com/watch?v=Do6KAkutKbc*

## 1. <Untitled Chapter 1>

[`0:02`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=2) [Music] Hi! Today we're going to talk about evaluation datasets for your LLM application. We'll talk about where to get the data, how you can use synthetic data effectively and also what exactly you can include in these datasets. Every time we talk about evaluations we keep mentioning

## 2. Where do you get evaluation data from?

[`0:18`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=18) data. But which data? And where is it coming from? Sometimes the answer is obvious. You can actually write these test cases yourself: sit down with your team and come up with a few inputs you expect to get and the correct outputs that you want the system to give. That's also useful for testing specific risky scenarios that you can anticipate. Second, sometimes you can use available data.

[`0:35`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=35) For example, if you're replacing a chatbot you might already have existing queries that your users asked before. So you can use them and then see how well the LLM can handle this. For example, Wix shares how they fune-tuned an LLM for their use case. They built a custom evaluation dataset from existing customer service live chats and questions the users asked.

[`0:56`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=56) Similarly, Segment built an LLM-powered audience builder. This helps express complex query logic without code. To test it, they used examples of queries built by the users before. You can also collect data from test users if you can safely roll out the first beta version. You can just check what people are asking and then use this as evaluation datasets.

[`1:18`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=78) You can also use some publicly available datasets, for example, in case of safety testing some available safety benchmarks can as well be applicable for your application. And, finally you can use synthetic data. This is essentially

## 3. Using synthetic data to generate inputs

[`1:35`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=95) made-up data that you create specifically for testing purposes that mimics expected inputs that your application can get. And you can use LLMs here in a few very interesting ways. First, you can generate plausible inputs. You can ask the model to create realistic questions. For example, if you are building a travel assistant you can generate trip planning questions.

[`1:52`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=112) Then you can run this through your app and review outputs to build a good dataset. In some scenarios,

## 4. Using synthetic data for RAG

[`2:01`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=121) you can use synthetic data to generate both inputs and outputs. This is useful for systems like RAG. For example, you can take a source document, have an LLM extract key points and then generate questions for them. Now, these questions will have known answers since they're literally taken from the document.

[`2:17`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=137) So then you will get a labeled ground truth dataset and you can compare your LLM app responses to these ground truth answers. You can also use LLM to help diversify your inputs.

## 5. Using synthetic data to diversify inputs

[`2:29`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=149) For example, if your app can answer questions about weather, like "what's the weather today", you can use it to generate different ways of asking essentially the same thing, like "what's the forecast" or "will it rain today" to make sure that you can correctly process all types of inputs.

[`2:42`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=162) Okay, now that we defined where you can get the data, let's talk about structuring

## 6. Structuring test cases: happy path

[`2:47`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=167) your test cases. Generally I recommend dividing them into three big groups. The first one is the happy path. This is about the usual scenarios like typical queries where you expect your app to perform well. It's very important to try to design this as a representative test set. For example, if half of your queries are about orders and half are about returns, you would structure the data set to reflect this. Then you can test responses both for form and substance.

[`3:09`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=189) Like: are the answers correct compared to your ideal answer? And then: Is the format correct? This can be tone, length or maybe you should always expect to include the link and so on. The second group are edge cases. These

## 7. Structuring test cases: edge cases

[`3:26`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=206) are still plausible inputs but where something can go wrong and they require special handling. For example, if you get incomplete questions: does the app make things up? Or: how does it handle very long or complex queries? What if the user asks about discontinued products? What if they ask about competitors? What if they ask for financial advice or some other sensitive topic?

[`3:48`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=228) What is the question is in different language? We often refer to this part as stress-testing. For each edge case you should define what "good" is. And this is often a product decision. For example, if you get questions in different languages - what should you do? Should you translate them? Should you translate the question and respond in English? Or should you politely decline to answer?

[`4:09`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=249) Your test scenarios should reflect what you expect your application to do in an ideal way. The third

## 8. Structuring test cases: adversarial inputs

[`4:15`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=255) group are adversarial scenarios. That's where you test if your application can handle unsafe inputs or something designed to trip it up. Like: can it generate harmful content? Can it reveal private data? This type of testing is critical for public-facing systems. We'll have a separate video about that. All these test datasets is not something that you perfect on day one.

[`4:30`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=270) That's actually a living system. You should continue adding new examples as you encounter new issues to increase your test coverage. And this grunt work is very important. Here's what Andrej Karpathy,

## 9. What do top companies do

[`4:47`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=287) previously director of AI at Tesla, said about it. At Tesla he himself spent a third of his time on evals. And any AI-powered company does it. You might think that companies like Google have a shortcut, but no. Even in improving Google search there is a lot of manual work. For example, here is a very long instruction on how assessors label if some pages are relevant to the search intent.

[`5:07`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=307) These human labels are then used to test different improvements to the Google search algorithms. Designing evaluation datasets is one of the most important Investments that

## 10. What do you need to design evaluation datasets

[`5:16`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=316) you can make for your LLM product. But also that requires product knowledge and critical thinking. So if someone comes to you and says: "Hey, we have 99% accuracy for this prompt" - you should ask: "On which datasets?". Is it actually representative of the task that you're solving? And maybe you should come up and design new test scenarios together.

[`5:31`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=331) Remember, the goal here is not to ace all your tests. The goal is to have a system where you can measurably see if you're improving over time. Does it sound like a lot of work? Well it kind of is, but it's actually worth it.

[`5:46`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=346) Because without an evaluation system you are basically guessing and hoping for the best. And if after listening to this video you have a bit of a writer's block, remember that you can always start small. Just write 10 cases, 10 expected inputs and expected outputs. You can always improve from there. In the next video, we're going to talk about evaluation methods.
