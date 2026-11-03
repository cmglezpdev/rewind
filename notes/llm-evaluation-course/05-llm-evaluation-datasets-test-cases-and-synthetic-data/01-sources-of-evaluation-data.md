# Sources of evaluation data

The video opens by asking where evaluation data actually comes from and lists five practical sources. [`0:18`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=18)

## The five sources

1. **Write test cases yourself** — sit down with your team and come up with expected inputs plus the correct outputs; also useful for testing specific risky scenarios you can anticipate. [`0:18`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=18)
2. **Use available data** — e.g. if you are replacing a chatbot, reuse the real queries users asked before and see how well the LLM handles them. [`0:35`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=35)
3. **Collect data from test users** — safely roll out a first beta, check what people ask, and turn that into evaluation datasets. [`0:56`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=56)
4. **Use publicly available datasets** — for safety testing, existing safety benchmarks can be applicable to your application. [`1:18`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=78)
5. **Use synthetic data** — made-up data created specifically for testing that mimics the inputs your application expects (covered in the next topic). [`1:18`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=78)

## Real company examples

- **Wix** fine-tuned an LLM for their use case and built a custom evaluation dataset from existing customer service live chats and user questions. [`0:35`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=35)
- **Segment** built an LLM-powered audience builder (expressing complex query logic without code) and tested it with examples of queries users had built before. [`0:56`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=56)
