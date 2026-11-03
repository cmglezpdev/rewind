# 06 — General B-Way Merge Sort and Its Cost

## The generalized formulas

With **B** buffer pool pages available and **N** data pages [`29:58`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=1798) [`30:33`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=1833):

- **Pass 0** produces `⌈N / B⌉` sorted runs — the ceiling accounts for a trailing partial run [`29:58`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=1798).
- **Subsequent passes** merge `B − 1` runs at a time, because one frame is always reserved for output [`30:33`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=1833).
- Total I/O cost then follows by plugging the pass count into `2N × passes` [`30:33`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=1833).
- The two-way example's 3-page requirement is just the B = 3 case: 2 inputs + 1 output [`29:42`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=1782).

Divide and conquer is called out as "widely used in databases and other systems" precisely because it breaks a problem into memory-sized chunks [`30:51`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=1851).

## Worked example: N = 108 pages, B = 5 buffers

| Pass | Runs produced | Run size |
|---|---|---|
| 0 | `⌈108/5⌉` = **22 runs** (last one only 3 pages) | 5 pages |
| 1 | merge 4 at a time → **6 runs** | 20 pages |
| 2 | → **2 runs** | 80 pages |
| 3 | → **1 run**, fully sorted | 108 pages |

[`33:09`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=1989) [`33:37`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2017) [`34:14`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2054)

- Result: **4 passes total** for 108 pages. The point is that the same algorithm still works at a billion records / petabytes of data [`34:14`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2054).
- Note the run size multiplies by `B − 1` = 4 each pass [`33:37`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2017).

## There is no universally optimal B

- Whether you use asynchronous I/O to write in the background, and how much memory a query should get, depends on hardware and on what else is running in the system — "the answer, it always depends, on databases" [`34:32`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=2072).

## Q&A: why not parallel two-way merges instead?

- Question: could you run multiple two-way merges in parallel and still use all the buffer pool pages? [`31:05`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=1865)
- Answer: historically disks couldn't handle many parallel requests; modern disk queues are large enough that you could. **But it still loses**: parallel two-way merges keep a large number of passes, re-reading and re-writing the data repeatedly. Using all memory for a wide merge shrinks the tree, so **fewer passes always wins, even with parallel I/O** [`31:35`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=1895) [`32:07`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=1927).
