# 06 — Worked example: bank transfer under each protocol

## Setup

- **T1**: move $100 from account A to account B — debit A by $100, credit B by $100 [`25:41`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1541).
- **T2**: compute and report the **sum of all accounts** (A + B) [`25:59`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1559).
- The `ECHO` in the slides is not real SQL — just notation for the transaction's return value [`25:59`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1559).

## Case 1 — No two-phase locking: wrong answer

Interleaving: T1 locks A, debits it, **unlocks A**; T2 then reads the *reduced* A, unlocks A, and grabs the shared lock on B **before** T1 can get the exclusive lock on B; T2 reads the *pre-credit* B and prints the total; only then does T1 credit B [`25:59`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1559), [`26:49`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1609).

- Result: T2 reports **A + B = $19,900** — the bank appears to be **missing $100**, because it saw A after the withdrawal but B before the deposit [`26:49`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1609).
- No serial ordering of T1 and T2 could produce that output [`27:31`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1651).

## Case 2 — Basic 2PL: correct answer, still interleaved

T1 acquires X on A, T2 stalls on the shared lock for A. T1 acquires X on B **before** releasing X on A (growing phase completes first), then releases A. T2 resumes and reads A, then stalls trying to get the shared lock on B. T1 adds $100 to B, unlocks and commits, and T2 finally reads B [`27:31`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1651), [`28:01`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1681).

- Genuine interleaving still occurs — T2 read A while T1 was still working on B — but the **result is correct** [`28:01`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1681), [`28:17`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1697).

## Case 3 — Strong strict 2PL: correct, effectively serial

T2 blocks on the shared lock for A **until T1 commits**, because T1 holds every lock it acquired until the very end [`28:17`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1697).

- Execution is essentially serial; the result is correct [`28:17`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1697), [`28:45`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1725).

## Summary

| Protocol | T2's reported total | Parallelism |
|---|---|---|
| No 2PL | **$19,900** (wrong, $100 lost) [`26:49`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1609) | highest |
| Basic 2PL | correct [`28:01`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1681) | some interleaving retained |
| Strong strict 2PL | correct [`28:17`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=1697) | effectively serial here |
