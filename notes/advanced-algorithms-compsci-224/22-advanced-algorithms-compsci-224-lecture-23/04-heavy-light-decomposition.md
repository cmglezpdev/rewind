# 4. The heavy-light decomposition (analysis tool)

## Purpose

- A second way to decompose trees, alongside the preferred-path decomposition [`10:52`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=652).
- **Crucial distinction**: preferred paths are *maintained* by the data structure (they are what aux trees store); the heavy-light decomposition is **purely an analysis device — never materialized in the structure** [`10:52`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=652), [`11:43`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=703).
- Aside: structures that want **worst-case** (not amortized) bounds *do* maintain it explicitly; splay-tree-based link-cut trees only need amortized bounds, so they don't [`11:43`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=703).

## Definitions

- `size(v)` = number of vertices in `v`'s subtree **in the represented tree** [`12:12`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=732).
- For a child `u` of `v`, the edge `uv` is:
  - **light** if `size(u) ≤ ½ · size(v)` [`13:22`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=802);
  - **heavy** if `size(u) > ½ · size(v)` [`13:22`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=802).

## Four edge types

Every edge of the represented tree carries **two independent labels**, giving four types [`13:22`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=802), [`14:12`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=852):

|              | preferred | not preferred |
| ------------ | --------- | ------------- |
| **heavy**    | ✔         | ✔             |
| **light**    | ✔         | ✔             |

## Creation / destruction vocabulary

- Accessing `v` makes the **root-to-`v` path** preferred, so edges hanging off a different subtree that used to be preferred stop being so [`14:12`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=852), [`15:05`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=905).
- If `v` is the parent of `u` and `w`, and `uv` was preferred but now `wv` is: **`uv` was destroyed**, **`wv` was created** [`15:30`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=930).

## Two structural facts used later

- **A vertex has at most one heavy child** — heavy means *strictly more than half* the descendants, and two such children cannot coexist [`24:37`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=1477). It may have **many light children**, or **no heavy child at all** [`25:06`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=1506).
- **Any root-to-vertex path contains at most `log n` light edges**: subtree size is bounded above by `n`, and traversing a light edge halves the size [`28:24`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=1704), [`29:01`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=1741), [`29:26`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=1766).
