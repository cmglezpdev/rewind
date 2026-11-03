# 02 — MongoDB: Discord's First Database, and Why It Broke

## Why MongoDB was the right first choice (2015)

- Discord launched in **2015** with a small team that needed to move fast, so they picked **MongoDB**, a document database ([`1:53`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=113)).
- It let them change their data shape quickly without ceremony — exactly what a product still finding its feet needs ([`1:53`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=113)).
- Messages were indexed on **channel ID + creation time**, so "give me the recent messages in this channel" was cheap ([`1:53`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=113)).
- It worked well for about **6 months** ([`2:20`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=140)).

## The breaking point: 100 million messages

- At **100 million messages** the cracks appeared ([`2:29`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=149)).
- Mechanism: a database is fast while data + index fit in **RAM**. Once they outgrow RAM, it goes to **disk**, which is far slower ([`2:29`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=149)).
- Normally caching saves you — keep hot data in memory, cold data on disk ([`2:48`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=168)).

## Why caching could not save Discord

Their reads were **wildly random**, because server types differed enormously ([`2:48`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=168)):

- Voice-heavy servers with barely any messages.
- Small private friend groups with moderate chat.
- Huge public communities with millions of messages ([`3:10`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=190)).

Users jumped into old channels, scrolled year-old history, opened dead servers — so there was **no clean hot/cold split** for the cache to exploit ([`3:10`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=190)).

**Result:** constant cache misses → disk trips → **unpredictable latency**, sometimes fast, sometimes painfully slow, with no fixable pattern ([`3:10`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=190)).

```mermaid
flowchart LR
    A[Random reads across<br/>voice / private / huge servers] --> B[No hot vs cold split]
    B --> C[Cache misses]
    C --> D[Disk access]
    D --> E[Unpredictable latency]
```

## The decision to leave

- From day one Discord had decided **not to rely on MongoDB sharding** — they judged it fiddly and not stable enough to trust with core data at that time ([`3:40`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=220)).
- *Sharding* = splitting data across many machines so no single machine holds everything ([`3:40`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=220)).
- Because they had planned for a move, switching was actually possible instead of patching a system they did not believe in ([`3:59`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=239)).

## Lesson

> MongoDB was not a bad database. It was a bad match for Discord's access pattern at scale — right tool, wrong job ([`3:59`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=239)).
