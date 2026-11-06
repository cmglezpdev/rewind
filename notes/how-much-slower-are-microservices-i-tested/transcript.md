# How much slower are Microservices? (I tested)

*Arjay McCandless · 12:49 · https://www.youtube.com/watch?v=bhklFv_VRq8*

## 1. Intro

[`0:00`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=0) How much performance do you give up when you split your application into microservices? Specifically, if I take an application running on an eight-core machine and split that off into four two-core machines with the same amount of RAM, how much does our performance decrease? For context, deploying application as a monolith was the norm for a long time. You could run everything on one machine, you could scale vertically or horizontally deploying the same application on two more machines, and this worked well for most people.

[`0:20`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=20) But, development teams grew and microservices started to become popular. Different teams could own different services, you could deploy them separately, you could give more resources to a part of the application that needed more resources. But, there are huge tradeoffs to this. Now, different parts of the application have to communicate over the network through APIs, and I wanted to measure how much this actually costs. So, I built out both versions and tested a couple different configurations. One big server versus four smaller servers, HTTP versus gRPC, and I changed how the services were distributed to see whether allocating the hardware more efficiently could improve the results similarly to what you might do with a production microservice workload.

[`0:49`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=49) And after that, we'll talk about some of the reasons why you might choose microservices anyway, because performance benchmarking doesn't tell you everything. And I'm a little bit under the weather right now, but I just had a DayQuil, some caffeine, and a shower, so this should be my peak hour of the day. But, forgive me if I'm a

## 2. Basics

[`1:02`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=62) little slower today. Let me give you just a little bit more context, and then we'll start getting into the results. First, what is a monolith? A monolith is an application that you build and deploy as one unit. This doesn't mean that all your code is in one file. You could still have separate modules for users, articles, comments, or whatever. When those pieces have clear boundaries inside one application, that's what people mean by a modular monolith. With microservices, these pieces run as separate applications.

[`1:21`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=81) This is a type of architecture that I spent many years working at Amazon on. Each application exposes an interface that other services can call. So, instead of calling a function inside your process, you might send out an API request to another service and wait for the response. And that changes a lot more than just how your code is organized. A function call inside your application doesn't need to manage a network connection and code a request, send it somewhere, and decode the result.

[`1:41`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=101) A service has to do some version of all of that. It can also time out, the other service could be overloaded, it could be running a different version than the one you expected. So, you're introducing a lot of work and coordination that didn't exist before when we go to microservices. For this experiment, I'm

## 3. Setup

[`1:53`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=113) using Conduit, which is a medium-style application. If you saw my last video on Chorus, it's the same application. If not, no worries, I'll explain the setup. In Conduit, you can publish articles, follow people, load your feed, favorite articles, leave comments, and manage your profile. Both versions of this code are written in Go using the standard HTTP library. The monolith handles everything inside one application, and the microservices version has four services: users, profiles, articles, and comments. Each service owns a particular set of tables.

[`2:16`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=136) Users contains user information, profiles owns follows, articles owns article tags and favorites, and comments owns comments. For this experiment, they're all using the same Postgres cluster. Now, if I was a microservice purist, I would say that every microservice needs its own database, and this is how I designed them and deployed them historically. But, here I'm keeping the database infrastructure shared, but enforcing separate ownership of the data. So, each service connects through a separate database role, and the role can only access its own services tables.

[`2:39`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=159) All of these machines and databases are also in the same New York data center, communicating over the private network. So, we're not adding cross-region latency to the experiment in any way. And the reason why this database configuration is fine for the sake of the experiment, even though it's not something you do in production, is that services can't query another user's table. So, the article service can't just query the user's table when it needs an author's name.

[`2:57`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=177) It has to get that information through the other services, and this changes how we fetch the data. In a monolith, we can just join related tables in a query. In the microservices version, some of those joins become service calls and separate queries. We get the same information, but there's a lot more work involved in getting it. So, this is a comparison of the complete implementation. It's not a test where we're running identical SQL and just adding a little bit of network latency.

