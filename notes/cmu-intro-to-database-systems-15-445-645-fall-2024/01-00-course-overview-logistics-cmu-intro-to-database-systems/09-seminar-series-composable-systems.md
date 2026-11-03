# 09 — "Database Building Blocks" Seminar Series

- Optional seminar series running **Mondays at 4:30pm**, after class — not part of the course, no credit ([`18:31`](https://www.youtube.com/watch?v=otE2WvX3XdQ&t=1111), [`19:00`](https://www.youtube.com/watch?v=otE2WvX3XdQ&t=1140)).
- Speakers: companies and open-source project people building **libraries that implement specific components of a database system**, then assembling larger systems on top ([`19:00`](https://www.youtube.com/watch?v=otE2WvX3XdQ&t=1140)).

## The idea being taught: monolithic vs. composable

| Monolithic systems | Composable systems |
|---|---|
| PostgreSQL, SQLite, Oracle ([`19:00`](https://www.youtube.com/watch?v=otE2WvX3XdQ&t=1140)) | Standalone reusable pieces: execution engine, storage manager ([`19:42`](https://www.youtube.com/watch?v=otE2WvX3XdQ&t=1182)) |
| Custom in-house implementation of every aspect of the system ([`19:00`](https://www.youtube.com/watch?v=otE2WvX3XdQ&t=1140)) | Components reused across different systems, with a larger system built on top ([`19:42`](https://www.youtube.com/watch?v=otE2WvX3XdQ&t=1182)) |

- **DataFusion** (from the Rust community, part of Apache Arrow) is named as a leading example of such a core component, with many systems built on it ([`19:42`](https://www.youtube.com/watch?v=otE2WvX3XdQ&t=1182), [`19:59`](https://www.youtube.com/watch?v=otE2WvX3XdQ&t=1199)).
- Several database companies will present how they use DataFusion and similar components ([`19:59`](https://www.youtube.com/watch?v=otE2WvX3XdQ&t=1199)).
- Logistics: delivered **over Zoom**, videos posted to YouTube afterwards; series **starts September 23**, the week after the on-campus recruiting event ([`19:59`](https://www.youtube.com/watch?v=otE2WvX3XdQ&t=1199)).
- The topic also gets covered further inside the course itself as the semester progresses ([`19:00`](https://www.youtube.com/watch?v=otE2WvX3XdQ&t=1140)).
