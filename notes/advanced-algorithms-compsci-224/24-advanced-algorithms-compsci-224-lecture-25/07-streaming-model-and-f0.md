# 7. The streaming model and the `F₀` problem

## What streaming is

- Streaming is really just **small-space data structures** [`49:20`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=2960).
- Object maintained: a high-dimensional vector `x ∈ R^n` (or a matrix); this lecture is about a vector problem [`49:20`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=2960).
- Like any data structure, we want to support **updates** to `x` and **queries** about `x` [`50:16`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=3016).

## The turnstile model

- Term due to **Muthukrishnan**, roughly '05 [`50:16`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=3016), [`51:17`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=3077).
- Each update is a pair `(i, v)` and causes `x_i ← x_i + v` [`51:17`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=3077).
- `x` **starts as the zero vector** at the beginning of the stream [`51:17`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=3077).

## Running example — a router

- `n` = number of IP addresses (`2^32`, or `2^128` for IPv6); `x_i` = number of packets sent to address `i` [`51:59`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=3119).
- Every observed packet is an update `(i, 1)` [`52:30`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=3150), [`52:40`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=3160).
- Example queries: *what is `x_i`?*, or *what is the support size of `x`* (how many addresses received traffic?) [`52:40`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=3160), [`53:09`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=3189).

## The goal: beat the trivial solutions

- Trivial options: **remember `x`** (`n` space) or **remember the whole stream** (`m` space, `m` = stream length) [`53:09`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=3189), [`54:04`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=3244).
- The goal of a streaming algorithm is **much less space than either** — a router seeing IPv6 traffic has neither `2^128` space nor room for every packet ever seen [`54:04`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=3244), [`55:06`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=3306).

## The problem studied: `F₀` (distinct elements)

- Restricted setting for the rest of the lecture [`55:21`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=3321), [`56:05`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=3365):
  - **Only one query type**: the **support size**, denoted `F₀` for historical reasons.
  - **All updates have `v = 1`** (in general negative updates would be allowed).
- Plain-English version: *how many distinct IP addresses received traffic today?* [`56:05`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=3365).

## Exact space of the trivial solutions

- **`n` bits**: a bit string whose `i`-th bit is 1 if address `i` was ever seen [`56:29`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=3389).
- **`m · log n` bits**: remember the whole stream, since each element is an index costing `log n` bits [`56:29`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=3389), [`56:47`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=3407).
