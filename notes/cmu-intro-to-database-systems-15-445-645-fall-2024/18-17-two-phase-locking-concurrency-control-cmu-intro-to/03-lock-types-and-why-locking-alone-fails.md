# 03 — Basic lock types, and why locking alone is not enough

## Shared and exclusive locks

- **Shared (S)** = read. **Exclusive (X)** = write. Different terms from latches' read/write purely to avoid confusion [`5:48`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=348), [`11:28`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=688).

### Compatibility matrix

| Requested \ Held | S | X |
|---|---|---|
| **S** | ✅ compatible | ❌ |
| **X** | ❌ | ❌ |

Only shared–shared is compatible; anything involving an exclusive lock blocks [`11:28`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=688).

Real DBMS manuals show **much larger** compatibility matrices, with many extra lock types for different object kinds — catalog updates vs. index updates, and so on [`11:28`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=688), [`12:22`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=742).

## How locking works mechanically

1. Before any read or write on an object, the transaction requests the lock from the lock manager [`12:22`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=742).
2. If free → granted. If held incompatibly → the request is denied and the worker thread is put in that lock's queue and stalls [`9:02`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=542), [`9:16`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=556), [`9:42`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=582).
3. **Lock upgrade**: hold S, then convert to X when a write is coming next — possible, but may still have to stall [`12:22`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=742).
4. Releasing a lock wakes up the queued transaction [`9:42`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=582).

## The counter-example: locking alone does *not* guarantee serializability

Schedule with T1 = `X-LOCK(A), R(A), W(A), UNLOCK(A)` … then later `S-LOCK(A), R(A), UNLOCK(A)`, with T2 = `X-LOCK(A), W(A), UNLOCK(A)` interleaved in the middle [`13:59`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=839), [`14:36`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=876).

- Every operation is properly locked, yet T1's second read sees **T2's write** instead of its own earlier write [`14:36`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=876).
- That is the **unrepeatable read** anomaly: reading the same object twice yields different values [`15:16`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=916).
- **Main takeaway**: using locks does not by itself guarantee a serializable schedule — you must be smart about *when* you lock and unlock [`15:16`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=916), [`15:43`](https://www.youtube.com/watch?v=bXpkEt5P_Js&t=943).

That is exactly the gap two-phase locking closes.
