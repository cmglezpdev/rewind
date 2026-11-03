# 05 — The Vectorization / Batch Model

## Motivation: the middle ground

For OLAP, neither extreme works ([`26:11`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1571)):

- Iterator model → calling `next()` a billion times is too expensive.
- Materialization model → materializing everything blows out memory and prevents breaking work up for parallelism.

## How it works

- Same shape as the iterator model, but `next()` returns a **batch (vector) of tuples** instead of one ([`26:49`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1609)).
- Typical batch size cited: **~1024 tuples** ([`26:49`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1609)).
- The receiving operator processes the whole batch before requesting the next one ([`27:04`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1624)).
- Implementation detail: the operator fills an output buffer and emits it when it exceeds a size threshold; leftover partial buffers are flushed after the loop ([`28:11`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1691), [`28:41`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1721)).

## Tricks enabled by batches

- **Constant vectors**: if every value in a batch is identical (e.g. `id = 1`), store the value once with a count instead of a full vector — run-length-encoding style. DuckDB does this under the covers ([`27:35`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1655), [`27:57`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1677)).
- **Compression in flight**, e.g. delta encoding, because the batch is now columnar data ([`27:57`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1677)).
- These tricks are impractical on a single tuple and unwieldy on the full materialized output ([`27:19`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1639)).

## Origin

- Invented only around **2006–2007**, in **MonetDB/X100** — an attempt to run MonetDB well on modern CPUs, during which the materialization model was identified as one of the slow parts. The code was forked into a high-performance vectorized system ([`26:32`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1592), [`29:01`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1741)).
- Terminology warning: searching "vectorization database" today returns vector-DB and SIMD results — **SIMD is a separate topic**, covered next class ([`29:01`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1741), [`29:38`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1778)).

## Why modern CPUs love it

- Operators become **kernels** doing the same operation repeatedly over a stride of memory ([`29:38`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1778)).
- CPUs dislike indirection and instruction variety; "if you can say here's a stride of memory, do the exact same thing a thousand times, CPUs love that" ([`30:18`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1818)).

## Adoption and the rule of thumb

- Essentially **every OLAP system of the last 15 years** uses it, and older ones were retrofitted ([`29:38`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1778)).
- Summary rule ([`30:18`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1818)):
  - Row store / OLTP → **iterator model**
  - OLAP → **vectorization model**
  - Materialization → rare; only for OLTP where performance demands it
