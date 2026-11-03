# 06 - Page Contents, Self-Containment, and Page IDs

## What a page is

- A page is a **fixed-size block of data** inside a file. A single file is assumed to have a single page size (enterprise systems allow mixing) ([`29:58`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1798)).
- Fixed offsets are what make fast jumps into the file possible ([`30:21`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1821)).

## What a page can hold

- Tuples for a table ([`30:21`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1821)).
- Metadata: last-update timestamp, checksum of the page contents ([`30:40`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1840)).
- Log records of changes ([`30:40`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1840)).
- Index structures for jumping around within the page ([`30:40`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1840)).
- Contents are usually **uniform/homogeneous** — one entity per page; tuples from two tables, or from an index and a table, are normally not mixed ([`30:57`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1857)).

## Self-contained pages

- Some systems require a page to be **self-contained**: everything needed to interpret it lives inside it ([`31:23`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1883)).
- Benefits raised in class ([`31:23`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1883), [`31:44`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1904), [`32:07`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1927)):
  - No need to read other pages to understand this one.
  - Saves storing the page-to-metadata mapping.
  - Matters at scale: with a billion tuples at one tuple per page, re-reading a metadata page per page would be brutal.
- The real motivation is **disaster recovery**: Oracle famously does this so that if half the disk melts, the surviving pages still carry enough metadata to be interpreted ([`32:22`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1942), [`32:43`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1963)).
- Most systems instead keep schema/catalog information in **separate metadata pages**; if that part of the disk melts, the remaining bits cannot be interpreted ([`33:02`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1982)).
- Q&A points:
  - Duplicating metadata pages helps, but those copies can burn too ([`33:02`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=1982)).
  - If the page directory is lost in a true disaster, specialists are flown in to extract data page by page, like a plane-crash investigation — very expensive, and less common now that hardware is cheap enough to keep copies ([`33:30`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2010), [`33:45`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2025), [`34:12`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2052)).
  - A **per-page checksum** tells you *that* something is corrupted; a human then decides whether the data or the metadata is wrong and may copy metadata from another page of the same table — manual work ([`34:36`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2076), [`34:57`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2097)).
- Takeaway: seemingly redundant metadata is stored for recovery reasons ([`35:08`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2108)).

## Page IDs

- Every page gets a unique identifier, the **page ID** (also block ID) ([`35:08`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2108), [`35:26`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2126)).
- Uniqueness scope varies by system — within the DBMS, a file, a table, or an index ([`35:26`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2126)):
  - **SQLite**: single file, so page ID is directly an offset within the file ([`35:46`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2146)).
  - **Postgres**: page ID is unique per table; you first resolve the table's file, then jump to the offset ([`35:46`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2146)).
- The point of the page ID is an **indirection layer** mapping IDs to physical locations: pages can be moved without updating every structure pointing at them, as long as the mapping is updated. This pays off later with record IDs ([`36:07`](https://www.youtube.com/watch?v=dSxV5Sob5V8&t=2167)).
