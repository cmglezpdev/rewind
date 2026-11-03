# 9. The analogy: LP constraints as experts

## The mapping

- Given a candidate point `x`, define the cost vector entry `mᵢ = aᵢ·x − bᵢ` — the **slack of constraint `i`** [`1:16:04`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=4564) [`1:17:21`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=4641).
- **Each constraint (row of `A`) is an expert** [`1:18:42`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=4722).
- Open normalization detail: `mᵢ` must land in `[−1, 1]`; the lecturer explicitly defers this normalization to the next lecture, having confused himself on it live [`1:17:21`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=4641).

## Reading the sign correctly

The polarity looks backwards at first [`1:18:42`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=4722):

| `mᵢ = aᵢ·x − bᵢ` | Meaning for the LP | Meaning as an "expert" |
| --- | --- | --- |
| Positive (large slack) | Constraint comfortably satisfied → easy | Expert was very "wrong" |
| Negative | Constraint violated → hard | Expert was "right" |

- The right mental model: **experts predict whether constraint `i` is hard**. Large slack means the constraint was easy, so the expert who called it hard was wrong [`1:19:18`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=4758) [`1:19:35`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=4775).

## Why this is exactly what we want

- MW down-weights experts who are wrong, so it **shifts weight away from well-satisfied constraints and onto unsatisfied ones** [`1:19:35`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=4775) [`1:19:53`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=4793).
- Since the goal is approximate feasibility of *all* constraints, spending future iterations on the constraints still violated is precisely the correct effort allocation [`1:19:53`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=4793) [`1:20:41`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=4841).

## Deferred to the next lecture

- The iteration-count analysis: how many MW rounds are needed for the `ε`-approximate feasibility guarantee [`1:20:59`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=4859).
- What property of the convex set `P` is actually required (the oracle) [`1:20:59`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=4859).
- The normalization of `mᵢ` into `[−1, 1]` [`1:17:21`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=4641).
- After that, the course leaves LP solving behind entirely and starts a new topic [`1:21:19`](https://www.youtube.com/watch?v=R9mT5CtdHLg&t=4879).
