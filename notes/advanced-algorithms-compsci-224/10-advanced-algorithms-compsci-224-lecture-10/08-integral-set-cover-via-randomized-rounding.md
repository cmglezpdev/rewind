# 8. Getting an integral online set cover

## First attempt (broken)

- At the start, draw one **`α_S ~ Uniform[0,1]` per set `S`**. Once `x_S > α_S`, **take `S` into the output collection** ([`1:01:52`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=3712), [`1:02:55`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=3775)).
- Important: taking `S` does **not** set `x_S = 1`. The fractional solution keeps running untouched; the chosen sets are tracked **on the side**, so the fractional cost analysis still applies ([`1:03:20`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=3800), [`1:03:35`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=3815)).
- By the same computation as in ski rental, the **expected integral cost equals the fractional cost** ([`1:03:53`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=3833)).
- **The problem: it may not be feasible.** In ski rental, failing to buy still meant renting, so you were always feasible. Here, failing to take a set means an element goes **uncovered**, and adversarial sequences exist ([`1:04:30`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=3870)).

## Why it fails, in expectation terms

- Assume `n` is known (the assumption is removable — floated as a homework/notes item) ([`1:05:23`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=3923)).
- Read `x_S` as the **probability of putting `S` in the solution**; then `Σ_{S ∋ i} x_S ≥ 1` says the **expected number of times `i` is covered is at least 1** ([`1:05:49`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=3949), [`1:06:12`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=3972)).
- Expectation 1 leaves a substantial chance of covering `i` **zero** times. **The trick is to boost the expected coverage to `log n`** ([`1:06:12`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=3972), [`1:06:33`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=3993)).
- A first stab (`x_S ≥ α_S / (C log n)`) is stated and then **retracted live** as not what was wanted ([`1:06:33`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=3993), [`1:07:15`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4035)).

## The actual fix — `R` independent thresholds

- For each set `S`, draw **`α_{S,1}, …, α_{S,R}` i.i.d. uniform on `[0,1]`**, with **`R = C·log n`** for a large constant `C` ([`1:07:48`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4068)).
- Take `S` into the solution as soon as **`x_S ≥ α_{S,j}` for any `j`** ([`1:08:38`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4118)).

## Cost and failure probability

- Expected cost grows by **at most a factor `R`**, which is exactly where the **`log n · log m`** competitive ratio comes from (`R` × `log m`) ([`1:08:38`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4118), [`1:09:28`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4168)).
- Per element, a single `α_{S,1}` fails to satisfy the constraint with probability at most a constant (say 1/2); all `R` failing has probability **exponentially small in `R`, i.e. `1/poly(n)`** ([`1:09:28`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4168), [`1:09:53`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4193)).
- Union bound over the `n` elements keeps overall infeasibility probability at **`1/poly(n)`** ([`1:09:53`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4193), [`1:10:13`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4213)).

## Q&A: why not deterministic rounding?

- A student proposes a deterministic scheme that "wouldn't fail at all"; the lecturer notes the probabilities do not add up the way needed ([`1:10:13`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4213), [`1:10:51`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4251)).
- The offline analogue is the same story: solve the primal, take each `S` with probability `x_S`, hit the same feasibility issue, and **blow up by `log n`** ([`1:11:16`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4276), [`1:11:32`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4292)).
- **The reason for caution:** it is proved that you **cannot beat a `log n` approximation for set cover unless P = NP** — so a lossless deterministic rounding would be suspicious ([`1:11:48`](https://www.youtube.com/watch?v=Jsg9TwLRTbM&t=4308)).
