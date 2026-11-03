# 03 — The Iterator Model (Volcano / Pipeline Model)

## API

Every operator implements a small, uniform interface ([`10:49`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=649), [`11:49`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=709)):

- `next()` — return the next output tuple; the parent calls it repeatedly.
- `open()` — set up operator state (e.g. instantiate a B+Tree iterator for an index scan).
- `close()` — clean up (e.g. destroy the iterator).

- End of stream is signalled by returning a **null pointer / EOF marker**, meaning "never call `next` on me again" ([`10:49`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=649), [`11:20`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=680)).

## Why the uniform API matters

- A parent operator does not care **how** its child produces data — network, index, sequential scan on a local file, or a subquery ([`11:20`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=680), [`11:49`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=709)).
- Operators become freely **composable** and intermixable ([`11:20`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=680)).
- A child may internally do something expensive (e.g. scan all of `R` into a buffer) and still return exactly one tuple per `next()` — the parent cannot tell and does not care ([`17:27`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1047)).

## Names

- Also called the **Volcano model**, after Goetz Graefe's famous paper on a query optimizer and processing model (the same author as the B+Tree book referenced earlier in the course); the paper also extended it to parallel queries ([`12:22`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=742)).
- Also called the **pipeline model**, because a tuple "rides" all the way up the pipeline on one `next` call ([`12:52`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=772)).

## Execution walkthrough (R ⨝ S with a filter on S)

1. The DBMS calls `next()` on the **root** (projection) ([`13:44`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=824)).
2. That is a **blocking call** that recurses down into the join ([`14:07`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=847)).
3. The join must first **build its hash table**: it loops calling `next()` on the left child (scan `R`), inserting each tuple, until EOF ([`14:07`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=847), [`14:45`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=885)).
4. Only then does it call `next()` on the right side: filter → scan `S`, one tuple at a time ([`15:03`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=903), [`15:33`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=933)).
5. A surviving tuple probes the hash table; on a match, a tuple pops out at the top ([`15:33`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=933)).

- Each operator is essentially a **for loop** over a data source, and `emit` behaves "almost like a `yield`… if you've written like a Python generator" ([`13:07`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=787), [`14:07`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=847)).
- Clarification from a student question: one `next()` yields **one** tuple; control returns and resumes where it left off on the following call ([`16:43`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1003)).

## Advantages

- **Easiest to implement** — this is what BusTub (the course system) uses ([`18:03`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1083)).
- **Easy to debug** — you can literally walk the function calls ([`18:03`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1083)).
- **Trivial output control**: implementing `LIMIT 10` means simply stopping after 10 `next()` calls — no extra mechanism in the operators ([`18:37`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1117), [`34:37`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2077)).

## Disadvantages

- Control flow and data flow are **entangled**: there is no easy way for an outside party to say "stop scanning, kill this query" once the stack has recursed into the plan — you need a side-channel kill mechanism ([`18:37`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1117), [`19:08`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1148)).
- **Per-tuple function-call overhead**: in C++ each `next()` goes through a virtual function table lookup; the CPU cost matters a lot in a well-tuned in-memory system, and matters little when you are spilling to disk anyway ([`34:58`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=2098)).

## Where it is used

- "Pretty much every single data system out there"; anything that is a **row store** is doing something like this ([`18:03`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1083), [`19:57`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1197)).
