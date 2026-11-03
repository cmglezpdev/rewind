# 13 — Write-optimized B+Trees (Bε / fractal trees)

## The problem

Incremental B+Tree maintenance is expensive: splits and merges, and in the worst case a **single insert forces rebalancing the whole tree** [`1:16:12`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4572).

## The idea

**Absorb updates in a buffer and apply them in batches only when forced.** [`1:16:12`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4572)

- Names: **write-optimized B+Tree**, **fractal tree** (Wikipedia's term), **Bε tree**; invented by a researcher out of Stony Brook [`1:16:37`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4597).
- Same log-structured pattern as the **LSM tree** covered earlier, and as **MySQL's compression scheme**, which put a mod log in front of every page so inserts didn't require decompressing everything. Log-structuring recurs everywhere in a DBMS [`1:16:37`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4597).

## Mechanics

Every node carries a **mod log** [`1:16:37`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4597):

1. **Insert** → write the entry into the mod log if there is space. No traversal to the leaf. Fast, like appending to an LSM log [`1:16:37`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4597) [`1:17:37`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4657).
2. **Delete** → also just a mod-log entry; the key stays physically present at the leaf but is **logically deleted** [`1:17:37`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4657) [`1:18:20`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4700).
3. **Lookup** → check the mod log at each node from the root down; if the key's fate is recorded there, stop immediately, otherwise continue the normal descent [`1:17:58`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4678) [`1:18:20`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4700).
4. **Mod log full** → push its entries **down one level**, routing each entry left or right by its key; they get absorbed by the child's mod log, recursively cascading if that one is full too. This cascading is why it's called a *fractal* tree [`1:18:34`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4714).
5. **At the leaf** → the buffered inserts/deletes are finally applied, and normal B+Tree rebalancing kicks in if the leaf underflows [`1:19:57`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4797) [`1:20:27`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4827).

## Systems that used it

| System | Status |
|---|---|
| **TokuTech / TokuDB** | built entirely on fractal trees; acquired by Percona, became "extra DB" for MySQL, **eventually died** [`1:19:12`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4752) |
| **"SSDB"-style project out of China** | also dead [`1:19:12`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4752) |
| **SplinterDB (VMware)** | the most famous current user; used by an AI-adjacent speaker's system, not heavily advertised [`1:19:12`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4752) |
| **A new system out of China ("chomo")** | claims Bε trees [`1:19:12`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4752) |

## Trade-off

- **Much more complex** than a plain B+Tree — you must maintain and apply the mod logs, and you inherit all the complications of log-structured storage [`1:19:12`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4752) [`1:19:57`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4797).
- **Much faster for write-heavy workloads** than a regular B+Tree [`1:19:57`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=4797).
