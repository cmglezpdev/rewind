# 7. Approximate sketching via multiplication

## Why masking alone is not enough

- Masking with a precomputed word isolates the branch bits with one bitwise AND ([`38:01`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2281), [`38:35`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2315)).
- But the result still occupies **w bits**, so `w^(1/5)` keys still need `w^(6/5)` bits of space — no compression at all ([`38:35`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2315), [`39:27`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2367)).
- Preprocessing *could* build perfect r-bit sketches for the stored `x_i`, but **`q` arrives online**, so the sketch operation must be applicable to `q` in constant time too ([`40:24`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2424), [`40:43`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2443), [`41:03`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2463)).

## The relaxation: approximate sketches

- Perfect compression would reach `r` bits; instead settle for **`r^4` bits**, with a known amount of **0-spacing** between the important bits ([`38:53`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2333), [`39:27`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2367)).
- Why `r^4` is acceptable: `r^5 = w`, so `r^4 = w^(4/5) < w` — the compression from a width of `w` down to `w^(4/5)` is what makes the node fit ([`38:53`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2333), [`53:31`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3211), [`53:51`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3231)).
- **This is why `k = w^(1/5)` was chosen** — the exponent budget comes out of this lemma ([`37:37`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2257)).
- Both the `x_i` **and** their sketches are stored; sketches could equally be recomputed on the fly, and storing them is still linear space ([`41:17`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2477), [`41:32`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2492), [`41:49`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2509)).

## The multiplication idea

Take `x` already masked to its important bits, `x = Σ_{i=0..r-1} x_{b_i} · 2^{b_i}`, and a multiplier `m = Σ_i 2^{m_i}` with exactly **r one-bits** ([`45:54`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2754), [`47:05`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2825)).

Then `x · m = Σ_i Σ_j x_{b_i} · 2^{b_i + m_j}` — **r² cross terms** ([`49:08`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2948)).

The `b_i` are increasing; the `m_i` are **arbitrary**, not necessarily increasing or a permutation of the `b_i` ([`47:25`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2845), [`54:24`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3264)).

## The lemma

There exist `m_i` such that ([`47:25`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2845), [`48:09`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2889), [`48:42`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2922)):

- **(a)** all `r²` sums `b_i + m_j` are **distinct** ([`48:09`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2889));
- **(b)** the diagonal sums are increasing: `b_0 + m_0 < b_1 + m_1 < ... < b_{r-1} + m_{r-1}` ([`48:09`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2889));
- **(c)** the spread is small: `(b_{r-1} + m_{r-1}) - (b_0 + m_0) = O(r^4)` ([`48:42`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2922)).

Why each property matters:

- **(a)** guarantees no two terms share a power of 2, so there are **no carries** to corrupt the product ([`49:41`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2981)).
- Only the **r diagonal positions** `b_i + m_i` are read; bit `x_{b_i}` is recovered from the power of 2 at `b_i + m_i` ([`49:41`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=2981), [`52:42`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3162)). This is why (b) only constrains the `i = j` terms ([`52:20`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3140)).
- **(c)** bounds the surviving bits inside a window of width `r^4`, so a shift brings them down to a contiguous low-order block ([`50:17`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3017), [`51:25`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3085), [`51:39`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3099)).

Note: `x` and `m` are full **w-bit** words with only r nonzero bits each; `b_i ≤ w` and `m_i ≤ w²`, so `b_i + m_i` is **not** bounded by `2r` ([`51:01`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3061), [`51:39`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3099)).

## The sketch algorithm — 4 operations, O(1)

1. **Mask** `x` down to the branch bits `b_i` (mask precomputed) ([`54:48`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3288), [`54:05`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3245)).
2. **Multiply** by `m` (found in preprocessing) ([`54:48`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3288)).
3. **Mask** out everything except the r positions `b_i + m_i` ([`54:24`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3264), [`54:48`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3288)).
4. **Shift right** by `b_0 + m_0` so the block starts at the least significant bit ([`55:43`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3343)).

Result: a sketch fitting in `r^4` bits, computed with **a mask, a multiplication, another mask, and a shift** — four word operations, so `O(1)`, and applicable to an online query `q` ([`1:03:15`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3795), [`1:03:39`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3819), [`55:43`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3343)).
