# 5. The Retrieval Problem and Bloomier Filters

## From membership to retrieval

- A Bloom filter lets you look up **one bit** per element of the set (and that bit is always `1`). [`1:01:13`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3673)
- **Bloomier filters** generalize this: associate an arbitrary **`r`-bit string** with every element, using `n·r` bits total. That is the **retrieval problem**. [`1:01:13`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3673) [`1:01:43`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3703)

## What retrieval does *not* solve

- It is **not** the dictionary problem — the keys themselves are never stored. [`1:01:43`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3703)
- You cannot enumerate the set: holding the keys would need `n` **words**, and the structure only uses `n·r` **bits**. [`1:02:18`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3738)
- Give it an element and it answers; ask it what it contains and it cannot say. [`1:02:08`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3728)

## The guarantee

- **Static** version only: all items and all strings are known up front. [`1:02:31`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3751) [`1:16:03`](https://www.youtube.com/watch?v=edOWKZE1t84&t=4563)
- **No errors for members:** `x ∈ S` ⇒ the correct `r`-bit string is returned. [`1:02:54`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3774)
- **Garbage for non-members:** `x ∉ S` ⇒ an arbitrary `r`-bit string with no guarantee, and the structure cannot even tell it is wrong. [`1:02:54`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3774) [`1:03:12`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3792)
- Attribution: **Chazelle, Kilian, Rubinfeld and Tal, 2004**. [`1:14:51`](https://www.youtube.com/watch?v=edOWKZE1t84&t=4491) [`1:15:31`](https://www.youtube.com/watch?v=edOWKZE1t84&t=4531)

The construction is deferred until cuckoo hashing is introduced, since it is built on a cuckoo hash table. [`1:03:22`](https://www.youtube.com/watch?v=edOWKZE1t84&t=3802) [`1:14:51`](https://www.youtube.com/watch?v=edOWKZE1t84&t=4491)