[`3:16`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=196) Now, I also want to make sure that the microservice version wasn't obviously inefficient. If an article list has 20 authors, we're not making 20 individual requests to fetch them all at once. This is something I see people do with microservices. The internal API accepts batches of IDs. Connections are also reused between requests, login tokens are checked locally, so there's not a separate off call every time somebody loads a page. And services can communicate directly. There is no additional proxy or service mesh between them.

[`3:37`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=217) Every configuration had to pass the same 197 conformance checks through the public API before it's benchmarked, and the recorded response transcripts match the monolith. As far as the

## 4. Hardware

[`3:44`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=224) hardware, each application gets $112 a month of application servers. That either buys you one eight VCPU machine with 16 gigs of RAM, or four two VCPU machines with four gigs each. So, we have the same total virtual CPU count, memory, and application server price. And this was getting super expensive, which is why in my next video I will not be using DigitalOcean because all the infrastructure in this was literally costing more than 1,500 a month when all was said and done.

[`4:06`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=246) And as mentioned in previous videos, these are virtual CPUs on cloud machines. So, I'll call them cores, but they aren't necessarily equivalent to physical cores reserved just for us. Engine X runs on a separate eight-core machine. Postgres runs on a managed 16 VPU cluster. This was the thing that was costing me a ton in this experiment. And these stay the same across tests. And yes, those are outside the $112 application budget. That's just for the application tier.

[`4:26`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=266) It's not the total infrastructure bill. Anyways, virtual users browse articles, open profiles, load comments, and occasionally write something. For this workload, 1,000 users generates roughly 250 to 270 requests per second, and traffic comes from three separate load generator machines. The score is the most users a configuration can handle for 5 minutes while meeting the same criteria as in all my videos. 95% of requests are under half a second, 99% under 1 second, and fewer than 1% of requests failing.

[`4:47`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=287) I start by using shorter tests to roughly find where the limit is, then confirm it with a longer run. So, the score has to hold for the full measurement window of 5 minutes, not just the 2-minute spike. Without

## 5. Monolith

[`4:56`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=296) further ado, let's get into the results starting with the monolith. On the single eight-core machine, it held 60,000 users. That worked out to about 15,400 requests per second. Now, before introducing microservices, I want to check something else. What happens if we take that same monolith and run four copies of it on other machines? So, a horizontally scaled monolith. Engine X distributes requests across the copies, and each copy can handle every endpoint, and they all connect to the same database.

[`5:16`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=316) The four smaller machines held 50,000 users. So, we lost about 17% of the maximum capacity, and we have not split the application into services yet. There are a couple things contributing to that difference. Each machine has its own operating system and networking overhead. The underlying hosts aren't perfectly identical, and one of the smaller machines used more CPU to serve roughly the same amount of traffic as the others. But now we have two baselines. So, 60,000 users on the big machine, 50,000 across the four smaller machines.

[`5:37`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=337) Next, I split the application

## 6. Microservices

[`5:39`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=339) into four services, but kept them on the same machine. I wanted to make this comparison because otherwise we'd be changing two things at once, the application hardware and where everything runs. Here, the services are separate processes, but they're sharing the same eight-core server that the monolith has just used. For internal calls, I started with HTTP and JSON. This configuration held 25,000 users. So, we went from 60,000 to 25,000, still running on the same machine. So, why would that happen?

[`6:00`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=360) Let's walk through a request to get an article. An article service gets the article data, but it also needs information about the author and whether the current user follows them. Then, that that goes through profiles. Profiles that need user information from users. So, we have articles calling profiles, which calls users. These calls are batched, but they're still a chain of work that has to finish before we can return the complete response. And each step has client code and server code with request handling, encoding, decoding, and scheduling.

