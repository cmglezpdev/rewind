# 9. State of the Art: Lee–Sidford's Weighted Barrier

## The improvement

- Best known bound replaces `√m · L` iterations with **`√(rank(A)) · L`** [`1:13:18`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4398).
- Due to a **recent paper by Lee and Sidford** [`1:13:46`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4426).

## The flaw in the standard barrier

- The barrier `−Σᵢ log(s(x)ᵢ)` weights each constraint equally, so **repeating the same constraint 1000 times makes it count 1000 times in the barrier** — even though the LP being solved is unchanged [`1:14:10`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4450), [`1:14:26`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4466), [`1:15:15`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4515), [`1:15:47`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4547).

## The fix

- Use a **weighted barrier** `−Σᵢ wᵢ · log(s(x)ᵢ)`, maintaining a weight vector at every point [`1:14:26`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4466), [`1:15:47`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4547).
- The correct weights come from **geometric considerations**; that weighting is "the heart of their change", the rest being how to compute, maintain, and analyze the weights [`1:14:26`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4466), [`1:14:50`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4490).
- The weights **change over time**, so on top of "how does centrality change as `λ` changes" the analysis must also handle "how does it change as the weights `w` change" — and the weights must be computable efficiently for the algorithm to stay fast [`1:16:11`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4571), [`1:16:25`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4585).

## Prior art

- The lecturer's understanding (with the caveat that he does not know all details of the paper): an **existential theorem due to Nesterov, or Nesterov and Nemirovski**, showed such a weight vector *exists* but was **not algorithmic at all** [`1:16:25`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4585).
- Lee and Sidford's contribution is showing how to **algorithmically and efficiently maintain** a weight vector that performs close to that existential result [`1:16:50`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4610).
