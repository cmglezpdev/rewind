# EC2 Pricing Models

The five ways to pay for EC2 — On-Demand, Spot, Reserved Instances, Dedicated, and Savings Plans — with deep dives into RI classes, attributes, scopes, limits, and the RI Marketplace.

### The Five Pricing Models (summary)

| Model | Savings | Best for |
|---|---|---|
| On-Demand | Baseline (pay as you go) | Short-term, spiky, unpredictable workloads; first-time apps; least commitment [`7:42:04`](https://www.youtube.com/watch?v=7HKot-brXFE&t=27724) |
| Spot | Up to **90%** (greatest savings) | Interruptible, non-critical background jobs; scientific computing [`7:42:28`](https://www.youtube.com/watch?v=7HKot-brXFE&t=27748) |
| Reserved | Up to **75%** | Steady-state/predictable usage; 1 or 3-year commitment; best long-term savings; resellable [`7:43:18`](https://www.youtube.com/watch?v=7HKot-brXFE&t=27798) |
| Dedicated | Most expensive | Guaranteed isolated hardware for enterprise requirements; technically not a pricing model — combines with On-Demand/Reserved/Spot [`7:43:18`](https://www.youtube.com/watch?v=7HKot-brXFE&t=27798) |
| Savings Plans | Up to 72% | RI-like savings with a simplified purchase process [`7:59:09`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28749) |

### On-Demand

- Default pricing when you launch an instance; no upfront payment, no long-term commitment; **charged per second with a 60-second minimum**, or per hour [`7:44:17`](https://www.youtube.com/watch?v=7HKot-brXFE&t=27857)
- Per-second billing applies to Linux, Windows, and Windows-with-SQL instances *without a separate hourly charge*; everything else bills per hour [`7:44:17`](https://www.youtube.com/watch?v=7HKot-brXFE&t=27857)
- Pricing pages always show the **hourly** rate even when per-second billing applies; the bill shows seconds [`7:44:50`](https://www.youtube.com/watch?v=7HKot-brXFE&t=27890)
- Experiment on on-demand with new apps; once the yearly workload is known, move to reserved [`7:45:18`](https://www.youtube.com/watch?v=7HKot-brXFE&t=27918)

### Reserved Instances (RIs)

Designed for steady-state, predictable usage or reserved capacity; savings formula = **term × class offering × payment option** (+ RI attributes) [`7:45:50`](https://www.youtube.com/watch?v=7HKot-brXFE&t=27950), [`7:46:18`](https://www.youtube.com/watch?v=7HKot-brXFE&t=27978)

- **Term** — 1-year or 3-year; longer term = greater savings; **RIs do not auto-renew** — at expiry instances revert to on-demand with no service interruption [`7:46:41`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28001)
- **Class offering** — less flexible = greater savings:
  - Standard: up to **75%** off on-demand; can *modify* some RI attributes [`7:47:07`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28027)
  - Convertible: up to **54%** off; can *exchange* for RIs of equal or greater value [`7:47:25`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28045)
  - Scheduled: **retired** — no longer offered [`7:47:25`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28045)
- **Payment options** — greater upfront = greater savings: All Upfront, Partial Upfront, No Upfront (discounted hourly rate billed every hour of the term whether used or not) [`7:47:48`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28068)
- RIs can be **shared between accounts in an organization**; unused RIs can be sold on the RI Marketplace [`7:48:14`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28094)

### RI Attributes

Four attributes (limited by class offering) affecting final price [`7:49:01`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28141):
1. **Instance type** (family + size, e.g., m4.large)
2. **Region** where purchased [`7:49:25`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28165)
3. **Tenancy** — shared (default/multi-tenant) or dedicated (single-tenant)
4. **Platform** — Windows or Linux

### Regional vs Zonal RIs

Scope choice does **not affect price**, only flexibility [`7:49:57`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28197):

| | Regional RI | Zonal RI |
|---|---|---|
| Reserves capacity | **No** — no guarantee servers are available | **Yes** — guaranteed [`7:50:23`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28223) |
| AZ flexibility | Any AZ in the region | Only that AZ [`7:50:23`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28223) |
| Instance size flexibility | Discount applies to any size in the family | None — exactly what you defined [`7:50:52`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28252) |
| Queue purchases | Yes | No [`7:50:52`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28252) |

### RI Limits

- Per month you can buy **20 regional RIs per region** and **20 zonal RIs per AZ** (a region with 3 AZs → 60 zonal RIs) [`7:51:12`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28272)
- Regional RIs **cannot exceed** your running on-demand instance limit (default 20) — raise the on-demand limit first if needed [`7:51:42`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28302)
- Zonal RIs **can exceed** the on-demand limit: 20 on-demand + 20 zonal RIs lets you launch 20 more matching instances [`7:51:42`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28302)

### Capacity Reservation

- AZs have finite hardware per instance type/family; if demand exhausts it, you can't launch [`7:52:12`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28332)
- Capacity Reservations reserve an instance type in a specific region/AZ; **charged at the on-demand rate whether an instance runs in it or not**; combine with regional RIs for billing discounts [`7:53:13`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28393)

### Standard vs Convertible RI

- Standard: **modify** attributes — change AZ within region, scope (zonal↔regional), instance size (Linux, default tenancy only), network (EC2-Classic↔VPC); cannot exchange; **can be bought/sold on the RI Marketplace** [`7:53:36`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28416)
- Convertible: no modification — you **exchange** during the term for another convertible RI with new attributes (family, type, platform, scope, tenancy); **cannot be sold/bought on the marketplace** [`7:54:00`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28440)

### Reserved Instance Marketplace

- Sell unused *standard* RIs to recoup spend; RIs must have been **active ≥ 30 days** and AWS must have received the upfront payment; a **US bank account** is required; ≥ 1 month must remain on the term [`7:54:43`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28483)
- You keep pricing/capacity benefits until sold; company name/address shared with buyer for tax purposes; seller sets **only the upfront price** (usage price and config stay fixed); term rounds *down* to the nearest month (9 months 15 days → listed as 9 months) [`7:55:06`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28506)
- Sale limit: **$20,000 USD per year**; GovCloud RIs cannot be sold [`7:55:31`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28531)

### Spot Instances

- AWS sells unused capacity to maximize idle-server utility (like hotels/airlines discounting vacant rooms/seats); **up to 90% off on-demand** [`7:55:59`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28559)
- Instances can be terminated when capacity is needed by on-demand customers (though reportedly rare); for flexible start/end times or workloads only feasible at very low compute cost [`7:55:59`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28559), [`7:56:27`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28587)
- **AWS Batch** is a simpler service for batch processing commonly used with spot [`7:56:27`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28587)
- Billing on termination: if **AWS** terminates your instance you are not charged for the partial hour; if **you** terminate it, you're charged for the hour it ran [`7:56:27`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28587)

### Dedicated Instances / Hosts

- Dedicated instances help meet **regulatory requirements**; dedicated hosts serve strict server-bound licensing that won't support multi-tenancy [`7:57:18`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28638)
- Multi-tenancy = everyone in the same apartment (customers separated by virtual isolation on shared hardware); single-tenancy = everyone owns their house (physical separation) [`7:57:18`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28638), [`7:57:49`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28669)
- Dedicated can be combined with **on-demand, reserved, and even spot** pricing; chosen via the tenancy dropdown at launch (shared / dedicated instance / dedicated host) [`7:58:13`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28693), [`7:58:42`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28722)

### AWS Savings Plans

- Like RIs but with a **simplified purchase**: pick a plan type, a 1- or 3-year term, a payment option (all/partial/no upfront), and an hourly commitment — no standard-vs-convertible or regional-vs-zonal decisions [`7:59:09`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28749), [`7:59:30`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28770)
- Three types [`7:59:55`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28795):
  - **Compute Savings Plan** — most flexible, up to **66%** off; applies to EC2, Fargate, and Lambda regardless of family, size, AZ, region, OS, tenancy
  - **EC2 Instance Savings Plan** — lowest prices, up to **72%** off; commit to an instance family in a region (flexible across sizes/OS/tenancy within it)
  - **SageMaker Savings Plan** — up to **64%** off SageMaker (AWS's ML service) usage [`8:00:28`](https://www.youtube.com/watch?v=7HKot-brXFE&t=28828)
