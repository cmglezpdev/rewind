# 04 — Two-phase locking (2PL)

## Definition

2PL is a concurrency control protocol that dictates *when* a transaction may acquire and release locks [`15:43`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=943).

- **Phase 1 — Growing**: the transaction requests as many locks as it wants; the lock manager grants or denies them normally [`16:19`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=979).
- **Phase 2 — Shrinking**: triggered automatically by the **first lock release**. From then on the transaction may only release locks or commit — it can **never acquire a new lock** [`16:36`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=996).

Mental model: you climb a mountain acquiring locks, reach the peak, then walk down the other side. You never climb a second peak [`17:09`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1029), [`17:32`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1052).

```mermaid
graph LR
    A[BEGIN] --> B[Growing phase<br/>acquire locks only]
    B -->|first UNLOCK| C[Shrinking phase<br/>release locks only]
    C --> D[COMMIT / ABORT]
    C -.->|FORBIDDEN<br/>2PL violation| B
```

## Historical note

- First provably correct concurrency control protocol, from the **1970s** [`15:59`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=959).
- Invented by **Jim Gray at IBM** on **System R**; he won the Turing Award for it in the **1990s** [`15:59`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=959).
- It generates serializable orderings **without knowing the queries ahead of time** [`15:59`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=959), [`18:49`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1129).

## What it fixes

The unrepeatable-read counter-example from the previous topic is now illegal: T1 unlocked A and then tried to re-acquire a lock, which 2PL forbids [`16:36`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=996). Rerunning that schedule under 2PL, T2 simply blocks on the exclusive lock until T1 unlocks and commits, and the anomaly disappears [`18:06`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1086).

## Guarantee and remaining gap

- **Guarantee**: 2PL alone is sufficient to ensure schedules are **conflict serializable** — the precedence graph can never contain a cycle [`18:06`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1086), [`18:49`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1129), [`19:14`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1154).
- **Cost**: 2PL is conservative — some genuinely serializable schedules are disallowed [`21:56`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1316).
- **Remaining problem**: **cascading aborts** — not a correctness issue, a performance one [`19:14`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1154).
