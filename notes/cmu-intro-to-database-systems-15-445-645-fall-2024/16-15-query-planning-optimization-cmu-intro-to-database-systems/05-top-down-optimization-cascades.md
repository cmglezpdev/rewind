# 05 — Top-down optimization (Volcano / Cascades)

## Core idea

- Start from the **logical plan of the desired output** and search *downward*, adding physical operators until you reach the leaves ([`46:30`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=2790), [`47:02`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=2822)).
- It's a **branch-and-bound** search: if the partial cost of a branch already exceeds the best complete plan cost seen so far, stop traversing — cost only increments, it can never magically get better ([`33:07`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1987), [`47:02`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=2822), [`47:20`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=2840), [`51:45`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3105)).
- **This pruning is the key advantage** — you cannot do it in the bottom-up dynamic-programming approach ([`52:23`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3143)).

## Provenance

- Invented by **Goetz Graefe** (the same person behind Volcano and the B+Tree work) in the 1990s; the paper is **Cascades** ([`47:20`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=2840)).
- The paper is "inscrutable" — you cannot build anything from it directly. Microsoft hired Graefe and paid him a lot of money to build SQL Server's optimizer on it in the 1990s ([`47:20`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=2840)).
- **Microsoft SQL Server** uses this approach. Pavlo's assessment: Umbra held the "best optimizer" crown for a while, but SQL Server is getting much better and is likely to reclaim it ([`47:20`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=2840), [`47:57`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=2877)).
- The new system being built at CMU uses top-down; Pavlo prefers it because it's easier to reason about than DP — "the Germans disagree" ([`46:30`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=2790), [`54:23`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3263)).

## The three rule kinds

| Rule kind | Transformation | Notes |
|---|---|---|
| Logical → logical | `A ⋈ B` ⟷ `B ⋈ A` | Equivalence rewrites; can be applied freely in both directions ([`48:19`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=2899), [`48:57`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=2937)) |
| Logical → physical | `join(A,B)` → `hash_join(A,B)` | One-directional; never physical back to logical ([`48:19`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=2899)) |
| **Enforcer rules** | Insert operators to guarantee a required physical property | Active from the very start of the search, not bolted on afterwards ([`51:14`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3074), [`52:23`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3143)) |

## Walkthrough (same 3-way join, sorted by artist ID)

1. Start with the logical goal at the top, **including the required physical property** — output sorted on artist ID ([`48:19`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=2899)).
2. Ask "what operator below me produces this output?" — e.g. a merge join with a **placeholder** for `A1 ⋈ A2` feeding into it: you know *what* must arrive, not yet *how* it's produced ([`49:22`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=2962), [`50:12`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3012)).
3. Recurse: what produces `A1 ⋈ A2`? Could be a hash join, could be a merge join; each is costed as you descend ([`50:42`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3042), [`50:54`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3054)).
4. **Enforcer in action**: the top requires sorted-on-artist-ID output. A hash join is inherently unsorted → prune that branch immediately, no need to explore below it. A quicksort/`ORDER BY` operator *can* satisfy it, so that branch is explored ([`51:14`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3074), [`51:45`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3105)).
5. **Bound check**: if `cost(hash join) + cost(quicksort)` already exceeds the cheapest complete plan found, prune without descending ([`51:45`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3105)).

## The memo table

**Q&A — how do you estimate join sizes when searching top-down, since sizes come from the leaves?** You must reach the bottom **at least once**. You then **memoize** the result in a memo table: on a later branch, if you've already costed the path under `A1 ⋈ A2`, reuse the stored cost instead of recomputing ([`52:47`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3167), [`53:03`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3183), [`53:48`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3228)).

## Graefe's own verdict

When Graefe won a Test of Time award at SIGMOD a few years ago, he argued the best design is a **hybrid**: run Cascades first to sketch a rough plan outline, then use dynamic programming (the German hypergraph approach) for join ordering. **Nobody actually does this yet** ([`53:48`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3228)).

## Bottom-up vs top-down at a glance

| | Bottom-up (System R) | Top-down (Cascades) |
|---|---|---|
| Start | Nothing — build up from the tables | The desired output, work down ([`32:49`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1969), [`33:07`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=1987)) |
| Method | Dynamic programming, divide & conquer | Branch-and-bound search with memoization |
| Pruning by cost bound | Not possible ([`52:23`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3143)) | Yes — core of the design |
| Physical properties | Bolted on as a hack in System R ([`42:49`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=2569)) | First-class, via enforcer rules from the start ([`52:23`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=3143)) |
| Used by | Most open-source systems ([`33:52`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=2032)) | Microsoft SQL Server ([`47:20`](https://www.youtube.com/watch?v=X8EHO8VLeG0&t=2840)) |
