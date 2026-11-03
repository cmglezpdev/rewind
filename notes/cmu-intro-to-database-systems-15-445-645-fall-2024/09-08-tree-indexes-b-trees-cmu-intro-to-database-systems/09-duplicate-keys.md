# 09 — Handling duplicate keys

Secondary indexes are not unique — many people share a zip code, so an index on zip code must tolerate duplicates [`51:21`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3081) [`51:45`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3105).

## Approach 1 — Append the record ID to the key (recommended)

- The system **implicitly concatenates the record ID onto the index key**, making every key unique from the tree's point of view [`51:45`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3105) [`52:14`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3134).
- Lookups on the logical key become **prefix lookups** on the composite key, returning all matching entries [`51:45`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3105) [`54:38`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3278).
- Insert order: insert the tuple into a page first → get the record ID → concatenate → insert into the tree, splitting normally if needed [`52:59`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3179).
- **Postgres does this** and does not expose it through SQL — you can only see the record ID by inspecting the raw page bytes [`52:39`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3159).
- Optimization noted in Q&A: if the record ID is already in the key, it can serve as the value too — don't store it twice [`53:49`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3229).

## Approach 2 — Overflow leaf nodes (don't do this)

- When a duplicate key arrives, chain an extra leaf page off the existing one, like a chained hash table [`52:14`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3134) [`53:24`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3204).
- Search: descend to the leaf, then walk the whole overflow chain; when exhausted, you know the key exists nowhere else — identical to chained hashing, but with a B+Tree instead of a hash lookup on top [`54:38`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3278) [`55:06`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3306).

**Problems admitted in class:**

- A skewed distribution produces a very long chain → you are back to sequential scans [`52:14`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3134).
- It **breaks sequential leaf scanning** — you must pop back up out of the chain [`54:03`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3243).
- It **breaks the O(log n) guarantee** entirely [`55:32`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3332).

> Verdict, stated explicitly: "don't do this, do the record ID one" [`55:32`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3332).
