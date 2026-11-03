# 5. Sketching: branch bits

Goal of this step: make a whole fusion tree node **fit in a single word** ([`13:52`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=832)).

## Preprocessing freedom

- The structure is **static**, and preprocessing time is not being counted — arbitrary computation is allowed up front ([`13:52`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=832), [`14:09`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=849)).
- Preprocessing sorts everything and builds the tree with exactly k keys per internal node, so the membership of each node is known before any query ([`14:09`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=849), [`14:28`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=868)).

## The binary-trie picture

- Focus on one node holding `x_0 < x_1 < ... < x_{k-1}` ([`14:28`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=868)).
- Draw each key as a root-to-leaf path in a binary trie: **0 → go left, 1 → go right**, read bit by bit ([`15:37`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=937)).
- Key observation: to **distinguish** the `x_i` from each other, only the vertices where the paths actually **branch** matter ([`17:13`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=1033)).
- Projecting the keys down to only those branch bits **preserves their ordering** ([`18:23`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=1103)).

## Definitions

- Let **r < k** be the number of branch bits, with indices `b_0 < b_1 < ... < b_{r-1}` ([`17:46`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=1066)).
- **`sketch(x)`** = the string of bits `x_{b_i}` only — keeping just the branch-bit positions ([`18:47`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=1127)).
- The sketch function is **per-node**: it depends on the entire set of `x_i` living in that node ([`18:47`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=1127), [`23:30`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=1410)).
- **All** keys in a node are projected onto **all** the node's branch bits — including branch bits where that particular key was not the one that branched ([`24:06`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=1446)).
- Worked example: with branch bits at positions 2 and 4, `sketch(10111010) = 11` ([`19:19`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=1159)).

## Space accounting — it fits

- Each `sketch(x_i)` uses **r bits**, and `r ≤ k - 1 = O(w^(1/5))` ([`19:19`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=1159), [`20:03`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=1203)).
- All k sketches together: `k · r = O(w^(2/5))` bits — comfortably inside **one word** ([`20:03`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=1203)).

## Two problems left over

1. **No compress instruction.** Preprocessing can build a mask of the important `b_i` positions, and a bitwise AND isolates them — but AND does not *remove* the unimportant bits. There is no C operation that gathers scattered bits into a new word ([`20:36`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=1236), [`20:53`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=1253)). → Topic 7.
2. **The query need not be one of the `x_i`.** More serious ([`21:14`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=1274)). → Topic 6.
