# 6. Bounding `LPCC` across `access`, `link`, `cut` — and the final bound

Goal: show `LPCC = O(m log n)` over `m` operations [`27:04`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=1624).

## `access`

- **`access` does not change the represented tree at all** — it only changes what is preferred. So **light/heavy labels are untouched** during an access [`27:04`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=1624), [`27:46`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=1666).
- Walking up the tree, the newly preferred edges all lie on **one root-to-`v` path**, which contains **at most `log n` light edges** [`28:24`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=1704), [`29:26`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=1766), [`29:56`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=1796).
- ⇒ **≤ `log n` light preferred creations per access**, ≤ `m` accesses ⇒ **`O(m log n)`** [`30:30`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=1830).

## `link(v, w)`

- Begins with `access(v)` and `access(w)` — already paid for by the bullet above [`31:00`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=1860).
- Adding the edge changes **light vs heavy**: the path above `w` gets **heavier**, other subtrees hanging off it get **lighter** [`34:00`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2040).
- Neither costs anything against `LPCC` [`34:41`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2081), [`35:15`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2115):
  - edges that got **lighter are not preferred** — irrelevant;
  - edges that got **heavier** may cause heavy preferred creations — **heavy creations are not counted at all**.
- ⇒ **The final edge insertion is free**; `link` costs only its two accesses [`35:40`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2140).
- Student question — an edge that is *still* light after the link was **already light before**, so the access already paid for it [`36:10`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2170).
- Technical aside: with this implementation the linked edge isn't even on a preferred path, since after `access(w)` the last access in `v`'s subtree was to `v` itself, so `v` has no preferred child [`36:32`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2192).

## `cut(v)`

- Begins with `access(v)` [`37:26`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2246).
- Removing `v`'s subtree makes edges **hanging off** the preferred path heavier — not preferred, and heavy creations aren't counted anyway [`39:40`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2380).
- But **the edges along the preferred path itself get lighter**, so there can be genuine light preferred creations there [`40:22`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2422).
- Bounded by **`log n`**, because it is again a single **root-to-leaf path** [`40:22`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2422), [`41:03`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2463).

## Result

- **`LPCC` over `m` operations = `O(m log n)`**, hence `PCC = O(m log n)`, hence [`41:03`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2463), [`42:15`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2535):

> **`m` link-cut tree operations take `O(m log² n + n log n)` time.**

## Reading the bound

- The `n log n` term is "sloppy" but harmless in practice: in **blocking flow** the first step is `n` `make-tree` calls anyway, and `m ≥ n` there (`m` = number of edges), so **`m log² n` dominates** [`42:15`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2535), [`43:23`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2603).
- **`log² n` improves to `log n` on the pset** — *same data structure*, only a **better analysis of the splay trees** [`43:39`](https://www.youtube.com/watch?v=nDLe6_sPSfs&t=2619).
