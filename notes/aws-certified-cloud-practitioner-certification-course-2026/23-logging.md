# Logging

AWS's logging trio — CloudTrail (API call auditing), CloudWatch (the monitoring "umbrella" of logs, metrics, alarms, dashboards), and X-Ray (distributed tracing) — plus a CloudTrail hands-on. [`10:17:17`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37037)

### The three logging services

- CloudTrail — logs ALL API calls (SDK, CLI, between AWS services); answers "who do we blame?": who created this bucket, who spun up that expensive EC2 instance, who launched the SageMaker notebook; detects developer misconfigurations and malicious actors, and can automate responses [`10:17:17`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37037)
- CloudWatch — an "umbrella" of multiple services; the core five to know: Logs (centralized log storage), Metrics (time-ordered data points to monitor), EventBridge (formerly CloudWatch Events — trigger events on conditions, e.g., hourly snapshots), Alarms (notifications based on metrics), Dashboards (visualizations from metrics) [`10:17:37`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37057)
- AWS X-Ray — distributed tracing: pinpoint issues within microservices; see how data moves between apps, how long it took, and whether it failed to move forward [`10:18:05`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37085)

### CloudTrail (closer look)

- Enables governance, compliance, operational auditing, and risk auditing of your AWS account; every API call becomes structured data you can read [`10:18:30`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37110)
- Each event identifies: the WHERE (source IP address), WHEN (event time), WHO (user, user agent), and WHAT (region, resource, action) [`10:18:58`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37138)
- CloudTrail logs by default and keeps the last 90 days via Event History; for more than 90 days you must create a trail (very common — create one right away) [`10:19:24`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37164)
- Trails output to S3 and have no GUI like Event History — to analyze a trail you use Amazon Athena [`10:19:46`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37186)

### CloudWatch Alarms

- An alarm monitors a CloudWatch metric against a defined threshold (e.g., NetworkIn > 300 for 1 data point within 5 minutes breaches the alarm) [`10:20:07`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37207)
- Three states: OK (within threshold, do nothing), ALARM (outside threshold, do something), INSUFFICIENT_DATA (just started / metric or data unavailable); on state change you define actions — notification, Auto Scaling action, or EC2 action [`10:20:32`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37232)
- First alarm you'll set up: a billing alarm [`10:20:32`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37232)
- Anatomy of an alarm: threshold condition (the value), metric (data measured, e.g., NetworkIn bytes — with 5-minute monitoring divide by 300 for bytes/second), data points (measurements at points in time), period (how often it evaluates, e.g., every 5 minutes), evaluation period (number of previous periods, e.g., "1 breached data point across the last 4 periods" triggers the alarm) [`10:21:18`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37278), [`10:21:39`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37299)
- Key idea: it's not simply "threshold breached" — the period/evaluation-period logic governs when it fires [`10:22:04`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37324)

### CloudWatch Logs

- Log stream = a sequence of events from an application or instance being monitored (e.g., an EC2 web app streaming logs); can be created manually but usually done automatically by the service [`10:22:25`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37345)
- Log group = collection of streams; stream naming varies by service: Lambda streams named after running instances (Lambdas frequently run on new instances), EC2 application logs named after the instance ID, Glue streams named after glue jobs [`10:22:47`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37367), [`10:23:11`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37391)
- Log event = a single event in a log file, viewable within a log stream; filterable with simple pattern-matching syntax (not very robust) [`10:23:27`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37407)

### CloudWatch Logs Insights

- Interactively search and analyze log data — more robust filtering than the simple stream filter and less burdensome than exporting logs to S3 for Athena; supports all log types; commonly used in the console for ad hoc queries against log groups [`10:24:04`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37444)
- Uses a query syntax: a single request can query up to 20 log groups; queries time out after 50 minutes if not completed; query results are available for 7 days; AWS provides sample queries (e.g., filtering VPC Flow Logs) and you can save your own [`10:24:28`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37468)
- Exam scope: the CCP won't ask these details — just understand conceptually that Log Insights robustly filters logs via a query language [`10:24:56`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37496)

### CloudWatch Metrics

- A metric represents a time-ordered set of data points — a variable monitored over time; CloudWatch comes with many predefined metrics namespaced by AWS service [`10:24:56`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37496)
- EC2 examples: CPUUtilization, DiskReadOps, DiskWriteOps, DiskReadBytes, DiskWriteBytes, NetworkIn, NetworkOut, NetworkPacketsIn, NetworkPacketsOut; metrics are leveraged by CloudWatch Events, Alarms, and Dashboards [`10:25:23`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37523)

### CloudTrail follow-along (lab)

- CloudTrail is on by default; Event History shows account actions for the last 90 days — click an event to see when it happened, who did it, access key used, event source, request ID, source IP, read-only flag, event type, resource, and the raw record [`10:26:20`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37580), [`10:26:41`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37601)
- Creating a trail: needs an S3 bucket; turn on encryption and absolutely turn on log file validation [`10:27:37`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37657)
- Best practice: do NOT store CloudTrail logs in the same account — use an isolated, hardened, infrequently accessed account (only cloud security engineers) so nobody can tamper with, delete, or change the logs [`10:28:02`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37682)
- Cost tips: data events (e.g., S3 object-level) can get very expensive very quickly — keeping only management events saves money; insights events (unusual API activity detection) also add charges [`10:28:35`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37715), [`10:28:57`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37737)
- CloudTrail Insights: events showing unusual API activity, shown in the table for 90 days [`10:29:52`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37792)
- At the organization level (root/management account) you can create one trail spanning all regions and all accounts in the organization — that's what you should do [`10:30:36`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37836)
