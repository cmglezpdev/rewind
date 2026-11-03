# Why session limits exist and how compute changes them

## Two limits control different things

- The weekly limit caps total included usage over seven days. The five-hour limit restricts how much can be consumed in one burst; Max still has it. [`4:38`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=278)
- Theo estimates that $200/month can buy inference equivalent to as much as $12,000 at API prices. This is his valuation of usage, not a claim that Anthropic incurs $12,000 in direct costs. [`5:01`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=301)
- His explanation centers on available GPUs: subscription traffic competes with enterprise inference for capacity already provisioned by the lab. Concentrated usage can crowd out capacity Anthropic could sell. [`5:25`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=325) [`9:09`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=549)

## Observations supporting the peak-demand argument

- T3 Code weekday traffic begins rising around 4 a.m. Pacific, peaks at 7–9 a.m., and falls into a lull from about 6 p.m. to midnight. Theo reports roughly a 2x difference between daily lows and highs. These are T3 Code observations, not Anthropic-wide measurements. [`5:25`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=325) [`5:50`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=350)
- Five-hour caps prevent users from spending an entire weekly allowance during the busiest window. Theo initially illustrates this with a rough 10–15% allowance per window, rather than a measured universal quota. [`6:21`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=381)
- Later, his calculation for the limits under discussion is roughly 30% of a weekly allowance per five-hour window, or about 3.5 full session allowances per week. Keep this estimate separate from his earlier illustration. [`11:29`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=689)
- Theo connects past peak-hour reductions and off-peak generosity to compute scarcity. He also interprets late-night and weekend Codex resets as a way to use spare capacity. [`7:01`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=421)
- He argues that low-priced subscriptions encourage habits that later produce employer spending at API prices. This is his business interpretation, not demonstrated profitability data. [`7:37`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=457)
- Session limits offer users one protection: an unexpectedly long-running agent cannot exhaust the whole weekly allowance in one burst. [`7:37`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=457) [`8:03`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=483)

## More capacity enabled more generous limits

- Theo recalls a May compute partnership with SpaceX as a multibillion-dollar deal providing access to GPUs in an older data center. He speculates that Anthropic may now operate the whole facility. [`8:20`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=500) [`8:44`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=524)
- He reports that Anthropic then doubled **Claude Code's** five-hour limits and removed Claude Code's peak-hour reductions. The product-specific wording matters for SDK apps discussed later. [`8:44`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=524) [`9:34`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=574)

[Next: Verification and distillation](./05-verification-and-distillation.md)
