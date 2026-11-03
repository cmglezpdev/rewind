# 11 — Engineering Culture and How Building Works at OpenCode

## Product principles that didn't change

- "You probably only have one good idea in your whole product. Get the user to experience that as fast as possible." Simple to say, brutally hard to keep — accidental friction constantly creeps back in [`59:23`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=3563).
- Concrete practice: Dax has a command that spins up a fresh Docker container and runs OpenCode, replaying the first-time-user experience. He does it every ~2 weeks and always catches regressions in onboarding [`59:46`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=3586).
- Product is abstraction, not reaction: "the job of product isn't to receive a problem and ship the immediate solution — it's to absorb all the problems and understand there's one solution you can ship to fix 50 different problems." A skill you can improve at forever; "AI has not helped me even a little bit" at it [`59:46`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=3586), [`1:00:35`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=3635).

## Feedback loops as the engine of skill

- What made Dax better: years of direct consequences — users literally yelling at him when he messed up, and slogging through his own poor designs [`1:01:01`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=3661).
- Team rule: **no one is insulated from feedback.** In larger orgs the pain of a rushed ship lands on support, not the product team — that broken loop is why big-company product people plateau [`1:01:26`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=3686), [`1:01:48`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=3708).
- Building for the *whole market* (millions of environments, workflows, constraints) forces a different mindset — outsiders will think everything you prioritize is wrong [`1:02:08`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=3728).

## How the team ships

- ~20-something people, most hired in the last ~3 months — currently in the "horrible phase" of more people than ever but moving slower than ever while everyone gets up to speed [`1:02:39`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=3759).
- Two-phase model of any feature: (1) **push it up the hill** — zero to existing, the painful part; (2) fleshing out details. The team optimizes for reaching a demo milestone as fast as possible [`1:03:28`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=3808).
- Once a demo is public, vocal users tell them exactly what's missing and what sucks — "it gets very easy from there on" [`1:03:47`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=3827).
- **Whoever builds a feature owns the full cycle**: they receive the GitHub issues and Twitter replies themselves — no intermediary summarizing feedback — and they set the roadmap for it [`1:04:13`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=3853).
- Priorities emerge instead of being assigned: founders make sure everyone has full context (market, competitors, positioning), and people grab the problem they think hurts most. "They roughly end up having good judgment if we're doing a good job providing the right context" [`1:04:31`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=3871), [`1:05:14`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=3914).
- Motivation is strategy: "we know this is a long game — your strategy should be how can I stay in it the longest," which means working on exciting things daily [`1:04:50`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=3890).
- Dax has vocally disagreed with what someone wanted to work on and been proven wrong weeks later — and considers that a feature of the system [`1:05:14`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=3914).
