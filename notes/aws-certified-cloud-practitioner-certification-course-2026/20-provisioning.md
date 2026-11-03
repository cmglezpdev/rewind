# Provisioning

The AWS services that allocate and set up resources for you — most powered by CloudFormation underneath — with a deep dive and hands-on lab on Elastic Beanstalk. [`9:43:12`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34992)

### What is provisioning

- Provisioning = the allocation or creation of resources and services to a customer; provisioning services set up and manage AWS services, and most of them use CloudFormation underneath [`9:43:12`](https://www.youtube.com/watch?v=7HKot-brXFE&t=34992)

### Provisioning services at a glance

- Elastic Beanstalk (EB) — PaaS to easily deploy web apps; provisions EC2, S3, SNS, CloudWatch, EC2 Auto Scaling groups, load balancers; think of it as "the Heroku equivalent for AWS" [`9:43:33`](https://www.youtube.com/watch?v=7HKot-brXFE&t=35013)
- OpsWorks — configuration management service providing managed instances of Chef and Puppet [`9:43:33`](https://www.youtube.com/watch?v=7HKot-brXFE&t=35013)
- CloudFormation — infrastructure modeling and provisioning service; automates provisioning by writing templates in JSON or YAML; this is IaC (Infrastructure as Code) [`9:44:02`](https://www.youtube.com/watch?v=7HKot-brXFE&t=35042)
- Quick Starts — pre-made packages (essentially CloudFormation templates authored by the community or the Amazon Partner Network) that configure compute, network, storage, and other services to deploy a workload [`9:44:02`](https://www.youtube.com/watch?v=7HKot-brXFE&t=35042)
- AWS Marketplace — digital catalog of thousands of software listings from independent software vendors to find, buy, test, and deploy software [`9:44:33`](https://www.youtube.com/watch?v=7HKot-brXFE&t=35073)
- AWS Amplify — mobile/web app framework that provisions multiple AWS services as your backend, specifically serverless services (DynamoDB, AppSync/GraphQL, API Gateway...) [`9:44:33`](https://www.youtube.com/watch?v=7HKot-brXFE&t=35073)
- AWS App Runner — fully managed service to quickly deploy containerized web apps and APIs at scale, no prior infrastructure experience required; basically PaaS for containers [`9:44:56`](https://www.youtube.com/watch?v=7HKot-brXFE&t=35096)
- AWS Copilot — CLI to quickly launch and manage containerized applications; sets up pipeline scripts for you [`9:44:56`](https://www.youtube.com/watch?v=7HKot-brXFE&t=35096)
- AWS CodeStar — unified UI to manage software development activities in one place; commonly launches stack types like LAMP [`9:45:30`](https://www.youtube.com/watch?v=7HKot-brXFE&t=35130)
- AWS CDK — IaC tool letting you use your favorite programming language; generates CloudFormation templates [`9:45:30`](https://www.youtube.com/watch?v=7HKot-brXFE&t=35130)

### Elastic Beanstalk (deep dive)

- PaaS definition: lets customers develop, run, and manage applications without the complexity of building and maintaining the infrastructure typically associated with launching an app [`9:45:59`](https://www.youtube.com/watch?v=7HKot-brXFE&t=35159)
- EB workflow: choose a platform, upload your code, it runs — with little knowledge of infrastructure; AWS says it's "not recommended for production" but that caveat targets enterprises — small/medium companies can run EB for a long time just fine [`9:45:59`](https://www.youtube.com/watch?v=7HKot-brXFE&t=35159)
- Powered by CloudFormation templates; sets up: ELB, Auto Scaling groups, RDS, preconfigured EC2 instances, CloudWatch monitoring, SNS integration, deployment strategies (in-place, blue/green), built-in security (e.g., database password rotation), and Dockerized environments [`9:46:37`](https://www.youtube.com/watch?v=7HKot-brXFE&t=35197)
- Supported platforms include: Docker, Multicontainer Docker, Go, .NET, Java, Node.js, Ruby, PHP, Python, Tomcat [`9:46:55`](https://www.youtube.com/watch?v=7HKot-brXFE&t=35215)

### Elastic Beanstalk follow-along (lab)

- Two environment tiers: web server environment and worker environment (worker = long-running workloads/background jobs); it's generally recommended to have both [`9:47:51`](https://www.youtube.com/watch?v=7HKot-brXFE&t=35271)
- Platform choice: managed platform vs custom platform (own containers); sample application provided per platform (e.g., Ruby 2.7) [`9:48:16`](https://www.youtube.com/watch?v=7HKot-brXFE&t=35296)
- Configuration presets: single instance (one EC2, very cost effective), single instance with spot pricing, high availability (load balancer + auto scaling group), or custom configuration [`9:48:54`](https://www.youtube.com/watch?v=7HKot-brXFE&t=35334)
- More options: enable X-Ray, log rotation, log streaming, load balancer settings; deployment strategies: all at once, rolling, immutable, traffic splitting; key pair for SSH; can create and manage a database alongside the environment with key rotation handled for you [`9:49:23`](https://www.youtube.com/watch?v=7HKot-brXFE&t=35363)
- Troubleshooting tip: if the environment hangs in a pending state ("instance has not sent any data since launch"), rebooting the instance can fix it [`9:50:39`](https://www.youtube.com/watch?v=7HKot-brXFE&t=35439)
- Built-in operations: request logs (last 100 lines — access logs, error logs, Puma logs, EB engine logs, commonly sent to support), instance health monitoring, a built-in monitoring dashboard, alarms, managed event schedules, and event history [`9:51:51`](https://www.youtube.com/watch?v=7HKot-brXFE&t=35511)
- Deploying a new version: download the running app version, edit it (demo used Cloud9), zip it (`zip -r app.zip .`), then "Upload and deploy" with a version name [`10:00:02`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36002)
- EB config files (YAML) can live in the app's root directory; the AWS samples work with defaults [`10:00:31`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36031)
- Cleanup gotchas: "Rate exceeded" errors when terminating can require retries; deleting the environment can take the application with it; EB leaves lingering S3 buckets protected by a bucket policy you must delete before the bucket can be removed [`10:01:20`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36080), [`10:03:26`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36206)
