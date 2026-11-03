# 08 — Yellowbrick

Not well known, included because the engineering is extreme: "they hate the operating system as much as I do" ([`54:26`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3266)).

## Shape of the system

- A fork of **Postgres 9.5**, written in C++, retaining only the **Postgres front-end** for parsing/receiving queries; everything past that is custom code. Same pattern Yugabyte uses ([`54:26`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3266), [`54:51`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3291)).
- Started as an **on-prem appliance with FPGA acceleration** (buy a rack unit); now a cloud database service ([`54:51`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3291)).
- The control plane is **entirely Kubernetes** — no custom cluster manager — and they expose a **SQL interface for changing Kubernetes configuration** ([`54:51`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3291), [`55:24`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3324)).
- Shared-disk storage, push-based vectorized processing, **full holistic query compilation** to C++ via GCC with a compilation cache ([`55:46`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3346), [`59:08`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3548)).
- Architecture: Postgres front-end → an **asynchronous compiler service** compiling the query's C++ in the background → a scheduler distributing requests to workers that pull from S3/object store ([`56:18`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3378)).
- **Managed storage, not a lakehouse**: data must be inserted through the system. Because going through Postgres is too slow for bulk loads of gigabytes/terabytes, there is a sidecar loader that bypasses the Postgres front-end ([`56:18`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3378), [`56:43`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3403)).

## Row store + object store (student question)

- Writing directly to columnar files is expensive, especially before you have enough data to fill a large file ([`58:22`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3502)).
- So recent writes land append-only in a small **row store** buffer (log-structured, memtable-like); a background job compacts it into columnar files written to the **object store** ([`58:22`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3502), [`58:53`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3533)).

## The extreme engineering

- On boot they `malloc` as much memory as possible, allocate all threads, and **never make another syscall** — common in embedded systems, unusual for a database ([`57:04`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3424)).
- They wrote their own everything ([`57:30`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3450), [`58:02`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3482)):
  - No TCP — a custom network protocol on top of UDP.
  - Custom **NVMe/SSD drivers** instead of Linux's.
  - Custom S3 drivers instead of the Amazon SDK.
  - **Kernel bypass** so the OS never copies buffers from the NIC into user space.
- Memory: `mmap` with **anonymous huge pages** (2 MB or 1 GB instead of 4 KB) plus `mlock` to stop the OS from paging anything out — effectively disabling virtual-memory paging, "because the OS is going to try to screw you over" ([`59:36`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3576), [`1:00:13`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3613), [`1:00:50`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3650)).
  - Clarification: this is not the "mmap is bad" case. Using mmap to *manage data movement between disk and memory* is bad; using it purely to allocate pinned huge pages is fine ([`1:00:13`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3613)).
- They claim their allocator is **100× faster than malloc** — plausible, since a general allocator like jemalloc must serve any application while they know their exact allocation patterns ([`59:36`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3576)).
- Generated code targets very tight kernels so data is read from **L3 cache** — main memory is already too slow for them ([`59:08`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3548), [`59:36`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3576)).
- They use MySQL-style **LRU-K** for caching and evicting data files ([`1:00:50`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3650)).

## The verdict

- Published numbers are **better but not 10× better** — nowhere near proportional to the effort ([`1:01:10`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3670), [`1:01:37`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3697)).
- Explicit advice: **if you are a new database company, this is not the first thing to consider** ([`1:01:37`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3697)).
- Kubernetes objection answered: a container is not a VM — the process still talks directly to hardware, with no hypervisor in the path beyond whatever EC2 already imposes (Firecracker), and bare-metal EC2 removes even that ([`1:02:30`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3750), [`1:02:43`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=3763)).
