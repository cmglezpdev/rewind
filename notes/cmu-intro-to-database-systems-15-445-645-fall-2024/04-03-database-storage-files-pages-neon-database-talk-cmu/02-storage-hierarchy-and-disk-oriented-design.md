# 02 - Storage Hierarchy and Disk-Oriented Design

## Disk-oriented DBMS defined

- The whole semester assumes a **disk-based / disk-oriented DBMS**: the primary storage location of the database is non-volatile disk ([`4:54`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=294)).
- The system's core job is orchestrating movement of data between non-volatile storage and memory — a classic von Neumann setup: you cannot operate on data on disk, you must bring it into memory for the CPU ([`5:17`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=317)).
- The hard follow-up question, deferred to later lectures: once written in memory, how do you guarantee it lands safely on disk ([`5:46`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=346))?

## The storage hierarchy

- Top (fastest, smallest) to bottom (slowest, largest): CPU registers → CPU caches → DRAM → SSD → spinning hard disk → network storage (distributed FS, Amazon S3) ([`6:12`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=372), [`6:30`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=390)).
- What matters is not the hierarchy itself but how speed and capacity change along it — that dictates which algorithms and data structures to use at each level ([`6:51`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=411)).
- Registers number a couple dozen; S3 is effectively infinite (your credit card runs out before the storage does) ([`7:11`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=431)).

### The dividing line

| Above the line | Below the line |
| --- | --- |
| Volatile — lost on power loss (DRAM holds charge ~30 s per studies) ([`7:36`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=456), [`7:53`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=473)) | Non-volatile — data survives power loss, though hardware sometimes lies ([`7:53`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=473), [`8:17`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=497)) |
| Byte-addressable — jump to any offset ([`8:17`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=497), [`8:36`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=516)) | Block-addressable — must fetch a whole block, typically 4 KB, even for 64 bits ([`8:56`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=536)) |

- Course vocabulary: **memory** = DRAM (CPU caches ignored); **disk** = anything below the line, whether SSD, HDD, or S3 ([`9:32`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=572), [`9:45`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=585)).

## Where the lines blur (modern hardware)

- **Fast network storage**: not local, but quickly accessible and possibly durable ([`9:58`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=598)); networks are outpacing CPUs ([`10:12`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=612)).
- **Persistent memory (Intel Optane)**: sat in a DIMM slot like DRAM but retained data on power loss; slower than DRAM, needed flushing, and could wear out. Intel's new CEO killed it in 2022 ([`10:12`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=612), [`10:34`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=634), [`11:00`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=660)).
  - Had it succeeded, much of the buffer-manager material would be unnecessary — systems would access persistent memory directly instead of shuffling pages ([`10:49`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=649), [`11:17`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=677)).
- **CXL type 3**: byte-addressable memory that need not reside on the physical machine. Samsung sells PCIe devices; it can extend over the network as *disaggregated memory*. No database system fully exploits it yet ([`11:17`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=677), [`11:33`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=693), [`11:48`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=708), [`12:10`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=730)).
- Working assumption for the course: memory is byte-addressable and fast, disk is block-addressable and slow ([`12:10`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=730)).

## Latency intuition

- The classic latency table (Jeff Dean's version; Jim Gray had one in the 1990s) exists so designers know what device they are talking to before picking algorithms ([`12:36`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=756)).
- L1 cache reference ≈ 1 ns; reading tape archives ≈ 1 billion ns. Tape archives (Amazon Glacier, physical tape) exist but nobody runs a DBMS off them ([`13:02`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=782)).
- Jim Gray's trick: rescale 1 ns → 1 second and the orders-of-magnitude gaps become obvious ([`13:23`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=803)).
- Book analogy: L1 cache = reading the book on the table; DRAM = walking to the library; tape = flying to Pluto to read one page ([`13:48`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=828), [`14:06`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=846)).
- Conclusion: keep as much as possible in DRAM, but accept that disk reads are unavoidable ([`13:23`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=803), [`14:06`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=846)).
