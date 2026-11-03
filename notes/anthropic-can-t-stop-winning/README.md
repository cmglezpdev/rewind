---
title: Anthropic can't stop winning
description: Theo explains Claude Ultra, subscription limits, account verification, and unequal usage accounting in Claude Code and Agent SDK apps.
url: https://www.youtube.com/watch?v=y5TEATUDDfc
image: ./cover.webp
tags:
  - ai-coding
  - agent-workflows
language: en
channel: Theo - t3․gg
duration: "16:46"
---
# Anthropic can't stop winning

![Video cover](./cover.webp)

Theo examines Claude's renamed subscription plans, the removal of five-hour limits for verified Ultra accounts, and why SDK apps such as T3 Code consume session allowances faster than the interactive CLI. This opinion/news video combines reported changes, usage observations, and Theo's interpretation of compute economics. [`0:21`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=21) [`5:25`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=325) [`11:52`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=712)

## Topic breakdown

1. [Ultra announcement and its qualification](./01-ultra-announcement.md)
2. [Sponsor segment: code review and shared knowledge](./02-sponsor-code-review.md)
3. [Plan prices and misleading multipliers](./03-plans-and-multipliers.md)
4. [Why session limits exist and how compute changes them](./04-limits-and-compute.md)
5. [Account verification and distillation concerns](./05-verification-and-distillation.md)
6. [Unequal usage accounting in SDK apps](./06-sdk-usage-accounting.md)
7. [T3 Code's proposed fix, proxy experience, and closing](./07-t3-code-fix.md)

## Key takeaways

- Ultra replaces the $200/month Max 20x plan. Verified Ultra accounts lose the five-hour limit; the weekly allowance remains a separate constraint. [`0:21`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=21) [`4:38`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=278)
- The old 20x label described the five-hour allowance. Its weekly allowance was only 10 times Pro's, which explains the naming confusion. [`3:34`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=214)
- Theo reports roughly 2x variation between weekday prompting lows and highs in T3 Code, with peak activity at 7–9 a.m. Pacific. He uses this to explain limits on concentrated subscription usage. [`5:50`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=350) [`6:21`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=381)
- Verification is automatic and distinct from phone verification. The stated check is whether Settings → Usage still displays a current-session bar. [`10:06`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=606)
- A user reported about 1.8x more five-hour allowance consumed per token in T3 Code than in the interactive CLI; Theo says his calculations confirmed the discrepancy. Removing that limit for verified Ultra users leaves the underlying issue relevant to Pro and Max users. [`11:52`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=712) [`12:24`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=744)
- During recording, Theo received what he calls "semi-solid permission" to merge an entry-point reporting change intended to restore T3 Code's usage parity with Claude Code. The video announces an expected release outcome rather than demonstrating a completed rollout. [`14:32`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=872) [`15:01`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=901)
