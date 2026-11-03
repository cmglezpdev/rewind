# 6. Finding a blocking flow: advance / retreat / augment

## Setting

- The procedure runs **on the level graph `L`**, not the full residual graph [`59:12`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=3552), [`1:00:07`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=3607).
- It is a **modified (repeated) DFS from `s`** with three operation types: **advance**, **retreat**, **augment** [`59:12`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=3552), [`1:00:07`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=3607).
- Keep a "finger" on a current vertex `v`, reached by DFS from `s` [`1:01:52`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=3712).

## Pseudocode

```
v ← s;  f ← 0                       # f is the blocking flow being built
while true:
    if v = t:                        # AUGMENT
        b ← min residual capacity on the s–t path found
        add b to f on every edge of that path
        subtract b from those edges' capacities
        delete all now-zero-capacity edges
        v ← s                        # put the finger back on s
    else if some edge (v,u) exists in L:   # ADVANCE
        v ← u
    else:                            # RETREAT
        if v = s: terminate
        let w be the previous vertex; delete edge (w,v); v ← w
```

[`1:03:17`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=3797), [`1:04:13`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=3853), [`1:04:51`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=3891), [`1:07:47`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4067), [`1:08:36`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4116)

- Mapping to recursive DFS: a recursive call = **advance**; returning to the parent = **retreat** (delete the edge you came back over); reaching `t` = **augment** along the call stack [`1:04:51`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=3891), [`1:06:19`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=3979), [`1:06:43`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4003).
- In the unit-capacity case, augmenting zeroes every edge on the path, so they are all deleted at once [`1:03:17`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=3797).

## Two clarifications the class pressed on

- **"Delete" is local bookkeeping.** Edges are removed from consideration *inside* the blocking-flow subroutine only — nothing is deleted from the actual graph [`1:06:43`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4003), [`1:07:14`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4034).
- **No edges get reversed here.** The subroutine works entirely within the fixed graph `L`; it *builds* a flow rather than augmenting the real flow, so the residual graph does not change mid-subroutine [`1:08:36`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4116), [`1:08:51`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4131).
- **Dead ends stay dead.** Since capacities only decrease and edges only disappear, a vertex with no path to `t` now will never gain one later — so deleting all edges into a dead-end vertex is safe [`1:07:14`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4034), [`1:09:14`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4154), [`1:09:38`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4178).
- **No cycles to worry about**: `L` is a DAG (edges only go one level forward), so "already-visited vertex" concerns from general DFS do not arise [`1:11:42`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4302), [`1:12:23`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4343).
- A "dead end" can mean no outgoing edge, or outgoing edges whose endpoints were already explored [`1:11:14`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4274).

## Running time — unit capacity

- **Each edge is examined `O(1)` times** [`1:13:31`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4411), [`1:14:16`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4456):
  - advanced on once;
  - then either retreated over (and deleted forever), or reached `t` and got saturated/added to `f` (and deleted).
- ⇒ **`O(m)` per blocking flow** [`1:14:16`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4456).
- Combined with the `≤ n` iteration bound: **`O(mn)` max flow in unit-capacity graphs** [`1:14:16`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4456), [`1:14:58`](https://www.youtube.com/watch?v=rfTt7k6Nv-I&t=4498).
