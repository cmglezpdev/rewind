# The Real Reason Discord Left Cassandra

*ByteMonk · 19:40 · https://www.youtube.com/watch?v=X4iAQkjtx5k*

## 1. The 20-Second Message

[`0:00`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=0) Imagine opening a Discord channel and waiting 20-seconds for a single message to load. One message, 20-seconds. Now, here's the strange part. >> [music] >> At that exact moment, Discord was already serving billions of messages a day across the rest of the app without any trouble. So, how does a system that handles billions of messages choke on a single one? That gap is the whole story. The problem was never the message you could see. >> [music] >> It was everything sitting behind it that you could not.

[`0:25`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=25) So, today we are going to walk through how Discord stores messages. We start from their first database, see why it broke, see why the next one broke, too. And then, how they reached a setup that now holds trillions of messages. Along the way, you'll pick up system design thinking that applies to almost any large app you'll build.

[`0:44`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=44) Let's get into it.

## 2. Why Storing Chat Messages Is Hard

[`0:51`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=51) First, let's build some intuition. Why is storing chat messages even a hard problem? On the surface, it looks simple. A message has a sender, some text, a timestamp, and the channel it belongs to. You just save it in a table. Done. What's the big deal? The big deal is the scale and the access pattern. Think about what a chat app actually has to do.

[`1:12`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=72) Every time you open a channel, the app has to fetch the most recent messages instantly. When you scroll up, it has to pull older messages in order going back in time. People are sending new messages every second. People are editing and deleting old ones. And this is happening across millions of channels at the same time. So, you are not storing data once and forgetting it.

[`1:32`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=92) You're constantly reading it, writing it, and reading it again from every direction. And that is what makes it hard. And here's the key idea for the whole video. The database you choose has to match the way your data is read and written. If your access pattern and your database design do not match, it works fine in the beginning. Then, it slowly falls apart as you grow.

## 3. MongoDB: Discord's First Database

[`1:53`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=113) And that mismatch is the core problem in the story. And it shows up again and again. >> [snorts] >> Discord launched in 2015. The team was small and they needed to move fast. So, they picked MongoDB, which is document database. And honestly, it was a smart choice for that stage. MongoDB let them change their data shape quickly without a lot of ceremony, which is exactly what you want when your product is still finding its feet. They stored messages with an index on two things: the channel ID and the time the message was created.

[`2:20`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=140) That way they could ask, "Give me the recent messages in this channel." And would answer. This worked well for about 6 months.

## 4. Why MongoDB Broke at Scale

[`2:29`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=149) Then they hit 100 million messages and the cracks appeared. Here is what went wrong in plain terms. A database is fast when the data it needs is sitting in memory, in RAM. RAM is quick, but once your data plus its index grow too big to fit in a RAM, the database has to go to disk. And disk is slow, much slower. Now, normally you would say, "Fine.

[`2:48`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=168) Just keep the popular data in memory and let the old stuff sit on disk."The system does this caching for you. But Discord had a problem. Their reads were random, wildly random. Let me explain why. Discord had very different kind of servers. Some servers were voice heavy with barely any messages. Some were small private friend groups with a moderate amount of chat.

[`3:10`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=190) And some were huge public communities with millions of messages. The reading pattern across all of these was all over the place. People were jumping into old channels, scrolling into year-old history, opening dead servers. There was no need hot data versus cold data split that the cache could rely on. So, the cache kept missing and every cache miss meant a trip to disk. And disk was slow. The result was unpredictable latency. Sometimes fast, sometimes painfully slow with no pattern you could fix.

[`3:40`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=220) Discord actually saw this coming. From day one, they had decided not to depend on MongoDB sharding to save them. Now, quick note for anyone newer. Sharding just means splitting your data across many machines so no single machine holds everything. Discord felt sharding at that time was fiddly and not stable enough to trust with their core data.

[`3:59`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=239) So, instead of patching a system they did not believe in, they moved. And because they had planned for it, switching was possible. MongoDB was not a bad database. It was a bad match for Discord's access pattern at scale. Right tool, but for the wrong job.

## 5. The Wishlist That Led to Cassandra

[`4:14`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=254) The MongoDB chapter was over. Discord needed something fundamentally different. They sat down and wrote a wish list. Five requirements: scale easily just by adding machines, survive failures on its own, so nobody gets paged at 3:00 in the morning. Need very little babysitting.

[`4:31`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=271) Be battle tested at massive scale, not experimental. And most importantly, be predictable. Now, that last one matters more than it sounds. They wanted to be consistent. A database that is fast most of the time, but randomly slow, is harder to live with than one that is steady. And when they checked everything on this list, one database ticked all the boxes. Apache Cassandra.

