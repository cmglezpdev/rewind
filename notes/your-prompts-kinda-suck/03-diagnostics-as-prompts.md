# Requesting diagnostics instead of product features

## Update the mental model of difficulty

- Theo uses an XKCD example contrasting an easy GPS lookup for national parks with the once-difficult task of recognizing a bird in a photo. His point is that engineers' old assumptions about implementation difficulty can hide tasks that AI now makes accessible. [`3:52`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=232) [`4:15`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=255) [`4:35`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=275)
- Some feature requests are really requests for information. If an agent can access and analyze that information, the user may be able to obtain the result without a dedicated product interface. [`6:59`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=419) [`7:26`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=446)

## Tool-call audit

1. Theo had audited agent histories and found Claude issuing ripgrep commands with Bash-compatible syntax and newline formatting that failed under Zsh. He associates this with higher tool-call failure rates on his Zsh machines; no percentage is given. [`5:02`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=302) [`5:29`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=329)
2. A friend wanted a product feature ranking tool calls by duration. Theo instead opened a projectless T3 Code thread and asked for a breakdown of tool calls on the current machine to identify slow operations. [`5:54`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=354) [`6:19`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=379) [`6:39`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=399)
3. The agent returned a report as a page without an explicit request for that format. It identified a home-directory search lasting 41.7 minutes and another lasting almost 10 minutes. The actionable lesson was to search a repository or known directory. [`8:57`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=537)

## A dashboard can be a conversation

- Theo had been designing a task dashboard that could inspect threads, suggest merges or closures, rename work, and recommend follow-up prompts. The example of 40 threads, eight to merge and 20 to close, illustrates the proposed workflow rather than a reported audit result. [`7:51`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=471) [`8:16`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=496)
- As buttons accumulated, he reconsidered the interface as a meta thread connected to T3 Code instances across environments. Users could request the particular dashboard or operation they needed. [`8:36`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=516)

## Context audit

- His next request asks for a breakdown of the current thread's context window and a visualizer. A similar earlier request revealed that his Railway proxy setup was adding about 70,000 tokens to every request. [`9:22`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=562) [`9:44`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=584)
- He says the extra context had gone unnoticed for two months and uses that experience to argue against obsessively managing context. This is his inference from one setup, not a general performance comparison. [`10:06`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=606)
- The visualizer finishes later in the video. It can then be revised through follow-up questions or saved as a skill. [`13:21`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=801)

## When this approach is useful

- Let slower requests run in the background when the result is useful but not immediately needed. The approximately three-minute estimate for the first report is an expectation, not a measured benchmark. [`6:59`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=419) [`10:06`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=606)
- Ask for small, personally useful outputs that would not justify a standalone product. Theo cites a visualizer for one bug and combining music listening history with old Last.fm scrobbles. [`10:34`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=634) [`11:02`](https://www.youtube.com/watch?v=m-B3jIMMmUE&t=662)
