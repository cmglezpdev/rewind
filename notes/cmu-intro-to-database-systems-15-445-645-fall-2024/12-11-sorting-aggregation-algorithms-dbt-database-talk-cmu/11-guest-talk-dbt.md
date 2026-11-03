# 11 — Guest Talk: Drew from dbt Labs

Speaker: Drew, co-founder of dbt Labs, based in Philadelphia. Presented with an iPad and Apple Pencil [`1:05:39`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=3939). Opening joke: he applied to CMU and did not get in [`1:06:08`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=3968).

## The promise vs the reality of analytics

**The vendor pitch** [`1:06:08`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=3968): extract and load every data source — application logs, payment providers, customer success tools — into a cloud data warehouse as a "single source of truth", which unlocks BI and analytics for the whole organization.

**What actually happens** [`1:06:56`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4016) [`1:07:21`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4041):
- Thousands of tables, some current, some deprecated, plus engineers piling on derived tables and views.
- The canonical artifact: a table named something like `prod.vw_xrf_30d_v2_john` — mission-critical, powering dashboards and operational tasks, and **nobody knows who John is** because he left ten years ago. Nobody dares touch it.
- Drew's term for the collection: "an fton of tables" [`1:07:21`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4041).

## The five problems

1. **No data lineage** — you can't tell where data came from, so you can't trust it [`1:07:56`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4076).
2. **No documentation** — just tables in a warehouse; you can't reuse them or know if they'll change or vanish [`1:07:56`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4076).
3. **No deployment process** — tables and views are created ad hoc, so **everyone develops in prod**, breaks prod, and struggles to undo it [`1:07:56`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4076).
4. **No quality assurance** — "except crossing your fingers." You break dashboards, and the CEO notices [`1:08:46`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4126).
5. **Fragmented business logic** — the definition of something like *daily active user* is spread across hundreds or thousands of tables and centralized nowhere [`1:08:46`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4126) [`1:09:17`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4157).

## The five prescriptions

| Practice | Why | Reference |
|---|---|---|
| **Version control your transformations** | Makes business logic viewable and changeable as the business evolves | [`1:09:17`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4157) |
| **Visualize data lineage** | Understand data flow; know whether a metric came from Zendesk or a Google Sheet someone sent to 47 customers last year | [`1:09:51`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4191) [`1:10:10`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4210) |
| **CI/CD** | Test on PR, auto-deploy on merge — and **develop in dev, not in prod** | [`1:10:10`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4210) |
| **Automated tests** | Find out data is broken before the CEO does | [`1:10:45`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4245) |
| **Document datasets** | Lets others build on your work instead of rebuilding it | [`1:10:45`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4245) |

Framing thesis: **bring software engineering best practices to data teams** — obvious to a CS audience, but "usually not the case out in the real world" [`1:15:04`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4504).

## How dbt implements each of these

- **Lineage graph** [`1:11:27`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4287) [`1:12:04`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4324): source tables loaded by Fivetran from Stripe land in Snowflake; blue nodes are stacked transformations. Each node shows metadata such as where the table lives in the database (e.g. `dim_stripe_customers`).
- **Version control** [`1:12:04`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4324) [`1:12:27`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4347): SQL files in a GitHub repo, mostly plain `SELECT` statements and CTEs. The one difference from pure SQL is the **Jinja templating language** — a `ref`/`source` reference to another table. **Lineage is inferred automatically from those references**; you never define it by hand.
- **Automated testing** [`1:13:00`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4380) [`1:13:26`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4406) [`1:14:08`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4448):
  - Key fact: **Snowflake and most commercial data warehouses do not enforce uniqueness or not-null constraints** — they only use them to optimize queries. Nothing stops nulls or duplicate "primary keys".
  - dbt lets you *assert* `unique` and `not_null` on, e.g., `subscription_id` on `dim_stripe_subscriptions`, and checks them for you.
  - If your transformation logic or an upstream Stripe feed violates the constraint, you get an alert — before the CEO's dashboard fails.
- **dbt Cloud IDE** [`1:14:08`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4448) [`1:14:45`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4485): SaaS environment to build models, run tests, preview query results, and manage/commit files with Git and GitHub — a one-stop shop for developing a dbt project in dev rather than prod.

## Q&A: are the tests expensive?

- **Drew**: yes, they can be. "We run the queries that you tell us to run" — so an inefficient query is an expensive query, and the same `SELECT *` on a billion rows caveat from the lecture applies. dbt Cloud ships cost-optimization features, e.g. **only checking the last seven days of data** for uniqueness/not-null instead of re-verifying already-checked history [`1:15:23`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4523) [`1:16:06`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4566).
- **Andy's blunter version**: dbt isn't hosting the data — it's your Snowflake bill, you control it [`1:16:06`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4566).
- **Drew's cost justification**: fat-finger mistakes and bad data have cost companies millions and billions of dollars, so the compute is worth paying for [`1:16:28`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4588).

## Closing anecdote

- Worst table name Andy ever saw: a database with `table1`, `table2`, `table3`, plus `table1_real` and `table1_old` — and **the production one was `table1_old`** [`1:16:43`](https://www.youtube.com/watch?v=mM3sFwSuGNY&t=4603).
