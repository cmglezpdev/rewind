# Cloud Concepts

Foundational theory: what cloud computing is, the history of Amazon/AWS, what makes a true Cloud Service Provider, the CSP market landscape, compute abstraction levels (dedicated → VMs → containers → functions), the SaaS/PaaS/IaaS model, and cloud deployment models.

### What is cloud computing

- Definition: the practice of using a network of remote servers hosted on the internet to store, manage, and process data, rather than a local server or personal computer [`8:54`](https://www.youtube.com/watch?v=7HKot-brXFE&t=534)
- On-premise: YOU own the servers, hire the IT people, pay/rent the real estate, take all the risks [`8:54`](https://www.youtube.com/watch?v=7HKot-brXFE&t=534)
- Cloud provider: someone else owns servers, hires IT, pays real estate; you are only responsible for configuring cloud services and your code [`9:18`](https://www.youtube.com/watch?v=7HKot-brXFE&t=558)

### Evolution of cloud hosting

- **Dedicated server** (~1995): one physical machine, one business, one app — expensive (hardware, real estate, network, staff) but guaranteed high security; the model still exists for specialized use cases [`9:38`](https://www.youtube.com/watch?v=7HKot-brXFE&t=578)
- **Virtual Private Server (VPS)**: one physical machine subdivided into sub-machines via virtualization — better utilization and isolation, but you still bought a dedicated machine [`10:09`](https://www.youtube.com/watch?v=7HKot-brXFE&t=609)
- **Shared hosting** (mid-2000s, GoDaddy/HostGator): one machine shared by hundreds of businesses via folders with permissions — very cheap, relied on tenants underutilizing resources, but limited functionality and poor isolation (one noisy tenant could hang every site on the server) [`10:27`](https://www.youtube.com/watch?v=7HKot-brXFE&t=627) [`11:01`](https://www.youtube.com/watch?v=7HKot-brXFE&t=661)
- **Cloud hosting**: multiple physical machines acting as one system (distributed computing), abstracted into cloud services — flexible, scalable, secure (virtual isolation), very low cost (thousands of businesses share it), highly configurable; cloud still includes all prior hosting types as options [`11:32`](https://www.youtube.com/watch?v=7HKot-brXFE&t=692) [`12:00`](https://www.youtube.com/watch?v=7HKot-brXFE&t=720)

### Amazon & AWS history

- Amazon: American multinational tech corporation, headquartered in Seattle, founded 1994 by Jeff Bezos as an online bookstore [`12:35`](https://www.youtube.com/watch?v=7HKot-brXFE&t=755)
- Expanded into cloud (AWS), streaming (Prime Video/Music), Twitch.tv, Whole Foods, AI, low-orbit satellites; current CEO is Andy Jassy (previously CEO of AWS) [`13:17`](https://www.youtube.com/watch?v=7HKot-brXFE&t=797) [`13:41`](https://www.youtube.com/watch?v=7HKot-brXFE&t=821)
- AWS became a cloud service provider in 2006 and has led ever since; remember the term **CSP (Cloud Service Provider)** [`14:34`](https://www.youtube.com/watch?v=7HKot-brXFE&t=874)
- First AWS service: **SQS (Simple Queue Service) in 2004**, then **S3 in March 2006**, then **EC2 in August 2006** [`15:02`](https://www.youtube.com/watch?v=7HKot-brXFE&t=902)
- Amazon migrated all its own infrastructure to AWS by 2010 (later moving from Oracle to DynamoDB) [`15:59`](https://www.youtube.com/watch?v=7HKot-brXFE&t=959)
- AWS launched its certification program in 2013, standardizing cloud certifications [`16:30`](https://www.youtube.com/watch?v=7HKot-brXFE&t=990)

### What makes a Cloud Service Provider (CSP)

A company qualifies as a CSP when it has [`17:10`](https://www.youtube.com/watch?v=7HKot-brXFE&t=1030) [`17:34`](https://www.youtube.com/watch?v=7HKot-brXFE&t=1054) [`18:06`](https://www.youtube.com/watch?v=7HKot-brXFE&t=1086):

- Multiple cloud services (tens to hundreds)
- Services that can be **chained together** into cloud architectures
- A **single unified API** (in AWS: the AWS API, accessed via CLI, SDK, Management Console)
- **Metered billing** based on usage (per second/hour, vCPUs, memory, storage)
- **Rich monitoring** built in — every API action tracked (AWS: CloudTrail)
- An **IaaS offering** (networking, compute, storage, databases)
- Automation via **Infrastructure as Code**

If a company offers multiple cloud services under one UI but doesn't meet most of these, it's a **cloud platform** (e.g., Twilio, HashiCorp, Databricks) — while AWS, Azure, GCP are cloud service providers [`18:38`](https://www.youtube.com/watch?v=7HKot-brXFE&t=1118)

### The CSP landscape (four tiers)

- **Top tier**: AWS, Microsoft Azure, Google Cloud Platform, Alibaba Cloud — AWS/Azure/GCP are "the big three" in North America and Europe; Alibaba is huge in Asia/China [`19:27`](https://www.youtube.com/watch?v=7HKot-brXFE&t=1167); early to market with strong synergies between services [`19:55`](https://www.youtube.com/watch?v=7HKot-brXFE&t=1195)
- **Mid tier**: backed by well-known tech companies that didn't reach top tier — IBM (now expensive enterprise managed infrastructure) [`20:27`](https://www.youtube.com/watch?v=7HKot-brXFE&t=1227), Oracle (plays on being cheapest; even Azure signs contracts to use Oracle Cloud infrastructure) [`20:49`](https://www.youtube.com/watch?v=7HKot-brXFE&t=1249), plus Huawei Cloud and Tencent Cloud in Asia [`21:27`](https://www.youtube.com/watch?v=7HKot-brXFE&t=1287)
- **Light tier**: former VPS specialists offering core infrastructure — Vultr, DigitalOcean, Akamai Connected Cloud (formerly Linode) [`21:51`](https://www.youtube.com/watch?v=7HKot-brXFE&t=1311); lighter offerings (no event-driven metered billing depth) but simpler — a great cloud introduction for companies that find the top tier too complex [`22:22`](https://www.youtube.com/watch?v=7HKot-brXFE&t=1342)
- **Private tier**: software you deploy in your own data center for cloud-like functionality — OpenStack and Apache CloudStack (open source), VMware vSphere (widely used for managing VMs) [`22:52`](https://www.youtube.com/watch?v=7HKot-brXFE&t=1372) [`23:23`](https://www.youtube.com/watch?v=7HKot-brXFE&t=1403)

### Gartner Magic Quadrant

- Gartner's Magic Quadrant: market research reports by an IT consulting firm using proprietary qualitative analysis to show market direction, maturity, and participants [`23:47`](https://www.youtube.com/watch?v=7HKot-brXFE&t=1427)
- Four quadrants: Leaders, Challengers, Niche Players, Visionaries; AWS sits at the top of Leaders (May 2025 report), though Microsoft and Google have closed the gap — largely because of AI [`24:32`](https://www.youtube.com/watch?v=7HKot-brXFE&t=1472) [`27:27`](https://www.youtube.com/watch?v=7HKot-brXFE&t=1647)
- Oracle keeps climbing, likely due to government contracts [`26:40`](https://www.youtube.com/watch?v=7HKot-brXFE&t=1600)
- Take it with a grain of salt: based on marketing-team questionnaires, self-certified metrics, and testimonials, with commercial incentives involved [`28:11`](https://www.youtube.com/watch?v=7HKot-brXFE&t=1691)

### The four core service types

- The four most common cloud service types (the "four core" of IaaS): **Compute, Networking, Storage, Databases**; AWS has 200+ cloud services [`28:45`](https://www.youtube.com/watch?v=7HKot-brXFE&t=1725)
- Terminology note: the industry says "cloud computing" to mean ALL of cloud (compute, networking, storage, databases), not just the compute subcategory [`29:23`](https://www.youtube.com/watch?v=7HKot-brXFE&t=1763)
- The four core in AWS: Compute = **EC2** (VMs), Storage = **EBS** (virtual hard drives), Database = **RDS** (SQL databases), Networking & Content Delivery = **VPC** (private cloud network) [`29:50`](https://www.youtube.com/watch?v=7HKot-brXFE&t=1790)
- Beyond the four core, categories include analytics, application integration, AR/VR, cost management, blockchain, containers, developer tools, IoT, ML, media, migration, quantum, robotics, satellites, security/identity/compliance, and more [`30:26`](https://www.youtube.com/watch?v=7HKot-brXFE&t=1826)
- Two ways to explore services: the marketing site aws.amazon.com (Products → overview / features / **pricing** / getting started / documentation) and the Management Console when logged in [`30:59`](https://www.youtube.com/watch?v=7HKot-brXFE&t=1859) [`31:46`](https://www.youtube.com/watch?v=7HKot-brXFE&t=1906)

### Evolution of computing (compute abstraction levels)

| Level | Key idea | Trade-offs |
|---|---|---|
| Dedicated | Physical server wholly used by one customer (single tenant); bare metal, you control virtualization | Must guess capacity upfront, overpay for underutilization, hard to vertically scale or replace; security guarantee is only as good as your skills; used for HPC [`32:25`](https://www.youtube.com/watch?v=7HKot-brXFE&t=1945) [`33:37`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2017) [`34:00`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2040) |
| Virtual machines | Machine within a machine via a **hypervisor**; multi-tenant, pay a fraction of the server | Still overpay for underutilized VM; limited by guest OS but easy to export/import images and scale; the most common/popular compute offering [`34:32`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2072) [`35:25`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2125) |
| Containers | VM running containers via a container layer (Docker daemon; Docker most popular) | Maximize capacity, easily add/resize containers; share the underlying OS, more efficient than multiple VMs; apps run side by side without OS conflicts — but more work to maintain [`35:25`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2125) [`35:50`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2150) |
| Functions | **Serverless compute**: upload only code, pick runtime (Ruby/Python/Node), memory and max run time | Only pay while code runs, only responsible for code and data; trade-off is **cold starts** (VM spin-up can slow requests) [`36:17`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2177) [`36:59`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2219) |

### Types of cloud computing (SaaS / PaaS / IaaS)

- **SaaS (Software as a Service)** — for customers: product fully run and managed by the provider; term first coined by Salesforce; examples: Gmail, Office 365 [`37:22`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2242) [`37:49`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2269)
- **PaaS (Platform as a Service)** — for developers: focus on deployment/management of apps without provisioning or understanding hardware/OS; examples: Elastic Beanstalk, Heroku, Google App Engine [`37:49`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2269) [`38:16`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2296)
- **IaaS (Infrastructure as a Service)** — for administrators: basic building blocks of cloud IT (networking, computers, data storage) without worrying about IT staff, data centers, hardware; examples: AWS, Microsoft Azure, Oracle Cloud [`38:43`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2323) [`39:10`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2350)

### Cloud deployment models

- **Public cloud**: everything (workloads, projects, code) built on the CSP — known as "cloud-native" or "cloud-first" (note: "cloud-native" also has an older container/open-source meaning) [`39:10`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2350) [`39:47`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2387)
- **Private cloud**: everything built in the company's own data center (on-premise), e.g., running OpenStack to launch VMs and databases [`40:18`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2418)
- **Hybrid cloud**: on-premise + a cloud provider together, bridged via VPN or direct connection [`40:41`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2441)
- **Cross-cloud / multicloud**: using multiple cloud providers at once (often mislabeled hybrid); e.g., Azure Arc extends the control plane to deploy Kubernetes on Amazon EKS or GCP Kubernetes Engine; GCP's equivalent is Anthos; AWS has traditionally not been cross-cloud friendly [`41:12`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2472) [`41:43`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2503)

### Who uses which deployment model

- **Cloud**: startups, SaaS companies, new projects — e.g., Basecamp, Dropbox, Squarespace [`42:23`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2543) [`42:54`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2574)
- **Hybrid**: organizations with existing data centers that can't fully migrate due to effort or security/compliance — banks, fintech, investment management (e.g., CIBC, Deloitte, CPP Investment Board) [`42:54`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2574)
- **On-premise**: strict regulatory compliance or sheer size/politics — public sector/government, hospitals, heavily regulated insurance (e.g., AIG, Government of Canada); though even these use public-sector cloud offerings — there's rarely a good reason to be fully on-premise anymore [`43:21`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2601) [`43:48`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2628)
