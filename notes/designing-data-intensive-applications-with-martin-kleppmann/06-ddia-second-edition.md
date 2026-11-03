# 06 — DDIA: the second edition

Covers `26:24`–`30:50`. Why a second edition, the collaboration with Chris Riccomini, and the big new theme.

## Why and how it happened

- A second edition had clearly been needed for a couple of years: the first edition was getting dated and technology changes weren't reflected. But Martin now has an academic job (research + teaching), so the update was a side project and progress was very slow — the same context-switching problem as the first edition. [`26:25`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1585) [`26:56`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1616)
- He also realized he'd lost touch with current industry practice (e.g. data lakes) after going deep into theory in academia. [`26:56`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1616) [`27:19`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1639)

## The collaboration with Chris Riccomini

- Chris Riccomini: old LinkedIn colleague from stream processing, author of *The Missing README*, writer of the *Materialized View* newsletter on data systems trends, and a startup investor in that space. [`27:19`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1639) [`27:46`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1666)
- Division of labor: Chris brought up-to-date knowledge of the industry cutting edge; Martin brought strong opinions on how to teach — precise, carefully chosen wording that remains accessible. "My writing style plus Chris's knowledge of latest industry trends." [`28:09`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1689) [`28:38`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1718)

## The big new theme: cloud-native architecture

- Planned from the start: reflecting **cloud-native systems architecture** — building data systems on top of cloud services as the foundational abstraction. [`28:38`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1718) [`29:03`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1743)
- First edition's implicit assumption: machines with local disks; a database instance runs on a machine, writes to local disk, and replication happens at the database level between machines. [`29:03`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1743)
- What changed: people now build databases **on top of object stores**, where replication happens at the object-store level. An object store is a genuinely new abstraction — unlike a virtual block device (e.g. EBS), which still mimics a single-node OS block device with a filesystem on top. [`29:33`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1773) [`29:59`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1799)
- This style was just emerging at the time of the first edition and has since taken off; the idea is integrated **throughout the whole book**, not confined to one section. [`30:23`](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1823)
