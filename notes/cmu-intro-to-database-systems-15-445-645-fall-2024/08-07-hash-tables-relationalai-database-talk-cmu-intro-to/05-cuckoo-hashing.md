# 05 — Static hashing: cuckoo hashing

## Core idea

- Instead of scanning sequentially for a free slot, use **multiple hash functions**. Hash the key with each one, landing in several candidate slots, and use those to find a free slot or the key [`46:01`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=2761) [`46:20`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=2780).
- If all candidate slots are occupied on insert, **evict** an existing key ("clock it over the head, take its slot, kick it out of its house") and re-insert the evicted key using its other hash function — possibly cascading [`46:20`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=2780) [`49:15`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=2955).

## The trade-off it makes

| Operation | Cost |
|---|---|
| Lookup | **Guaranteed O(1)** — a fixed number of hashes, never a scan [`46:20`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=2780) |
| Delete | **Guaranteed O(1)** [`46:20`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=2780) |
| Insert | **Expensive** — may bounce keys in and out until everything settles [`47:02`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=2822) [`51:14`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3074) |

Explicitly framed as "no free lunch": inserts get slower so lookups get faster [`51:14`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3074).

## Mechanics and details

- The default in the reference implementation is **three** hash functions; any number works, trading hash-computation cost against slot options [`47:02`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=2822).
- Hashes can be computed **serially or in parallel** — check the first, stop if free — it doesn't change correctness [`48:27`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=2907) [`50:02`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3002).
- **Do not store which hash function placed a key.** With a billion entries, the extra bytes per entry aren't worth it — just recompute both hashes and see which slot the key came from [`49:15`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=2955) [`50:02`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3002) [`50:27`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3027).

## Failure mode: infinite eviction cycles

- Eviction can cycle forever when every candidate slot is occupied by keys that displace each other [`50:44`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3044).
- Detection: **remember the slot where you started**; seeing it again means you are looping [`51:14`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3074).
- Recovery: **double the table size and rebuild** [`50:44`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3044).

## Real-world implementations

- **IBM DB2 BLU**, an accelerator for DB2, is the only DBMS the lecturer knows to use cuckoo hashing (documented in its paper) [`47:02`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=2822).
- The **best open-source cuckoo hash table came out of CMU (Dave Andersen's group)**, written by an undergrad nearly a decade ago and still maintained — last commit three weeks before the lecture. Reportedly used widely inside Google [`47:02`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=2822).
