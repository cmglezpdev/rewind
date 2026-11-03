# 8. Proof of the multiplier lemma

## Part (a): distinctness, by induction mod r³

Inductive hypothesis: `m'_1, ..., m'_{t-1}` have been chosen so all sums `b_i + m'_j` are **distinct mod r³**, with `t < r` ([`56:05`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3365), [`57:09`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3429)).

To choose `m'_t`, it must satisfy `m'_t + b_i ≠ b_j + m'_z` for all existing indices — i.e. `m'_t` must **avoid** every value of the form `m'_i - b_j + b_z` ([`57:56`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3476)).

Counting the forbidden values ([`58:39`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3519)):

- there are `r²` pairs `(b_j, b_z)`, and `t` choices of `m'_i` → at most **`t·r²` forbidden values**;
- the available range is **`r³` residues**;
- since `t < r`, `t·r² < r³` — so a valid `m'_t` always exists.

Hence all `m'_i` can be chosen with the sums distinct mod `r³` ([`59:13`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3553)).

## From the `m'_i` to the final `m_i`

Define ([`59:13`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3553)):

```
m_i = m'_i + i·r³ + (w - b_i) rounded down to the nearest multiple of r³
```

Picture: blocks of length `r³`, with each `m'_i` in `[0, r³ - 1]`, and `b_i + m_i` landing **one per block** — `b_0 + m_0` in the first block, `b_1 + m_1` in the second, and so on ([`1:00:20`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3620), [`1:01:01`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3661)).

Role of each term:

| Term | Purpose |
| --- | --- |
| `m'_i` | supplies distinctness mod `r³` ([`1:01:01`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3661)) |
| `i·r³` | pushes each sum into its **own block**, giving property (b), the increasing order ([`1:01:01`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3661), [`1:02:24`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3744)) |
| `(w - b_i)` rounded to a multiple of `r³` | the `w` keeps values from going **negative**; rounding to a multiple of `r³` keeps everything unchanged mod `r³` ([`1:01:26`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3686), [`1:02:49`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3769)) |

Since the added terms are multiples of `r³`, `b_i + m_j mod r³` is unchanged and remains distinct — so the sums themselves are distinct, giving **property (a)** ([`1:01:26`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3686), [`1:01:46`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3706)).

## Loose ends

- The construction may occupy a **constant number of words**, which is fine ([`1:02:49`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3769)).
- Junk bits appear above and below the useful window, but the final **mask and right shift** discard them ([`1:02:49`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3769), [`1:03:15`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3795)).
- `m` is found in **preprocessing**, and the masks are built there too — each mask is a single word with 1s at the r relevant positions ([`53:51`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3231), [`54:05`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=3245)).
