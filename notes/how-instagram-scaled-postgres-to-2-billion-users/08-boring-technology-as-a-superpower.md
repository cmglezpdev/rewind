# 8. Boring technology as a superpower

This is the lesson planted at [`1:33`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=93) and paid off here: **boring technology, implemented well, beats new technology** ([`15:21`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=921)).

## The complexity budget

- Every team has a **finite budget of complexity** it can afford to manage ([`15:50`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=950)).
- Every new piece of infrastructure eats into that budget, because you must ([`15:50`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=950)):
  - learn its quirks
  - build operational expertise around it
  - train your team
  - hire for it
- These costs are **very real even though they never show up on a balance sheet** ([`15:50`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=950)).

## Why boring tech is nearly free

Postgres, Linux, Memcached, Nginx cost almost nothing to adopt because ([`16:13`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=973)):

- The team already knows them.
- The internet is already full of answers to your problems.
- Failure modes are **documented in books**.
- The operational tooling has existed for **15+ years**.

## When you *should* spend the complexity budget

Spend it only when you have a **genuinely new problem the boring stuff cannot solve** ([`16:13`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=973)):

- Vector search at scale
- Real-time time-series analytics
- Graph traversal at planet scale

Those are categories where **specialized databases are genuinely required** ([`16:45`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=1005)).

## "A lot of users" is not a new problem

- Having many users is not novel — **every system at scale has a lot of users, and Postgres can handle a lot of users** ([`16:45`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=1005)).
- Proof points cited: **Instagram, Notion, Reddit, GitHub** (for many of its workloads), and **Stripe** at some capacity ([`16:45`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=1005)).
- The core diagnosis of the video ([`16:45`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=1005)):

> The mistake most teams make is not picking the wrong database — it's **switching databases too early**, when the real fix was just to understand their existing database better.
