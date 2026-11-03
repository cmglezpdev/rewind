# 9. Implementing every operation via `access`

Once `access(v)` exists, each public operation is a couple of lines. **Every operation starts with an access**, so the node of interest ends up at the root [`1:12:57`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4377).

## `find-root(v)`

```text
access(v)
r = lowest-depth (minimum-key) element of v's aux tree
access(r)        # for good measure
return r
```
- After the access, the **entire root-to-`v` path is the root aux tree**, so the represented-tree root is simply its minimum-depth element [`1:13:23`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4403), [`1:13:59`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4439), [`1:14:25`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4465), [`1:14:52`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4492).

## `find-min(v)`

```text
access(v)
return min capacity value in v's aux tree
```
- Uses **BST augmentation**: a binary search tree can carry extra per-node values enabling interval sums or interval minima over a key range [`1:14:52`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4492), [`1:15:50`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4550).
- Since `v` is now the aux-tree root, the answer is read off a **single augmented value stored at `v`** [`1:15:50`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4550).

## `cut(v)`

```text
access(v)
v.left.parent = none     # the left subtree holds v's ancestors, incl. its parent
v.left        = none
```
- After the access, `v`'s parent lives in `v`'s **left subtree** (smaller depth key) [`1:16:21`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4581), [`1:17:05`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4625).

## `link(v, w)`

```text
access(v)        # v and w live in two different represented trees
access(w)
v.left   = w     # w is now v's parent → smaller depth → left side
w.parent = v
```
- `w` on the left is exactly the encoding "`w` is higher than `v` in the tree" [`1:17:05`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4625), [`1:18:01`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4681).
- Valid because after `access(v)`, nothing sat at lower depth than `v` in its represented tree [`1:18:40`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4720).
- Edge **weights** are handled the same augmentation way; treated as a minor detail in class [`1:17:05`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4625).

## Left as an exercise

- `subtract` (and `add-flow`) are also done by **augmenting the binary search tree** — left to the student [`1:18:40`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4720), [`1:18:59`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4739).

## What is still owed

- **All the code is laid out; only the running-time proof remains** [`1:18:59`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4739).
- Next class: the **`O(log² n)`** amortized bound [`1:18:59`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4739).
- The **`O(log n)`** bound is assigned on the final problem set, with a hint [`1:18:59`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4739), [`1:19:52`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4792).
