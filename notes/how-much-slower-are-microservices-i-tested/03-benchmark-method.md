# Hardware, workload, and scoring

## Fixed application budget

| Resource | Single-server layout | Four-server layout | Source |
| --- | --- | --- | --- |
| Application servers | 1 × 8 vCPU, 16 GB RAM | 4 × 2 vCPU, 4 GB RAM | [`3:44`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=224) |
| Total application resources | 8 vCPU, 16 GB RAM | 8 vCPU, 16 GB RAM | [`3:44`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=224) |
| Monthly application-server budget | $112 | $112 | [`3:44`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=224) |

- These are cloud vCPUs, not necessarily dedicated physical cores. Host differences can affect results. [`4:06`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=246) [`5:16`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=316)
- NGINX runs on a separate eight-core machine; Postgres runs on a managed 16-vCPU cluster. Both stay fixed and fall outside the $112 application budget. [`4:06`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=246) [`4:26`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=266)

## Workload and pass criteria

- Virtual users browse articles, open profiles, load comments, and occasionally write. Three load-generator machines supply traffic; 1,000 users generate roughly 250–270 requests/second in this workload. [`4:26`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=266)
- The score is the maximum user count sustained for a full five-minute measurement window while meeting all three limits. [`4:26`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=266) [`4:47`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=287)
  1. 95% of requests take less than 500 ms. [`4:26`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=266)
  2. 99% take less than one second. [`4:26`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=266)
  3. Fewer than 1% fail. [`4:26`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=266)
- Shorter tests locate the approximate limit; a longer run confirms it. A brief spike does not qualify as sustained capacity. [`4:47`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=287)
- Read the results as workload-specific capacity under these latency and error limits. CPU time is a separate measure of work, not end-to-end response latency. [`4:26`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=266) [`6:20`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=380) [`6:42`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=402)