[`4:55`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=295) Big names were already running thousands of Cassandra nodes in production. It scaled, it self-healed, and it was open source. It's a fit. There's a lesson here. Before you pick any technology, write the wish list first. Decide what you actually need. Then go

## 6. The Partition Key Decision

[`5:10`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=310) find the tool. Most teams do it backwards. They fall in love with a tool and then try to justify it. Discord's next design decision looked perfectly reasonable at the time. Years later, it would create one of their biggest scaling headaches. That decision was about something called the partition key.

[`5:26`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=326) Let me build it up slowly, because if you get this one idea, the rest of the video is super easy. In Cassandra, your data is spread across many machines. The partition key is the thing that decides which machine your data lands on. Same partition key, same home. Data with same partition key gets stored together on the same node.

[`5:43`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=343) So, the choice of partition key is everything. Pick well and your data is spread out nicely and your reads are fast. Pick badly and you create a traffic jam on one machine while the others sit idle. Discord's first instinct was simple. Use the channel ID as the partition key. All messages of the channel live together. Makes sense, right? When you open a channel, you want all its messages.

[`6:05`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=365) So, storing them together sounds perfect. But then there was a catch. Some channels never die. A big public channel can collect messages for years. If all of its channel's messages live in one partition, that partition just keeps growing and growing with no

## 7. Buckets and Snowflake IDs

[`6:20`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=380) limit. And a giant partition becomes a heavy, slow thing that the database struggles to manage. So, Discord added a clever twist. They combined the channel ID with a time bucket. A bucket is just a window of time, roughly 10 days of messages. So, the partition key became the channel ID plus the bucket.

[`6:35`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=395) Think about what it does. Instead of one endless partition per channel, you now get a fresh partition every 10 days. Each one stays a sensible size. And because of how messages are stored, newest first, sorted by time, fetching recent messages is fast. And scrolling back through history just means walking back through the bucket one by one. Now, one more nice detail. Discord used something called snowflake IDs for their messages.

[`6:59`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=419) The useful thing about these IDs is the time is baked right into them. So, the ID itself tells

## 8. Cassandra's Golden Era

[`7:06`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=426) you when the message was created. Which makes sorting by time and jumping to the right bucket very natural. And the results were great. Writes finished in under 10 milliseconds. Reads came back in under 5 milliseconds. By early 2017, they were running this on just 12 machines. Handling over 120 million messages a day. With a team of just four engineers looking after the whole thing. That is a very efficient system.

[`7:29`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=449) So, at this point, the story looks like a happy

## 9. The 20-Second Bug: Tombstones

[`7:33`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=453) ending. But it isn't. Because scale has a way of finding every weak spot you didn't know you had. Let's go back to that channel. One message on screen, 20 seconds to load. The cause was not a bug in Discord's code. It was a feature of Cassandra itself, doing exactly what it was designed to do. Here is what was really happening.

[`7:53`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=473) To understand it, you need to know how Cassandra deletes data. And the answer is, it doesn't. Not right away. When you delete a message in Cassandra, it does not erase it on the spot. Instead, it writes a little marker that says, "This is deleted."That marker is called tombstone. The real clean up happens much later in a background process.

[`8:11`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=491) Until then, the tombstone just sits there. Now, normally, this is fine. If you tombstone, no problem. But in that channel, users had deleted millions of messages. Which meant millions of tombstones piled up. So, when someone opened the channel, Cassandra went looking for the surviving messages. But to find them, it had to read through all those millions of tombstones first.

[`8:34`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=514) Imagine looking for one book on a shelf, but first, you have to pick up and check millions of this book is gone notes. That is your 20 seconds. And it got worse. Chewing through all those tombstones created a flood of memory garbage.

[`8:48`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=528) Which brings us to a word you will hear a lot in this story, the garbage

## 10. The Garbage Collector Problem

[`8:51`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=531) collector. Cassandra runs on the JVM, the Java platform. The JVM cleans up unused memory for you automatically. And that clean up is called garbage collection. Handy, but every now and then, to clean up properly, it has to pause the whole program for a moment. So, for a fraction of second, the database just freezes. In this case, those pauses were lasting 10 full seconds.

[`9:13`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=553) The node basically locked up. And here is the part that makes it dangerous. Because Discord reads from more than one copy of the data for safety, one sick node could slow down requests across the system. One bad channel could spill over and hurt everyone. Discord patched it. They made tombstones get cleaned up faster. They changed their code to skip over the empty buckets instead of reading through them. They stopped writing unnecessary empty values that created tombstones in the first place.

