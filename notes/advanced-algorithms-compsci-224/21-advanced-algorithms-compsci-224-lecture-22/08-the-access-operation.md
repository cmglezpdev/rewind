# 8. `access(v)` — the one helper every operation is built on

Every other link-cut operation starts with `access` [`57:49`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=3469), [`1:12:57`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4377).

## What it must accomplish

- **Make the root-to-`v` path preferred** in `v`'s represented tree [`58:14`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=3494), [`59:34`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=3574).
- That forces preferred-child changes: some formerly preferred edges stop being preferred and the paths must be re-split and re-merged [`58:40`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=3520), [`58:59`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=3539).
- After the access, `v` has **no preferred child** (by the definition), so its old preferred child must be cut off [`1:00:05`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=3605).
- **Goal state**: `v` is the root of the root aux tree of the tree of aux trees [`1:00:45`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=3645), [`1:01:03`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=3663), [`1:01:40`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=3700).

## Step 1 — splay `v` and detach its descendants

- Splay `v` inside its own aux tree so `v` becomes that tree's root [`1:02:18`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=3738).
- Keyed by depth ⇒ the **right subtree holds `v`'s descendants** on the path, which are no longer preferred. Detach it as its own aux tree [`1:03:08`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=3788), [`1:03:29`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=3809).

```text
r = v.right
r.path_parent = v        # the old preferred edge becomes a path-parent pointer
r.parent      = none
v.right       = none
```
[`1:03:29`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=3809), [`1:04:01`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=3841), [`1:07:01`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4021)

## Step 2 — walk up, splicing aux trees together (loop)

- `v` now has a path-parent pointer to some `w` in another aux tree; `w` need **not** be that tree's root [`1:04:53`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=3893).
- **Who is `w`?** the represented-tree parent of the minimum-keyed (shallowest) element of `v`'s aux tree, i.e. the parent of the top of `v`'s path [`1:05:17`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=3917).
- Splay `w` to the root of its aux tree, then swap `w`'s old preferred descendants for `v`'s path:

```text
splay(w)
w.right.path_parent = w      # w's OLD preferred child becomes a path parent
w.right.parent      = none
w.right = v                  # v's path becomes w's new preferred descendant
v.parent = w
v.path_parent = w.path_parent   # v/w path-parent bookkeeping
w.path_parent = none
splay(v)                     # bring v back up
```
[`1:05:43`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=3943), [`1:06:18`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=3978), [`1:06:32`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=3992), [`1:07:01`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4021), [`1:07:29`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4049), [`1:08:03`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4083)

- Repeat in a **while loop** until `v` sits in the root aux tree, then splay once more [`1:08:29`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4109).
- Nelson's own warning after nearly dropping it: **"you need to make sure you maintain the path parents"** [`1:09:20`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4160), [`1:09:37`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4177).

## Why the splice is legal

- Everything spliced under `w` on the right is at **greater depth** than `w`, since it all hangs off `w` in the represented tree — so BST order by depth is preserved [`1:10:41`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4241), [`1:11:15`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4275).
- In effect: **splice two paths together and cut off whatever hung below `w` before**, because `w`'s preferred child just changed [`1:10:11`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4211), [`1:10:41`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4241).
- Net effect of each splice step: a **parent pointer becomes a path-parent pointer** and vice versa [`1:07:01`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4021).

## Cost

- The running time of `access` is governed by the **number of preferred-child changes** encountered walking up the tree — one splice per change [`1:11:59`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4319), [`1:12:57`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4377).
- This is the quantity the amortized analysis (next class) has to bound [`1:12:57`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=4377).
