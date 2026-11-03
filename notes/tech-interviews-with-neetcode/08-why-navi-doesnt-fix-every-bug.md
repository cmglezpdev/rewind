# Why Navi doesn't fix every bug

A concrete story about business-driven engineering trade-offs: a vibe-coded service with a known production bug he deliberately leaves unfixed.

## The code execution service

- He was paying **$3,000/month** for a third-party code execution service (runs user-submitted code on NeetCode) [`32:02`](https://www.youtube.com/watch?v=xafwfGVBxos&t=1922)
- With AI-assisted coding, he estimated a rewrite would take a couple of weeks — it actually took **2–3 days** (though "it did take coding skills. Like if I didn't know how to code, I would not have been able to do it") [`32:25`](https://www.youtube.com/watch?v=xafwfGVBxos&t=1945)
- Self-hosting now costs **~$200/month vs $3,000** [`32:47`](https://www.youtube.com/watch?v=xafwfGVBxos&t=1967)

## The bug and the trade-off

- The service has a bug (likely a memory leak): every couple of days one or two instances crash [`32:47`](https://www.youtube.com/watch?v=xafwfGVBxos&t=1967)
- Root-causing it would probably take *longer than the 3 days it took to build*, so instead he runs ~4 redundant instances; crashed ones are replaced within a couple of minutes [`33:14`](https://www.youtube.com/watch?v=xafwfGVBxos&t=1994), [`38:17`](https://www.youtube.com/watch?v=xafwfGVBxos&t=2297)
- "The engineer in me hates that… but the business value makes no difference. There has been practically zero outages. I have less outages than LeetCode" [`36:05`](https://www.youtube.com/watch?v=xafwfGVBxos&t=2165)
- He rolled it out carefully: small traffic percentage for a couple of weeks against the original service, expecting issues that never materialized [`37:52`](https://www.youtube.com/watch?v=xafwfGVBxos&t=2272)
- Fixing it would only save "a couple hundred bucks more" in server pool size — not worth it. The new service is also faster (better hardware) and no user has complained [`37:33`](https://www.youtube.com/watch?v=xafwfGVBxos&t=2253), [`38:17`](https://www.youtube.com/watch?v=xafwfGVBxos&t=2297)

## The host's pushback

- Gergely challenges: isn't this typical AI-coding behavior — replacing a SaaS with something subpar that's now too hard to fix because you didn't write it? [`37:12`](https://www.youtube.com/watch?v=xafwfGVBxos&t=2232)
- Resolution: packaged together (cheaper + faster + replicated), it's overall better than before — an obvious business decision that raises the question of how perfectionist to be when a problem is already solved well enough [`38:41`](https://www.youtube.com/watch?v=xafwfGVBxos&t=2321)
- Navi concedes it still bothers him, but he's learned to prioritize actual value, short and long term [`39:03`](https://www.youtube.com/watch?v=xafwfGVBxos&t=2343)
