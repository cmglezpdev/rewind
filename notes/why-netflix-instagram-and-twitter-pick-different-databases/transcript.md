# Why Netflix, Instagram, and Twitter Pick Different Databases

*ByteMonk · 10:49 · https://www.youtube.com/watch?v=XjHZCprrEgk*

## 1. Why Different Companies Choose Different Databases

[`0:00`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=0) Netflix writes 3 million records per second to their database. Instagram stores over a billion users on PostgreSQL for years. And Twitter serves 300,000 timeline requests per second from Redis. Three of the biggest platforms in the world. Three completely different database choices. Why? It's not because one database is better than another. It's because each company has fundamentally different access patterns.

[`0:25`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=25) And the database that's perfect for one would be a disaster for another. So, today I'm going to reverse engineer the database architecture of all three companies. Not just what they use, but why they chose it. What trade-offs they accepted, and what would break if they'd chosen differently. And by the end, you'll have a mental framework for making these decisions yourself. Whether you're building a startup or answering this in a system design interview.

[`0:49`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=49) Let's get started.

## 2. Netflix’s Data Problem (Millions of Writes/sec)

[`0:56`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=56) Let's start with Netflix. Think about what happens when you open the app. Netflix needs to track what you're watching, what you paused, what you searched for, what you hovered over, what device you are on. Every single interaction generates data. Multiply that across 260 million subscribers worldwide, many watching simultaneously, and you get a write volume that would crush most databases.

[`1:22`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=82) We are talking 3 plus million writes per

## 3. Why Netflix Uses Cassandra

[`1:24`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=84) second. Their choice, Apache Cassandra. Netflix's primary database for most of their services is Cassandra. And the reason comes down to one thing. Cassandra is built for write throughput at horizontal scale. Here's the secret most people don't know about Cassandra. At its core, it's essentially a distributed hash map.

[`1:46`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=106) So, when you write data, Cassandra hashes your partition key and routes the write to the responsible nodes. The write goes to an in-memory structure called a memtable, gets an acknowledgement, and the client moves on. No locks, no coordination with other nodes for the primary right. This is why it handles millions of writes per second.

[`2:05`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=125) Each right is essentially an append operation with minimal overhead.

## 4. Cassandra Architecture Explained (Memtables & Writes)

[`2:10`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=130) But, here is what Netflix gave up. Cassandra's read flexibility is extremely limited. There are no joins, there are no ad hoc queries. You can't just write a SQL query to answer a random business question. Netflix handled this by modeling data around their queries, not their entities.

[`2:26`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=146) If they need to look up viewing history by user, that's one table with user ID as the partition key. If they need to look up what's trending by region, that's a completely different table with the same data organized differently. Yes, they store the same data multiple times.

[`2:42`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=162) In a relational database, data duplication is a sin. In Cassandra, it's

## 5. Cassandra Trade-offs: No Joins & Denormalization

[`2:46`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=166) the strategy. You denormalize aggressively so that every query is simple partition key lookup. Engineers who try to use Cassandra like a relational database, like doing multiple partition queries and secondary index lookups, end up with 200 ms read latencies, and wonder what went wrong.

[`3:04`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=184) The answer is they are fighting the

## 6. Why Postgres Would Struggle at Netflix Scale

[`3:06`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=186) database design. Quote, "They have used Postgres instead."For reads, absolutely. Postgres is fantastic for flexible queries. But, at 3 million writes per second, a single Postgres instance would fall over. Even with read replicas, connection pooling, and partitioning, you'd need an army of Postgres instances and a complex sharding layer. Cassandra gives you that horizontal right scaling natively.

## 7. Instagram’s Completely Different Problem

[`3:31`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=211) Instagram's challenge is different. Think about what the app needs to do. Show your feed of posts from people you follow. Load a user's profile with their post count and follower count. Let you search for users. Show comments on a post sorted by time or popularity. And handle likes, follows, and DMs.

[`3:49`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=229) These are highly relational queries. Each feed requires joining posts with follow relationship, your profile needs aggregating counts across multiple record types,

## 8. Why Instagram Chose PostgreSQL

[`3:59`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=239) comments need sorting and pagination. Instagram chose PostgreSQL and they ran their entire back-end on it for years with over a billion users. This surprises a lot of people. Surely at Instagram scale, you need some fancy distributed no SQL system. Not necessarily and here is why.

[`4:16`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=256) Instagram's workload is read heavy. People scroll feeds far more often than they post. And the queries they need are exactly what PostgreSQL excels at. Joins, aggregation, complex filtering, sorted pagination. If they'd use Cassandra, they'd have to pre-compute and denormalize every possible query pattern. That feed you see, it would need a separate materialized table.

[`4:37`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=277) Search, another table. Follower counts, pre-aggregated in yet another table. Anytime your product manager wants a new feature that queries data differently, the team needs to build the new denormalized pipeline. With Postgres,

## 9. Scaling Postgres to a Billion Users

[`4:53`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=293) you write a new query, done. Now, running Postgres at Instagram scale isn't trivial. They didn't just spin up a single dbr5.large and call it a day. They used an aggressive combination of techniques. Starting with connection pooling. They implemented connection pooling with PG bouncer to handle thousands of concurrent connections without overwhelming Postgres. Read replicas to distribute read traffic across multiple instances.

