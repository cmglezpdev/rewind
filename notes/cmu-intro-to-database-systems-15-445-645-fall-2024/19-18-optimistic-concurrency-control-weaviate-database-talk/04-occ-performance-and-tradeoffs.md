# 04 — When OCC Wins and When It Loses

## Where OCC performs well

- **Low conflict rates**: a huge database with a uniform access pattern — a billion tuples where two concurrent transactions rarely touch the same one — makes OCC "fantastic," very fast ([`40:19`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=2419)).
- **Read-only transactions** are even faster, because no shared locks are taken ([`40:57`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=2457)).
- With **multi-versioning** (next lecture), read-only transactions don't even need a private workspace ([`40:57`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=2457)).

## The costs

| Overhead | Detail |
| --- | --- |
| Copying into the private workspace | 2PL's expensive lock table is replaced by expensive memory copying. Deltas mitigate but do not eliminate it ([`41:08`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=2468), [`41:29`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=2489)) |
| Validation + write phases | Latches must be taken to protect shared data structures while installing changes → bottleneck ([`41:29`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=2489)) |
| Cost of aborts | **Much higher than under 2PL.** Under 2PL, failing to get the first of a billion locks wastes nothing. Under OCC you update all one billion items, reach commit, and only then discover the conflict — the whole transaction must roll back ([`41:42`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=2502), [`42:04`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=2524)) |
| No early exit | You must run a transaction to completion just to learn whether it will succeed ([`42:14`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=2534)) |

## The degenerate case

- If **every transaction updates the same tuple**, OCC and 2PL are indistinguishable: both degenerate to single-threaded execution and **no protocol can do better** ([`42:14`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=2534)).

## Choosing between protocols

- Which protocol is better "depends on many different factors" and is genuinely hard to pick ([`42:14`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=2534), [`1:03:40`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=3820)).
- Academic literature proposes **adaptive protocols** — run OCC while conflicts are low, dynamically switch to 2PL when conflicts rise ([`1:03:40`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=3820)).
- **No real system implements adaptive switching**: implementing one protocol correctly is already so hard that supporting both correctly in a PostgreSQL or MySQL is a major challenge ([`1:03:40`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=3820), [`1:04:09`](https://www.youtube.com/watch?v=-TA0QIwFUnU&t=3849)).
