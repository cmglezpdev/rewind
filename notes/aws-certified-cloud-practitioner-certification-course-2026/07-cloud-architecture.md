# Cloud Architecture

Core cloud architecture terminology — availability, scalability, elasticity, fault tolerance, and durability — plus disaster recovery options (RTO/RPO) and how high availability is built into AWS services.

### Architecture Roles

- **Solutions architect**: architects a technical solution using multiple systems via research, documentation, and experimentation [`2:12:15`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7935)
- **Cloud architect**: a solutions architect focused solely on cloud services; in the job market "solutions architect" is often used for both [`2:12:15`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7935)
- Beyond the core terms, architects always weigh two questions: how secure is the solution, and how much will it cost [`2:13:11`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7991) [`2:13:41`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8021)

### Key Terminology

| Term | Definition |
|---|---|
| Availability | Ability to ensure a service remains available [`2:12:47`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7967) |
| Scalability | Ability to grow rapidly or unimpeded [`2:13:11`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7991) |
| Elasticity | Ability to shrink AND grow to meet demand [`2:13:11`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7991) |
| Fault tolerance | Ability to prevent a failure [`2:13:11`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7991) |
| Disaster recovery (durability) | Ability to recover from a failure [`2:13:11`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7991) |

### High Availability

- Service remains available by ensuring **no single point of failure** and/or a certain performance level [`2:14:04`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8044)
- On AWS: run the workload across multiple AZs so it survives one or two AZs going down [`2:14:04`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8044)
- Implemented with an **Elastic Load Balancer**: evenly distributes traffic to multiple servers in one or more data centers, routing only to healthy/available ones [`2:14:32`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8072)
- Extra servers alone aren't enough — you may need a minimum threshold (e.g. at least 2 servers running) to meet traffic demand [`2:14:32`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8072)

### High Scalability

- Ability to increase capacity based on increasing demand of traffic, memory, and computing power [`2:14:58`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8098)
- **Vertical scaling** (scaling up): upgrade to a bigger server [`2:14:58`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8098)
- **Horizontal scaling** (scaling out): add more servers of the same size — bonus: it also gives you high availability [`2:14:58`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8098)

### High Elasticity

- Like scalability but **automatic and bidirectional**: automatically increase OR decrease capacity based on current demand [`2:15:30`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8130)
- Horizontal terms: **scaling out** (add same-size servers) and **scaling in** (remove underutilized same-size servers); vertical scaling is hard for traditional architectures, so elasticity is usually described horizontally [`2:16:00`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8160)
- Implemented with **Auto Scaling Groups (ASGs)**: automatically add/remove servers based on scaling rules you define on metrics [`2:16:00`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8160)

### High Fault Tolerance

- No single point of failure — preventing the chance of failure [`2:16:31`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8191)
- Achieved with **failovers**: a plan to shift traffic to a redundant system when the primary fails; e.g. a synced secondary database that becomes primary on failover [`2:16:31`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8191)
- On AWS: **RDS Multi-AZ** — a duplicate standby database running in another AZ in case the primary fails [`2:17:01`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8221)

### High Durability and Disaster Recovery

- Durability = ability to recover from a disaster and prevent data loss; ask: do you have a backup, how fast can you restore it, does it still work, is live data uncorrupted? [`2:17:24`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8244)
- AWS solution example: **CloudEndure Disaster Recovery** — continuously replicates machines to a low-cost staging area in your target account/region for fast, reliable recovery [`2:17:24`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8244)

### BCP, RTO and RPO

- **Business Continuity Plan (BCP)**: document outlining how a business keeps operating during an unplanned disruption [`2:18:10`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8290)
- **RPO (Recovery Point Objective)**: maximum acceptable amount of data loss after an incident, expressed as time — "how much data are you willing to lose?" [`2:18:10`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8290) [`2:18:39`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8319)
- **RTO (Recovery Time Objective)**: maximum downtime the business can tolerate without significant financial loss — "how much time are you willing to go down?" [`2:18:39`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8319)
- AWS white-paper phrasings: RTO = maximum acceptable delay between interruption and restoration of service; RPO = maximum acceptable time since the last data recovery point — both defined by the organization [`2:21:47`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8507) [`2:23:22`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8602)
- In the white-paper charts, you plot cost/complexity vs service interruption (or data loss), find your acceptable recovery cost, and pick the DR option at that intersection [`2:22:39`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8559) [`2:24:13`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8653)

