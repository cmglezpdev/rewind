# 3. Reducing the runtime to preferred child changes

## The key accounting identity

- The **number of splays performed during an `access`** is `O(1 + PCC)`, where `PCC` = **preferred child changes** in that call [`6:39`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=399), [`7:22`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=442).
- Reason: each preferred child change forces one splay of `v` upward, merging with the new preferred parent, repeating until `v` reaches the root aux tree [`7:22`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=442).

## Summing over `m` operations

- Total runtime ≤ (**worst-case cost of a splay**) × (`m` + **total PCC across all `m` operations**) [`8:06`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=486).
- The `+m` term is the `1` in `1 + PCC`, summed over the `m` operations — a student asks about it explicitly [`8:43`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=523), [`9:34`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=574).
- Worst-case splay cost is `O(log n)` [`8:43`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=523).

## Why this is deliberately sloppy

- Charging **worst-case splay cost × number of PCCs** is wasteful. The pset problem shows the **amortized cost of all splays combined** is already on that order, which is where the improvement from `log² n` to `log n` comes from [`9:34`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=574), [`9:56`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=596).

## What remains to prove

- **The whole remaining task**: show `PCC = O(m log n)`. Combined with the `O(log n)` splay cost, that yields **`O(m log² n)`** [`9:56`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=596).
