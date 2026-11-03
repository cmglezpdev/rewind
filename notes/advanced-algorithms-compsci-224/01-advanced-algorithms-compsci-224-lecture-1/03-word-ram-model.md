# 3. The word-RAM model

The model that replaces the comparison model for the rest of the lecture.

## Definition

- Items are integers in the range `0, 1, …, 2^w − 1`, where **`w` is the word size** [`17:08`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=1028).
- The **universe size** is `u = 2^w` [`17:08`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=1028).
- **Pointers fit in a word** [`17:57`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=1077).

## Why `w ≥ log n` is a free assumption

1. A structure storing `n` items must use space at least `n` just to remember them [`17:57`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=1077).
2. A pointer is an address into that space, so `w ≥ log(space) ≥ log n` [`18:45`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=1125).
3. Therefore the lecture always assumes **`w ≥ log n`** [`18:45`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=1125).

## Constant-time operations

Anything you can do in C on two words `x, y` counts as `O(1)` [`27:53`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=1673):

- Integer arithmetic: `+`, `−`, `×`, and **integer division** (rounds down) [`28:28`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=1708).
- Bitwise: negation, `XOR`, `OR`, `AND` [`28:28`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=1708).
- Bit shifting, by a fixed constant **or by another variable** [`28:28`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=1708).
- Array access — following a pointer and reading that memory address is `O(1)` [`49:13`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=2953), [`49:57`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=2997).

## Fine print on multiplication

- Assumption used: a product fits in **two words**, with the high bits in the second word [`29:09`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=1749).
- The lecturer notes this assumption isn't strictly needed: with integer overflow you get the low bits of the correct answer, and multiplying larger numbers can be **simulated** in the word-RAM using a few words — left as an exercise [`29:28`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=1768), [`30:01`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=1801).

## Consequence

Because bit tricks are available, the predecessor structures below can beat `log n`, and the two of them are complementary: one wins when `w` is **small** (close to `log n`), the other when `w` is **large** [`19:10`](https://www.youtube.com/watch?v=0JUN9aDxVmI&t=1150).
