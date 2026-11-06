# Untested optimization options

The presenter proposes these production techniques but does not benchmark them in this video. [`10:13`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=613)

- Give services independent database infrastructure to tune and scale storage separately. This adds a control point but does not automatically make services faster. [`10:13`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=613)
- Keep local copies of frequently needed data to avoid repeated calls to other services. The presenter characterizes this as a departure from strict microservice ownership. [`10:13`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=613)
- Move work that need not finish before the response into asynchronous events to shorten the synchronous response path. [`10:33`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=633)
- Replication introduces consistency and operational decisions. A copied profile needs updates when the original changes and a policy for disagreement between copies, creating cache-invalidation problems. [`10:33`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=633) [`10:50`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=650)
