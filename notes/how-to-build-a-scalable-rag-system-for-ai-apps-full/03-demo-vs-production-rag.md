# 3. Demo RAG vs Production RAG

## The gap

| Demo RAG | Production RAG |
|---|---|
| Documents are clean | Data is messy: tables, images, headers, footers |
| Questions are predictable | Users ask vague or ambiguous questions |
| One version of each document | Multiple versions of the same document |
| Everything works | You have to handle all of the above ([`3:36`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=216)) |

## What changes in the pipeline

Basic RAG on the ingestion side is just *chunk it and embed it*. Production inserts two stages before that ([`4:03`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=243), [`4:21`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=261)):

1. **Restructuring layer** — parse raw documents and understand their structure: what's a heading, a paragraph, a table.
2. **Structure-aware chunking** — instead of blindly splitting every 500 tokens, chunk along the document's natural boundaries. Tables stay whole; headings stay with their content ([`4:44`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=284), [`4:46`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=286)).

## Inputs on the left side of the architecture

- Documents, code, images, spreadsheets — all the unstructured and structured data living inside an organization ([`4:03`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=243)).
