# 7. X-fast tries

An alternative route to the same `O(log log u)` bound, built up from the dumbest possible structure. Historically this is closer to how van Emde Boas structures were originally described; the recursive presentation above came later, when others reinterpreted the ideas [`1:06:29`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=3989), [`1:07:21`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4041), [`1:07:45`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4065).

## Step 1 — bit array

- Use exactly `u` bits: bit `i` is `1` iff `i ∈ S` (e.g. `1011000111001100` for `u = 16`, indexing elements `0 … 15`) [`1:07:45`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4065), [`1:08:12`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4092), [`1:08:40`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4120).
- Predecessor query time: `O(u)`. Terrible [`1:08:40`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4120).

## Step 2 — perfect binary tree of ORs

- Build a perfect binary tree over the `u` leaves; **each internal node stores the OR of its two children** [`1:08:40`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4120), [`1:09:32`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4172).
- Also keep **all the 1s in a doubly linked list** [`1:10:25`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4225).

### Query walk

- Predecessor of an element that **is** a `1`: step back one node in the linked list — constant time [`1:10:25`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4225).
- Predecessor of a `0`: walk **up** until you hit a node whose value is `1` [`1:11:02`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4262).
  - If you entered that node from the **right** child, everything on the left subtree is smaller than you, so descend to its **maximum** [`1:11:37`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4297).
  - If you entered from the **left** child, the minimum of the other subtree is your **successor**, not your predecessor — so take it and step **back one** in the doubly linked list [`1:12:03`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4323).
- Either way you land on the predecessor, depending on which side you came up [`1:12:29`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4349).

## Step 3 — binary search the leaf-to-root path

- Problem: the tree has height `log u`, so walking up costs `log u`; the target is `log log u` [`1:12:45`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4365).
- Key property: **on any leaf-to-root path the bits are monotone** — `0` for a while, then `1` forever after [`1:13:17`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4397), [`1:13:56`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4436).
- So **binary search for the lowest 1** on the path ⇒ `O(log log u)` [`1:13:17`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4397), [`1:13:56`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4436).

## Step 4 — jumping to the k-th ancestor in `O(1)`

The catch: binary search needs random access to ancestors, not pointer-chasing [`1:13:56`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4436), [`1:14:18`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4458).

- **Heap layout** (the chosen fix): store the whole tree as an array — root at index 0, node `v` has children at `2v + 1` and `2v + 2` [`1:14:18`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4458), [`1:14:48`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4488).
- Then the `k`-th ancestor is found by **integer-dividing by `2^k`, i.e. a right bit shift by `k`** — constant time [`1:14:48`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4488), [`1:15:41`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4541).
- **Alternative** (more space): keep pointers and store, for each node, its `2^k`-th ancestor for every `k` from `0` to `log log u` (the tree has height `log u`). Cost: `u · log log u = u · log w` space [`1:16:34`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4594), [`1:17:22`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4642).
- Either way the **dominant space term is still `u`** [`1:17:22`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4642). A student pushes back on whether all those ancestor pointers are needed; the lecturer works a `1024 → 512 → 256 → 128` example, doesn't resolve it on the spot, and says he'd have to think about it [`1:18:09`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4689), [`1:18:52`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4732), [`1:19:18`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4758).

## Step 5 — hashing again, for space

- Same trick as with vEB: **only store the 1s, in a hash table** [`1:20:04`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4804), [`1:20:36`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4836).
- Each of the `w` levels has at most `n` ones ⇒ at most `n · w` entries; equivalently keep `w` hash tables, one per level, storing the locations of the 1s at that level [`1:20:36`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4836), [`1:21:06`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4866).
- During the binary search, a **hash miss means the bit is 0** [`1:21:06`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4866), [`1:21:39`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4899).

## Result

- **X-fast trie**: query `O(log log u)`, space `Θ(n · w)` [`1:21:39`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=4899).
- Two remaining defects, both a factor of `w` off:
  - Space is `n·w`, not `n` [`1:24:52`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=5092).
  - **Update time is `w`, not `log w`**: flipping a leaf to `1` forces re-ORing all the way up the tree, i.e. `w` node changes [`1:25:09`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=5109), [`1:25:25`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=5125).
