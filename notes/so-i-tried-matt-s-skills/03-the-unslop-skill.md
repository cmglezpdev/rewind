# 03 — The unslop skill (the one that started it all)

This is the skill that triggered the whole deep dive. Theo saw Lauren posting prose her agents had written and thought it looked far less cringe than what Claude normally produced ([`5:11`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=311)).

## Detour: "description" should be called "trigger"

Before reading the skill, Theo makes a prompting point about skill frontmatter ([`5:11`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=311)):

- A skill's `description` is **not** meant to accurately describe what the skill does — the skill body is just markdown that gets read in anyway ([`5:40`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=340)).
- Its only job is to **trigger the skill at the right moment**. Write it to make the model reach for it, not to summarize it.
- His analogy: a description is like a **YouTube thumbnail** — the thumbnail's job isn't to encapsulate the video, it's to get the right person to stop scrolling ([`5:40`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=340)).
- **"It shouldn't be called a description. It should be called a trigger."** He blames the naming on early Anthropic-era conventions that everyone is now stuck with ([`6:07`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=367)).

### How skills mechanically work (his recap)

1. The model sees only the **name + description** of every installed skill.
2. Based on the description, it decides a skill is relevant.
3. It then **reads the markdown file into context** — that's the whole mechanism ([`6:25`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=385)).

## What unslop actually contains

Its stated job: edit text to remove AI patterns and add a human voice. The process is scan → rewrite → preserve meaning → match tone → add soul → self-audit, closing with the question *"what makes this obviously AI generated?"* and fixing the remaining tells ([`6:45`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=405)).

**Adding soul** (removing patterns is only half the job — sterile voiceless writing is equally obvious) ([`6:45`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=405), [`7:16`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=436)):

- Have opinions; react to facts instead of neutrally listing pros and cons.
- Vary rhythm — short sentences, then longer ones.
- Acknowledge complexity rather than flattening it.
- Use "I" when it fits; first person isn't unprofessional.
- Let some mess in — perfect structure looks machine-made.
- Be specific: name the concrete thing instead of saying something "is concerning".

**Patterns to detect and fix** ([`7:37`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=457), [`8:06`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=486)):

| Pattern | Fix |
| --- | --- |
| Puffery ("pivotal moment", "testament to", "evolving landscape", "setting the stage") | Cut it; say what happened |
| Name-dropping media outlets without context | Pick one, say what was said |
| Superficial "-ing" phrases (highlighting, ensuring, reflecting, showcasing) | Delete them |
| Promotional language | Cut |
| Em-dash overuse | Cut |
| Chatbot phrases ("I hope this helps", "let me know if…") | Remove entirely |
| Jargon | Whole dedicated section |

**Theo's favorite rule — say what it does, not how it feels** ([`8:56`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=536)):

- Replace vague imagery ("the database stays close at hand") with the mechanical fact ("SQL returns the exact string sent to the database").
- Ask what the sentence tells the reader to **do or know**, then write that. If you can't restate it as a concise instruction, fact, or number — **cut it**.
- Final check: **if the sentence could appear unchanged in another project's docs, it says nothing about this one. Cut it.**

## Why the skill itself is well written

- Theo praises its **semantic density** — easy to read, information delivered efficiently, "this is not slop" ([`8:06`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=486)).
- A prompting insight he adds: LLMs are very good at following a **bad example → good example** pair, but will keep doing anything the examples don't cover. You have to find the balance in what you demonstrate ([`7:37`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=457)).
- Second-order effect: **good writing in your history makes the models more likely to follow it**, and telling them to follow it makes it likelier still ([`8:35`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=515)).

## The A/B demonstration

Theo runs the same rough question ("what is T3 Code and why would someone use it?") in two places ([`9:22`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=562), [`10:42`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=642)):

- **With unslop installed** — the agent announces it is applying the required unslop writing skill so the answer stays direct and scannable, then produces a plain-language answer: *T3 Code is an open source control center for coding agents; instead of driving Codex, Claude Code, Cursor, Grok or OpenCode through separate terminal tools, you control them through one desktop, web or mobile app* ([`10:21`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=621)).
- **Without it (ChatGPT directly)** — same model family, no skill. The output is padded and em-dash-heavy ("turns these providers from separate terminal programs into one coherent agent workspace —", "the strongest pitch is not…") ([`11:34`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=694)).

### Result

- **"These both came from the same model for adding one markdown file. It's so much more readable."** ([`12:04`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=724))
- Theo's own reading habits changed fast enough that slopped text now physically bothers him: *"I didn't realize how quickly I adjusted to unslopped text"* ([`10:42`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=642), [`11:09`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=669)).
- Bottom line: **"I have been enjoying coding so much more since I saw this one stupid skill."** ([`12:37`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=757))
