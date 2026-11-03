# Boat sandboxes, snapshots, and parallel validation

## What Boat provides in this workflow

- Theo uses Boat at boat.dev for disposable VMs agents can provision through a terminal. He says the reduced blocking made him burn through Claude accounts four times faster. [`26:49`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1609) [`27:12`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1632)
- He discloses that he invested in Boat. His praise and reported results should be read with that relationship in mind. [`30:42`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1842)
- The video describes a subscription controlling concurrent sandboxes and start-rate limits, plus separate usage charges once machines run. Theo progressed through $20, $100, and $500 plans and considered $2,000. These are the video's prices. [`27:51`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1671)

## Commands demonstrated

These are the actions described in the transcript, not a complete installation or authentication guide.

- `boat` shows the available CLI actions; `boat limits` shows the account's limits. [`27:26`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1646)
- `boat new` creates a sandbox, `boat ssh` connects, and `boat desktop` opens a Linux desktop with browsers and terminals. [`28:19`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1699)
- Theo demonstrates stopping a sandbox by ID, but the transcript renders the command as "Vote stop ID." It does not reliably preserve the exact syntax. He also says he does not think these desktops have GPU acceleration. [`28:47`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1727)

## Snapshot once, validate many changes

1. Clone the repository, download dependencies, build once, and prepare the environment. [`29:14`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1754)
2. Snapshot that prepared machine. Start copies of the snapshot when other agents need compute, avoiding repeated full setup. [`29:14`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1754)
3. Apply each agent's changes on top of the prepared snapshot and run its validation work. [`29:42`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1782)

## Reported validation results

- Before Boat, Lust agents shared four build slots on a VPS. Validation gates took 40–70 minutes under load, sometimes longer; throughput was about 70 changes per day and roughly two changes per package per day. [`29:42`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1782)
- With on-demand boxes, Theo reports a gate dropping from 70 minutes to 353 seconds, about six minutes. He says code landed at more than twice the daily rate, closer to three times. [`30:11`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1811)
- He positions Boat for variable, temporary workloads. Buying permanent capacity for peak agent demand can waste money during quiet periods; buying for average demand leaves agents blocked at peaks. [`30:42`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1842) [`31:32`](https://www.youtube.com/watch?v=NBCM_ZoWZo8&t=1892)
