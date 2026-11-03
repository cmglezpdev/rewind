# 12 — B+Tree optimizations

## Prefix compression

- Keys near each other in an index share prefixes (same rationale as column stores: contiguous values from one attribute) [`1:07:03`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4023).
- Store the shared **prefix once**, then only the suffixes. Lookups check the prefix first and only examine suffixes on a match [`1:07:41`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4061).
- Conceptually the same as **delta / frame-of-reference compression** covered earlier in the course [`1:07:41`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4061).

## Deduplication

- If the same key repeats, store the key **once** followed by a count and then its values [`1:08:03`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4083).
- Postgres added this to its B+Trees **two years before the lecture**, and it **reduces index size significantly** [`1:08:23`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4103).
- Works for values too: if many tuples live on the same page, store the page ID once and just list the differing slot numbers [`1:08:23`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4103).
- Combines with the duplicate-key scheme from topic 09: the visible key (e.g. zip code) is the real discriminator and gets stored once; the appended record IDs become the values. Explicitly called **"a win, you definitely want this"** [`1:08:48`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4128) [`1:09:52`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4192).
- Better than overflow leaf nodes, though with the overflow method you might still need the chain anyway [`1:09:23`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4163).

## Suffix truncation

- Inner-node keys only need to be **discriminating enough** to route left or right — they don't need to be the real key [`1:10:34`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4234) [`1:10:55`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4255).
- Example: for full-alphabet string keys, store **"ABC"** instead of the whole string. One letter would suffice; three gives wiggle room for future inserts [`1:10:55`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4255).
- Legal only because a **B+Tree doesn't store true key values in inner nodes** — you can put whatever routes correctly [`1:10:55`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4255).
- If a later insert invalidates the truncated separator, just update it — updating an inner node implicitly latches its children, since nobody can reach them except through it [`1:11:39`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4299).

## Pointer swizzling

Called out as **"super important"** [`1:12:02`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4322).

- Problem: every hop during a traversal (root → inner → leaf, plus each sibling hop) requires asking the buffer pool to translate a **page ID → memory address**. Done repeatedly, this becomes a **buffer pool bottleneck** [`1:12:28`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4348) [`1:12:55`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4375).
- Fix: store the **raw memory pointer** in the page itself, breaking the page-ID abstraction [`1:12:02`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4322) [`1:13:19`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4399).
- Obvious candidates: **the root** (every traversal goes through it) and hot inner nodes [`1:13:19`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4399).
- Required bookkeeping [`1:13:42`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4422) [`1:14:06`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4446):
  - The swizzled page must be **pinned** in memory.
  - **Never write the memory address to disk** — it would be garbage on reload.
  - Multiple pages may point at the same address, so eviction is arranged hierarchically: a node can't be evicted unless its parent already was.
- Verdict: **"a huge win"**, and applicable to other data structures and parts of the system [`1:14:06`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4446) [`1:14:37`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4477).

## Bulk insert / bulk loading

- Standard advice when loading a table: **drop the indexes, bulk-load the data, then `CREATE INDEX`** — incremental index maintenance is much slower, and index build can be parallelized (caveat: unique constraints need the index to catch violations) [`1:14:37`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4477) [`1:15:04`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4504).
- Algorithm when all keys are known up front: **pre-sort the keys**, fill the leaf nodes with their sibling pointers, then build the tree **bottom-up** instead of top-down [`1:15:04`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4504) [`1:15:20`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4520).
- If the index will rarely be updated, skip the half-full rule and **pack the pages completely full** for maximum compactness [`1:15:20`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4520).
- Some systems build a **throwaway B+Tree** for a single query — sort, build, run, discard — because that beats a sequential scan [`1:15:45`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4545) [`1:16:12`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4572).
