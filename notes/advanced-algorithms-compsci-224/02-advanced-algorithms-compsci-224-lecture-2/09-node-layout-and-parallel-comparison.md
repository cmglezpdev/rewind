# 9. Node layout and parallel comparison

## What is stored at a fusion tree node

For a node with `x_0 < ... < x_{k-1}`, precompute the word ([`1:04:09`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3849), [`1:04:34`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3874)):

```
NODE_SKETCH = 1 · sketch(x_0) | 1 · sketch(x_1) | ... | 1 · sketch(x_{k-1})
```

Each block is a **sentinel 1 bit** followed by that key's sketch ([`1:04:34`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3874)).

## Replicating the query

Define the k-fold repetition ([`1:05:15`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3915)):

```
SKETCH^k(q) = 0 · sketch(q) | 0 · sketch(q) | ... | 0 · sketch(q)
```

- Built **on the fly** in `O(1)` with a **single multiplication** by a constant `1 0...0 1 0...0 1 0...0` ([`1:06:58`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=4018), [`1:07:22`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=4042)).
- `NODE_SKETCH` itself is formed in preprocessing ([`1:06:58`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=4018)).

## The subtraction trick

Compute `NODE_SKETCH − SKETCH^k(q)` ([`1:05:15`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3915)):

- **No carries cross block boundaries**, because each stored block leads with a 1 and each query block leads with a 0, making the stored block strictly larger ([`1:06:04`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3964)).
- Each block ends up as a **0 or 1 leading bit** followed by junk; mask the junk away ([`1:06:23`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3983), [`1:06:58`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=4018)).
- Semantics: the leading bit is **0 exactly when the 1 had to be borrowed**, i.e. when `sketch(x_i) < sketch(q)` ([`1:08:30`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=4110), [`1:08:48`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=4128)).
- Because the keys are sorted, the pattern is **monotone**: zeros first, then ones. The **first 1** marks the first key the query is smaller than ([`1:08:48`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=4128), [`1:09:07`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=4147)).

## Finding the first 1 without calling MSB

Taking the MSB here would be correct, but is **deliberately avoided** — MSB itself is later implemented using this parallel-comparison trick, so calling MSB here would be circular ([`1:07:22`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=4042), [`1:07:46`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=4066)).

Instead, exploit **monotonicity**: the position of the first 1 equals `k` minus the **count of 1s**, so counting the 1s suffices ([`1:09:07`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=4147), [`1:09:21`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=4161)).

**Counting by multiplication** ([`1:09:21`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=4161), [`1:10:07`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=4207), [`1:10:55`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=4255)):

1. Multiply the masked result by `1 0 0 1 0 0 1 0 0 ...` — each surviving 1 gets copied into every block position.
2. All the copies **align and sum at one position**, so that position holds the total number of 1s ([`1:11:21`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=4281)).
3. No interference: the count is between 0 and k, using at most `log k` bits, while each block is `~k^4` wide ([`1:11:56`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=4316), [`1:12:15`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=4335)).
4. Mask a `log k`-wide window around that position and shift it down — the value is **exactly the number of 1s** ([`1:12:15`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=4335)).

**Net result:** the query is compared against **all k keys simultaneously** in a constant number of machine word operations ([`1:12:44`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=4364)).
