# 04 — N-ary Storage Model (row store)

## Definition

- All attribute values of a single tuple are stored **contiguously in the same page** ([`15:10`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=910)).
- Great for OLTP: those workloads touch a small number of tuples (usually one, via primary-key lookup) and typically need **all** attributes of that tuple ([`15:10`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=910)).
- Retrieval is a jump to a page, a jump to a slot offset, and a single `memcpy` — no pointer chasing through memory ([`15:54`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=954)).
- Page sizes are a multiple of the hardware page size, so a tuple that fits in one page costs **one read** ([`16:12`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=972)).

## Physical layout

- Slotted page: header with the slot array; records appended from the end toward the middle ([`16:29`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=989)).
- Every record carries its own header, which is where the **null bitmap** lives (one per tuple) ([`16:29`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=989)).

## Query walkthroughs

**Point select** (`SELECT * FROM useracct WHERE username = ...`) ([`17:22`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=1042)):
1. Index data structure returns a record ID for the username (covered in lectures 8–9).
2. Page directory maps the record ID to a page.
3. Page header → slot array entry → offset.
4. `memcpy` everything out. Done.

**Insert** ([`18:03`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=1083)): the page directory finds a page with an empty slot; jump to the offset and write the bits.

**Analytical scan** (`WHERE hostname LIKE '%.gov'` + aggregate on `lastLogin`) ([`18:18`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=1098)):
1. Walk the slot array to find every tuple's offset.
2. Jump to each tuple, then jump again to the `hostname` offset inside it.
3. Evaluate the predicate, then repeat for the next tuple ([`18:53`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=1133)).
4. For matches, extract the month from `lastLogin` and update an in-memory hash table counter — this can be fused into the same pass, no second loop ([`19:24`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=1164)).

**The core problem**: the other three attributes were never needed, but because NSM packs all values of a tuple together, they **come along for the ride** when the page is fetched. Block-oriented storage means the whole page enters memory — pure useless I/O ([`20:06`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=1206), [`20:22`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=1222)).

## Trade-off summary

**Advantages** ([`20:41`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=1241)):
- Fast inserts, updates and deletes — a small change is one page.
- Ideal for queries that need the whole tuple (`SELECT *`).
- Composes with index-organized storage to keep data physically sorted for queries.

**Disadvantages** ([`20:41`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=1241), [`21:35`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=1295)):
- Bad at scanning large portions of a table, especially when only a subset of attributes is needed.
- Jumping between offsets creates branching and indirection — bad for the CPU.
- Poor compression: intermixed attributes come from **different value domains**, which no compression scheme handles well ([`21:57`](https://www.youtube.com/watch?v=nhlpwmOBEiE&t=1317)).
