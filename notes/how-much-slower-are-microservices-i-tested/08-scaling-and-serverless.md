# Scaling and serverless compute estimates

- Production traffic mix can shift between features, making independent resource allocation useful. Autoscaled containers or VMs can add capacity; the presenter also describes Amazon deployments using API Gateway, Lambda, and DynamoDB. [`8:55`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=535)
- Microservices do not require serverless infrastructure, and monoliths can run on serverless infrastructure too. [`8:55`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=535)

## Estimated compute for 15,000 requests/second

The presenter multiplies measured application CPU time per request by a target of 15,000 public requests/second, near the monolith's winning throughput. These are extrapolations, not serverless benchmark results. [`9:17`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=557) [`9:41`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=581)

| Configuration | Measured CPU/request | Estimated continuously busy cores | Provisioned cores at 80% utilization | Source |
| --- | ---: | ---: | ---: | --- |
| Monolith | 0.47 ms | About 7 | About 9 | [`9:17`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=557) [`9:41`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=581) |
| Rebalanced gRPC | 0.91 ms | About 14 | About 17 | [`8:21`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=501) [`9:17`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=557) [`9:41`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=581) |
| Rebalanced HTTP | 1.27 ms | About 19 | About 24 | [`8:21`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=501) [`9:17`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=557) [`9:41`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=581) |

- Calculation: busy cores ≈ requests/second × CPU milliseconds/request ÷ 1,000. Dividing by 0.8 estimates provisioned capacity with 20% utilization headroom. [`9:17`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=557) [`9:41`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=581)
- The estimates assume similar CPU cost at the target load and effective load distribution. More compute can handle extra work; serverless does not automatically remove that work. [`9:41`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=581)
- Scaling down during low traffic could change total cost. Actual platform tests are needed to determine whether it is cheaper; this video does not establish serverless pricing or capacity. [`10:05`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=605)
