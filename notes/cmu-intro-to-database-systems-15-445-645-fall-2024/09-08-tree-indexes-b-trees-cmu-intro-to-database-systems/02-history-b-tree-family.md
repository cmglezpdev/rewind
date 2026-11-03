# 02 — History and the B-Tree family

## Naming confusion

- "B-Tree" names both a **family** of data structures and one **specific** data structure inside that family [`7:37`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=457).
- Systems that say "we use B-Trees" almost always mean B+Trees — Postgres is the classic example [`7:37`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=457).
- And almost nobody implements the B+Tree *as originally defined*; real implementations mix in decades of accumulated optimizations [`7:37`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=457) [`8:15`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=495).

## The papers

| Year | Work | Contribution |
|---|---|---|
| 1970 | Bayer & McCreight — original B-Tree paper | invented the structure; McCreight got his PhD at CMU in 1969, then went to Boeing [`8:15`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=495) [`8:34`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=514) |
| ~1973 | IBM tech report | describes B-Tree variants, including the B+Tree — there is **no** dedicated original B+Tree paper [`9:17`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=557) |
| 1979 | "The Ubiquitous B-Tree" (IBM survey) | the paper people actually read; the name signals it was already everywhere by 1979 [`8:34`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=514) |
| 1981 | Lehman & Yao — **B-link tree** | adds sibling pointers to make concurrent access easier; Phil Lehman did his PhD at CMU and still works there [`9:41`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=581) [`10:21`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=621) |
| ~2010s / last month | *Modern B-Tree Techniques* and its follow-up | people are still writing books about it [`58:58`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=3538) |

- The Postgres source header states it is "a correct implementation" of Lehman & Yao's high-concurrency B-Tree management algorithm — evidence that the B-link variant, not the classic B+Tree, is what ships [`10:51`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=651).

## What does the "B" stand for?

- Never defined in the original papers [`9:17`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=557).
- Candidates raised in class: *balanced* (rejected — "binary" would mean only 2 keys), *Bayer* (author's initial), *Boeing* [`9:41`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=581).
- Phil Lehman told the instructor by email he is **90% sure** the original authors said it was named after **Boeing** [`10:51`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=651).
- Why would Boeing build a DBMS? No off-the-shelf software existed; a plane manufacturer tracking parts needed one. IBM's IMS was likewise built to track rocket parts for the Moon program — and you can still buy IMS today [`10:51`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=651) [`11:41`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=701).

## Still the right answer, 50 years later

- The core structure is essentially unchanged since 1979; modern work only tweaks it for modern hardware [`8:34`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=514).
- CedarDB reportedly started with a red-black tree, realized it was a mistake, and switched to a B+Tree [`7:15`](https://www.youtube.com/watch?v=scUtG_6M_lU&t=435).
