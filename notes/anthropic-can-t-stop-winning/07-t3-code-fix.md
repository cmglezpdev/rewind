# T3 Code's proposed fix, proxy experience, and closing

## Entry-point reporting and the recording-time update

- Theo identifies a Claude Code entry-point field set to `SDK-TS` for the TypeScript Agent SDK. He reports that changing its value removes the usage discrepancy. The transcript does not supply an exact configuration key or file path. [`13:43`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=823)
- He proposes reporting `T3-code` as the entry point and mentions a JSON configuration change. Initially, he worries that merging the change could cause problems when Anthropic sees a new entry point's traffic spike. [`14:08`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=848)
- During filming, he receives what he calls "semi-solid permission" to merge. He expects the change to make T3 Code's five-hour and weekly usage match direct Claude Code usage. [`14:32`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=872)
- He says the issue should stop affecting T3 Code users once the release ships. The announcement is conditional on that release; no post-release measurements appear in the video. [`15:01`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=901)

## Personal proxy setup and its limits as evidence

- Theo had not noticed the discrepancy himself because his inference already ran through a CLI proxy that applied similar changes. [`15:01`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=901)
- He discusses managing multiple accounts through that setup, points viewers toward his FAQ, and explicitly declines to guarantee that it is safe from account bans. He does not recommend managing this directly in T3 Code. [`15:27`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=927)
- He reports at least four months of personal use without issues. That is an anecdotal outcome, not general approval of the setup. [`15:56`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=956)

## Closing comparison deferred

- Theo announces a separate video comparing new Codex limits with Claude's value. He says the math has changed, but provides no detailed Codex comparison in this video. [`16:18`](https://www.youtube.com/watch?v=y5TEATUDDfc&t=978)

[Back to overview](./README.md)
