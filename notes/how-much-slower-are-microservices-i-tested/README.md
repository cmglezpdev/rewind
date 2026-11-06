---
title: How much slower are Microservices? (I tested)
description: A Go application benchmark comparing monoliths and microservices under equal hardware budgets, with HTTP, gRPC, resource rebalancing, and organizational tradeoffs.
url: https://www.youtube.com/watch?v=bhklFv_VRq8
image: ./cover.webp
tags:
  - architecture
  - distributed-systems
  - system-design
  - cloud
  - databases
language: en
channel: Arjay McCandless
duration: "12:49"
---
# How much slower are Microservices? (I tested)

![Video cover](./cover.webp)

An educational benchmark walkthrough comparing a Go monolith with four microservices under the same application-server budget. It tests HTTP versus gRPC, one large server versus four smaller servers, and resource allocation, then considers scaling, team independence, and failure isolation. [`0:20`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=20) [`1:53`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=113) [`10:53`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=653) [`11:50`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=710)

## Topic breakdown

1. [Architecture basics and the question being tested](./01-architecture-basics.md)
2. [Application design and experimental controls](./02-application-and-controls.md)
3. [Hardware, workload, and scoring](./03-benchmark-method.md)
4. [Single-server and replicated monolith baselines](./04-monolith-baselines.md)
5. [Same-server HTTP microservices and CPU overhead](./05-http-microservices.md)
6. [What gRPC improves](./06-grpc.md)
7. [Four-server deployment and resource rebalancing](./07-distribution-and-rebalancing.md)
8. [Scaling and serverless compute estimates](./08-scaling-and-serverless.md)
9. [Untested optimization options](./09-optimization-options.md)
10. [Team independence, blast radius, and architectural choice](./10-architecture-tradeoffs.md)

The [original transcript](./transcript.md) preserves the full source and timestamp links.

## Key takeaways

- The single-server monolith held 60,000 users at about 15,400 requests/second. Four replicated monoliths held 50,000 users, about 17% less capacity despite equal total vCPU and RAM. [`4:56`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=296) [`5:16`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=316)
- Splitting into HTTP/JSON services on the same large server reduced capacity to 25,000 users. Application CPU per public request rose from about 0.47 ms to 1.2 ms, over 2.5 times as much work. [`5:39`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=339) [`6:20`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=380)
- Internal gRPC raised same-server capacity to 29,000 users and reduced CPU work to about 1.01 ms/request, but retained the service dependency chain. [`6:46`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=406) [`7:05`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=425)
- On four servers, rebalancing raised gRPC capacity from 19,000 to 30,000 users, roughly 58%, without adding hardware. This best microservices result still held 50% fewer users than the large monolith and 40% fewer than the replicated monolith. [`7:59`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=479) [`8:21`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=501) [`10:53`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=653)
- In the rebalanced layout, gRPC used about 0.91 ms CPU/request versus HTTP's 1.27 ms, a measured CPU reduction of about 28%. [`8:21`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=501) [`8:46`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=526)
- Microservices can justify additional compute through independent releases and failure isolation, but both benefits require deliberate boundaries and dependency handling. Separate services alone do not guarantee either benefit. [`11:11`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=671) [`11:35`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=695) [`11:50`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=710)
