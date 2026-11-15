# Twitch and the product-platform relationship

## Career context

- Theo worked at Twitch from 2017 to 2021. He focuses on roughly 2019–2021 to explain how platform work shaped his current approach. [`6:12`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=372)
- After work on Elixir video infrastructure and a difficult move to the Go VOD team, a manager encouraged him to try React and TypeScript. React Hooks appealed to his functional-programming background. [`7:14`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=434) [`7:36`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=456)
- Twitch's move from Ember and Rails toward Go, GraphQL, React, and TypeScript gave him an opportunity to help adopt a new architecture. [`8:30`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=510)

## Division of responsibility

1. Product teams owned particular user-facing areas, such as chat, creator dashboard, and moderation tools. Ownership covered their relevant backend, database, and client work. [`9:26`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=566) [`9:50`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=590) [`10:14`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=614)
2. Platform teams maintained shared capabilities so product teams did not each have to build scalable infrastructure. Browser clients maintained web repositories and related clients; the GraphQL edge handled the user-facing API. [`10:57`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=657) [`11:18`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=678)
3. The GraphQL edge delegated requests to smaller services owned by different teams. Database and video infrastructure also had platform teams. This structure required an ongoing relationship between product builders and platform owners. [`11:45`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=705)

## Working across the boundary

- Theo remained formally on product teams while participating in platform work, including browser clients' weekly planning. This let product needs inform the shared development environment. [`12:10`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=730)
- An internal safety-tools repository had about 300 users rather than the main site's millions. He used it to try ideas, then brought promising results to browser clients for possible wider adoption. [`13:55`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=835) [`14:24`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=864)
- His preferred relationship was reciprocal: platform improvements should help real products, and product work should expose where platforms need to improve. [`15:04`](https://www.youtube.com/watch?v=GtJKFhztgdM&t=904)
