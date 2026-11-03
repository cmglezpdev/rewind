# 06 — From Terminal to GUI, and the Business Model

## GUI: admitting a mistake

- Dax loves the terminal, but at ~8M monthly actives he thinks "too many users" are on it — a lot of them would have a better experience on a GUI, which the team understood very early [`30:34`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=1834).
- They experimented with a web app and a desktop app (built with Tauri) but didn't treat the project seriously enough or think hard about the technical choices — "it ultimately was a mistake and we're moving back to Electron now" [`30:56`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=1856), [`31:25`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=1885).

## Rejecting the "committed with OpenCode" growth hack

- Initially OpenCode (as an early Claude Code clone) stamped commits/PRs with its name, like Claude Code and GitHub Copilot do. When users asked to disable it, Dax reflected and killed it **by default** instead of adding an option [`31:25`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=1885), [`32:30`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=1950).
- Reasoning: it felt like casino logic — trapping users with every little trick is the extreme of consumer products, and this hack is "too obvious; everyone knows why it's there" [`32:12`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=1932).

## Business model: two lines

**1. OpenCode Zen — inference service**
- Born to smooth onboarding: at launch, new Anthropic accounts couldn't even get rate limits high enough to use OpenCode, so they built a sign-up-once service giving access to all models [`32:54`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=1974).
- It grew far beyond onboarding: hosting open-source models *well* is hard, so Zen became the place aggregating the best inference for them. Announced **$50M run rate within ~5–6 months**; margins on open-source models are decent [`33:14`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=1994), [`33:37`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=2017).

**2. Enterprise control plane**
- "Extremely boring": a company with a thousand engineers can't just tell everyone to paste API keys — it needs providers, permissions, budget controls, and rate limits centrally managed. Currently enterprise-deployed, going public soon; open source, but most pay for the hosted version [`34:00`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=2040).
- Timing tailwind: companies are finally scrutinizing LLM spend just as open-source models became competitive at ~10× cheaper — so the control plane naturally funnels customers into Zen inference. If inference dominates, they may stop charging for the control plane entirely [`34:25`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=2065), [`34:42`](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=2082).
