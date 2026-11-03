# Billing, Pricing and Support

Covers AWS support plans and pricing, the free tier and always-free services, billing/cost-management tooling (Budgets, Cost Explorer, Cost & Usage Reports, billing alarms), consolidated billing, Trusted Advisor, SLAs, health dashboards, abuse reporting, Marketplace, the Partner Network, and Savings Plans.

### Always-Free Services

- Services free forever (unlike the 12-month free tier): IAM, Amazon VPC, Auto Scaling, CloudFormation, Elastic Beanstalk, OpsWorks, Amplify, AppSync, Organizations, Consolidated Billing, Cost Explorer, SageMaker (console), Systems Manager, and more [`11:47:59`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42479)
- Caveat: the free service itself may **provision resources that cost money** — e.g. CloudFormation launching EC2 instances, OpsWorks launching servers, Amplify launching Lambdas [`11:48:28`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42508)

### Support Plans (must know inside-out for the exam)

- Four tiers: **Basic, Developer, Business, Enterprise** [`11:49:01`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42541)
- **Basic**: email support only, for billing and account questions. If you get overbilled by a misconfiguration, open a billing ticket — AWS is likely to refund you [`11:49:01`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42541)
- Email tech support (Developer+): reply roughly within 24 business hours [`11:49:29`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42569)
- **Third-party software support**: available on Business and Enterprise, NOT on Developer [`11:49:56`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42596)
- **Phone/chat support**: Business and Enterprise only [`11:49:56`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42596)
- Response time SLAs [`11:50:52`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42652):
  - General guidance: ≤ 24 h (all paid tiers)
  - System impaired: ≤ 12 h (Developer/Business/Enterprise)
  - Production system impaired: ≤ 4 h (Business/Enterprise)
  - Production system down: ≤ 1 h (Business/Enterprise)
  - Business-critical system down: < 15 min (Enterprise only)
- **Enterprise extras**: Concierge team + a **TAM** (Technical Account Manager) assigned to your org [`11:51:24`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42684)
- **Trusted Advisor checks**: 7 checks on Basic/Developer; ALL checks on Business/Enterprise [`11:51:51`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42711)
- Pricing: Basic $0, Developer from $29/mo, Business from $100/mo, Enterprise $15,000/mo — "from" because it scales with usage; exam only tests the tier of expensiveness, not formulas [`11:51:51`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42711) [`11:52:17`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42737)
- Cost math examples: Developer = greater of $29 or 3% of monthly spend (e.g. $1,000 spend → $30); Business is bracketed (10% of first $10k, 7% of next, so $12k spend → $1,140) [`11:52:45`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42765) [`11:53:12`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42792)

### Technical Account Manager (TAM)

- Provides both **proactive guidance and reactive support**: builds solutions, technical guidance, customer advocacy, keeps environments operationally healthy while reducing cost/complexity, consults from developers to C-suite [`11:53:47`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42827) [`11:54:22`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42862)
- TAMs follow the Amazon Leadership Principles (customer obsession); **only available at the Enterprise support tier** [`11:55:00`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42900)

### Using AWS Support (follow-along)

