# Single-server and replicated monolith baselines

| Configuration | Maximum users | Additional measurement | Source |
| --- | ---: | --- | --- |
| One monolith on 8 vCPU / 16 GB | 60,000 | About 15,400 requests/second | [`4:56`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=296) |
| Four monolith replicas, each on 2 vCPU / 4 GB | 50,000 | About 17% lower capacity | [`5:16`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=316) |

- In the replicated layout, NGINX distributes requests across four copies of the same application. Every copy handles every endpoint and connects to the shared database. This is horizontal monolith scaling, before any service split. [`4:56`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=296)
- The smaller machines each incur operating-system and networking overhead. Their underlying hosts also differ; one used more CPU than its peers for roughly equal traffic. The presenter identifies these as contributors to the capacity loss. [`5:16`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=316)
- Keep both baselines when interpreting later results: 60,000 users for the large server and 50,000 for the four-server layout. Hardware distribution already changes capacity without microservices. [`5:16`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=316)
