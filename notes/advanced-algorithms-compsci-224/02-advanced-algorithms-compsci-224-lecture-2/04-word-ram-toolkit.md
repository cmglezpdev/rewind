# 4. The Word-RAM toolkit

Van Emde Boas trees only exploited that **keys are also memory addresses**, which is how they beat the comparison-based lower bound ([`8:59`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=539)). Fusion trees go "way more overboard" with Word-RAM power — expect heavy bit tricks ([`9:52`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=592)).

## The four ingredients

1. **Multiplication** — exploit that multiplying word-sized numbers is `O(1)`. A later variant of fusion trees avoids multiplication entirely, but is not presented here ([`9:52`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=592), [`10:23`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=623)).
2. **Sketch compression** — the k keys cannot all fit in a word, so they must be compressed ([`10:23`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=623)).
3. **Word-level parallelism** — compare the query against **all keys simultaneously** with a constant number of word operations ([`10:52`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=652)).
4. **Most significant set bit (MSB)** in `O(1)` — a subroutine needed by the others ([`11:20`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=680)).

## MSB warm-up: how fast can you find it?

| Approach | Time | How |
| --- | --- | --- |
| Naive loop | `O(w)` | loop from bit `w-1` down to 0, bitwise-AND a mask, test for 0 ([`11:48`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=708), [`12:02`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=722)) |
| Binary search | `O(log w)` | find the largest `i` with `x > 2^i`; `2^i` is a single left shift, so each iteration is `O(1)` ([`12:19`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=739)) |
| **Word-RAM trick** | `O(1)` | proved at the end of the lecture ([`12:36`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=756)) |

## Practical caveat on "constant time"

- On real hardware you rarely exceed 64-bit ints, where `log log w ≈ 6`; the constant-time method uses a constant number of operations but **probably more than 6** ([`13:09`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=789)).
- The asymptotic win only materializes at much larger word sizes (1024-bit ints and beyond) ([`13:26`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=806)).
