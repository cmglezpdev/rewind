# How to run LLM evals with no code | PRACTICE

*Evidently AI · 12:27 · https://www.youtube.com/watch?v=gKp9K7Etv4A*

## 1. Introduction

[`0:02`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=2) Hi and welcome to the practical video! Today we're going to show how you can run LLM evaluations with no code. Here's what we're going to do. We will generate synthetic data. We will run evaluations using deterministic methods. And then we will create a custom LLM-as-a-judge. To follow along, you will need an Evidently Cloud account. It is free to sign up.

[`0:21`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=21) Optionally, you will also need an open AI API key. It will be required to generate synthetic data or to run LLM as a judge. If you don't have a key, don't worry. You can still run evaluations that don't require it. Let's start with a quick intro about us. At Evidently AI we build tools for AI observability.

[`0:38`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=38) They help you evaluate, test and monitor AI systems. We support both traditional machine learning models and systems built with LLMs. Our roots are in open source. We created Evidently, which is a Python library with over 25 million downloads. It helps you run tests and evaluations for all kinds of AI systems. Evidently Cloud is a platform build on top of it.

[`1:02`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=62) You can use it to run AI quality workflows from pre-production experiments to production monitoring. It is also built for collaboration. Developers can use the Python API and non-technical users can work through the user interface. You can see how your app performs and run evaluations with no code. That's what we're going to do now. The first step is to sign up for Evidently Cloud.

[`1:24`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=84) Once you you are in, you

## 2. Example starts

[`1:30`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=90) will need to create a project. Click here and give a name and description to your project. I already have a project here so I'm just going to open it up. It will be empty at first. The next thing you

[`1:42`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=102) should do if you plan to use LLM as a judge is to go here to the "Secrets" and save your open AI API key. I already have one so I'm just going to use the key I already stored. Now let's generate some

## 3. Generating synthetic data: inputs

[`1:56`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=116) data. Go to the "Datasets" and click on "Generate dataset". You can choose between two options. We are going to try both. Let's start with a simpler one that says "Examples". What happens here is you can just generate a set of plausible inputs by describing your task scenario. For example let's say that we are dealing with a health and fitness chatbot.

[`2:15`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=135) You can add a description of your task here. An example input could be something like "How much water should I drink daily?" and let's say you want to generate 10 more questions like this. And also let's save the name of the dataset like QA. Clicking "next": you will need to choose the API key.

[`2:36`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=156) And now you can generate the dataset. Here it is. So let's take a look. If you open it up you can now see that there are more similar questions like "how often should I work out?", "how do I create a balanced meal plan?" and so on which are realistic inputs that can be asked if you you are building an app like this. You can edit and diversify these inputs further. Remember, this are just the inputs.

[`3:06`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=186) You'd use them for example to run through your LLM system to get responses. Now let's try the

## 4. Generating synthetic data for RAG: inputs and outputs

[`3:13`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=193) second option. We're going to go back to the Datasets and click on "Generate dataset" again and choose the "Knowledge base" option. Here, we generate both the inputs and the outputs from the source document to get the ground truth dataset. You can take a PDF, a CSV or a markdown file as a source. I suggest you try something short to make the generation quick.

[`3:30`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=210) As an example, I have here a PDF with the European AI Act that I will use as a source. You can simply drop this document here and give it a name and let's say I want to generate 10 questions to this document. Here we got the final result, so let's open it up.

[`4:09`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=249) On the background, the platform processed the document, extracted the context and generated questions to it. Since the answers come directly from the trusted source we can expect them to be reliable. You can of course manually review or tweak them if needed. Later you can take just the question part, pass it through your system to generate answers and compare those answers to the ground truth.

## 5. No-code LLM evaluation: upload example data

[`4:36`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=276) Now let's talk about evaluations. If you did not generate any data, I prepared a simple example for you which is a CSV dataset with questions and answers about health and fitness. You can simply download it and then work with it later. Let's go back to the dataset step and now create a new dataset from CSV. We need to give it a name so it will be for example "Health chatbot".

[`4:56`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=296) The description is optional. And then we can drop this CSV that we have. We will also need to map the columns which simply means that we need to point to the columns that contain text data. Here it is. So now the dataset is uploaded and saved on the Evidently platform. You can see that now we have both questions and answers to the question, something that you could have generated with your LLM chatbot. To run an evaluation, let's go to this evaluation tab. You can choose the dataset.

## 6. No-code LLM evaluation: select metrics

[`5:37`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=337) This is the dataset that we just uploaded. And now we need to confirm and run the evaluations. Here you will need to choose the Text Evals and now we can point to the column that we want to evaluate. Let's look at the answers that we get. You can choose from different evaluation methods. Let's do something simple at first.

