# 2. Toy example — ski rental

The canonical first example in online algorithms, "simple enough to demonstrate what's going on" ([`7:23`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=443)).

## Setup

- You are at a ski resort with friends; the **only unknown is `m`, the length of the sequence** (how many days the vacation lasts) ([`7:23`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=443)).
- Every morning your friends either end the trip or ski one more day; if they ski, you must have skis ([`7:59`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=479)).
- Each day you must either **rent** for `$1` or **buy** for `$B`; once bought, all future days are free ([`8:28`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=508)).

## What OPT does

- OPT knows the day the friends will go home, so ([`9:05`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=545), [`9:25`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=565)):
  - if `#days > B` → **buy on day 1**
  - else → **rent every day**

## The online strategy and its analysis

- Strategy: **rent for `B` days, buy on day `B+1`** (if such a day arrives) ([`9:25`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=565)).

| Case | OPT pays | We pay |
| --- | --- | --- |
| `#days ≤ B` | `#days` | `#days` ([`10:17`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=617)) |
| `#days > B` | `B` | at most `2B` ([`10:30`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=630)) |

- **Result: the strategy is 2-competitive** — never more than twice OPT's spend ([`10:30`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=630)).
- Renting for `B−1` days and buying on day `B` does *slightly* better than `2B`, but for large `B` the ratio still tends to 2 ([`10:52`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=652)).
