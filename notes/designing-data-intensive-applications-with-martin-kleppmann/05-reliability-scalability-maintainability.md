# 05 — Reliability, scalability, and maintainability

Covers `23:00`–`26:24`. What the adjectives in the book's tagline actually mean to Kleppmann.

## Definitions

- These terms have no formal definition; the book pins them down pragmatically. [`23:01`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1381)
- **Reliability = fault tolerance**: the system as a whole keeps working even if a network link is interrupted or a node crashes. Much of the book covers techniques that support this, like replication. [`23:01`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1381) [`23:21`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1401)
- **Scalability**: the term is fashionable because it suggests success and millions of users; the book takes a dispassionate view — scalability is just *what mechanisms you have for dealing with changes in load*, e.g. adding computing capacity when load increases, using techniques like sharding. [`23:37`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1417) [`24:07`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1447)
- The focus is horizontal scaling — shared-nothing systems that cope with very high load using cheap commodity machines — since vertical scaling ("buy a bigger machine") holds little to discuss. [`24:30`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1470) [`24:59`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1499)

## Scaling *down* — the newer insight

- Scalability also includes scaling down: running a service so it's really cheap when load is tiny. Cost and capacity should be roughly proportional to load at both ends. [`24:59`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1499) [`25:22`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1522) [`25:37`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1537)
- Hard on-premises: a physical machine is the unit of deployment, and even carving it into VMs requires resource allocation. Serverless systems are interesting precisely because they scale down — "if you're going to handle just three requests per day, that's just fine as well". [`25:37`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1537) [`26:08`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1568)
