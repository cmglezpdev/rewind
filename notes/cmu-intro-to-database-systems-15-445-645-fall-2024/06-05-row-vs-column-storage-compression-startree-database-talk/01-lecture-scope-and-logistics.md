# 01 — Lecture scope and logistics

## Course logistics

- Homework 2 released, due Sunday September 22 — three multiple-choice questions, submitted in Gradescope ([`0:27`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=27)).
- Project 1 (buffer pool manager) is live: write-up on the website, code and Piazza announcement posted; recitation Wednesday 6 p.m. ([`0:27`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=27)).
- Advice: read the Project 1 write-up beforehand so recitation questions are about approach, not "what's a buffer manager" ([`1:14`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=74)).
- The buffer pool manager lecture lands Monday ([`1:14`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=74)); industry-partner visit day is Monday/Tuesday with research talks and info sessions, including Confluent ([`1:46`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=106)).

## Where this lecture sits

- This is the **last lecture on the storage layer** — the bottom layer of the DBMS ([`0:27`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=27)).
- Prior lectures covered write-optimized approaches ([`2:25`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=145)):
  - Tuple-oriented storage with slotted pages.
  - Log-structured storage — append changes; writes get faster, reads get slower.
  - Index-organized storage — a B+Tree whose leaf nodes hold the data itself.
- Those approaches serve **write-heavy** workloads (inserts/updates/deletes/upserts) ([`3:07`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=187)).
- Today's target is the opposite: **read-only analytical queries** where `SELECT` speed matters, not insert speed ([`3:34`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=214)).

## Agenda

1. Categorize database workloads and fix the vocabulary for the rest of the semester ([`4:05`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=245)).
2. Storage models — how tuples are physically represented ([`4:20`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=260)).
3. Compression, which the column-store layout unlocks ([`4:30`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=270)).
4. Guest talk from StarTree, an analytical system built on the columnar approach ([`4:30`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=270)).
