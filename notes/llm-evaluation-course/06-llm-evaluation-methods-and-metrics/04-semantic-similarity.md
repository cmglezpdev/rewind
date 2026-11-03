# Semantic similarity

## How it works

- Uses pre-trained embedding models that transform text into vectors representing meaning; two texts are compared by the distance between their vectors [`2:09`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=129)
- Common measure: **cosine similarity**. When normalized it scores between 0 and 1: **1 = identical meanings, 0.5 = unrelated, 0 = opposite meanings** [`2:09`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=129)

## With or without ground truth

- **With ground truth**: compare responses to reference answers without expecting a word-by-word match [`2:34`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=154)
- **Without ground truth**: use it as a proxy — e.g. evaluate relevance by comparing the answer to the question, which should at least share the same topic semantically [`2:34`](https://www.youtube.com/watch?v=6eOcgYP5D4Q&t=154)
