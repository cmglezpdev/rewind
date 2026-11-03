# No-code evaluation: upload data and select metrics

## Uploading the example dataset

- A ready-made CSV of health-and-fitness questions and answers is provided for viewers who did not generate data. [`4:36`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=276)
- Steps: **Datasets → create from CSV**, name it (e.g. "Health chatbot", description optional), drop the CSV, and **map the columns** — i.e. point to the columns containing text data. [`4:36`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=276) [`4:56`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=296)
- The dataset holds questions plus answers ("something that you could have generated with your LLM chatbot"); evaluations start from the **evaluation tab** by choosing the dataset. [`4:56`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=296)

## Selecting metrics (Text Evals on the answer column)

Choose **Text Evals**, point at the column to evaluate (the answers), and pick evaluation methods. [`5:37`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=337)

Four descriptors configured in the demo:

| Metric | Type | Purpose |
|---|---|---|
| Denials | LLM-based classifier with a pre-built prompt | Detect when the LLM declines to respond [`5:57`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=357) |
| Semantic similarity | Deterministic (embedding-based) | Compare answers against questions; flags completely irrelevant answers [`5:57`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=357) [`6:21`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=381) |
| Text length | Deterministic | Spot unusually long/short answers [`6:21`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=381) |
| "Denials, regular expression" | `Contains` descriptor (regex/word list) | No-API-key alternative for detecting denials [`6:39`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=399) |

- The regex denial check uses a word list such as "sorry", "cannot", "apologies" (not case sensitive, extensible). [`7:02`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=422)
- After defining the report, choose the API key (for the LLM-judge metrics) and run. [`7:02`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=422)
