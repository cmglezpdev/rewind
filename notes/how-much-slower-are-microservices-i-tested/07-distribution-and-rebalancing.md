# Four-server deployment and resource rebalancing

## One machine per service

- Users, profiles, articles, and comments each receive a two-vCPU machine. HTTP supports 18,000 users; gRPC supports 19,000. The four-server replicated monolith supports 50,000. [`7:17`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=437)
- In the HTTP run, articles reaches roughly 95% CPU while comments uses only 52%, with users and profiles in between. Equal allocations leave spare CPU on a machine that cannot relieve the article bottleneck. [`7:38`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=458)

## Reallocate using measurements

1. Add a second articles replica alongside comments on the comments machine. [`7:59`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=479)
2. Adjust traffic distribution while retaining the same four two-vCPU servers and budget. [`7:59`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=479)
3. Retest both protocols. HTTP improves from 18,000 to 20,000 users; gRPC improves from 19,000 to 30,000. [`7:59`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=479)

| Four-server arrangement | HTTP users | gRPC users | Source |
| --- | ---: | ---: | --- |
| One service per server | 18,000 | 19,000 | [`7:17`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=437) |
| Extra articles replica sharing comments' server | 20,000 | 30,000 | [`7:59`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=479) |

- gRPC capacity improves roughly 58% without more hardware and roughly matches its single-large-server result. Resource allocation explains a substantial part of the initial distributed-deployment loss. [`8:21`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=501)
- In the rebalanced layout, gRPC consumes about 0.91 ms CPU per public request versus HTTP's 1.27 ms, about 28% less. The presenter says this explains much, but not every detail, of HTTP's load behavior. [`8:21`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=501) [`8:46`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=526)
- Even the improved 30,000-user result remains below the replicated monolith's 50,000-user capacity. [`8:21`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=501)
