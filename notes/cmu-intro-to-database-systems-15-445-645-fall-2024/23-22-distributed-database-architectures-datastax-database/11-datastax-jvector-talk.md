# 11 — DataStax Flash Talk: Building the JVector Index (Jonathan Ellis)

## Speaker

- **Jonathan Ellis**, co-founder of DataStax; **Apache Cassandra project chair for six years**, where he grew the project and community into an open-source success. Previously built a Reed–Solomon-based object storage system for backup provider Mozy that scaled to petabytes and gigabytes/second [`1:06:55`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4015) [`1:07:35`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4055).
- Topic: how DataStax built the **vector index powering vector search in Astra (their cloud DB) and in Cassandra** [`1:07:52`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4072).

## Background: the field collapsed onto graph indexes

- Vector indexes are classified as **partition-based or graph-based**, but practically **every meaningful system today is graph-based** [`1:08:21`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4101).
- **pgvector was the exception** — it started partition-based and switched to graph because graph is **almost two orders of magnitude faster** at the same accuracy [`1:08:21`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4101).

## HNSW (2016) and its diversity heuristic

- First graph design of note. Its innovation was figuring out **how to create good edges** between vectors via a **diversity heuristic** [`1:09:03`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4143).
- **Rule**: you may not add an edge if the node it connects to is closer to an existing neighbor than it is to the target node — this avoids getting stuck in local maxima [`1:09:44`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4184).
- Effect in the example: after connecting to three nodes in the lower-left cluster, all other lower-left nodes are rejected, so the next edge goes to the far upper-right node — improving graph connectivity [`1:09:44`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4184) [`1:10:15`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4215).
- **Problem: extremely memory hungry.** Pushing HNSW past a larger-than-memory dataset produced a flame graph with "no flames, just one big hill" — dominated by `RandomAccessReader.readFloats`, i.e. reading vectors off disk for comparisons. This caps how many vectors you can insert [`1:10:15`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4215) [`1:10:56`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4256).

## DiskANN (Microsoft Research, ~3 years after HNSW)

- Splits search into a **coarse pass and an accurate pass** [`1:11:32`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4292).
- **Coarse pass**: entirely in memory over **compressed** vectors (any scheme; the paper uses product quantization — binary and scalar quantization are also seen today) [`1:11:32`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4292).
- **Reranking**: to return the closest 100, do the coarse pass for ~200 candidates, then **load full-resolution vectors from disk** for those 200 and order by exact distance [`1:12:09`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4329).
- Called "basically a free lunch" — competitive speed with dramatically less memory [`1:12:09`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4329).
- **Complexity**: coarse search is **logarithmic**; rerank is **linear in the number of coarse candidates**. Remaining flaws as commonly implemented: **poor update concurrency** and memory still **linear** in dataset size (just 32–64× smaller), which still ceilings graph size [`1:14:17`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4457) [`1:14:36`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4476).

## Product quantization (PQ), explained

1. Divide the vector into subspaces — example: a **128-dimension vector → 8 subspaces of 16 dimensions** [`1:12:38`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4358).
2. Run **k-means per subspace** to find the **256 most distinct representative vectors (centroids)** [`1:13:08`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4388).
3. Because 256 centroids fit in one byte, **each subspace becomes a single byte** — a lossy mapping to its centroid [`1:13:08`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4388).
- **Result: ~32× compression, and ~64× for most modern ML embeddings**, at high speed with little accuracy loss [`1:13:42`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4422).
- **Trade-off space**: binary quantization and FINGER are faster but lose a lot of accuracy; anisotropic quantization is more accurate but much slower. **PQ is the sweet spot** [`1:13:42`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4422) [`1:14:17`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4457).

## JVector 3 — the two fixes

### Fix 1: non-blocking, optimistic concurrency

- The index supports **inserts and reads without blocking**, using **optimistic concurrency control** [`1:14:49`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4489).
- **Pitch for Java**: developer productivity is far higher than C++, and per Cliff Click (HotSpot JIT architect), many concurrent algorithms are easy with a garbage collector and near-impossible without one [`1:15:21`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4521).
- Claimed consequence: **all C++ vector indexes use pessimistic concurrency control**, while JVector's optimistic approach gives **much higher ingest throughput** [`1:15:57`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4557).

### Fix 2: constant memory footprint via Quicker ADC

- Technique first implemented in open source by **Yahoo Japan's NGT index**; applies **"Quicker ADC" to graph indexes** [`1:15:57`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4557) [`1:16:39`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4599).
- **ADC = asymmetric distance computation**: compare an *unquantized* query vector against *quantized* stored vectors without converting either into the other's domain (conversion is a costly copy) [`1:16:39`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4599).
- Mechanism: **precompute partial distances** from the query vector to each sub-vector in the PQ codebook; a dot product then reduces to **looking up and summing partial distances** [`1:17:07`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4627) [`1:17:25`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4645).
- **New bottleneck**: memory bandwidth — the additions are trivial, but moving the table from cache/DRAM into registers is the cost [`1:17:25`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4645).
- **Solution** from three incremental papers by SIMD specialist **Fabien André**: store precomputed distances in a format that **stays in AVX-512 registers**, loaded per node from disk at search time, scoring all at once. The register-speed math **outweighs the disk-load penalty** [`1:18:02`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4682) [`1:18:23`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4703).
- **Result: memory overhead reduced to under 2 MB per index**, with no slowdown [`1:18:23`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4703).

## Conclusion and further reading

- To build a fast vector index today you need: **product quantization, reranking, highly concurrent ingest, and a constant memory footprint** [`1:18:23`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4703).
- Suggested reading: the **DiskANN paper**, **Quicker ADC**, and Google Research's **anisotropic product quantization** paper [`1:19:05`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4745).

## Q&A

- **Is 2 MB overhead good enough, or push further?** Happy with 2 MB. The **next optimization frontier is reducing disk reads** — specifically the full-resolution vector reads needed for reranking — and "I don't think anyone knows the answer to that" [`1:19:35`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4775) [`1:20:10`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4810).
- **Improving graph quality is a dead end**: lots of ideas have yielded only 1–3% situational gains. **Past a certain minimum quality, graph edges do not seem to matter much** [`1:20:10`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4810) [`1:20:44`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4844).
- **Java GC vs. C++ shared_ptr?** If shared pointers resemble Rust's automatic reference counting, the key difference is that **a real garbage collector handles cycles** — and most of the concurrent collections he works with do involve cyclical references [`1:21:17`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4877) [`1:21:32`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=4892).
