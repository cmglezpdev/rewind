# ML, AI and Big Data

Catalog of AWS machine learning, AI, generative AI, and big data/analytics services, plus supporting context: ML frameworks, hardware (Intel, GPUs, CUDA), and hands-on looks at QuickSight, Athena, and Glue.

### AI vs ML vs Deep Learning

- **AI (Artificial Intelligence)**: machines that perform jobs that mimic human behavior [`10:31:10`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37870)
- **ML (Machine Learning)**: machines that get better at a task without explicit programming [`10:31:10`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37870)
- **DL (Deep Learning)**: machines using artificial neural networks inspired by the human brain to solve complex problems [`10:31:10`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37870)
- Often shown as an "onion": AI ⊃ ML ⊃ DL (deep learning is ML using neural networks) [`10:31:37`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37897)

### Amazon SageMaker (flagship ML service)

- Fully managed service to **build, train, and deploy ML models at scale**; supports open-source frameworks like Apache MXNet (AWS-backed), TensorFlow, PyTorch, Hugging Face [`10:31:37`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37897)
- **SageMaker Ground Truth**: data labeling service — humans label datasets used to train ML models [`10:31:37`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37897)
- **Amazon Augmented AI (A2I)**: human intervention review — when a SageMaker prediction has low confidence, it's queued for human review [`10:32:29`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37949)

### AI/ML services catalog

