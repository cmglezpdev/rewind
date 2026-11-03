# TCO and Migration

Total Cost of Ownership (TCO) when moving from on-premise to cloud, CAPEX vs OPEX, staffing impact of migration, and the AWS migration tooling: Pricing Calculator, Migration Evaluator, VM Import/Export, and Database Migration Service.

### Total Cost of Ownership (TCO)

- **TCO** = a financial estimate to help buyers/owners determine the **direct and indirect costs** of a product or service; data center examples: hardware, monitoring, installation, IT personnel, training, software, security, licensing, taxes [`11:34:26`](https://www.youtube.com/watch?v=7HKot-brXFE&t=41666)
- Creating a TCO is useful when migrating from on-premise to cloud [`11:34:49`](https://www.youtube.com/watch?v=7HKot-brXFE&t=41689)
- Gartner research case: an organization moved **2,500 VMs to Amazon EC2** — costs (baseline ~$400K) initially **went up** due to migration cost, then settled at a **55% reduction** once migration completed [`11:35:13`](https://www.youtube.com/watch?v=7HKot-brXFE&t=41713), [`11:35:44`](https://www.youtube.com/watch?v=7HKot-brXFE&t=41744)
- Iceberg model: visible costs (software license/subscription fees) look similar on-prem vs cloud; TCO means counting the **hidden costs** below the waterline [`11:36:09`](https://www.youtube.com/watch?v=7HKot-brXFE&t=41769)
  - On-premise hidden costs: implementation, configuration, training, physical security, hardware, IT personnel, maintenance; on AWS only implementation, configuration, and training remain [`11:36:30`](https://www.youtube.com/watch?v=7HKot-brXFE&t=41790)
- AWS's old TCO calculator promised **75% savings**; realistically savings vary by migration strategy (e.g., ~50% over a three-year period with an initial cost spike); after migration the eliminated cost categories become AWS's responsibility [`11:36:57`](https://www.youtube.com/watch?v=7HKot-brXFE&t=41817), [`11:37:23`](https://www.youtube.com/watch?v=7HKot-brXFE&t=41843)

### CAPEX vs OPEX

- **CAPEX (capital expenditure)**: spend money upfront on physical infrastructure, deduct from taxes over time — the on-premise model; companies often resist cloud because of these tax breaks [`11:37:23`](https://www.youtube.com/watch?v=7HKot-brXFE&t=41843)
  - CAPEX costs: servers, storage, network, backups/archives, disaster recovery, data center, technical personnel — you must **guess upfront** what you'll spend [`11:38:04`](https://www.youtube.com/watch?v=7HKot-brXFE&t=41884)
- **OPEX (operational expenditure)**: physical costs shift to the service provider; customer pays only non-physical costs — software leasing/customization, training, cloud support, billing based on usage metrics (compute, storage) [`11:38:04`](https://www.youtube.com/watch?v=7HKot-brXFE&t=41884)
  - With OPEX you can **try a product or service without investing in equipment**; CAPEX ≈ on-premise thinking, OPEX ≈ cloud/AWS thinking [`11:38:34`](https://www.youtube.com/watch?v=7HKot-brXFE&t=41914)

### Does cloud make IT personnel redundant?

- No — the answer is about shifting responsibilities [`11:39:03`](https://www.youtube.com/watch?v=7HKot-brXFE&t=41943):
  - IT personnel are needed **during the migration phase** (the Gartner report showed roughly a year of elevated effort) [`11:39:03`](https://www.youtube.com/watch?v=7HKot-brXFE&t=41943)
  - Roles can transition to cloud roles (e.g., traditional CCNA networking → cloud networking); hybrid approaches always need both traditional and cloud IT teams [`11:39:38`](https://www.youtube.com/watch?v=7HKot-brXFE&t=41978)
  - **Exam answer**: a company can change employees' activities from managing infrastructure to **revenue-generating activities** [`11:40:01`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42001)

### AWS Pricing Calculator

- Free cost-estimate tool in the browser, **no AWS account needed**, at calculator.aws; it replaced the retired TCO calculator [`11:40:39`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42039)
- Contains **100+ configurable services**; to compute TCO, compare your known existing costs against the AWS estimate; export the final estimate as **CSV** [`11:40:39`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42039), [`11:41:12`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42072)
- Demo: per-service **quick estimate** (ballpark) vs **advanced estimate** (workload details like daily traffic spikes, baseline/peak) [`11:41:42`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42102), [`11:42:04`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42124); estimates can be cloned, edited, exported, or shared via a public link [`11:43:28`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42208)

### Migration Evaluator

- Formerly **TSO Logic** (company acquired by AWS): estimates an organization's **existing on-premise costs** to compare against projected AWS costs for a planned migration [`11:44:00`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42240)
- Uses an **agentless collector** to gather data from on-premise infrastructure (works with VMware, Microsoft, SQL Server, etc.) [`11:44:00`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42240), [`11:44:38`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42278)

### VM Import/Export

- Imports virtual machines into EC2; supports VMware, Citrix, Microsoft Hyper-V, and Windows/Linux VHDs from Azure [`11:44:38`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42278)
- Flow: prepare the VM image → upload it to an **S3 bucket** → import with the **AWS CLI** → produces an **AMI** → launch EC2 from the AMI [`11:45:12`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42312), [`11:45:37`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42337)

### Database Migration Service (DMS)

- Quickly and securely migrates one database to another — e.g., on-premise database to AWS [`11:45:37`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42337)
- Architecture: source database → source endpoint → **replication instance** (an EC2 instance replicating the data) → target endpoint → target database [`11:46:03`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42363)
- Sources include: Oracle, Microsoft SQL, MySQL, MariaDB, PostgreSQL, MongoDB, SAP ASE, IBM DB2, Azure SQL Database, Amazon RDS, S3, Aurora, DocumentDB [`11:46:03`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42363); targets add Redshift, DynamoDB, OpenSearch Service, ElastiCache for Redis, Neptune, Apache Kafka — a very flexible service [`11:46:30`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42390)
- **AWS Schema Conversion Tool (SCT)**: automatically (or semi-automatically) converts a source database schema to a target schema — needed for dissimilar engines (e.g., relational → NoSQL); easy paths like MySQL → PostgreSQL don't need much, and not all source/target/version combinations are possible [`11:46:30`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42390)
- Instructor experience: DMS migrated a very large database, super fast and not hard to use — remember it for migrations [`11:47:42`](https://www.youtube.com/watch?v=7HKot-brXFE&t=42462)
