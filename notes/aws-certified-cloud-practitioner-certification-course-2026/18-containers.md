# Containers

VMs vs containers, monoliths vs microservices, the key container technologies (Kubernetes, Docker, Podman), and the full map of AWS container services. [`9:03:06`](https://www.youtube.com/watch?v=7HKot-brXFE&t=32586)

### VMs vs Containers

- An EC2 instance is a VM launched on top of a hypervisor on a server in AWS data centers; you pick an OS (e.g., Ubuntu) and install your own libraries, packages, binaries, and workloads (e.g., Django, MongoDB, RabbitMQ) [`9:03:27`](https://www.youtube.com/watch?v=7HKot-brXFE&t=32607)
- VM downside: you always leave unused headroom (memory/storage) to grow into, and you pay for it even when unutilized — not cost effective [`9:03:48`](https://www.youtube.com/watch?v=7HKot-brXFE&t=32628)
- With containers, the hypervisor is replaced by container virtualization (e.g., the Docker daemon); each container can use a different OS base (Alpine for the web app, FreeBSD for RabbitMQ) with exactly the dependencies it needs; containers flex (expand/decrease) with usage, and with services like AWS Fargate you pay for running containers, not overprovisioning [`9:04:29`](https://www.youtube.com/watch?v=7HKot-brXFE&t=32669)
- Summary: VMs don't make best use of space and apps aren't isolated (config conflicts, security problems, resource hogging); containers run multiple apps virtually isolated from each other with per-container OS dependencies [`9:05:13`](https://www.youtube.com/watch?v=7HKot-brXFE&t=32713)

### Monoliths vs Microservices

- Monolith: one app responsible for everything, functionality tightly coupled, everything (load balancing, caching, database, frontend, backend API, background tasks) on a single server [`9:05:39`](https://www.youtube.com/watch?v=7HKot-brXFE&t=32739)
- Microservices: multiple apps each responsible for one thing; functionality is isolated and stateless — e.g., APIs in containers, functions in Lambda, marketing site and frontend JS on S3, plus ELB, ElastiCache, RDS, SQS [`9:06:09`](https://www.youtube.com/watch?v=7HKot-brXFE&t=32769)

### Kubernetes

- Open-source container orchestration system for automating deployment, scaling, and management of containers; created by Google, now maintained by the Cloud Native Computing Foundation (CNCF); commonly called K8s (the 8 = remaining letters) [`9:06:59`](https://www.youtube.com/watch?v=7HKot-brXFE&t=32819)
- Advantage over Docker: run containers distributed across multiple VMs; unique component: pods — a group of one or more containers with shared storage, network resources, and settings [`9:06:59`](https://www.youtube.com/watch?v=7HKot-brXFE&t=32819)
- Ideal for microservice architectures with tens to hundreds of services to manage — if you don't have that scale, look at something easier [`9:07:36`](https://www.youtube.com/watch?v=7HKot-brXFE&t=32856)

### Docker

- Set of PaaS products using OS-level virtualization to deliver software in containers; earliest popularized open-source container platform — when people think containers, they think Docker [`9:08:28`](https://www.youtube.com/watch?v=7HKot-brXFE&t=32908)
- Suite of tools: Docker CLI (download/upload/build/run/debug containers), Dockerfile (config file to provision a container), Docker Compose (multi-container tool + config), Docker Swarm (orchestration for multi-container architectures), Docker Hub (public container repository) [`9:08:55`](https://www.youtube.com/watch?v=7HKot-brXFE&t=32935)
- OCI (Open Container Initiative): open industry standards around container formats and runtimes; established by Docker, now maintained by the Linux Foundation — any OCI-compatible technology can run your containers [`9:09:22`](https://www.youtube.com/watch?v=7HKot-brXFE&t=32962)
- Docker has been losing developer favor over its paid open-source model; alternatives like Podman are growing [`9:09:52`](https://www.youtube.com/watch?v=7HKot-brXFE&t=32992)

### Podman

- Container engine that is OCI compliant and a drop-in replacement for Docker [`9:09:52`](https://www.youtube.com/watch?v=7HKot-brXFE&t=32992)
- Differences: Podman is daemonless (Docker uses the containerd daemon); Podman supports pods like Kubernetes (Docker does not); Podman replaces only one part of Docker and is used alongside Buildah (builds OCI images) and Skopeo (moves container images between storage types) [`9:10:18`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33018)
- Exam note: Podman will NOT show up on the exam — know it for practical benefit [`9:10:45`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33045)

### AWS container services

Primary (run containers):
- ECS (Elastic Container Service) — no cold starts, but self-managed EC2: you always pay for the resource while it runs [`9:11:12`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33072)
- AWS Fargate — serverless containers, more robust than Lambda, can scale to zero cost, AWS-managed EC2, but has cold starts (if you need containers launching fast, prefer ECS) [`9:11:39`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33099)
- EKS (Elastic Kubernetes Service) — runs open-source Kubernetes; useful to avoid vendor lock-in or when you simply want Kubernetes [`9:11:39`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33099)
- AWS Lambda — you only think about code; designed for short-running tasks; now supports deploying custom containers (previously only pre-built runtimes); for longer-running serverless workloads use Fargate [`9:12:09`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33129)

Provisioning and deployment:
- Elastic Beanstalk — can deploy ECS for you [`9:12:33`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33153)
- App Runner — overlaps Beanstalk but specialized for containers; fully managed, you can't see what runs underneath (Beanstalk is open/inspectable) [`9:12:33`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33153)
- AWS Copilot CLI — build, release, operate production-ready containerized apps on App Runner, ECS, and Fargate [`9:13:01`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33181)

Supporting:
- ECR (Elastic Container Registry) — repository for containers (OCI-compliant, not just Docker) [`9:13:01`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33181)
- X-Ray — analyze and debug between microservices (distributed tracing) [`9:13:01`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33181)
- Step Functions — stitch Lambdas and ECS tasks into a state machine [`9:13:01`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33181)
- Also possible (rarely exam-relevant): launching an EC2 instance from the Marketplace with a container runtime like Docker pre-installed [`9:13:44`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33224)