[`5:57`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=357) For example, we might want to check if there are any Denials meaning if the LLM declines to response. This is an LLM-based classifier with a pre-built evaluation prompt. Let's choose this one. Also let's look at the semantic similarity. We can compare our answers against the question and measure the semantic similarity between them.

[`6:21`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=381) This can be useful for example to detect the answers which are completely irrelevant and are not semantically related to the question. Then let's also look to the text length. If you do not have an open AI key to run LLM as a judge, we can do something simpler to detect denials in text.

[`6:39`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=399) We can use regular expressions and, for example, define if there are certain words which are representative of a denial. To do this we can choose this "Contains" descriptor. Let's give it a name "Denials, regular expression". What we need to add here is is a list of words or expressions that might be representative of a denial.

[`7:02`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=422) For example, this can be something like "sorry", "cannot" and "apologies". This is not a complete list and obviously you can add many more examples like this. It doesn't have to be case sensitive. So here we are. We defined our report, we choose our key to use LLM-as-a-judge evaluations, and now we can run it.

## 7. No-code LLM evaluation: review results

[`7:37`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=457) And here is the result we get. At first you will see a report which summarizes all the evaluations that we had. So the "Decline" evaluation was the LLM-judged denial. We can see that we have one decline. If we look at semantic similarity we can see that all of the values are above 0.78 which means that none of them is completely irrelevant or unrelated. This is good.

[`7:59`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=479) Then if we look at the text length we can actually notice that we have one answer which is unusually long. Might be interesting to check out. And our regular expression based denial also noted one denial, so let's check it out. And below you can see the dataset with the scores that were added.

[`8:18`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=498) You can actually hide the report if you're no longer interested in looking at it. So now let's take a look at what we got. First, we can find the one denial that we got using the LLM as a judge approach. And we can see that this is, well, an actual denial.

[`8:34`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=514) And the LLM declined to respond because the question was related to medication. Probably, that is a good one, right? We don't want to give medical advice here. And this is the explanation of the denial that was given by the LLM judge. Finally, we can find the response that was too long.

[`8:53`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=533) We can see what happened here is that for some reason we actually got the response that was unusually long and almost looks like it was copied from some document. Might be something worth checking out. Interestingly, if we look at our regex-based denial - we can find the one that was "True" - it actually detected correctly the same denial that LLM-as-a-judge did because it actually had the word that we defined as representative of denial.

[`9:21`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=561) In this case it says I "cannot"provide specific answer. But of course this regular expression-based evaluation will not generalize as well as LLM judge. Now, as I look at these responses I noticed that

## 8. No-code LLM evaluation: create a custom LLM judge

[`9:38`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=578) they actually have different tone. Some of them are more formal some of them are less formal. Let's try to see if we can detect difference in tone using LLM as a judge. Let's go back to our evaluation. Now we will run a single evaluation using LLM as a judge that we will create for this specific reason.

[`9:55`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=595) Again, we're going to choose the same dataset that we are working with, confirm the column mapping and choose the text evaluation flow on the answers that we get. But now what we're going to pick is the "Custom LLM classifier". You can see here examples of the other checks that are already implemented when you're using a pre-built template.

[`10:17`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=617) But now we're going to do a custom one. So let's choose "None". Let's say that we will call this "Tone"and now we need to explain what exactly we want to classify. Here I came up with a very naive prompt which basically explains that we want to classify the responses into "Conversational" and "Formal".

[`10:43`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=643) The conversational response is something that is friendly and uses casual language and formal is a structured objective response that only focuses on conveying the information. So I should also specify the names of my categories. So this will be "Conversational" and "Formal". You can see that I didn't write the complete prompt. Actually this happens automatically.

[`11:01`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=661) The full prompt is being generated asking for things like explanation and how to structure the response. Now I saved my LLM judge, I'm choosing the key. And let's now run the evaluation.

## 9. Review LLM judge evaluation results

[`11:25`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=685) Here it is. So as we can see the responses are being split almost half half. Seven of them are labeled as formal, six are labeled as conversational. Now we can look at the specific decisions that were made by the LLM judge. We can see that it actually picks up pretty well.

[`11:45`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=705) For example, here it picks up that it uses phrases like "hey" and "snaky" which is kind of conversational or "totally get it", "mix things up" and so on. If we scroll down we can see more formal responses. And we can see that, well, they are truly formal, they are more to the point and the llm judge picks this up and explains that the text is structured, professional and so on.

[`12:08`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=728) Now, as a reminder it's best to first do your own labelling so that you can compare your evals against them. What we are doing is just a quick illustration. I hope it gave you some idea on how you can run evaluations for your AI outputs. And if you have any questions please do reach out. Thanks for watching!
