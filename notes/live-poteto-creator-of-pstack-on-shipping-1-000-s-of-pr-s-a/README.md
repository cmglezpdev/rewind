---
title: "LIVE: Poteto (creator of pstack) on shipping 1,000's of PR's a month at SpaceX"
description: pstack and engineering workflows at SpaceX.
url: https://www.youtube.com/watch?v=MN9dGgmLyso
image: ./cover.webp
tags:
  - ai-coding
  - agent-workflows
language: en
channel: Matt Pocock
duration: 1:05:36
---
# LIVE: Poteto (creator of pstack) on shipping 1,000's of PR's a month at SpaceX

![Video cover](cover.webp)

An interview between Matt Pocock and Poteto about building trust in coding agents and scaling their work. Poteto explains how he developed verification skills and tools, shaped codebases to make good changes easier, connected incoming reports to coding agents, and used sampling to improve the environment over time. The interview frames high-volume PR production as the outcome of reliable workflows and verification, not simply more agent sessions.

## Topics

1. [Origin, trust, and expertise](01-origin-and-trust.md)
2. [The Michelin kitchen and the engineer's environment](02-the-michelin-kitchen.md)
3. [Verification loops and deterministic tools](03-verification-and-determinism.md)
4. [Shape the codebase to make good changes easier](04-codebase-constraints.md)
5. [Scaling work with inner and outer loops](05-scaling-with-loops-and-coordinators.md)
6. [Gardening, queues, and finding patterns](06-gardening-and-pattern-detection.md)
7. [Sampling, verification, and agent merges](07-review-and-autopilot.md)
8. [Verifiability and one-way doors](08-verifiability-and-risk.md)
9. [Skills as process, and learning from transcripts](09-skills-as-process-and-recall.md)

## Key takeaways

- Poteto reports shipping roughly 2,500 PRs in a month, enabled by multiple projects, external triggers, coordinator agents, and an environment he had tuned for agent work. [`32:59`](https://www.youtube.com/watch?v=MN9dGgmLyso&t=1979) [`38:29`](https://www.youtube.com/watch?v=MN9dGgmLyso&t=2309) [`39:02`](https://www.youtube.com/watch?v=MN9dGgmLyso&t=2342)
- Verification was his first major step up the trust ladder: agents could run and inspect the application, repeat checks, and improve without making him the proxy. [`16:46`](https://www.youtube.com/watch?v=MN9dGgmLyso&t=1006) [`17:27`](https://www.youtube.com/watch?v=MN9dGgmLyso&t=1047)
- His full-autopilot PR flow uses verifier agents to exercise the app, find regressions, and trigger fixes before merging. Poteto says the process is token-intensive and can be scaled by adjusting verifier count. [`52:38`](https://www.youtube.com/watch?v=MN9dGgmLyso&t=3158) [`53:07`](https://www.youtube.com/watch?v=MN9dGgmLyso&t=3187)
- High-volume review shifts toward sampling and systematic correction: repeated agent mistakes should lead to changes in the environment, such as skills, constraints, lint rules, or types. [`49:37`](https://www.youtube.com/watch?v=MN9dGgmLyso&t=2977) [`50:26`](https://www.youtube.com/watch?v=MN9dGgmLyso&t=3026)
- Autonomous merging depends on how well a task can be verified. The interview leaves hard-to-verify domains as an open challenge and points to formal proofs as one possible source of stronger guarantees. [`56:53`](https://www.youtube.com/watch?v=MN9dGgmLyso&t=3413) [`57:30`](https://www.youtube.com/watch?v=MN9dGgmLyso&t=3450) [`58:34`](https://www.youtube.com/watch?v=MN9dGgmLyso&t=3514)
