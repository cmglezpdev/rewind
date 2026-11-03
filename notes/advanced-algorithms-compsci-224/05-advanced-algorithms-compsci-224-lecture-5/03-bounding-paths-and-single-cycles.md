# 3. Bounding Paths and Single Cycles

## The method: fix a configuration, then union bound

`E[P_k] = Pr[path of length ≥ k]`. Enumerate every possible path shape, compute the probability of seeing that exact one, and union bound over all of them ([`14:56`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=896), [`15:42`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=942)).

Conventions ([`16:04`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=964), [`16:41`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1001)):

- "Length `k`" means **`k` edges**, hence **`k + 1` vertices**.
- Fix the items `x₂, …, x_{k+1}` (the edges) **and** the `k + 1` hash values (the vertices).
- Vertices *are* hash values: the path existing means e.g. `h(x₂) = g(x₃)`, in one order or the other ([`18:06`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1086)).
- Whatever happens after the first `k` steps is irrelevant — the question is only whether the first `k` steps look like this ([`16:41`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1001), [`17:42`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1062)).

## Probability of one fixed path

Three factors ([`21:12`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1272), [`21:31`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1291), [`21:45`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1305)):

- `1/m` — that `g(x)` lands on the starting vertex.
- `(1/m²)^k` — each of the `k` other items must place **both** of its hash values on the two prescribed vertices.
- `2^k` — for each item, `g` and `h` may be swapped (each edge has two orientations) ([`20:49`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1249)).

## Counting configurations and the union bound

- Vertex choices: at most **`m^{k+1}`** ([`19:02`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1142), [`22:03`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1323)).
- Edge (item) choices: `n(n-1)…(n-k+1) ≤ **n^k**` ([`19:02`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1142), [`22:03`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1323)).

Multiplying and cancelling ([`22:20`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1340), [`22:53`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1373)):

```
E[P_k] ≤ n^k · m^{k+1} · (1/m) · (1/m^{2k}) · 2^k = 2^k · (n/m)^k
```

- **This is exactly why `m = 4n` was chosen**: it turns `(n/m)^k` into `4^{-k}` ([`22:53`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1373)).
- Result: **`E[P_k] ≤ 1/2^k`**, so `Σ_k E[P_k]` is a **convergent geometric series = O(1)** ([`23:13`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1393)).

## Single-cycle configurations `C_k`

The same computation, with one observation to avoid redoing it ([`24:28`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1468)):

- A case-2 configuration splits into **three groups of edges** (the approach segment, the cycle, and the tail after `x` bounces to `h(x)`) ([`24:28`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1468), [`25:10`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1510)).
- By pigeonhole, **at least one group holds ≥ k/3 edges**; bound the probability of seeing the longest group using the path analysis ([`25:10`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1510), [`25:59`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1559)).
- Gives roughly **`E[C_k] ≤ 1/2^{k/3}`** — again a geometric series summing to a **constant** ([`25:10`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1510), [`25:59`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1559)).
