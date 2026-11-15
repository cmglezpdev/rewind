# Removing assumed organizational constraints

## The dashboard layout example

1. A recursive, nested dashboard layout needed a data representation. Theo's team assumed the GraphQL edge team would reject a JSON blob, so they proposed a complex node system fetched as a flat array and reconstructed into a layout. [`22:49`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1369) [`23:20`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1400)
2. Theo described the problem directly to Tony, who ran the GraphQL edge team, without presenting the competing solutions first. Tony independently suggested storing the JSON blob and saw no reason against it for that case. [`23:49`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1429)
3. Tony said the other engineers had never contacted him. The conversation also exposed platform-side frustration at receiving poor PRs without meaningful dialogue from product teams. [`24:06`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1446)

## What this teaches

- An assumed policy can create unnecessary architecture. In this example, asking the owner of the supposed restriction resolved the uncertainty. The anecdote supports that specific representation choice, not a general rule to store all GraphQL data as JSON. [`23:20`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1400) [`23:49`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1429)
- Theo says discussions about getting the JSON stored consumed more time than building the dashboard. He argues that some development friction disappears after one conversation and a small platform change. [`24:38`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1478)
- Internal politics and poor mutual understanding can make teams prefer complex local workarounds over asking another team for help. Crossing those boundaries became central to his approach. [`25:20`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1520) [`25:38`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1538)
