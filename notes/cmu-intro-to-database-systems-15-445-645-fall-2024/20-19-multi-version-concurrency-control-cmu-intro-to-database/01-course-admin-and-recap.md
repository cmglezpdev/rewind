# 01 — Course admin and recap of timestamp ordering

## Administrivia

- Project 3 due Sunday the 17th at midnight; Project 4 released that same week [`0:30`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=30).
- Final exam: **Friday, December 13th at 8:30 a.m.** No early exams under any circumstance — do not make travel plans [`0:30`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=30) [`0:56`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=56).
- TA applications open for next semester (BusTub maintenance) [`1:26`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=86).
- Upcoming talks: InfluxDB co-founder/CTO (third CMU talk, system now built on DataFusion), Camille Fournier (SCS alum, ex-CTO of Rent the Runway, Apache ZooKeeper PMC), and GlareDB [`1:44`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=104) [`2:22`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=142) [`2:51`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=171).
- Plan for the lecture: cover MVCC design decisions, then run live transactions against PostgreSQL to prove the theory matches reality [`0:30`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=30).

## The two notions of time carried over from timestamp ordering

- **Physical time** — wall-clock order in which events actually occur in the real world [`3:10`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=190).
- **Logical time** — the commit order, i.e. when changes actually got saved to the database [`3:10`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=190).

## How MVCC differs from OCC

- OCC used a **private workspace**: stage changes, run a validation step (did I miss updates I should have seen? will anyone else miss mine?), then install to the global database [`3:49`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=229).
- MVCC "looks the exact same thing except now there isn't going to be the private workspace" — the versions live in the global database, and depending on isolation level a transaction may even see uncommitted updates [`3:49`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=229) [`4:30`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=270).
- Key vocabulary: a **logical tuple** is the object identified by a primary key (exactly one record maps to a primary key); a **physical version** is one stored copy of that logical tuple [`4:30`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=270).
- OCC already produced multiple physical versions of a single logical tuple in its private workspace; MVCC "does it on steroids" by keeping them in the database itself [`5:02`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=302) [`5:25`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=325).
- Copying the whole tuple per version is presented up front as a bad idea — smarter systems copy only the changed subset [`5:45`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=345).
- MVCC is **not a replacement** for a concurrency control protocol. It is the architectural backbone; 2PL/OCC/T-O machinery is still needed to decide who may update what and when [`6:21`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=381).
