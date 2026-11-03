# How to evaluate an LLM application

*Evidently AI · 5:59 · https://www.youtube.com/watch?v=RIGU1hy3UR8*

## 1. <Untitled Chapter 1>

[`0:02`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=2) [Music] Hi there! In this video we're finally going to talk about evaluating LLM applications. We'll look at the big picture here and we'll talk about: what quality means for LLM powered apps. Then, we'll discuss the general idea of how you run evaluations and we'll also touch upon a few specific scenarios like regression testing and prompt comparison.

[`0:16`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=16) Usually you talk

## 2. When we need LLM evals

[`0:22`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=22) about evaluations in one of the two cases. First, when you're building your product and you want to make sure that it's good enough. And second, when it's already in production and you want to make sure that it works as expected in the real world. In this video, we're going to focus on the pre-deployment evaluation first.

[`0:34`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=34) Before we go into details,

## 3. Why evaluating LLMs is hard

[`0:39`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=39) let's mention one specific feature of LLMs and LLM-powered apps. They are non-deterministic. That means that even for the exact same input you can actually get different outputs. That's what makes them creative and helps them generate new things. But also that helps generate some problems. For example, if you are building a customer support chatbot you probably don't want it to invent answers. You want them to be grounded.

[`1:00`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=60) This is also what makes testing really tricky because it's not about checking that the system works. It is about checking that the range of possible outputs is within your expectations. And LLM testing usually comes down to one of the two

## 4. What is LLM product quality

[`1:16`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=76) things. First, capabilities. Second, risks. First, you want to make sure that the app is doing what it's supposed to and the responses are accurate, useful, helpful. Of course, the definition of good will depend on on the use case. And second, you want to make sure that the outputs are safe and the system doesn't generate anything harmful. So how do you go about these evaluations?

[`1:34`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=94) Let's

## 5. Vibe checks

[`1:40`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=100) take a look at the process. You'll probably first start with evaluating things when you create your first application version. And what you're going to do, most likely, is just going to test it out, take a look at the outputs and decide if you like them or not. That's what community calls vibe checks. But obviously that's not very systematic.

[`1:54`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=114) So as the next step, you can probably

## 6. Manual labeling

[`1:59`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=119) set up a more formal process of reviewing this which is called labeling or annotation, where you yourself or maybe someone else on your team will do the grading, look at the responses and systematically decide if they're good or bad. Ideally, you should also add annotations to explain your decision because later it will help you to design better metrics.

[`2:14`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=134) But of course, it will not really scale well, because you probably don't have all the time in the world to grade all the responses every time. So you need to set up some automated way of labelling the responses.

## 7. Automated evaluations

[`2:30`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=150) That's how we usually go about it. First, you must create a test dataset. This is a collection of sample inputs. You also need expected correct outputs called ground truth. For example, if you're building a customer support system your dataset might include customer queries and their ideal answers. It's like a benchmark but for your use case.

[`2:47`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=167) You can build this through your manual labelling process or design it separately. Then, you set up a way to score your system responses against these correct answers. Sometimes you can look for exact matches between your ground truth and the responses you get. But often there are many ways to express meaning without word-by-word accuracy, so there are ways to test for semantic similarity here.

[`3:08`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=188) You can also run open-ended evaluation where use score responses by some criteria like conciseness or politeness. Some qualities are objective and easy to measure like if the output is within the right length but things like tone of response are very subjective and hard to quantify. You can use some interesting methods here like using LLM to score this. We'll talk more about it.

[`3:31`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=211) In the end what you want to get is to design your own evaluation system. This will consist from datasets and the ways how you score your new data against these datasets. And once you have the system in place you can, first,

## 8. Experimental comparisons

[`3:48`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=228) run experiments. For example, you can quickly try different prompts or their parameters, test them on your datasets and see if things get better or worse. This will let you objectively decide, for example, which model you should choose or which prompt works better. As you progress, you

## 9. Stress-testing and red-teaming

[`4:04`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=244) might want to add more niche test scenarios. Here we often talk about red-teaming or stress-testing because you want to check if the model is correctly handling unexpected, inappropriate or risky inputs. There's also regression testing. The goal is to make sure that fixing one thing doesn't

## 10. Regression testing

[`4:21`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=261) break something else. LLMs can be surprisingly brittle. Small tweaks to a prompt can have unexpected side effects. So after you change anything you want to make sure that responses stay the same for other scenarios. You can even take your production data, for example, from the past week and compare what would have changed if you used a different prompt.

[`4:36`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=276) This automation does

## 11. Examples from Asana, Webflow, GitLab

[`4:42`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=282) not discount human review. In fact, probably you should be doing both alongside each other. For example, Asana shares how they build and test AI features. They have automated unit tests but also their product manager does end-to-end manual review. Similarly at Webflow they rely on automated scores for day-to-day validation and also do a weekly manual scoring to validate all the big changes. Another example is Gitlab. They have Duo which is a suite of AI-powered features.

[`5:10`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=310) To validate them they designed a framework with thousands of prompts and ground truth answers. They test against it daily. They also have a smaller version for quick iterations. And after that, they manually examine the results to find patterns and decide what to focus on next. I

## 12. LLM evals are product-specific

[`5:25`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=325) want to stress that each such framework is very product-specific. You want to know your user, understand the risk that you're protecting against and have a very good idea of what good is in your use case. That's why it should be done together with the domain experts. Of course evaluations are partially a technical problem: how do you set them up, how do you run them through your app. But also the contents of evaluations matter.

[`5:43`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=343) That's why it should be done by the complete team. In the following videos we'll talk about both sides of the equation. First, how you design the datasets. And second, which exact methods you use to validate and evaluate them.
