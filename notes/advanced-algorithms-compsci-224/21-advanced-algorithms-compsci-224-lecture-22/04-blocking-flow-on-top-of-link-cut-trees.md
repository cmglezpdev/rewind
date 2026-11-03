# 4. Blocking flow written on top of link-cut trees

Pseudocode using only the abstract operations from topic 3 [`19:33`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1173), [`20:40`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1240).

```text
make-tree() × n                      # H starts edgeless
while true:
    v = find-root(s)                 # jump to the end of s's current fragment

    if v == t:                       # AUGMENT
        repeat:                      # (bug fix, see below)
            (z, x) = find-min(s)     # min-capacity edge is (z, parent(z)), capacity x
            subtract(s, x)
            cut(z)
            delete (z, parent(z)) from L
        until no zero-capacity edge remains on the s-to-root path
        continue

    else if v has an outgoing edge (v, w) in L:      # ADVANCE
        link(v, w, capacity_L(v, w))                 # v is a root, so link is legal

    else:                                            # RETREAT
        if v == s: break                             # nothing left to do
        for each child y of v:
            cut(y)
            delete (y, v) from L
```

- `find-min(s)` returns an **edge**, identified as `(z, parent(z))`, together with its capacity `x` [`21:20`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1280), [`25:17`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1517).
- The augment step subtracts the bottleneck from the whole `s`-to-`t` path, cuts the saturated edge, deletes it from `L` too, and loops [`25:46`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1546), [`26:02`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1562).
- Adding flow explicitly is skipped — the flow is recoverable at the end from the capacity deltas [`25:46`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1546).
- On **advance**, `v` is the result of `find-root`, hence a root, which is exactly `link`'s precondition [`27:13`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1633), [`27:56`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1676).

## Retreat is aggressive on purpose

- If `v` has no outgoing edge in `L`, `v` is a **useless vertex forever**, so the algorithm deletes **every** edge entering `v`, not just the one it arrived on [`28:54`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1734), [`29:31`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1771).
- It stops there: **descendants of `v` are untouched**, because they may still have other routes forward and their incoming edges may still be useful [`31:03`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1863), [`31:24`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1884), [`31:39`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1899).

## The bug found live in class

- Original code called `find-min` **once** per augment. But an augment can saturate **several** edges at once, and only one is removed [`32:13`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1933), [`32:37`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1957).
- Fix: **loop `find-min(s)`**, deleting zero-capacity edges until the returned edge has non-zero capacity [`33:25`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=2005), [`34:16`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=2056), [`36:49`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=2209).
- The loop is correct because `find-min` breaks ties **toward the root**, so the deleted edge is always the farthest one; all remaining dead edges stay inside `s`'s tree and will be found by the next `find-min(s)` [`31:39`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=1899), [`37:07`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=2227).
- Nelson's own comment: "programming ... without bugs is hard" — he was writing the shortest correct code he could and still shipped one [`33:37`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=2017), [`36:06`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=2166).

## What the algorithm leaves behind

- Live fragments **persist across augments** — at the end of a worked example, three trees remained: two single edges and one isolated vertex [`35:43`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=2143), [`36:06`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=2166).
- Re-rooting after a cut is **the `cut` implementation's problem**, not the caller's — the pseudocode treats these as abstract operations [`34:44`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=2084), [`35:18`](https://www.youtube.com/watch?v=HFqO_8Eoc1U&t=2118).
