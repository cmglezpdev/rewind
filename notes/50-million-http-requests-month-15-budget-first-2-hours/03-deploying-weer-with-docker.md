# Deploying Weer with Docker

## Server setup

- The tutorial launches a new AWS instance named `Sky`, because that name will later become the SSH shortcut. [`22:43`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1363) [`22:57`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1377)
- The instance uses Ubuntu on ARM with a `T4G.small`, giving 2 GB RAM and 2 CPU cores. [`23:13`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1393)
- A new key pair named `UDCC` is created, and the temporary security group is an allow-all group that will be tightened later. [`23:31`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1411) [`23:49`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1429)
- Storage is set to 25 GB because the machine will hold five databases, logs, and multiple deployed applications. [`23:49`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1429) [`24:17`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1457)

## Initial access

- The downloaded PEM key is moved into `~/.ssh`, then used with SSH as `ubuntu@<public DNS or IP>`. [`24:36`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1476)
- The PEM key needs restrictive permissions, shown as `chmod 400`, before SSH will accept it. [`25:07`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1507)

## Clone and install Docker

- Weer is cloned from GitHub using the `udcc` branch so the course instructions keep working even as the production project evolves. [`25:36`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1536) [`25:51`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1551)
- Docker is installed from the official Docker Ubuntu instructions, including Docker Compose. [`26:23`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1583) [`26:55`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1615)
- The Docker setup commands mainly tell Ubuntu where to download Docker from before installing it. [`27:18`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1638)

## Run Weer

- The intended Docker path is clone the repository, run `docker-run.sh`, answer prompts, and let the script set up the app. [`27:46`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1666) [`28:03`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1683)
- If the `.env` file is missing, the script prompts the user to copy `.env.example` to `.env`. [`28:03`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1683)
- The main `.env` values discussed are port, Google OAuth client ID/secret, Redis URL, Postgres settings, `USE_REDIS`, and the cookie key. [`28:21`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1701) [`28:40`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1720)
- The cookie key should be a random string of at least 32 characters. [`29:06`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1746)
- Redis can be enabled by setting the relevant environment value to `true`. [`28:49`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1729) [`29:06`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1746)
- The database setup prompt should be answered yes so the tables and seed data are created. [`29:27`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1767) [`31:48`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1908)

## Docker services

- The Docker Compose file defines four services: Redis, Postgres, the server application, and the janitor. [`30:58`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1858)
- The Docker build compiles React, Sass, reusable/common packages, and the TypeScript server into JavaScript that Node.js can run. [`30:58`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1858) [`31:22`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1882)
- When successful, the server runs on port `2080`, connects to Redis and Postgres, and creates the Redis view consumer group. [`32:07`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1927)
- Both the server and janitor connect to Redis and Postgres, so the connection logs appear for both processes. [`32:27`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1947)

## Verification

- Visiting the server public DNS on port `2080` loads Weer. [`32:44`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1964)
- Shortening a link works, though the displayed short-link domain is not final until a proper domain is configured. [`33:00`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1980) [`33:16`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=1996)
- Google login requires real Google client ID and secret values; without them, login is not expected to work. [`33:28`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2008)
- Docker is not expected to sacrifice much performance, and later benchmarks will compare Docker and non-Docker deployments. [`33:45`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2025)
