# 10 — What a tuple is: layout and word alignment

## A tuple is just bytes

- A tuple is a sequence of bytes, usually preceded by a **header** with metadata about those bytes — not the schema itself, which lives in the catalog [`52:48`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3168)
- The DBMS's job is to **impose structure** on that byte array: types, sizes, nullability, values [`53:27`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3207)
- Example table `foo(id INT32, value INT64)`: header of a system-specific size, then the ID bits, then the value bits [`53:53`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3233)
- Reading an attribute = tuple start + header size + column offset, then a `reinterpret_cast`-style read into the target type; the header size is identical for every tuple, so it is pure arithmetic [`54:24`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3264) [`54:46`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3286)

## The alignment problem

- Modern CPUs want accesses along **64-bit word boundaries** (sometimes you care about the 64-byte cache line) [`55:21`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3321)
- Mixed-width attributes break that: a 32-bit `id` fills half the first word, then a 64-bit timestamp **straddles two words** — 32 bits in the first, 32 in the second [`55:43`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3343) [`56:21`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3381)
- On modern CPUs (x86, ARM) the hardware hides it: it performs **two memory / cache-line accesses** and stitches the value back together [`57:11`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3431)
- On older CPUs you got an **interrupt** telling you not to do that [`57:11`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3431)
- Net effect: the misaligned lookup **costs twice as much**, so the database runs slower [`57:42`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3462)

## Fix 1 — Padding (most common)

- Pad the 32-bit integer with 32 zero bits so every attribute starts on a word boundary; the system just has to know the padded offsets [`57:57`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3477)
- It wins because it is easy, and it is the approach most systems take [`57:57`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3477) [`59:33`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3573)

## Fix 2 — Attribute reordering

- **Logical/physical data independence** means the storage order need not match the declared column order; `SELECT *` still returns id, date, color, zip [`58:34`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3514) [`58:56`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3536)
- Physically reshuffle attributes so they pack cleanly into words [`59:20`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3560)
- Some trailing padding still remains, because the next tuple must not start in the middle of a word; you may not save space, but you avoid cross-boundary accesses [`59:33`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3573)

## Postgres demo: measuring padding

Using `row(...)` plus `pg_column_size()` [`59:52`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3592) [`1:00:31`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3631):

| Experiment | Size |
| --- | --- |
| `row(1,2,3)` as 32-bit ints | **36 bytes** (includes header overhead) [`1:00:31`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3631) |
| Same values cast to 16-bit ints (`::`) | **30 bytes** [`1:01:10`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3670) |
| Mixed chars and integers, one ordering | **48 bytes** [`1:01:28`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3688) |
| Same columns, reordered | **44 bytes** — less padding needed [`1:01:45`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3705) |

Takeaway: column declaration order measurably changes physical tuple size in Postgres; one ordering is more optimal than another [`1:01:45`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3705)