[`9:39`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=579) Good fixes, but notice the pattern. The

## 11. Five Years of Scaling Pain

[`9:41`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=581) garbage collector caused a freeze. And remember that because it becomes the central problem soon. For 5 years, the setup carried Discord. Between 2017 and 2022, the company exploded. The cluster grew from 12 machines to 177. Messages went from billions to trillions. And at that scale, every small weakness become a big painful problem. First, the hot partition problem.

[`10:06`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=606) And this one came straight out of the

## 12. Hot Partitions

[`10:08`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=608) clever bucket design from earlier. The same idea that kept partitions small now had a dark side. Remember, all the messages for a channel and time bucket live together on the same machines. Now, picture a channel in a server with 200,000 members. When something big happens, everyone is typing at once.

[`10:26`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=626) All that traffic hammers the same few machines. Those machines get overwhelmed while the other stays relatively free. That is a hot partition. It's a traffic jam on one road while the rest of the city is empty. And again, because of how reads work across copies, that overload could ripple out and slow down everyone else. Second, the garbage collector again. Now the main problem. At this scale, the JVM pauses became a constant headache. The team spent huge amounts of time tuning it, changing settings, trying to control it.

[`10:54`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=654) Sometimes a node would freeze so badly that an engineer had to manually restart it and bring it back to health by hand in the middle of the night on a weekend. That is the real cost here. Actual engineers getting paged because a machine could not clean up its own memory. Third, compaction falling behind.

## 13. The Gossip Dance

[`11:13`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=673) Here's the idea. Cassandra is always writing data in small pieces, and every so often it has to merge two pieces together to keep reads fast. That merging is called compaction. The problem was Discord kept falling behind on it, and it became a vicious circle. When compaction lagged, reads got slower. Slower reads meant more load. More load meant compaction fell even further behind. A loop that feeds itself.

[`11:36`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=696) To cope, the team invented a manual workaround they nicknamed the gossip dance. They would quietly pull a node out of a rotation so it could catch up on compaction in peace. Then slip it back in. Then move to the next one. Clever, but think about what that really means. They built a routine by hand just to keep the system breathing. That is a sign the system is fighting you. And the number showed it. Their tail latency, the slowest reads user actually felt, was swinging anywhere from 40 to over 120 milliseconds with no consistency. The system was not failing exactly, but it had become a high toil.

[`12:12`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=732) Constant paging, expensive maintenance, weekends firefighting. The team was spending more energy keeping the database alive than building new things. And this is an important moment in any system's life. When you spend more time babysitting your tool than using it, that tool is telling you something. Once your engineers are fighting the database more than they are building the product, the question changes.

[`12:33`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=753) It is no

## 14. Why Discord Moved to ScyllaDB

[`12:36`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=756) longer how do we tune this? It becomes what replaces it? That question led Discord to ScyllaDB. So, what makes ScyllaDB different? ScyllaDB is built to behave like Cassandra. Same data model, same query language, same core ideas. So, Discord did not have to throw away everything they had learned. From the outside, it speaks the same language, but on the inside, it's completely different. And the single biggest difference is this. ScyllaDB is written in C++, not Java. Which means no JVM, which means no garbage collector.

[`13:06`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=786) Think about what that removes. The thing that caused the 20-second trees. The thing that froze nodes for 10 seconds. The thing engineers were restarting by hand on weekends. That entire category of problem is gone because it is designed out. ScyllaDB manages its own memory directly in a controlled way instead of depending on the automatic cleaner that freezes everything to do its job.

[`13:29`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=809) Getting rid of the garbage collector was the headline fix, but there is a second idea inside ScyllaDB that is just as important, and it is the reason Discord

## 15. Shard-Per-Core Design

[`13:37`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=817) could later run on less than half the machines. It is called the shard per core design. Let me make it simple. A modern server has many CPU cores. Cassandra's older model had threads sharing resources and constantly stepping on each other's toes, fighting over the same memory. ScyllaDB takes a different approach. It gives each core its own little slice, its own memory, its own data to manage, its own work. So, each core minds its own business and the pass notes to each other when needed.

[`14:05`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=845) So, no fighting over shared resources. The result is a system that squeezes far more out of the same hardware and does its background work like compaction in parallel across all cores instead of crawling through it. So, that is a new engine, but Discord did not swap one database for another and call it a day. They added something smart in front of it, and that piece is just as important as the database itself.

[`14:29`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=869) Even after moving to ScyllaDB, Discord

## 16. Request Coalescing: The Rust Layer

