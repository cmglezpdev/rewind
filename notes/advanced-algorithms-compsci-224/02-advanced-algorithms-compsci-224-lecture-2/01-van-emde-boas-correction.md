# 1. Correction to the van Emde Boas space argument

Housekeeping before the main topic: an erratum about last lecture's van Emde Boas / y-fast trie space bounds.

## The claimed result

- Last lecture covered van Emde Boas trees and y-fast tries; both reach the same query bound ([`0:00`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=0)).
- For vEB trees the suggestion was: replace the arrays with **hash tables** to get `O(n)` space instead of `O(u)` space ([`0:18`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=18)).
- This is exactly **CLRS Exercise 20-1, part (f)** — prove that hash tables in place of arrays yield linear space ([`0:18`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=18)).

## The error

- What was presented in class *is* CLRS's intended solution, but it contains a **subtle error** ([`0:39`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=39)).
- It is not merely a flawed argument: the construction genuinely **does not achieve `O(n)` space** — it is slightly worse ([`0:56`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=56)).
- Assigned as a problem-set problem: the exact wrong sentence will be identified, and students must explain why it is wrong and fix it ([`0:56`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=56)).

## What still holds

- `O(n)` space **is** achievable for vEB trees — the fix appears on the problem set ([`1:12`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=72)).
- **y-fast tries as described do get `O(n)` space**, thanks to the indirection layer; no correction needed there ([`1:12`](https://www.youtube.com/watch?v=3_o0-zPRQqw&t=72)).
