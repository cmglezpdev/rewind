# Serverless Services

The most purely serverless AWS services and an abstract definition of serverless architecture — serverless as a spectrum, not a yes/no. [`10:04:06`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36246)

### Definition

- Serverless = the underlying servers, infrastructure, and operating system are taken care of by the CSP; generally highly available, scalable, and cost-effective by default — you pay for what you use [`10:04:06`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36246)

### The most purely serverless services

- DynamoDB — serverless NoSQL key-value and document database; scales to billions of records with consistent data returned in at least a second; no shard management [`10:04:31`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36271)
- S3 — serverless object storage; unlimited/very large file uploads; pay for what you store; no file system or disk-size management [`10:04:31`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36271)
- ECS Fargate — serverless container orchestration: same as ECS but you pay on demand per running container; with plain ECS you must keep an EC2 server running even with no containers, while Fargate's underlying server is AWS-managed [`10:04:58`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36298)
- AWS Lambda — serverless functions: run code without provisioning servers; upload a small piece of code, choose memory and timeout; charged on runtime rounded to the nearest 100 ms [`10:04:58`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36298)
- Step Functions — state machine service coordinating multiple services into serverless workflows; share data among Lambdas, have Lambdas wait for each other; also works with Fargate tasks [`10:05:26`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36326)
- Aurora Serverless — on-demand version of Aurora for when you want most Aurora benefits but can trade off cold starts, or don't have much traffic/demand [`10:05:26`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36326)
- Also serverless (list kept short on purpose): API Gateway, AppSync, AWS Amplify, SQS, SNS [`10:05:26`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36326)

### Serverless architecture (abstract view)

- Serverless architecture generally describes fully managed cloud services; classifying a service as serverless is NOT a boolean yes/no but a scale — a service has a degree of serverless (a definition not everyone accepts, since CSPs and thought leaders define serverless differently) [`10:06:17`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36377)
- Characteristics a serverless service can have (all or most): highly elastic and scalable, highly available, highly durable, secure by default, abstracts away the underlying infrastructure, billed on the execution of your business tasks (sometimes as abstract credits not mapping to anything physical) [`10:07:13`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36433)
- Scale to zero: when not in use, serverless resources cost nothing; pay-for-value: you don't pay for idle servers, you pay for the value the service provides [`10:07:47`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36467)
- Analogy: serverless is like an energy-efficiency rating label — some services are "more serverless" than others [`10:08:11`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36491)
