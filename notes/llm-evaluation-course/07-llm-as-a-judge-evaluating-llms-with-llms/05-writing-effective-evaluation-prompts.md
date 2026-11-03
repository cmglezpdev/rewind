# Writing effective evaluation prompts

## Rule zero: own your prompts

- Write your own evaluation prompts — or at minimum, read the prompts of any external tool you use, because the evaluation context lives inside the prompt, not in the name of the metric [`3:39`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=219)

## Three concrete tips

1. **Use binary scoring** — stick to simple yes/no questions like "Is this response professional?"; complex scales only work if you can clearly define what each score means ("If you can't score professionalism on a scale of 1 to 10, the LLM won't either") [`3:54`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=234)
2. **Split complex criteria** — don't ask for "good" vs "bad"; "good" usually hides multiple criteria (complete? factually correct? professional?), which are three separate evaluators — you get better results this way [`4:17`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=257)
3. **Ask for explanations (Chain-of-Thought)** — ask the LLM to think step by step before answering; this improves accuracy and helps troubleshooting, e.g. pointing to the specific contradiction it picked up [`4:39`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=279)

## Keep it simple first

- Advanced options exist — complex reasoning chains, or a jury of models producing a single decision — but always start simple, and if simple works, stick with it [`4:39`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=279) [`4:56`](https://www.youtube.com/watch?v=Qj3u_kzfJVo&t=296)
