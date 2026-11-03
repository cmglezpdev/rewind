# Why Navi isn't a fan of the CAP theorem

A case study in Navi's "go deep" mindset: the popular framing of CAP is incomplete, and a better theorem exists.

## The CAP theorem as usually taught

- Framed as "pick two of three": **C**onsistency (data in sync across a distributed system), **A**vailability (servers/databases up and readable), **P**artition tolerance (how the system behaves when disconnected) [`9:20`](https://www.youtube.com/watch?v=xafwfGVBxos&t=560)
- The "two out of three" framing "is not super accurate" and the theorem itself is "very incomplete" — it felt hand-wavy to someone who likes tracing things down to the exact line of assembly [`9:53`](https://www.youtube.com/watch?v=xafwfGVBxos&t=593), [`10:18`](https://www.youtube.com/watch?v=xafwfGVBxos&t=618)

## Validation and the better alternative

- Martin Kleppmann wrote a somewhat controversial blog post criticizing CAP — commenters said he was technically right but nitpicky; Navi felt validated [`10:44`](https://www.youtube.com/watch?v=xafwfGVBxos&t=644)
- The successor is **PACELC**: if there's a **P**artition, choose **A**vailability or **C**onsistency; **E**lse, the trade-off is between **L**atency and **C**onsistency. More complete, and arguably simpler to understand — Navi sees no reason to teach CAP when PACELC exists [`11:09`](https://www.youtube.com/watch?v=xafwfGVBxos&t=669), [`11:27`](https://www.youtube.com/watch?v=xafwfGVBxos&t=687)

## The broader point: depth vs. business reality

- Most engineers take the "two out of three" law at face value and move on; only a small subset digs deep enough to notice it's incomplete [`11:27`](https://www.youtube.com/watch?v=xafwfGVBxos&t=687)
- On the job you can't do "depth-first search on all the document links" — no one person understands a massive codebase, and business problems take priority over full understanding [`12:10`](https://www.youtube.com/watch?v=xafwfGVBxos&t=730), [`12:31`](https://www.youtube.com/watch?v=xafwfGVBxos&t=751)
- Agentic coding is forcing a similar transition: you may not even look at the code you produce [`12:31`](https://www.youtube.com/watch?v=xafwfGVBxos&t=751)
