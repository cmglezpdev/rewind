# 10 — Before and After, and the World Cup Stress Test

## The numbers

| Metric | Cassandra (before) | ScyllaDB (after) |
|---|---|---|
| Cluster size | **177 machines** ([`9:41`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=581)) | **72 machines** ([`17:56`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=1076)) |
| Tail latency (slow reads) | swinging **40 → 120+ ms** ([`11:36`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=696)) | steady **15 ms** ([`18:06`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=1086)) |
| Writes | — | calm, predictable **5 ms** ([`18:06`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=1086)) |
| Load handled | — | **more data and more traffic on fewer than half the machines** ([`18:06`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=1086)) |

- The recurring words are **steady** and **predictable** — precisely the wishlist item from years earlier: they did not just want fast, they wanted **consistent**, and they finally got it ([`18:06`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=1086), [`18:28`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=1108)).

## The result that no graph shows

The system **went quiet** ([`18:28`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=1108)):

- No more weekend firefights.
- No more manually nursing sick nodes back to life.
- No more endless tuning sessions just to keep things upright.

## The real test: 2022 Football World Cup final

- Traffic spiked visibly **every time a goal went in** — huge, sudden surges of people reacting at once ([`18:28`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=1108), [`18:53`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=1133)).
- The **old system would have buckled**, with engineers watching dashboards instead of the match ([`18:57`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=1137)).
- The new system **just handled it** — the video's definition of what good infrastructure looks like ([`18:57`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=1137)).

## Closing thought

Behind one simple screen of instantly-appearing messages sit trillions of messages working quietly ([`18:57`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=1137)). The author offers a follow-up walkthrough covering message fan-out, notifications, presence, voice infrastructure, caching and scaling if requested in the comments ([`19:20`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=1160)).
