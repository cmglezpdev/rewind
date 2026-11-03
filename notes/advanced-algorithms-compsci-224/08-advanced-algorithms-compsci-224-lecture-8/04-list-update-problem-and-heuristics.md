# 4. The list update problem and its heuristics

Sleator and Tarjan's competitive analysis was aimed at two problems: **list update** and **paging** ([`19:11`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1151)).

## Model

- `n` items live in a **linked list**; three operations: `access x`, `insert x`, `delete x` ([`20:54`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1254)).
- The pointer starts at the head; **accessing the `i`-th item costs `i`** ([`21:37`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1297), [`22:23`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1343)).
- `insert` appends at the end; `delete` removes the node ([`21:37`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1297)).
- **After accessing an item you may move it anywhere closer to the front for free** — anywhere you already walked past ([`19:49`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1189), [`21:37`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1297)).

## The classic heuristics

| Heuristic | Rule |
| --- | --- |
| **Move-to-front (MTF)** | Always move the accessed item to the front of the list ([`22:56`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1376)) |
| **Transpose** | Swap the accessed item with the item immediately before it — a gentler MTF that walks an item forward one slot per access ([`23:38`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1418)) |
| **Frequency count** | Keep items sorted by access frequency so far, most-frequent first ([`23:38`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1418), [`24:55`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1495)) |

## Before competitive analysis: probabilistic models

- Many papers preceding Sleator–Tarjan analysed these heuristics **probabilistically**: they posited a distribution over request sequences and proved a heuristic did well under that model ([`25:08`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1508), [`25:29`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1529)).
- The first **worst-case** analysis was Bentley and McGeoch, 1985 — covered in the next note ([`25:46`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1546)).
