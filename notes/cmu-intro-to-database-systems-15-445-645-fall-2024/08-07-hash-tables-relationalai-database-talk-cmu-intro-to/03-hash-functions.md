# 03 — Hash functions

## Requirements

- Takes an arbitrary byte-array key, returns a fixed-length integer, usually **32 or 64 bits** [`21:33`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=1293) [`21:51`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=1311).
- Wanted: **fast** and **low collision rate**.
- **Not** wanted: cryptographic properties. SHA-256 / SHA-1 are explicitly rejected as too expensive [`21:51`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=1311).
- Rationale: the hash table is internal, operating on data the user already entrusted to the DBMS — "you don't build a hash table and show it to everyone," so nothing leaks [`22:18`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=1338) [`22:35`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=1355).

## Don't write your own

- Nearly all modern DBMSs use an off-the-shelf hash function; **PostgreSQL rolls its own for historical reasons** and is the exception [`22:35`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=1355).
- **MurmurHash** (~2008) is presented as the first of the modern speed-focused generation; Google, Facebook and others then built their own variants [`22:54`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=1374).
- **State of the art recommendation: XXHash** (Facebook), by the author of the Zstandard compression algorithm, now at version 3 with several flavors — "the one you're going to want to use in general" [`22:54`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=1374) [`24:19`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=1459).

## How to pick one yourself: SMHasher

- **SMHasher** ("Smasher") is a GitHub micro-benchmark, written by the MurmurHash author, that runs every publicly available hash function through a torture test and measures collision rate and speed [`23:36`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=1416).
- Ranking as of the lecture: **RabbitHash fastest**, **XXH3 (`xxh3low`) second fastest** [`23:36`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=1416).

## Takeaway

> "That's all you need to know about hash functions: use something that already exists." The interesting engineering is in the data structure, not the function [`24:19`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=1459).
