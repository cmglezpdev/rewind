# 5. Amortized Analysis via the Potential Function

**Claim to prove:** the amortized cost of an operation is O(log n) [`45:56`](https://www.youtube.com/watch?v=LbX51mey3vo&t=2756).

Method: the **potential function method** — the same tool used earlier for Fibonacci/binomial heaps, but with a far less intuitive potential ("adding money to a bank account" no longer pictures it) [`45:56`](https://www.youtube.com/watch?v=LbX51mey3vo&t=2756), [`46:59`](https://www.youtube.com/watch?v=LbX51mey3vo&t=2819). One extra tool is needed: **AM–GM** (geometric mean ≤ arithmetic mean) [`47:19`](https://www.youtube.com/watch?v=LbX51mey3vo&t=2839).

## The definitions

| Symbol | Definition | Timestamp |
|---|---|---|
| `w(x)` | An **arbitrary weight** assigned to each item `x` — left free on purpose | [`47:19`](https://www.youtube.com/watch?v=LbX51mey3vo&t=2839), [`47:59`](https://www.youtube.com/watch?v=LbX51mey3vo&t=2879) |
| `s(x)` | `Σ_{z ∈ subtree(x)} w(z)`, including `x` itself | [`47:59`](https://www.youtube.com/watch?v=LbX51mey3vo&t=2879) |
| `r(x)` | `log s(x)` — the **rank** of `x` | [`47:59`](https://www.youtube.com/watch?v=LbX51mey3vo&t=2879), [`48:35`](https://www.youtube.com/watch?v=LbX51mey3vo&t=2915) |
| `Φ` | `Σ_{i=1..n} r(i)` — the sum of all ranks in the structure | [`48:35`](https://www.youtube.com/watch?v=LbX51mey3vo&t=2915), [`49:04`](https://www.youtube.com/watch?v=LbX51mey3vo&t=2944) |

- Primed symbols (`r'(x)`, `s'(x)`) denote values **after** the rotations of the current step [`54:15`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3255).
- The lecturer concedes the potential looks "out of thin air" — "sometimes things are magical" [`49:04`](https://www.youtube.com/watch?v=LbX51mey3vo&t=2944).

## Reduction: find ⇒ splay

- The walk **down** to `x` costs the same as the walk **back up**, so it can be charged to the splay: **cost(find(x)) = O(cost(splay(x)))** [`49:36`](https://www.youtube.com/watch?v=LbX51mey3vo&t=2976), [`50:02`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3002), [`50:24`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3024).
- A splay is a sequence of case-1/2/3 steps, so it suffices to bound the amortized cost of **one step** and sum [`51:17`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3077).
- Only **case 2** is proved in class; case 3 gives the same bound by a similar argument, and case 1 costs one more [`52:19`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3139), [`55:51`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3351).

## Per-step bounds

- **Cases 2 and 3:** amortized cost ≤ `3(r'(x) − r(x))` [`55:12`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3312).
- **Case 1:** amortized cost ≤ `3(r'(x) − r(x)) + 1` [`55:51`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3351).
- Mechanism: actual cost of case 2 = **2** (two rotations, each priced at 1 alongside pointer follows), and `ΔΦ ≤ 3(r'(x) − r(x)) − 2`, so **the `−2` exactly cancels the actual cost** [`52:50`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3170), [`53:33`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3213), [`54:45`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3285).
- Summing over the steps of one splay **telescopes** to `r(root) − r(x)`; `r(root)` is invariant because it sums the weights of the whole tree regardless of which node is root [`54:45`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3285), [`55:12`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3312).
- The `+1` from case 1 is paid **at most once per splay**, in the final step [`1:11:49`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4309).

### Master bound

> **amortized cost of `splay(x)` = O(1) + 3(r(root) − r(x)) = O(1 + log(W / s(x)))**, where `W` is the total weight of all items [`57:03`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3423), [`57:44`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3464), [`1:14:03`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4443).

This single inequality is the whole payoff of the lecture: **every property of splay trees is obtained by plugging in a different weight function** [`1:14:03`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4443).

## Proof of the case-2 bound

1. Only `x`, `y`, `z` change rank — the subtrees `A, B, C, D` keep the same descendant sets [`58:34`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3514), [`59:00`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3540).
   `ΔΦ = r'(x) + r'(y) + r'(z) − r(x) − r(y) − r(z)` [`59:00`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3540).
2. `r'(x) = r(z)` — after the step, `x`'s subtree holds exactly what `z`'s subtree held before, so those terms cancel [`59:32`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3572), [`59:57`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3597).
   `ΔΦ = r'(y) + r'(z) − r(x) − r(y)`.
3. `r(y) ≥ r(x)` (ranks are non-decreasing going up the tree) ⇒ `ΔΦ ≤ r'(y) + r'(z) − 2r(x)` [`1:00:49`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3649), [`1:01:34`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3694).
4. `r'(y) ≤ r'(x)` ⇒ `ΔΦ ≤ r'(x) + r'(z) − 2r(x)` [`1:01:34`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3694).
5. **Bound `r'(z)` using AM–GM** [`1:03:07`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3787), [`1:03:39`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3819), [`1:08:17`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4097), [`1:08:41`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4121):
   `(r(x) + r'(z))/2 = log √(s(x)·s'(z)) ≤ log((s(x) + s'(z))/2)`.
6. **The key structural fact:** `s(x) + s'(z) ≤ s'(x)` — together the old subtree of `x` and the new subtree of `z` contain every node except `y`, all of which sit inside `x`'s new subtree [`1:08:41`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4121), [`1:09:12`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4152).
   Hence `(r(x) + r'(z))/2 ≤ log(s'(x)/2) = r'(x) − 1` [`1:09:12`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4152), [`1:09:44`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4184).
7. Multiply by 2 and move `r(x)` across: **`r'(z) ≤ 2r'(x) − r(x) − 2`** [`1:09:44`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4184), [`1:10:30`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4230).
8. Substituting into step 4: `ΔΦ ≤ 3r'(x) − 3r(x) − 2`, giving amortized case-2 cost ≤ `3(r'(x) − r(x))` [`1:10:30`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4230), [`1:11:15`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4275).

### Subtlety raised from the audience

- A student proposed skipping steps 5–7 and bounding `r'(z) ≤ r'(x)` directly. That does yield `O(r'(x) − r(x))` — but **loses the `−2`**, which is exactly the term needed to cancel the two rotations' actual cost. The AM–GM detour exists to produce that `−2` [`1:04:47`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3887), [`1:07:32`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4052), [`1:07:53`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4073), [`1:08:17`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4097).
- Foreshadowing for the next section: for properties like static optimality or working set, the definition of `Φ` will be **fudged to allow negative values** (ranks may be negative), while still maintaining that ranks are **non-decreasing as you move up the tree** [`1:05:25`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3925), [`1:06:21`](https://www.youtube.com/watch?v=LbX51mey3vo&t=3981), [`1:08:41`](https://www.youtube.com/watch?v=LbX51mey3vo&t=4121).
