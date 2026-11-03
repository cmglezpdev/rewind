# How abstractions change what developers need to care about

## Theo's hierarchy of attention

- He orders concerns roughly from formatting, function patterns, and algorithms through frameworks, languages, architecture, engineers, and finally the product. The product deserves more attention than formatting preferences. This is his prioritization argument, not a universal ranking of technical importance. [`3:24`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=204) [`4:00`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=240)
- Low-level details can still matter in specific contexts. His tabs-versus-spaces example explicitly allows for accessibility needs, and he acknowledges that instruction sets still matter to some developers. [`2:53`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=173) [`4:28`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=268)
- Higher-level languages such as C let more developers work without choosing individual CPU instructions. Theo's point is that abstraction changes the work people must attend to, rather than eliminating programming. [`4:59`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=299)

## What he says AI changes

- Reliable formatting tools reduced the value of debating indentation. AI completion similarly reduces the need to handwrite familiar function patterns and algorithms. [`5:30`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=330) [`6:04`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=364)
- In his Advent of Code example, he still identified the necessary algorithms, then named them and used completion to generate implementations. Recognizing the right algorithm remained part of his contribution. [`6:30`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=390)
- He argues that frameworks and languages increasingly become implementation choices agents can change. He cites his own TypeScript-to-Rust work as an example, without presenting migration measurements. [`7:44`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=464) [`8:16`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=496)
- Architecture remains imperfect: he says models fall short of his bar, but can identify weaknesses in a good design when given enough information and testing access. [`8:45`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=525)

## Architecture anecdote and its limits

- Theo reports asking Claude to investigate unexpected backend failures. It set up monitoring, alerting, and tracing, identified affected regions, and produced a report he sent to Cloudflare. [`9:11`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=551)
- He says Cloudflare thanked him and sought more information. This supports his account of one useful investigation; the video provides no comparative architecture benchmark. [`9:36`](https://www.youtube.com/watch?v=ebILGCoN4UU&t=576)
