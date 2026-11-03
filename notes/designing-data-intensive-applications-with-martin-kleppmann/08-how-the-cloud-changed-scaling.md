# 08 — How the cloud changed scaling

Covers `39:02`–`42:53`. What the cloud actually made easier about scale — and what it didn't.

## High scale is still hard

- Object storage gives an elastic storage model — no more disk capacity planning — but **sharding still leaks into application code**; it can't be made fully transparent. At scale where one machine can't process the workload, real engineering thinking is still required, cloud or not. [`39:31`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2371) [`39:59`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2399)

## Where the cloud really helped: the low end

- The big win is **scaling down**: serverless can spin instances up/down very quickly and cheaply, enabling very low-scale services that would be much harder without the cloud (static VM allocation of memory/CPU). [`39:59`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2399) [`40:21`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2421) [`40:39`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2439)
- Host Gergely's example: a small serverless website costing ~13 cents/month under minimal load. [`40:39`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2439)

## Is sharding disappearing as a concern?

- Less an effect of cloud than of **hardware getting more powerful**: a big modern machine handles workloads that used to require sharding, so more workloads run on a single machine at significant scale. [`41:43`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2503)
- Parallelism doesn't go away — efficiently using hundreds of CPU cores on one machine is still a concern, and sharding is one way to achieve parallelism. [`42:03`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2523)
- Cross-machine sharding is less pressing but not gone: some workloads still genuinely require it. And **replication stays relevant at every scale**, because it exists for fault tolerance, not scalability. [`42:22`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2542)