- IAM users can use support, but **changing the support plan requires the root user** [`11:55:31`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42931)
- Case types: account & billing support, **service limit increase** (e.g. more EC2, more SES email volume — common early in an account's life), and technical support (grayed out on Basic) [`11:56:00`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42960)
- On Business you get web/chat/phone; phone callbacks usually within ~15 min; support can also screen-share (Zoom or similar) to help hands-on [`11:59:20`](https://www.youtube.com/watch?v=7HKot-brXFE&t=43160) [`12:02:04`](https://www.youtube.com/watch?v=7HKot-brXFE&t=43324)
- Downgrading mid-month: you're obligated to pay a minimum of 30 days of support each time you register [`12:02:24`](https://www.youtube.com/watch?v=7HKot-brXFE&t=43344)

### AWS Marketplace

- Curated digital catalog of thousands of software listings from independent software vendors (ISVs); products can be free or paid — charges appear on your AWS bill and AWS pays the provider [`12:02:44`](https://www.youtube.com/watch?v=7HKot-brXFE&t=43364)
- Product formats: AMIs, CloudFormation templates, SaaS offerings, web ACLs / AWS WAF rules [`12:03:18`](https://www.youtube.com/watch?v=7HKot-brXFE&t=43398)
- Integrated into services (e.g. the EC2 launch wizard's marketplace section) and also a standalone page; supports bring-your-own-license products (e.g. firewalls) [`12:03:41`](https://www.youtube.com/watch?v=7HKot-brXFE&t=43421) [`12:04:23`](https://www.youtube.com/watch?v=7HKot-brXFE&t=43463)

### Consolidated Billing & Volume Discounts

- A feature of **AWS Organizations**: pay for multiple accounts with one bill; one master/root account pays the charges for all member accounts; offered at **no additional cost** [`12:05:03`](https://www.youtube.com/watch?v=7HKot-brXFE&t=43503) [`12:05:26`](https://www.youtube.com/watch?v=7HKot-brXFE&t=43526)
- Use Cost Explorer to visualize consolidated usage; an account leaving the organization must attach its own payment method [`12:05:52`](https://www.youtube.com/watch?v=7HKot-brXFE&t=43552)
- **Volume discounts** ("the more you use, the more you save"): combined usage across all org accounts shares pricing-tier discounts — requires Organizations [`12:06:30`](https://www.youtube.com/watch?v=7HKot-brXFE&t=43590)
- Example: data transfer billed tiered (first 10 TB at $0.17/GB, next 40 TB at $0.13/GB); consolidating two accounts (4 TB + 8 TB) saves ~$80/mo vs unconsolidated bills [`12:06:30`](https://www.youtube.com/watch?v=7HKot-brXFE&t=43590) [`12:07:32`](https://www.youtube.com/watch?v=7HKot-brXFE&t=43652)

### AWS Trusted Advisor

- Recommendation tool that automatically and actively monitors your account — think "automated checklist of best practices", roughly mapping to the Well-Architected pillars [`12:08:06`](https://www.youtube.com/watch?v=7HKot-brXFE&t=43686)
- **Five categories**: Cost Optimization, Performance, Security, Fault Tolerance, Service Limits [`12:08:50`](https://www.youtube.com/watch?v=7HKot-brXFE&t=43730)
- Basic/Developer: 7 checks; Business/Enterprise: all checks [`12:09:21`](https://www.youtube.com/watch?v=7HKot-brXFE&t=43761)
- The free checks: MFA on root account, security groups (unrestricted ports), S3 bucket permissions, EBS public snapshots, RDS public snapshots, IAM use, plus ALL service-limit checks — the six named ones are all **security** checks [`12:09:21`](https://www.youtube.com/watch?v=7HKot-brXFE&t=43761) [`12:09:49`](https://www.youtube.com/watch?v=7HKot-brXFE&t=43789)
- Example checks per category: idle load balancers / unassociated Elastic IPs (cost), high-utilization EC2 (performance), MFA on root & key rotation (security), RDS backups enabled (fault tolerance), VPC/EC2 limits (service limits) [`12:10:19`](https://www.youtube.com/watch?v=7HKot-brXFE&t=43819)
- Demo: a public S3 bucket (public ACL + public-read bucket policy) triggers a yellow warning check after a delay; you can set alert recipients (e.g. email security contacts) [`12:14:48`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44088) [`12:15:02`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44102)

### Service Level Agreements (SLA / SLI / SLO)

- **SLA**: formal commitment on expected service level between customer and provider; if unmet (and customer meets obligations), customer is eligible for compensation — financial or service credits [`12:15:55`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44155)
- **SLI** (Service Level Indicator): the metric measured — uptime, performance, availability, throughput, latency, error rate, durability, correctness [`12:15:55`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44155) [`12:16:20`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44180)
- **SLO** (Service Level Objective): the target the provider agreed to meet, expressed as a target percentage over a period (e.g. 99.99% availability over 3 months) [`12:16:20`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44180)
- Jargon: "nine nines" = 99.9999999%; common targets are 99.95% and 99.99% [`12:16:49`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44209)
- Examples (exam won't ask exact numbers): DynamoDB — 99.999% with global tables SLA, 99.99% standard; missing it yields service credits (10% back down to 99.0%, 25% back down to 95.0%, 100% back below 95%) [`12:17:24`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44244) [`12:18:20`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44300)
- Compute SLA spans EC2, EBS, ECS, EKS with a region-level and an instance-level commitment; RDS multi-AZ commits to 99.95% monthly uptime — SLAs vary per service, look each one up [`12:18:51`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44331) [`12:19:24`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44364) [`12:19:55`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44395)

### Health Dashboards

- **Service Health Dashboard**: general status of AWS services by geographic area, with RSS feed [`12:20:48`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44448)
- **Personal Health Dashboard**: alerts and guidance for AWS events that affect **your** environment; available to all customers; shows recent/active events and proactive notifications for scheduled activities [`12:21:17`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44477)

### AWS Abuse (Trust & Safety team)

- Report abuse to the **AWS Trust & Safety team**, not regular support, when AWS-owned IPs/resources are involved in: spam, port scanning, DoS/DDoS attacks, intrusion attempts, hosting prohibited/copyrighted content, or distributing malware [`12:22:14`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44534) [`12:22:43`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44563) [`12:23:05`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44585)
- Contact abuse@amazonaws.com or fill in the abuse report form — applies whether the abuse comes from an outside account or your own compromised account [`12:23:32`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44612)

### AWS Free Tier

- Three kinds of "free": 12-month free tier offers, always-free monthly limits, and inherently free services [`12:24:21`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44661)
- Highlights [`12:24:49`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44689) [`12:25:19`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44719) [`12:25:50`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44750) [`12:26:18`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44778) [`12:26:42`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44802):
  - EC2: t2.micro 750 h/mo for 1 year (~730 h in a month = one server running all month free)
  - RDS (MySQL/Postgres): db.t2.micro 750 h/mo for 1 year
  - ELB: 750 h/mo for 1 year (load balancers normally ~$15/mo)
  - CloudFront: 50 GB data transfer out for 1 year
  - Amazon Connect: toll-free number, 90 min call time/mo for 1 year
  - ElastiCache: cache.t3.micro 750 h/mo for 1 year; Elasticsearch Service 750 h/mo for 1 year
  - Pinpoint: 5,000 targeted users/mo for 1 year
  - SES: 62,000 emails/mo **forever**; CodePipeline: 1 pipeline free; CodeBuild: 100 build min/mo forever
  - Lambda: 1M free requests/mo + 3.2M seconds of compute/mo **forever**

### Promotional Credits

- Equivalent to USD on the platform; earned via AWS Activate startup program, hackathons, surveys, etc.; redeemed in the billing console [`12:27:32`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44852)
- Generally have an expiry date (a few months to a year); usable for most services, but NOT for things with external costs like purchasing a Route 53 domain [`12:27:55`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44875)

### AWS Partner Network (APN)

- Global partner program; join as a **consulting partner** (help companies use AWS) or a **technology partner** (build services on AWS); tiers: Select, Advanced, Premier [`12:28:18`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44898)
- Free to sign up, but tiers require an annual fee (starting in the thousands) plus knowledge requirements (AWS certifications, APN-exclusive certifications) [`12:28:46`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44926) [`12:29:09`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44949)
- Benefits: promotional AWS credits back, speaking opportunities in AWS marketing channels, and APN membership is required to sponsor a vendor booth at AWS events (e.g. re:Invent) [`12:29:42`](https://www.youtube.com/watch?v=7HKot-brXFE&t=44982) [`12:30:13`](https://www.youtube.com/watch?v=7HKot-brXFE&t=45013)

### AWS Budgets & Budget Reports

- Alerts when you exceed (or approach) a defined budget; cost, usage, or reservation budgets; monthly/quarterly/yearly tracking with custom start/end dates; reservation alerts support EC2, RDS, Redshift, ElastiCache [`12:30:54`](https://www.youtube.com/watch?v=7HKot-brXFE&t=45054)
- Can budget by dollar amount or by usage unit (e.g. EC2 running hours); notification via email or chatbot at a threshold of current or forecasted spend [`12:31:23`](https://www.youtube.com/watch?v=7HKot-brXFE&t=45083) [`12:31:53`](https://www.youtube.com/watch?v=7HKot-brXFE&t=45113)
- **First two budgets are free**, then ~$0.02/day (~$0.60/mo) per budget; limit of 20,000 budgets — no reason not to set one on a new account [`12:32:17`](https://www.youtube.com/watch?v=7HKot-brXFE&t=45137)
- **Budget Reports**: daily/weekly/monthly emailed reports on budget performance, so you don't have to log into the console [`12:32:34`](https://www.youtube.com/watch?v=7HKot-brXFE&t=45154)

### Cost & Usage Reports (CUR) and Cost Allocation Tags

- CUR generates a detailed spreadsheet delivered to an S3 bucket; analyze via Athena (queryable), QuickSight (BI visualization, similar to Tableau/PowerBI), or Redshift [`12:32:58`](https://www.youtube.com/watch?v=7HKot-brXFE&t=45178) [`12:33:24`](https://www.youtube.com/watch?v=7HKot-brXFE&t=45204)
- Granularity: hourly, daily, or monthly; output as zipped CSV or Parquet; "cost allocation reports" is the old name for CUR [`12:33:24`](https://www.youtube.com/watch?v=7HKot-brXFE&t=45204) [`12:33:50`](https://www.youtube.com/watch?v=7HKot-brXFE&t=45230) [`12:34:34`](https://www.youtube.com/watch?v=7HKot-brXFE&t=45274)
- **Cost allocation tags**: optional metadata attached to resources for cost analysis; two types — user-defined and AWS-generated — and you must **activate** the tags you want in reports [`12:34:14`](https://www.youtube.com/watch?v=7HKot-brXFE&t=45254)

### Billing Alarms (CloudWatch)

- A regular CloudWatch alarm focused on spend; you must **enable billing alerts first**, then choose Billing as the metric [`12:34:34`](https://www.youtube.com/watch?v=7HKot-brXFE&t=45274)
- More flexible than AWS Budgets — ideal for complex spend/usage alerting use cases; both options are valid [`12:35:08`](https://www.youtube.com/watch?v=7HKot-brXFE&t=45308)

### AWS Cost Explorer

- Visualize, understand, and manage AWS cost and usage over time: time ranges, monthly/daily aggregation, robust filtering (e.g. EC2 in a specific region), default reports (monthly cost by service / linked account, RI utilization), custom saved reports, and forecasting [`12:35:49`](https://www.youtube.com/watch?v=7HKot-brXFE&t=45349) [`12:36:09`](https://www.youtube.com/watch?v=7HKot-brXFE&t=45369) [`12:36:35`](https://www.youtube.com/watch?v=7HKot-brXFE&t=45395)
- Cost Explorer lives in **us-east-1** [`12:36:35`](https://www.youtube.com/watch?v=7HKot-brXFE&t=45395)
- Tip: the **Bills** page in the billing dashboard itemizes every single service you're billed for — useful in a different way than Cost Explorer [`12:38:41`](https://www.youtube.com/watch?v=7HKot-brXFE&t=45521)

### AWS Pricing API

- Programmatic access to current price offerings; two versions: the **Query API** (Price List Service API, JSON requests via e.g. Postman) and the **Batch API** (Price List API via HTML URLs — pasteable in a browser, returns JSON) [`12:39:10`](https://www.youtube.com/watch?v=7HKot-brXFE&t=45550) [`12:39:43`](https://www.youtube.com/watch?v=7HKot-brXFE&t=45583)
- Subscribe to **SNS notifications** for price change alerts (price cuts, new instance types, new services) [`12:40:08`](https://www.youtube.com/watch?v=7HKot-brXFE&t=45608)

### Savings Plans (follow-along)

- Found under Cost Explorer; commit for 1 or 3 years; three types: **Compute** (EC2, Fargate, Lambda), **EC2 Instance** (specific instance family), and **SageMaker** savings plans [`12:40:29`](https://www.youtube.com/watch?v=7HKot-brXFE&t=45629)
- Easiest workflow: use the recommendations panel (based on your past 30 days of spend) — e.g. a 1-year all-upfront compute plan showing $25.36/mo savings — then add to cart and submit the order [`12:41:17`](https://www.youtube.com/watch?v=7HKot-brXFE&t=45677) [`12:42:22`](https://www.youtube.com/watch?v=7HKot-brXFE&t=45742)
