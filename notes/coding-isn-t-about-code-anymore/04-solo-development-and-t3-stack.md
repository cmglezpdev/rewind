# Solo development and the T3 Stack

## Why the old architecture stopped fitting

- Leaving Twitch changed Theo's situation from a company of about 1,500 people to a company of one. At Ping, he no longer had separate teams maintaining client tooling, video infrastructure, and API distribution. [`17:49`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1069)
- He initially recreated familiar infrastructure, including Elixir-backed GraphQL and manually managed client bundles. The product partly worked, but he had taken on the jobs of the missing teams. [`18:15`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1095)
- The new constraint was to retain confidence in the codebase while reducing setup work and ongoing maintenance. [`18:47`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1127)

## What he assembled

1. Next.js supplied the server and React client, with TypeScript connecting the development model. Theo describes the T3 Stack as an assembly of existing tools rather than tools he invented. [`19:06`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1146)
2. Tailwind handled styling. Prisma supplied type safety between the database and backend. [`19:35`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1175)
3. tRPC let TypeScript backend functions be called from the frontend without maintaining separate contracts in GraphQL or OpenAPI. A contract still existed, expressed through TypeScript. [`19:35`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1175) [`19:58`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1198)

## Platform investment inside a product

- Much of the stack emerged from work on Ping while Theo also handled YouTube, fundraising, and business responsibilities. He wanted limited coding time to have a clear destination. [`20:57`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1257) [`21:23`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1283)
- He estimates his work split roughly 50/50 between platform and product. Around half his PRs produced no visible user change, but made the other half easier to land. This describes his experience, not a prescribed allocation for every team. [`21:23`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1283) [`21:48`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1308)
- His recurring method was to pause a feature when implementation became unnecessarily hard, improve the underlying platform, then return to the feature. [`22:04`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1324) [`22:27`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=1347)
