# Shared Responsibility Model

A cloud security framework defining which security obligations belong to the customer and which to the cloud service provider, examined through several lenses: AWS's own model, cloud computing types (IaaS/PaaS/SaaS), compute-service variants, Google's variant, and architecture styles.

### The AWS model

- The shared responsibility model is a cloud security framework that defines the security obligations of the customer vs the cloud service provider; every CSP has its own variant, and variants also exist per deployment model and per service category (compute, ML...) [`4:01:36`](https://www.youtube.com/watch?v=7HKot-brXFE&t=14496)
- **AWS is responsible for** anything physical and its software services [`4:02:52`](https://www.youtube.com/watch?v=7HKot-brXFE&t=14572):
  - Hardware and global infrastructure: regions, availability zones, edge locations, physical security of data centers [`4:02:52`](https://www.youtube.com/watch?v=7HKot-brXFE&t=14572)
  - Software of the four core service categories: compute, storage, database, networking (physical wiring plus routing software) [`4:03:22`](https://www.youtube.com/watch?v=7HKot-brXFE&t=14602)
- **The customer is responsible for** [`4:03:22`](https://www.youtube.com/watch?v=7HKot-brXFE&t=14602):
  - Configuration of managed services and third-party software: platform/OS choice, applications, and **IAM** — if you grant a user permissions they shouldn't have, that's on you [`4:03:22`](https://www.youtube.com/watch?v=7HKot-brXFE&t=14602)
  - Configuration of virtual infrastructure: OS, networking, virtual firewalls (NACLs, security groups) [`4:04:14`](https://www.youtube.com/watch?v=7HKot-brXFE&t=14654)
  - Security configuration of data: client-side encryption (encrypt before sending to S3), server-side encryption (S3, EBS volumes) [`4:04:14`](https://www.youtube.com/watch?v=7HKot-brXFE&t=14654)
  - Network traffic protection (VPC Flow Logs, GuardDuty anomaly detection) and customer data itself, including sensitivity controls like Amazon Macie for detecting public-facing PII [`4:04:40`](https://www.youtube.com/watch?v=7HKot-brXFE&t=14680)

### "IN" vs "OF" the cloud (exam-critical)

- **Customer = security IN the cloud**: your data and your configuration — if data resides on it or you can configure it, you're responsible [`4:05:07`](https://www.youtube.com/watch?v=7HKot-brXFE&t=14707)
- **AWS = security OF the cloud**: anything physical/hardware, operation of managed services, global infrastructure [`4:05:31`](https://www.youtube.com/watch?v=7HKot-brXFE&t=14731)
- This in/of distinction is very important for the exam and is an AWS-specific concept — other CSPs don't use this phrasing [`4:05:55`](https://www.youtube.com/watch?v=7HKot-brXFE&t=14755)
- Simplest rule of thumb: if you can configure it or store data on it, you're responsible; if you cannot configure it, the CSP probably is [`4:18:44`](https://www.youtube.com/watch?v=7HKot-brXFE&t=15524)

### By type of cloud computing (On-prem / IaaS / PaaS / SaaS)

- **On-premise**: you're responsible for everything — apps, data, runtime, middleware, OS, virtualization, servers, storage, networking [`4:06:24`](https://www.youtube.com/watch?v=7HKot-brXFE&t=14784)
- **IaaS**: adopting the cloud roughly cuts responsibilities in half — the CSP takes physical networking, storage, servers, and virtualization (hypervisor); you keep OS, middleware, runtime, data, apps (e.g. launching an EC2 instance means choosing/owning the OS) [`4:06:24`](https://www.youtube.com/watch?v=7HKot-brXFE&t=14784)
- **PaaS** (e.g. Elastic Beanstalk): CSP takes even more — you pick "a Ruby on Rails server" without managing the OS or updates [`4:07:27`](https://www.youtube.com/watch?v=7HKot-brXFE&t=14847)
- **SaaS** (think Microsoft Word online): CSP is responsible for essentially everything; you handle your content and where to store it [`4:07:47`](https://www.youtube.com/watch?v=7HKot-brXFE&t=14867)

### Compute-scoped variant (per AWS compute service)

Shifting the lens to just compute reveals more granularity, adding Function-as-a-Service [`4:08:26`](https://www.youtube.com/watch?v=7HKot-brXFE&t=14906):

- **Bare metal — EC2 Bare Metal instance**: customer can install the host OS and even their own hypervisor; AWS covers only the physical machine [`4:08:49`](https://www.youtube.com/watch?v=7HKot-brXFE&t=14929)
- **Dedicated**: doesn't add responsibility over EC2 — it adds *assurance* (single-tenant); shares EC2's spot on the model [`4:09:15`](https://www.youtube.com/watch?v=7HKot-brXFE&t=14955)
- **VM — EC2**: customer owns the **guest OS** (Ubuntu, Debian, Windows) and container runtime (e.g. Docker); AWS owns hypervisor, physical machine, host OS [`4:09:44`](https://www.youtube.com/watch?v=7HKot-brXFE&t=14984)
- **Containers — ECS**: customer only configures, deploys, and attaches storage to containers; AWS owns host OS, guest OS, hypervisor, container runtime [`4:10:06`](https://www.youtube.com/watch?v=7HKot-brXFE&t=15006)
- **PaaS — Elastic Beanstalk**: customer uploads code, configures environment/deployment strategies/associated services; AWS covers servers, OS, networking, storage, security. Caveat: it doesn't fit a linear graph since it may run on VMs or containers underneath [`4:10:59`](https://www.youtube.com/watch?v=7HKot-brXFE&t=15059)
  - On AWS Beanstalk you *can* access and fiddle with the underlying infrastructure, so you're responsible for it — unlike Heroku, where the provider handles all of it. Responsibility comes down to the specific service offering, not the PaaS label [`4:11:49`](https://www.youtube.com/watch?v=7HKot-brXFE&t=15109)
- **SaaS — Amazon WorkDocs** (a SharePoint competitor): customer owns document contents, file management, sharing configuration, access controls; AWS owns everything else [`4:12:08`](https://www.youtube.com/watch?v=7HKot-brXFE&t=15128)
- **FaaS — AWS Lambda**: customer just uploads code; AWS handles deployment, container runtime, networking, storage, security, physical machine — everything else [`4:13:02`](https://www.youtube.com/watch?v=7HKot-brXFE&t=15182)
- On the linear spectrum (bare metal → dedicated → VM → containers → functions): you are **always responsible for your code**; VMs add runtime + guest OS, bare metal alone adds host OS + virtualization control [`4:13:36`](https://www.youtube.com/watch?v=7HKot-brXFE&t=15216)

### Google-style variant applied to AWS

- Stacks responsibility layers (content, access policies, usage, deployment, web app security, identity, operations, access/authentication, network security, guest OS, data, audit logging, network, storage, encryption, hardened kernel, boot, hardware) against IaaS/PaaS/SaaS columns [`4:15:14`](https://www.youtube.com/watch?v=7HKot-brXFE&t=15314)
- SaaS: customer keeps only content, access policies, and usage [`4:15:47`](https://www.youtube.com/watch?v=7HKot-brXFE&t=15347)
- IaaS extends customer responsibility to identity, operations, access/authentication (e.g. MFA), and cloud network security (VPC isolation, security groups) [`4:17:04`](https://www.youtube.com/watch?v=7HKot-brXFE&t=15424)
- AWS-side items include audit logging (CloudTrail logs API events), physical networking/storage, kernel hardening (the **Nitro System** — a security chip on AWS servers), boot, and hardware [`4:17:35`](https://www.youtube.com/watch?v=7HKot-brXFE&t=15455)
- If you grant an employee access and they misuse it — "even if it's their fault, it's your fault" [`4:18:44`](https://www.youtube.com/watch?v=7HKot-brXFE&t=15524)

### By architecture

Responsibility decreases as architecture modernizes [`4:19:08`](https://www.youtube.com/watch?v=7HKot-brXFE&t=15548):

1. **Traditional / VM architecture** (most responsibility): what the global workforce knows best, lots of documentation/frameworks/support — EC2 + Auto Scaling Groups, CodeDeploy, load balancers, or Beanstalk [`4:19:40`](https://www.youtube.com/watch?v=7HKot-brXFE&t=15580)
2. **Microservices / containers**: mix and match languages, better resource utilization — Fargate (serverless containers), ECS, EKS [`4:19:40`](https://www.youtube.com/watch?v=7HKot-brXFE&t=15580)
3. **Serverless / FaaS** (least responsibility): no servers, you only worry about data and code — Amplify, Serverless Framework, Lambda [`4:20:08`](https://www.youtube.com/watch?v=7HKot-brXFE&t=15608)
