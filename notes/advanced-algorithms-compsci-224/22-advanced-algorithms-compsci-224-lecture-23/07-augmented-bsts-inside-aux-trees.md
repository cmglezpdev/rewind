# 7. Augmented BSTs inside aux trees (answering "how do you add/subtract flow?")

A student asks how link-cut trees support flow operations like adding or subtracting flow along a path. The answer: **augment the BSTs sitting inside the aux trees** [`43:39`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2619), [`44:16`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2656), [`44:39`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2679).

## The warm-up problem

- `n` **key-value pairs**; support `sum(k)` = sum of all values whose key is at most `k`, plus `insert`, `delete`, `predecessor`, etc. [`45:13`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2713), [`46:07`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2767).
- **Technique**: store a **subtree sum** at every BST node; walking down the tree, combine those sums to answer the query [`46:07`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2767).

## Transferring it to link-cut trees

- The **aggregation operator is not `sum`** for flow purposes — it's typically **`min`** [`46:37`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2797).
- Each node stores the **minimum residual capacity over its subtree**; manipulating these augmentations implements the path-flow operations [`46:52`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2812).
- Left as an exercise; the lecturer declines to spend more time on it [`46:52`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2812).
