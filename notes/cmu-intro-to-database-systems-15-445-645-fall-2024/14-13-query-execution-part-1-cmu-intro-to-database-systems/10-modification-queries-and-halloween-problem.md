# 10 — Modification Queries and the Halloween Problem

## Responsibilities of INSERT / UPDATE / DELETE operators

They must ([`55:18`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3318)):

- Modify the target table.
- **Update all affected indexes**.
- **Check constraints** to see whether the change is allowed.

Output ([`55:40`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3340)):

- By default, the **count** of tuples inserted/updated/deleted.
- Optionally the modified record IDs, or with the `RETURNING` keyword the modified tuples themselves.

## Other DML, briefly ([`54:42`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3282))

- **UPSERT** — check existence; update if present, insert otherwise.
- **TRUNCATE** — implemented as dropping the table from the catalog and recreating it; far faster than scanning and deleting.
- **MERGE** — essentially a join that produces updates; an upsert-like operation.

## Composition: reuse scans, don't reimplement them

- For `UPDATE ... WHERE ...` / `DELETE`, a lower operator (sequential or index scan) finds the tuples and passes **record IDs** up to the modification operator ([`56:10`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3370), [`56:29`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3389)).
- Rationale: otherwise every scan optimization (multi-index scan, etc.) would have to be reimplemented inside every modification operator ([`56:29`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3389)).

### Two designs for INSERT ([`57:42`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3462), [`58:13`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3493))

1. The insert operator itself materializes the tuple — simplest; **what BusTub does**.
2. A **child operator** materializes tuples and feeds them up; the insert operator blindly inserts (after constraint checks). **Better**, because it makes `INSERT INTO ... SELECT` fall out for free — the select produces output, the insert routes it into a table.

## The Halloween problem

### The anomaly ([`58:39`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3519) → [`1:00:39`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3639))

Setup: table of people, **index on salary**, query = give everyone earning under $1,100 a $100 raise, executed with the iterator model / pull direction.

1. Index scan probes the B+Tree, iterates leaf nodes in **salary order**.
2. First match: Andy at $999. Remove from index → salary becomes $1,099 → reinsert into index.
3. The scan continues forward and **finds Andy again at $1,099**, still matching `< 1100`.
4. Andy gets raised a second time — **incorrect** ([`1:00:39`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3639)).

### Generalization ([`1:01:11`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3671))

If an update **changes the physical location of a tuple**, an in-progress scan may encounter the same tuple again. This happens with sequential scans too, when a tuple is relocated to a later page.

### The name ([`1:00:39`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3639), [`1:01:50`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3710))

- Discovered by **IBM in the 1970s** while building **System R**, one of the first relational databases.
- IBM researchers hit the bug on a Friday that happened to be Halloween, decided to deal with it Monday, and the name stuck. Nothing to do with Halloween semantics.

### The fix ([`1:02:15`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3735), [`1:02:27`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3747))

- Track the **logical records** already seen — not the physical ones, since physical location changes.
- Under set/bag semantics an update must apply exactly **once** per tuple, even though execution is physically linear.
- This is required for **Project 3** in the course ([`1:02:15`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3735)).

## Student questions answered

- *Why reinsert immediately instead of buffering all deletions and reinserting at the end?* Because with a billion tuples you would need an intermediate buffer for all of them — not scalable ([`1:02:57`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3777)).
- *Does this thrash the buffer pool on a huge table?* "Absolutely yes, it's unavoidable" ([`1:03:37`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3817)).
- *What about rolling back on abort?* You maintain an **undo log** recording everything you did, so you can reverse it — full treatment in two weeks ([`1:04:08`](https://www.youtube.com/watch?v=HNtlew7mCc4&t=3848)).
