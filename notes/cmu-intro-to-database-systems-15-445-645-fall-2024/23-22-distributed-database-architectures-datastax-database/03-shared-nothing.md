# 03 — Shared-Nothing Architecture in Depth

## Origins and properties

- Ignoring academic prototypes, the **first commercial shared-nothing system was Teradata, 1982** [`13:14`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=794).
- Each node owns CPU + memory + disk; communication is network-only [`13:14`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=794).
- From the **1980s to the early 2000s this was the recommended way** to build a distributed database, partly because single-node algorithms port to it with few changes [`17:02`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1022) [`17:31`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1051).
- Andy maintains the database encyclopedia at **dbdb.io** for browsing more systems of each class [`14:57`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=897).

## Strengths

- Excellent performance/efficiency **when each node holds all the data its queries need** — e.g. the CS department queries the CS node, ECE queries the ECE node, cleanly splitting the work [`13:14`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=794) [`13:52`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=832).
- Alternatively, full replicas per node let users run without contending for the same machine [`13:52`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=832).

## Weaknesses

- **Scaling capacity is hard**: data is tied to each node's local disk, so adding a node means physically copying data to it — e.g. copying 2 TB onto the new node's disk before it can serve [`14:28`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=868) [`16:25`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=985) [`16:43`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1003).
- **Consistency is hard**: no node knows what the others are doing, so updates require network traffic to keep everyone's picture aligned [`14:28`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=868).
- Cross-node joins must either ship one side's data to the other node or join elsewhere [`15:13`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=913).

## Worked example: range-partitioned two-node cluster

1. One table range-partitioned on ID: node A holds 1–150, node B holds 150–300 [`17:57`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1077).
2. A query for ID 200 consults an abstract **catalog / metadata service** that says which node owns that ID, then goes straight to node B [`18:19`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1099).
3. For a query spanning partitions, the **DBMS — not the application server — figures it out**: it contacts whichever nodes are needed, pulls results back to the node the app server talked to, joins/processes there, and returns one answer [`18:40`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1120) [`19:04`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1144).
4. Q&A: the node that fetches a remote tuple does **not** store it, because it is not logically in charge of that ID [`19:04`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1144).

## Repartitioning under load

- When two nodes cannot absorb the load (course registration, Black Friday), you go from 150 IDs per partition to 100 and add a third node — which requires **copying 50 IDs from each existing node** to the new one [`19:41`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1181) [`20:00`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1200).
- The catalog metadata **must be updated atomically with the copy** [`20:26`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1226).

### War story: MongoDB auto-scaling

- Early MongoDB auto-sharding could copy the data correctly but **could not update the catalog metadata in a single atomic operation**. Data landed on the new middle node while a request for ID 101 was still routed to the old node, which no longer had it — so queries failed [`20:26`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1226) [`21:08`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1268).
