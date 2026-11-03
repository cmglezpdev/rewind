# 11 — TabDB (Live Demo)

The joke system that closes the technical part of the lecture — introduced as the one system the lecturer wishes he had invented ([`1:15:43`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4543)).

## What it is

- A relational database that **runs in your browser and stores its data in the titles of your browser tabs** ([`1:15:43`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4543)).
- Under the hood it is **SQLite compiled to WebAssembly (Emscripten)**; the tab titles are the storage layer ([`1:16:05`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4565), [`1:16:34`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4594)).

## What the demo showed

- Open a batch of tabs, run `CREATE TABLE` — the schema/data appears in the tab titles ([`1:16:05`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4565)).
- `INSERT` updates the tab titles; `SELECT` reads them back and returns results ([`1:16:05`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4565), [`1:16:34`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4594)).
- **Row size limit ≈ 100 characters**, the maximum tab title length; longer values spill into more tabs ([`1:16:34`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4594), [`1:16:54`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4614)).
- Repeatedly running `UPDATE people SET name = name || name` grows values until they visibly **truncate**, at which point correctness is no longer verifiable from the titles ([`1:17:20`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4640), [`1:17:54`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4674)).
- Aside: he tried to bring the author to CMU and stage it as a distinguished lecture, mayor's office invited ([`1:18:34`](https://www.youtube.com/watch?v=fr5lIchF6pw&t=4714)).
