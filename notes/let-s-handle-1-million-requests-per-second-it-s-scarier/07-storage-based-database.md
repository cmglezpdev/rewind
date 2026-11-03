# PostgreSQL write and read limits

## Write route

- The `/code` route generates a 500-character code and inserts it into PostgreSQL. [`1:01:57`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3717)
- The table has an ID, a creation timestamp, and the random code. [`1:02:17`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3737)
- A first attempt with 5,000 connections causes many timeout errors, so the uploader lowers the test to 300 connections. [`1:03:47`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3827) [`1:05:14`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3914)
- At 300 connections, the database handles about 35,000 writes per second with no errors, processing about 700,000 requests. [`1:05:14`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3914) [`1:05:31`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3931)
- The server CPU and network are mostly idle, so PostgreSQL is the limit, not Node. [`1:06:17`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3977) [`1:06:41`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4001)
- The setup opens about 1,000 PostgreSQL connections because 128 Node instances each use a default pool of 10 connections. [`1:07:09`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4029) [`1:07:30`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4050)
- Raising provisioned IOPS from 3,000 to 12,000 improves writes to about 66,000 per second, but adds about $1,000/month. [`1:08:28`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4108) [`1:08:53`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4133) [`1:09:11`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4151)
- The suggested pattern is to buffer high-volume writes and batch them into PostgreSQL later instead of trying to write every request directly to storage. [`1:09:56`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4196)

## Read routes

- The database is seeded with 10 million records because a million-request-per-second service would likely have at least that much data. [`1:11:16`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4276) [`1:11:43`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4303)
- Seeding 10 million records takes about 30 minutes. [`1:12:26`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4346)
- Version 1 uses `order by random()`, which is `O(n)` because it scans the table before choosing a row. [`1:14:11`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4451) [`1:14:26`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4466)
- With 10 million records, the `order by random()` route takes about 43 seconds for one response. [`1:14:41`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4481)
- Version 2 still performs badly because `count(*)` is also `O(n)` in this setup. [`1:15:50`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4550)
- Version 3 gets the max ID, generates an ID, and then looks up the row, reaching about 200,000 requests per second. [`1:16:24`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4584) [`1:17:33`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4653)
- Version 4 does a simpler indexed ID lookup and reaches about 400,000 requests per second without errors. [`1:18:21`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4701) [`1:18:58`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4738)
- Increasing disk speed again does not materially improve the best read route, because database CPU reaches 100%. [`1:20:04`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4804) [`1:21:21`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4881)

## Cost conclusion

- Scaling PostgreSQL toward 1 million reads and writes per second would likely require multiple or much larger database instances and could cost $20,000 to $30,000/month or more. [`1:22:01`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4921) [`1:22:40`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4960) [`1:23:17`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4997)
