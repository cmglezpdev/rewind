# AI agent and RAG evaluation

*Evidently AI · 6:04 · https://www.youtube.com/watch?v=6EtqsMcEhaw*

## 1. <Untitled Chapter 1>

[`0:01`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=1) [Music] Hi there! Today we're going to talk about a big topic: how to evaluate complex AI systems. Until now we mostly talked about a system that look like "an input" and "an output". For example, summarization or simple question-answering system. But many AI applications are much more complex than that. For example, you have agents, you have chatbots. So how can you evaluate that?

[`0:17`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=17) In today's video we're going to cover a few general principles that you can use when you're dealing with more complex systems. First, let's get a reminder of what we mean. A RAG system is a

## 2. What is RAG?

[`0:34`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=34) system that first queries the source that you gave it to find relevant data and then generates the response based on it. This could be a component of a chatbot or an agent or a standalone tool like a smart search bar. Chatbots are, well, chatbots. The evaluation complexity comes from the fact

## 3. What are chatbots?

[`0:51`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=51) that they hold complete conversations with the user so you must evaluate the chat not just a single input and output. Then, AI agents. There is some discussion on how to define an agent but

## 4. What are AI agents?

[`1:01`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=61) usually they have the following three traits. First, they have a planning step, like they decide how to solve a task and choose the right next step in the process. Two, they can use tools like interact with external APIs, internet search or some databases. And three, they have a memory to keep track of the complex task or conversation context.

[`1:18`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=78) Imagine an e-commerce support agent that you can contact to make a return of your product. It will ask you for all the order details, it can verify eligibility by checking against the company policies, then it can check if your return is still within the window, then it can process the payment to make the refund and so on, all while maintaining the course of conversation. That's an example of an agent.

[`1:41`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=101) So how can you

## 5. Testing RAG quality

[`1:46`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=106) evaluate complex systems like this? The first idea is to break it down into smaller testable components. It's just the same as before. You are building evaluators, you're building test cases. You're just evaluating not the complete thing but only part of it. For example, in RAG system there are two main components. The first one is retrieval.

[`2:04`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=124) That's where you check that it can find the relevant documents that answer the question. You can treat this as a ranking problem. You ask questions and you check if it finds the document you know it should find. The second part is generation. That's where it formulates the answer based on the retrieved information.

[`2:22`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=142) To test it, you can run different questions and check answer correctness, relevance and hallucinations. You can also design RAG specific edge cases. For example, if no document is retrieved - does your system correctly deny response or does it invent it? Or maybe what if the context is contradictory - how does your LLM resolve this?

[`2:44`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=164) And of course you can check for usual things like - does it always quote a link? Does it always give you the response within a certain length? And so on. When you're

## 6. Testing AI agents: split into testable components

[`2:54`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=174) dealing with AI agents you can also break it down into smaller testable components like this. Let's let's take a look at a few examples. First is testing the correct tool choice. You can check if the agent chooses the right tool for the task. For example, if you ask about the weather, it should use the weather API.

[`3:11`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=191) You can design different scenarios for requests with known correct tools to choose and then check that the LLM does it. Next are data unit tests. You can also write tests that check that the LLM correctly extracts detail from the user input and returns the right information. Like if you ask for departure time for a specific flight number, the LLM should return a known specific answer after querying the right API. Next is intent classification.

[`3:34`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=214) Often the LLM is tasked to first classify the user request and then route the conversation to a specific step. This is purely a classification problem. So you can simulate a lot of inputs with known classification types and then test how well the LLM defines them. Another example is testing first response quality. Even though agents may hold long chats it is often still worth testing in a simple input-output manner.

[`4:04`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=244) So you can go through the question bank and then check against some ground truth responses. You can also test for single steps in scenarios. For longer chats, you can design tests that check if an agent makes a correct choice in a set scenario after having a previous history of conversation.

[`4:21`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=261) You can provide this conversation history and then test that the next action or response is correct. The second idea is to test just the final outcome so you can treat your

## 7. Testing AI agents: test outputs

[`4:32`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=272) AI agent as a blackbox and then see if the final result is what you expect. Like if the user asked to make a certain booking - did the agent complete it in the end? Separately, you can test that the agent trajectory was correct. You may know the expected set of steps to make a booking.

[`4:44`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=284) The agent may need to call a list of tools, to check APIs in certain order. And then you can test that this sequence was actually followed. The third idea is to test the complete interaction. Of course,

## 8. Testing AI agents: scenario testing

[`5:00`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=300) this is something that you can do manually. Just like go interact with your agent and replay certain scenarios. But you can also do this programmatically. You can implement an agent that plays the role of a user. Let's say you want to simulate a user booking a hotel room with certain requirements then changing these requirements halfway through.

[`5:15`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=315) Your goal is to test that your agent adjusts correctly to the change and reacts only to the latest part of the request. Evaluating

## 9. Online evaluations for complex systems

[`5:24`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=324) the complete interaction is what you'll do in the online evaluations, too. Here you can use the usual LLM as a judge approach, but you will apply it on the conversation level. For example, you can pass the complete conversation transcript and ask - did the user express frustration at any point? Did the agent communicate politely? Was the user task resolved by the end?

[`5:40`](https://www.youtube.com/watch?v=6EtqsMcEhaw&t=340) You can also, of course, track harder metrics like function call usage. All in all, evals and monitoring for complex systems follow the same principles. You design your test cases, you pick your metrics, you run your online evaluations. It's just on a bigger scale with more complex checks.
