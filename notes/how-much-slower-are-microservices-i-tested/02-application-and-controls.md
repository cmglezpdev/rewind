# Application design and experimental controls

## Application and data ownership

- Conduit is a Medium-style application supporting articles, follows, feeds, favorites, comments, and profiles. Both implementations use Go and its standard HTTP library. [`1:53`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=113)
- The monolith handles all endpoints in one application. The microservices implementation splits ownership as follows. [`1:53`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=113) [`2:16`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=136)

| Service | Owned data | Source |
| --- | --- | --- |
| Users | User information | [`2:16`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=136) |
| Profiles | Follows | [`2:16`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=136) |
| Articles | Articles, tags, and favorites | [`1:53`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=113) [`2:16`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=136) |
| Comments | Comments | [`2:16`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=136) |

- All services share one Postgres cluster, but separate database roles restrict each service to its own tables. This is shared infrastructure with enforced data ownership, rather than independent database infrastructure per service. [`2:16`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=136)
- Machines and databases run in the same New York data center over a private network; the test adds no cross-region latency. [`2:39`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=159)
- The monolith can join related tables. Services must fetch other services' data through APIs and separate queries. Consequently, this compares complete implementations, not identical SQL with added network delay. [`2:39`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=159) [`2:57`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=177)

## Controls against avoidable inefficiency

- Internal APIs accept batches of IDs, avoiding one author request per article in a list. Connections are reused, login tokens are checked locally, and services communicate directly without an extra proxy or service mesh. [`3:16`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=196)
- Every configuration passes the same 197 public-API conformance checks before benchmarking. Recorded response transcripts match the monolith. [`3:37`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=217)
