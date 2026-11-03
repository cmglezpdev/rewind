# Alerts and continuous testing in production

## Alerts and reports

- Set up alerts on quality thresholds — e.g. hallucination rate rising above your usual baseline [`4:01`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=241)
- Alternatively, periodic reports — e.g. a weekly digest of the most interesting conversations to read [`4:01`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=241)

## Test datasets still matter after launch

- New failures and edge cases seen in production should be **added to your test datasets** [`4:01`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=241)
- Answer to "do I still need test datasets with real production data?" — **yes** [`4:16`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=256):
  - you keep changing the app: trying new models, fixing bugs, adjusting prompts [`4:16`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=256)
  - each change needs **regression testing** — re-run tests to confirm nothing broke [`4:32`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=272)
  - keep making tests **more representative** by adding production examples [`4:32`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=272)

## Why real-time observability, in two reasons

1. **Continuous improvement** — spot and solve issues efficiently [`4:53`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=293)
2. **Peace of mind** — confidence that everything is under control and performing smoothly [`4:53`](https://www.youtube.com/watch?v=r-CYvjJ-W3k&t=293)
