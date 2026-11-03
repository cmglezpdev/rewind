# 01 — Supervised vs. unsupervised learning

Guest lecturer Rong Ge (postdoc at Microsoft Research, standing in for Jelani Nelson) frames the lecture as an exercise in applying **theoretical-CS algorithm design to machine learning problems** [`0:00`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=0), [`0:36`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=36).

## Supervised learning

- Input: data points **and** labels; output: a function predicting the label of a new point [`2:12`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=132), [`2:36`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=156).
- Canonical example: a spam filter trained on many emails labelled spam / not-spam [`1:48`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=108).
- Studied for decades under the name **computational learning theory**; explicitly out of scope for this lecture [`2:36`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=156), [`2:54`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=174).

## Unsupervised learning (the lecture's setting)

- Motivation: labels are expensive — a human has to label every document or email [`3:23`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=203).
- Input is **only** the data points `x`, with no labels; the question is what can still be recovered [`2:54`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=174), [`3:23`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=203).
- Answer: learn the **structure hidden in the data** — a pattern the points were generated from [`3:53`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=233), [`4:29`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=269).
- Classical example — **clustering**: find k groups so that points inside a cluster are similar and points across clusters are far apart [`4:49`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=289).

## The open question this raises

Clustering is one structure, but structure in general is hard to pin down — which is exactly what forces the move to probabilistic models in the next section [`5:22`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=322), [`5:52`](https://www.youtube.com/watch?v=VuM1WnwEMRQ&t=352).
