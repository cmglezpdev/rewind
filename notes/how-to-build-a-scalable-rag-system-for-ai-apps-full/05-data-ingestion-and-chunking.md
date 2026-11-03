# 5. Data Ingestion & Smart Chunking

## Why basic chunking fails

Real production data ([`6:17`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=377)):

- PDFs with tables
- Word documents with headers and footers
- HTML pages with navigation menus mixed into the content

Extract text and chunk blindly, and you lose all that structure ([`6:17`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=377)).

## Step 1 — Restructuring

- Parse the document and identify what's a **heading**, a **paragraph**, a **table**, a **code block** ([`6:17`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=377)).
- Principle: **structure carries meaning, and you want to preserve it** ([`6:17`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=377)).

## Step 2 — Structure-aware chunking

- Chunk on the document's natural boundaries instead of every N tokens regardless of content ([`6:45`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=405)).
- Keep a heading together with the paragraph it describes. Don't cut a code function in half ([`6:45`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=405)).

### Concrete numbers

- **Sweet spot most teams land on: 256–512 tokens per chunk**, with some overlap to maintain context across boundaries ([`6:45`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=405)).
- Caveat: **the exact numbers matter less than respecting the structure** ([`6:45`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=405)).

## Why it's worth the effort

- The pipeline isn't glamorous — nobody gets excited about parsing PDFs — but it's the foundation ([`7:39`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=459)).
- **If your data is poorly structured going in, nothing downstream can fix it** ([`7:39`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=459)).