[`5:20`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=320) Partitioning to split massive tables into manageable chunks and smart indexing to make sure the most common queries hit indexes and never do full

## 10. Key Lesson: Access Patterns Matter

[`5:28`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=328) table scans. The lesson here is powerful. You can stretch any database far beyond its intended limits with good engineering. Instagram proved that you don't need to reach for distributed no SQL just because your user count is high. If your access pattern are relational, use a relational database and invest in making it scale.

[`5:47`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=347) That's it. Instagram doesn't use Postgres for everything. Their messaging system, their real-time notifications, their analytics pipeline, these all use different storage systems optimized for those specific patterns. The key is that they didn't prematurely abandon Postgres for their core use case just because someone told them SQL

## 11. Twitter’s Timeline Challenge

[`6:06`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=366) doesn't scale. Now, Twitter's core challenge is the timeline. When you open Twitter, you need to see the most recent tweets from everyone you follow. And it needs to load instantly. Not in 200 milliseconds, not in 100 milliseconds, instantly. The timeline is a deceptively hard problem. A user might follow 2,000 accounts.

[`6:24`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=384) Each of those accounts might tweet multiple times a day. And you need to merge all of those tweets, rank them, and serve the result in single-digit milliseconds.

## 12. Why Twitter Uses Redis (Caching Layer)

[`6:37`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=397) The choice? Redis, as a cache, not a database. Twitter's answer is Redis. They serve timelines from Redis at over 300,000 requests per second per node. And the timelines are precomputed. Here is how it works. When a user tweets, Twitter doesn't wait for the followers to request a tweet. Instead, they use a pattern called fan-out on write, which I've covered in

## 13. Fan-Out-on-Write Explained

[`7:00`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=420) a previous video. The tweet gets pushed into the Redis timeline cache of every follower. So, even when you open Twitter, your timeline is already assembled and sitting in memory ready to be served. Redis makes this possible because it operates entirely in memory. There's no disk read, no query parsing, no index lookup.

[`7:18`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=438) Your timeline is a prebuilt list sitting in RAM. And reading it takes microseconds. But, here's the thing that separates good engineers from the ones who lose

## 14. Redis Is NOT the Source of Truth

[`7:29`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=449) user data. Twitter never treats Redis as the source of truth. Redis is a cache. The actual tweets are stored in a durable database. The architecture follows a pattern you'll see at almost every large company. Write to the durable store first, then replicate to Redis, read from Redis, if Redis fails, fall back to the durable store. This is critical.

[`7:51`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=471) Companies that skip the source of truth step and use Redis as their primary database, eventually write a postmortem title, "How we lost 2 days of user data."Redis by default can lose data on restart. It's designed for speed, not durability.

[`8:07`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=487) Now, there's a fascinating edge case in

## 15. Celebrity Problem & Hybrid Fan-Out Strategy

[`8:09`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=489) Twitter's architecture. What happens when someone with 80 million follower tweets? If you fan out on write, that's 80 million Redis list updates for a single tweet. That's insanely expensive. Twitter handles this with a hybrid approach. Regular users get fan out on write. Their tweets are pre-pushed to followers' timeline. But celebrity accounts, accounts with millions of followers, use fan out on read instead.

[`8:34`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=514) So, when you open your timeline, Twitter merges your pre-built timeline from Redis with real-time lookups of tweets from celebrity accounts you follow. This is the kind of nuanced architecture decision that separates real system design from textbook concepts. There is no one-size-fits-all solution, even with a single feature.

## 16. How to Choose the Right Database (Framework)

[`8:53`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=533) So, what's our takeaway? How do you pick the right database for your system? It comes down to three questions. First, what's your primary access pattern? If it is flexible queries with joins and aggregations, lean relational like PostgreSQL. If it's massive write throughput with predictable key-based reads, look at Cassandra or DynamoDB.

[`9:14`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=554) If it is ultra-low latency reads of pre-computed data,

## 17. Trade-offs Between Postgres, Cassandra & Redis

[`9:18`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=558) Redis as a caching layer. Second, what are you willing to sacrifice? Every database optimizes for some things by giving up others. PostgreSQL gives you flexibility, but struggles with massive write throughput. Cassandra gives you write scale, but takes away query flexibility. Redis gives you speed, but sacrifices durability and storage capacity.

[`9:41`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=581) Third, do you actually need it? This is

## 18. Do You Actually Need Distributed Databases?

[`9:44`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=584) the most important question. Most systems don't need fancy databases. A well-indexed PostgreSQL handles more load than 95% applications will ever see. Don't choose Cassandra because Netflix uses it when your app has 10,000 users. Choose it when you actually have the access pattern and scale that demanded.

## 19. Final System Design Takeaways

[`10:03`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=603) Netflix, Instagram, and Twitter all made different database choices, and they were all right because they weren't picking the best database. They were picking the best database for their specific access pattern. And that's the real skill in the system design, not memorizing which database is fastest or most scalable.

[`10:19`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=619) Understanding your data, your queries, your trade-offs, and then matching them

## 20. Outro & Course Mention

[`10:24`](https://www.youtube.com/watch?v=XjHZCprrEgk&t=624) to the right tool. If this is the kind of deep system design thinking you want to master, do check out my system design master course. I go into these architectural patterns in much more detail with hands-on examples you can use in interviews and on the job. Link in the description, and if you found this video useful, drop a like and subscribe. I'll see you in the next one.
