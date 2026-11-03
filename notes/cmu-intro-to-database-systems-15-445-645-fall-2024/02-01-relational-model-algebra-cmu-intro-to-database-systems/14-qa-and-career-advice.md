# 14 — Q&A: Convergence, Career & Practical Advice

## Why NoSQL systems converged on relational features

- **Question:** DynamoDB now looks relational — why? ([`1:13:08`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=4388))
- **DynamoDB's trajectory** (Amazon, one of the first NoSQL databases): key/value store → JSON support → table-like structures, queried with **PartiQL**, Amazon's SQL dialect ([`1:13:33`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=4413), [`1:14:00`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=4440)).
- **Reason for convergence:** customers actually want the guarantees discussed in the lecture — a relational model that stops you shooting yourself in the foot ([`1:14:00`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=4440)).
- The stated position: like `1 + 1 = 2`, the relational model is simply the correct way to represent data; vector indexes and JSON are *accoutrements* added on top ([`1:14:24`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=4464)).

## What database should you pick?

- **Question:** in system-design interviews, interviewers sometimes prefer NoSQL answers ([`1:18:03`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=4683)).
- **Answer: always pick Postgres** — "I'm dead serious" ([`1:18:19`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=4699)).
  - Rock solid, with enterprise-grade features.
  - Applies beyond interviews: for startups and any new project, Postgres should be your first choice.
  - Rationale: spend your time building the application, not choosing a DBMS. Nobody knows or cares whether you run Postgres or MongoDB because users don't interact at that level ([`1:18:19`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=4699)).
  - If you eventually outgrow it, that is the point at which you pay someone a lot of money to help it scale ([`1:19:04`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=4744)).

## Career in databases

- **The job market argument:** unlike operating systems (IBM, Red Hat, and not much else), there is an enormous number of organizations building databases — Microsoft, Amazon, Google, Facebook, plus many startups ([`1:19:36`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=4776)).
- Even though relational databases are ~50 years old, people are still building new systems, and there is a lot of money in it ([`1:20:09`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=4809)).
- Disclosure: the lecturer's own database startup **failed that summer** ([`1:20:09`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=4809)).
- **Red flags when evaluating a company** ([`1:20:09`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=4809), [`1:20:34`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=4834)):
  - Check the startup's finances by talking to people.
  - Companies "chasing fads" — a database that suddenly rebrands as a vector database or an AI database "looks a little dicey".
  - EnterpriseDB is named as one to avoid.
- Another option: companies building an in-house system from scratch — they are their own customer, so they never worry about acquiring customers ([`1:20:59`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=4859)).
- Why companies recruit from this class: they don't want "random JavaScript programmers" touching DBMS internals ([`1:21:26`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=4886)).
- The lecturer has been told this course is used as the **onboarding process** at some database companies, and that some companies' interviews are "basically entire lectures from this class" ([`1:21:26`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=4886), [`1:21:55`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=4915)).

## Miscellaneous

- OpenAI acquired **Rockset** (a relational database startup founded by the people behind RocksDB at Facebook) for a large sum that summer; what they will do with it is unknown ([`1:14:47`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=4487), [`1:15:14`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=4514)).
- No DJ in the course this year due to legal issues involving the Warhol ruling and a morality clause ([`1:22:18`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=4938), [`1:22:33`](https://www.youtube.com/watch?v=APqWIjtzNGE&t=4953)).
