# Getting Started

Hands-on account setup: creating an AWS account, IAM users and groups, regions, and protecting yourself against surprise bills with Budgets, Free Tier alerts, CloudWatch billing alarms, and MFA on the root user.

### Creating an AWS account

- Sign up at aws.amazon.com; a **credit card is required** — what you create is the **root account** [`44:28`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2668)
- Use an email accessible to your whole team for the root account (e.g., a shared `accounts@` address) [`44:28`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2668) [`44:55`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2695)
- Signup can occasionally get stuck on credit-card verification, requiring a support ticket; prepaid cards sometimes work depending on your country [`44:55`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2695) [`45:21`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2721)

### IAM users and groups (don't use root)

- After account creation, do NOT keep using the root account — create an IAM user for daily console login (IAM = Identity Access Management) [`45:39`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2739) [`46:07`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2767)
- When creating the user, enable console access; an auto-generated password with "must create a new password on next sign-in" is a good default [`46:30`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2790)
- Create an **admin group** with the AdministratorAccess policy — the most permissive; give it only to yourself/most-trusted people [`46:46`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2806)
- Next level down is **Power User** (no access to billing and account-level info) — use it when admin access is too much [`47:13`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2833)
- Set an **account alias** in IAM so you can sign in with a memorable name instead of the numeric account ID [`48:13`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2893)
- Root user (email login) is the highest level of access — reserve it for the few operations that specifically require it; sign in as an IAM user (account alias + username + password) for everything else [`48:58`](https://www.youtube.com/watch?v=7HKot-brXFE&t=2938)
- After first IAM login, set up **MFA** for that user too [`50:25`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3025)

### Regions

- The region selector is in the top-right of the console; the default region is based on your locality [`50:46`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3046) [`51:15`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3075)
- Recommendation: run follow-alongs in **us-east-1 (N. Virginia)** — it's the original region, has the most service availability, and some services (e.g., billing/cost) only show up there [`51:15`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3075)
- Some services are **global** (no region selection), e.g., CloudFront and S3's console; others like **EC2 are region-scoped** [`51:58`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3118) [`52:20`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3140)
- If resources "disappear" during a follow-along, check that the region hasn't switched on you [`52:41`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3161)

### Metered billing and the risk of surprise bills

- AWS uses **metered billing** (per hour/second, many factors) rather than fixed cost — cheaper, but a forgotten or misconfigured expensive service can generate a huge bill fast [`52:41`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3161) [`53:06`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3186)
- Real example: ElastiCache (Memcached/Redis) defaults the node type to **cache.r6g.large** — ~$0.02/hour × 730 hours/month ≈ **$150/month** for storing a single value [`53:37`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3217) [`54:07`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3247) [`55:13`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3313)
- Instructor once got a ~$3,000 USD bill this way; older services can have "weird defaults" — always check instance sizes before creating [`54:34`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3274) [`55:41`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3341)
- **One free pass**: open a billing support case explaining the accidental misspend — AWS generally forgives a first-time mistake, then tells you to set up billing alerts [`56:16`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3376) [`56:48`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3408)

### AWS Budgets

- Type "budget" in the console search to reach the billing dashboard [`57:12`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3432)
- The **first two budgets are free**; read the fine print — budget reports cost extra, and historically actions-enabled budgets incurred $0.10/day after the first two free action-enabled budgets [`57:35`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3455) [`57:59`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3479)
- Create a **cost budget**; period can be daily/monthly/quarterly/annually — daily loses forecasting; recurring monthly with a fixed amount is recommended; filters can scope by region etc. [`58:20`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3500) [`58:41`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3521)
- Add an alert at a threshold (e.g., 80% or an absolute value) with email recipients — under the hood it uses **Amazon SNS** [`59:04`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3544) [`59:35`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3575)
- Budgets can also attach follow-up actions (requires specific IAM permissions); the dashboard shows amount used, forecasted amount, and forecast vs budget [`1:00:05`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3605) [`1:00:33`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3633)
- Many AWS services email you alerts through SNS — remember what SNS is for [`1:01:08`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3668)

### Free tier

- The free tier applies for the **first 12 months** of a new account, letting you use services without cost — use it while learning [`1:01:31`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3691)
- Example: **750 hours** of EC2/RDS — with stipulations like t2/t3.micro on Linux/Red Hat; some services are only free for the first two months, so read the fine print per service [`1:01:58`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3718)
- Track it: Billing → **Billing preferences** → enable "Receive free tier usage alerts" (with your email) and also check "Receive billing alerts" (needed for CloudWatch billing alarms) [`1:02:44`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3764) [`1:03:07`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3787)
- The billing dashboard shows a free-tier usage panel warning when you approach/exceed limits [`1:03:36`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3816)

### CloudWatch billing alarms (the older, more flexible way)

- Billing alarms predate Budgets and offer more flexibility, so it's worth using both [`1:04:11`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3851) [`1:08:38`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4118)
- CloudWatch is a collection of services: CloudWatch Alarms, CloudWatch Logs, CloudWatch Metrics [`1:04:42`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3882)
- Free tier: **10 free alarms and 1,000 free email notifications per month** [`1:05:30`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3930)
- Create alarm → choose metric → Billing → **Total estimated charge** (USD only) → set a static threshold (e.g., $50) [`1:05:51`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3951) [`1:06:50`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4010)
- Advantage over Budgets: **anomaly detection** — alarms when spend exits an expected band rather than crossing a fixed value [`1:06:19`](https://www.youtube.com/watch?v=7HKot-brXFE&t=3979)
- When the alarm enters the "in alarm" state it triggers an **SNS topic**; the email subscription must be confirmed via the link AWS sends ("pending confirmation" until then) [`1:07:14`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4034) [`1:07:45`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4065)
- Alarms can also trigger auto-scaling actions, EC2 actions (e.g., shut down servers when cost is too high), or Systems Manager actions; unlike Budgets, billing alarms have no forecasting [`1:08:12`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4092) [`1:08:38`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4118)

### MFA on the root user

- One of AWS's strongest recommendations: set **MFA on the root user** [`1:08:38`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4118)
- Log in as root → IAM dashboard → "Add MFA"; options: **virtual MFA device, U2F security key, other hardware token** (e.g., Gemalto) [`1:09:03`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4143) [`1:09:53`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4193)
- A physical security key (e.g., YubiKey) is the easiest — just press its button when logging in [`1:10:20`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4220) [`1:13:47`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4427)
- Virtual MFA apps suggested: Google Authenticator, Microsoft Authenticator, Authy (nicest UI), LastPass, Duo Mobile [`1:11:02`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4262)
- Setup: scan the QR code with the app, then enter **two consecutive MFA codes** (the current code, then wait for the timer and enter the next one) [`1:11:31`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4291) [`1:12:14`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4334) [`1:12:53`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4373)
- After enabling, every root login requires email + password + MFA code [`1:13:20`](https://www.youtube.com/watch?v=7HKot-brXFE&t=4400)
