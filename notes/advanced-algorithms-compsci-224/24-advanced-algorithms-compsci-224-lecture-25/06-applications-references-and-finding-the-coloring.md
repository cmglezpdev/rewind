# 6. Applications, references, and finding an actual coloring

## Other problems solvable with this technique

- k-colorability was only one example; the same inclusion–exclusion machinery handles, e.g. [`41:00`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=2460), [`41:47`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=2507):
  - **minimum Steiner tree**
  - **finding all k-colorable induced subgraphs**
- Recommended survey: Husfeldt, *"An invitation to algorithmic uses of inclusion–exclusion"*, **ICALP 2011**, also on arXiv; further references are inside it [`41:47`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=2507), [`42:08`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=2528).

## Decision → construction: actually finding a k-coloring

- Natural objection: the formula only tells you a coloring **exists**, not what it is [`43:58`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=2638), [`44:20`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=2660).
- It can be found in **roughly the same running time** via a reduction in Björklund–Husfeldt (FOCS '06) [`44:20`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=2660).
- The reduction is a **black box**, only a couple of paragraphs long, and not algorithm-specific: *if you can compute a graph's chromatic number in `2^n` time, you can find a `k`-coloring in roughly the same time* [`45:07`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=2707), [`45:25`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=2725).
- Skipped in class for time; the paper is on arXiv [`45:07`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=2707).

## Loose ends left as exercises

- Only the **zeta transform** side of Yates's algorithm was shown; computing the **Möbius inversion** uses an almost identical dynamic program, left as an exercise (possibly to be added to the notes) [`47:21`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=2841), [`47:45`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=2865).

## Transition to the final topic

- The remaining class and a half covers **sketching and streaming** [`45:49`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=2749), [`47:45`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=2865).
- Deliberately kept short: Harvard runs a **whole course on it** — *Algorithms for Big Data*, offered next fall — so the lecturer avoids duplicating that material [`48:26`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=2906).
- Next lecture will connect a streaming algorithm to something already seen in the course, and use it to **speed that earlier result up** [`48:51`](https://www.youtube.com/watch?v=M42rQM0vC4g&t=2931).
