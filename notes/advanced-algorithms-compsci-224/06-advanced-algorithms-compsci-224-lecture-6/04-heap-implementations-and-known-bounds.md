# 4. Heap implementations and the landscape of known bounds

## Comparison table of the three classical structures

| Structure | Author / year | Insert | Delete-min | Decrease-key |
|---|---|---|---|---|
| Binary heap | Williams, 1964 [`14:42`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=882) | `O(log n)` worst case | `O(log n)` worst case | `O(log n)` worst case [`15:26`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=926) |
| Binomial heap | Vuillemin [`15:26`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=926) | `O(1)` **amortized** (`O(log n)` worst case) [`16:39`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=999), [`17:45`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1065) | `O(log n)` worst case | `O(log n)` worst case [`17:22`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1042) |
| Fibonacci heap | Fredman & Tarjan, 1987 [`18:15`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1095) | `O(1)` amortized | `O(log n)` amortized [`19:34`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1174) | `O(1)` amortized [`18:48`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1128) |

- Worst case is a strictly stronger property, but for use *inside* an algorithm like Dijkstra amortized bounds are usually just as good [`16:16`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=976), [`16:39`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=999).
- The binomial heap's better amortized insert alone is **not** enough to speed up Dijkstra; Fibonacci heaps are, because the `log n` no longer multiplies `m` [`18:15`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1095), [`19:34`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1174).

## Why delete-min cannot also be constant

- All three structures are **comparison-based**: the only thing they do with keys is compare them [`21:55`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1315).
- Heapsort argument: insert `n` items, then repeatedly delete-min. If every operation were `O(1)` (even amortized), sorting would be `O(n)` in the comparison model — impossible [`22:14`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1334).
- Under **word RAM**, though, this barrier does not apply: taking the better of fusion trees and van Emde Boas gives every operation in `O(√log n)` [`22:37`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1357), [`23:59`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1439), [`24:24`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1464).
- Caveat: the fusion tree presented earlier in the course was **static** (queries only), but a dynamic structure achieving the same bounds does exist [`24:45`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1485); the static structures also carry a possibly expensive preprocessing phase [`25:33`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1533).

## The "weakest model" game and follow-up work

The research game in data structures: once you have a bound in word RAM, ask whether you really need bit shifts and XOR, or whether array random access — or even just pointers — suffices [`22:37`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1357), [`22:56`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1376).

- **Gerth Brodal, SODA '96** — all the Fibonacci heap bounds but **worst case instead of amortized**; believed to use random access into arrays [`20:28`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1228), [`22:56`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1376).
- **Brodal, Lagogiannis & Tarjan, STOC 2012** — the same bounds on a **pure pointer machine**, no arrays at all [`21:16`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1276), [`23:14`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1394).
- **Kaplan, Tarjan & Zwick, arXiv (that summer)** — no improved bounds; they achieve the Fibonacci heap bounds while keeping a **single tree** instead of a forest [`26:02`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1562), [`26:30`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1590), [`26:55`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1615).
- Motivation for all this simplification work: Fibonacci heaps have **large constants**, so they are not actually used in real applications [`27:20`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1640).

## Teaching plan

- Binary heaps are assumed known and are not relevant to this lecture [`19:34`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1174), [`20:09`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1209).
- Binomial heaps **are** covered, because Fibonacci heaps are best understood as an optimized (lazy) binomial heap [`20:09`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1209), [`20:28`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1228).
- Both binomial and Fibonacci heaps maintain items in a **forest**, not a single tree [`26:30`](https://www.youtube.com/watch?v=gxp_FrgTkQI&t=1590).
