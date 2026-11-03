# 1. Introduction and the "listening to expert advice" problem

## Where this lecture sits in the course

- The linear programming block is finished: simplex, ellipsoid and interior point have all been covered [`0:09`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=9).
- Today's tool — **multiplicative weights (MW)** — can also solve linear programs, but it is much more than an LP solver; after this topic the course stops solving LPs altogether [`0:27`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=27).
- Informal poll in class: only two students had seen multiplicative weights before [`0:44`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=44).

## The motivating scenario

- Stock trading: many self-proclaimed experts tell you what to buy; you need a *strategy* for deciding whom to listen to [`1:31`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=91).
- The framing deliberately echoes **competitive analysis** from earlier lectures [`1:50`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=110).

## Formal setup

| Element | Definition |
| --- | --- |
| Horizon | `T` days [`1:50`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=110) |
| Experts | `n` experts [`1:50`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=110) |
| Daily signal | Each expert says **yes** or **no** ("will it rain?", "will this stock go up?") [`2:24`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=144) |
| Your move | Commit to a decision using all expert opinions [`2:57`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=177) |
| Feedback | At the end of each day reality is revealed; you have unbounded memory of all past advice [`5:27`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=327) |
| Goal | Make few mistakes over the `T` days, with a provable guarantee [`2:57`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=177) |

## Why absolute guarantees are impossible

- The experts may know nothing and emit random junk; an adversarial reality can always contradict you, so "few mistakes in absolute terms" is hopeless [`3:56`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=236) [`4:14`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=254).
- **Fix (the whole point of the model):** measure success competitively — be nearly as good as the *best expert in hindsight*, i.e. the expert with the fewest mistakes after the `T` days [`4:30`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=270) [`5:15`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=315).
