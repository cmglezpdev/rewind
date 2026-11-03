# Docker storage and cleanup

## What Docker created

- After the Docker deployment, the server used about 6 GB out of about 24 GB available storage. [`44:14`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2654)
- Big Docker workflows can consume several gigabytes because they create containers, images, volumes, and caches. [`44:34`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2674)

## Containers, images, volumes

- Containers are lighter than virtual machines because they are Unix processes sharing the host operating system kernel. [`44:52`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2692) [`45:08`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2708)
- Images consume the larger share of storage; the Weer server image was about 1 GB. [`45:30`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2730) [`45:55`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2755)
- Images are like installed applications or blueprints; containers are like running processes created from those images. [`46:12`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2772) [`46:34`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2794)
- Volumes keep data such as Postgres data and app logs outside the container so it does not vanish when containers are recreated. [`46:34`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2794) [`47:10`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2830) [`47:25`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2845)
- Weer logs every request with route/status/timing/time, and in this section logs are stored on disk instead of an external logging service. [`48:13`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2893) [`48:46`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2926)

## Disk usage observations

- `docker system df` showed images around 3 GB, containers around 2 MB, local volumes around 50 MB, and build cache around 1.5 GB. [`49:24`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2964) [`49:43`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2983)
- Running the Docker startup a second time was much faster because Docker reused cache. [`49:57`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2997) [`50:23`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3023)
- The startup script includes helper commands for getting a shell inside the container. [`50:41`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3041)

## Cleanup workflow

- The Docker Compose cleanup command with `--volumes` removes containers, images, and volumes for the project, but `--volumes` should be avoided when the data should be kept. [`51:33`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3093) [`51:56`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3116)
- After removing the project containers and volumes, the application no longer serves requests. [`52:16`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3136) [`52:31`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3151)
- `docker system prune -a` removes remaining unused caches/images, but it can also remove unrelated images not currently used by containers. [`53:17`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3197) [`53:37`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3217)
- After full cleanup, Docker usage returned to zero and server disk usage dropped from about 6 GB to about 3 GB. [`54:19`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3259) [`54:37`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3277)

## When to use Docker

- Docker is useful for cloning a large repo, starting it with one command, testing with lots of data, and then fully cleaning it up without disturbing the host machine. [`55:42`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3342)
- The speaker warns against forcing Docker into every stage when it makes the workflow more complicated instead of simpler. [`55:01`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3301) [`55:26`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3326)
- The course will mostly run things natively because the same Unix and operating-system concepts also underlie Docker. [`56:05`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3365) [`56:18`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=3378)
