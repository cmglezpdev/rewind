# 03 — Locks vs Latches

A naming conflict between the database world and the OS world: "we're correct and they're wrong — at least within the database system" [`9:23`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=563).

- A **lock** protects transactions from each other [`9:23`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=563).
- A **latch** protects workers (threads/processes) from each other [`9:23`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=563).

## Comparison table (from Goetz Graefe's B+ tree book)

| | **Latches** | **Locks** |
|---|---|---|
| Separate | Workers (threads/processes) | Transactions |
| Protect | In-memory data structures | Database contents (table, database, tuple) |
| Held during | Critical sections only | Entire transaction duration |
| Modes | **2**: read / write (shared / exclusive) | Many: shared, exclusive, update, intention |
| Deadlock handling | **Avoidance only** — via coding discipline | Detection and resolution: rollback, kill a thread |
| Kept in | The data structure's own pages | A separate lock table |

Sources: [`12:18`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=738), [`12:42`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=762), [`13:06`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=786).

## Duration contrast

- Locks can be held across multiple round trips between application and server: typically **milliseconds**, sometimes seconds, and historically **hours or days** for long-running queries [`11:08`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=668).
- Latches are "jump into a page, do something, jump out right away" — comparable to the pin operations from the buffer-pool project [`11:08`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=668).

## The critical implication

- There is **no high-level traffic cop for latches**. No deadlock detector runs in the background; it is entirely the systems programmer's responsibility not to do something stupid — "easier said than done" [`11:36`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=696) [`11:58`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=718).

## Latch modes

- **Read mode**: multiple threads can hold it at once; the implementation is essentially a counter of holders. A read request is compatible with an existing read latch [`13:32`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=812).
- **Write mode** (= exclusive): only one thread at a time; a write request is **incompatible with everything else**, and all other acquisitions must wait [`14:00`](https://www.youtube.com/watch?v=lgUNTj0Q54M&t=840).
