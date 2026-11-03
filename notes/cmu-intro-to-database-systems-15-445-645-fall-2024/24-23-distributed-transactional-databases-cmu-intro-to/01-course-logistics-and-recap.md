# 01 — Course Logistics and Recap of Distributed Architectures

## Logistics (CMU 15-445/645, Fall 2024)

- Three lectures remain; no class the Wednesday of Thanksgiving week, office hours held over Zoom instead ([`0:27`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=27), [`0:51`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=51)).
- Deadlines: Project 4 due Sunday **December 8** at midnight; Homework 6 moved to **December 9** (extra day granted, late days allowed) ([`1:31`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=91), [`1:59`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=119)).
- Final exam **December 13, 8:30 a.m.**; solutions released around the 11th, and Homework 6 topics are lightly weighted because they are not built in the projects ([`2:41`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=161)).
- Last class of the semester is the traditional "potpourri" session where students vote on systems to cover in 5-minute flash talks ([`0:51`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=51)).
- Two remaining DB seminar talks: **GreptimeDB** (time-series database built on DataFusion) and **Databend**, whose **OpenDAL** is a data-access layer that replaces the disk manager so a system can read from S3, EBS, or any remote URL ([`3:16`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=196), [`3:50`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=230)).

## Recap: the three system architectures

| Architecture | Description | Notes |
|---|---|---|
| **Shared everything** | Single box owns disk, memory, and CPU (BusTub, Postgres) | The baseline for the whole course ([`4:54`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=294)) |
| **Shared disk** | Multiple compute nodes over a shared storage layer (S3, DFS) | Once considered a bad idea — Oracle and Teradata tried it and it was expensive — until S3 made it viable ([`4:54`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=294), [`5:52`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=352)) |
| **Shared nothing** | Every node holds a slice of the data and nodes exchange messages | The dominant distributed approach before the cloud ([`4:54`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=294)) |

- **Snowflake** was among the first to build a shared-disk architecture on top of S3, avoiding building storage themselves — a decisive win ([`5:52`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=352)).
- Partitioning/sharding (hash or range) splits a database too big for one node; even with S3's effectively infinite storage you still need it to decide which compute nodes may touch which data ([`6:16`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=376)).
- Transaction coordination can be **centralized** (a global traffic cop decides who commits) or **decentralized** (nodes agree among themselves) — but the protocols in this lecture work either way ([`6:16`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=376), [`7:00`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=420)).

## Scope: OLTP, not OLAP

- **OLTP**: queries touch a small amount of data but *modify* the database (insert/update/delete), repeating the same operations, and must preserve ACID ([`7:00`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=420), [`7:34`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=454)).
- Distributed transactions are a topic that "we could do years on"; this lecture is an explicit brain dump of the considerations, not a complete treatment ([`7:34`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=454), [`8:03`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=483)).
- Distributed OLAP (e.g. joins across nodes) is the *next* lecture ([`8:03`](https://www.youtube.com/watch?v=3wNmpE6DsSs&t=483)).
