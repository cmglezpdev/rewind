# 04 - Normal execution and the commit protocol

## What gets logged

- Only **writes** are logged. Reads produce no log records because they modify nothing ([`14:44`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=884)).
- Plus the control records: BEGIN, COMMIT / ROLLBACK, and the new TXN-END ([`14:44`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=884)).

## Commit

1. Append a **COMMIT** record to the log ([`16:46`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=1006)).
2. Flush **all** log records for that transaction to disk ([`16:46`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=1006)).
3. Update `flushedLSN` to point at that record ([`17:59`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=1079)).
4. Only then acknowledge the commit to the outside world ([`18:30`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=1110)).
5. Keep internal metadata about the transaction alive — comparable to keeping read/write sets around in OCC ([`18:30`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=1110)).
6. Later, append a **TXN-END** record and reclaim the memory ([`18:46`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=1126)).

## The new TXN-END record

- Purely **internal bookkeeping**: it marks the point after which no further log records will ever appear for that transaction, so it can be dropped from the in-memory structures ([`17:03`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=1023), [`17:28`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=1048)).
- TXN-END does **not** need to be flushed immediately; it rides along with some later flush, because it is not needed to tell the client the transaction committed ([`17:28`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=1048), [`17:59`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=1079)).

## COMMIT vs. TXN-END (asked from the floor)

| | COMMIT | TXN-END |
|---|---|---|
| Meaning | client is told the transaction succeeded; all its log records are durable and replayable ([`25:25`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=1525)) | internal cleanup complete; the transaction will never be seen again in the log ([`25:25`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=1525)) |
| Must be flushed before acknowledging? | yes | no |
| Records in between? | for commit: none in this protocol; for **abort**: yes — the CLRs sit between ABORT and TXN-END ([`26:14`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=1574)) |

## Worked sequence (T4)

BEGIN → UPDATE A → UPDATE B → COMMIT (flush WAL buffer, advance `flushedLSN`, tell the client) → …later… TXN-END ([`17:59`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=1079), [`18:46`](https://www.youtube.com/watch?v=yVpzHdAP0TY&t=1126)).
