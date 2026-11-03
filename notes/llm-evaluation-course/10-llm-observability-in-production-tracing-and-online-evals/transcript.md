# LLM observability in production: tracing and online evals

*Evidently AI · 5:08 · https://www.youtube.com/watch?v=r-CYvjJ-W3k*

## 1. <Untitled Chapter 1>

[`0:02`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=2) [Music] Hi there! In this video we're going to talk about evaluating LLM apps in production. We'll talk about what you can track, what LLM observability is and why testing still matters. Until now we mostly talked about experimental evaluations while you're building your app. But once it is in production, you get real users and real data.

[`0:19`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=19) That's a huge opportunity to learn and improve. And also you need to keep an eye on things to make sure that nothing goes wrong.

## 2. Product metrics

[`0:29`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=29) So what exactly can you track? First are product metrics. For example, how often users engage with your LLM feature or do they come back to use it again. Just be cautious with interpreting this. For example, long chatbot conversations might mean that users are stuck not that they impressed. You can also gather explicit user feedback like upvotes or downvotes.

[`0:47`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=47) And if your app helps write content like emails you can track things like how many edits users make to the draft. You

## 3. Manual labeling

[`0:58`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=58) can also continue to manual review. Logs are your best friend here. By reviewing them you can really understand what's going on and maybe adjust your perception of what's good and bad. You're also very likely to notice new failure modes that you didn't anticipate when you were testing it before production.

[`1:12`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=72) Like maybe your LLM generates responses that are too cheerful but not very helpful. Next, there is software monitoring. This is standard stuff like response time uptime

## 4. Software monitoring

[`1:25`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=85) and errors. It's not unique to LLM but it's critical to keep things running. For example, if the response time is too slow users might leave frustrated. And finally,

## 5. LLM quality monitoring

[`1:35`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=95) there is AI quality monitoring. That's where it gets interesting. You can evaluate live responses for things like helpfulness, safety or maybe track popular topics. Let's make a quick distinction

## 6. Monitoring vs. observability

[`1:46`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=106) here. Observability and monitoring are often used interchangeably, but they're not exactly the same thing. Monitoring is about tracking the metrics that you defined in advance. Observability is more about getting all the data so that you can answer questions about your application, even the ones that you didn't anticipate.

[`2:01`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=121) Think about this way: monitoring is part of observability but observability is what gives you the full picture. When we talk about observability in production, we usually talk about three steps. First is tracing, two is online evaluations and three is alerting. First up is tracing. Tracing helps you capture user data for every interaction.

[`2:19`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=139) You can

## 7. Tracing

[`2:26`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=146) log complete sessions and get full transcripts. For complex systems like RAG or agents it's also useful to see all intermediate steps. For instance, which database entries were retrieved and how long did it take. In traditional software, tracing was almost entirely a technical concept, like tracing server requests to be able to debug them later.

[`2:42`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=162) But with LLM applications you also care a lot about the contents of these traces: the questions that the users ask and the answers that you get. So you actually need to involve product teams as well and you need a user-friendly way to look at these traces.

[`2:57`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=177) If you have personal data you can also apply techniques like masking so that you do not expose potentially sensitive data when you're looking at these traces manually. Once

## 8. Online quality evaluations

[`3:08`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=188) you capture this trace data you can run online evaluations. This is usually happening with a somewhat a delay. For example, you can wait until you have enough traces and then run evaluations over the last hour of data. If you have a lot of users, which is a great problem to have, you can run these evaluations only for the sample of your data, like maybe 10%.

[`3:23`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=203) You can track any quality metric, like if the chatbot is polite, if it gives relevant responses and how often it hallucinates. You can use the same methods that we just talked about: LLM judges, semantic similarity or regular expressions. You can also build a dashboard to show quality metrics and get a full picture of how your app is performing.

[`3:45`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=225) You can also run some evaluators just to flag chats that are worth manual review. For example, you can look for conversations where users express frustration and then you can read through them and understand why. Finally, you can set up alerts or

## 9. Alerts

[`4:01`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=241) reports. For example, you can get alerts if the hallucination rate is above what it's usual for you or maybe you just want to have like a weekly report with the most interesting conversations to read through. As you see new failures or edge cases in production, you can add them to your

## 10. Continuous testing in production

[`4:16`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=256) test datasets. You might wonder - do I still need the test datasets now that I have real production data? And the answer is yes. That's because you will continue making changes to your application, like for example trying out new models, maybe fixing some bugs that you see, and then you will be adjusting your prompts. So in this case you need good old regression testing.

[`4:32`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=272) Which means, after new change you re-run your tests to make sure that nothing broke. And in this case you must continue making your tests better and more representative of your application, so that's why it's important to add more examples to it. So all in all you do need real-time observability into your application after it goes live. For two reasons.

[`4:53`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=293) One is continuous improvement, because you want to spot and solve issues efficiently. And two is peace of mind. You want to make sure that everything is under control and your app is performing smoothly.
