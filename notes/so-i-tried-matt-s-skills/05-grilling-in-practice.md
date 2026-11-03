# 05 — The grilling skill in practice

The most-hyped skill in the collection, and the one Theo actually stress-tests on a real project (**Lakebed**).

## What the skill instructs

- Grill the user relentlessly about a plan, decision, or idea; use it when the user wants to stress-test their thinking ([`14:57`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=897)).
- Interview until you reach **shared understanding**, mapping the problem as a **decision tree** — every decision branches into the decisions that hang off it ([`14:57`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=897)).
- Work the tree **in rounds**. The frontier is every decision whose prerequisites are already settled ([`15:23`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=923)).

## The setup

- No install: Theo copies the skill text, opens an agent, and pastes it in with the request *"grill me about Lakebed — the project itself and its goals, everything in AGENTS.md, CLAUDE.md, etc. I want to make sure we are on the same page about what we are building"* ([`15:53`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=953), [`16:19`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=979)).
- Run on a remote Linux box with Opus 5 ([`16:53`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1013)).

## Round 1 results (Opus 5)

Took **almost two minutes** for the first pass ([`16:53`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1013)). It opened by stating findings, not questions:

- `CLAUDE.md` is **badly stale**.
- The repo **contradicts its own v0 rule**.
- There are **two competing execution models** in the tree.

Then the questions ([`16:53`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1013), [`17:25`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1045)):

1. Who is the user and who pays?
2. What is the actual next milestone? (it noticed a mess of launch-prep files, stray HTML plans, and a `TODO.md` organized around a PR-cleanup program rather than launch)
3. Is the capsule format a spec or just our implementation? What is the ceiling of one capsule?

Each question came with **example answers** you could pick from ([`17:25`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1045)). Theo's verdict: **"These are actually good questions."** ([`17:49`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1069))

## Cross-model comparison

He reruns the identical prompt on a different, faster model to see whether question quality holds ([`17:49`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1069)):

| Run | Behavior | Question quality |
| --- | --- | --- |
| Opus 5 (remote) | ~2 min first pass; leads with repo findings | Good ([`17:49`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1069)) |
| Faster model, **low** reasoning | Finished before his stop command even registered; insisted the skill required it to find repo facts rather than ask | "All good questions" — what is Lakebed, who is the primary customer, what does full autonomy mean, what is a capsule ([`18:13`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1093)) |
| Same model, **high** reasoning | **Spun up sub-agents in the background** to hunt for more data to feed later questions | Same opening question, plus **quick pre-written answer options** ([`18:13`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1093)) |

Operational note he catches himself on: he'd been running that model **low and slow** when he should have been running it **high and fast** — better answers, faster ([`17:49`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1069)).

## Why the multiple-choice format matters

- Because question-asking UI in most agent harnesses isn't good enough, the lettered-options format lets you **blast through answers as "1A, 2B, 3A"** — much faster than prose replies ([`18:13`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1093), [`18:44`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1124)).

## Round 2 — the questions get uncomfortable

The follow-up round produced **10+ harder questions** ([`23:56`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1436), [`27:01`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1621)):

- **Which form of simplicity matters most?** — Theo wants all three and is forced to pick one. *"This is brutal… I don't want to answer these questions. That's the point, isn't it?"* ([`24:25`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1465))
- Which rule wins when the current guidance contains principles that will conflict? ([`19:11`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1151))
- What is the product boundary — does Lakebed stay a real, open, useful system while the hosted cloud platform is the production path? ([`19:11`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1151))
- If the developer and the agent are both primary users, **what does each one own** — who chooses architecture, data models, deploy timing? ([`24:47`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1487))
- Does "everything" include irreversible actions — should authorized agents be able to delete production data? ([`24:47`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1487))
- Where is the payment boundary? ([`24:47`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1487))
- What must the local simulation preserve? ([`25:14`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1514))

## Outcome

- The questioning surfaced **real cleanup work** on Lakebed that Theo hadn't scheduled — he realizes mid-interview that the project needs tidying ([`19:11`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1151)).
- He finds himself **disagreeing with the recommended answers fairly often**, which he reads as a sign the exercise is doing real work: *"This is actually going to help me. I'm annoyed."* ([`25:14`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1514))
- Verdict: **"Okay, I'm seeing the light. This is useful. I should have tried this before."** ([`19:47`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1187)) He commits to finishing the remaining questions off-stream because they're worth answering ([`27:01`](https://www.youtube.com/watch?v=0oXOOlqVu5M&t=1621)).
