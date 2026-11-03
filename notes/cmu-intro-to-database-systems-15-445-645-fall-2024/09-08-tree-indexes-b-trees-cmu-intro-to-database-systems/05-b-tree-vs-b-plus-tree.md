# 05 — B-Tree vs. B+Tree

## The actual difference

| | B-Tree | B+Tree |
|---|---|---|
| Where values live | in **any** node, inner nodes included [`24:36`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1476) [`25:01`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1501) | **only in leaf nodes**; inner nodes are pure guide posts [`25:01`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1501) |
| Key duplication | each key appears exactly once → more space efficient [`25:01`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1501) | a key can appear in both a leaf and an inner node |
| On delete | key disappears from the tree entirely | removed from the leaf, but **can be left behind in the inner node** [`25:31`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1531) |
| Range/sequential scan | must bounce up and down between levels [`26:03`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1563) | descend once, then rip across the leaf linked list [`26:03`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1563) |
| Point query luck | may find the value at the root and stop early [`27:30`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1650) | always pays the full descent |

## Why B+Tree wins

- **Sequential access is the game changer.** A scan descends once and then never goes back up [`26:03`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1563) [`27:58`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1678).
- Leaving stale keys in inner nodes is free correctness: a deleted key still works as a separator, so **why pay to clean it up** [`25:31`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1531) [`41:38`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=2498).
- Updates are simpler than a red-black tree, which needs rotations [`27:30`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1650).

## Arguments raised and rejected in class

- *"Deletes wouldn't need whole-tree restructuring"* — false; B+Trees still restructure on delete [`25:45`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1545).
- *"You could keep the non-leaf nodes in memory"* — you get that for free from the buffer pool's replacement policy in a B-Tree too, so it is not a differentiator [`26:37`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=1597).
