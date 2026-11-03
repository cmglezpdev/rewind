# 01 — Lecture Logistics and Scope

## Where this lecture sits in the course

- This is the **last real lecture covered by the final exam**; the next class is a prep/review session [`0:29`](https://www.youtube.com/watch?v=L6E75IyBgpk&t=29).
- Instead of the usual student vote on which systems to cover, the instructor decided to **cram the 15-721 (advanced) content into one lecture** because he is not teaching 721 next semester [`0:29`](https://www.youtube.com/watch?v=L6E75IyBgpk&t=29).
- Next class walks through real systems — **ClickHouse, BigQuery, Snowflake, Databricks, Yellowbrick** — to show how the semester's primitives get assembled into shipping products [`0:57`](https://www.youtube.com/watch?v=L6E75IyBgpk&t=57).
- The stated payoff: when a vendor claims their system "does amazing things", you read the docs and recognize it as a recombination of known techniques, not something new [`0:57`](https://www.youtube.com/watch?v=L6E75IyBgpk&t=57) [`1:21`](https://www.youtube.com/watch?v=L6E75IyBgpk&t=81).

## Administrivia

- Project 4 due **December 8**; Homework 6 due **December 9** [`1:21`](https://www.youtube.com/watch?v=L6E75IyBgpk&t=81).
- Saturday TA session on the **7th**, same time/location as before [`1:44`](https://www.youtube.com/watch?v=L6E75IyBgpk&t=104).
- Final exam **December 13**; practice final released the following day [`1:44`](https://www.youtube.com/watch?v=L6E75IyBgpk&t=104).
- The final is **not cumulative** — it covers material since the midterm, though foundational concepts (SQL, buffer pool) are still assumed [`1:44`](https://www.youtube.com/watch?v=L6E75IyBgpk&t=104) [`2:21`](https://www.youtube.com/watch?v=L6E75IyBgpk&t=141).
- Three-hour slot, but roughly the same number of questions as the midterm [`2:32`](https://www.youtube.com/watch?v=L6E75IyBgpk&t=152).

## Lecture roadmap

The lecture is organized in four parts [`16:59`](https://www.youtube.com/watch?v=L6E75IyBgpk&t=1019):

1. Distributed query **execution**
2. Distributed query **planning** (briefly)
3. Distributed **join algorithms** (the bulk of the time)
4. A preview of **cloud systems**

Framing: last class covered distributed *transactional* systems; this one covers what changes architecturally for *analytical* systems spread across nodes [`3:32`](https://www.youtube.com/watch?v=L6E75IyBgpk&t=212).
