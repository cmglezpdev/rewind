# AWS Global Infrastructure

The physical, globally distributed backbone of AWS — regions, availability zones, edge locations, and specialized zones — and how it enables high availability, low latency, and regulatory compliance.

## Overview

- Global infrastructure is the physical network connecting AWS's globally distributed hardware and data centers; it acts as one big system to the end customer [`1:26:59`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5219)
- Made up of: regions, availability zones, Direct Connect locations, points of presence, Local Zones, Wavelength Zones [`1:26:59`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5219)
- Currently 39 launched regions (up from 32 at the last course update); expansion has been slowing [`1:28:02`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5282)
- The AWS Global Infrastructure page shows a "Regional Services" list — check that the services you need are available in your region [`1:30:43`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5443)
- AWS now offers "European Data Sovereignty" to address European data-sovereignty concerns [`1:29:40`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5380)

### Regions

- Regions = geographically distinct locations consisting of one or more availability zones [`1:31:20`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5480)
- Every region is physically isolated from and independent of every other region in terms of location, power, and water supply [`1:31:42`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5502)
- **US-East-1 (Northern Virginia)** is the most important region: AWS's first region (where SQS and S3 launched), and many special use cases only work there [`1:31:42`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5502)
- Key region facts (exam-relevant):
  - Each region generally has 3 AZs by intention (some new users limited to 2) [`1:32:32`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5552)
  - New services almost always launch first in US-East-1 [`1:32:32`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5552)
  - Not all services are available in all regions; all billing information appears in US-East-1 [`1:32:32`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5552)
  - Cost of AWS services varies per region [`1:32:58`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5578)
- **4 factors when choosing a region**: regulatory compliance, cost of services, service availability, distance/latency to end users [`1:33:21`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5601)

### Regional vs Global Services

- Regional services are scoped by the region selected in the Management Console dropdown — you generally do NOT explicitly set the region at resource creation (unlike GCP/Azure) [`1:33:45`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5625) [`1:34:12`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5652)
- Global services operate across regions with the console region fixed to "Global": S3, CloudFront, Route 53, IAM [`1:34:12`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5652)
- Nuances at creation time: IAM has no region concept; S3 buckets still require choosing a region; CloudFront distributions choose a group of regions (e.g. all world vs North America) [`1:35:02`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5702)
- Console demo: EC2 launch is bound to the current console region and its VPC; you pick the AZ indirectly via subnet [`1:40:54`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6054) [`1:41:37`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6097)
- S3 bucket names used to be globally unique; AWS added regional namespaces (unique per region) more recently [`1:42:07`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6127)
- CloudFront is "truly global" (region locked to Global); its regional bounding comes from the resource it's attached to (S3 bucket, load balancer, API Gateway) [`1:43:05`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6185) [`1:44:08`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6248)
- Some regions are not enabled by default per account (e.g. 17 disabled regions on an older account, like Calgary) and must be opted into [`1:40:05`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6005)

### Availability Zones (AZs)