[`6:20`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=380) Putting the services on the same machine avoids the trip between machines, but it doesn't turn those requests back into ordinary function calls. Now, we can see the additional work in the CPU measurements. The monolith application tier had used about 0.47 milliseconds of CPU per public request. The HTTP microservices used about 1.2 milliseconds, a little over two and a half times the CPU work. And again, CPU time is different from response time. A request might spend more time waiting for another service or the database.

[`6:42`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=402) Here, we're adding up how much CPU the machine actually used serving the traffic. Okay, so what if we

## 7. gRPC

[`6:46`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=406) used a more efficient protocol between the services? I ran the same split with gRPC. The public API still uses HTTP and JSON, only internal communication changes. If you haven't used gRPC, the internal messages use a defined schema and protocol buffers instead of JSON. The transport and encoding machinery are different, which can reduce a lot of the overhead. But, we still have the same services asking each other for information. On the same eight-core machine, gRPC held 29,000 users.

[`7:05`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=425) CPU work dropped to about 1.01 milliseconds per public request. So, it helped, but the communication protocol was only part of the cost. We still have the separate processes, separate requests, and the same dependencies between services.

## 8. Four boxes

[`7:17`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=437) Next, I moved the services onto four smaller machines, one for users, one for profiles, one for articles, and one for comments. Now, we have the services distributed across machines, which is closer to how you might see microservices deployed in production. HTTP held 18,000 users, and gRPC held 19,000. These scores are pretty close. And remember, the replicated monolith on four machines held 50,000. So, I took a look at CPU utilization to see what was going on and if there was something else worth testing.

[`7:38`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=458) In the HTTP run, the articles machine was at roughly 95% CPU utilization, whereas comments were only at 52% with users and profiles somewhere in between. So, we have unused capacity, but it's on the wrong machine. Giving every service due course assumes that the services need roughly the same amount of resources, which is not usually the case for production workloads. And the workload can't use the spare CPU on comments while it's waiting for articles under the current

## 9. Rebalancing

[`7:59`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=479) configuration. This is where the independent scaling benefit of microservices should help. So, I used the measurements and changed the layout. I gave articles a second replica running alongside comments on that machine, and I adjusted how the traffic was distributed. So, I did not add another machine, we're still using the same four two-core servers. With that, HTTP brought us from 18,000 to 20,000 users. A modest improvement, and I ran the same allocation with gRPC, 30,000 users up from 19,000.

[`8:21`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=501) So, allocating services based on measurement load improved gRPC score by roughly 58%, which is pretty nice. Now, it was roughly matching the microservices result on the single big machine, which tells us that a significant part of the earlier loss came from how we divided the hardware between services. But, even after improving the allocation, there was still a substantial gap compared to the monolith at 50,000. In the balanced configuration, the whole application tier used about 0.91 milliseconds of CPU per request with gRPC compared to 1.27 for HTTP.

[`8:46`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=526) So, gRPC reduced measured CPU cost by about 28% in that layout, which explains a lot of the difference, but it doesn't explain every detail of how HTTP behaved under load. Another thing is, in

## 10. Serverless

[`8:55`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=535) production, the traffic mix might change. One feature could get really busy while another one sits mostly unused, and you might be willing to add compute to maintain service times. Serverless is one of the most common ways people do this. Auto-scaled containers or virtual machines can do it, and this is how we deployed all of our applications at Amazon. Completely serverless architecture with API Gateway, Lambda, and DynamoDB. But, microservices don't require serverless, and a monolith can also run on serverless infrastructure.

[`9:17`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=557) But, for sake of argument, let's say we let the server scale beyond the hardware budget in this experiment using a serverless architecture. We can estimate the compute requirement based on what we measured. Let's use 15,000 public requests per second as a target, which is close to the monolith's winning run. The monolith used 0.47 milliseconds of app tier CPU per request. Multiply that by 15,000 per second, and we we seven CPU cores doing work consistently. For the balanced gRPC services, the same calculation gives us about 14 busy cores. For balanced HTTP, about 19.

