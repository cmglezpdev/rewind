# 03 — Why Not `mmap`

## The tempting shortcut

- What the buffer pool does — map page IDs to arbitrary memory locations and fake having more memory than you have — is exactly **virtual memory** ([`19:46`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1186), [`20:08`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1208)).
- `mmap` maps a file's contents into your process's address space lazily: you get a start and end region, and touching an unmapped page triggers a **page fault** that the OS services by reading the page in ([`20:08`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1208), [`20:37`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1237), [`21:01`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1261)).
- When physical memory runs out, the OS picks a victim itself and **stalls / deschedules your thread** while it swaps — deliberately transparent, so you cannot see it coming ([`21:18`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1278), [`22:01`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1321)).

## Four reasons it "murders your database system"

### 1. Uncontrolled flushing of dirty pages

- The OS can flush **any** dirty page at **any** time ([`23:01`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1381)).
- Breaks atomicity: an update touching several pages needs all changes written out atomically, but hardware can only write ~4 KB atomically. If the OS starts flushing mid-operation and you crash, you cannot tell what it actually wrote ([`23:01`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1381), [`23:56`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1436)).

### 2. Unpredictable stalls

- You cannot inspect the OS page table, so you never know what is resident; any memory touch may stall ([`23:56`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1436)).
- The workaround — a separate thread that "tickles" pages ahead of time — requires building most of a buffer pool manager anyway, **and** you cannot know which pages to tickle before running the query ([`23:56`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1436), [`24:42`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1482)).

### 3. Error handling becomes a `SIGBUS` interrupt, everywhere

- Failures arrive as interrupts, not return codes, so the interrupt handler must be duplicated across every place in the system that touches mmap-backed memory ([`24:53`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1493), [`25:11`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1511), [`26:28`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1588)).
- With `read`/`write` through libc/POSIX you get an errno at **one** place — the disk scheduler — so the "blast radius" of an I/O error is confined to the code doing I/O ([`25:26`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1526), [`26:59`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1619), [`27:20`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1640)).
- (The lecture flags that errno itself "will lie to you sometimes" — see the `fsync` story in topic 06.)

### 4. Performance

- The OS maintains its own page table protected by mutexes — the libc futex, when better implementations exist ([`25:51`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1551)).
- Every contention reduction and smart eviction decision you could make is thrown away because the OS does everything for you ([`25:51`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1551), [`26:28`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1588)).

## Partial escape hatches (and why they do not help)

| Call | What it does | Why it is not enough |
|---|---|---|
| `madvise` | Hints the OS about sequential vs random access ([`27:38`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1658)) | Still a hint; core I/O decisions stay with the OS |
| `mlock` | Pins memory ranges so they cannot be **paged out** ([`27:38`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1658)) | Does **not** prevent the OS from flushing dirty pages |
| `msync` | Flushes memory ranges to disk, the `fsync` equivalent ([`28:12`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1692)) | Contorting mmap this far just rebuilds a worse buffer pool manager ([`28:12`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1692)) |

## Evidence from real systems

- The migration pattern is common enough that the group wrote papers about it — systems split into "full mmap users" and "started full, went partial, then dropped it" ([`28:40`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1720)).
- **MongoDB** is the cautionary tale: originally built entirely on mmap, with funding, customers and top engineers — and still threw away the mmap engine for **WiredTiger**, a buffer-pool-manager-based engine. "If MongoDB couldn't figure it out, what hope does a random startup have?" ([`29:38`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1778)).
- **Weaviate** started on mmap, realized it was a bad idea, and removed it (confirmed to the lecturer that same day); some remnants remain ([`28:40`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1720), [`29:19`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1759), [`30:31`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1831)).
- **SQLite** has mmap for portability reasons, off by default ([`29:38`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1778)).
- **Elasticsearch** and read-mostly systems may get away with it, since the write-safety issues do not bite ([`30:31`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1831)).
- **LMDB** is the polar opposite position — its author advocates mmap for everything and emails other DBMS teams telling them they are wrong ([`30:31`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1831)).
- Cloud angle: mmap hides resource usage, hurting observability of performance/resource consumption ([`29:38`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1778)).
- Reference material: the paper *"Are You Sure You Want to Use MMAP in Your Database Management System?"* plus a short companion YouTube video where someone buys an mmap buffer pool manager from a shady guy on the street and his database falls apart ([`31:35`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1895)).

## The thesis

> The DBMS always knows more than the OS — what queries want, what has been modified, what is coming next — so it can always make the better decision. The OS is needed to survive, but should not be relied on for anything, especially memory management ([`31:08`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1868), [`31:35`](https://www.youtube.com/watch?v=aoewwZwVmv4&t=1895)).