### Disaster Recovery Options (cold → hot)

- The choice is a tradeoff: cost vs time to recover (RTO/RPO); names use temperature words — cold to hot [`2:19:09`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8349) [`2:19:34`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8374)

| Option | What it is | Recovery time | Cost / use case |
|---|---|---|---|
| Backup & restore | Back up data; restore to new infrastructure after the event [`2:19:34`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8374) | Hours [`2:20:28`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8428) | Very cost-effective; low-priority use cases [`2:20:56`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8456) |
| Pilot light | Data replicated to another region with minimal core services running [`2:20:04`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8404) | ~10 minutes [`2:20:28`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8428) | Less stringent RTO/RPO; start & scale resources after event [`2:20:56`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8456) |
| Warm standby | Scaled-down copy of your full infrastructure; scale up on incident [`2:20:04`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8404) | Minutes [`2:20:28`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8428) | Business-critical services; costly but less than multi-site [`2:21:20`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8480) |
| Multi-site active-active | Scaled-up identical copy of infrastructure in another region [`2:20:28`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8428) | Real-time (zero downtime, near-zero loss) [`2:21:20`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8480) | Mission-critical; roughly doubles infrastructure cost [`2:21:20`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8480) |

### Real-World Architecture Diagram Walkthrough

- Instructor walks through the (previous-generation) ExamPro/TeacherSeat platform diagram, built in Adobe XD using AWS's free architectural icons (PowerPoint/SVG/PNG downloads); Lucidchart is a third-party alternative [`2:24:38`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8678) [`2:25:09`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8709)
- AWS's icon deck includes diagram guidelines (group icons, layers, service/resource icons, dos and don'ts — e.g. diagonal arrows are a faux pas) [`2:25:55`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8755) [`2:26:19`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8779)
- Components in the example architecture:
  - EC2 instances in blue/green environments inside an Auto Scaling Group for blue-green deploys [`2:27:04`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8824) [`2:27:26`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8846)
  - **Parameter Store** for environment/app configuration variables; **Secrets Manager** for database (Postgres) credentials [`2:27:53`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8873) [`2:28:21`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8901)
  - S3 buckets for user data, assets, artifacts, CloudFormation templates [`2:28:21`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8901)
  - CI/CD: GitHub triggers **CodePipeline** → **CodeBuild** → **CodeDeploy**, which creates a new environment and swaps it in [`2:28:44`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8924) [`2:29:10`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8950)
  - Traffic path: internet → **Route 53** (domain names) → **Application Load Balancer** → instances across AZs [`2:29:54`](https://www.youtube.com/watch?v=7HKot-brXFE&t=8994)
  - **Launch templates** (required for ASGs) define instance shape; a custom **AMI** is built nightly via **SSM automation documents** (launch instance, install Ruby/Postgres, download codebase, create AMI) [`2:30:27`](https://www.youtube.com/watch?v=7HKot-brXFE&t=9027) [`2:30:50`](https://www.youtube.com/watch?v=7HKot-brXFE&t=9050) [`2:31:18`](https://www.youtube.com/watch?v=7HKot-brXFE&t=9078)

### High Availability Across AWS Services (built-in vs manual)

- **S3**: highly available by default — serverless storage that replicates data across multiple data centers/AZs in the chosen region (standard tier) [`2:32:10`](https://www.youtube.com/watch?v=7HKot-brXFE&t=9130)
- **EC2**: a single instance in a single AZ is NOT highly available; you must launch multiple instances across subnets/AZs and add a load balancer yourself [`2:32:43`](https://www.youtube.com/watch?v=7HKot-brXFE&t=9163)
- **Elastic Beanstalk** (PaaS): a checkbox choice — single instance (free-tier) vs high availability, which auto-provisions an ALB and Auto Scaling Group running 1–4 instances [`2:33:46`](https://www.youtube.com/watch?v=7HKot-brXFE&t=9226) [`2:34:07`](https://www.youtube.com/watch?v=7HKot-brXFE&t=9247)
- **RDS**: choosing the "production" option sets up **Multi-AZ** — a replicated database in another AZ [`2:34:41`](https://www.youtube.com/watch?v=7HKot-brXFE&t=9281) [`2:35:06`](https://www.youtube.com/watch?v=7HKot-brXFE&t=9306)
- Takeaway: some services abstract HA behind an option — you must understand what high availability means underneath [`2:35:06`](https://www.youtube.com/watch?v=7HKot-brXFE&t=9306)
