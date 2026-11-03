# Creating a custom LLM judge and reviewing its results

## Motivation

- While reviewing responses, the presenter notices they differ in **tone** — some formal, some less formal — and decides to detect that difference with a purpose-built LLM judge. [`9:38`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=578)

## Building the judge

1. Start a new single evaluation on the same dataset: confirm column mapping, choose the text evaluation flow on the answers. [`9:55`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=595)
2. Pick **"Custom LLM classifier"** (pre-built templates for other checks are shown alongside); choose "None" as the template. [`9:55`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=595) [`10:17`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=617)
3. Name it **"Tone"** and write a naive classification prompt with two categories: [`10:17`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=617)
   - **Conversational** — friendly, casual language.
   - **Formal** — structured, objective, focused only on conveying information. [`10:43`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=643)
4. You do not write the complete prompt: the platform **auto-generates the full prompt**, adding things like asking for an explanation and how to structure the response. [`10:43`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=643) [`11:01`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=661)
5. Save the judge, choose the API key, and run. [`11:01`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=661)

## Results

- The 13 responses split almost half/half: **7 labeled Formal, 6 labeled Conversational**. [`11:25`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=685)
- The judge's per-row decisions hold up well:
  - Conversational labels cite phrases like "hey", "totally get it", "mix things up". [`11:45`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=705)
  - Formal labels come with explanations that the text is structured, professional, and to the point. [`11:45`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=705)

## Closing advice

- Best practice: **do your own labelling first** so you can compare your evals against it — the demo is only a quick illustration. [`12:08`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=728)
