# 08 — Dynamic hashing: linear hashing

## Where it is used

- **This is what PostgreSQL implements**, called `dynahash` in the source code [`1:02:28`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3748).
- Origin story: written by a Berkeley PhD student who put it into PostgreSQL, then founded **Sleepycat Software**, whose **Berkeley DB** used the same hash table design. Oracle later bought Sleepycat and owns it now [`1:02:28`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3748) [`1:02:55`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3775).

## The split pointer — the defining difference

| Scheme | What gets split on overflow |
|---|---|
| Extendible hashing | **The bucket that overflowed**, and only that one [`1:02:55`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3775) |
| Linear hashing | **Whatever the split pointer currently points at**, which is usually *not* the overflowing bucket [`1:03:23`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3803) |

- The overflowing bucket simply gets a new bucket appended to its chain, as in chained hashing [`1:05:17`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3917).
- The split pointer advances by one after each split; over time it visits every bucket, so **eventually everything balances out** [`1:03:23`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3803) [`1:03:44`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3824) [`1:07:13`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=4033).
- What counts as "overflow" is system-defined — running out of space in a page, or exceeding some chain length [`1:03:44`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3824).

## Two hash functions

- `h1(key) = hash(key) mod N`, where **N is the bucket count at table creation** (4 in the worked example) [`1:04:44`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3884).
- `h2(key) = hash(key) mod 2N` — used for buckets that have already been split [`1:05:56`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3956).
- Which one to use depends on the slot's position **relative to the split pointer**: buckets already passed by the pointer need the second function; buckets not yet split use the first [`1:05:56`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3956) [`1:07:13`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=4033).
- When the split pointer passes the original N, it **wraps back to the start** and the cycle repeats [`1:06:26`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3986).

## Worked example (N = 4)

- `get(6)`: `6 mod 4 = 2`; follow that chain — identical to plain chained hashing [`1:05:03`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3903).
- `put(17)`: `17 mod 4 = 1`; that bucket is full, so append an overflow bucket and insert 17. **Then** trigger a split of whatever the pointer targets — bucket 0, even though it still has free space: "this is just how the algorithm works" [`1:05:17`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3917) [`1:05:36`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=3936).
- The split adds slot 4 and rehashes bucket 0's contents with `mod 8`: `8 mod 8 = 0` stays put; `20 mod 8 = 4` moves to the new bucket [`1:06:41`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=4001).
- Afterwards the split pointer advances by one. A later `get(20)` computes `20 mod 4 = 0`, sees that slot 0 sits on the already-split side, rehashes with `mod 8` to get 4, and finds the key [`1:07:13`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=4033).
- `get(9)`: `9 mod 4 = 1`, which is exactly where the split pointer sits — not yet split — so only the first hash function is needed [`1:07:55`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=4075).

## Deletes

- If deleting an entry empties a bucket that lies **below the split pointer**, the bucket can be freed and the split pointer moved back up — a purely localized operation [`1:08:29`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=4109) [`1:08:49`](https://www.youtube.com/watch?v=VkP_yLM5KBU&t=4129).
