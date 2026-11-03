# 05 — Topic models: the goal and the three simplifying assumptions

## The goal

- Learn **semantic structure from a large text corpus** [`30:21`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=1821).
- Concretely, over 20 years of New York Times articles, automatically discover: what topics exist (politics, sports, science), which documents talk about which topic, and **which words are used when discussing each topic** [`30:21`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=1821), [`31:05`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=1865).
- This is an unsupervised task, so it is specified through a probabilistic model — those models are the **topic models** [`31:32`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=1892), [`31:57`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=1917).

## Why assumptions are unavoidable

Generating a genuine document is hard even for a human, and grammar structure makes it far harder for a program — so no realistic model actually generates documents. Simplifying assumptions must come first [`31:57`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=1917), [`32:36`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=1956), [`33:11`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=1991).

## Prior work that supplied them

| Model | Authors | Reference |
|---|---|---|
| **pLSI** (first model) | Hofmann; concurrently Papadimitriou et al. | [`33:55`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=2035) |
| **Latent Dirichlet Allocation (LDA)** | David Blei, Andrew Ng, Michael Jordan | [`33:55`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=2035) |
| Hundreds to thousands of follow-up papers | — | [`33:55`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=2035) |

## The three assumptions

### 1. Bag of words

- Word **ordering can be discarded**; throw all words of an article into a bag and learn from that [`34:26`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=2066), [`35:03`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=2103).
- Demonstration: a New York Times headline is randomly permuted ("with preparations, hotels, rise, Ebola") and the audience can still tell what the article is about [`35:24`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=2124).
- Payoff: word generation no longer has to respect grammar — words can be generated randomly [`35:58`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=2158).

### 2. A topic is a probability distribution over words

- Definition: knowing a word came from a topic gives a distribution over what that word is [`36:17`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=2177).
- Example: topic *food* emits the word *banana* with ~1% probability [`36:59`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=2219).
- Answering a student: yes, **words are drawn independently conditioned on their topic**. Real words have richer correlations, but this captures the first-order effect and works well in practice [`36:59`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=2219), [`37:20`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=2240).

### 3. A document is a probability distribution over topics

- This lets one document mix topics — e.g. 80% politics, 20% finance [`37:45`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=2265), [`38:19`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=2299).
- **Historical shift**: in pLSI every document had exactly one topic; allowing a distribution over topics was later found to **fit empirical data much better**, which is why the field switched [`38:19`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=2299), [`38:41`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=2321).
