# 05 — Core Design Issues and Data Transparency

## The four questions every distributed DBMS must answer

1. **How does the application find the node holding the data?** The abstract "metadata catalog" from the examples has to be implemented for real; one option is a **central coordinator** everyone talks to, which accesses the catalog on their behalf [`29:35`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1775).
2. **Where do queries get sent** — directly to the data nodes, or to the central coordinator? [`29:56`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1796)
   - **Push the query to the data**: compute on the node that owns the data.
   - **Pull the data to the query**: compute on the node that requested it [`29:56`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1796).
3. **How is the database divided across resources?** → partitioning [`30:20`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1820).
4. **How is correctness preserved** while nodes read, write, spin up and — sometimes involuntarily — go down? [`30:35`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1835)

- Illustrative failure mode: the "**a sheep ate my internet**" incident in New Zealand, where a sheep chewed a network cable and took a node down. The environment is hostile and the system must tolerate it [`30:35`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1835).
- The history slides (protocols still running bank ATMs) were skipped for time [`31:02`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1862).

## Data transparency

- **Goal**: you should not have to rewrite your application depending on whether the data physically sits on the east coast, west coast, or Asia. A query that runs today should still run tomorrow after the data moves [`31:20`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1880).
- **Reality**: developers writing SQL often still need location awareness — not for correctness but for **cost**, since cross-region data movement is expensive. The system should be *able* to do it regardless [`31:20`](https://www.youtube.com/watch?v=o7bjRUcDMx0&t=1880).
