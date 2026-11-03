# 1. Logistics and lecture roadmap

## Problem set housekeeping

- **Pset 7 had bug fixes** because the lemma the lecturer lifted from an old paper was itself slightly wrong — factors of `m` missing from places in problem 2. He emailed the authors, who confirmed the errors [`0:00`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=0).
- **Pset 8 was toned down** after seeing how long pset 7 took: students only have to do **one of problems 2 and 3**, not both [`1:23`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=83).
- Pset 8 problem 2 is negative-weight single-source shortest paths — the Goldberg scaling algorithm, given "with many hints" [`1:04:41`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=3881).

## Plan for the lecture

1. **Finish the link-cut tree analysis.** In class: `O(log² n)` amortized per operation. The improvement to `O(log n)` is left as a pset 8 problem [`1:02`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=62), [`1:35`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=95).
2. **Min-cost max flow**, with a related pset problem [`2:38`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=158).

## Which balanced BST the analysis needs

- For the **`O(log² n)`** bound, splay trees are not required — **any balanced BST** works as the auxiliary-tree structure [`1:35`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=95).
- For the **`O(log n)`** bound, splay trees are the easiest route, via the **access lemma proved in lecture 7**: define the right weight function on vertices, plug it into the splay potential, and the amortized bound falls out [`1:35`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=95), [`2:09`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=129).

## Course position

- This is the **last flow lecture**; roughly **three lectures remain** afterwards on other topics [`2:38`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=158).
