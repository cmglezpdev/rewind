# 08 — Deadlock prevention

## Core idea

At the moment a transaction requests a lock held by someone else, decide immediately: **wait**, **kill the other transaction and take its locks**, or **kill yourself**. No background worker, no waits-for graph, no cycle search — because the ordering of who may wait for whom makes cycles impossible [`39:39`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=2379).

## Priority by age

Transactions get a **timestamp** on arrival; **older = higher priority**. Two transactions can never have the same age, or they would be the same transaction [`40:28`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=2428), [`40:44`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=2444). The protocol then specifies what you do when you are younger than the holder, and what you do when you are older [`41:01`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=2461).

## The two variants

| Protocol | Slogan | Requester **older** than holder | Requester **younger** than holder |
|---|---|---|---|
| **Wait-Die** | old waits for young [`41:01`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=2461) | wait for the lock [`41:01`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=2461) | **abort itself** ("die") [`41:25`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=2485) |
| **Wound-Wait** | young waits for old [`41:25`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=2485) | **abort the holder** ("wound") and take the lock [`41:25`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=2485) | wait for the lock [`41:25`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=2485) |

### Worked cases

T1 is older than T2 (timestamp 1 < 2) [`41:53`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=2513):

- **T2 holds X on A, T1 requests it** → Wait-Die: T1 (older) waits. Wound-Wait: T1 (older) aborts T2 and takes the lock [`41:53`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=2513), [`42:32`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=2552).
- **T1 holds the lock, T2 requests it** → Wait-Die: T2 (younger) aborts itself. Wound-Wait: T2 (younger) waits for T1 [`42:32`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=2552), [`42:59`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=2579).

## Why no deadlocks are possible

Same argument as B+Tree latch crabbing without sibling pointers: all waiting goes in **one direction** only (always young→old, or always old→young). With no waits in the opposite direction, there can be no cycle [`42:59`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=2579), [`43:29`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=2609), [`43:42`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=2622).

## Avoiding starvation on restart

An aborted transaction **reuses its original timestamp** when restarted. Without this it would keep getting fresh (younger) timestamps and could be killed forever. With it, the transaction eventually becomes the oldest in the system and is guaranteed to get its locks or be allowed to wait for them [`43:42`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=2622), [`44:21`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=2661).
