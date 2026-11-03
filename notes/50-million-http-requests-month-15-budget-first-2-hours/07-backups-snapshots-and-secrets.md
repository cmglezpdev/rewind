# Backups, snapshots, and secrets

## Cost during breaks

- The running `T4G.small` setup is estimated around $15/month plus tax, with prices to be verified in the AWS calculator for the viewer's region. [`1:22:17`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4937) [`1:22:26`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4946)
- Stopping the instance removes the instance runtime cost but leaves EBS storage charges. [`1:22:55`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4975)
- With 25 GB of gp3 EBS storage, stopping the machine was estimated around $2/month for storage. [`1:23:17`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=4997) [`1:23:34`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5014)
- Taking a snapshot/AMI and terminating the machine can reduce the cost further; a 12 GB snapshot was estimated around $0.60/month at $0.05/GB-month. [`1:26:16`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5176) [`1:31:58`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5518)

## AMI and snapshot recovery

- An AMI is Amazon's machine image metadata, while the associated snapshot is the storage artifact that costs money. [`1:25:12`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5112) [`1:25:31`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5131)
- Creating an AMI from the instance captures the current disk state and can reboot the instance. [`1:24:32`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5072) [`1:24:52`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5092)
- The speaker demonstrates deleting the project and damaging the OS, then launching a new instance from the AMI. [`1:27:32`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5252) [`1:28:06`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5286) [`1:29:10`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5350)
- Restoring from the AMI requires selecting the AMI, choosing the instance type, selecting the key pair, selecting the security group, and updating the local SSH config to the new host name. [`1:29:10`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5350) [`1:29:32`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5372) [`1:30:20`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5420)
- After restore, the project and dependencies are still present, so `yarn start` can bring Weer back without reinstalling everything. [`1:31:11`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5471) [`1:31:34`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5494)

## Snapshot billing caveat

- Archived snapshots can reduce storage cost further, but retrieval has a separate per-GB cost. [`1:32:19`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5539) [`1:33:43`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5623)
- Snapshot size tracks written blocks, not simply current filesystem usage. [`1:34:21`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5661)
- A disk that is currently using 5 GB can still produce a much larger snapshot if a large file was written and deleted before the snapshot. [`1:34:38`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5678) [`1:34:56`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5696)
- Heavy disk writes, uploads, or swapping can increase future snapshot size even when the files are later removed. [`1:35:41`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5741) [`1:35:56`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5756)

## Secret-management problem

- High availability eventually requires terminating and respawning a machine without manually SSHing in or recreating `.env` files. [`1:36:39`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5799) [`1:36:55`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5815)
- Manual `.env` creation is a blocker for automated redeployments. [`1:37:15`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5835) [`1:37:31`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5851)
- AWS Systems Manager Parameter Store is introduced as the secrets vault, with standard parameters described as free in the pricing page at recording time. [`1:38:14`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5894) [`1:39:11`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5951) [`1:39:36`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=5976)
- Standard parameters can store up to 10,000 values, each up to 4 KB. [`1:40:28`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=6028)
- Parameter names are structured by application, stage, and variable name, such as `weer/prod/<name>`. [`1:40:11`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=6011)

## IAM role access

- The AWS CLI can read a parameter from the local machine with `ssm get-parameter`, but the EC2 machine needs both AWS CLI installed and credentials. [`1:41:34`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=6094) [`1:42:20`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=6140) [`1:43:23`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=6203)
- IAM roles are introduced as key cards assigned to services, allowing EC2 to access only specific AWS services. [`1:44:33`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=6273) [`1:44:50`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=6290)
- The role is created for EC2 and attached to the instance through Modify IAM Role. [`1:45:30`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=6330) [`1:46:18`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=6378)
- The speaker warns not to give the public-facing instance admin access, because compromise could let an attacker launch resources, disable alerts, and create very large bills. [`1:46:47`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=6407) [`1:47:24`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=6444)
- Public-facing servers are attacked constantly; the speaker shows logs with repeated attempts to read `.env`, AWS config, and credentials files. [`1:47:41`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=6461) [`1:48:02`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=6482) [`1:48:16`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=6496)
- The selected permission allows reading parameters by path, enabling `get-parameters-by-path` for values under the application prefix. [`1:49:05`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=6545) [`1:50:08`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=6608)
- IAM policies can be restricted further by resource path, such as permitting only `weer/prod` parameters. [`1:51:30`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=6690) [`1:51:49`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=6709)

## Weer secrets in Parameter Store

- The Weer parameters include port, domain, Google client ID, Google client secret, cookie key, Redis URL, database fields, and database password. [`1:53:48`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=6828) [`1:54:11`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=6851) [`1:55:30`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=6930)
- Sensitive values such as Google client secret, cookie key, and database password are stored as SecureString values encrypted with KMS. [`1:54:35`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=6875) [`1:54:57`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=6897) [`1:55:30`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=6930)
- Once parameters are created, the local `.env` file can be removed and Weer can read its production environment from Parameter Store. [`1:56:25`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=6985) [`1:56:40`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7000) [`1:57:05`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7025)
- After deleting and recloning the application, the setup succeeds without manually rebuilding `.env` because the seed/start scripts read values from Parameter Store. [`1:57:28`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7048) [`1:57:57`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7077)
- Additional EC2 machines can use the same setup by attaching the same IAM role. [`1:58:32`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7112)
- Environment variables are inherited by child processes, so untrusted spawned tools should receive a cleared or overwritten environment. [`1:58:48`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7128) [`1:59:52`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=7192)
