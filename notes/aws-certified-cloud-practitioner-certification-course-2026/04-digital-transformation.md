# Digital Transformation

Concepts framing why organizations move to cloud — innovation waves and the "burning platform" — plus the evolution of computing power (CPU → GPU → quantum) and the AWS offerings at each level, including a tour of Amazon Braket.

### Innovation waves (Kondratiev / K-waves)

- K-waves are hypothesized cycle-like phenomena in the global economy, closely connected with technology life cycles; each wave irreversibly changes society on a global scale [`1:14:12`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4452)
- Historical waves: steam engine/cotton → railway/steel → electrical engineering/chemistry → petrochemicals/automobiles → information technology — **cloud technology is the latest wave** (with Web3/ML/AI possibly part of it or separate waves) [`1:14:39`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4479)
- Each wave follows a supply/demand pattern of **prosperity, recession, depression, improvement** — the pattern tells you that you're in a wave and where you are in it [`1:14:39`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4479) [`1:15:09`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4509)

### Burning platform

- A **burning platform** is when a company abandons old technology for new technology with uncertainty of success, motivated by fear that the organization's survival hinges on digital transformation [`1:15:27`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4527)
- Examples: dropping on-prem for cloud, or moving from cloud to Web3 [`1:15:27`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4527)

### Navigating AWS product info

- aws.amazon.com → "Products" dropdown lists all offerings; each service page has details and a **Pricing** tab — checking pricing is something you'll do constantly (looking at pricing pages directly is easier than the calculator) [`1:15:55`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4555) [`1:16:25`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4585) [`1:16:52`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4612)
- Documentation location changes as AWS updates its UI — searching "EC2 documentation" is often faster; in the console, just type the service name in the search bar to jump to it [`1:17:17`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4637) [`1:17:48`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4668)

### Evolution of computing power

- Computing power = the throughput at which a computer completes computational tasks [`1:18:15`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4695)
- **General computing**: e.g., Xeon CPU processors — what you find in AWS data centers [`1:18:15`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4695)
- **GPU/tensor computing**: ~**50x faster** than traditional CPU (metric borrowed from Google's tensor computing); used for specialized ML/AI tasks, not regular web workloads [`1:18:40`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4720) [`1:19:09`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4749)
- **Quantum computing**: e.g., the Rigetti 16Q Aspen-4; ~**100 million times faster**, super cutting edge, few practical applications yet [`1:19:09`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4749) [`1:19:38`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4778)
- New levels of compute add to — not replace — general computing [`1:19:09`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4749)

### AWS offering per compute level

- General computing → **EC2** (Elastic Compute Cloud) with varied instance types/hardware [`1:20:03`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4803)
- GPU/accelerated computing → **AWS Inferentia chip**, designed as a direct competitor to GCP's TPU; advantage: works with any ML framework, not just TensorFlow [`1:20:03`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4803) [`1:20:29`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4829)
- Quantum computing → **Amazon Braket** (quantum computing as a service), delivered via a partnership with Caltech rather than AWS-built hardware [`1:20:29`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4829) [`1:21:00`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4860)

### Amazon Braket walkthrough

- Search "Braket" or "quantum computing" in the console; you may need to accept terms first [`1:21:27`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4887)
- Offers multiple quantum devices with varying qubit counts, an algorithm library, ready-to-go notebooks connected to those devices, and "quantum tasks" [`1:21:27`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4887) [`1:21:57`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4917)
- Pricing is **per shot** (each run) plus **per task**, varying by qubit family/device [`1:22:26`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4946) [`1:22:44`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4964)
- Practical applications are extremely limited today — the point is that quantum research access exists on AWS [`1:23:09`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4989)
