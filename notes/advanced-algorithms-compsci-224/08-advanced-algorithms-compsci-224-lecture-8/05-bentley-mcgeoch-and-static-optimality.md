# 5. Bentley–McGeoch: worst-case analysis and static optimality

## The theorem (Bentley & McGeoch, 1985)

- **Assumptions:** no insertions, and the items start **sorted by time of first access** ([`26:25`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1585)).
- **Statement:** for all access sequences `S`,

  `cost_MTF(S) ≤ 2 · cost_FC(S)`  (FC = frequency count) ([`27:04`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1624))

- So move-to-front is never much worse than frequency count ([`27:29`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1649)).

## Their experiments

- Frequency count did well; **move-to-front usually did just as well and sometimes better; transpose performed badly** ([`27:29`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1649)).

## Connection to splay trees' static optimality

- Splay trees' **static optimality** says splay does as well on any access sequence as any *fixed* tree that never rotates ([`28:01`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1681)).
- The list analogue: if no movement is allowed after an access, the best fixed arrangement is exactly frequency order — so frequency count minimizes total service time for the whole sequence ([`28:18`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1698)).
- Hence Bentley–McGeoch reads as **"static optimality for move-to-front"** (up to the factor 2) ([`28:52`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1732)).

## Open point raised in class

- A student notes the two readings of "frequency count": sorted by final frequency (fixed) vs. re-sorted as frequencies change (dynamic) ([`29:24`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1764), [`29:53`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1793)).
- Here it means the **dynamic** version, which makes the theorem stronger than plain static optimality; whether the dynamic version always beats the static one was left unresolved in class ([`29:53`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1793), [`30:27`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1827)).
- Either way the lecture goes on to prove **something strictly stronger than static optimality** ([`30:27`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1827)).