- An AZ is a physical location made up of **one or more data centers** (a data center = a secured building with hundreds/thousands of computers) [`1:35:36`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5736)
- Data centers within a region are isolated from each other (different buildings) but close enough for low latency (~10 ms or less) [`1:36:03`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5763)
- Common practice: run workloads in at least 3 AZs for high availability — often driven by regulatory compliance [`1:36:29`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5789)
- AZ naming = region code + letter (e.g. `us-east-1a`) [`1:36:29`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5789)
- You never choose an AZ directly when launching resources — you choose a **subnet**, which is associated with an AZ [`1:36:55`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5815)
- Fun fact: US-East-1 has **6 AZs**, the most of any region [`1:37:25`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5845)
- AZs are interconnected with high-bandwidth, low-latency, fully redundant dedicated metro fiber; all inter-AZ traffic is encrypted; AZs are within ~100 km (60 miles) of each other [`1:38:22`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5902) [`1:38:54`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5934)
- AZ letters can skip (e.g. ca-central-1 has 1a, 1b, 1d but no 1c) [`1:38:22`](https://www.youtube.com/watch?v=7HKot-brXFE&t=5902)

### Fault Tolerance: Fault Domains and Fault Levels

- **Fault domain**: a section of a network vulnerable to damage if a critical device/system fails; failures do not cascade outside the domain [`1:44:30`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6270) [`1:45:02`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6302)
- **Fault level**: a collection of fault domains; domains can be nested (servers in a rack → rack → room → building), and the cloud provider defines the boundaries [`1:45:25`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6325)
- AWS abstracts fault domains away; Azure by contrast lets you define your own fault domains [`1:45:48`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6348)
- Mapping: an AWS **region = fault level**; its **AZs = fault domains** [`1:46:15`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6375)
- AWS calls each AZ an "independent failure zone" (AWS-specific terminology, essentially a fault domain) [`1:46:37`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6397) [`1:47:05`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6425)
- Failure-zone properties: AZs physically separated within a metro region, located in lower-risk flood plains, discrete UPS + on-site backup generation, independent power substations per AZ, redundantly connected to multiple tier-1 transit providers [`1:47:05`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6425) [`1:47:40`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6460)
- Multi-AZ = high availability: partitioning across AZs protects from power outages, lightning strikes, tornadoes, earthquakes [`1:47:40`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6460)

### AWS Global Network and Edge Locations

- The global network = interconnections between AWS global infrastructure, commonly called the "backbone of AWS" — a private expressway between data centers [`1:48:08`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6488)
- Edge locations act as **on/off ramps** to the global network [`1:48:44`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6524):
  - **On-ramp** (fast into AWS): AWS Global Accelerator, S3 Transfer Acceleration [`1:48:44`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6524)
  - **Off-ramp** (near end user): Amazon CloudFront (CDN) — edge storage/compute near the user [`1:49:11`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6551)
- **VPC endpoints** (no edge locations) keep traffic inside the AWS network, never traversing the public internet [`1:49:36`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6576)

### Points of Presence (PoPs)

- A PoP is an intermediate location between an AWS region and the end user — a data center owned by AWS or a trusted partner, used for content delivery or expedited upload [`1:49:57`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6597)
- PoP resource types [`1:50:27`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6627):
  - **Edge locations**: cache copies of the most popular files (web pages, images, videos) to reduce distance to end users [`1:50:27`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6627)
  - **Regional edge caches**: much larger caches of less popular files, reducing full round trips and transfer costs [`1:50:50`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6650)
- A tier-1 network can reach every other network without purchasing IP transit or peering; AWS AZs are redundantly connected to multiple tier-1 transit providers [`1:51:19`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6679)
- Services using PoPs/edge locations [`1:51:46`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6706):
  - **CloudFront**: point your website at CloudFront; it routes requests to the nearest edge cache; you choose an origin (web server or storage) whose content gets cached at edges worldwide [`1:51:46`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6706)
  - **S3 Transfer Acceleration**: generates a special URL so end users upload to a nearby edge location, then the file moves fast within the AWS network to S3 [`1:52:13`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6733)
  - **Global Accelerator**: finds the optimal path from end user to your web servers; users hit an edge location instead of your app directly — an instant "boost" if you only run in one region [`1:52:13`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6733) [`1:52:37`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6757)

### AWS Direct Connect

- Private/dedicated connection between your data center, office, or colocation and AWS — like a fiber cable from your data center to AWS with near-zero latency [`1:53:03`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6783)
- Two bandwidth options: lower 50–500 Mbps, higher 1–10 Gbps [`1:53:26`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6806)
- Benefits: reduces network costs, increases bandwidth throughput, more consistent network experience than internet-based connections [`1:53:26`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6806)
- **Colocation** (carrier hotel) = a data center renting equipment, space, and bandwidth to retail customers [`1:53:26`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6806)
- Exam tip: "private" does NOT mean secure — pair Direct Connect with a VPN for security [`1:53:58`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6838)
- Direct Connect locations = trusted partner data centers (e.g. Allied data center in Toronto) where you establish the dedicated connection [`1:54:24`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6864)

### Local Zones

- Data centers very close to densely populated areas for single-digit millisecond latency (~7 ms); requires opt-in (support ticket) [`1:54:55`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6895)
- First Local Zone: Los Angeles; always tied to an existing region — appears as an AZ, e.g. `us-west-2-lax-1a` [`1:55:17`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6917)
- Only a limited subset of services available (certain EC2 types, EBS, Amazon FSx, ALB, VPC) [`1:55:44`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6944)
- Purpose: latency-sensitive demanding apps — media & entertainment, electronic design automation, ad tech, machine learning [`1:55:44`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6944)

### Wavelength Zones

- Edge computing on **5G networks** for ultra-low latency, as close as possible to users [`1:56:14`](https://www.youtube.com/watch?v=7HKot-brXFE&t=6974)
- AWS partners with telecoms: Verizon, Vodafone, KDDI, SK Telecom [`1:56:42`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7002)
- You create a subnet tied to a wavelength zone (like an AZ) and launch EC2 instances at the edge of the 5G network; cell-tower users get routed to nearby hardware [`1:56:42`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7002)

### Data Residency, Compliance Boundaries, Data Sovereignty

- **Data residency**: the physical/geographical location where data and cloud resources reside (not a guarantee, just where it is) [`1:57:14`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7034) [`1:58:14`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7094)
- **Compliance boundary**: legal requirement by government/organization describing where data and resources are allowed to reside [`1:57:14`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7034)
- **Data sovereignty**: jurisdictional control/legal authority asserted over data because it physically sits within a jurisdiction [`1:57:48`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7068)
- Ways to meet compliance boundaries on AWS:
  - **AWS Outposts**: physical rack in your own data center — you know exactly where data resides (expensive) [`1:58:14`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7094)
  - **AWS Config**: policy-as-code; continuously checks resource configuration, alerts or auto-remediates deviations (e.g. deletes resources launched in a forbidden region) [`1:59:06`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7146)
  - **IAM policies**: explicitly deny access to specific regions; use **Service Control Policies (SCPs)** in AWS Organizations to enforce this org-wide [`1:59:34`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7174)

### AWS for Government and GovCloud

- Public sector = military, law enforcement, infrastructure, public transit, public education, healthcare, government; AWS serves it by meeting compliance programs like HIPAA, FedRAMP, CJIS, FIPS [`2:00:10`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7210)
- **FedRAMP** = Federal Risk and Authorization Management Program: US government-wide standardized approach to security assessment, authorization, and continuous monitoring of cloud products [`2:00:40`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7240)
- **GovCloud** (also exists on Azure): isolated AWS regions for FedRAMP workloads hosting sensitive Controlled Unclassified Information; operated only by US citizens on US soil, accessible only to US entities and screened root account holders [`2:01:13`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7273)
- GovCloud supports compliance with FedRAMP, DOJ CJIS security policy, ITAR, EAR, DoD cloud computing SRG [`2:01:44`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7304)

### AWS China

- AWS China is completely, intentionally isolated from AWS Global to meet mainland-China regulatory compliance; separate domain amazonaws.cn [`2:02:26`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7346)
- Requires a Chinese business (ICP) license; not all services available (e.g. no Route 53) [`2:02:56`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7376)
- Advantage over running in Singapore: traffic stays inside China, so no traversing the Great Firewall [`2:02:56`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7376)
- Two mainland regions, operated by local partners (Ningxia/Northwest by NWCD, Beijing/North-1 by Sinnet) because AWS couldn't meet compliance alone [`2:03:30`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7410)
- Due to a trademark issue, the "AWS" name isn't used on the Chinese site; account creation requires business registration documents [`2:04:26`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7466)

### Sustainability

- Amazon co-founded **The Climate Pledge**: net-zero carbon by 2040 across all Amazon businesses including AWS [`2:04:59`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7499)
- Three parts of AWS cloud sustainability goals [`2:05:32`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7532):
  1. **Renewable energy**: 100% renewable-powered global infrastructure targeted by 2025; purchases/retires environmental attributes (RECs, guarantees of origin) to cover non-renewables [`2:05:32`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7532)
  2. **Cloud efficiency**: AWS infrastructure claimed 3.6x more energy efficient than the median surveyed US enterprise data center [`2:06:04`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7564)
  3. **Water stewardship**: direct evaporative cooling, non-potable/recycled water, on-site water treatment, per-region water efficiency metrics [`2:06:04`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7564)

### AWS Ground Station

- Fully managed service to control satellite communications, process data, and scale operations without building your own ground station — think "big antenna dish pointing at the sky" [`2:08:05`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7685) [`2:08:33`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7713)
- Use cases: weather forecasting, surface imaging, communications, video broadcasts [`2:08:33`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7713)
- Workflow: schedule a **contact** (satellite + start/end time + ground location), then use a Ground Station EC2 AMI to launch instances that uplink/downlink during the contact, or receive downlink data into S3 [`2:08:33`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7713) [`2:09:01`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7741)

### AWS Outposts

- Fully managed service offering the same AWS infrastructure, services, APIs, and tools to virtually any data center, colocation space, or on-premises facility — a rack of AWS servers at your physical location for a consistent hybrid experience [`2:09:44`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7784)
- Rack basics: "U" = rack unit = 1.75 in; industry-standard rack is 48U (7 ft); a full-size rack cage is commonly 42U [`2:10:12`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7812)
- Three form factors [`2:10:43`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7843):
  - **42U**: full rack with servers, delivered fully assembled, installed by AWS, just plug into power and network [`2:11:09`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7869)
  - **1U** server (fits your rack): Graviton2, up to 64 vCPUs, 128 GB memory, 4 TB local NVMe [`2:11:29`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7889)
  - **2U** server: Intel, up to 128 vCPUs, 256 GB memory, 8 TB local NVMe [`2:11:52`](https://www.youtube.com/watch?v=7HKot-brXFE&t=7912)
