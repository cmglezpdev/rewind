# 02 — Processing Models: The Design Space

## Definition

- A **processing model** defines how the DBMS executes a query plan and how it moves data from one operator to the next ([`7:40`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=460)).
- Like row stores vs. column stores, the choice is a trade-off: one model suits **OLTP**, another suits **OLAP** ([`7:40`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=460)).

## Two orthogonal mechanisms

- **Control flow** — how the DBMS tells an operator "it's your turn, produce output" ([`8:11`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=491)).
- **Data flow** — where and how an operator sends its results ([`8:47`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=527)).
- In the **iterator model** these two are deliberately blurred: the same mechanism that requests data (`next`) is also the one used to say "stop, I have enough" ([`8:47`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=527), [`18:37`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=1117)).

## What an operator emits

Depends on the model and storage layout ([`9:01`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=541), [`9:14`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=554)):

- The entire tuple, or a **subset of attributes** (natural for a column store).
- **One** tuple, **all** tuples, or **some** tuples.

## The three models

| Model | Granularity | Prevalence |
| --- | --- | --- |
| **Iterator** (Volcano / pipeline) | one tuple per call | the most common; "postgres, MySQL, Oracle, DB2, Mongo" ([`9:39`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=579)) |
| **Materialization** | all tuples at once | very rare — "probably five systems in the world that I know of" ([`9:39`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=579)) |
| **Vectorized / batch** | a batch of tuples | hybrid; dominant in OLAP for the last ~10 years — Snowflake, Databricks ([`10:07`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=607)) |

## A second, orthogonal decision

- Beyond the model itself: is data moved **top-to-bottom (pull)** or **bottom-to-top (push)**? This is independent of the processing model and is covered separately ([`10:07`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=607)).
