# Node clustering and framework overhead

- The local Mac Studio has 12 CPU cores, 32 GB of RAM, 10 Gbit/s network performance, and an estimated amortized cost of about $60/month. [`24:03`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1443) [`24:36`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1476)
- Network capacity matters because large responses can make the network card the limit instead of CPU or RAM. [`24:17`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1457)
- Express, Fastify, and Cpeak are compared with the same route logic to measure framework overhead. [`25:13`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1513) [`25:31`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1531)
- Fastify's npm page claims much higher throughput than Express, and the local test shows Fastify around 66,000 requests per second versus Express around 20,000. [`26:06`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1566) [`26:20`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1580) [`26:37`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1597)
- Cpeak is a small, zero-dependency educational framework with about 500 lines of code, intended to stay close to raw Node performance. [`27:01`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1621)
- Cpeak reaches about 73,000 requests per second on the simple route and is comparable to Fastify while beating Express. [`27:45`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1665) [`28:07`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1687)
- The more realistic patch route includes path variables, query parameters, JSON input, dummy checks, and about 32 KB of JSON output. [`29:14`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1754) [`30:24`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1824)
- One Node process on the patch route fully uses one core but leaves much of the machine idle, and throughput drops to about 8,000 requests per second while transferring about 5 GB over 20 seconds. [`31:01`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1861) [`31:18`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1878)
- PM2 cluster mode runs 12 Node instances on the 12-core machine so traffic can use more CPU. [`31:45`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1905) [`32:13`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1933)
- Cluster mode raises the patch route from about 8,000 to about 36,000 requests per second, then about 42,000 requests per second after increasing AutoCannon pressure. [`33:05`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1985) [`33:51`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2031)

## Lesson

- Framework overhead matters, but CPU utilization matters too: the same code can jump sharply just by using all cores. [`33:05`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1985)
- The heavier route is both CPU-intensive and network-intensive, which makes it a better stand-in for real API work than `/simple`. [`34:10`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2050)
