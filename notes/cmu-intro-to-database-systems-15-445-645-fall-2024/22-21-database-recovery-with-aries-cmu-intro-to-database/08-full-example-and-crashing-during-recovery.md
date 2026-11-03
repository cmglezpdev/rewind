# 08 - Full example, and crashing during recovery

## The log before the crash ([`57:57`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3477), [`58:39`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3519))

1. BEGIN-CHECKPOINT / END-CHECKPOINT
2. T1 update, T2 update
3. **T1 aborts** → CLR for its single change → TXN-END for T1 (normal-operation rollback)
4. T3 starts and makes a change; T2 makes a second change
5. **Crash**

At least T2 and T3 are known to be in flight; anything else would have appeared in the ATT recorded at CHECKPOINT-END ([`58:39`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3519)).

## Recovery, first attempt ([`59:05`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3545))

- Analysis rebuilds the ATT with T2 and T3 both marked for undo (no COMMIT seen), and a DPT holding pages **P1, P3, P5** whose changes may not have reached disk ([`59:05`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3545)).
- Undo runs in reverse: first reverse T2's latest change with a CLR carrying a pointer to its next reversal ([`59:38`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3578)).
- Then reverse T3's change at LSN 008; its `undoNext` is null, so TXN-END is written for T3 ([`1:00:09`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3609)).

### Optimization noted at TXN-END during undo

- The **original ARIES protocol** flushes the WAL and all dirty pages at this point, so a subsequent crash resumes from here ([`1:00:36`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3636)).
- **Most real systems skip it**: no real queries are running during recovery, so paying that cost only helps if you crash again immediately ([`1:00:36`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3636), [`1:00:56`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3656)).

## Second crash — during recovery ([`1:01:18`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3678))

> "This is what ARIES got correct and a bunch of other systems did not."

- Restart is identical: run analysis from the same latest checkpoint ([`1:01:18`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3678)).
- Analysis now sees TXN-END for **T1** and for **T3**, so both are dropped from the ATT ([`1:01:44`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3704), [`1:05:00`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3900)).
- Only **T2** remains — the one transaction that still needs undoing ([`1:01:44`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3704), [`1:05:00`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3900)).
- Reapply the changes, write T2's remaining CLR, then TXN-END. The database is now in exactly the state it should have been at the crash, with all partial updates from aborted transactions reversed, and can accept new transactions ([`1:02:07`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3727), [`1:02:42`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3762)).

## Crash-during-recovery, phase by phase ([`1:05:41`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3941))

| Crash during… | What to do | Why |
|---|---|---|
| **Analysis** | nothing special — start recovery over | analysis modifies nothing; it only builds in-memory structures that die with the crash ([`1:05:41`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3941)) |
| **Redo** | nothing special — restart redo | redo blindly overwrites pages in the right order; it is idempotent ([`1:05:41`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3941), [`1:06:11`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3971)) |
| **Undo** | restart; the work already done is preserved | any CLRs that were flushed get picked up by the next redo phase, so undo has **less** work each time ([`1:06:28`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3988)) |

**Convergence guarantee**: as long as a little more progress is made each attempt, repeated crashes eventually finish. In the limit the redo phase already contains every needed undo, so no undo phase remains ([`1:06:28`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3988), [`1:06:58`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=4018)).

## Clarification: what the DPT actually means ([`1:02:42`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3762))

- At CHECKPOINT-END: the pages that were modified when the checkpoint **started** ([`1:02:57`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3777)).
- After analysis: all pages that were modified and **may or may not** have been flushed, each with the **oldest** log entry for that change — the oldest one matters because it dictates how far back redo must jump ([`1:03:12`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=3792)).
