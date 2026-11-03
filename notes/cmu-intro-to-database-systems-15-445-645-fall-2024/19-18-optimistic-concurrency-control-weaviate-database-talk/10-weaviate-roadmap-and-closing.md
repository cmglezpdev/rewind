# 10 — Weaviate Roadmap and Closing Remarks

## Roadmap ([`1:17:56`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4676))

| Area | Item | Note |
| --- | --- | --- |
| Enterprise readiness | RBAC support | Called "boring stuff but necessary stuff" ([`1:17:56`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4676)) |
| Hybrid search at scale | **Block-Max WAND** | Replaces plain WAND pruning ([`1:17:56`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4676)) |
| Multi-vector retrieval | **ColBERT / ColPali** support | These use many vectors *per token*, requiring **MaxSim** aggregation plus efficient pruning ([`1:17:56`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4676)) |
| Efficiency | **Locally adaptive quantization** | The item the speaker is "super excited about" — shrink the memory footprint without degrading performance. He compared quantization techniques in a guest lecture at Brown earlier that year ([`1:17:56`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4676), [`1:18:51`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4731)) |
| Generative | **Generative feedback loops** | The self-updating database concept from the opening ([`1:18:51`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4731)) |
| Product | **Recommendations as a service** | Goal: *useful* recommendations, not merely the closest matches ([`1:18:51`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4731), [`1:19:14`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4754)) |

- Weaviate recruits for summer internships and full-time positions ([`1:19:14`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4754)).

## Closing endorsement

- The lecturer's opinion: among all the vector databases out there, **Weaviate has the best blog and the best documentation**, because they are open about what they actually do — and open source ([`1:19:38`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4778)).
- Contrast drawn: other vector databases can be "a bit coy" about their internals and use terms that don't line up with what everyone else calls the same thing ([`1:19:52`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=4792)).
