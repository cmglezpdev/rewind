# 2. Why the plain DFS is wasteful: surviving fragments

The whole motivation for link-cut trees, worked out on a level-graph picture [`3:33`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=213).

## The level graph and the naive routine

- In the level graph every edge goes from one level to the **very next** level — nothing else is kept [`3:51`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=231).
- Naive routine: DFS from `s` toward `t`; on reaching `t`, augment along the path by its minimum residual capacity and subtract that from every edge on it; then DFS again from `s` [`4:15`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=255).
- Each augment saturates **at least one** edge (possibly more), and saturated edges are deleted [`5:07`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=307).

## The waste

- After an augment, the **unsaturated edges of the explored path survive**, but the next DFS re-walks them from `s` step by step [`5:36`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=336), [`6:34`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=394).
- If a data structure *remembered* those live edges, the search could **jump straight to the far end** of the surviving fragment instead of re-DFSing it, then continue (or retreat and kill it) from there [`7:14`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=434), [`8:03`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=483).
- That "remember the live fragments and skip ahead" idea is exactly what link-cut trees support [`8:03`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=483).

## The fragments are trees, not paths

- Once a middle edge saturates, what survives can branch — the leftover fragment is a **tree**, not a path [`8:40`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=520), [`9:14`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=554).
- Hence the data structure must maintain a **collection of vertex-disjoint rooted trees** [`9:14`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=554), [`9:47`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=587).

## Why the structure stays a forest and never becomes a DAG

- Student question: why is the maintained structure always a tree rather than a DAG? [`11:49`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=709)
- Answer: the algorithm **never ignores an existing path** — the first thing every loop iteration does is `find-root(s)`, which jumps to the end of the path already leaving `s`; a new path is only explored once the existing one dead-ends [`12:16`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=736), [`13:04`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=784), [`13:41`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=821).
- Cycling back is impossible anyway: the underlying level graph is itself a **DAG** whose edges only go forward one level [`14:14`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=854), [`14:38`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=878).
- **Invariant**: the maintained graph is always a forest of rooted trees [`15:18`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=918).
