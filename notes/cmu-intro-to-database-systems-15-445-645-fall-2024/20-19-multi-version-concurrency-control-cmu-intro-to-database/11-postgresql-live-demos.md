# 11 — Live PostgreSQL demos

Setup: a table `transaction_demo` with two tuples, inspected through PostgreSQL's hidden system columns [`1:09:23`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4163) [`1:09:53`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4193).

| Hidden column | Meaning |
|---|---|
| `ctid` | Physical location: (page number, slot number) [`1:09:53`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4193) |
| `xmin` | BEGIN timestamp — the transaction ID that created this version [`1:09:53`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4193) |
| `xmax` | END timestamp — bounds visibility [`1:09:53`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4193) |

Isolation level is set **per transaction** at `BEGIN`, not globally [`1:10:26`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4226) [`1:21:03`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4863).

---

## Demo 1 — Read committed: versions are real and physically visible

Two sessions, both at **READ COMMITTED**; transaction IDs 1457 (top) and 1458 (bottom) [`1:10:26`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4226) [`1:11:48`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4308) [`1:12:50`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4370).

Observations:

- Before the update: `xmin = 1456`, `xmax = 0`, `ctid = (0,1)` [`1:12:35`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4355).
- After the update: a **new physical version appears at `ctid = (0,3)`** with `xmin` = the updater's ID and `xmax = 0`. This is append-only storage, live [`1:12:50`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4370).
- The bottom transaction (1458) reading the same tuple **still sees the old version**, whose `xmax` is now stamped with 1457 — the range is closed, but it remains visible to 1458 because 1457 has not committed [`1:13:16`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4396) [`1:13:41`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4421).
- **Asking PostgreSQL directly for `ctid (0,3)` from the bottom session returns nothing.** The row physically exists, but visibility rules block it: "physically it's there; logically the transaction can't see it" [`1:13:58`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4438) [`1:14:21`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4461) [`1:14:41`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4481).
- When the bottom transaction tries to update the same tuple it **hangs** — the top holds a write lock on the *logical* tuple, not the physical version [`1:14:41`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4481) [`1:15:03`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4503).
- On COMMIT of the top session, the bottom immediately unblocks — PostgreSQL reports it **waited 17 seconds** [`1:15:22`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4522).
- The bottom then creates a version at `ctid = (0,4)`, reads the committed value **101**, and writes **102** — read-committed lets it observe the newly committed update [`1:15:41`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4541) [`1:16:19`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4579).

### The `xmax = xmin` curiosity and VACUUM

- A student asks why `xmax` shows 1458 instead of infinity/0. Andy: "This is Postgres internals I don't fully understand" — likely extra bookkeeping metadata [`1:16:19`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4579) [`1:16:38`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4598).
- **Running `VACUUM` on the table resets `xmax` to 0.** When the vacuum sees `xmin == xmax` and the transaction committed, it knows this is the latest version and clears the bound [`1:17:00`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4620) [`1:17:30`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4650).

---

## Demo 2 — Serializable: an abort on write-write dependency

Database reset; two transactions at **SERIALIZABLE**, IDs 1462 and 1463. PostgreSQL's serializable implementation was reportedly incorrect when first released but has since been fixed [`1:17:42`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4662) [`1:18:19`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4699).

1. Top updates `value = value + 1` where `id = 1`, using a `RETURNING` clause to echo back arbitrary output [`1:18:19`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4699).
2. Bottom still sees the original version, with `xmax` stamped by the top transaction [`1:18:55`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4735).
3. Bottom tries the same update and **hangs** — PostgreSQL waits to learn the top's outcome rather than aborting immediately (some systems abort right away) [`1:19:24`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4764).
4. Top commits → **the bottom transaction is aborted** [`1:19:50`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4790).

**Why the abort is correct:** the bottom read value 100 from its snapshot and is updating based on it, but the top already set it to 101. Even with no application code between the queries, that value **leaked to the outside world**; the database cannot know the operation happens to be commutative. Allowing it would violate serial ordering [`1:19:50`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4790) [`1:20:23`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4823) [`1:21:03`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4863).

---

## Demo 3 — "Postgres is going to lie to you": READ UNCOMMITTED

Top at SERIALIZABLE, bottom at **READ UNCOMMITTED** [`1:21:03`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4863) [`1:21:26`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4886).

- The top updates a tuple. The bottom, despite asking for READ UNCOMMITTED, **cannot see the uncommitted change** [`1:22:28`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4948) [`1:22:55`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4975).
- Only after the top commits does the bottom see it [`1:23:10`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4990).
- **PostgreSQL cannot actually provide READ UNCOMMITTED**: exposing uncommitted versions would require additional code they consider not worth writing, so you silently get READ COMMITTED instead [`1:23:10`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4990) [`1:23:43`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=5023).
- **The inversion:** "Oracle — you ask for something higher and they give you something worse. In Postgres you ask for something worse and they give you something better for free" [`1:23:10`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=4990).
- **Isolation level depends on what *you* see, not on how you affect others** — the top transaction's level does not change this [`1:23:43`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=5023).

### Is the upgrade really free? (performance Q&A)

- Free from an **engineering** perspective, roughly free from a **performance** one [`1:24:02`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=5042) [`1:24:33`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=5073).
- Even at READ UNCOMMITTED you would still take write locks to protect concurrent writers, and the timestamps are already being maintained [`1:24:02`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=5042) [`1:24:33`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=5073).
- The key reason: PostgreSQL is **oldest→newest but stores pointers to every version in the index** (when they aren't split across pages), so it jumps directly into the chain. A pure O2N system without those pointers would be faster at read-uncommitted by grabbing the first version it lands on — but PostgreSQL doesn't work that way, so **there is no real performance difference** [`1:24:33`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=5073) [`1:25:03`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=5103) [`1:25:31`](https://www.youtube.com/watch?v=niLwbfE3V9Q&t=5131).
