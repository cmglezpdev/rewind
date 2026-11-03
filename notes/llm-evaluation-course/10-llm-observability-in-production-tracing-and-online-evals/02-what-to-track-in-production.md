# What to track in production

Four categories of signals for a live LLM app.

## 1. Product metrics

- Engagement signals: how often users use the LLM feature, whether they come back [`0:29`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=29)
- **Interpret with caution**: long chatbot conversations may mean users are *stuck*, not impressed [`0:29`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=29)
- Explicit user feedback: upvotes / downvotes [`0:29`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=29)
- For content-writing apps (e.g. email drafting): track how many edits users make to the draft [`0:47`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=47)

## 2. Manual labeling / log review

- Logs are "your best friend": reviewing them shows what's actually going on and may adjust your perception of what's good and bad [`0:58`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=58)
- Manual review surfaces **new failure modes you didn't anticipate** before production — e.g. responses that are too cheerful but not very helpful [`0:58`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=58) [`1:12`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=72)

## 3. Software monitoring

- Standard, non-LLM-specific metrics: response time, uptime, errors [`1:12`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=72)
- Still critical: slow response times drive users away frustrated [`1:25`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=85)

## 4. LLM quality monitoring

- The LLM-specific layer: evaluate **live responses** for helpfulness, safety, or track popular topics [`1:35`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=95)
