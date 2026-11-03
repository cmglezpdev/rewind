# 6. Move-to-front is dynamically optimal (Sleator–Tarjan)

## The claim

- For splay trees, **dynamic optimality is still a conjecture**: competitive against trees that may rotate and that know the future ([`30:27`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1827), [`30:59`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1859)).
- For list update the analogous statement is a **theorem**: **move-to-front is dynamically optimal**, i.e. its competitive ratio is a constant independent of `n` ([`31:15`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1875)).

## A stronger model for the adversary

Sleator and Tarjan let the competitor `A` do *more* than MTF can ([`32:04`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1924), [`32:36`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1956)):

- **Free exchanges** — after accessing an item, move it forward for free.
- **Paid exchanges** — at *any* time, pay `1` to transpose an item with its predecessor.

MTF never uses paid exchanges, yet still wins.

**Theorem.** For any algorithm `A` and any access sequence `S` of `m` operations, with `A` and MTF starting from the *same* list order ([`32:51`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1971), [`33:36`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2016), [`34:08`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2048)):

`cost_MTF(S) ≤ 2·cost_A(S) + (paid exchanges of A) − (free exchanges of A) − m`

The same-starting-order assumption is required, otherwise the statement is trivially false ([`34:08`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2048)).

## The potential function proof

- **Potential `Φ` = number of inversions** between MTF's list and `A`'s list: a pair `(i, j)` with `i` before `j` in MTF but `i` after `j` in `A` ([`35:13`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2113), [`36:06`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2166)).
- `total cost = amortized cost + Φ_initial − Φ_final`; `Φ ≥ 0` always and `Φ_initial = 0` (same starting order), so **bounding amortized cost suffices** ([`36:06`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2166), [`36:42`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2202), [`36:58`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2218)).

### Cost of one access

Let `x` be the `i`-th item in `A`'s list and the `k`-th item in MTF's list; let `t` be the number of items before `x` in MTF but after `x` in `A` ([`37:42`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2262), [`38:07`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2287)).

1. **Actual cost** for MTF: `k` ([`37:42`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2262)).
2. Moving `x` to the front **destroys `t` inversions** and **creates `k − t − 1` new ones** (there were `k−1` items ahead of it) ([`39:16`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2356), [`39:45`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2385)).
3. So `ΔΦ = (k − t − 1) − t = k − 2t − 1`, and the **amortized cost is `k + ΔΦ = 2k − 2t − 1`**, written in the lecture as `2k − t − 1` in shorthand ([`40:15`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2415)).
4. Key counting step: the `k − t − 1` non-inverted items sit before `x` in **both** lists, but `A`'s list has only `i − 1` slots before `x`, so `k − t − 1 ≤ i − 1` ([`42:02`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2522), [`43:10`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2590)).
5. Therefore **amortized cost ≤ 2i − 1**, where `i` is exactly what `A` pays for that access ([`41:42`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2502), [`43:10`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2590)).

Summing over the sequence gives the factor `2` and the `−1` per operation gives the `−m` term ([`43:10`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2590)).

### Cost of `A`'s exchanges

- A **free exchange** by `A` (moving a just-touched item forward one) **decreases `Φ` by exactly 1** ([`43:42`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2622)).
- A **paid exchange** by `A` **increases `Φ` by at most 1** ([`43:42`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2622)).

That completes the proof ([`44:08`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2648)).
