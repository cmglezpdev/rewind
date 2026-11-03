# Routing, caches, and reset timing

## Route for usable capacity

- Default even distribution can leave allowance unused when an account resets. Theo changes routing to favor accounts whose next reset is closest, while retaining enough accounts to handle five-hour limits. [`18:04`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1084) [`18:34`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1114)
- For the Claude 20× plan shown, he says consuming a full five-hour window uses 40% of the Fable seven-day allowance, or 20% of the overall seven-day allowance. Those are different buckets. [`18:55`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1135) [`19:21`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1161)
- He recommends enabling Codex WebSocket support in the proxy to reduce message round-trip delays. The video supplies no measured latency improvement or exact patch. [`20:25`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1225) [`20:51`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1251)
- Session/account affinity means keeping successive prompts in one thread on the same account. His explanation is that caches are account-specific, so switching accounts forces a cache rebuild. [`20:51`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1251) [`21:19`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1279)
- Frequent switches per prompt or tool call waste cache writes. He says the default affinity generally works and caches last five minutes; inspect cache read/write usage when modifying routing. [`21:19`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1279) [`21:47`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1307)

## Two different reset behaviors

- In his description, a Codex reset refills capacity and restarts the weekly clock at seven days. Simultaneous resets can align all accounts and leave a long wait to the next renewal. [`26:18`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1578)
- Codex has immediate resets and banked resets that the user can trigger later. His explanation that off-hours capacity makes immediate resets cheaper is an economic hypothesis, not a verified provider policy. [`26:51`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1611) [`27:14`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1634)
- A Claude reset refills remaining capacity without changing the existing renewal time. A reset just before regular renewal therefore creates a short window to use the extra allowance. [`27:35`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1655) [`28:02`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1682)
- Theo treats unused subscription allowance as expiring capacity: prioritize useful work before renewal. This reverses the incentive of metered API use, where reducing token consumption reduces the bill. [`28:19`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1699) [`28:43`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1723)
