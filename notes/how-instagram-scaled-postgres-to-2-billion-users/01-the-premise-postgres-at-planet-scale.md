# 1. The premise: Postgres at planet scale

## The question the video answers

- Instagram scaled to **2 billion users on Postgres**. Reddit, Notion, Heroku, Strava and Discord all run Postgres at some capacity ([`0:00`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=0)).
- These teams **did** know the alternatives and evaluated them seriously — staying on Postgres was a deliberate choice, not ignorance ([`0:00`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=0)).
- Two questions drive the video ([`0:00`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=0)):
  1. Why do they all still use Postgres?
  2. What does it actually take to make Postgres work at planet scale?
- Goal for the viewer: a clear picture of the **actual bottlenecks** you hit when scaling a relational database ([`0:33`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=33)).

## The thesis stated up front

> Boring technology with good engineering beats new technology every single time ([`1:33`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=93)).

The video plants this lesson early and returns to it explicitly at [`15:21`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=921) — see [08-boring-technology-as-a-superpower.md](08-boring-technology-as-a-superpower.md).

## The framing that matters

- When one machine is no longer enough, the **wrong answer is to panic and switch databases**; the right answer is to find out exactly *why* the database is struggling, then fix that ([`1:59`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=119)).
- The closing restatement: **the database is not the bottleneck — the architecture around it is** ([`21:44`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=1304)).
