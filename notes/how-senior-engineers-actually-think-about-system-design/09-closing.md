# Closing

## The architecture in order

1. Start with one server and one database. [`35:53`](https://www.youtube.com/watch?v=EaXHfuHRWwg&t=2153)
2. Add identical app servers and a load balancer when one server cannot handle concurrent traffic. [`35:53`](https://www.youtube.com/watch?v=EaXHfuHRWwg&t=2153)
3. Put sessions in a shared store so those servers remain interchangeable. [`35:53`](https://www.youtube.com/watch?v=EaXHfuHRWwg&t=2153)
4. Pool database connections and send most reads to replicas when the database becomes the bottleneck. [`35:53`](https://www.youtube.com/watch?v=EaXHfuHRWwg&t=2153)
5. Cache repeated expensive answers. [`35:53`](https://www.youtube.com/watch?v=EaXHfuHRWwg&t=2153) [`36:22`](https://www.youtube.com/watch?v=EaXHfuHRWwg&t=2182)
6. Put slow, deferrable work on a queue for background workers. [`36:22`](https://www.youtube.com/watch?v=EaXHfuHRWwg&t=2182)
7. Shard only when the full dataset no longer fits on one machine. [`30:05`](https://www.youtube.com/watch?v=EaXHfuHRWwg&t=1805) [`34:57`](https://www.youtube.com/watch?v=EaXHfuHRWwg&t=2097)

## Final lesson

- Many production applications need no more than the load-balanced, stateless, pooled, replicated, cached, and queued architecture described here. [`29:40`](https://www.youtube.com/watch?v=EaXHfuHRWwg&t=1780) [`36:22`](https://www.youtube.com/watch?v=EaXHfuHRWwg&t=2182)
- Tools, including AI, can implement the components. Engineering judgment decides which components the product needs and which costs it can accept. [`36:22`](https://www.youtube.com/watch?v=EaXHfuHRWwg&t=2182)
- In system-design interviews and real projects, naming technologies is not enough. Strong reasoning explains why to choose each one, why to add it at that point, and what tradeoff follows. [`36:59`](https://www.youtube.com/watch?v=EaXHfuHRWwg&t=2219) [`37:31`](https://www.youtube.com/watch?v=EaXHfuHRWwg&t=2251)
