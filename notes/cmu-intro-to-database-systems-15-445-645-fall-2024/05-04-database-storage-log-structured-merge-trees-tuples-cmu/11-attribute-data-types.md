# 11 — Representing attribute data types

## Type-by-type

| Type | Representation |
| --- | --- |
| Integers (8/16/32/64-bit) | The same as C/C++ native types — an `unsigned int` in C is essentially what Postgres stores [`1:02:47`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3767) |
| Floating point | IEEE **754** — fast, but with rounding issues [`1:02:47`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3767) |
| Fixed-point decimals | Every DBMS also implements `NUMERIC`/`DECIMAL` with extra metadata to avoid hardware rounding errors [`1:03:14`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3794) |
| Varchar / text / blob | A header inline with the data carrying the **size**; the data is either inline or a pointer (record-ID-like) to another page [`1:03:14`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3794) [`1:03:42`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3822) |
| Strings | Also need collation/sort metadata (Unicode, Japanese characters, etc.) [`1:04:01`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3841) |
| Timestamps | Commonly milliseconds or microseconds since the **Unix epoch**, plus time-zone bookkeeping [`1:04:01`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3841) |

## Why floats are not good enough for a database

- A DBMS is the system of record for major organizations, so rounding errors are unacceptable [`1:04:53`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3893)
- IEEE 754 is very fast because modern CPUs have dedicated instructions for it, but it is not guaranteed exact [`1:05:06`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3906) [`1:05:28`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3928)
- **Demo**: a C program adding floats `0.1 + 0.2` prints correctly with default `printf`, but dumping the raw bytes exposes that the hardware cannot represent `0.3` exactly [`1:05:28`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3928) [`1:05:57`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3957)
- Fine for trivia, unacceptable for rockets or bank interest calculations [`1:06:18`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3978)

## Fixed-point numerics

- Conceptually: store the digit sequence (almost as a string) plus metadata for **where the decimal point is, the sign, and whether it is infinity** [`1:06:56`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4016)
- Postgres's `numeric` struct tracks **number of digits, weight, scale, sign**, with `NumericDigit` typedef'd to an unsigned char array holding the digits [`1:07:27`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4047)
- **Cost**: no single hardware instruction exists. Postgres's numeric addition is a mass of if/else and switch branches for negatives, infinities and corner cases — no way it matches a hardware float add. That is the price of exactness [`1:07:55`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4075) [`1:08:20`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4100)
- Oracle goes further: asking for a float type gives you their fixed-point numeric instead, heavily optimized [`1:06:33`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=3993)
- Numerics are just the easiest example; many other types work the same way [`1:08:41`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4121)

## Aside: specialized hardware for databases

- Oracle used to put database instructions in the SPARC ISA after buying Sun; they no longer sell SPARC [`1:08:54`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4134)
- **It never works out**: in the 1980s "database machines" were built, but by the time you designed, fabbed and shipped custom silicon, Intel had released a new x86 and the gains were gone. People retry every 5–10 years [`1:09:28`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4168) [`1:09:58`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4198)
- GPUs and FPGAs are different because they are commodity; the hard part there is getting data in and out [`1:09:28`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4168) [`1:09:58`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4198)

## Representing NULLs

Three approaches [`1:09:58`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4198):

1. **Null bitmap in the tuple header** (most common in row stores)
   - One bit per column, set to 1 when the value is null [`1:09:58`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4198)
   - The space for the value is still reserved, so offsets stay uniform and an in-place update can later write a real value there [`1:10:34`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4234)
2. **Special / placeholder values**
   - e.g. `INT32_MIN` means null; nobody may ever insert that value, so higher layers must range-check and throw [`1:10:59`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4259)
   - The sentinel must match the width of the type — a 64-bit column needs a 64-bit minimum, not a 32-bit one [`1:13:11`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4391) [`1:13:31`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4411)
   - Increasingly the standard in **column stores**, since it keeps fixed-length offsets aligned [`1:11:36`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4296)
3. **Per-attribute null flag prefixed to each value** — explicitly labelled "don't do this, it's stupid"
   - It wrecks alignment: an 8-bit boolean plus one null bit needs 9 bits, so it pads out to **16 bits** [`1:12:08`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4328) [`1:12:35`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4355)
   - Only MemSQL is known to have done it, and they dropped it when rebranding to SingleStore [`1:12:35`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4355)

**Recommendation**: row store → bitmap header; column store → special values; some in-memory DBMSs also use placeholders to reduce memory footprint [`1:12:35`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4355)

### Logical vs. physical null equality

- Logically, `NULL = NULL` is **unknown**, not true; `NULL IS NULL` is true. Null means "I cannot reason about what is in here" — not a null pointer [`1:13:59`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4439) [`1:14:31`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4471) [`1:14:51`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4491)
- Physically, two nulls of different types are **not** equal — the bit sequences differ [`1:14:51`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4491)
- This "low-level detail" was the subject of a recent paper by the lecturer with a former student at Tsinghua; the spoiler is that **special values win for column stores** [`1:14:51`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4491) [`1:15:19`](https://www.youtube.com/watch?v=IHtVWGhG0Xg&t=4519)