- **Amazon CodeGuru**: ML code analysis — performs code reviews, suggests code quality improvements, visual code profiles for performance [`10:32:56`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37976)
- **Amazon Lex**: conversational interface service — build voice and text chatbots [`10:32:56`](https://www.youtube.com/watch?v=7HKot-brXFE&t=37976)
- **Amazon Personalize**: real-time recommendation service — same tech behind Amazon.com product recommendations [`10:33:26`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38006)
- **Amazon Polly**: text-to-speech — upload text, get an audio file with a synthesized voice [`10:33:26`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38006)
- **Amazon Rekognition**: image and video recognition — detect and label objects, people, celebrities [`10:33:26`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38006)
- **Amazon Transcribe**: speech-to-text — upload audio, get text [`10:33:57`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38037)
- **Amazon Textract**: OCR — extracts text from scanned documents/paper forms [`10:33:57`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38037)
- **Amazon Translate**: neural machine translation using deep learning for more accurate, natural translations [`10:33:57`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38037)
- **Amazon Comprehend**: NLP service — finds relationships in text (customer emails, support tickets, social media) to produce insights and predictions [`10:34:28`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38068)
- **Amazon Forecast**: time-series forecasting — predicts business outcomes like product demand, resource needs, financial performance [`10:34:28`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38068)
- **AWS Deep Learning AMIs**: EC2 images pre-installed with frameworks (TensorFlow, PyTorch, MXNet, Chainer, Gluon, Horovod, Keras) [`10:34:58`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38098)
- **AWS Deep Learning Containers**: Docker images pre-installed with the same frameworks [`10:34:58`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38098)
- **AWS DeepComposer** (ML musical keyboard), **DeepLens** (deep learning video camera), **DeepRacer** (ML-powered toy race car, raced at re:Invent) — all learning tools [`10:35:31`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38131)
- **Amazon Elastic Inference**: attach low-cost GPU-powered acceleration to EC2 instances — reduces deep learning inference cost by **75%** [`10:35:31`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38131)
- **Amazon Fraud Detector**: fully managed fraud detection — identifies online payment fraud and fake account creation [`10:36:01`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38161)
- **Amazon Kendra**: enterprise ML search engine — natural-language answers instead of simple keyword matching [`10:36:27`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38187)

### Generative AI services (newer)

- **Generative AI**: AI capable of generating new content — text, images, music, other media (e.g., Midjourney: prompt in, image out) [`10:53:47`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39227)
- **Amazon Bedrock**: cloud service using large language models to generate text and image responses — "If you know what ChatGPT is, you know what Bedrock is" [`10:51:28`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39088)
- **Amazon CodeWhisperer**: AI code generator, equivalent to GitHub Copilot [`10:51:28`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39088)
- **Amazon DevOps Guru**: ML analysis of operational data/metrics/events to detect operational abnormalities [`10:51:50`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39110)
- **Amazon Lookout** (3 offerings: Equipment, Metrics, Vision): quality control / automated inspections and anomaly detection [`10:52:19`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39139)
- **Amazon Monitron**: predicts unplanned equipment downtime using IoT sensors capturing vibration/sensor data [`10:52:51`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39171)
- **AWS Neuron**: SDK to run deep learning workloads on AWS Inferentia and Trainium (ML acceleration hardware) [`10:52:51`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39171)
- Exam tip: Bedrock and CodeWhisperer are the ones most likely to appear on future exams [`10:53:24`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39204)

### Big data and analytics services

- **Big data**: massive volumes of structured/unstructured data too large to move and process with traditional database and software techniques [`10:36:27`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38187)
- **Amazon Athena**: serverless interactive query service — run SQL queries over CSV/JSON files in S3 (loaded into a temporary SQL table); based on Apache Presto [`10:36:52`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38212)
- **Amazon CloudSearch**: fully managed full-text search — add search to your website [`10:36:52`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38212)
- **Amazon Elasticsearch (ES)**: managed Elasticsearch cluster — more robust than CloudSearch but requires more server/operational maintenance [`10:37:21`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38241)
- **Amazon EMR (Elastic MapReduce)**: data processing and analysis — like Redshift for reports but better suited to transforming unstructured data into structured data on the fly; uses open source (Spark, Hive, Pig) [`10:37:21`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38241)
- **Kinesis Data Streams**: real-time streaming data — producers send data to a stream, multiple consumers read it (real-time analytics, click streams, IoT fleet ingestion) [`10:37:56`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38276)
- **Kinesis Firehose**: serverless, simpler version of a data stream — pay on demand per data consumed, no servers to manage [`10:38:14`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38294)
- **Kinesis Data Analytics**: run queries against data flowing through a real-time stream — reports on emerging data [`10:38:14`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38294)
- **Kinesis Video Streams**: analyze/process real-time streaming video [`10:38:40`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38320)
- **MSK (Managed Streaming for Kafka)**: fully managed Apache Kafka — real-time streaming data pipelines; similar to Kinesis but more robust [`10:38:40`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38320)
- **Redshift**: petabyte-size data warehouse for **OLAP** (online analytical processing) — keeps data "hot" (expensive) so complex queries over large data return fast; for quickly generating analytics/reports [`10:39:11`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38351)
- **Amazon QuickSight**: business intelligence (BI) dashboard — AWS equivalent of Tableau or Power BI; little/no programming, connects to many databases [`10:39:38`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38378)
- **AWS Data Pipeline**: automates the movement of data between compute, storage, and services [`10:39:38`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38378)
- **AWS Glue**: ETL service — move data with transformations before the final destination; similar to DMS but more robust [`10:40:00`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38400)
- **AWS Lake Formation**: data lake — centralized, curated, secured repository holding vast raw data in native format until needed [`10:40:00`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38400)
- **AWS Data Exchange**: catalog of third-party datasets (free, subscribe, or purchase) — e.g., COVID-19 foot traffic, IMDb, historical weather [`10:40:47`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38447)

### Amazon QuickSight (detail + demo)

- BI dashboard that ingests data from various AWS storage/database services with minimal programming; speed comes from **SPICE** — Super-fast Parallel In-memory Calculation Engine (optional but recommended) [`10:40:47`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38447)
- Caveat: some data stores can't be ingested directly — dump to S3 first, optionally transform with Glue [`10:41:13`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38473)
- **QuickSight ML Insights**: anomaly detection, forecasting, natural-language narratives (auto-written business reports) [`10:41:37`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38497)
- **QuickSight Q**: ask questions in natural language over all your data, answers in seconds [`10:41:37`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38497)
- Demo: separate sign-up (Standard vs Enterprise editions), integrates with Athena/S3/RDS [`10:42:00`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38520); you can upload CSV/XLS files directly without S3 and drag fields to build bar/pie charts [`10:45:40`](https://www.youtube.com/watch?v=7HKot-brXFE&t=38740); to stop being billed you must delete the QuickSight account from account settings [`10:50:38`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39038)

### ML / DL frameworks

- **Apache MXNet**: the framework AWS adopted and markets heavily; in practice not pleasant to use [`10:55:02`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39302) — deep learning framework supporting many programming languages; scalable, flexible, portable; strong support in SageMaker and ML containers [`10:58:12`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39492); two high-level interfaces: **Gluon** (imperative) and **Module API** (symbolic) [`10:58:38`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39518)
- **PyTorch**: created by Facebook; optimized for deep learning on GPU and CPU; well supported by all major providers [`10:55:29`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39329)
- **TensorFlow**: made by Google, which built optimized hardware for it — the **TPU** (Tensor Processing Unit) [`10:56:00`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39360)
- **Keras**: high-level framework built on top of TensorFlow, created to match PyTorch's ease of use [`10:56:28`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39388)
- **Apache Spark**: unified analytics engine for large-scale data processing, with ML offering **Spark ML** [`10:56:28`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39388)
- **Chainer**: deep learning framework supporting CUDA; **Hugging Face**: not a framework — a way to access many models/datasets online; strong AWS partnership [`10:56:57`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39417)
- Exam tip: MXNet itself won't appear on the exam, but knowing it gives good AWS/ML context [`10:59:32`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39572)

### Hardware: Intel, instruction sets, GPUs, CUDA

- **Intel**: one of the world's largest semiconductor makers; inventor of the **x86 instruction set** (Intel 8086 chip, 1978) [`11:00:02`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39602)
- When launching EC2 you choose the architecture: **x86 or ARM**; ARM has fewer instructions, so generally better power efficiency → better performance/cost — run ARM when your software supports it [`11:00:58`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39658), [`11:01:24`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39684)
- **Intel Xeon Scalable processors**: high-performance CPUs for enterprise/server use, common in AWS instances, good for ML [`11:02:19`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39739)
- **Intel Habana Gaudi**: processor specialized for AI training (direct competitor to Nvidia), with its own SDK **SynapseAI**, usable via SageMaker [`11:02:52`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39772)
- **GPUs**: specialized to render high-resolution images/video concurrently; parallel operations make them ideal for ML and scientific computation [`11:03:54`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39834) — CPUs average 4–16 cores; GPUs can have thousands (up to ~40,000 cores across 48 GPUs); best for repetitive highly parallel tasks: graphics rendering, crypto mining, deep learning [`11:04:51`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39891)
- **Nvidia CUDA** (Compute Unified Device Architecture): parallel computing platform/API allowing CUDA-enabled GPUs to be used for general-purpose computing (GPGPU) [`11:05:48`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39948)
- AWS instances with Nvidia GPUs: P3 (Tesla V100), G3 (Tesla M60), G4 (T4), P4 (Tesla A100) [`11:06:27`](https://www.youtube.com/watch?v=7HKot-brXFE&t=39987); all major deep learning frameworks are integrated with Nvidia's Deep Learning SDK (e.g., cuDNN library) [`11:06:58`](https://www.youtube.com/watch?v=7HKot-brXFE&t=40018)

### Amazon Athena (deep dive)

- Interactive query service to analyze data directly from S3 — the bucket is your dataset; based on a fork of the open-source distributed query engine Apache Presto [`11:08:20`](https://www.youtube.com/watch?v=7HKot-brXFE&t=40100)
- Two modes: **Athena SQL** (SQL queries over S3, uses Trino — a Presto fork; accessed via console, JDBC/ODBC drivers, CLI or SDK) [`11:08:53`](https://www.youtube.com/watch?v=7HKot-brXFE&t=40133) and **Apache Spark on Athena** (interactive data analytics in Jupyter-compatible notebooks) [`11:09:38`](https://www.youtube.com/watch?v=7HKot-brXFE&t=40178)
- Serverless — pay only for what you use; integrates with CloudFront, CloudTrail, DataZone, ELB, EMR, Glue Data Catalog, IAM, QuickSight, S3 Inventory, Step Functions, Systems Manager Inventory, VPC [`11:10:05`](https://www.youtube.com/watch?v=7HKot-brXFE&t=40205)
- Exam tip: knowing Athena's service integrations (what connects to it, where it dumps data) has mattered on exams like the security certification [`11:10:05`](https://www.youtube.com/watch?v=7HKot-brXFE&t=40205)

### AWS Glue (deep dive)

- Serverless data integration service to discover, prepare, move, and integrate data from multiple sources — much improved since launch and worth knowing "inside and out" [`11:10:46`](https://www.youtube.com/watch?v=7HKot-brXFE&t=40246)
- Use cases: analytics, ML, application development; connects to **70+ data sources**; centralized data catalog; visually create/run/monitor ETLs into data lakes [`11:11:17`](https://www.youtube.com/watch?v=7HKot-brXFE&t=40277)
- Catalog data is immediately searchable/queryable via Athena; strong integrations with EMR and Redshift Spectrum; does data discovery, modern ETL/ELT, cleansing, transforming, centralized cataloging [`11:12:03`](https://www.youtube.com/watch?v=7HKot-brXFE&t=40323)
