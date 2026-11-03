# Project scope and workload target

## Classification

- This is an educational deployment tutorial: the speaker demonstrates concrete infrastructure and application deployment steps, then explains the operational concepts behind each step. [`0:00`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=0) [`22:08`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1328)

## Goal

- Handle 50 million real HTTP requests per month on a $15/month budget. [`0:00`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=0)
- The applications are not "hello world": the target system includes about 50 environment variables and about 175 HTTP routes. [`0:21`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=21)
- The stack includes websockets, realtime chat, server-side rendering, request logging, encryption between clients/proxies/origin, compression, authentication, email, NGINX, Docker, Redis, five SQL databases, uploads, media processing, and storage. [`0:39`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=39) [`1:02`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=62)
- The target durability for database and media storage is the "99.9999999%" durability level. [`1:34`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=94)

## Applications in scope

- A Java landing-page application with newsletter and contact functionality. [`1:52`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=112) [`2:11`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=131)
- A Rust backend powering both a web app and an iOS app. [`2:11`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=131)
- Pagser, a Node.js content-sharing/blogging platform with comments, profile pictures, page photos, attachments, media uploads, and server-side-rendered public pages. [`2:30`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=150) [`2:48`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=168)
- Weer, a URL shortener that aims to compete on product quality rather than only being a simple redirect service. [`3:05`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=185) [`3:20`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=200)
- A Next.js marketplace-style app with ads, chat, notifications, large React frontends, code splitting, dark theme, and responsive design. [`4:08`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=248)

## Capacity assumptions

- 50 million requests/month works out to roughly 20 requests/second as a steady average. [`5:48`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=348)
- The design should account for daily peaks of about 3-5x normal load, so the system should handle roughly 60 requests/second without excessive CPU or RAM pressure. [`5:48`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=348) [`6:12`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=372)
- The design also budgets for rare 10x spikes, about 200 requests/second. [`6:12`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=372) [`6:30`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=390)
- The speaker estimates that an application handling this traffic could conservatively correspond to about $300,000/year in revenue, though possibly much more depending on the business. [`6:30`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=390) [`6:54`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=414)

## Philosophy

- The course is framed as a pushback against default cloud-only architectures and cloud egress costs. [`1:52`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=112) [`9:30`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=570)
- The speaker argues that hybrid cloud plus on-premise systems can reduce cost without necessarily sacrificing availability, performance, or security. [`5:31`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=331)
- The project is positioned as DevOps education adapted for the AI era, emphasizing realistic systems with real business logic and users. [`4:34`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=274) [`8:34`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=514)
