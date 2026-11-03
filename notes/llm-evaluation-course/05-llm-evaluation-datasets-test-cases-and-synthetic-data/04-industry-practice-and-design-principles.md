# What top companies do and how to design datasets

## Industry practice

- Andrej Karpathy (previously director of AI at Tesla) said he personally spent **a third of his time on evals** at Tesla — and any AI-powered company does this. [`4:47`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=287)
- Google has no shortcut either: improving Google search involves a lot of manual work, including a very long instruction document for human assessors who label whether pages are relevant to search intent. [`4:47`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=287)
- Those human labels are then used to test different improvements to Google's search algorithms. [`5:07`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=307)

## What designing evaluation datasets requires

- It is one of the most important investments you can make for an LLM product, and it requires **product knowledge and critical thinking**. [`5:16`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=316)
- When someone claims "99% accuracy for this prompt", ask **"on which datasets?"** — is it actually representative of the task being solved? Consider designing new test scenarios together. [`5:16`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=316)
- The goal is **not to ace all tests** but to have a system where you can measurably see improvement over time. [`5:31`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=331)
- Without an evaluation system you are basically guessing and hoping for the best. [`5:46`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=346)
- If you have writer's block: **start small — just write 10 cases** (10 expected inputs and outputs) and improve from there. [`5:46`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=346)

Next video in the series: evaluation methods. [`5:46`](https://www.youtube.com/watch?v=Do6KAkutKbc&t=346)
