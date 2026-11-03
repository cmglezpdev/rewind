# Variation Study

Final exam-prep section: AWS initialisms you must recognize, plus head-to-head comparisons of similarly-named or easily-confused services so you can pick the right one on the exam.

### Know Your Initialisms

- Learning initialisms lets you substitute them mentally and get through exam content much faster — in the wild people rarely say full service names [`13:31:28`](https://www.youtube.com/watch?v=7HKot-brXFE&t=48688)
- Core list [`13:31:55`](https://www.youtube.com/watch?v=7HKot-brXFE&t=48715) [`13:32:32`](https://www.youtube.com/watch?v=7HKot-brXFE&t=48752) [`13:33:06`](https://www.youtube.com/watch?v=7HKot-brXFE&t=48786):
  - IAM — Identity and Access Management; S3 — Simple Storage Service; SWF — Simple Workflow Service; SNS — Simple Notification Service; SQS — Simple Queue Service; SES — Simple Email Service; SSM — Systems Manager
  - RDS — Relational Database Service; VPC — Virtual Private Cloud; VPN — Virtual Private Network; CFN — CloudFormation; WAF — Web Application Firewall; MQ — Amazon ActiveMQ; ASG — Auto Scaling Group; TAM — Technical Account Manager
  - Load balancers: ELB (Elastic), ALB (Application), NLB (Network), GWLB (Gateway), CLB (Classic)
  - EC2 — Elastic Cloud Compute; ECS — Elastic Container Service; ECR — Elastic Container Repository; EBS — Elastic Block Storage; EMR — Elastic MapReduce; EFS — Elastic File Store; EB — Elastic Beanstalk; ES — Elasticsearch; EKS — Elastic Kubernetes Service; MSK — Managed Kafka Service (S and K are NOT backwards)
  - RAM — Resource Access Manager; ACM — Amazon Certificate Manager; PoLP — Principle of Least Privilege (a concept, not a service); IoT — Internet of Things (concept); RI — Reserved Instances [`13:33:43`](https://www.youtube.com/watch?v=7HKot-brXFE&t=48823)

### AWS Config vs AWS AppConfig

- Both have "config" in the name but are completely different services [`13:34:14`](https://www.youtube.com/watch?v=7HKot-brXFE&t=48854):
  - **AWS Config**: governance tool for **compliance-as-code** — rules check resources are configured as expected; on drift you're notified or Config auto-remediates back to the expected state [`13:34:14`](https://www.youtube.com/watch?v=7HKot-brXFE&t=48854)
  - **AWS AppConfig**: automates deploying **application configuration variable changes** to your web app — validators ensure a change won't break the app, with deployment monitoring and rollback [`13:34:39`](https://www.youtube.com/watch?v=7HKot-brXFE&t=48879)

### SNS vs SQS

- Both connect apps via messages (application integration), but [`13:35:11`](https://www.youtube.com/watch?v=7HKot-brXFE&t=48911):
  - **SNS**: pub/sub model — send notifications to subscribers of topics via multiple protocols (HTTP, email, SQS, SMS); retries on HTTPS failure but **no guaranteed delivery**; great for webhooks, simple internal emails, triggering Lambdas (third-party analogues: Pusher, PubNub) [`13:35:11`](https://www.youtube.com/watch?v=7HKot-brXFE&t=48911) [`13:35:49`](https://www.youtube.com/watch?v=7HKot-brXFE&t=48949)
  - **SQS**: messages placed in a **queue** with **guaranteed delivery**; apps pull the queue via the SDK; retains messages up to **14 days**; sequential or parallel delivery; at-least-once or exactly-once options; great for delayed tasks and queuing emails (analogues: RabbitMQ, Sidekiq) [`13:35:11`](https://www.youtube.com/watch?v=7HKot-brXFE&t=48911) [`13:36:15`](https://www.youtube.com/watch?v=7HKot-brXFE&t=48975)

### SNS vs SES vs Pinpoint vs WorkMail

- All four send email, but each has a different purpose [`13:36:52`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49012):
  - **SNS** — practical/internal **plain-text** emails triggered by other AWS services; the classic exam example is a **billing alarm** notification; know topics and subscriptions [`13:36:52`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49012) [`13:37:25`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49045)
  - **SES** — **transactional** emails triggered by in-app actions (sign-up, password reset, invoices); sends **HTML** email (SNS cannot); receives inbound email; email templates; **custom domains** (SNS uses an Amazon-assigned address); reputation monitoring; similar to SendGrid [`13:38:02`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49082)
  - **Pinpoint** — **promotional/marketing** emails: campaigns, contact segmentation, customer journeys, A/B email testing; overlaps with SES but is purpose-built for promotion [`13:38:37`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49117) [`13:39:04`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49144)
  - **WorkMail** — an email **web client** like Gmail/Outlook for company email inside the AWS console [`13:39:33`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49173)

### Amazon Inspector vs AWS Trusted Advisor

- Both are security tools that perform audits [`13:39:50`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49190):
  - **Inspector**: audits selected **EC2 instances** and generates a report from a long list of security checks [`13:39:50`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49190)
  - **Trusted Advisor**: no PDF report; a **holistic view of recommendations across multiple services** (open security-group ports, MFA on root, etc.), and covers five categories — not just security [`13:40:18`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49218)

### "Connect" Services (unrelated despite the name)

- **Direct Connect**: dedicated fiber-optic connection from your data center to AWS — private but NOT secure by itself; layer an AWS VPN on top for a secure connection [`13:40:42`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49242) [`13:41:11`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49271)
- **Amazon Connect**: call center as a service — toll-free number, inbound/outbound calls, automated phone systems (IVR) [`13:41:11`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49271)
- **MediaConnect**: video conversion — transcode videos to different formats, apply watermarks, insert intro clips [`13:41:35`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49295)

### Elastic Transcoder vs MediaConvert

- Both transcode video; **Elastic Transcoder is the old way, AWS Elemental MediaConvert is the new way** [`13:42:01`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49321)
- Elastic Transcoder may still have APIs/workflows legacy customers rely on; MediaConvert is more robust — overlays images, inserts clips, extracts caption data, robust UI. Costs are basically the same, so use MediaConvert [`13:42:25`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49345)

### AWS Artifact vs Amazon Inspector

- Confused because both produce PDF reports [`13:42:25`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49345):
  - **Artifact** answers "why should an enterprise trust AWS?" — compliance reports against global frameworks (SOC, PCI, …) [`13:43:04`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49384)
  - **Inspector** answers "how do we know this EC2 instance is secure?" — runs a script on the instance and generates a PDF of passed/failed security checks [`13:43:04`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49384) [`13:43:34`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49414)

### ELB vs ALB vs NLB vs GWLB vs CLB

- **ELB is the main service**; it offers four load balancer types [`13:43:34`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49414):
  - **ALB** (Application): **layer 7** HTTP/S; routing rules based on HTTP request content (e.g. route by subdomain); the only one that can attach a **WAF** [`13:44:05`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49445) [`13:44:37`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49477)
  - **NLB** (Network): **layers 3/4** TCP/UDP; extreme performance — millions of requests/sec at ultra-low latency; single static IP per AZ; favored for video games [`13:44:37`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49477) [`13:45:06`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49506)
  - **GWLB** (Gateway): for deploying fleets of third-party virtual appliances (GENEVE protocol) [`13:45:06`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49506)
  - **CLB** (Classic): layers 3/4/7, built for the EC2-Classic network; **no target groups** (EC2 instances assigned directly); retired August 15, 2022 — don't use it [`13:45:42`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49542) [`13:46:08`](https://www.youtube.com/watch?v=7HKot-brXFE&t=49568)
