# Getting started with a simple API benchmark

- The first server is a simple Node.js project with a `/simple` route that returns a JSON message. [`16:36`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=996) [`16:54`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1014)
- The uploader stresses that the language is not the main idea at this point; the same route shape could exist in Python, Go, Rust, Java Spring, or another backend stack. [`17:11`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1031)
- The local server runs on port `3001`, connects to Redis and PostgreSQL, and returns `message: hi` from `/simple`. [`17:33`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1053) [`17:56`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1076)
- One request means the client sends bytes to the server, receives a `200` response plus the body, and counts that complete round trip. [`17:56`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1076) [`18:25`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1105)
- AutoCannon is installed with `npm i -g autocannon` and is used to simulate thousands or millions of requests against the API. [`18:45`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1125)
- The first local benchmark uses 20 connections, 20 seconds, pipelining of 2, and a `GET` request to `/simple`. [`19:17`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1157)
- The first result is about 18,000 requests per second, 300,000 total requests over the run, no errors, and about 90 MB transferred. [`20:04`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1204)

## What this section teaches

- Before scaling anything, define what counts as a request and start with the smallest measurable route. [`18:25`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1105)
- Benchmark outputs are only useful if errors, duration, total request count, and transferred bytes are read together. [`20:04`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1204)
