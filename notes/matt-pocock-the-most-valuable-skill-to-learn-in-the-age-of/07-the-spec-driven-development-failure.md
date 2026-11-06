# Why Pocock abandoned his spec-driven workflow

## The approach he tried

- Pocock describes spec-driven development as maintaining a detailed specification and asking agents to turn it into code, refining the specification over time. He notes that the term has other interpretations. [`26:43`](https://www.youtube.com/watch?v=Z8lf5oWKfj0&t=1603) [`27:13`](https://www.youtube.com/watch?v=Z8lf5oWKfj0&t=1633)
- He applied that approach to his custom video editor, which also supported AI writing and thumbnail design. [`27:36`](https://www.youtube.com/watch?v=Z8lf5oWKfj0&t=1656)

## What went wrong

- Over months of trying, he observed worsening code and worsening agent results. This is a personal project account; the interview gives no controlled comparison or numerical quality score. [`28:02`](https://www.youtube.com/watch?v=Z8lf5oWKfj0&t=1682)
- He abandoned the large specs as his main focus and returned attention to the code. His explanation is that the codebase itself is the environment in which the agent works. [`28:22`](https://www.youtube.com/watch?v=Z8lf5oWKfj0&t=1702)
- He defines a good codebase by how easily it can change without breaking something the agent failed to consider. Focusing on that property made him feel he was making progress again. [`28:46`](https://www.youtube.com/watch?v=Z8lf5oWKfj0&t=1726) [`29:08`](https://www.youtube.com/watch?v=Z8lf5oWKfj0&t=1748)

## The lesson he draws

- The failure concerns the spec-first workflow he describes. His broader recommendation is to maintain a codebase that supports safe modification and to communicate priorities through processes such as skills. [`28:46`](https://www.youtube.com/watch?v=Z8lf5oWKfj0&t=1726) [`29:44`](https://www.youtube.com/watch?v=Z8lf5oWKfj0&t=1784)
- Models and tools can improve, but they cannot know unspoken preferences. Pocock expects a continuing role for human review, taste, and a process that helps the agent understand the intended product. [`30:07`](https://www.youtube.com/watch?v=Z8lf5oWKfj0&t=1807) [`30:32`](https://www.youtube.com/watch?v=Z8lf5oWKfj0&t=1832)
