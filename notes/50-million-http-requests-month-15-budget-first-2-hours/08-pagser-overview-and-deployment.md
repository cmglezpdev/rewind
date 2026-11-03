# Pagser overview and deployment

## Application scope

- Pagser is described as the largest project in the course and has been worked on for years. [`2:00:33`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7233)
- It is a content-sharing/blogging application where users can start a blog and others can interact with the content. [`2:00:48`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7248)
- The application has more than 20,000 lines of code. [`2:02:15`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7335)

## User-facing features

- Users can log in, view subscriptions, inspect author profiles, see content, review reading history, and manage read-later items. [`2:01:04`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7264) [`2:01:29`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7289) [`2:01:42`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7302)
- Profiles include name, headline, biography, photo upload, cropping, and backend image resizing/cropping. [`2:02:45`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7365) [`2:03:01`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7381)
- Users can create private/public pages using a rich text editor powered by self-hosted TinyMCE assets. [`2:03:40`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7420)
- Page creation supports embedded images, thumbnails, attached files, tags, comment toggles, and publishing. [`2:04:04`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7444) [`2:04:27`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7467) [`2:04:43`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7483)
- Public content supports likes/dislikes, subscriptions, thumbnails, attached files, and complex threaded comments. [`2:05:04`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7504) [`2:05:32`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7532) [`2:05:51`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7551)
- The comments UI is powered by React and Redux. [`2:06:09`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7569)
- Pagser does not yet include notifications or websockets; a later project will cover websockets with chat. [`2:06:29`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7589)

## Architecture

- Pagser has a similar structure to Weer: Cpeak-powered Node.js backend, Postgres, `common`, React, Sass, and reusable packages. [`2:06:51`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7611)
- Pagser has much more CSS and JavaScript than Weer, including a separate dark-theme CSS file. [`2:07:07`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7627)
- It has multiple HTML files because public pages and public profiles are server-side rendered for SEO. [`2:07:27`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7647) [`2:07:43`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7663)
- Cpeak handles server-side rendering and file uploads, and the speaker describes it as zero-dependency. [`2:07:43`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7663)

## Email and auth

- Pagser includes password reset email functionality. [`2:08:00`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7680)
- The example email comes from `no-reply@pagser.com`, and the speaker says the email setup will be cheap with very low per-thousand-email costs. [`2:08:42`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7722)
- Registration includes email verification by code. [`2:09:04`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7744) [`2:09:32`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7772)
- Authentication includes password hashing, forgot password, and email verification. [`2:09:52`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7792)

## Media and storage

- Pagser needs backend media processing for uploaded images, including crop and resize operations. [`2:09:52`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7792)
- Uploaded images and attachments should not be stored only on the EC2 machine because local server storage is not durable enough. [`2:10:13`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7813)
- The speaker cites SSD failure rates around 1% per year and notes that instances can be lost or terminated. [`2:10:13`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7813) [`2:10:35`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7835)
- The planned durable storage approach is to keep three copies of each file in three separate world locations, handled automatically by the storage service. [`2:11:00`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7860)

## Deployment roadmap

- Deploying Pagser requires cloning, running `yarn setup`, adding secrets to Parameter Store, setting up AWS SES for email, setting up S3 for uploads, and updating `sky-role` for storage/email permissions. [`2:11:19`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7879) [`2:11:37`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7897)
- The repository should use the `udcc` branch, for the same reason as Weer: the production project can change while the course branch stays aligned with the lesson. [`2:12:03`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7923)

## Parameter Store setup

- Pagser environment variables are taken from `packages/server/.env.example` and stored in Parameter Store under `pagser/prod`. [`2:12:37`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7957) [`2:13:45`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=8025)
- The speaker uses `aws ssm put-parameter` commands to create parameters from the terminal instead of entering each one manually in the AWS console. [`2:13:45`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=8025) [`2:14:09`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=8049)
- Local AI is used to generate the batch of SSM commands because cloud AI should not be trusted with secrets. [`2:13:04`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7984) [`2:17:44`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=8264)
- Secret values and the database password are stored as SecureString; non-sensitive values are stored as String. [`2:17:44`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=8264) [`2:20:58`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=8458)

## S3 bucket

- S3 is introduced as cloud storage where applications can upload and read files. [`2:15:25`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=8125)
- The bucket name must be globally unique across AWS accounts. [`2:15:25`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=8125)
- Public access is intentionally allowed here because profile pictures and page images are meant to be publicly readable. [`2:15:46`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=8146)
- Public access should be blocked for sensitive personal user data. [`2:16:22`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=8182)

## Build and run

- Pagser is cloned on the server from the `udcc` branch, then `yarn setup` is run. [`2:21:24`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=8484) [`2:21:54`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=8514)
- The build takes longer than Weer because Pagser is much larger and the React build is heavy. [`2:21:54`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=8514)
- Building on the production server consumes significant CPU, so later CI/CD or Docker image builds on another machine can make deployments much faster on the live server. [`2:22:17`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=8537) [`2:22:39`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=8559) [`2:22:56`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=8576)
- Pagser creates its own Postgres database and does not reset or damage the Weer database. [`2:23:14`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=8594)
- After `yarn start`, Pagser runs two instances under PM2 and serves on port `3080`. [`2:24:27`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=8667) [`2:24:55`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=8695)
- Login with seeded users works, but forgot-password and registration email flows do not yet work because email sending has not been configured. [`2:24:55`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=8695) [`2:25:13`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=8713)
