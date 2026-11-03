# Native Weer deployment

## Native prerequisites

- Running Weer natively requires Node.js, Yarn, Postgres, Redis, and PM2. [`56:49`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3409)
- Docker installed those automatically, but native deployment requires installing and managing them manually. [`56:49`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3409) [`57:06`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3426)

## Version selection

- The speaker uses official installation instructions for each technology. [`57:19`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3439)
- For Node.js, the tutorial uses the LTS version because LTS releases are supported for years, while current releases may be supported only for months. [`57:19`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3439) [`57:40`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3460)
- NVM is used to install and switch Node versions, comparable to SDKMAN for Java. [`58:15`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3495) [`58:36`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3516)
- Ubuntu `apt` packages can lag behind latest upstream major versions; this is why some installations add official repositories before installing. [`59:23`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3563) [`1:02:11`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3731)
- The speaker emphasizes keeping server software current because known vulnerabilities in old versions are commonly exploited. [`1:03:18`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3798) [`1:03:32`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3812)

## Postgres, Redis, and PM2

- Postgres is installed, checked with `systemctl status`, and assigned a password for the default `postgres` user. [`1:03:47`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3827) [`1:04:17`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3857) [`1:04:46`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3886)
- Redis is installed from official instructions rather than relying on an older default package. [`1:05:22`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3922) [`1:06:06`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3966)
- Redis is verified with `redis-cli`, including a simple `set`/`get` test and version check. [`1:07:11`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4031) [`1:07:41`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4061)
- PM2 is installed globally with npm and is used to run Node.js processes, restart them, and manage them in the background. [`1:07:41`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4061) [`1:08:19`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4099)
- The same Postgres and Redis installations can be reused by the other applications deployed later. [`1:08:34`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4114)

## Build and start Weer

- After installing prerequisites, disk usage increased by only a few hundred megabytes. [`1:09:13`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4153)
- The production setup path is `yarn setup`, then `yarn start`. [`1:09:30`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4170) [`1:09:49`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4189)
- `yarn setup` installs dependencies, builds packages, creates the Weer database, creates tables, seeds data, and flushes Redis. [`1:09:49`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4189) [`1:11:14`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4274) [`1:11:57`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4317)
- The `.env` file must include the Postgres password chosen during installation. [`1:10:46`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4246)
- Native deployment used about 5 GB after setup, compared with about 6 GB in the Docker path. [`1:11:57`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4317) [`1:12:15`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4335)
- `yarn start` runs the app through PM2, and `pm2 logs` is needed to see runtime logs. [`1:12:15`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4335) [`1:12:35`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4355)

## Runtime behavior

- PM2 runs two server instances plus one janitor instance. [`1:13:01`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4381)
- Node applications need cluster mode to better use available CPU cores because requests are initially handled through a single-threaded model. [`1:13:17`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4397) [`1:13:33`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4413)
- Java and Rust applications usually do not follow this Node cluster pattern because their runtimes/frameworks handle threading differently. [`1:13:17`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4397)

## Inspecting Redis and Postgres

- Redis Insight can connect to the server's Redis through an SSH tunnel. [`1:13:54`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4434) [`1:14:19`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4459)
- Visiting a shortened link creates a view record in the Redis stream with fields such as user agent, link type, and QR-code indicator. [`1:17:30`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4650) [`1:17:50`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4670)
- The janitor drains the Redis stream and inserts views into Postgres in batches, then acknowledges the processed stream entries. [`1:18:14`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4694) [`1:18:30`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4710) [`1:18:56`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4736)
- The stream max length is configured as 100,000, allowing Redis to truncate when it reaches that size. [`1:18:56`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4736)
- Postgres can be inspected from the command line or with pgAdmin through an SSH tunnel. [`1:19:22`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4762) [`1:20:13`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4813)
