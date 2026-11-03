# Windows on AWS

AWS services and tools for running Windows workloads, a hands-on launch of a Windows Server EC2 instance over RDP, and licensing with BYOL and AWS License Manager. [`10:08:35`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36515)

### Windows workload services

- Windows Servers on EC2 — select from a number of Windows Server versions, including recent ones like Windows Server 2019 [`10:08:35`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36515)
- SQL Server on RDS — multiple SQL Server database versions available [`10:08:35`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36515)
- AWS Directory Service — run Microsoft Active Directory (AD) as a managed service [`10:08:59`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36539)
- AWS License Manager — manage software licenses from vendors such as Microsoft [`10:08:59`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36539)
- Amazon FSx for Windows File Server — fully managed scalable storage built for Windows [`10:08:59`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36539)
- AWS SDK — specifically supports .NET, a favorite language of Windows developers [`10:08:59`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36539)
- Amazon WorkSpaces — launch a Windows 10 virtual desktop: secure, durable workstations accessible from anywhere with internet [`10:09:29`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36569)
- AWS Lambda — supports PowerShell as a programming language for serverless functions [`10:09:29`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36569)
- Migration Acceleration Program (MAP) for Windows — migration methodology for large enterprises, with Amazon Partners providing professional services [`10:09:29`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36569)
- There's more, e.g., an adapter for moving SQL Server over to RDS PostgreSQL [`10:10:04`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36604)

### Follow-along: launching a Windows Server on EC2

- Microsoft Windows Server AMIs include a free-tier-eligible option running on a t2.micro — notably, Azure has no free-tier Windows server [`10:10:48`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36648)
- The default security group opens RDP so you can connect to the machine [`10:11:16`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36676)
- For Windows AMIs, a key pair is required to obtain (decrypt) the Administrator password used to log in [`10:11:37`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36697)
- Connect flow: Connect → RDP client → download the RDP shortcut (needs Windows or an RDP client; a Mac client exists in the App Store) [`10:12:00`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36720)
- Decrypt the password by uploading your key pair file, then paste the password into the RDP client [`10:12:59`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36779)
- Observations: Windows on AWS launches surprisingly fast, comes with a Windows license already applied (no activation prompt), and has outbound internet by default [`10:13:50`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36830)

### BYOL and AWS License Manager

- BYOL (Bring Your Own License) = reusing an existing software license to run vendor software on a cloud provider's compute; saves money when licenses were bought in bulk/at a discount [`10:15:21`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36921)
- Example: License Mobility from Microsoft Volume Licensing for customers with eligible server applications covered by Microsoft Software Assurance [`10:15:51`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36951)
- License Manager centrally manages licenses across AWS and on-premise; handles software licensed by virtual cores, physical cores, sockets, or number of machines — for Microsoft, IBM, SAP, Oracle, and other vendors [`10:15:51`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36951)
- Works with EC2 dedicated instances, dedicated hosts, and even spot instances; for RDS, only Oracle databases (import your Oracle license) [`10:16:25`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36985)
- EXAM TIP: for Microsoft Windows Server or Microsoft SQL Server licenses you generally need a DEDICATED HOST (because of the assurance program) — on the exam, gravitate toward dedicated hosts even though License Manager also works with dedicated/spot instances [`10:16:25`](https://www.youtube.com/watch?v=7HKot-brXFE&t=36985), [`10:16:58`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37018)
