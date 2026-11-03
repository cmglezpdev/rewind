# Identity

Zero trust security, directory services, identity providers and federation protocols, IAM (policies, users, groups, roles), least privilege, the AWS root user, and AWS SSO.

### Zero Trust Model

- Zero trust = "**trust no one, verify everything**"; malicious actors bypassing conventional access controls show traditional security is no longer sufficient — **identity becomes the primary security perimeter** (the first line of defense protecting cloud resources) [`8:01:02`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28862)
- Old approach was **network-centric**: firewalls and VPNs, treating the office network as the boundary [`8:01:30`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28890)
- Now **identity-centric**: BYOD and remote work mean you can't trust the employee's location; identity controls like MFA grant provisional access based on risk (where/when/what is accessed). Identity-centric *augments* network-centric security, it does not replace it [`8:01:55`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28915), [`8:02:19`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28939)

### Zero Trust on AWS

- Identity security controls available: **IAM** (users, groups, policies), **permission boundaries** (the maximum permissions a user may ever be granted), **Service Control Policies** (organization-wide policies, e.g., deny all activity in the Canada region) [`8:02:48`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28968), [`8:03:13`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28993)
- **IAM policy conditions**: SourceIP (restrict by IP), RequestedRegion, MultiFactorAuthPresent (restrict if MFA off), CurrentTime (restrict by time of day) [`8:03:45`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29025), [`8:04:10`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29050)
- AWS has **no ready-to-use intelligent identity controls**, so AWS is considered not to have a zero-trust offering out of the box — third-party services are needed [`8:04:33`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29073)
- DIY intelligent detection on AWS: API calls flow through **CloudTrail** → feed into **GuardDuty** (intrusion detection/protection detecting suspicious activity) → pass to **Amazon Detective** for analysis and investigation — but this requires expert knowledge [`8:05:21`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29121)
- Third parties with intelligent, real-time risk detection: **Azure Active Directory** (risk from device/app, time, location, MFA, what's accessed), **Google BeyondCorp**, **JumpCloud** — used as the primary directory, connected to AWS via single sign-on [`8:06:11`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29171), [`8:07:18`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29238)

### Directory Services & Active Directory

- A **directory service** maps names of network resources to network addresses; shared infrastructure for locating/managing/organizing resources (volumes, folders, printers, users, groups, devices); each resource is an object with attributes [`8:07:55`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29275), [`8:08:33`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29313)
- Well-known: DNS (the directory service of the internet), Microsoft Active Directory / Azure AD, Apache Directory Service, Oracle Internet Directory, OpenLDAP, Cloud Identity, JumpCloud [`8:08:33`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29313)
- **Active Directory**: introduced in Windows 2000 to manage on-premise infrastructure with a *single identity per user*; hierarchy: multiple domains form a **forest**, domains contain **organizational units**, OUs contain objects (users, printers, computers, servers); domain servers run redundantly [`8:09:17`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29357), [`8:09:45`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29385), [`8:10:07`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29407)

### Identity Providers & Federation

- An **IdP** creates, maintains, and manages identity information for principals and provides authentication to applications (e.g., Facebook, Amazon, Google, Twitter, GitHub, LinkedIn); **federated identity** links a user's identity across multiple identity management systems [`8:10:29`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29429)
- **OpenID** — open, decentralized *authentication* protocol (log in with Google/Facebook): about **who you are** [`8:10:56`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29456)
- **OAuth 2.0** — industry-standard *authorization* protocol; no password sharing, uses authorization tokens: about **granting access to functionality** [`8:10:56`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29456), [`8:11:24`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29484)
- **SAML** (Security Assertion Markup Language) — open standard for exchanging authentication *and* authorization between IdP and service provider; used for **web-browser single sign-on** [`8:11:24`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29484)

### SSO, LDAP, MFA, Security Keys

- **SSO**: log in once with a single ID/password to many systems (e.g., Azure AD + SAML → Slack, AWS, Google Workspace, Salesforce); after the primary login you're never re-prompted for credentials [`8:11:53`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29513), [`8:12:16`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29536)
- **LDAP**: open, vendor-neutral protocol for accessing distributed directory info over IP; central store for usernames/passwords; enables **same sign-on** — one ID/password but entered at every login [`8:12:37`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29557)
- Why LDAP over SSO? Most SSO systems use LDAP under the hood, but LDAP wasn't designed for web apps — some systems only integrate with LDAP [`8:13:11`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29591)
- **MFA**: a second device (e.g., phone) confirms it's you after entering password — protects against stolen passwords; strongly recommended for all AWS accounts, *especially the root account* [`8:13:38`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29618), [`8:14:10`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29650)
- **Security keys** (e.g., YubiKey): memory-stick-like device that generates and autofills a security token on touch; supports FIDO2/U2F; AWS MFA options: virtual MFA device (phone app), U2F security key, other hardware MFA devices [`8:14:38`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29678), [`8:15:01`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29701)

### AWS IAM Components

- IAM creates and manages users, groups, and permissions to allow/deny access to AWS resources [`8:15:54`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29754)
- **IAM policies** — JSON documents granting permissions to users/groups/roles, attached to IAM identities; **permissions** — API actions that can/cannot be performed [`8:15:54`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29754), [`8:16:21`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29781)
- **IAM identities**: users (console/programmatic end users), groups (share permission levels, e.g., admins/developers/auditors), **roles** (grant AWS *resources* permissions to AWS API actions) [`8:16:21`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29781)
- Exam tip: an EC2 instance needing S3 access gets a **role** attached (not a policy directly) [`8:16:48`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29808)

### IAM Policy Structure (JSON)

- **Version** — policy language version (2012 for a long time) [`8:17:36`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29856)
- **Statement** — one or more policy elements; **Sid** — optional statement label [`8:17:36`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29856), [`8:18:05`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29885)
- **Effect** — Allow or Deny; **Action** — e.g., `s3:*`; **Principal** — the account/user/role/federated user allowed or denied; **Resource** — what the action applies to (specific bucket or `*`); **Condition** — e.g., string matching so "all resources" effectively limits to RDS [`8:18:05`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29885), [`8:18:32`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29912), [`8:18:57`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29937)
- You rarely write these by hand — a visual wizard generates them [`8:17:16`](https://www.youtube.com/watch?v=7HKot-brXFE&t=29836)

### Follow-Along: IAM Policy + Role in Practice

- Built a policy allowing S3 ListBucket on a specific bucket ARN, then a **role for EC2** combining it with the Amazon SSM managed policy (the older SSM policy is deprecated — always open and read policies before attaching) [`8:20:11`](https://www.youtube.com/watch?v=7HKot-brXFE&t=30011), [`8:22:09`](https://www.youtube.com/watch?v=7HKot-brXFE&t=30129)
- An **IAM instance profile** holds the role that gives permissions to the instance; forgetting it breaks Sessions Manager connect [`8:24:33`](https://www.youtube.com/watch?v=7HKot-brXFE&t=30273)
- **Reboot rule**: attaching an instance profile for the first time (when none was attached) requires a reboot — the only such case; that's why the instructor always attaches at least the SSM role at launch [`8:25:08`](https://www.youtube.com/watch?v=7HKot-brXFE&t=30308), [`8:25:23`](https://www.youtube.com/watch?v=7HKot-brXFE&t=30323)
- Sessions Manager logs in as `ssm-user`; switch with `sudo su - ec2-user` [`8:26:30`](https://www.youtube.com/watch?v=7HKot-brXFE&t=30390)
- Debugging access denied on `aws s3 ls`: listing often needs more than one permission (e.g., GetObject in addition to ListBucket) — "there's a little bit of an art to creating these policies"; policy changes propagate without rebooting the instance [`8:30:32`](https://www.youtube.com/watch?v=7HKot-brXFE&t=30632), [`8:30:52`](https://www.youtube.com/watch?v=7HKot-brXFE&t=30652)
- Wrote a hand-written explicit **Deny** statement for `s3:GetObject` on one object ARN and confirmed it blocked the download [`8:35:05`](https://www.youtube.com/watch?v=7HKot-brXFE&t=30905), [`8:36:08`](https://www.youtube.com/watch?v=7HKot-brXFE&t=30968)

### Principle of Least Privilege (PoLP)

- PoLP = give a user/role/application the **least permissions** needed to perform an action; two dimensions: **JEA** (Just Enough Access — only the exact actions for the task) and **JIT** (Just In Time — smallest duration; short-lived vs long-lived access keys) [`8:38:53`](https://www.youtube.com/watch?v=7HKot-brXFE&t=31133)
- Most progressive form: **risk-based adaptive policies** — each access attempt generates a risk score from device, location, IP, service, time, MFA, biometrics; **AWS IAM does not have this built in** (Cognito has "adaptive authentication" but only for user pools, not identity pools — user pools = access to your app via IdP, identity pools = access to AWS resources) [`8:39:28`](https://www.youtube.com/watch?v=7HKot-brXFE&t=31168), [`8:39:56`](https://www.youtube.com/watch?v=7HKot-brXFE&t=31196)
- **ConsoleMe** — open-source Netflix project for self-serve, short-lived IAM policies enforcing JEA + JIT [`8:40:50`](https://www.youtube.com/watch?v=7HKot-brXFE&t=31250)

### AWS Root User

- Three concepts: the **AWS account** (holds all resources and users), the **root user** (special full-access user that cannot be deleted), and regular **users** (assigned permissions for common tasks) [`8:41:28`](https://www.youtube.com/watch?v=7HKot-brXFE&t=31288)
- Root user logs in with **email + password**; regular users log in with account ID/alias + username + password [`8:42:13`](https://www.youtube.com/watch?v=7HKot-brXFE&t=31333)
- Root user **cannot be deleted** and its permissions **cannot be limited** by IAM policies — only Service Control Policies at the AWS Organizations level (one level above the account) can restrict a root user; one root user per account [`8:42:13`](https://www.youtube.com/watch?v=7HKot-brXFE&t=31333), [`8:42:37`](https://www.youtube.com/watch?v=7HKot-brXFE&t=31357)
- Never use root for daily tasks; never use root access keys; **turn on MFA for root** [`8:43:02`](https://www.youtube.com/watch?v=7HKot-brXFE&t=31382)
- Root-only tasks (exam-likely): change account settings (name, email, root password/keys), restore revoked IAM admin permissions, activate IAM access to billing console, view certain tax invoices, **close the AWS account**, **change/cancel the support plan**, register as a Reserved Instance Marketplace seller, enable **MFA Delete on S3**, fix an S3 bucket policy with an invalid VPC ID, sign up for GovCloud [`8:43:26`](https://www.youtube.com/watch?v=7HKot-brXFE&t=31406), [`8:43:54`](https://www.youtube.com/watch?v=7HKot-brXFE&t=31434)
- Also root-only (from experience, not the docs list): **creating the AWS Organization** [`8:43:54`](https://www.youtube.com/watch?v=7HKot-brXFE&t=31434)

### AWS Single Sign-On (AWS SSO)

- Create or connect workforce identities **once** and manage access centrally across the AWS organization; identity source: AWS SSO itself, Active Directory, or a SAML 2.0 IdP [`8:44:29`](https://www.youtube.com/watch?v=7HKot-brXFE&t=31469)
- On-premise AD establishes a trust connection to AWS SSO; permissions flow through AWS Organizations / OUs down to resources; single-click access [`8:45:15`](https://www.youtube.com/watch?v=7HKot-brXFE&t=31515)
- Also works for custom SAML-based applications and business cloud apps (Office 365, Dropbox, Slack) [`8:45:50`](https://www.youtube.com/watch?v=7HKot-brXFE&t=31550)
