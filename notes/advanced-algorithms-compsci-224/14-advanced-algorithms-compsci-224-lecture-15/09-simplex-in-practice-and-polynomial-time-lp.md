# 09 — Simplex in practice vs. polynomial-time LP

## The worst-case verdict

- **No known pivoting rule runs in sub-exponential time**, and certainly **none runs in polynomial time** [`1:24:46`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=5086).
- Consequently **no implementation of Simplex is theoretically fast** [`1:25:25`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=5125).
- Yet **Simplex is still heavily used today** because it is fast in practice on the real LPs people want to solve [`1:24:25`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=5065), [`1:25:25`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=5125).

## The polynomial-time alternatives

| Algorithm | Polynomial time? | Practical? |
| --- | --- | --- |
| Simplex | No (exponential worst case, all known rules) | Yes — the workhorse in practice [`1:25:25`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=5125) |
| **Ellipsoid** — the *first* polynomial-time LP algorithm | Yes | No — impractical, largely unused for that reason [`1:25:25`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=5125) |
| **Interior-point methods** | Yes, and faster | Yes — to be covered later [`1:25:50`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=5150) |