[`14:32`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=872) still had one problem left. And it's a problem the database alone could not solve. Picture this. 10,000 people open the same busy channel at the exact same moment, all asking for the exact same messages. What happens next? Without protection, that is 10,000 identical requests all rushing to the database for the same data. The database gets hammered for no good reason because it is the same answer 10,000 times over.

[`14:56`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=896) So, Discord built a middle layer that sits between their app and the database. [music] They wrote it in Rust, a language known for being fast and safe with memory. And this layer does one job that I want you to understand well because it is a smart piece of design. The technique is called request coalescing. And the idea is simple.

[`15:13`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=913) The Rust layer steps in like a bouncer at a door. It sees the first request and sends just that one to the database. The other 9,999 that are asking for the same thing, it tells them, "Wait right here. I'm already getting it."When the answer comes back, it hands the same answer to everybody. One trip to the database instead of 10,000.

[`15:35`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=935) And this is brilliant because it attacks the hot partition problem at a completely different level. Earlier when a channel went viral, all that traffic slammed straight into the database. Now the Rust layer absorbs the storm and protects the database from it. The database only ever sees a calm, sensible amount of traffic, no matter how crazy things get at the front door. And this is the pattern worth remembering for your own systems.

[`15:59`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=959) When many users want the same thing at the same time, do not ask the database the same question over and over. Ask once, share the answer, put a smart layer in front to absorb the spikes. Now the hardest part, moving trillions of messages from the old system to the new one, while millions of people are using it live with no downtime.

[`16:19`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=979) Their plan had two halves. For new messages, easy. They started

## 17. Migrating Trillions of Messages

[`16:23`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=983) writing every new message to both databases at the same time. Old one and new one together. So from the cutover moment onward, both systems stayed in sync. For the old messages, the trillions already sitting in Cassandra, that was the hard part. They needed to copy all of it across. Their first attempt used a standard migration tool.

[`16:43`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=1003) The estimate came back, 3 months. Think about what that means. Three more months of running this fragile, high maintenance system, baby sitting it every single day. Just hoping nothing breaks before the move is done. And that answer was not acceptable. And so the engineers did what good engineers do. They built their own migration tool, again using their fast Rust library. This custom tool read the data straight out of Cassandra and fire hosed it directly into ScyllaDB.

[`17:09`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=1029) It kept track of its own progress, so if something stopped, it could pick up right where it left off. The new speed up to 3.2 million messages per second. The new estimate 9 days from 3 months down to 9 days. And there's a small detail at the end worth mentioning. The migration was fast, then got stuck right near the finish. Stuck at 99.9999%.

[`17:34`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=1054) The reason a giant pile of those old tombstones, the same ones from earlier, sitting in the final stretch of data. Never cleaned up. They cleared that one stubborn range by hand. And the rest finished in seconds. The very first problem we talked about showed up again at the finish line. And they cut over successfully in May 2022. So, was all of this worth it?

[`17:56`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=1076) Let's look at the before and after. And these numbers are the whole point. The cluster shrank from 177 machines down to 72. They handled more data and

## 18. Before and After

[`18:06`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=1086) more traffic on fewer than half the machines. The slow reads, that tail latency that used to swing wildly between 40 and over 120 milliseconds, dropped to a steady 15 milliseconds. Right settled to a calm, predictable 5 milliseconds. And notice the word that keeps coming up. Steady, predictable. Remember, that was one of the original wish list from years earlier.

[`18:28`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=1108) They did not just want fast, they wanted consistent. And they finally got it. But the best result does not show up in any latency graph. It is this. The system went quiet. No more weekend firefights, no more manual nursing sick nodes back to life, no more endless tuning sessions just to keep things upright. The real test came during the 2022 Football World Cup final. You could literally see the traffic spike every single time a goal went in.

[`18:53`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=1133) Huge, sudden surges of people reacting all at once.

## 19. The World Cup Stress Test

[`18:57`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=1137) The old system would have buckled, and engineers would have spent the match watching dashboards instead of the game. The new system just handled it, and I hope the engineers got to watch the match. That to me is what good infrastructure actually looks like. So, the next time you open Discord and your messages just appear instantly, remember the trillions of messages working quietly behind that one simple screen. And if you enjoyed this breakdown, don't forget to like, share, and subscribe.

[`19:20`](https://www.youtube.com/watch?v=X4iAQkjtx5k&t=1160) And if you'd like me to do a full Discord system design walk-through covering message fan-out, notifications, presence, voice infrastructure, caching, and scaling, type Discord system design in the comments. I'll see you in the next one.
