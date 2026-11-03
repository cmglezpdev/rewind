# LLM safety and red-teaming

*Evidently AI · 5:11 · https://www.youtube.com/watch?v=XZZ6glt0AMA*

## 1. <Untitled Chapter 1>

[`0:01`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=1) [Music] Hi there! In this video we're going to talk about LLM safety. We'll discuss what can go wrong with LLM apps, how you can protect them and how you can test for safety. Quality and risks go hand in hand. For example, if the chatbot gives incorrect response, of course, this means bad user experience. But also this can open you up to liabilities or to a PR disaster.

[`0:24`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=24) And beyond innocent mistakes there are also bad actors who can try to break your system. Let's

## 2. Off-topic use

[`0:30`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=30) take a look at a few specific examples what can go wrong. The first one is off-topic use. LLMs were made to follow instructions. If you don't design your app carefully, people can make it do things it wasn't built for. For example, here a user asked the Klarna a chatbot meant for customer support to help with Python coding. And it did!

[`0:48`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=48) While this example is not very harmful by itself, it shows how your app can be hijacked for tasks that waste resources and confuse users. Next are

## 3. LLM hallucinations

[`1:01`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=61) hallucinations. Hallucinations are when your app gives misleading or incorrect information. In a way, this is not a bug but a feature, because everything LLM does is made up. You should not use them for factual information without any kind of fact-checking. This is why in business context we usually ground them into specific information source when they give out their responses.

[`1:18`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=78) However there are few very real examples when things can go wrong with hallucinations. Here Air Canada chatbot gave incorrect refund advice that went against company policy. A court ruled that they had to compensate the customer. Here a New York City business chatbot told users to break local laws, exposing lack of safeguards for factual accuracy. Another example is jailbreaking.

[`1:40`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=100) This

## 4. LLM jailbreaks

[`1:48`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=108) happens when the users intentionally try to trick LLM into doing something it should not. This can lead to biased, offensive dangerous or harmful outputs. Here are a few examples. Chevrolet chatbot sold the car for $1 after a user manipulated it to agree with every request. A DPD chatbot swore at the customer and wrote poems mocking the company after being prompted to do. So this went quite viral on social media. Another example to mention are data leaks.

[`2:11`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=131) This

## 5. Data leaks

[`2:18`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=138) can happen in a few different ways. For example, if your AI system has access to some database with sensitive information it can leak it into the responses. Or if you fine-tune your model on data that contains private information this can again appear in what it generates later. This is not a very complete list.

[`2:34`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=154) If you are interested in the topic, I encourage you to check the OWASP list with the top-10 LLM vulnerabilities. Now, let's talk about what you can do to protect your LLM app. It all starts with risk assessment. First, you need to figure out what exactly you're

## 6. Risk assessment

[`2:49`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=169) exposed to. And this will be different for, for example, application that is only used internally or a chatbot that anyone can interact with. Once you know the risk, you can start to build protections around it. The first line of defence is product design. You want to create a system

## 7. Product design choices

[`3:05`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=185) that reduces risk from the start. For example, to avoid hallucinations you implement RAG. You can give the LLM the source of information it can trust and maybe require to always quote it. To prevent off-topic use you can add a classifier in front of your app to decide if a query should even reach the LLM.

[`3:21`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=201) So for example, if someone asks something completely unrelated, it will say that it cannot answer it. To prevent data leakage and unauthorized actions you can constrain the model access. Just don't give it access to sensitive data. If an AI agent can take a risky action in theory, you might want to add a human in the loop approval for it.

[`3:37`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=217) To prevent personal data leaking into the model during fine-tuning, well, you can sanitize your training data carefully. Another way

## 8. Guardrails

[`3:49`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=229) to protect yourself is to add guardrails. These are real-time checks that verify what goes in and comes out of the app. On the input side, you screen the user queries. Say, if someone submits a query with sensitive information, the system can block it. On the output side, you can screen model responses.

[`4:05`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=245) For instance, you might check if the output resembles financial advice and block it too. While guardrails are a great idea they're not perfect. For once, they slow down the responses so you just cannot run them for everything that you can imagine. And

## 9. Safety testing and red-teaming

[`4:21`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=261) lastly, the third line of defence is testing. Whichever safety protections you implement, you must test if they work or not. This means means testing your entire application together with the guardrails, with any classifiers, with any additional steps or data access that it has. In this case, we often talk about red-teaming.

[`4:38`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=278) Red-teaming is where you try to break the system by acting as a malicious user to make sure that it responds as expected. You can create a dataset of tricky adversarial prompts. They are designed to manipulate LLM into generating something it shouldn't. And then you check if your app consistently denies them.

[`4:55`](https://www.youtube.com/watch?v=XZZ6glt0AMA&t=295) Safety is also an ongoing process. New types of attacks are always popping up. So you should always keep re-testing your app if it stays in production to make sure that it can withstand against the new risks.
