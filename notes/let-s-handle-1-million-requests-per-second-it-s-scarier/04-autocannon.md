# AutoCannon model and metrics

- AutoCannon's `-c` option sets total open connections, `-d` sets duration, `-p` sets pipelining, and `-W` sets worker threads for the load generator. [`20:39`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1239)
- Worker threads matter when the load generator machine has many cores, because the test client must also generate enough traffic. [`20:39`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1239)
- With `-c 6`, `-p 2`, and `-W 2`, each worker opens three connections and each connection pipelines two requests. [`21:00`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1260) [`22:07`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1327)
- Concurrent in-flight requests are computed as connections times pipelining, so `6 * 2 = 12` requests in flight. [`22:47`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1367)
- The main metric the uploader watches is average requests per second, while the table also reports percentiles and min/max samples. [`23:08`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1388) [`23:32`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1412)
- The local `/simple` run averaged around 18,000 requests per second, with worst samples around 16,000 and best samples around 18,000. [`23:32`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1412) [`23:49`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1429)

## Benchmark reading checklist

- Check average requests per second first. [`23:08`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1388)
- Check whether errors occurred, because a high rate with failures is not a working result. [`20:04`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1204)
- Check bytes transferred, because a small JSON response and a 30 KB response stress very different parts of the system. [`20:04`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1204)
- Check the tester's CPU too, since a weak load generator can hide the server's real capacity. [`20:39`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1239)
