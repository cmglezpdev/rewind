# 5. State of the art, open problems, and generalizations of paging

Everything in this section was flagged as background/final-project material. Names below are the intended spellings; the auto-transcript garbles them.

## Closing the factor of 2 for randomized paging

| Result | Ratio | Reference | Timestamp |
|---|---|---|---|
| MARK | `2·H_K` | Fiat et al., J. Algorithms ~1991 | [`0:40`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=40) |
| Lower bound | `H_K` | Fiat et al. | [`15:23`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=923) |
| "Partitioning algorithm" — matches the lower bound | exactly `H_K` | McGeoch & Sleator, *Algorithmica* 1991 | [`15:23`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=923), [`38:15`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2295) |
| Simpler algorithm + simpler analysis, same ratio | `H_K` | Achlioptas et al., *Theoretical Computer Science* 2000 | [`15:23`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=923), [`39:14`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2354) |

Neither of the `H_K`-optimal algorithms is covered in lecture; they go into the lecture-note references ([`15:55`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=955)).

## Resource augmentation — the open problem highlighted

Setting: **your cache has size `K`, OPT's cache has size `h ≤ K`** ("resource augmentation" is the standard jargon) ([`39:53`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2393), [`41:13`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2473)).

- **Deterministic:** LRU is `K/(K − h + 1)` competitive. So if OPT has half your cache, LRU is only `2`-competitive ([`39:53`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2393), [`40:16`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2416)).
- **Randomized:** Neil Young (SODA 1991) achieves `2·ln(K/(K − h + 1))` and proves that beating `ln(K/(K − h + 1))` is impossible ([`40:35`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2435), [`41:13`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2473)).
- **The gap:** at `h = K` the factor-2 gap was closed by McGeoch & Sleator, but **under resource augmentation the factor of 2 appears to still be open** — Young's paper cites McGeoch–Sleator, knows the gap was closed there, and still carries the factor of 2 himself ([`41:13`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2473), [`41:48`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2508), [`42:10`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2530)). Presented as a candidate final-project problem; no paper found solving it, though no paper calls it open either ([`39:14`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2354)).

## The `k`-server problem

Paging is a special case ([`42:10`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2530)).

Setup ([`42:38`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2558), [`43:14`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2594), [`43:48`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2628)):

- You control `K` servers living on points of a metric space `X`.
- A request is a point `p ∈ X`; you must move some server onto `p` (free if one is already there).
- Cost of a move from `q` to `p` is `d(q, p)`.

Known bounds:

- **`2K − 1` competitive deterministically** — the *work function algorithm*, Koutsoupias & Papadimitriou, *JACM* 1995 ([`44:22`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2662), [`44:56`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2696)).
- **No deterministic algorithm beats `K`** — so a factor-2 gap has been open **for more than 20 years** (and longer, counting the conference version) ([`44:56`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2696)).
- **Open question:** a randomized algorithm with `polylog(K)` competitive ratio; the belief is the true answer is `log K`, as for paging ([`45:58`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2758)).
- **Recent breakthrough (2011):** Bansal, Buchbinder, Mądry, Naor achieve roughly `log²K · log³n · log log n` — polylog, but with a dependence on `n` (the number of points) that is believed to be removable ([`46:34`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2794), [`47:16`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2836)). It is believed to use the Buchbinder–Naor primal-dual framework ([`47:16`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2836)).

**Why paging is a special case:** the endpoints are the pages, and **all pairwise distances equal 1** ([`47:44`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2864)).

## Weighted paging

Between plain paging and `k`-server ([`47:44`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2864)):

- Not all pages cost the same to fetch — some sit on a remote machine over the network, some in fast local memory. Each page has a weight; bringing it into cache costs its weight ([`47:44`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2864)).
- Encoded as `k`-server by setting `d(p, q) = (w_p + w_q)/2`, so telescoping over a sequence of moves recovers the per-fetch weights; the boundary terms are handled by augmenting the problem to start and end at weight-zero points ([`48:33`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2913), [`48:58`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2938)).
- **`O(log K)` competitive ratio** via the primal-dual framework: Bansal, Buchbinder & Naor, FOCS 2007 ([`49:23`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2963)).

```mermaid
flowchart LR
  P["Paging<br/>all distances = 1"] --> W["Weighted paging<br/>d(p,q) = (w_p+w_q)/2"]
  W --> KS["k-server<br/>arbitrary metric space"]
```
