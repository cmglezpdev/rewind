# Hallucination metrics versus code-audit results

## Why the public metric and private audits disagree

- Artificial Analysis reports a 15% hallucination rate for Gemini, the lowest among models scoring above 45 on its Intelligence Index, according to the results Theo shows. [`21:36`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1296)
- Theo explains that AI Omniscience rewards correct answers, penalizes wrong answers, and treats refusals neutrally. Gemini ranks fourth on the overall score despite its low hallucination rate; he interprets this as a tradeoff involving more abstention and fewer correct answers. [`22:03`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1323)
- His code audits use a different procedure: ask models for findings, validate their claims, then have a panel of judges rate the results. Those findings, rather than the general knowledge benchmark, drive his coding verdict. [`22:28`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1348) [`22:58`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1378)

## TS Rust codebase audit

| Model | Judge score out of 10 | Claims | Runtime | Reported cost |
| --- | --- | --- | --- | --- |
| 6.1 Soul | 8.84 | 38 true, none wrong. [`22:58`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1378) | 28 min | $4. [`23:23`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1403) |
| Opus 5.5 | 8.78 | One wrong | 49 min | $24. [`23:23`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1403) |
| Gemini 4 Argan | 4.38. [`23:48`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1428) | 24 false out of 36 | 43 min | About $3. [`24:16`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1456) |

- Astra also makes no wrong claims and takes 20 minutes. Theo says its Max run scores worse than X High, using this as a reason to question automatically choosing maximum reasoning effort. [`23:23`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1403) [`23:48`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1428)
- The low Gemini cost does not offset its false findings in Theo's assessment. These are results from his audit, not a population-wide estimate of coding accuracy. [`24:16`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1456) [`24:40`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1480)

## T3 code bulk remote-update bug audit

- Opus 5.5 scores 8.22, with five wrong claims out of 46, in 20 minutes for $26. It identifies some high-severity issues that Soul misses. [`25:37`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1537)
- 6.1 Soul makes no incorrect claims, takes 10 minutes, and costs $1, although its overall score is lower. [`25:37`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1537) [`26:01`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1561)
- Muse takes six minutes, scores lower, and has roughly Opus's error rate. Theo values its readable output. Gemini makes 14 wrong claims out of 40. [`26:01`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1561) [`26:22`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1582)

## Lakebed audit

- Soul scores 9/10; Gemini scores 2.25/10 and has 56 wrong findings out of 78, which Theo describes as about a 70% failure rate. [`26:47`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1607) [`27:13`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1633) [`27:33`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1653)
- The transcript also reports comparison scores around 8.5, 8.25, and 5.75, but the adjacent model names are garbled. These notes retain the clear Soul/Gemini comparison rather than assign those ambiguous numbers to models. [`27:13`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1633)
- Theo recommends checking Gemini's work with Soul, Opus, or another more reliable model if using it for real code work. [`27:33`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1653)

## T3 code architecture audit

| Model | True claims | Partially true | False claims |
| --- | --- | --- | --- |
| Muse Wonderful | 29 | 8 | 4. [`28:34`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1714) |
| Gemini 4 Argan | 31 | 14 | 47. [`28:34`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1714) |

- Gemini's overall score is 3.95/10. Its larger finding count includes far more false findings, so volume alone would give a misleading impression of audit quality. [`28:07`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1687) [`28:34`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1714)
- Theo also criticizes Gemini's long, low-value explanations. He distinguishes Muse Wonderful Full from the standard Muse Wonder, which he rejects. [`29:06`](https://www.youtube.com/watch?v=NE006pkiAnk&t=1746) [`36:30`](https://www.youtube.com/watch?v=NE006pkiAnk&t=2190)
