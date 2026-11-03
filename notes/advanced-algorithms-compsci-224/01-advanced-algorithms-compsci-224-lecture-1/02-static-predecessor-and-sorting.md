# 2. The predecessor problem, and why it beats the n log n sorting bound

## The hook

- Opening provocation: "you can't sort n numbers faster than n log n" is **false** as stated — the lecturer says outright he lied, because that claim silently assumes a model [`9:06`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=546), [`9:47`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=587).
- Rather than a sorting algorithm, this lecture and the next attack a **data-structural** cousin: predecessor [`9:47`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=587).

## Problem definition

- **Static predecessor**: store a set `S = {x1, …, xn}` and support one query [`10:11`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=611).
- `pred(z) = max{ x ∈ S : x < z }` [`11:10`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=670).
- Two objectives: **low space** and **fast query** [`11:10`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=670).
- **Static** = the set `S` never changes; **dynamic** additionally supports insertions and deletions [`11:55`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=715), [`12:13`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=733).

## Classical baselines (linear space)

| Solution | Variant | Query | Updates |
| --- | --- | --- | --- |
| Store sorted array + binary search | static | `O(log n)` [`13:12`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=792) | — |
| Balanced BST (e.g. red-black tree) | dynamic | `O(log n)` | `O(log n)` insert/delete [`13:53`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=833) |

## Dynamic predecessor ⇒ sorting

Given a dynamic predecessor structure over distinct numbers [`14:36`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=876):

1. Scan the input in linear time to find the **maximum** [`15:04`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=904).
2. Scan again and insert every element into the structure.
3. Output the max, then repeatedly take the predecessor of the last output — this walks out all items in descending sorted order [`15:04`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=904), [`15:26`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=926).

So a predecessor structure **faster than `log n` per operation yields sorting faster than `n log n`** [`16:04`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=964).

## The hidden assumption

- The `Ω(n log n)` sorting lower bound applies to **comparison-based sorting**: at each step the algorithm picks two items, compares them, and branches on the result [`16:31`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=991).
- Real machines are not comparison-only: in C, inputs are integers or floats in a 32- or 64-bit word, and you can XOR, shift, multiply, and more [`16:49`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=1009), [`17:08`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=1028).
- That mismatch is the motivation for the **word-RAM model** [`17:08`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=1028).

## Lecture plan announced

- Two structures: one **dynamic** (van Emde Boas), one presented only in its **static** form (fusion trees) with a reference showing it can be made dynamic [`15:47`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=947).
