# Redis as an in-memory buffer and read store

- Redis is introduced because memory is much faster than disk: memory read/write speed is described as about 10 times faster than disk, while RAM access time can be thousands of times faster. [`1:24:12`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5052) [`1:24:33`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5073)
- The `code-fast` route performs the same logical write as the PostgreSQL route but writes into Redis instead. [`1:25:10`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5110)
- The tradeoff is that Redis does not give the same relational features as SQL, so the design uses Redis as a fast queue or hot data store and later syncs to PostgreSQL. [`1:25:29`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5129) [`1:25:45`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5145)
- The sync script reads IDs from the Redis queue and gradually writes them into PostgreSQL, which can happen overnight or in a background process. [`1:26:05`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5165) [`1:26:22`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5182)
- The existing PostgreSQL table has about 11 million records and 16 GB of data, small enough to fit in the power machine's roughly 200 GB of RAM. [`1:26:43`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5203) [`1:27:08`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5228) [`1:27:45`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5265)
- A migration script moves the database to Redis in batches of 2,000 rows after flushing Redis. [`1:27:56`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5276) [`1:28:20`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5300)
- Redis stores data as key-value pairs, and the demo inspects inserted codes with Redis CLI commands. [`1:29:22`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5362) [`1:29:43`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5383)

## Benchmarks

- Redis writes reach about 100,000 requests per second, at least three times the earlier PostgreSQL write path. [`1:30:20`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5420) [`1:30:44`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5444)
- Migrating 10 million rows to Redis raises memory usage to about 20 GB, which matches the 16 GB table plus Redis metadata and helper structures. [`1:32:20`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5540) [`1:33:01`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5581) [`1:33:13`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5593)
- Redis reads from one instance reach about 300,000 requests per second, comparable to the best PostgreSQL read but without the expensive database scaling path. [`1:33:52`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5632) [`1:34:27`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5667)
- A single Redis instance is still limited to about 100k reads/writes per second, so it cannot reach 1 million alone. [`1:31:35`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5495)

## Design lesson

- Keep the database of record, but move only hot, high-volume tables or write queues into memory when direct SQL access is too expensive. [`1:34:58`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5698) [`1:35:17`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5717)
