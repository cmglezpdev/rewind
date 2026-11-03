# 11. The five rules and the closing argument

## The five takeaways the video states

1. **Don't shard until you absolutely have to.** Most teams reach for sharding far too early — Instagram did not shard until **27 million users** ([`20:33`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=1233)).
2. **When you do shard, separate logical from physical.** Never hardcode the number of shards in your application; create **many logical shards** ([`20:59`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=1259)).
3. **Use Snowflake-style IDs from day one** — even unsharded, even with no plan to shard. Migrating off auto-increment after billions of rows is very painful ([`20:59`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=1259)).
4. **Connection pooling is the first bottleneck.** No PgBouncer at meaningful scale = the highest-leverage fix available to you this week ([`20:59`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=1259), [`21:23`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=1283)).
5. **Boring tech wins more often than not.** Adopt new infrastructure only when you have a genuinely new problem ([`21:23`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=1283)).

## The closing argument

- Most engineers believe Postgres cannot handle planet-scale workloads; Instagram showed otherwise ([`21:44`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=1304)).
- The central claim: **the database is not the bottleneck — the architecture around it is** ([`21:44`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=1304)).
- The three walls Instagram hit, in order ([`21:44`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=1304)):
  1. The **connection pooling** wall
  2. The **vertical scaling** wall
  3. The **IDs** wall
- The two things they invented in response ([`22:11`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=1331)):
  - **Snowflake-style IDs for Postgres**
  - A **logical-to-physical mapping** for shards
- The final framing, stated as a correction of the obvious reading ([`22:11`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=1331)):

> The lesson is not "use Postgres because Instagram used Postgres." The lesson is **understand what you already have before you reach for something new**.

## Not covered as topics

Two promotional segments interrupt the technical content and carry no study material: the AlgoRock cohort pitch at [`5:20`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=320)–[`6:45`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=405) (repeated at [`21:23`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=1283)) and the channel playlist plug at [`17:11`](https://www.youtube.com/watch?v=YLoYcwnqVzM&t=1031).
