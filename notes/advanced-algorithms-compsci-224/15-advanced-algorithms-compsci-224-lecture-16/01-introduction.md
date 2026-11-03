# 1. Introduction — Where LP algorithms stand

## Plan for the lecture

- Finish the **simplex** algorithm, then prove **strong duality** and state **complementary slackness** ([`0:10`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=10)).
- Say a few words about the **ellipsoid** algorithm, and begin **path-following interior point** methods ([`1:31`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=91), [`1:46`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=106)).

## The landscape of LP algorithms

| Algorithm | Poly time? | Used in practice? |
| --- | --- | --- |
| Simplex | No known polynomial-time implementation; all take exponential time ([`0:44`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=44)) | Yes ([`2:19`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=139)) |
| Ellipsoid | Yes — the **first** poly-time algorithm for LP ([`0:44`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=44)) | Essentially not; it is slow ([`1:11`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=71), [`2:19`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=139)) |
| Interior point (path following) | Yes, and faster than ellipsoid in practice ([`1:46`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=106)) | Yes ([`2:19`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=139)) |

## Framing remarks

- Ellipsoid gets only a sketch: covering it properly would cost a full lecture and it is not much used in practice ([`1:11`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=71)). A pointer to fuller treatment goes in the course notes ([`1:31`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=91)).
- Interior point will also skip some case analysis, but enough will be shown to convey the mechanism ([`2:19`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=139)).
- Why simplex survives despite exponential worst case: the bad instances are **pathological**, so in practice running it for some number of iterations usually finds the optimum ([`2:48`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=168)). Ease of implementation is not the whole story ([`2:48`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=168)).