[`9:41`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=581) If we have 80% utilization as a target to leave some overhead for spikes, that becomes roughly nine cores for the monolith, 17 for gRPC, and 24 for HTTP. So, we could add more server handles to traffic, but we'd be supplying more compute to do the additional work. Of course, these are estimates assuming CPU cost stays roughly the same, we can distribute the load effectively. I haven't benchmarked this, but moving to serverless won't automatically fix all the performance gaps we're seeing here with microservices.

[`10:05`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=605) Of course, it could still change the total cost, especially if we can scale down when traffic drops, but we need to test on an actual platform and find out whether this is cheaper or not. Okay, so what else could

## 11. Optimizations

[`10:13`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=613) we do to make the microservices more performant? I'm not going to test these today, but these are other approaches that I've seen used in industry. First, we could give the services independent database infrastructure, which would let us tune and scale their storage separately. It wouldn't automatically make them faster, but it could give us another thing to control where we might be able to save some time. We could also keep the local copies of data that a service frequently needs instead of fetching it from another service every time, but this is kind of a violation of microservice architecture.

[`10:33`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=633) We could also do something like moving work that doesn't need to finish before the response onto asynchronous events, which could reduce our response time for microservices. And these are all approaches you'll see in production, but they all have consistency and operational trade-offs. For example, if we keep a copy of somebody's profile in another service, now we need a way to update it when that profile changes, and we have to decide what happens when the copies disagree.

[`10:50`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=650) Classic cache invalidation issue. Okay, so why would

## 12. Why bother

[`10:53`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=653) anybody take this big of a performance hit? Our best microservices setup held half as many users as the monolith on the big machine. Compared with the total replicated monolith on four smaller machines, it held 40% fewer. A lot of the answer has to do with the engineers actually building the application. Imagine separate teams responsible for search, billing, and recommendation. The search team wants to ship a change without waiting for a release involving the other two teams.

[`11:11`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=671) With a well-defined service boundary, they can build, test, deploy, and roll back their part independently. Their builds can be smaller and faster, their deployment could be smaller in scope, and their team can choose a language or framework that fits its work without moving the entire application to that stack or introducing those dependencies into everybody else's application. And these types of benefits don't show up on a simple performance benchmark like this. And if they can help a large organization like Amazon, Netflix, or Facebook ship reliably, they can be easily worth that extra infrastructure cost.

[`11:35`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=695) The only caveat is you have to actually get that independence. A lot of the times with production microservice workloads, shipping a feature still requires coordinated change across four services. You update your API, another team has to update its integration, then the rollout involves multiple deployments, and the versions need to remain compatible while that's

## 13. Blast radius

[`11:50`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=710) happening. This also applies to blast radius. If you make a bad deployment to one microservice, it could leave the rest of the application working if the application is designed to tolerate that being unavailable. But in this experiment, something like user information is needed by several other services. Breaking users can affect a lot more than the user management endpoints. So, separate services do create the opportunity for isolation. If you design for it, it's a useful advantage. If you don't, putting the code in another service doesn't give you that protection, and you've tanked your performance for no reason.

[`12:14`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=734) My suspicion

## 14. Takeaway

[`12:15`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=735) is that as smaller teams start taking on more and more work with AI, a modular monolith will become the default starting point for more applications. You can keep the application straightforward to run, avoid a lot of the internal communication overhead, and you can still organize the code in well-defined places. If you want more details on these results, I'll be sending them out in my newsletter this week. The report includes the configuration, CPU measurements, and individual test results.

[`12:32`](https://www.youtube.com/watch?v=bhklFv_VRq8&t=752) Let me know what you guys thought, if these results were as you expected or different. And of course, if you want to see more experiments like this, please like and subscribe. I'm really focused on YouTube right now, and doing these experiments takes a lot of work, and it costs a lot of money. So, I really appreciate you guys watching these videos and letting me know what you want to see next. Thank you, and we'll see you guys next time.
