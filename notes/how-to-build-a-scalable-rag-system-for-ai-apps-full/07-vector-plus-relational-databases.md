# 7. Why You Need Vector + Relational Databases

## What tutorials show

- Store embeddings in a vector database, do similarity search, done ([`7:51`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=471)).

## What production actually needs

Vector similarity alone can't do these ([`7:51`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=471), [`8:10`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=490)):

- **Filter by date** — so you only get the latest version of a policy document.
- **Filter by department or document type.**
- **Join information across multiple chunks** belonging to the same document.

All of that is **relational data**, and doing it with just vector similarity doesn't work well ([`8:10`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=490)).

## The conclusion

- Production systems often use a database that handles **both**: embeddings for semantic search, relational data for filtering and joining ([`8:10`](https://www.youtube.com/watch?v=4KiiKQ9RVvA&t=490)).
- Note the direct link back to the parental-leave failure in [02](02-bad-retrieval-and-hallucinations.md): the stale-version problem is a *filtering* problem, not a similarity problem.
