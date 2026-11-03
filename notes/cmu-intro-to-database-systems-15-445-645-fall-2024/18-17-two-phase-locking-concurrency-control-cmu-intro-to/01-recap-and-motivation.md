# 01 — Recap: serializability and the shift to dynamic schedules

## Where the previous lecture left off

- Last class covered ACID, spending most of the time on **isolation**: run transactions with interleaving, but leave the database in a state equivalent to some serial order [`0:27`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=27), [`0:51`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=51).
- **Conflict serializable**: build the dependency (precedence) graph over operations from different transactions on the same object; no cycles means the schedule is equivalent to a serial ordering [`1:18`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=78).
- **View serializable**: admits more schedules than conflict serializability (e.g. blind writes, where only the last write to an object matters), but only if the system understands application semantics [`1:53`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=113), [`2:24`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=144).
- Getting that semantic knowledge requires static/program analysis of application code — or asking a human, "the worst thing possible". **No real DBMS supports view serializability**; asking for serializable isolation always gives you conflict serializable [`2:24`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=144).

## The new problem: no advance knowledge of the schedule

- Last class assumed **static schedules**: every read and write of every transaction was declared up front, so the system could decide the interleaving offline [`2:54`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=174).
- Real systems mostly don't work that way — stored procedures are a partial exception. Instead there is a "fog of war": queries arrive dynamically and the DBMS must decide **on the fly** who touches what data, when, and in what order [`2:54`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=174), [`3:35`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=215).
- The goal is unchanged: end up with a final database state equivalent to some serial execution [`4:03`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=243).

## Two solutions in the course

| Approach | Lecture |
|---|---|
| **Locks** (two-phase locking) | this class [`4:03`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=243) |
| **Timestamps** (optimistic / T/O protocols) | next class [`4:03`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=243) |

## Lecture roadmap

1. Basic lock types [`10:20`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=620)
2. Basic two-phase locking protocol [`11:04`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=664)
3. Strengthening it to avoid further problems [`11:04`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=664)
4. Deadlock handling and prevention [`11:04`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=664)
5. Hierarchical locking — taking locks over regions of objects instead of one at a time [`11:28`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=688)
