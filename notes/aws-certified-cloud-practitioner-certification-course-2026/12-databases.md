# Databases

Covers database theory (relational vs non-relational, data warehouses, key-value and document stores) and the full AWS database catalog — DynamoDB, DocumentDB, Keyspaces, RDS, Aurora, Redshift, ElastiCache, Neptune, Timestream, QLDB, DMS — with hands-on demos of DynamoDB, RDS Postgres, and Redshift.

### Database Fundamentals

- A **database** stores semi-structured and structured data; it's a more complex data store requiring formal design and modeling techniques [`5:52:50`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21170)
- Two broad categories: **relational** (structured, tabular — tables/rows/columns, row-oriented or columnar) and **non-relational** (semi-structured, may not resemble tabular data) [`5:52:50`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21170)
- When people say "database" they usually mean a relational row-oriented store like Postgres or MySQL, queried with SQL [`5:53:18`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21198)

### Data Warehouses

- A **data warehouse** is a relational data store designed for **analytical workloads**, generally column-oriented; companies with terabytes / millions of rows need it to produce analytics reports fast [`5:53:46`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21226)
- Optimized around columns because they perform **aggregation** (grouping data — totals, averages) [`5:54:24`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21264)
- Ingest data from regular databases or incompatible sources via **ETL/ELT** [`5:54:51`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21291)
- Designed to be **"hot"** (return queries on vast data very fast) but **infrequently accessed** — not for real-time reporting; think once/twice a day or weekly business reports [`5:55:14`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21314)

### Key-Value and Document Stores

