# 5. The Power of Two Choices

A second, unrelated way to exploit having two hash functions — the last hashing topic of the course ([`43:34`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2614), [`44:13`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2653)).

## Baseline: hashing with chaining / balls into bins

- Hash table of `m` cells, each cell a pointer to a **doubly linked list** of the items hashing there ([`44:37`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2677)).
- Query time = length of that list ([`46:53`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2813)).
- With `m = n` and a **perfectly random** `h`, this is `n` balls into `n` bins; the heaviest bin holds **Θ(log n / log log n)** balls — better than `log n`, but not much better ([`45:14`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2714), [`46:26`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2786)).
- With a merely **2-wise independent** `h`, expected query time is `O(1)`, and w.h.p. the worst case is at most `log n / log log n` ([`46:53`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2813), [`47:10`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2830)).
- Goal: keep the constant expectation **and** get a much better worst case ([`47:10`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2830)).

## The scheme — Azar, Broder, Karlin, Upfal (SICOMP '99)

([`47:27`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2847))

- Pick **two** random hash functions `g` and `h`.
- **Insert `x`**: place it in the **least loaded** of `A[g(x)]` and `A[h(x)]`.
- **Query `x`**: search **both** locations ([`48:45`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2925)).
- In balls-and-bins terms: sample two bins per ball, drop it into the smaller ([`48:45`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2925)).

## The result

- W.h.p. the heaviest bin has **`ln ln n / ln 2 + Θ(1)`** items ([`49:39`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2979)).
- The distribution is **tightly concentrated**: that value **± a constant** ([`50:23`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3023)).
- This is an **exponential improvement** — roughly `log n` down to `log log n` — from a trivially simple change ([`50:23`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3023)).

## Power of `d` choices — diminishing returns

- Natural extension: hash to `d` locations, insert into the least loaded; query cost rises by a factor of `d` in expectation ([`50:52`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3052)).
- Result: **`ln ln n / ln d`** ([`51:17`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3077)).
- **The jump is all in the first extra choice**: 1 → 2 goes `log` → `log log`; 2 → `d` only changes the **base of the log**, i.e. a constant factor ([`51:17`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3077), [`51:57`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3117)).

## Vöcking's variant — asymmetry beats randomness

Stated without proof ([`52:19`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3139), [`52:40`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3160)):

1. Split the bins into **`d` groups of `n/d`** bins each.
2. Probe **one random location per group** (not `d` free random locations) ([`53:25`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3205)).
3. Insert into the least loaded, breaking ties by taking the **leftmost** bin — counter-intuitively *not* a random tie-break ([`53:25`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3205), [`54:12`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3252)).

- Heaviest load becomes **`ln ln n / d`**, with the exact constant proved ([`54:44`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3284)).
- Interpretation: the effective **log base goes from `d` to `e^d`** — an exponential gain over plain power-of-`d`, purely from the group structure plus the deterministic tie-break ([`54:44`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3284), [`55:10`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3310)).

| Scheme | Max load w.h.p. |
| --- | --- |
| 1 choice (plain chaining) | `Θ(log n / log log n)` ([`46:26`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2786)) |
| 2 choices | `ln ln n / ln 2 + Θ(1)` ([`49:39`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2979)) |
| `d` choices | `ln ln n / ln d` ([`51:17`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3077)) |
| Vöcking (`d` groups, leftmost tie-break) | `ln ln n / d` ([`54:44`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3284)) |

## Further reading

- Survey on multiple-choice load balancing by **Mitzenmacher, Richa and Sitaraman** ([`56:25`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3385), [`57:05`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3425)).
