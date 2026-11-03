# 01 — Introduction and Course Logistics

## Course announcements

- Project 1 is due this Sunday; a recitation and a tutorial on how to profile system performance are posted on Piazza [`0:52`](https://www.youtube.com/watch?v=foMMYyycRgk&t=52).
- Extra office hours on the Saturday before the deadline, in Gates 5207, signed up through the OHQ website [`0:52`](https://www.youtube.com/watch?v=foMMYyycRgk&t=52).
- Do not email individual TAs for project debugging — use office hours or Piazza so answers are shared once instead of repeated [`0:52`](https://www.youtube.com/watch?v=foMMYyycRgk&t=52).
- Homework 3 goes out today, due October 6; the midterm is in three weeks, in class [`1:23`](https://www.youtube.com/watch?v=foMMYyycRgk&t=83).
- Warning: Project 2 is much harder than Project 1 — if you cannot yet debug a deadlock in a multithreaded C++ program, start now [`1:46`](https://www.youtube.com/watch?v=foMMYyycRgk&t=106).

## Where this lecture sits

- The previous class defined an **index**: a data structure the DBMS maintains to find the location of a tuple/record based on some attributes; the B+Tree is the most widely used one [`2:15`](https://www.youtube.com/watch?v=foMMYyycRgk&t=135).
- Key distinction introduced today — **filter vs. index** [`2:34`](https://www.youtube.com/watch?v=foMMYyycRgk&t=154):
  - A **filter** answers only "does this key exist in the set?"
  - An **index** answers "yes it exists, and here is where to find it."
- Filters recur across the system the way the Mod Log did — they will matter again for joins and other optimizations [`2:34`](https://www.youtube.com/watch?v=foMMYyycRgk&t=154).

## Agenda for the session

1. Bloom filters and other filter variants [`3:07`](https://www.youtube.com/watch?v=foMMYyycRgk&t=187)
2. A "smorgasbord" of data structures useful in databases — skip lists, tries [`3:07`](https://www.youtube.com/watch?v=foMMYyycRgk&t=187)
3. Inverted indexes and vector indexes
4. A flash talk from the co-founder/CTO of TiDB [`3:07`](https://www.youtube.com/watch?v=foMMYyycRgk&t=187)

Informal class poll: about half the room had heard of Bloom filters, fewer of tries, and very few of skip lists [`3:33`](https://www.youtube.com/watch?v=foMMYyycRgk&t=213).

> Caveat on vector indexes: unlike a trie or radix tree, there is no single data structure you can point to and call "the vector index" [`3:33`](https://www.youtube.com/watch?v=foMMYyycRgk&t=213).
