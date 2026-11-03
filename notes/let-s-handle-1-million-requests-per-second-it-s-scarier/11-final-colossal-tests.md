# The final colossal tests

- The final round investigates why the C++ beast server still has about 30% idle CPU. [`2:09:04`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7744)
- The real limit appears to be the tester: one tester cannot open enough connections to drive the remaining server capacity. [`2:09:23`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7763)
- Instead of one giant tester, the uploader launches many smaller `c8gn.2xlarge` tester instances, each with 8 CPU cores and 16 GB RAM. [`2:09:42`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7782) [`2:09:58`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7798)
- AWS regional quota blocks 100 and 80 instances, but 60 tester machines launch successfully. [`2:10:32`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7832) [`2:11:06`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7866)
- The 60 testers alone cost about $20,000/month, or roughly $30/hour, before adding the beast server. [`2:11:32`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7892)
- A script sends AutoCannon work to all 60 machines and collects their outputs. [`2:11:54`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7914)
- With 60 testers, 400 connections per tester, and pipelining of 5, the server handles about 120,000 concurrent in-flight requests. [`2:13:12`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7992) [`2:13:50`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8030)
- During the big run, the server reaches 0% idle CPU, so the distributed tester setup finally drives the whole beast server. [`2:14:38`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8078)
- A 1-hour terminal-based attempt works on the server but fails to produce clean logs, so the uploader changes the collection approach. [`2:16:13`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8173) [`2:16:43`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8203)

## Clean logging approach

- The second approach runs AutoCannon through a Node script on each tester and writes results to `results.txt`. [`2:17:36`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8256) [`2:18:07`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8287)
- The script records start and finish times because machines may not all start the test at the exact same moment. [`2:18:23`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8303)
- AWS Systems Manager sends the command to all 60 servers, `max concurrency` is set to 100%, and outputs go to S3 and CloudWatch. [`2:20:14`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8414) [`2:20:38`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8438) [`2:21:00`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8460)
- The final clean test runs for 30 minutes. [`2:22:22`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8542) [`2:23:25`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8605)

## Load balancer note

- A Network Load Balancer test with two beast servers performs worse than direct testing, dropping to about 5 GB/s in the shown result. [`2:23:50`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8630) [`2:25:02`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8702)
- AWS support reports that load balancer capacity reached a limit of 165 consumed capacity units and that more capacity must be reserved in advance. [`2:25:30`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8730) [`2:25:50`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8750)
- The uploader decides not to repeat the reserved-capacity load balancer experiment because moving terabytes per minute is expensive. [`2:27:20`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8840)

## Final result

- All 60 tester outputs are collected and verified by counting 60 result lines. [`2:31:51`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9111) [`2:32:08`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9128)
- Across 30 minutes, the system handles about 2 billion requests and moves more than 60 TB of data. [`2:34:13`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9253)
- Out of about 2 billion requests, only 40 timeouts are reported. [`2:32:25`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9145) [`2:34:36`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9276)
