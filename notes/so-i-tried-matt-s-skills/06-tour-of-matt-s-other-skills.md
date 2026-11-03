# 06 — Tour of Matt Pocock's other skills

Rapid pass over the rest of the collection, with Theo's read on each.

## teach — stateful learning

- User-invoked only (`disable model invocation`); you trigger it with `/teach` ([`19:47`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1187)).
- Premise: the request to be taught something is **stateful** — the user intends to learn a topic across multiple sessions ([`19:47`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1187)).
- Mechanism: treat the **current directory as a teaching workspace**; the state of your learning lives in several files in that directory. Theo's takeaway — you're meant to run it **in its own folder** ([`20:14`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1214)).

## ask-matt — the router

- Purpose-built to help you figure out **which skill or flow fits your situation** ([`20:14`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1214)).

## triage & wayfinder

- **triage** — moves issues through a **state machine of triage roles** ([`20:14`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1214)).
- **wayfinder** — planning huge chunks of work as a **map of decisions** to be settled ([`21:03`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1263), [`22:38`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1358)).

## wizard — the one he was most excited about

- Purpose: **walk a human through the steps only they can perform** ([`21:26`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1286)).
- Ideal cases: an agent can't reach a dashboard it needs, or there's a `sudo` call it can't run. The wizard has the agent set everything up so you run **one script** and handle the rest from there ([`21:26`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1286)).
- **Live install:** Theo asks his `fleet` thread whether wizard was ever set up, noting there's one more machine in the fleet now (a new Mac Mini) ([`21:50`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1310), [`22:20`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1340)).
- **Result:** Opus caught every change to his systems. The answer came back direct — no, wizard was never set up; it ranked **seventh** in the earlier report, but he only picked seven skills and it wasn't among them; it's installed now ([`25:14`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1514), [`25:46`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1546)). It appeared on **all** his machines ([`27:52`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1672)).
- He has nothing that needs it yet but can think of **four things from the previous day** he should have used it for ([`27:52`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1672), [`29:28`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1768)).

### Side-by-side: the unslop effect, again

That wizard answer becomes an accidental A/B. Theo scrolls back to older threads in the **same project, same codebase, same agents and models**, from before the skills were installed, and reads a "recent changes summary" out loud ([`25:46`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1546), [`26:10`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1570)):

- It's dense with em dashes and hedged asides ("rebasing his branch under him felt more intrusive than the situation called for", "worth watching whether the check goes green") ([`26:37`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1597)).
- **"I can't even read this, and I'm trying to read it out loud for you guys in a video."** ([`27:01`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1621))

## writing-for-agents — the renamed "writing great skills"

- Scope: a reference for writing **any document an agent consumes** — a skill, an `AGENTS.md`/`CLAUDE.md`, or a doc reached by a pointer ([`30:28`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1828)).
- Why it matters: **agents are bad at writing instructions to other agents**. If you let them write skills, markdown, or sub-agent prompts unaided, the output is poor ([`28:39`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1719), [`29:04`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1744)).
- Theo's actual use: **prompting sub-agents**, where it's been very helpful ([`30:28`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1828)).
- Core concept — **context pointers**: a reference held in the agent's context that names some out-of-context material and encodes the condition for reaching it. A skill's description is one; a line in `AGENTS.md` naming a doc is the same object. **The pointer's wording — not its target — decides when and how reliably an agent reaches the material.** A must-have target behind a weakly worded pointer is a **variance bug** ([`30:28`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1828), [`30:54`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1854)).
- When writing a skill specifically, read the `skill-mechanics.md` file for frontmatter, invocation choice, and router skills ([`30:28`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1828)).
- Criticism: strong ideas, **unreadable delivery** — too many em dashes and dense phrasing ([`30:54`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1854)).

## wait-what — the repair tool

- User-invoked, roughly **three lines long** ([`29:04`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1744), [`29:48`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1788)).
- Job: get a simpler, more digestible restatement when a response makes no sense. It pulls in "simplify technical English" ([`29:04`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1744)).
- **Honest limitation stated in the skill itself:** it repairs **one message** — it doesn't prevent the next sloppy one ([`29:04`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1744)).
- **The real cure** for jargon is a **shared language built up front** using grill-with-docs. Reach for wait-what only when you haven't done that setup yet ([`29:28`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1768)).
- It's functionally near-identical to pstack's `bro` skill ([`33:04`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1984)).

## domain-modeling

- Theo already does this by hand — writing grammars and glossaries with agents in every project, defining what terms mean. **Making it a skill makes sense to him** ([`23:30`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1410)).

## On the docs themselves

- **"This is a good docs page. There's a lot to learn from here in the best sense."** ([`29:48`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1788))
- He's tempted to install everything but holds back — he's happy with his current setup and doesn't want to muddy it ([`23:56`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1436)).