- A **key-value store** is a NoSQL database using a simple key→value method: "dumb and fast", generally lacking relationships, indexes, and aggregation [`5:55:41`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21341)
- The value is just bytes; a key-value store commonly stores an associative array (that's how DynamoDB does it), which is why it *looks* like a table but is **schemaless** — rows can have different numbers of columns [`5:56:30`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21390)
- This design lets key-value stores **scale far beyond relational databases** [`5:56:58`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21418)
- A **document store** is a NoSQL database whose primary structure is documents (XML, JSON, or JSON-like); document stores are **subclasses of key-value stores** [`5:57:26`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21446)
- Terminology mapping — relational → document: tables → collections, rows → documents, columns → fields, joins → embedding and linking [`5:58:03`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21483)

### NoSQL Services on AWS

- **DynamoDB** — serverless NoSQL key-value and document database; scales to billions of records with guaranteed consistent data; no shard management; it's **AWS's flagship database** — think DynamoDB whenever you need a massively scalable, cost-effective, very fast database (exam tip) [`5:58:27`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21507)
- Testimonial: in 2019 Amazon retail shut down its last Oracle database — migrating 7,500 Oracle databases holding 75 PB to DynamoDB, cutting cost 60% and latency 40% [`5:58:59`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21539)
- **DocumentDB** — NoSQL document database that is **MongoDB-compatible** (AWS built its own due to MongoDB open-source licensing issues) [`5:59:37`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21577)
- **Amazon Keyspaces** — fully managed **Apache Cassandra** (open-source NoSQL columnar key-value database similar to DynamoDB) [`5:59:57`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21597)

### Relational Services: RDS & Aurora

- **RDS** supports multiple SQL engines; relational is synonymous with SQL and **OLTP (online transactional processing)**; relational DBs are the most commonly used type among tech companies and startups [`6:00:21`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21621)
- Engines: **MySQL** (most popular open-source SQL DB, now Oracle-owned; the original creators forked it as **MariaDB** to keep a free alternative) [`6:00:49`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21649), **PostgreSQL** (most popular among developers, richer features at added complexity), **Oracle** (proprietary, license required, enterprise), **Microsoft SQL Server** (proprietary, license required) [`6:01:18`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21678)
- **Aurora** — fully managed database powered by RDS: MySQL-compatible at **5x speed** or Postgres-compatible at **3x speed**; use it when you want a highly available, durable, scalable, secure relational DB [`6:02:09`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21729)
- **Aurora Serverless** — on-demand Aurora: trades cold starts for cost when traffic is low. **RDS on VMware** — deploy RDS-supported engines to on-premise data centers (must use VMware virtualization) [`6:02:09`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21729)

### Other Database Services

| Service | Type | When to use |
|---|---|---|
| **Redshift** | Petabyte-size data warehouse (OLAP); expensive because data is kept hot | Quickly generate analytics/reports from large data [`6:03:10`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21790) |
| **ElastiCache** | Managed in-memory/caching DB (Redis, Memcached) | Add a caching layer in front of web servers or DB [`6:03:32`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21812) |
| **Neptune** | Managed graph database (interconnected nodes; Gremlin interface) | Understand connections in data — fraud rings, social relationships [`6:03:58`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21838) |
| **Timestream** | Fully managed time-series DB | Measure how things change over time (e.g., IoT devices) [`6:03:58`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21838) |
| **QLDB** (Quantum Ledger Database) | Fully managed ledger with transparent, immutable, cryptographically verifiable transaction logs | Trusted history of financial activity [`6:04:25`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21865) |
| **DMS** (Database Migration Service) | Migration service, not a database | On-premise → AWS, between accounts/engines, or SQL → NoSQL [`6:04:25`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21865) |

### Demo: DynamoDB

- Creating a table requires a **partition key** (sort key optional — e.g., email string + created-at date); date handling requires strategy since there's no native date format [`6:05:00`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21900)
- Capacity: **on-demand** (truly serverless — pay exactly for what you use) vs **provisioned** (guaranteed throughput with min/max reads and writes); table classes: standard vs infrequent access; encryption on by default [`6:05:55`](https://www.youtube.com/watch?v=7HKot-brXFE&t=21955)
- Items don't have to follow the same schema — each item can carry arbitrary attributes (demonstrated with a "tire count" on one item only) [`6:07:08`](https://www.youtube.com/watch?v=7HKot-brXFE&t=22028)
- **PartiQL** lets you query DynamoDB with SQL-like statements from the console; gotcha: string literals need **single quotes**, not double [`6:10:09`](https://www.youtube.com/watch?v=7HKot-brXFE&t=22209)

### Demo: RDS (Postgres)

- Free tier launches in a **single availability zone**; the DB identifier cannot be changed later; latest engine recommended [`6:12:00`](https://www.youtube.com/watch?v=7HKot-brXFE&t=22320)
- AWS-managed credentials cost $1 — self-managed password avoids it [`6:14:57`](https://www.youtube.com/watch?v=7HKot-brXFE&t=22497)
- "Connect to an EC2 compute resource" auto-configures VPC subnets and access settings; VPC cannot be changed after creation; Postgres port is **5432**; RDS Proxy is for connection pooling (e.g., with Lambda) [`6:15:38`](https://www.youtube.com/watch?v=7HKot-brXFE&t=22538)
- Best practice: don't make the database public-facing — connect through an instance (e.g., your web server) [`6:20:34`](https://www.youtube.com/watch?v=7HKot-brXFE&t=22834)
- Connected via `psql` from EC2 (RDS console now provides connection snippets), created a table, inserted, and queried [`6:18:50`](https://www.youtube.com/watch?v=7HKot-brXFE&t=22730)

### Demo: Redshift

- Redshift is a data warehouse and generally really expensive — not a day-to-day launch [`6:21:39`](https://www.youtube.com/watch?v=7HKot-brXFE&t=22899)
- Free trial available if your organization never created a cluster (delete the cluster when the trial ends to avoid on-demand charges); demo launched a DC2.large with 2 vCPUs and ~160 GB storage [`6:22:03`](https://www.youtube.com/watch?v=7HKot-brXFE&t=22923)
- Sample "tickit" dataset (7 tables) can be auto-loaded and queried from the browser with **Query Editor v2** — no more JDBC/ODBC driver downloads; results can even be charted in the console [`6:23:23`](https://www.youtube.com/watch?v=7HKot-brXFE&t=23003)
- Cleanup reminder: Redshift is super expensive — verify the cluster actually deletes [`6:28:04`](https://www.youtube.com/watch?v=7HKot-brXFE&t=23284)
