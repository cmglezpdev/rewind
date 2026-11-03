# C++ with Drogon and RapidJSON

- This section solves the original 30 KB patch route without buying endlessly larger machines. [`1:51:53`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6713) [`1:52:19`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6739)
- The new `c8gn.48xlarge` "beast" instances have 192 CPU cores, 384 GB RAM, and 600 Gbit/s network performance, at about $11/hour or $8,000/month each. [`1:52:41`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6761) [`1:53:02`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6782) [`1:53:25`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6805)
- The Node test runs about 180 processes instead of 192 to leave some cores free. [`1:54:02`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6842)
- With Node/Cpeak on the beast server, the route moves more than 20 GB/s, about 160 Gbit/s, but CPU becomes the limiting factor before the 600 Gbit/s network is saturated. [`1:55:15`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6915) [`1:55:35`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6935)
- Express on the same heavier route can barely reach about half a million requests per second. [`1:56:30`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6990) [`1:56:53`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7013)
- Cpeak or Fastify can get close, but Node's parent-process distribution overhead blocks the final jump to 1 million per second. [`1:57:24`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7044) [`1:56:13`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6973)
- The route is rewritten in C++ with Drogon, one of the fastest web frameworks the uploader knows. [`1:58:05`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7085) [`1:58:24`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7104)
- Drogon's default JSON parser is initially slower than Node/V8 for this case, so the uploader switches to RapidJSON. [`1:58:56`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7136) [`2:00:04`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7204)
- Compression and logging are disabled to keep the test comparable and preserve the intended 30 KB response size. [`2:00:34`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7234) [`2:00:52`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7252)

## Result

- The C++ server averages about 1 million requests per second over 60 seconds and reaches about 1.2 million in better samples. [`2:03:27`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7407)
- The test moves about 38 GB/s, roughly 300 Gbit/s, and transfers about 2 TB in one minute at the application layer. [`2:03:54`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7434) [`2:05:05`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7505)
- The C++ process uses far less memory than the Node setup and leaves about 30% CPU idle, suggesting another limit remains. [`2:03:16`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7396) [`2:06:12`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7572)
- The uploader estimates C++ gives about a 30% request-per-second boost over raw Node/Cpeak while using less CPU. [`2:06:30`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7590)
- Attempts with load balancing across two beast machines do not improve results because the load balancer or system/network limits become the next bottleneck. [`2:07:51`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7671) [`2:08:18`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7698)
