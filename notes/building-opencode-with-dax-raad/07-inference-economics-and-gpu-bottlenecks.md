# 07 — Inference Economics and GPU Bottlenecks

## Why inference is very profitable

- The cost floor of pure inference is electricity (plus capital cost of hardware, ops staff, infra). Once you own the hardware, "the cheapest a token can get is the electricity to power it" [`36:57`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=2217).
- Direct evidence from OpenCode (they rent GPUs at scale, *still using middlemen* — not even at the cost floor): for some models there's an **~80% margin** between the sticker price and their own hosting cost [`37:18`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=2238).
- Prices actually went **up**, disguised as a cut: Sonnet was the default because Opus was too expensive; Opus got "cheaper," became the new default, but still costs far more than Sonnet — while hosting costs didn't change [`37:44`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=2264).
- With Anthropic/OpenAI's scale and GPU deals, Dax "wouldn't be surprised if they're looking at ~90% margin at current prices" — though he doesn't consider that margin defensible long-term [`38:04`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=2284).
- Historical rhyme: early AWS hid its financials and let everyone believe cloud was a money-losing business, when it was printing money. Hyped businesses attract negative sentiment, and incumbents have no incentive to correct it [`38:34`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=2314), [`38:58`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=2338).
- Caveat: training costs and R&D are hugely expensive — but "long-term, inference makes sense as a business, and I think it always will" [`38:58`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=2338).

## GPU bottlenecks

- Everything in the GPU stack — production, supporting hardware, labor — is "super tight." Even a company OpenCode's size is bottlenecked by GPU supply [`39:11`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=2351).
- Structural mismatch: inference demand may be growing exponentially while GPU production grows linearly — as the lines intersect, capacity tightens. OpenCode must reserve GPUs and pay heavily up front; everyone is hoarding expecting the crunch to continue [`39:35`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=2375).
- Startup raises ($2B rounds) are dwarfed by big tech: Amazon, Meta, etc. spend **tens of billions a year** and vacuum up supply — supply-chain companies won't talk to smaller players because they're chasing Amazon/Microsoft/Google deals [`40:01`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=2401).
- Dax's expectation from prior shortages: a tense period followed by crazy oversupply — "it might be different this time, but generally that's how I see things go" [`40:39`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=2439).
