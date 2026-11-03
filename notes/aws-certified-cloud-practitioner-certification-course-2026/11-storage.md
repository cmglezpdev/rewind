# Storage

Covers the three universal storage types (block, file, object), S3 fundamentals and storage classes, the Snow family, the full catalog of AWS storage services, and hands-on demos of S3, EBS, and EFS.

### The Three Types of Storage

| Type | AWS service | How data is stored | Access | When to use |
|---|---|---|---|---|
| Block | Elastic Block Store (EBS) | Data split into evenly sized blocks, directly accessed by the OS | Single write volume | You need a virtual drive attached to your VM [`5:12:20`](https://www.youtube.com/watch?v=7HKot-brXFE&t=18740) |
| File | Elastic File System (EFS) | File stored with data and metadata | Multiple connections via network share (NFS/SMB); multiple reads, writes lock the file | Multiple users/VMs need to access the same drive [`5:13:09`](https://www.youtube.com/watch?v=7HKot-brXFE&t=18789) |
| Object | Simple Storage Service (S3) | Object stored with data, metadata, and a unique ID | HTTPS/API; multiple reads and writes, no locks | Upload files without worrying about underlying infrastructure; **not intended for high IOPS** [`5:14:02`](https://www.youtube.com/watch?v=7HKot-brXFE&t=18842) |

- Choice depends on how fast reads/writes must be, how many clients connect simultaneously, and whether the storage must be mounted to a VM [`5:14:39`](https://www.youtube.com/watch?v=7HKot-brXFE&t=18879)

### S3 Fundamentals

- S3 is AWS's flagship storage service and the second AWS service ever launched; it provides basically unlimited object storage [`5:14:58`](https://www.youtube.com/watch?v=7HKot-brXFE&t=18898)
- **Objects** consist of: key (name), value (sequence of bytes), version ID (when versioning is enabled), and metadata. **Buckets** hold objects (and folders which hold objects) [`5:15:49`](https://www.youtube.com/watch?v=7HKot-brXFE&t=18949)
- S3 is a **universal namespace** — bucket names must be globally unique, like domain names [`5:16:13`](https://www.youtube.com/watch?v=7HKot-brXFE&t=18973)
- Exam fact: an individual object can be **0 bytes up to 5 TB** (yes, a zero-byte file is valid) [`5:16:13`](https://www.youtube.com/watch?v=7HKot-brXFE&t=18973)

### S3 Storage Classes

Classes trade retrieval time, accessibility, and durability for cheaper storage [`5:16:38`](https://www.youtube.com/watch?v=7HKot-brXFE&t=18998):

- **S3 Standard** — default tier: 99.99% availability, 11 nines durability, replicated across 3 AZs [`5:17:13`](https://www.youtube.com/watch?v=7HKot-brXFE&t=19033)
- **S3 Intelligent-Tiering** — ML analyzes usage and moves objects to the most cost-effective tier with no performance impact or overhead [`5:17:41`](https://www.youtube.com/watch?v=7HKot-brXFE&t=19061)
- **S3 Standard-IA (Infrequent Access)** — as fast as Standard, cheaper if accessed less than once a month, but adds a retrieval fee (frequent access ends up costing MORE than Standard) [`5:17:41`](https://www.youtube.com/watch?v=7HKot-brXFE&t=19061)
- **S3 One Zone-IA** — single AZ: as fast as Standard, cheaper, lower availability; caveat: data can be destroyed if that AZ suffers a catastrophe [`5:18:06`](https://www.youtube.com/watch?v=7HKot-brXFE&t=19086)
- **S3 Glacier** — long-term cold storage; retrieval takes minutes to hours but very cheap. **S3 Glacier Deep Archive** — lowest cost class; retrieval takes 12 hours [`5:18:28`](https://www.youtube.com/watch?v=7HKot-brXFE&t=19108)
- **S3 Outposts** has its own storage class and doesn't fit the linear cheaper-tier progression; Glacier is basically its own service but part of S3 [`5:19:00`](https://www.youtube.com/watch?v=7HKot-brXFE&t=19140)

### AWS Snow Family

- Storage and compute devices to **physically** move data in/out of the cloud when internet transfer is too slow, difficult, or costly [`5:19:27`](https://www.youtube.com/watch?v=7HKot-brXFE&t=19167)
- **Snowcone**: two sizes — 8 TB and 14 TB usable. **Snowball Edge**: storage optimized 80 TB usable, or compute optimized (~39.5 TB) with many vCPUs and increased memory for edge computing before shipping to AWS. **Snowmobile**: up to 100 PB per trailer [`5:19:53`](https://www.youtube.com/watch?v=7HKot-brXFE&t=19193)
- All data lands in Amazon S3. AWS markets Snowmobile as "move exabytes" only because you can order multiple trailers — a single one is 100 PB [`5:20:45`](https://www.youtube.com/watch?v=7HKot-brXFE&t=19245)
- Original Snowball is likely no longer available — just Snowball Edge (briefcase-sized, 50–80 TB) [`5:22:40`](https://www.youtube.com/watch?v=7HKot-brXFE&t=19360)

### Storage Services Overview

- **S3** — serverless object storage: unlimited files, very large files, pay for what you store, no file system/disk management. **S3 Glacier** — cold storage on previous-generation HDDs for low cost; highly secure and durable [`5:21:14`](https://www.youtube.com/watch?v=7HKot-brXFE&t=19274)
- **EBS** — persistent block storage, a "virtual hard drive in the cloud" attached to EC2; drive types: SSD, IOPS SSD, throughput HDD, cold HDD [`5:21:41`](https://www.youtube.com/watch?v=7HKot-brXFE&t=19301)
- **EFS** — cloud-native NFS file system, mountable to multiple EC2 instances at the same time. **Storage Gateway** — hybrid cloud storage extending on-premise storage to the cloud, with three offerings: **File Gateway** (extend local storage to S3), **Volume Gateway** (caches local drives to S3 for continuous backup), **Tape Gateway** (virtual tapes for cost-effective long-term backup) [`5:22:07`](https://www.youtube.com/watch?v=7HKot-brXFE&t=19327)
- **AWS Backup** — fully managed, centralizes and automates backups across services (EC2, EBS, RDS, DynamoDB, EFS, Storage Gateway) via backup plans. **CloudEndure Disaster Recovery** — continuously replicates machines to a low-cost staging area in a target account/region for fast recovery from data center failures. **Amazon FSx** — feature-rich high-performance file system: FSx for Windows File Server (SMB protocol, mount to Windows servers) and FSx for Lustre (Linux) [`5:23:05`](https://www.youtube.com/watch?v=7HKot-brXFE&t=19385)

### Demo: S3 in Practice

- Bucket types: **general purpose** (recommended for basically everything) vs **directory** (low latency, works with S3 Express One Zone) [`5:25:07`](https://www.youtube.com/watch?v=7HKot-brXFE&t=19507); a newer **account regional namespace** option adds a suffix so bucket names no longer conflict globally [`5:25:31`](https://www.youtube.com/watch?v=7HKot-brXFE&t=19531)
- **ACLs are legacy** and not recommended — use bucket policies instead. **Block Public Access** is on by default; you must explicitly remove the safeguard (and own the risk of data leaks) to make anything public [`5:26:22`](https://www.youtube.com/watch?v=7HKot-brXFE&t=19582)
- **Versioning** keeps files recoverable (an attacker must delete every version); encryption options: SSE managed by AWS, your own key managed by AWS, or dual-layer server-side encryption (bucket key now on by default) [`5:27:35`](https://www.youtube.com/watch?v=7HKot-brXFE&t=19655)
- **Object Lock** (requires versioning) prevents overwrite/delete for a fixed time or indefinitely — strong protection against data loss or account compromise [`5:27:54`](https://www.youtube.com/watch?v=7HKot-brXFE&t=19674)
- **Pre-signed URLs** share a downloadable link that expires (e.g., 5 minutes) — the standard way to share private objects [`5:31:45`](https://www.youtube.com/watch?v=7HKot-brXFE&t=19905)
- Objects have a URL but return Access Denied until a **bucket policy** allows `s3:GetObject`; the policy needs a Principal (e.g., `*` = anyone) and a Resource ARN — scoping it to a specific object is safer than allowing the whole bucket [`5:33:40`](https://www.youtube.com/watch?v=7HKot-brXFE&t=20020), demonstrated: only the whitelisted file was readable, a second upload stayed denied [`5:37:00`](https://www.youtube.com/watch?v=7HKot-brXFE&t=20220)
- **Lifecycle rules** move files between tiers over time (e.g., Standard → Glacier after a period) or permanently delete non-current versions after N days [`5:37:23`](https://www.youtube.com/watch?v=7HKot-brXFE&t=20243)
- To delete a bucket you must **empty it first** [`5:39:30`](https://www.youtube.com/watch?v=7HKot-brXFE&t=20370)

### Demo: EBS

- EBS lives under the **EC2 console** (Volumes, Snapshots, lifecycle management); snapshots are saved versions of volumes [`5:40:12`](https://www.youtube.com/watch?v=7HKot-brXFE&t=20412)
- Volumes are usually created at instance launch (Configure Storage), not separately; free tier allows up to 30 GB GP3 [`5:40:38`](https://www.youtube.com/watch?v=7HKot-brXFE&t=20438)
- GP3 vs GP2 availability varies by region/AZ; newer is better [`5:41:06`](https://www.youtube.com/watch?v=7HKot-brXFE&t=20466)
- AWS does **not encrypt EBS volumes by default** (other providers do) — encrypt at launch, because enabling it later requires snapshotting and relaunching [`5:41:34`](https://www.youtube.com/watch?v=7HKot-brXFE&t=20494); some volume types cannot be a root volume [`5:42:23`](https://www.youtube.com/watch?v=7HKot-brXFE&t=20543)

### Demo: EFS

- EFS connects multiple VMs (or even your local computer) to the same shared drive [`5:42:36`](https://www.youtube.com/watch?v=7HKot-brXFE&t=20556)
- Options: **regional vs one-zone** (one-zone for low latency), backups, lifecycle management, encryption at rest, and throughput modes — **elastic** (pay for what you use, most cost-effective) vs provisioned [`5:43:28`](https://www.youtube.com/watch?v=7HKot-brXFE&t=20608)
- EFS creates **mount targets in every availability zone** so you can mount from anywhere in the VPC; VMs must generally be in the same VPC [`5:44:37`](https://www.youtube.com/watch?v=7HKot-brXFE&t=20677); an **access point** is needed to utilize it, and the EFS mount helper greatly simplifies mounting [`5:45:48`](https://www.youtube.com/watch?v=7HKot-brXFE&t=20748)
- No volume size is chosen — it is basically serverless storage that scales (and bills) on what you use [`5:46:11`](https://www.youtube.com/watch?v=7HKot-brXFE&t=20771)
- Proof of persistence: a file created under `/mnt/efs` from one EC2 instance survived instance teardown and was readable from a brand-new instance — the file system lives independently of EC2; multiple instances can connect simultaneously [`5:49:55`](https://www.youtube.com/watch?v=7HKot-brXFE&t=20995)
- Cleanup order: delete access points first, then the file system [`5:52:03`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21123)
