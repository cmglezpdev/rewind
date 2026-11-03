# CPU utilization and threads

- Resource monitoring is treated as mandatory at this scale; the rest of the video depends on reading CPU, network, disk, and memory limits correctly. [`8:24`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=504)
- Core utilization measures how much of a time window one CPU core spent doing work instead of sitting idle. [`9:25`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=565)
- A core that was idle for 30 minutes during a 1-hour window has 50% utilization. [`10:09`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=609)
- CPU utilization can be reported two ways: summed across cores, where a 4-core CPU can show 400%, or normalized to 100%. [`10:27`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=627) [`10:47`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=647)
- A single tight loop in Node.js consumes one core because one thread can only use one core at a time. [`11:39`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=699) [`13:10`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=790)
- On the uploader's 12-core machine, a single-thread loop left much of the total CPU idle. [`12:37`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=757)
- Spawning 12 worker threads runs 12 loops at once, which can drive all 12 cores to full utilization. [`14:02`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=842) [`15:32`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=932)
- More threads can speed CPU-bound work, but they introduce concurrency problems such as race conditions and may require coordination tools such as semaphores. [`14:23`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=863)

## Why this matters later

- A low request rate with idle CPU means the server may be blocked on network, disk, a database, process overhead, or connection limits rather than raw CPU. [`8:24`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=504)
- A fully saturated CPU means the next improvement probably needs less work per request, more cores, a faster runtime, or a different architecture. [`15:47`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=947)
