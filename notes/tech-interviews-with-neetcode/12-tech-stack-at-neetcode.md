# Tech stack at NeetCode

How Navi and his small team actually build — and his "easier to build, harder to build value" thesis.

## Stack and AI adoption

- Stack: Angular on the front end, Firebase, Google Cloud, TypeScript — self-described "pretty outdated tech" [`53:03`](https://www.youtube.com/watch?v=xafwfGVBxos&t=3183)
- Over the last ~6 months most code has been written by AI; before that Navi was "a really big AI hater" — his shift is pragmatism: the tools finally got good enough for his mostly-CRUD workload (the code execution service being the main exception) [`52:16`](https://www.youtube.com/watch?v=xafwfGVBxos&t=3136), [`52:43`](https://www.youtube.com/watch?v=xafwfGVBxos&t=3163)
- Early code quality was deliberately bad — `any` everywhere, inline CSS — a trade-off to move fast while he knew the whole codebase. AI later cleaned it up cheaply, retroactively validating the shortcut: "that trade-off was so worth it" [`53:03`](https://www.youtube.com/watch?v=xafwfGVBxos&t=3183), [`53:28`](https://www.youtube.com/watch?v=xafwfGVBxos&t=3208), [`53:54`](https://www.youtube.com/watch?v=xafwfGVBxos&t=3234)

## "Easier to build, 10x harder to build value" (2026 hot take)

- Because features are now trivial to ship, people ship features nobody cares about — cluttering products, slowing sites, making things *worse*. "Speed matters in business, but decisions matter as well" [`54:14`](https://www.youtube.com/watch?v=xafwfGVBxos&t=3254), [`54:30`](https://www.youtube.com/watch?v=xafwfGVBxos&t=3270), [`54:58`](https://www.youtube.com/watch?v=xafwfGVBxos&t=3298)
- Example: Anthropic moved so fast they didn't notice quality regressions for a month+ until users forced a public acknowledgment blog post [`54:58`](https://www.youtube.com/watch?v=xafwfGVBxos&t=3298), [`55:37`](https://www.youtube.com/watch?v=xafwfGVBxos&t=3337)
- The pre-AI "move fast and break things" slider still holds — AI did not repeal the speed/stability trade-off [`56:01`](https://www.youtube.com/watch?v=xafwfGVBxos&t=3361)
- OpenAI shutting down Sora as a social network to refocus on coding shows even the fastest-growing companies are choosing focus over breadth [`56:25`](https://www.youtube.com/watch?v=xafwfGVBxos&t=3385), [`56:51`](https://www.youtube.com/watch?v=xafwfGVBxos&t=3411)
- The irony: the lesson from observing AI companies is that *focus* beats executing quickly on everything — fittingly, the Transformers paper was titled "Attention is all you need" [`57:15`](https://www.youtube.com/watch?v=xafwfGVBxos&t=3435), [`57:40`](https://www.youtube.com/watch?v=xafwfGVBxos&t=3460)
