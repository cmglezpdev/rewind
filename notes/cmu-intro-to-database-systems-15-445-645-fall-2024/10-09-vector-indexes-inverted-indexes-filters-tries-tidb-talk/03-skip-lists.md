# 03 — Skip Lists

## Motivation: from linked list to skip list

- Strip the inner nodes off a B+Tree and the leaf level is essentially a **linked list** — the simplest dynamic, order-preserving structure [`12:40`](https://www.youtube.com/watch?v=foMMYyycRgk&t=760), [`13:08`](https://www.youtube.com/watch?v=foMMYyycRgk&t=788).
- Without the nodes above it, every search is a linear scan, O(n). Binary search does not help because a linked list gives you no way to jump in — you cannot assume values are packed contiguously [`13:08`](https://www.youtube.com/watch?v=foMMYyycRgk&t=788), [`13:40`](https://www.youtube.com/watch?v=foMMYyycRgk&t=820).
- The simple fix: stack extra linked lists on top, each skipping keys in the list below, so you can descend when the next key overshoots your target [`14:00`](https://www.youtube.com/watch?v=foMMYyycRgk&t=840).
- That is a **skip list** [`14:27`](https://www.youtube.com/watch?v=foMMYyycRgk&t=867). Invented 1990 at the University of Maryland — newer than the B+Tree [`16:27`](https://www.youtube.com/watch?v=foMMYyycRgk&t=987).

## Probabilistic structure

- Levels are **not** deterministic. On each insert you flip a coin repeatedly; each 1 promotes the key one level higher, a 0 stops the promotion [`14:27`](https://www.youtube.com/watch?v=foMMYyycRgk&t=867), [`18:17`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1097).
- On average each level holds **half** the keys of the level below it: bottom = n, then n/2, n/4, … [`15:01`](https://www.youtube.com/watch?v=foMMYyycRgk&t=901), [`17:05`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1025).
- Search is **approximately** O(log n) — average case, with no guarantee, because of the randomness [`15:30`](https://www.youtube.com/watch?v=foMMYyycRgk&t=930).
- The bottom layer is the equivalent of B+Tree leaf nodes: sorted, holding every key that could exist [`17:05`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1025).
- Layers are never "added" by policy — flip 100 ones and you get 100 levels [`21:54`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1314).
- Q&A: coin flipping is needed precisely *because* keys are not known ahead of time; the structure is incrementally built and randomness delivers the balance property without resorting/rebalancing [`23:11`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1391), [`23:41`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1421).
- Pathological towers (one key promoted very high) can be vertically compressed, as with tries; the original paper calls these **towers**, and variants called **wheels** exist [`24:02`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1442), [`24:54`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1494).

## Insert — build bottom-up

Ordering matters for concurrency [`19:42`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1182):

1. Flip coins to decide the key's height [`18:17`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1097).
2. Leave all existing pointers untouched while setting up, so concurrent readers still traverse a consistent structure and simply do not see the new key [`18:59`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1139).
3. Link the new node in **from bottom to top** — otherwise a reader could see the entry at a high level, descend, and find nothing [`19:42`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1182).
4. Flip each level's pointer in turn until the key is fully integrated [`20:00`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1200), [`20:21`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1221).

- **No splits or merges** — unlike a B+Tree, you just find your position in the linked list and insert yourself [`20:21`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1221).
- With single-direction pointers, pointer swaps can be done with **compare-and-swap**, giving a latch-free / lock-free insert [`20:41`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1241), [`21:00`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1260).

## Search

Start at the top entry point, scan right; when the next key exceeds your target, drop down a level; repeat until the bottom, then scan sequentially [`21:00`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1260), [`21:37`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1297). Mentally rotated, the diagram looks like a tree where the higher-level entries are the split points [`21:54`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1314).

## Delete — two phases, top-down

1. **Logical delete**: set a delete flag (a bit or byte) on the entry. Scanners encountering it skip past it; the structure stays logically correct [`25:10`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1510), [`25:40`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1540), [`26:07`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1567).
2. **Physical delete**, once no one can be looking at the node: unlink **from the top down**, so nobody descends from above into a node already removed. Each unlink is a compare-and-swap, then the memory is freed [`26:07`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1567), [`26:34`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1594), [`27:10`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1630).

> Mnemonic: **insert bottom-up, delete top-down** — both rules exist so concurrent readers never follow a pointer into a half-built or already-freed node.

## Where skip lists are used

Almost exclusively for **in-memory** structures — no pages, the structure lives on the process heap [`15:44`](https://www.youtube.com/watch?v=foMMYyycRgk&t=944), [`16:03`](https://www.youtube.com/watch?v=foMMYyycRgk&t=963):

- **RocksDB** — the LSM-tree MemTable is a skip list [`16:03`](https://www.youtube.com/watch?v=foMMYyycRgk&t=963).
- **WiredTiger** (MongoDB's engine after MMAP was abandoned) — LSM with an in-memory skip list [`16:03`](https://www.youtube.com/watch?v=foMMYyycRgk&t=963).
- **Couchbase** — in-memory indexes [`16:27`](https://www.youtube.com/watch?v=foMMYyycRgk&t=987).
- **SingleStore** (originally MemSQL) — built the whole system on skip lists after seeing Microsoft's **Hekaton** talks, but missed the later Microsoft talks concluding skip lists were a bad idea, and rode with them for a long time [`16:27`](https://www.youtube.com/watch?v=foMMYyycRgk&t=987).

## Trade-offs

**Advantages** [`27:10`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1630):
- Uses less memory than a B+Tree — no slack space reserved for future inserts to avoid constant splits (holds as long as you skip reverse pointers).
- No splits or merges on delete; you simply excise the individual key.

**Disadvantages**:
- **Terrible on disk** — block-structured storage means a downward pointer targets a page rather than a key, so you must handle the page not containing exactly the key you meant to skip past; much more metadata to track [`27:36`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1656).
- Only ascending scans are cheap. Fine for a MemTable (no reverse scans), problematic as a general-purpose index needing descending scans [`28:17`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1697), [`28:33`](https://www.youtube.com/watch?v=foMMYyycRgk&t=1713).
