# Governance

Multi-account management (Organizations, Control Tower), compliance as code (AWS Config), tagging and resource groups, the Cloud Adoption Framework, and business-centric services that appear as exam distractors. [`9:13:55`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33235)

### AWS Organizations

- Allows creation of new AWS accounts and central management of billing, access control, compliance, security, and resource sharing across accounts [`9:13:55`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33235)
- Root account user: a single sign-in identity with complete access to all AWS services and resources in an account — every account has one [`9:14:20`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33260)
- Organizational Units (OUs): groups of AWS accounts within an organization that can contain other OUs, creating a hierarchy [`9:14:42`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33282)
- Service Control Policies (SCPs): central control over allowed permissions for all accounts in the organization — essentially applying IAM policies organization-wide, OU-wide, or to select accounts [`9:14:42`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33282)
- Organizations must be turned on and once on it CANNOT be turned off; recommended for any serious workload to isolate accounts by workload; one account is the master/root account (docs may still say "master account") [`9:15:20`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33320)
- Terminology traps: the root account is not the root account user, and an AWS account is not the same as a user account — signing up for AWS creates an AWS account plus a root user account [`9:15:55`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33355)

### AWS Control Tower

- Helps enterprises quickly set up a secure multi-account AWS environment with a baseline architecture [`9:16:19`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33379)
- Landing Zone: baseline environment following well-architected best practices — SSO enabled by default, centralized (tamper-evident) CloudTrail logging away from workloads, cross-account security auditing [`9:16:45`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33405)
- Account Factory (formerly "account vending machine"): automates and standardizes provisioning of new accounts with pre-approved configuration (network config, region selection); enables self-service via AWS Service Catalog (pre-approved workloads as CloudFormation templates) [`9:17:10`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33430)
- Guardrails: pre-packaged governance rules for security, operations, and compliance, applied enterprise-wide or to specific account groups [`9:17:34`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33454)
- Control Tower is the replacement for the retired AWS Landing Zones offering (which was never self-serve) [`9:18:02`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33482)

### AWS Config

- Foundations: change management = a formal process to monitor, enforce, and remediate changes; compliance as code (CaC) = using programming to automate that monitoring/enforcing/remediating to stay compliant [`9:18:40`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33520)
- AWS Config is a compliance-as-code framework to manage change in AWS accounts on a per-region basis — you must enable it in every region you need [`9:19:01`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33541)
- Config rules check whether a resource is in the expected state and can remediate it into the desired state; rules are powered by Lambdas [`9:19:33`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33573)
- Use Config when: you want a resource to stay configured a specific way for compliance, keep track of configuration changes, list all resources in a region, analyze potential security weaknesses, or need detailed historical information [`9:19:48`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33588)

Follow-along highlights:
- One-click setup per region; needs a service-linked role and an S3 bucket; inventory shows most resources in the account/region (takes time to populate) [`9:20:17`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33617)
- Conformance packs: bundles of config rules (NIST, CIS, Well-Architected, IAM best practices...) — they are just CloudFormation templates (on GitHub) that set up rules [`9:21:04`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33664)
- Rules have a trigger type (on configuration change or periodic); you can manage remediation to auto-correct or notify the right people when non-compliant [`9:22:14`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33734)
- Custom rules = your own Lambda function (provide the Lambda ARN) — Config can check for anything you can put in a Lambda [`9:22:39`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33759)
- Cost warning: conformance packs incur spend over time because checks run on the rules — remove them if unused [`9:23:40`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33820)
- Resource timeline (in resource inventory) shows how a resource changed over time — not just IS it compliant, but WHEN it was compliant [`9:26:21`](https://www.youtube.com/watch?v=7HKot-brXFE&t=33981)

### Tagging

- A tag is a key-value pair assigned to an AWS resource at creation time [`9:27:44`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34064)
- Tags organize resources for: resource management (workloads/environments), cost management and optimization (cost tracking, budgets, alerts), operations management (SLAs, mission-critical services), security (data classification), governance/regulatory compliance, and automation [`9:28:15`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34095)
- Tags can be used with IAM policies to restrict access based on tag values [`9:28:49`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34129)
- Quirk: an EC2 instance's "name" is actually just a tag with key `Name` [`9:28:49`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34129)

### Resource Groups

- A collection of resources that share one or more tags — helps organize and consolidate information per project [`9:30:00`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34200)
- Can display details about the grouped resources based on metrics, alarms, and configuration settings; settings can be modified anytime [`9:30:27`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34227)
- Found under "Resource Groups & Tag Editor" (now its own standalone service; historically under the global console header / Systems Manager); groups can be tag-based or CloudFormation-based; unlimited single-region groups per account [`9:33:39`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34419)
- Useful in IAM policies (actions prefixed `resource-groups`): grant access to a resource group and it covers all resources within — a time-saver for per-project permissions [`9:35:21`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34521)
- Tag policies help standardize tags across accounts/the entire organization [`9:36:18`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34578)

### Cloud Adoption Framework (CAF)

- A white paper to help plan migration from on-premise to AWS; organizes guidance into six focus areas: business, people, governance, platform, security, operations; high-level/holistic rather than granular [`9:36:41`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34601)
- The six perspectives (each = how to update staff skills and organizational processes to...):
  - Business (business/finance managers, budget owners, strategy stakeholders) — optimize business value moving ops to the cloud [`9:37:39`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34659)
  - People (HR, staffing, people managers) — optimize and maintain the workforce; ensure competencies at the right time [`9:37:39`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34659)
  - Governance (CIOs, program/project managers, enterprise architects, business analysts) — ensure business governance and measure cloud investments against business outcomes [`9:37:39`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34659)
  - Platform (CTOs, IT managers, solution architects) — deliver and optimize cloud solutions and services [`9:38:15`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34695)
  - Security (CISO, IT security managers/analysts) — align cloud architecture to security control, resilience, and compliance requirements [`9:38:15`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34695)
  - Operations (IT operations/support managers) — ensure system health and reliability during the move and operate with agile cloud best practices [`9:38:47`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34727)
- The Cloud Adoption Readiness Tool (CART) accompanies the framework: a free survey producing an assessment report with a heat map and radar chart to convince stakeholders [`9:40:12`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34812)

### Business-centric services (exam distractors)

The exam guide says these aren't covered, but they show up as answer distractors — knowing them helps you guess correctly [`9:41:04`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34864)

- Amazon Connect — virtual call center: route callers with workflows, record calls, manage caller queues; same system used by Amazon customer service [`9:41:29`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34889)
- WorkSpaces — virtual remote desktop service; provision Windows or Linux desktops in minutes, scales to thousands [`9:41:29`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34889)
- WorkDocs — shared collaboration/centralized file storage; similar to Microsoft SharePoint [`9:41:29`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34889)
- Chime — video conferencing similar to Zoom/Skype; screen share, multi-party calls, secure by default [`9:41:56`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34916)
- WorkMail — managed business email/contacts/calendar with IMAP support; similar to Gmail or Exchange [`9:41:56`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34916)
- Pinpoint — marketing campaign management: targeted emails, SMS, push notifications, voice messages; A/B testing and journeys (complex email response workflows) [`9:42:25`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34945)
- SES — transactional email service: integrate into your app to send emails, templates, open-rate tracking, reputation tracking [`9:42:25`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34945)
- QuickSight — business intelligence: connect multiple data sources and visualize data as graphs with little to no knowledge [`9:42:25`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34945)
- Exam tip: definitely remember QuickSight, SES, and Pinpoint — those will show up on the exam; the rest appear mostly as distractors [`9:42:58`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34978)
