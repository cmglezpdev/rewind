# 5. Generalizing the model: distributions and real-valued costs

Two generalizations turn weighted majority into the general **multiplicative weights (MW)** algorithm.

## Generalization 1 — output a distribution, not a decision

- Instead of committing to one answer, each day we output a **probability distribution `p(t)` over the `n` experts** [`36:03`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=2163) [`37:34`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=2254) [`38:06`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=2286).
- The objective becomes minimizing the **expected total cost** `Σ_{t=1}^{T} ⟨m(t), p(t)⟩` [`38:06`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=2286).
- With 0/1 costs, that dot product is exactly the probability of being wrong on that day [`38:55`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=2335).

## Generalization 2 — cost vectors in `[−1, 1]ⁿ`

- `m(t)` is now the **cost (mistake) vector at time `t`**, not a running count; the letter reuse from earlier was an accident the lecturer corrects mid-proof [`39:59`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=2399) [`40:52`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=2452).
- Binary version: `mᵢ(t) = 1` if expert `i` is wrong on day `t`, `0` if right [`39:59`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=2399).
- General version: `m(t) ∈ [−1, 1]ⁿ` instead of `{0, 1}ⁿ` [`40:52`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=2452).
- **Negative entries mean benefit**, not just correctness — "he was right *and* gave us $100." Since we minimize the total, negatives help us [`41:35`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=2495).

## The MW update rule

```
pᵢ(t+1)  ∝  (1 − ε)^{mᵢ(t)} · pᵢ(t)
```
[`42:11`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=2531) [`43:07`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=2587)

- Treat `p` as the weight vector; formally `pᵢ(t) = wᵢ(t) / Σⱼ wⱼ(t)` [`46:36`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=2796).
- This strictly generalizes weighted majority: `mᵢ = 0` → weight unchanged; `mᵢ = 1` → weight scaled by `(1 − ε)` [`43:07`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=2587) [`43:53`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=2633).
- Negative `mᵢ` now *increases* weight; as before, that is notational convenience — you could keep only ratios instead [`44:06`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=2646).

## Provenance

- MW has been **rediscovered repeatedly under different names** in economics, theoretical computer science / algorithms, machine learning, and elsewhere [`44:24`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=2664) [`45:08`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=2708).
- Reference given in class: the **2012 monograph by Arora, Hazan and Kale**, which covers the history and many applications [`45:08`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=2708) [`45:38`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=2738).

## The MW theorem

> For every expert `i`:
> `Σ_t ⟨m(t), p(t)⟩  ≤  Σ_t mᵢ(t)  +  ε·Σ_t |mᵢ(t)|  +  ln n / ε`
> [`47:41`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=2861) [`48:30`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=2910) [`49:23`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=2963)

Reading it: our expected cost is at most the best expert's cost, plus an `ε`-fraction of the magnitude of that expert's costs, plus an additive `ln n / ε` — the classic **regret bound**. (Note `m` is indexed by `i`, `p` is not — the dot product is over experts [`48:30`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=2910).)
