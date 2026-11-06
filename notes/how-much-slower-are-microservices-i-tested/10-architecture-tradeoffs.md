# Team independence, blast radius, and architectural choice

## When the overhead may be worthwhile

- The best tested microservices setup supports 30,000 users, half the large monolith's capacity and 40% less than the replicated monolith. The organizational benefits must justify that cost for this workload. [`7:59`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=479) [`10:53`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=653)
- Well-defined boundaries let teams build, test, deploy, and roll back independently. Smaller builds and deployments, plus service-specific languages and frameworks, can help large organizations ship reliably. These benefits are outside the benchmark's measurements. [`10:53`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=653) [`11:11`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=671)
- Independence is conditional. A feature that requires API changes and coordinated deployments across four services still imposes integration work and version-compatibility constraints during rollout. [`11:35`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=695)

## Failure isolation requires dependency design

- A bad service deployment can leave other parts working only when they tolerate that dependency being unavailable. In this experiment, several services need user information, so breaking users affects more than user-management endpoints. [`11:50`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=710)
- Separate services create an opportunity to reduce blast radius; moving code into another process alone does not provide that protection. [`11:50`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=710)

## The presenter's recommendation

- The presenter predicts modular monoliths will become a more common starting point as smaller teams take on more work with AI. This is his expectation, not a benchmark finding. [`12:15`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=735)
- A modular monolith retains clear internal code boundaries while simplifying operation and avoiding much internal service-communication overhead. [`12:15`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=735)
