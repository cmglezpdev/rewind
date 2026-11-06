# What gRPC improves

- Only internal communication changes to gRPC; the public API remains HTTP/JSON. Internal messages use a defined schema and protocol buffers instead of JSON, changing transport and encoding overhead. [`6:46`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=406)

| Same eight-vCPU server | Maximum users | App CPU per public request | Source |
| --- | ---: | ---: | --- |
| Monolith | 60,000 | About 0.47 ms | [`4:56`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=296) [`6:20`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=380) |
| HTTP/JSON microservices | 25,000 | About 1.2 ms | [`5:39`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=339) [`6:20`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=380) |
| gRPC microservices | 29,000 | About 1.01 ms | [`6:46`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=406) [`7:05`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=425) |

- gRPC improves capacity and CPU efficiency, but separate processes, separate requests, and dependencies between services remain. Protocol overhead explains only part of the gap. [`7:05`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=425)
