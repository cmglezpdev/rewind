# Unequal usage accounting in SDK apps

## The observed discrepancy

- The earlier doubling applied specifically to Claude Code. Theo says SDK-based apps did not receive equivalent five-hour treatment. [`11:29`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=689)
- A user reported that T3 Code consumed about **1.8 times as much five-hour allowance per token** as the interactive Claude Code CLI. Theo says the CLI's `-p` mode shows the same issue and that users filed an Anthropic repository issue. [`11:52`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=712)
- Theo says his own calculations confirmed the discrepancy. He later describes the SDK disadvantage approximately as a 2x penalty, or 50% less usable five-hour allowance. The video does not provide a reproducible test configuration or token log. [`12:24`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=744) [`12:54`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=774) [`13:15`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=795)

## Who remains affected

- Verified Ultra users avoid this session-limit problem because the five-hour cap disappears. Pro and Max users still face their smaller session allowances and the SDK accounting disadvantage. [`12:24`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=744) [`12:54`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=774)
- Theo says OpenCode also uses the Agent SDK. He describes subscription integration options as invoking the Claude Code CLI with a visible terminal or using the Agent SDK, so changing apps alone does not necessarily avoid the issue. [`13:15`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=795)

[Next: T3 Code's proposed fix](./07-t3-code-fix.md)
