# Let’s Handle 1 Million Requests per Second, It’s Scarier Than You Think!

*Cododev · 2:39:18 · https://www.youtube.com/watch?v=W4EwfEU8CGA*

## 1. Introduction

[`0:00`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=0) Hey everyone, I've got a very exciting video for you. In this one, we're going to simulate being one of the busiest routes in the world and handle more than a million HTTP requests per second. If you think that's nothing, well, you're in for a surprise. This is a very high stake environment here. We're talking scale of Uber, Netflix, and even parts of Apple and Google.

[`0:20`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=20) Just to give you some context here in the Amazon Web Services, their busiest service is the IAM which is basically a security guard for all your applications and Amazon Web Services environment. Now, this is the busiest route that we've got in the world. And this service a few years ago was handling more than 400 million requests per second throughout the world.

[`0:40`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=40) And this was the busiest one. All right. So yeah, we don't have routes that handle trillions of requests. That is insane and we don't have it right now, but this is something within reach. This is something that humanity has accomplished. And in this video, we're going to see how close to this we can get.

[`0:57`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=57) We're going to be launching a powerful infrastructure with hundreds of CPU cores and dozens of computers that cost hundreds of thousands of dollars a year to run and simulate having millions and millions of users using the service at the same time. So we're going to be on some insane scale moving terabytes and terabytes of data per minute.

[`1:19`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=79) You're going to see that things are very different when you are in such an extreme environment. For example, you see a lot of people that say the database is always the main bottleneck. But not here, not here. I mean, you don't even want your database to be your main bottleneck because the costs are just going to be absolutely unbelievable.

[`1:35`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=95) You'll see what I mean throughout the video. At this scale, a simple mistake is absolutely detrimental. That's why in the video title, I said it's scary. And I'm not exaggerating. A simple mistake here would cost your company tens of thousands of dollars. And a mistake here is not a bug. Having a bug here is unfathomable. You don't even want to go anywhere close to having a chance of having a bug.

[`2:02`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=122) By mistake here, I mean going with a solution that is, for example, bigo notion of n instead of bigo notion of log n. The concept of code that just works is good enough is ridiculous in such a high stake environment. That mentality could cost a company literally millions of dollars over a very short period of time. Yeah. So no room for error.

[`2:20`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=140) You got to really think like an engineer in this environment. The mindset of I'm just a programmer or just a C or a Java developer is not going to work here. You shouldn't shy away from math. something that has a probability of one over a million to happen here or has a chance of happening every minute.

[`2:35`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=155) So thinking just like a programmer, yeah, not going to work. You won't even survive more than a few minutes, but you'll learn. But also, it's a lot of fun. Scary, sure, but also very thrilling. Kind of like roller coaster type scary, but with the difference that you can actually crash. It takes a lot of engineering, a whole lot of effort, and only very few companies in the world would ever get to this scale of 1 million requests per second. All right. Yeah.

[`3:01`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=181) So, we're gonna have a lot of fun in this video. I really enjoyed making every single part of this video. And yeah, we're going to become one of the busiest routes in the world, but only temporarily, only for a few hours because it costs so much to run.

[`3:16`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=196) I built this video so that you can still learn a lot by just watching it without needing to follow on. But if you want to follow along, please just stick with your local machine. I will give you all the repos, all the code that I'm going to run. So you can also do all the tests on your own machine.

[`3:31`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=211) But when I then move into the cloud, if you want to do the same that I'm going to do, it will cost you hundreds of dollars if not more. And you make one simple mistake and there you go. You lost 50 bucks. So please be very careful and you're better off just watch me. This video is very polished up version. I you're going to see a lot of fast forwards.

[`3:45`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=225) I had to put a lot of research into it. That's why you might feel like that this operation is actually easy to do because yeah, I'm doing all these commands and you're going to see that they all work. But in reality, that's not really how things are.

[`3:58`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=238) And yeah, one simple command is going to break and your whole system is now down. It it takes a lot of time. So if you want to try it yourself, yeah, I can almost guarantee you will take you many hours. And even if after all the research, if I wanted to do this video live, it would still take probably four to five hours. All right.

[`4:12`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=252) So now, thanks to fast forwarding and video editing, you can enjoy this in just 2 hours. So sit back, relax, enjoy this video. We're going to have a lot of fun and we'll also learn a lot. All right, before we start though, let's make sure that we're on the same page.

[`4:29`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=269) In this video, we're going to see SQL, we're going to see Unix, multi-threading and clustering, Redis, and Node.js and also C++. We're going to be using C++ because NodeJS at one point is just not going to cut it. These technologies like NodeJS, Python, and Java, they're just not good enough for such a high stake environment here.

[`4:50`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=290) Every single bit that you can save is going to really add up. And we're going to go with C++ to really hit this 1 million. And these other technologies are not good enough. Now, you don't need to know C++ or even Node if you want to follow along with this video. I'm going to explain everything in simple terms.

[`5:05`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=305) So, don't worry about it if you don't know anything about them. Also, I'm going to be doing these tests on Amazon Web Services. But again, don't worry if you don't know anything about it. I could have just as easily done it on Google Cloud or Microsoft Azure or even just set up the machines myself physically.

[`5:19`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=319) So the concepts are going to be the same all around. For as long as you know what a computer is, you're going to understand what I'm talking about. I will stay away from using AWS specific terms so that you can understand exactly what's going on. But if you're working in Amazon Web Services, yeah, you will also learn a few extra things.

[`5:40`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=340) But again, don't worry if you don't know anything about it. I'm going to be very transparent throughout this video. I'm going to put out all the costs. Whatever we're going to run, I'm going to tell you exactly how much it costs per hour to run so that you have some context and you know how big it is and all of them will be in USD.

[`5:53`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=353) Okay, let's now talk about prerequisites. So, if you want to get the most out of this video and be able to follow along and understand it, these are the basic things that you need to know. All right, you need to know some basic SQL. Nothing too crazy for as long as you know how to select all or insert or update. That's pretty much all that you got to know.

[`6:14`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=374) Next, you also need to have done some backend development at one point. You got to know what is an HTTP request, have set up maybe an API, even on your test machine, not even anything too crazy. Doesn't matter if you've done it in Java, Python, Net, whatever you've got. But you got to have some experience.

[`6:30`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=390) You also need to know what a computer is. And by that I mean you got to know your CPU, how many cores you've got, what is a thread. You got to know that your memory is way faster than your disk, that you've got a network card, that you can connect computers together using an Ethernet cable through the network card.

[`6:53`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=413) And again, yeah, some basic stuff. That's all you need to know. And also know that one bite is equal to 8 bits. All right? So if you've forgotten this, just keep this in mind. So 1 GB is equal to 8 GB. You also need to know what NodeJS is. Just know what it is.

[`7:05`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=425) You don't need to have done any development in it whatsoever. Just know that it's a system level technology that is like Java and Spring and not like React. So you can deal with files, you can do Unix stuff, run other processes, spawn threads, communicates over the network and other stuff like that.

[`7:22`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=442) I also highly encourage you to install it and run a simple Hello World application. Again, you don't need to go too crazy. just play around a little bit because I'm going to be running some fair bit amount of node code throughout this video. So if you can also do that that's really good.

[`7:37`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=457) You can also then do some of the tests that I'm going to do on your own local machine by grabbing the repository. One last point, you got to know how to SSH into a computer and know what happens when you do it. So when you SSH into a computer that's in another country, I want you to have a conceptual idea of what exactly is happening behind the scenes.

[`7:58`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=478) I'm going to be doing a fair bit amount of sshing here in this video. So, I want you to know what's going on and also know some basic terminal commands. Again, nothing too crazy. Just know how to change directories, make folders, delete files, create files, add a file, some basic stuff, right? Very, very basic.

[`8:13`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=493) And if you have all this basic knowledge, you're good enough to follow along with this video. All right, before we get started

## 2. CPU Utilization & Threads

[`8:24`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=504) though, I want to talk a little bit about this CPU and threading. So, I'm going to now talk about core utilization and also CPU utilization and two different methods that we've got to calculate them. We're going to be doing a whole lot of resource monitoring at this scale. If you are not doing resource monitoring, you're doing it wrong.

[`8:40`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=520) There is no way that you can accomplish it without doing a crazy amount of resource monitoring. So, I want to make sure that you understand all these numbers that we're going to see. We will then go ahead and spawn a few threads on our machine to make sure that we really understand this CPU utilization.

[`8:54`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=534) So if you feel like you know all this stuff, please use the progress bar down below to skip right ahead and start this video. All right, so now I'm going to talk about this resource monitoring. Let's start with core utilization. So your CPU, it's got multiple cores. You can check it out right now.

[`9:12`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=552) Please pause the video right now if you don't know how many cores your CPU has got. Go and Google it. There are some commands that you can run on Windows, Linux, and Mac to get a number of how many cores you've got. Now, a single core utilization formula is this. It's very straightforward.

[`9:25`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=565) You take the total time, any span of time that you want. For example, the last 30 minutes, and you also know the total idle time. This means that throughout that last 30 minutes, how long the core was doing absolutely nothing. So, each core can either do something or not do anything.

[`9:43`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=583) All right? that doing something could be a simple operation of adding two numbers together or checking if something is true. All right, so some basic stuff but idle time means that the core is doing just totally nothing. Just sitting right there and relaxing. So you take this then you divide this by that total time and then you multiply by 100 and then you get a core utilization. Very straightforward.

[`10:09`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=609) So let's say that in the last hour the total idle time of a particular core was 30 minutes. So you plug that number right here and you're going to get 50%. Meaning that that core was utilized 50% of the time throughout the last 1 hour. All right. Now CPU utilization because again remember your CPU has got multiple cores. Very straightforward.

[`10:27`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=627) All you need to do here is take each core utilization and add them all up together. And optionally you can also divide this by total number of cores. So this last division is optional. Some systems do it, some don't. And you can actually also specify if you want to see this or not.

[`10:47`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=647) So, we've got two different methods to display CPU utilization. One is to just add all the core utilizations and that's it. In this case, in method one, you're going to get a percentage that's higher than 100%. For example, if you've got four cores and you're utilizing all four, the CPU utilization is going to be 400%. But in method two, it's always a number out of 100.

[`11:07`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=667) So in that case of four cores being fully utilized here using method two, we're going to get a number of 100%. Very straightforward. All right, let's see this in action. Please go ahead and grab this repository. The link is going to be in the description box down below. We're going to have three repositories here for this video.

[`11:25`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=685) This is one of them. This is our code in Node. And then we're going to have another one in C++. All right, but here if you grab it in the playground, don't worry about all the other folders. We're going to get into them in just a bit. Here I've got two files.

[`11:39`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=699) One is called singlethread.js and all it's got is a simple while true. All right. So if you don't know node, go ahead and run this in your favorite language. Be it Python, Java, doesn't matter. Just put a while true and then go ahead and run that code. So I'm going to go ahead and do it here with Node.js.

[`11:56`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=716) You can run files by just saying node and then specify that file which is here in my playground and then single thread.j JS. All right. So now I'm running this and then go into your system monitor. All right. So here on Windows that will be task manager. On Linux that'll be system monitor.

[`12:15`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=735) Here on Mac that will be activity monitor. And then search for the process that you just ran. Here with node it's simply called node. So here's the process. And then I want you to take a look at the CPU usage. Right? you're going to see that it's 100% if it's using method one that we just talked about or it's another number if your system is using method two to report the CPU usage.

[`12:37`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=757) In that case, for example, if you've got four cores here, you should see 25%. All right. Now, also monitor your total CPU utilization. So, here this is now my total CPU. I've got 12 cores and you can see that the idle CPU is now around 70%.

[`12:54`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=774) All right, a little bit amount of it is now going towards my video recording and also a good portion is going towards this Node.js process. Right? So I really want you to understand these numbers that you've got. Now system and user if you add them together, this is going to be the total CPU utilization.

[`13:10`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=790) The idle here is again referring to the total CPU that's not being utilized. All right, so all the cores added together. All right, so that's the first example. This is running in a single thread. All right. Each thread can only utilize one CPU core at any given point of time.

[`13:25`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=805) So here in this code, I cannot do two things at the same time. I cannot go right ahead and say add two numbers simultaneously. Right? I could do something to make it seem like that it's actually adding them together, but my CPU is doing one and then doing the other immediately after.

[`13:43`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=823) If I want to do two things exactly at the same time so that I can speed up my program execution by about two times then I need to spawn another thread. All right. So here I've added another piece of code multi-thread.js. Again grab this code. Go ahead and convert it into your own favorite language.

[`14:02`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=842) You can do this with Python, Java, C, C++, what have you. And here what I'm doing is that I'm spawning 12 threads and I'm doing again the while true in each individual thread. All right, very straightforward. So now I am doing 12 things at the same time, not just one.

[`14:23`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=863) Now theoretically this would really speed up your application because now you're utilizing all your CPU, but you also got to worry about things like race conditions. You got to use sometimes semaphors and so many other things to make sure that your program is going to work properly.

[`14:39`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=879) But also in some cases you just don't need to worry about it. You call a function and the developers who made that function have already taken care of all those things for you. All right. So let's go ahead and run this code. Again here I'm spawning 12 threads because I know that my CPU has got 12 cores.

[`14:53`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=893) In your case, you should know by now how many cores your CPU has got. So change this number to that. If you've got eight cores, go with eight. If you've got maybe 32 cores, go with 32, right? Okay. So now I'm going to go ahead and run this one. So node playground and then multi thread.js. All right.

[`15:10`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=910) Once you run it, it can immediately go into your activity monitor or system monitor, whatever you've got, and check your CPU usage. Now, for this process, you can see that the percentage is 900%. Now, ideally, without the video recording, it's going to be around 11,00%. But because I'm also doing a whole lot of recording and some other stuff in the background.

[`15:32`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=932) So, I've got a lot going on here. But still make sure that you understand this number. This is now being reported using method number one. So, this method. Now, let's also take a look at our total CPU usage. So, down in the bottom, you can see that my idle CPU is now 0%. All right?

[`15:47`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=947) It's not 0.1 or 0.2, it's exactly zero because all of my cores are now being fully utilized. they don't get a chance to breathe because I've also got some other processes going on. So everything is now working. I've got a whole long queue of operations for my CPU to run. So it's not getting even a single chance to breathe.

[`16:12`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=972) All right. All right. So again, I want you to understand that here we're running 12 while loops at the same time. All right. So just make sure that you understand this concept and that also you understand what exactly is going on here. I'm going to shut this down so that my recording is not going to get tampered with. But yeah, that's it about CPU utilization and multi-threading.

## 3. Getting Started

[`16:36`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=996) All right, let's get into it. So, let's start from something very, very simple. I have this project here called Node 1 million requests per second. You can download it from the GitHub repository right here. I encourage you to also grab the code. I'll add a readme file so that you'll see how to get things set up on your own machine, but you don't really need to do much.

[`16:54`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1014) Now, here in this code, let's just imagine that we have this very simple route slash simple. And that's it. I have a few other routes here. We're going to go over all of them, but let's not worry about any of them. This is all we have. /simple, and we're going to get a simple JSON response message high.

[`17:11`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1031) Now, if you are not familiar with node, don't worry about it. It really does not matter. The logic would have been the same with Python, Go, Rust, or JavaSpring, whatever language it is. This is going to be pretty much the same. All right? So, you don't need to worry about it. I'll explain what the code is here. Again, all that's going to happen is a simple JSON.

[`17:33`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1053) So, I'll go ahead and run this code here. I have navigated to that. So, I'll say node and then express.js. All right. It says server running on this port. And we also get two more logs here that says connected to Redis and Postgress. But let's not worry about them. We're going to come back to Redis and Postgress in the future. Right now, let me go ahead and now send one request.

[`17:56`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1076) So, I'll go to localhost 3001/simple. And there you go. We get message high. Very straightforward. Now, we're talking about requests per second. So, what does a request here mean? Well, when we say get, we're going to send some amount of zeros and ones to this server right here. And then we're going to get a message back, this JSON. And this whole process here took 12 milliseconds.

[`18:25`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1105) All right, so very very short. Once we get this status 200 back along with the body, we're going to now count this as one request. And now the question is, how many of these can we handle per second? All right, I'm going to go ahead right now and use an application called autocannon.

[`18:45`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1125) If you don't have it, you got to install Node on your machine. It's very easy. And then run npm i -g autocannon. Right, with this application, here's also the documentation. You can simulate sending thousands and millions of requests to your application. All right, and here's how you use it. All I got to do here is say autocannonand then specify a few options that we're going to talk about. So I'll say dash c number of connections 20 dash d meaning duration. I'll say also 20.

[`19:17`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1157) So for 20 seconds we're going to run this and then -p here meaning pipeline I'll go with two and then specify my complete URL here which is http localhost port 3001 and then / simple. Now let me also specify the method. So that's another option here - m get. Now let me go ahead now and run this. Now what is happening here is that autocannon is going to simulate what we did here.

[`19:53`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1193) So, it's just like we click on this send many many times per second. Of course, as a human, we can't do it, but a computer can. And we're going to now see how many of these we can handle per second with this express server right here.

[`20:04`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1204) Now, here we can see that we handled 18,000 requests per second and all of them resulted in a 200 good message. If we do get an error for any of the requests, it's going to be indicated right here. But you can see here that we don't have anything. All right. So, in total, we sent 300,000 requests and we moved 90 megabytes of data over our network. All right.

[`20:22`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1222) So,

## 4. More on AutoCannon

[`20:30`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1230) now I want to give you a quick crash course on autoc counted. So, if you already know how to use it and the results that we just saw make total sense to you, just feel free to skip right ahead. You can use the progress line down below to know where to go. All right.

[`20:39`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1239) So, we used here dash c20 and then dash d and -p. And there's also another option that I want to talk about which is - W, meaning the number of threads that we're going to spawn to run this test from. All right, so this is an important one that we need to talk about because the power machine that we're going to move to in just a bit is going to have many, many cores.

[`21:00`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1260) So we need to utilize some of these threads to use as many cores as we possibly could. All right. So what just happened here is this. So let's imagine that we're going to go with - C6, number of connections six, pipeline 2, and number of workers two. We have a server.

[`21:20`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1280) Imagine that in the real world, we're going to have our server somewhere, maybe on Google Cloud or Amazon. And then we also have maybe a client, maybe our own machine, and we're going to generate this traffic using autocannonand send it to the server to benchmark and see how many requests we can handle per second.

[`21:42`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1302) Now I'm also going to add this here to indicate the network card of the server because whatever request you send through TCP or UDP it's going to be received on the network card of that particular machine. All right. So starting with this - W2 this means that we're going to spawn two threads. All right. So now this means that we can do two things at the same time on our CPU.

[`22:07`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1327) Then this - C6 means that in total we're going to open up six connections to this server. Right? So six TCP connections in this case and this -p pipelining means how many we're going to send how many requests we're going to send immediately at the same time. All right. So here's what it means. So we have three connections because we have two threads.

[`22:28`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1348) Each thread is going to open up three connections and -p2 means that each one of these is going to send two requests. All right, so kind of like this. We're going to send one and then immediately after we're going to send another three requests. All right.

[`22:47`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1367) Now, if -p was maybe six, in that case through each connection, we would send six requests and then wait, get a response and send the next ones. So if you want to know at any given microcond at any given point of time how many requests this server is handling you have to multiply - c by -p. So in this case it's 6 * 2 which is 12.

[`23:08`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1388) So this means that when we run autocannon with these options this server at any given point of time is handling 12 concurrent requests. Right? Very easy to understand. Right? So back right here this whole thing should now make total sense to you. And also this result that we're going to get, we would only pay attention to this average. So this means on average how many requests we handled per second.

[`23:32`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1412) We also get a percentile right here because it has done actually 20 samples and not just one test. You also get a few other things here that are easy to understand. For example, here it says that at our worst we handled 16,000 requests per second.

[`23:49`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1429) All right, but we also managed sometimes to handle up to 18,000. But if we average, it was 18,000. All right. All right. So 18,000 requests per second,

## 5. Utilizing More CPU with Clustering

[`24:03`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1443) but I'm still not utilizing a whole lot of my power. Right. I've got lots of CPU cores. So this current machine that I'm running right now is a Mac Studio, and it has got 12 CPU cores, 32 gigs of RAM, and it has a 10 gig network performance or 1.25 GB per second.

[`24:17`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1457) So, this means how much data I can move towards my network card at any given second. So, if I'm moving a huge amount of data, I'm going to be bounded by my network and not maybe by my CPU or RAM. And also, it costs around $2,000 to buy it.

[`24:36`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1476) And you can get it now actually by 1,000 or something, but we're just going to go with this. It really doesn't matter if we go with $5,000 or anything else. And if you span it across three years and say that I'm going to have this for three years and you count in the electricity cost, it roughly costs around $60 per month. All right.

[`24:52`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1492) Now, I'm saying this because we're going to move to some very powerful machines and we're going to see some interesting differences. So, this is the machine that I'm running this right now on and I'm not utilizing much here. All right, I have a bit of overhead here with Express and also when I'm running this, the idle CPU usage is very very high. All right. So, I'm not using half of my CPU.

[`25:13`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1513) Now, what I'm going to do is check how much overhead we have from the actual framework. All right. Because Express is quite slow. And we have another framework called Fastify. So, here if you take a look at the codebase, we've got three files. So, Cpeak, Express, and Fasify. And they all have the same logic.

[`25:31`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1531) They all have the same routes. And we just want to do a bit of a benchmark to see which one to go with. We want to go with the fastest possible one to have the raw node performance and not really have too much framework overhead.

[`25:49`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1549) All right, because we're going to handle a huge amount of requests and even a little bit of improved performance could help us a lot. Now, I'll try it with Fastify.js. So, I'll run it with Fastify, which is another node framework, but they're all very similar. Now, Fastify actually claims to be way faster than Express.

[`26:06`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1566) And here in the npm page, you can see that they're claiming to be about three times faster than Express. All right. So that's why I'm going to try it with this one as well. That here in the request per second, it gets 77,000 and Express only gets 14,000. So let's see if we can verify that.

[`26:20`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1580) So I've got this server running and I'm going to go ahead and send this request. I'll change my connection here to five and I'm also going to specify the worker one, which is the default one. So, let's go ahead and send this and I'll fast forward. So, the average was 66,000.

[`26:37`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1597) And if you recall, the Express one was way, way, way lower than that. So, I'll try it again with Express pretty quick with the exact same arguments that I've got right here. And here we can see that Express was only 20,000. So, yeah, Fastify is actually way faster here in this example compared to Express, right?

[`27:01`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1621) So we can get rid of the framework overhead by going with fastify. Now there's also another framework that we've got that's Cpeak. This is what we're building ourselves from scratch and it's zero dependency. So it has only 500 lines of code as of now and it's very easy to read. So you can go to the source code. It's quite straightforward. We're not adding much overhead.

[`27:23`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1643) So let's try it with this one as well. So I'll say node cpeak.js. So this is pretty much close to raw node performance. And then I'm going to run that again. Change my port back to 3000. And I'll fast forward. All right.

[`27:45`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1665) So, I just ran it for two times and here you can see that we got 73,000 which is even higher than Fastify, but it's not something concrete. For example, sometimes we go a little lower than Fastify and sometimes a little higher, but definitely always way higher than Express. Now I've gone ahead and I tried it with every single one of these routes a few times and based on my benchmark which I'm going to pull up right here.

[`28:07`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1687) So for each route I have Cpeak and for one instance and then here I have 12 instance of node running with different connection counts and workers and you can see that the average RPS so the average request per second of the Cpeak framework is usually way higher than Express and very comparable to fastify.

[`28:24`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1704) Sometimes it is a little higher. So Cpeak right now gives you pretty much all the features of express. So if you take a look at the code if you are familiar with express you can easily use express in the exact same way and it also gives you the performance of fastify and it's also zero dependency.

[`28:41`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1721) You can easily read the code. It's an educational project as well. So for these reasons I'm going to stick with Cpeak throughout the rest of the video because with this our performance is very close to raw node and we can also understand the code.

[`28:58`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1738) So if you're curious you can go through the code you can see that it's not magic and that's how we're going to conduct the rest of the tests. All right so at this point you should now feel pretty comfortable with this autocannon. Now let's move on to the other ones. All right so here we managed to handle about 73,000 requests per second.

[`29:14`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1754) But this is a very simple route. Okay, it can't get any simpler than this. Let's move on to something a little more complex. So here I've got a patch request. Here we have some path variables and also some query parameters. All right. And then we're doing some dummy operations here.

[`29:33`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1773) We're maybe checking to see that the ID is a number. Then we're generating some dummy data about, you know, a few kilobytes of data using this array. No need to worry about any of this. And then we're getting back a JSON, right?

[`29:48`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1788) So, we're just doing some dummy operations here, but pretty much similar to a real world API request. Okay, you get a whole lot of data back and you also do some operations. Let's go ahead and give this a shot. So, I've got the server of Cpeak running and I'm going to go ahead and send one request to this one.

[`30:05`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1805) Actually, I've already created a tab here because I don't want to type all of this here in this video. So I'm sending a patch request with two parameters right here and also my path variables and I'm also sending this JSON to my server with some data. So foo1 is this and all of that. So I'll go ahead and send it.

[`30:24`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1824) And you can see that we get 32 kilobytes back and it's a pretty lengthy one. All right, we get about 700 lines of JSON. So this is more real world. All right, in the real world when you send an API request, you don't just get a simple message back. You get a lot of data.

[`30:39`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1839) And let's now try it with this and see how many requests we can handle in a bit of a real world example. So I'll go back right here and I'm going to go ahead and actually paste a command. So here's the autocanon one. I'm specifying a few more options. -b meaning my body which is this JSON body exactly what I specified in Postman and also the content type which is application JSON.

[`31:01`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1861) And we're going with the exact same parameters as before connections five duration 20 seconds pipelining two and one thread. Okay. So, I'll go ahead and send this. Now, if I take a look at my activity monitor, you can see that it's utilizing all its CPU power. So, this node is now on one core, 100% CPU usage.

[`31:18`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1878) So, I don't have any idle CPU for this process, but I do have still quite a whole lot of idle CPU on my machine. All right, so now we're only now down to 8,000 requests per second. All right, this is 10 times slower compared to what we had before, but also we're moving a whole lot of data, right? We're moving 5 GB of data in these 20 seconds.

[`31:45`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1905) Okay, now let's see if we can speed this up a little bit because again, as you recall, I still have quite a whole lot of idle CPU and at 1 million requests per second in that environment, we got to utilize all the resources that we've got. So, I'm going to go ahead now and run this application in cluster mode, meaning that we're going to now run many instances of this node process. And I've got a bit of code here. I'll show it to you. We're going to do that with PM2.

[`32:13`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1933) So, I'll just have to run this. And it's now going to run 12 instances because I've got 12 cores. So, I'll now go ahead and run that. So, PM2 start ecosystem. And PM2 is just an application that lets you, you know, run multiple instances of your application. And here in my activity monitor, you can see that I've got multiple of them.

[`32:30`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1950) And the way that it's going to work now is that all this traffic that AutoCA cannon is going to generate is going to end up in the parent process. And then that parent process is going to distribute that traffic to all the other processes. All right. So now I can utilize way more CPU than I could before. All right.

[`32:49`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1969) I'm going to go ahead and run this again in my activity monitor. You can see that my idle CPU is now way lower at only 30%. And some of these processes are kicking in with 100% CPU usage, but still not all of them. So, this is not really maximum capacity. We can push it way further, and that's just what I'm going to do.

[`33:05`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1985) But you can see that we can now handle 36,000 compared to only 8,000. That's a big jump by just running our application in cluster mode. So, I'm not changing my code. I'm just now utilizing more of my CPU. And with that, I can jump way more than I could before. Now, I'm going to actually change this to workers six.

[`33:19`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=1999) So, I'm going to spawn a few more workers actually. Okay, my cursor is here. So, connections, I'm going to go with 20. And then workers, let's go with six. Right. So, this way we can send way more requests at any given point of time. And back here at my active monitor, you can see that now my idle CPU is zero. Right? So, now I'm at maximum capacity. All my processes here are at full power.

[`33:51`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2031) All right. And this node, this is the autocanon one. This is also at 200% CPU usage. And I can't really go any further than this. And now here the average is 42,000. Still not that big of a difference, but quite again a big jump from just having one simple process. All right. So let's keep this number in our mind.

[`34:10`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2050) 42,000 requests per second for this route, which is quite CPU intensive and also network intensive because we're sending a whole lot of data through the network.

## 6. Moving to AWS

[`34:24`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2064) All right, so what are we doing here? I mean, we said we're going to handle a million requests per second and we're still so far away. I have just paused a recording and run this again. And you can see that even without the video recording messing with the CPU, we have averaged around 50,000 requests per second. Well, we actually did hit 1 million, but that's the total requests.

[`34:41`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2081) So, we handled 1 million requests, but who are we kidding? That's in 20 seconds. Our goal is to get to 1 million in just 1 second. Well, seems like a big challenge. And what am I going to do? I'll just launch 20 more Mac Studios. Well, I might just do that but a little differently. So, we're going to now go to Amazon and launch some very powerful machines and then try this.

[`35:09`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2109) All right. Now, before I do that, I want to give a quick disclaimer that if you are following along with me up until this point and you don't know how to work around AWS and work in the cloud, don't even think about trying what I'm going to do yourself.

[`35:27`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2127) This setup that I'm going to launch is going to cost $30 an hour or around $20,000 a month. So, if you mess up a little bit, you can end up with a massive bill at the end of the month. So, you're better off just watch me do this section.

[`35:44`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2144) And if you want to do this at one point in the future, make sure that you know what you're doing. I know what I'm doing. I've been using AWS for years. I know how to keep cost down and make sure that I'm not going to end up with a big bill. So in your case, make sure that you are that comfortable too before trying to do something like this.

[`35:58`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2158) All right, let's do it. So I'm going to go into the Amazon console and log into the management console. All right, I have logged in here and I'm going to go into EC2. Now here in EC2, this is the section where we can launch computers. All right, it's very simple.

[`36:20`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2180) You can launch whatever computer that you want with whatever config you'd like. You can launch some supercomputers that you can launch some of the most powerful AIs on or you can launch some very simple close to free servers to launch your own applications on. So you have a lot of power in this EC2.

[`36:37`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2197) This is arguably the most powerful service here in Amazon. And with this you've got a huge amount of power and they've got more than 600 instances. All right. So this is a massive section but it's also again very simple to understand. All you need to know is that here we can launch computers and that's it. All right.

[`37:02`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2222) I'm going to go here to the instances and click on launch an instance or launch a computer. All right. Now here I have already created an image. So I'm going to go ahead and select that one. All right. Because I don't want to configure this server from scratch and waste like 30 minutes here on the video show you how to do it. So I've already done it.

[`37:18`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2238) For example, I've already installed node. I have installed this PM2. Did things like changing my bash script a bit. So yeah, quite straightforward. But I don't want to do it all again from scratch. So I have an image. So what I have done is that I have already launched this computer. I did all my configurations and then I took a copy of the computer's disk.

[`37:39`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2259) And then using this copy, I am going to launch a new computer. All right. Here's where the fun is where you get to choose the instance type, right? You've got a fair bit amount of options here. Hundreds of options. You can go with for example this one. It has 48 CPU cores and close to 200 GB of memory. Right?

[`37:56`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2276) You get some very powerful machines here. And you got a lot of options. All right. A whole lot of options. So, the one that I'm going to go with is called C8i. 32XLAR. All right. This machine has 128 CPU cores and 256 GB of RAM and it costs around $6 an hour to run. So, just to compare this one with my current machine.

[`38:29`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2309) This C8i32, has 128 CPU cores, 256 GB of RAM, which is eight times more than what I've got, and its network performance is 50 Gbits per second or 6.25 25 gigabytes per second. So five times more than what I can handle. And again, it costs $6 an hour or about five grand a month. All right. So quite expensive.

[`38:53`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2333) It's 10 times more powerful than mine. So it's kind of like we're going to launch 10 Mac Studios right now somewhere in the world somewhere in Ohio. All right. Because here I am. My region is here, Ohio. All right. I'll scroll down. I'll select my key pair so that I can SSH into this machine.

[`39:12`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2352) Now for its network setting, I've already created something called allow all. What this is is that it's going to open up all the possible ports. Terrible thing to do in production, but here I'm just going to use it for a few hours and then shut it down. And I don't want to worry about what port is going to work and what is not going to work. All right. So I'll select this one.

[`39:31`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2371) Now for my storage, I'll try to maybe add some storage, maybe 500. And then I'll click on advance here. I just want to have a little bit more throughput to this. And then IO ops. This is input and output per second. I'll change it to 30,000. I really probably don't need to do this, but I just want to try this.

[`39:50`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2390) Now, this would cost a few hundred extra dollars per month, but that's okay. And that's it. I'll go ahead and give it a name. I'll call it power server. And then I'll launch Now I'm going to launch yet another server. So I'll click on launch instance and then here I'll select another one of my AMIs and this is the one that I configured for the actual tester. Now all that I've done here is install autocannonand that's it.

[`40:24`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2424) All right, that's all that we're going to do here on this machine. So, we're going to use one machine to generate traffic and we have another machine, our server, that's going to handle the traffic. All right? Because right now on my Mac Studio, I was doing both on the same machine, generating the traffic and then handling the traffic.

[`40:44`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2444) But now, we have a completely dedicated machine that's close to 10 times more powerful than my own machine to generate the traffic. All right, it's a beast and we're not going to have any problems with having low traffic. Right. So I'll select that C832X large and keeper just like before. Network I'll go with allow all.

[`41:10`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2470) Then the storage for this one I'll just go with this. It doesn't really matter. I'll call it power tester and then I'll launch. All right. So I'm just going to wait for a bit for these two to start working. It would take a few minutes for him to initialize. But I also need to do one more thing here.

[`41:27`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2487) We have a few routes where we're going to do some database operations. So we're going to connect to Postgress and try to write and read. So I'm also going to go ahead and launch a database instance in the cloud for handling the database. Now I'll go back here to the services and then I'll go to Aurora and RDS.

[`41:56`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2516) Now actually I've already launched the database. It's a very powerful machine but I'll show you how I've done it. So I just need to start this and that's it. So I'll select it and then click on start. Just to give you a bit of an idea. This is DB.M5.16xlarge. Now I want to go here to create estimate by AWS. And here I have searched for it.

[`42:15`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2535) You can see that it's got 64 CPU cores and 256 GB of RAM. This is a beast of a database. It's very powerful. And I'm going to run it in a single availability zone, right? We don't need to scatter it across. We just need it to be in one location and that's it. Now, this one also costs around $5,000 or $6 per hour. All right.

[`42:38`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2558) Now, for the storage, I'm going with GB3 with around 3,000 IOPS, which I know is pretty low, but we're going to try it with this. I don't want to worry too much about the database. So, we're just going to go with that and then try another one and see what's going to happen. All right, so now I've got this database running, and I've also got these two.

[`42:59`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2579) Hopefully, they're now running. All right, there we go. So, I'll go ahead now and SSH into both. So, I'll select my power server. I'll copy my public DNS. And then here I'm going to have a new window here. And I have four tabs here. So I want to dedicate one of them to the power server machine.

[`43:18`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2598) I have a bash function called SS which I can use to easily SSH into different machines. So all I got to do is say SS and then paste the domain name. And that's it. All right, here we are. We are now in a beast of a machine. And here's my bash prompt. All right, let me now try to do this again.

[`43:40`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2620) So, I've got another one. I'm going to have two tabs for each because we want to be able to monitor the CPU usage. So, SS this one. And now we're locked in. So, I've got one tab here, power server, and then one more right here at the beginning. And then let's do the power tester.

[`43:56`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2636) There we go. We've got it running. So, I'll select it. I'll copy the DNS or domain name here. And then say SS and log into this. Let me zoom in a bit. This is the machine that we're going to use to generate a huge amount of traffic and let me do it again over here. There we go. All right.

[`44:16`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2656) So, here I have already cloned the codebase. So, I'll go into that and I've also got the PM2 installed. All right. Now, here on the power tester, I have the autocannon. All right. Let's make sure that we understand the architecture that we are on right now. So we've got one machine here that we call our power server. So this is our power server.

[`44:44`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2684) And then we've got another machine that's the exact same type. And this one is our power tester. All right. So we're using this one to generate traffic and send that traffic over to our server. Now these two machines are obviously connected together. So through the network interface of both there is a connection.

[`45:04`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2704) So this way these two can easily communicate together. Now we've also got our database right here and this is our Postgress SQL. All right. So we've got Postgress SQL right here and this one is connected only to our power server. All right. Now this whole setup is on a private network. Of course, they can communicate to the outside internet, but we want to be on this private network because we don't want to worry about the internet speed. All right.

[`45:38`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2738) Now, we only got to worry about our network speed. So, yeah, this is our architecture. Very straightforward. And we're going to be using this one to conduct our tests and hit a million requests per second. So, all right, let's go ahead and generate some huge amounts of traffic. Code is the same.

[`45:55`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2755) So I'm going to show you the code here on my machine. But here this is the remote machine. First of all, let's start the application. So I'll say PM2 start. And then let me double check my ecosystem file. All right, there we go. Looks good. So I'll say PM2 start the ecosystem.

[`46:13`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2773) All right, we're going to now start 128 instances of node, which is absolutely crazy. But yeah, let's wait for it. There we go. We've got a huge amount of them. Restarting these would take a while. All right. Yeah, it would take a while because it's it's a lot. 128 instances is just crazy. But yeah, we've got it here.

[`46:32`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2792) And then we should now be able to ping this server or at least send a request to /simple. All right. So, I want to go ahead here, select my power server and then copy the domain name. And then here in Postman, I'll create a new tab and go into that. So port is 3000 and then slash simple. I'll send it over.

[`46:52`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2812) And there we go. We get message high. But now from this power machine. All right. So we've got the server running. The CPU usage of every single one is zero. Now I'm going to autocannon this /simple. Before I do this though, I'm going to monitor my CPU usage here on this power machine. There's a command called mpstat one. And then it's going to show me the idle CPU percentage here.

[`47:21`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2841) Right, it's now 100%. All right, I'm not doing anything with these cores. I also have added an alias here that's called CPU- usage. So I'll be using this one just to make life a little easier. All right. Okay. So now that I've got this running, I'll go ahead and autocannon this one. I'll actually do the mpstat again here on my power tester. And here I'm going to paste the command. Right?

[`47:54`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2874) So autocannon get method. We're going to open up now a thousand connections. Still only 20 seconds pipelining now 100 up from two that we were doing before. And for workers we're going to spawn 120 threads. Okay. And then here's my address. Right. Okay. So ready. Let's go. I'll go ahead and start it and let's monitor the CPU usage. You can see that we're now down to zero.

[`48:16`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2896) So, we're utilizing this beast completely. All the CPU is now totally used. And now, if I take a look at the tester, actually, we still have 50 more%. Right. So, I've launched a very powerful machine for this tester. I could have gone with something a little simpler, maybe with only 90 CPU cores or something like that, but yeah, the point is that we're utilizing the server completely.

[`48:40`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2920) Now that it's done, if I take a look here, you can see that we handled 6 million requests per second. That's that's crazy. But but still also keep in mind that running this cost us $5,000 a month. All right. So, yeah, sure, we did hit the 1 million requests per second milestone, but it's costing us a huge amount.

[`49:07`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2947) And also also, it's a very simple hi message. All right, it's very straightforward. It's just a JSON message coming back. And no wonder that we should be able to do this, you know, on this beast. But what if we added more logic? What if we tried with the patch request or with some database operations? Now we're talking.

[`49:27`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2967) All right, so now it's going to get way more complex, but we still would be able to do it. So the point is that we can handle, you know, millions per second on this machine with this tester. Okay. So, if we're not going to be able to hit that on the other routes, we should be able to figure out what is going on. All right.

[`49:42`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=2982) We might be having maybe a memory bottleneck or a network bottleneck or a disk bottleneck. Whatever it is, we have to be able to know it. All right? Because we surely know that Amazon is not limiting us and also this tester is not limiting us. All right?

[`50:00`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3000) Let's now go ahead and try it with the patch request. All right? I'm going to copy another command. Paste that over. And it's just like what we had before. Connections though, 500, duration 20s, pipelining 50, and then 120 workers. I'll go ahead and send this. Let's monitor the CPU usage. Idle 80%. That's That's massive. All right.

[`50:22`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3022) So, yeah, this tester is pretty much sitting idle at this point. Now, this is kind of interesting. The CPU usage of the power machine is only 50%. Hm. What is going on here? All right, let's see if this is finished. And it is finished. But hey, look, we only handled 100,000 requests per second. Hmm, seems like something is not right here. And surely we also did not utilize all of our CPU.

[`50:52`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3052) So, we got to figure out what is going on. 100,000 is way, way lower than, you know, this. But of course, we're also doing way more here in this route. Now, I want to tell you what's going on.

[`51:09`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3069) It took me a little while to figure it out, but if you look here down in the bottom, in 20 seconds, we sent 3 million requests and it says 120 GB read. All right. Now, if I go ahead and divide this number by 20. So, if we do the math, 119 GB divided by 20, which is 5.9 GB.

[`51:24`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3084) So we were moving across six gigabytes of data per second. All right, this is massive. This is a massive amount of traffic. And if I go back here to the keynote here, you can see that the network speed here is 6 GB per second. So our main bottleneck here is our network.

[`51:47`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3107) All right, the network speed is not going to allow us to accept more traffic. Now still 50 Gb per second is massive. All right, 10 Gb on your personal computer is still considered very very high. Now, this is just on a whole other level and we're hitting a limit with this. This is quite significant.

[`52:08`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3128) But yeah, you might be thinking, is this the absolute limit? Not really. We can go higher than 50. We can launch another machine. For example, if we go right here to the cost estimator of Amazon, the network performance of this machine is 50,000 per second. So, if we want to go higher than this, we can probably select another option right here. Now, 35 is lower than what we've got.

[`52:34`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3154) But look, 300. All right. Let's see if we can find something with this. Now, it looks like this filtering here is not working. So I can maybe try to look for it like this. And here we have a few instances with 100 and I'll go ahead and show 50. Okay. So 100 is the next that we can try. This one is now twice as fast as what we've got. All right.

[`53:00`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3180) So if I select maybe this one, maybe one of the cheapest possible options that we've got because some of them are quite expensive. So this $12 an hour, we get about 800 GB of RAM, which is crazy. But with this, we can easily handle twice as much traffic.

[`53:18`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3198) And here we were close to 200,000 requests per second. So we're still not going to be able to hit 1 million per second with this instance. But we can go even higher than 100 Gbits per second. Now, there's a power machine right here. If I can find that. It's close to a superco computer. So, look. Give me a second to try to find it.

[`53:48`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3228) All right, here we go. 3,000 per second. With this, we can surely hit that milestone. This is way more powerful than what we need. But do you really want to pay $30,000 a month for having such a powerful machine? This is close to a supercomputer, but yeah, it's very expensive.

[`54:08`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3248) All right, so the point that I'm trying to make is if you want to go that far and make sure you can handle a million requests per second with this API, the cost is going to be astronomical. Okay, now just to give you an example of how significant handling 1 million requests per second really is, I'll go right here to a page.

[`54:26`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3266) So, this open weather API, you've probably used it for some maybe educational projects and this one they charge you for their API and they charge you well the first 1,000 call is free but then they're going to charge you a very very small amount per request. All right.

[`54:44`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3284) Now, if you go right ahead and you do the math, we've got about 2 million seconds in a month. And if you do 1 million requests per second, yeah, you're going to have to add up some numbers, but you're going to come up with $3.8 billion per month. All right. Now, yeah, sure, nobody's going to hit this route a million times a second.

[`55:04`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3304) Nobody's going to check the weather this many times. But the point that I'm trying to make is that it's it's crazy. We're talking some crazy scales here. Now, there's another one. Maybe this is actually way more real world. And with this, surely you might be able to hit 1 million.

[`55:19`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3319) And price per million here is way more manageable at only 90, right? So you just have to pay 90 cents to handle a million requests per second. Now if you again do the math, you multiply this number by 2 million seconds in a month. The cost is going to be $3.9 million. Even with a service that's more reasonable to hit a million times. All right.

[`55:40`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3340) So, I've done a few more and you know with different API services like Google Maps or Cloudflare workers. Now, with this one, I I'd say it's pretty realistic for a company to end up hitting the workers here a million times per second because this is a serverless technology. And sure, for some companies, they might end up doing that.

[`56:02`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3362) But I would argue that it's not it's not cost effective at all. Launching your own computer at this point is way more cost justified than trying to do this. And this one still costs, you know, close to a million dollars per month if you want to hit it a million times per second.

[`56:18`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3378) So we're talking here millions of dollars per year if we are going to handle a million requests per second. All right, so we're on some crazy scale and we can already hit it with a very simple one. But with this next route, yeah, we've got a bit of a problem here. We need to increase our network. And we can surely increase it.

[`56:37`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3397) All we got to do is speed it up by five times. So, if we can go and find a machine. I mean, this is actually a little too crazy. Five times the 50 gig that we've got. We just need to have 250. This is way more than what we need. All right. So, this one is way more realistic.

[`56:57`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3417) So, 200 per second, but well, now this is actually an actual supercomput. So, this one is going to cost us a fortune to run. So, yeah, definitely not this one. But I'm pretty sure you can find some machines here that would cost less. All right.

[`57:14`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3434) Now, also to be fair, in the real world, companies that do handle a million requests per second, which we have quite a few of them. Got some services like Uber and Amazon itself, they do handle at such high scales. They don't have a ginormous supercomputer that handles all the requests.

[`57:33`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3453) What is most probably the case is that they have many servers scattered across the globe and they're doing load balancing and something to connect people to the closest server. For example, they might set up one powerful server here and connect everybody from New York, Chicago, Toronto to this one.

[`57:50`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3470) Then have one more here for California and Vancouver and have maybe one here for South America. Maybe a few for Europe, Africa, India, and all over the place. All right. So now you've got maybe a 100 servers handling many requests coming in and each one can handle maybe 500,000 requests per second. All right.

[`58:09`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3489) So this is usually what happens. All right, not just one massive server that handles everything. And with this you can scale up even more. For example, if you've got a lot of traffic from America, you can add in a few more servers right here. Okay. Right. So yeah, that's usually the case, but we just want to see the significance of handling such a massive high load.

[`58:30`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3510) All right, this network speed again is crazy, but still we hit a limit. All right, now actually what we could do, I'm going to go ahead and change something in my code. So I'll go to the Cpeak code. The reason that we have hit a limit is because we're trying to again generate a huge amount of data.

[`58:59`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3539) So, what I could do is change this array from 100 to just maybe three. Let's see what's going to happen. So, now we're generating a very low amount of traffic. I'll save this and close. And then let's restart all our processes, which would take a while, but yeah, let me make sure that it's going to work fine. So here I got to go and do that patch.

[`59:28`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3568) I'm going to copy this path and then paste it right here. And then for the JSON body, I'm going to specify that thing as well. So just need to select raw and then JSON and then copy this one. And I also change it to patch. So it's not now a big JSON body. It's a little bit but good enough. All right. Still 1 kilobyte. This still could be a real world use case.

[`59:51`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3591) So let's go ahead and try it again and see what's going to happen. So I'll go ahead and run this. Now the CPU is now 0%. So now we are not being bounded by our network card. All right, the network speed is now good enough and also the tester right here is sitting at half idle.

[`1:00:08`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3608) So we can generate more traffic. But obviously our machine, the server is not going to be able to handle it. All right. And now looking back right here, you can see that we handled now 3 million requests per second. Okay, so yeah, we did hit the 1 million milestone here with this route.

[`1:00:25`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3625) But the problem is that if we really want to go with, you know, that much data with 30 kilobytes, now we're going to have to go with some crazy network speed, and it's not going to allow us to go that far. I mean, sure, I can do that, but my bill for this month is getting a little too much.

[`1:00:42`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3642) So, I'm not going to try one of these machines for now. But we could, you know, we could and we can 100% get that 1 million per second even with 100. Hey, this is future me and I wanted to say that we will actually hit the million requests per second even with the length of 100 and moving 30 kilobytes of data per request, but we'll do that at the end of the video.

[`1:01:04`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3664) It ended up being quite the challenge though. I had to launch some even more powerful machines and even then NodeJS couldn't handle it. I then did it with Python, Java, and Spring, even Go actually, and still they couldn't handle 1 million requests per second, even on way more powerful machines.

[`1:01:26`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3686) But I ended up rewriting the code in C++ and use one of the fastest web frameworks in the world right now called Drogon along also with one of the fastest JSON parsers in the world that we've got right now called Rapid JSON. And then, and only then, I was able to finally hit that 1 million per second with this route. It's going to be quite fascinating.

[`1:01:44`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3704) So, make sure to stick around at the end of the video if you want to see that. And now, back to the main video.

## 7. Adding a Storage-Based Database

[`1:01:57`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3717) All right. So, let's move on to another route that we've got. So, I'll go ahead and close this one and expand the next one. Now, here it's a little more interesting because we've got a database write. All right. So, we're just generating a code. Very straightforward. Just 500 characters. That's it. And then we are inserting it into our database. Let me show you this table.

[`1:02:17`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3737) So, here in the database in the tables, I've got one table. Very straightforward. We've got an ID, a created at, and then a random code. So, let me go ahead and try this. So here in Postman, I'll go ahead and duplicate this maybe and then select post to slashcode. And now here we can see that this was inserted into my database.

[`1:02:48`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3768) And now I see this data back. All right. So let's go ahead now and try this. Let's see how many writes per second this power database machine. It's it costs also quite significantly. Here we've got another $5,000 per month and it has a whole lot of CPU cores, a whole lot of memory.

[`1:03:05`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3785) So let's see how many requests we can do with this. In other words, how many writes per second can this database handle? Now before I do that though, let's make sure that the database is completely cleaned. Because if I go and use an application called data grip and take a look at what I've got here. Yeah, I've got two codes.

[`1:03:28`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3808) But what I could do is to say npm run seed. And this is going to clean up the database, recreate the table, and that's it. All right. So if I run it again now, I've got nothing in my database. I'm going to use this command a few times for subsequent runs. I can also specify an argument to insert into this table. We'll use that later on for read benchmarks.

[`1:03:47`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3827) All right, so we have nothing in the database. And now I'm going to go ahead and paste a command. So autocannonpost. This just means go to the next line. So we have everything here. And then connections 5,000 20 seconds. Pretty much everything just like before. Now I want you to maybe guess how many requests per second do you think we can handle with this. All right.

[`1:04:15`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3855) If you have done some SQL, you might have some rough ideas. It's a power database, but how many writes per second can we do on that? All right. All right, I'm going to go ahead and run this. Let's take a look at the CPU usage. All right, pretty much idle here. Also pretty much idle here. All right, so yeah, our power machine is just doing nothing.

[`1:04:36`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3876) All the work is now being done by the database. All right, so let's wait for it to finish. Now, for those of you who are wondering why I'm not using the top command or htop, it's going to be one heck of a mess here on this machine because we've got a ton amount of cores, right?

[`1:04:54`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3894) So that's why I'm going with this command and not with actually top because it's very hard to make sense out of it. It's just a whole lot of text. This one way easier to take a look at. All right, it's well actually we've got a whole lot of errors here. So let me try to troubleshoot.

[`1:05:14`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3914) All right, looks like that the issue was that trying to open up such a huge amount of connections, 5,000 overwhelmed the database, and I was getting a whole lot of timeout errors. All right, so I tried it again with a much lower connection count. This time only 300. And now we handled even more requests per second, 35,000, and we have no errors.

[`1:05:31`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3931) So you can see down at the bottom that 700,000 requests were processed with no errors. And if I go and take a look at my database. So I'll select all from codes. And you can see that actually I'm going to select count all. And you can see here that's the exact same number that we've got. All right.

[`1:05:59`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3959) So close to a million records right now in the database. So this worked. But look at the number of average requests per second. It's pathetic for a machine that costs so much. All right, only 35,000. And our goal is to get to a million. So what the heck are we supposed to do with this route and all we're doing is a very simple, right? We're just saying insert into and that's it.

[`1:06:17`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=3977) We're not doing any calculations whatsoever. We're not being bounded by the node code. You can try it with C, whatever other language you want, and you're going to get the exact same result. All right? Because we're being limited by what our database allows us to do. The CPU usage was very, very low. If I try it again, we're going to see that our CPU is pretty much sitting idle.

[`1:06:41`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4001) And we're also not being limited by the network because we only moved across 500 megabytes. Now one thing that we can do is to keep scaling up the database and actually I went with a very low IO ops. So number of inputs and outputs per second on this instance right now is very low. Yeah, we're we're opening up also 500 sessions.

[`1:07:09`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4029) And if you want to know how many sessions we're connecting to this database, we've got 128 machines each machine. So if you go and take a look at the database and then slash index.js, here's where we're connecting to the Postgress, I'm not specifying a max count here, but this one is by default 10.

[`1:07:30`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4050) All right, so we're opening up 10 connections by each machine to that database. And in total, we have we have a 1000 connections opened up to this machine, which is a whole lot. If we were to go with a much smaller database here, this would have crashed. we wouldn't even be able to connect to the database because being able to have a thousand connections to a database is quite large.

[`1:07:53`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4073) Now, we can actually handle more than a thousand. There's an SQL command called show max connections and you can see it's 5,000. All right, so we're not hitting this limit. We can handle five times more. All right. So,

[`1:08:11`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4091) we can still go and launch five of these beasts and with 600 CPU cores and we can still connect to this database. All right. This is a very powerful database that we've got. All right. But still, in terms of rights per second, it's just pathetic. All right. We don't want to go with this. We don't want to go with like 32,000 per second. So, what is the solution? What can we do to solve it?

[`1:08:28`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4108) Now, if I show you here in my configuration again, provisioned IO ops inputs and outputs allowed per second is only 3,000. But we're trying to write a million times, so this should be way, way higher than what we've got. The problem though is that it's also going to be way more expensive. Now, I'm not going to show you doing that, but here on the screen, I've done it.

[`1:08:53`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4133) When I paused the video, you can see that I modified my database to change my current storage to 500 GB. and then changed the storage throughput as well. And now the input and output per second is 12,000. So I increased my speed by about four times. All right. And here now we can take a look at the result.

[`1:09:11`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4151) I ran it again and we actually got a little higher. We were doing 30,000 before, but with this new diskwe can now handle 66,000 per second. Still a far far away from hitting a million. And also the bad news is that doing that changing the disk added $1,000 per month to the database cost as you can see right now on the screen. All right.

[`1:09:39`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4179) So if we want to keep increasing this number, our cost is going to skyrocket. We're talking at least $15,000 a month just for the database. And even that, I think, is not enough. I didn't try to hit my database one million times per second because that's crazy and you should probably never even do it.

[`1:09:56`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4196) We're going to talk about a solution in just a bit. What you got to do instead is to save this data and then through batch processing save to your database over time. All right, that's a much much more cost-effective way than this. All right, we'll get to that in a bit, but let's just keep it at this.

[`1:10:15`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4215) Let's say that we failed to hit 1 million per second with this database route because it's very expensive and I don't want to burn that much money for it. But yeah, database scaling is a massive thing. We can surely keep on adding more databases, adding more powerful databases, but our cost is going to skyrocket.

[`1:10:32`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4232) So, we're going to go with another solution that I'm going to discuss in a bit. But let's try maybe read. All right. So, I'm going to scroll down. Let's move on to the next route. code version one and we're doing a very simple read. All right, select ID code from this order by random.

[`1:10:49`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4249) So, we're going to randomly pick something from our database and that's it. Here are my postman. I'll just have to change this to get add my v1. Send it across and there we go. We've got a record and I can send it again. We've got another one. Right now in my database again, we've got about half a million records.

[`1:11:16`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4276) Okay, 700,000 to be precise. Now, let's add in maybe 5 million because why not? So, here I'm going to run a command like this. Dash R, meaning how many records we want to add to the database. And I want to go with maybe 5 million. All right. So, I've got three zeros. Three zeros. It's actually right now 20 million. Yeah, let's go with maybe 10 million. Okay.

[`1:11:43`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4303) I'll copy this one. and then put that right here. Now, the reason that I'm going to go with 10 million is that if you are handling a million requests per second, you at least have 10 million records in your database, right? At least. You probably have way more. So, let's try to make it a little more logical. All right, we don't want to go with 700,000.

[`1:11:57`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4317) That's way too low. So, I'm going to go ahead and run this. Now, it's going to insert all of them to the database. It would take a while, so I'm going to have to fast forward. All right, the seeding is now complete. And let's see what we've got. Count all. We've got exactly 10 million. And let's now go right ahead and do a read.

[`1:12:26`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4346) And this is a huge amount of data that we've added in. And it took about 30 minutes to insert all these records. All right. So, yeah, it's a long list. And now we're going to go ahead and try the other route, which is a very simple read. All right.

[`1:12:43`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4363) So, I'll go back here to my tester and then I'm going to go with the same connection, but I'll add in dash v1 here. I'll clear my terminal. And then I have to change my method from post to get. All right. All right. Let's do it. Let's see how many reads we can now do per second. The CPU usage pretty low, right? Almost nothing.

[`1:13:08`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4388) Almost nothing is going on here in this power machine, but the database might be now struggling quite a bit or at least hitting a limit. Okay, so yeah, my server is just pretty much doing nothing, but we're sending a whole lot of requests to grab all these codes. All right. Oops. It's taking a while here. Hey, that's that's interesting. Let's see if we're going to get a response back.

[`1:13:35`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4415) Oh, hold on a second. Yeah, something is not right. So, I gotta do some troubleshooting. All right, so looks like that we just crashed. Well, the database actually crashed and I can send a request to probably grab a data from version one, but looks like we can't even do it. Now, I'm going to try to explain why this is taking so long just for a simple request.

[`1:14:11`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4451) Now, if you know SQL, I just want you to think about what is going on here in this code. It doesn't have anything to do with node. So, just SQL doesn't even have anything to do with Postgress. So, the simple SQL command, there's something wrong with it.

[`1:14:26`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4466) And the thing that's wrong with it is this random. All right, this is actually this is big O of N. All right, actually AI is helping me here. So what we're trying to do is to scan the whole database with this random and then pick one. All right, this is insanity.

[`1:14:41`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4481) And when you have 10 million records, this is just not going to work. It would take an eternity to work. Now here it worked. And look at this. 43 seconds just to get a response back for something that's way way too simple. Okay, so yeah, 10 million records is way too much.

[`1:15:00`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4500) If you have this many records in your database, you don't want to do stupid stuff like this. All right, what about version two? Now, here we're saying select count all and then after we grab all the count, we're going to generate an ID and then send a response back. Okay, I'm actually going to again try it with Postman.

[`1:15:18`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4518) So, version two, maybe this is a little faster. Well, it is faster, but okay. So, yeah, 40 seconds is crazy, but still, let's let's give it a shot as well with this one with version two. I'll go ahead and try it again with version two. All right, I'll have to fast forward, but let's see if it's going to work.

[`1:15:50`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4550) Yep. Even this one didn't work. Yeah, 10 million records might have been too much. We should have gone with maybe 500,000 or something. All right. So, yeah, we can't really do anything when we try to do so much because this count all is actually also O of N, right? The database has to scan to see how many records we've got.

[`1:16:08`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4568) It's not keeping track of how many records we've got. So even this one is so horrible and you shouldn't be doing this when you have millions of records. So this one was very bad, but this is also very close to being super bad. But let's try maybe this one. This one we're getting our max ID.

[`1:16:24`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4584) So we're ordering by ID and then we're generating a number. So generating an ID that's between one and max ID. All right, that makes sense. Now this is not actually big of N, right? So, let's see if this is going to work. And the database is right now going crazy.

[`1:16:45`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4605) So, we may need to wait a little bit for it. Let me restart. We might have some pending stuff going on. Yeah, that takes a while. All right, so this works better. It's only 40 milliseconds, so I'm hoping that at least with this route, we should be able to do that. Now, in my own testings, I did actually get results back. I didn't have 10 million records.

[`1:17:14`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4634) I guess I just only had a million and it did work with that. But let's see if this is going to work now. Hopefully, version three is not going to crash, but I'm not sure. So, let's run it. Oh, awesome. Look. So, it did work, but look at this.

[`1:17:33`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4653) Still, we're so far away from getting it to a million per second. We're doing 200,000 per second, which is still very good, but still again so far away from hitting that. So, if we can increase our performance by maybe five times, we should be able to technically hit a million per second on this very simple route.

[`1:17:54`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4674) We tried it with code version three, but the other routes, they were just so so slow that we probably would have gotten maybe 100 requests per second in best case scenario. All right. Yeah. Because this random is absolutely insane. This is why you got to know algorithms if you want to move into such high stake environment.

[`1:18:21`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4701) You make one simple mistake, it could cost you a whole lot down the line. So this is way better than what we had. I've also added another version, version four. This is only a simple read, so even simpler than what we had here because we're reaching out to our database two times. One to grab the ID and then one to do this.

[`1:18:36`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4716) But this is this is kind of like cheating though. We're randomly generating an ID and we're hoping for the best. Okay, so here I got to change this to 10 million. So here I've got 300,000. So let me change that to 10 million. And let's try it with this route as well. Still our only bottleneck here is the database.

[`1:18:58`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4738) The CPUs are all sitting idle. And looking back right here, yeah, we we managed to go a little higher at 400,000 per second with no errors whatsoever. So yeah, we can do a whole lot more reads here, but if we do the reads properly, an ID lookup is just an index lookup. And this one is instant time. All right, that's why we can do a whole lot of them.

[`1:19:26`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4766) Now, actually, you know what? I'm going to go ahead and change my database to have a much higher input and output rate and then try this one more time and see what's going to happen. All right, I've just gone ahead and modified my database to have a much higher input and output per second. And here in the costs, I have put down what I specified. So, I'm going with 1 TB.

[`1:19:47`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4787) And well, you can take a look at them if you'd like, but the important part here is that I'm now adding $1,500 per month to my costs. All right, so now this database in total is costing $7 grand a month to run. Let's just see how much we were bounded by disk.

[`1:20:04`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4804) I'm not sure at this point, but we're going to try. Now, taking a look here at the database, you can see that Amazon gave me a warning that it's very severe. All right, and let's take a look at this and see what we've got. It says we've got tons of spikes and the CPU load was at 100%. If you can take a look right here.

[`1:20:28`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4828) So yeah, this was this was a whole lot of work. And scrolling down, we also have this thing that says database connections exceeded 1,200, which is expected. We know that we've got 128 instances each with 10 connections. So this makes sense and we can handle up to 5,000. But our CPU utilization was 100%. All right. So, this is probably our main bottleneck.

[`1:20:49`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4849) And this is why we may not see much of a difference with even a higher disk speed, but but we'll see. All right. Dealing with a database at this scale is absolutely crazy, but we're going to see what we can accomplish. So, this modification would probably take up to an hour to complete. So, I'll have to wait for it to finish.

[`1:21:21`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4881) All right, the modification is now done. We now have a much faster diskspeed and I actually ran the tests again. So, here's the right. And you can see it's a little higher than that 30,000 per second, but still, you know, only 50,000 per second. Now, the read is also just like before. It didn't really change. It's still at 400,000 per second. So, what are we gonna do?

[`1:21:42`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4902) I mean, we got to hit that 1 million and seems like that it's proving to be quite the challenge. Now, we saw that our CPU of the database was capped at 100%. So, what we could do is to scale up, maybe add another one of these databases and go with that.

[`1:22:01`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4921) In that case, if I go back to my cost estimator for the database, so this one instance is now costing close to seven grand a month. If we add in another one, technically in best case scenario, we should be able to hit 1 million reads per second, but that's going to cost us 14 grand a month. And that's the best case scenario.

[`1:22:21`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4941) We probably need to go even higher than that. And what about the right? I mean, right is only 50,000. We are so so far away from getting into a million. So what we could do, maybe make our CPU twice as much. So, I'll go with maybe 24x large. We've got 1.5 more CPU here.

[`1:22:40`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4960) So, still not exactly twice, but our our cost is skyrocketing at this point. And then here, I'll add in more storage. I'll actually change this one provisioned input and output operations and try to go with the maximum, which is a quarter million. All right. So, even with this, which is going to now cost $33,000 per month, well, with this one, we should technically be able to hit a million at least with the read with the write. I'm not so sure about that. We might need to even go higher than this.

[`1:23:17`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=4997) Now, we can also go with the Aurora option of Amazon. So, if I go right here, this is something that Amazon would handle. So, Aurora Postgress. Right now, I am on a single Postgress. So, this one, Amazon will do some autoscaling for us, but I did a bit of math and this one would also cost at least 20 grand a month to handle a million reads and writes per second. Yeah, 20 to 30 grand.

[`1:23:42`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5022) So, we're talking some crazy scale right here. All right, this is the scale of Uber and yeah, we're trying to simulate that here. So, it's going to cost us a fortune. Now, I'm done modifying my database. It's going to cost me quite a lot. So yeah, I don't want to do this anymore. I just

[`1:24:05`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5045) want to terminate this and move on to our next route and just say that we we failed at hitting

## 8. Speeding Up with a Memory-Based Database

[`1:24:12`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5052) 1 million per second with our database. But we still have hope. And I'm going to talk about the solution that won't cost us a massive amount of money. And this is where Redis comes into play. Now what you should know is that the read and write speed of your memory is about 10 times faster than your disk.

[`1:24:33`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5073) And Postgress whenever you do a write or read you're reaching out to your hard drive. The data is sitting on your hard drive and your hard drive could be the fastest possible SSD and it's still not going to cut it. And the access time of RAM is usually thousands of times faster than disk. All right.

[`1:24:50`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5090) So with this basic knowledge that we have, we can solve this problem of hitting a million and still have a database. Now what usually happens in these companies that handle such a massive amount of traffic is that well they use Redis which is an in-memory database storage and it's a very easy one to deal with. All right.

[`1:25:10`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5110) So going to the code now. So, we're going to now move on from the Postgress routes. And I've got another one here called code-fast. And this one is going to do the exact same operation that we did in post code, but it's going to write it to Redis instead of writing it to Postgress.

[`1:25:29`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5129) Now, you might be saying, if we are saving them to memory, then we're losing out on all the cool operations that we can do in SQL, all the joins, you know, looking at all of our data in very clean ways. You can't really do that with Redis.

[`1:25:45`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5145) But what we're doing here is that we're saving the ids to something called a que. All right, this sync queue that I've got right here. So we're saving them all to this queue. And then I've got another script called sync. What this would do is that it would read from that queue in our memory.

[`1:26:05`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5165) So this is sitting inside of our memory and then gradually write them to the database. So we can do this operation overnight. Maybe it would take a couple hours and we don't care. Now this is a real world thing. This is what Uber and some of these companies with such insane amount of traffic do.

[`1:26:22`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5182) For example, if you were getting lots of locations from your drivers and you want to keep track of all the locations, you're probably hitting that route millions of times per second. It'd be crazy to try to save all of them to an SQL database. What you want to do is to do just like what we have here. save them to your memory probably by using Redis or another memory storage and then sync overnight.

[`1:26:43`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5203) All right, or not just overnight in a background process. And also you might be wondering what about all the data that we've got in our database. All right, let's go ahead and take a look at them. Now here so far we've got I think yeah the count all you can see it's loading for quite a bit. So let's wait for it to finish. And there we go. We've got 11 million records in our database.

[`1:27:08`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5228) Now, using this command right here, we can see how big our whole database is, right? This whole codes table. So, you can see that it's 16 GB of data. Now, what if we move the whole thing into our memory? Can't we do that? What do you think? Well, on this power machine, okay, I'm going to run a command. I've got another alias which is called memory usage and this is just free-hum.

[`1:27:45`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5265) Now this is going to tell me how much memory I've got and how much I am using. You can see that I've got a quarter of terabyte of memory. All right, 200 GB of memory. So what I could do is that I

[`1:27:56`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5276) can move my complete database from my disk over to my memory and only read from that or write to that and that should be way way faster and cheaper compared to the other solution of trying to scale up our database. So I have added in another piece of code called migrate. And what this does is that it's going to move all the data from Postgress over to Redis. All right, using batching.

[`1:28:20`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5300) So you can read this code if you'd like, but again all that happens is that we're doing a flush for our database and then doing select ID code created at and then in batches of 2,000 we're going to move everything into our memory. All right, it's pretty cool.

[`1:28:39`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5319) So, let's go ahead and try this one and then do a few benchmarks. All right, let me make sure that I've got my Redis going. So, I'll take a look at my aliases again here because I've added a few for Redis. All right, so I'm going to have to run start Redis. If I do get Redis, tells me that I've got something running.

[`1:28:59`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5339) And yeah, I think we are now connected to Redis. So let's go ahead and give that a shot. So this route that we've got code fast, let's see if it's going to work. So in Postman, I'll send a post request to code then dash fast. All right, there we go. Cool.

[`1:29:22`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5362) So you can see that this data was created and this is now sitting inside of our memory. Okay. And I can take a look at this data. I can go into my Redis CLI and I'll take a look at all my keys and there you go. All right. So this is all in our memory and Redis is key value pair. All right.

[`1:29:43`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5383) So each one of these these are the keys and we can take a look at the value of each one. Let me use this command h get all try to get code two. And there you go. All right. So this is the code that I have right now sitting inside of my memory. And I've got one more for code one because I clicked on it two times.

[`1:30:02`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5402) If I keep clicking on it, you can see again if I take a look at all the data, I've got now code five, code four, and code three. All right, looks pretty interesting, right? That we're now having all our database in our memory. So, let's go ahead and give this one a shot and see how many we can handle with this.

[`1:30:20`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5420) Remember with writing to Postgress, we could only handle 40 to 50,000 requests per second. So now I'm going to try it with Redis, right? So the exact same command as before, but I just changed this one to code-fast. Let's go ahead and send it. Now we're saving a whole lot of data into our memory, but that's okay. That's what we want, right? Let's first take a look at our CPU usage.

[`1:30:44`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5444) All right. So, it's sitting at 80%. Still a whole lot idle. A huge amount that we've got that we're not making use of, but better than what we had before, which was sitting at almost idle. All right. If you take a look here, we're now at 100,000. And this is at least three times more than the Postgress write. All right.

[`1:31:10`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5470) So if the costs were 30 grand a month with this one, we can cut it down to 10 grand. All right, if we keep saving like this and then we migrate the data over, but still not million, right? We're still so far away. And the reason that we're still not

[`1:31:35`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5495) at a million even though we're just in our memory and we have a huge amount of idle CPU is because a single Redis instance is limited to only about 100k requests per second, right? So 100k reads and writes and what we got to do is to scale up. We need to run more instances of Redis to be able to handle more than 100k. All right. So a single Redis instance is not going to cut it here for us.

[`1:32:01`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5521) But let me show you the read now and then we're going to talk about that clustering. So here I've got another route get codefast and this one is going to well read a code from Redis. Again keep in mind that we've got the exact same logic. So we're checking even for the uniqueness of ID before we write to Redis. Right. So I'm going to go ahead now and actually first let's migrate.

[`1:32:20`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5540) So I'll say npm run migrate. So now with this, we're going to move all of our data from our database over to Redis. Okay. So everything is now flushed and now it's going to move. So now we've got half a million and it's going to have to get to 10 million. So I'm going to wait for it to finish.

[`1:33:01`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5581) right, this is now over. So, let me take a look at my memory usage. And you can see here that I'm now using 20 GB of my memory. I still have a huge amount of free RAM, but 20 gig makes sense. Again, taking a look right here, we've got 16 GB. We're saving a little more here to our Redis.

[`1:33:13`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5593) So if you read the code here in the migrate, we also have this one to keep track of the last ID. So we can now allocate ids. We also have another one called codes unique where we save each ID in a set. So now with this we can make sure that we do not have duplicate IDs.

[`1:33:31`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5611) All right, but yeah, that's pretty much it. So we have a bit more data here than just 16 GB, but it does match. All right, so now we have the complete database in our memory. And this is something that you can do. All right, you can move your complete MySQL or Postgress database in your memory if you have enough RAM, which in this case we have a huge amount.

[`1:33:52`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5632) All right, let's go ahead and do another test. And now I'm going to say code-get and let's see how many we can get. Now with Postgress, we managed to get about half a million per second. So let's give this one a shot. Whoops. Actually, I mistyped this one. So, let me try it again.

[`1:34:27`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5667) Yeah, code fast. I was saying code-get. Yeah, I immediately noticed this one because I saw six million per second and I thought, heck, no way. All right, there we go. So now this is about 300,000 per second which is kind of comparable to the Postgress database but we don't need to now

[`1:34:45`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5685) pay a huge amount of money for the database and if we now do clustering this is going to be way way more than what it is right now. All right so now you should know the importance of Redis and how much it could save us money for a heavy route.

[`1:34:58`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5698) It could be a gamechanger that now instead of having to drop thousands and probably millions of dollars on your storagebased database. With this, you can cut that down to something that's a fraction of that and you can easily migrate. You can sync and you don't need to actually move everything.

[`1:35:17`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5717) You can only move the tables that you know that you're going to hit quite a lot. For example, here we're building an application called weer.pro. It's a URL shortener app. But say that we're going to handle maybe I'm going to copy a link and then we can drop it here and then shorten the link.

[`1:35:32`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5732) So we get a shortened link, but we've got different custom links. So we can select maybe a six character code right here. So what we can do if we're handling 100,000 requests per second and all of them are maybe this specific type of a code, we're going to now move this whole six character type in our Redis. All right.

[`1:35:50`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5750) So in memory and then we're going to have synchronization in place and that migration in place as well and this is going to be way way faster for us and would help us cut costs dramatically. Now we're going to talk about that later on. We're also building this one with Cpeak. So it's going to be a lot of fun.

[`1:36:12`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5772) All right. And it's going to be a product that everybody can use even if you're not technical. So be sure to be subscribed if you want to follow along with this. All right. So now what? We still

## 9. Redis Cluster Mode

[`1:36:21`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5781) haven't hit 1 million per second here with our database. So what are we going to do? Well, I'm going to have to introduce you now to Redis clustering. All right. So I want to come back right here in my own code and show you how I'm going to run it in cluster mode. So I'm going to collapse this one and this one too and also this one. All right.

[`1:36:40`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5800) Okay, so now we have talked about pretty much all these routes, but here we've got yet another one code- ultra fast. All right, with this we can now hit a million writes per second. I'm not going to ruin the fun now. So let's first talk about the Redis clustering and then we'll see this in action.

[`1:36:57`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5817) Now here my I'm going to go back to my local machine. We'll then come back to these power machines in a bit because it's a little easier here for me to demonstrate Redis. Now here I have added in a bash script called Redis.sh. With this script you can easily run many clusters of Redis. Okay.

[`1:37:17`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5837) And here's how you can run it. So I'm going to go ahead and run this. I'll say Redis.sh and then dash setup. And that should be pretty much it. Yep. So I'll go ahead and run this. This is going to set up 30 clusters of Redis now on my machine. All right.

[`1:37:42`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5862) Now the clusters are created here in my activity monitor. You can see that about 30 servers are now running on my machine. So 30 different processes. A single Redis instance is single threaded. So it's not going to be able to really scale that much. And it's going to again cap at around 100 to 200,000 reads and writes per second.

[`1:38:00`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5880) But look at this. We've got a huge amount right now. And with this, we should be able to hit that milestone of 1 million per second. All right. Now, the thing is that with cluster mode, your commands are going to be slightly different because you got to make sure that when you're doing a write, which one of these instances is going to end up with that data. All right. Yeah.

[`1:38:26`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5906) So, it's not actually that bad. Cluster mode is very smart. It does some automatic hashing behind the scenes, so you don't need to worry about it much. But still, you got to take care of a few operations. Now, let's take a look at this ultra fast code and see what we're doing here.

[`1:38:43`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5923) Now, first of all, we don't need to take care of the ids ourselves. That sequential ID is actually very slow because as you know, we got to keep track of this code dash unique. So that's an extra write to our Redis, right? Yeah, I know we even got to take care of this one when we are in such a massively high stake environment.

[`1:39:07`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5947) So here what I'm going to do is to use crypto.randomUUID which is going to generate a random 122bit ID, right? So kind of like MongoDB if you are familiar with that. And with this now, we don't need to worry about making sure that it's unique or incrementing it one at a time. We can be very random.

[`1:39:29`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5969) And we're still saving it to our queue but a little differently because we have this shard. Now, I'm not going to explain much what this does, but basically whatever data you put here in bracket, Redis is going to hash it and then end up with a number. And that number would correspond to which one of these nodes the data should go to.

[`1:39:46`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=5986) So if you keep this the same, it would always go to the same node. All right. So this is a major difference with Redis when you have only one instance. So you got to take care of this one as well, but it's not too bad. You just need to change your code a little bit and that's it. But now we also have this ID.

[`1:40:04`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6004) The logic is quite straightforward. And then in our synchronization, now this one does not work for a cluster mode. I did not modify it, but I may do that in the future. But it's an easy change. So yeah, going back to this. So not having to worry about IDs would actually speed it up even more. But you might be thinking, well, what if we end up with a duplicate?

[`1:40:27`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6027) Now, if you scroll up here, we've got 122 bits. Again, each bit is either a zero or a one. So if you want to check the entropy, right, in simple terms, right, just if you don't want to worry about any of this math, but I've added something here for you to check.

[`1:40:45`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6045) So based on the birthday paradox, if you want to calculate the probability of ending up with a collision, you've got this formula. All right, this E is the Oilers's number, which is this. And then N total possibilities, which is 2 to the power of 122, and N the number of UUIDs that you got to generate so that you get a P of at least 50%.

[`1:41:11`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6071) All right, so we plug in 50%, long story short, if you don't want to worry about any of this math, if we keep creating at 1 million requests per second, it would take 86,000 years to reach a probability of at least 50% to end up with a duplicate ID. All right, so yeah, we're not going to worry about it. Now, the math is very solid.

[`1:41:34`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6094) Just look over it if you like, if you know some discrete math. This birthday paradox is actually a very fun problem in math. A lot of attackers use it for hacking but yeah it's very cool and yeah this is going to take us a whole lot of time to end up with a duplicate.

[`1:41:50`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6110) So we can now totally get rid of that logic and for the ids whenever we do an insert in our database we can just let Postgress handle it. All right and here we want to be extra fast. So yeah we're going to now go ahead and try it with this code. Now I'm going to go back to the beast machine. So let me pull up the terminal.

[`1:42:15`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6135) Now I guess I have now one instance of Redis. So let me stop Redis and then because this is now in standalone mode and we don't want it to be like this. We want to have a cluster of instances with this.

[`1:42:30`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6150) You saw that we were capped at only 400,000 reads and for writes it was, I forgot but something yeah 150,000 writes per second. So still pretty good but we want to go at 1 million. Yeah, I'm trying to shut down my Redis server, but we've got 10 million records into that. So this would take a while. And yeah, I'm going to just wait for it to finish.

[`1:43:08`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6188) All right, seems like that it's now stopped. There we go. All right, so now I'm going to run that script again. Dash setup. I also need to say dash prod because we've got Redis 6 right here on this machine and this dash prod is going to use Redis 6. I'm going to go ahead now and run this. Okay, now we've got all these slots ready up.

[`1:43:27`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6207) And now I need to also change my ecosystem config file. So let me delete all the PM2 instances. Yeah, this is this is kind of satisfying actually. So I'm going to vim my ecosystem. So if I pass in Redis cluster false, it's going to connect to a single instance of Redis. Now if I say true it is going to try to connect to all.

[`1:43:48`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6228) So if I run node cpeak.js and specify that environment variable like this. So Redis cluster equals true. Here we can see that it says Redis cluster ready and total nodes is 30 masters 15 and replicas 15. All right let's see what this means. Just a quick recap.

[`1:44:13`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6253) Let's try to have this picture in mind that we've got our hardware right here. We've got that main node instance on port 3000 and we've got 127 more node instances right here. Absolutely massive. And this is how we're handling the traffic, right? We keep sending data from the internet.

[`1:44:32`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6272) So when we run autocannon, they all end up here in this main parent node and then the traffic is distributed across the node processes. All right. Now when we were connecting to our database, we were again reaching out through this network card through another machine to grab some data. All right.

[`1:44:49`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6289) And the data on that machine itself was sitting on the storage. All right. So now what we want to do is that we want all these processes to only reach out to the RAM right here. So we have our Redis instance on this RAM and we've got a whole bunch of them, right?

[`1:45:10`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6310) So here let's just take a look at our RAM and also just zoom in on one node process. Let's say that this node process wants to get code with this ID. All right. Now you saw that we had 15 masters and also 15 replicas. So each master has a replica meaning a copy of itself. So if one goes down it can easily copy itself. All right.

[`1:45:29`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6329) Redis cluster is actually very very smart. So what happens here? Here I have this ID in bracket. It would reach out to Redis and Redis is going to hash the content inside and come up with a number that maps to one of these instances, right? Let's say maybe this one.

[`1:45:48`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6348) So now Redis knows that this particular data is sitting on this instance. So it's going to reach out to it and then grab the data. So we're going to end up with the actual data right here and then it is sent back to the node process. All right. So, it's pretty straightforward actually. Let's go ahead and try it now.

[`1:46:08`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6368) So, we're now connected to all these nodes. All right. We've got 15 masters. We do the writes to the masters, but we can also read from the replicas. All right. So, I'm going to exit out and then run my application with PM2 to utilize all the CPU power. So, I'll say PM2 start ecosystem. And there we go. And now the moment of truth. Let's see if we can hit 1 million.

[`1:46:32`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6392) So, I'm going to go ahead and run this again to code ultra-fast and it's going to be a post request. So, let's see what's going to happen. I'll go ahead and start it here in the tester and also the power CPU. Well, all right. So, power idle CPU is now pretty much close to zero.

[`1:46:53`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6413) Not 100% zero because it's very memory intensive, but you can see it's very, very low. All right. So, we don't have pretty much anything idle. Our complete CPU, all these cores are now being utilized for this one. And take a look at this. All right. There we go. 1 million requests per second. This means that we managed to write to our database a million times per second. Hooray.

[`1:47:23`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6443) We we reached this objective of handling a million requests per second while having a database. Now, again, we're going to do this synchronization maybe overnight. So we've got all the ids. So all we got to do is read all of them and then in batches write to our database. But this route right here, thanks to Redis and not just Redis but Redis with cluster mode can handle a million requests per second without costing millions of dollars. All right.

[`1:47:47`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6467) Now, I realize that what we're doing here is very straightforward, but you can kind of imagine that even if the data was larger than this, it would still work. You know, yeah, sure, maybe you got to add in a little bit more CPU cores. If you have more data, maybe increase your RAM by a bit,

[`1:48:10`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6490) but worst case scenario, you're going to end up with maybe another one of these power machines that's going to cost another five grand, but nowhere close to billions of dollars with Open Weather Map or with millions of dollars with maybe some of the other APIs that we looked at. Okay, so that's pretty cool.

[`1:48:26`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6506) Now, this is only write though, but if we can write a million times, of course, we can also read a million times. The point is that this now works. Let's keep sending it another time. It's very satisfying to take a look at this. And then I'm also going to monitor all the CPU usages of my node processes. And you can see that they are also at full power.

[`1:48:46`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6526) Right? So all these processes are now kicking in to handle all these requests. Now sometimes they are at 50% because now Redis is going to kick in to take up the rest of the CPU. But yeah, that's pretty cool. We're now handling a whole lot of requests and we are at this 1 million. I can keep on sending this over and over again and it's going to be more than a million per second.

[`1:49:15`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6555) Now, if you want to go into your Redis cluster and then take a look at keys all, it could be a little daunting, but you could do so with this command. So, you say --cluster. Now, this is going to be huge. Like, we've got millions of records here. I don't even think that this could actually work.

[`1:49:31`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6571) But yeah, there you go. So, all the codes are now here. It's It's a lot. It's a lot of codes. We've got at least 60 million records right now in the Redis instance. And let's also take a look at our memory usage. And oh, look at this. We have 100 GB used up. All right.

[`1:49:43`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6583) We're almost there to completely use up the complete memory that we've got on this massive machine. All right. Okay, so we soon need to maybe get a terabyte of RAM. All right, so that's another problem right here. If we are getting a million requests per second and we're saving it all to our memory, we got to quickly free it up.

[`1:50:07`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6607) All right, maybe do that batching to Postgress or write them to disk or something and then handle it again. So if I keep just doing this, I think every time it's going to add a huge amount to our database. Every time it's going to add in at least 20 million, right? So this is I think the fifth time that I'm running this.

[`1:50:26`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6626) So we're going to end up with a 100 million records in our database. That's huge. And we're doing it in pretty much instant time. You saw that with Postgress. This took us a huge amount of time to just add in 10 million. It took us close to half an hour. With this, it's very fast.

[`1:50:43`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6643) Of course, we're we're almost running out of memory, but but you get the point. We can at least handle a million per second. So you can now see how how intense it is to do 1 million requests per second. It's no joke. A simple mistake here could be absolutely costly. We're talking like tens of thousands of dollars.

[`1:51:02`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6662) You saw here with this SQL code that if we were to go with version one and and you were under the impression that we just need to scale up the database instead of trying to speed up the code. Yeah. This would have been a disaster.

[`1:51:20`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6680) Now I know I know this is a very simple example but it happens countless times in production that people don't try to worry about increasing the speed of the code and they would just say oh let's try maybe just do horizontal scaling or something like that. All right I need to take a break. It's been quite stressful doing this video. I need to be very careful.

[`1:51:39`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6699) I haven't even taken a launch break because every hour it's costing me close to 20 bucks to just keep these servers running. So, now that we are at this point, yeah, I want to take a break and I'll come

## 10. C++ with Drogon and RapidJSON

[`1:51:53`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6713) back here. But we had a lot of fun doing this. So, hopefully you've also learned quite a bit. All right, I got one more thing to show you and that is that I have found out how to reach a million requests per second with this patch request without breaking the bank.

[`1:52:19`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6739) I mean, sure, you can infinitely always launch more powerful computers, but I also wanted to do it in a way to keep costs down. All right, so let me show you what I've done. So, I've gone ahead and launched two more servers. Now these are very powerful about 1.5 times more powerful than the power servers and I'm calling these beasts.

[`1:52:41`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6761) All right, so beast tester and beast server one. Let's take a look at the config of this one. So recall that this is what we had before with C8i32xlarge and also my own Mac Studio. Now these beast machines are called C8GN.48xlarge. The N stands for networking. All right.

[`1:53:02`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6782) So, it's pretty much similar to this one, but 1.5 times larger, and it's very network optimized, which is something that we want. It has 192 CPU cores, 384 GB of RAM, and a massive 600 Gb per second. All right, this is unbelievable. And it's far more than I can even imagine.

[`1:53:25`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6805) So, we're going to put this into use and see what's going to happen. And also, the price is about two times more than this. So around $11 an hour or $8,000 a month. Okay. So here in the cost estimator I have selected this instance and I have two of these machines running. One for the testing and one for the server.

[`1:53:44`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6824) And the monthly cost right now for these alone is around 17 grand a month. I also tried it with 24xlarge but I couldn't get to that 1 million. So we need a little bit more CPU power to really hit that. All right. So I have gone ahead and logged into these machines.

[`1:54:02`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6842) So here I've got my beast server one and here's my tester terminal. All right. So I've gone ahead and started node. You can see that I've got a whole lot of them. 180. All right. So I'm not going to start 192. We want to keep a few cores not being fully utilized. So let's go ahead and give it a shot. And I want to start with this command.

[`1:54:20`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6860) All right. So I'm going to run this method patch. the exact same stuff that we've got as before, but I'm reducing down the pipelining quite a bit to only 20 and also the duration to 60 cuz we're moving a huge amount over the network. We need to let it to kind of warm up a bit. So yeah, let's try it with 1 minute. And I'll go ahead now and run it.

[`1:54:44`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6884) And here in the CPU usage, it should go down anytime now. All right, it might take a little bit, but there we go. So now 4% and it's going to stop around here because we've got a few cores that we're not utilizing now. Yeah, we're moving a huge amount of data right now over the network and let's see what's going to happen.

[`1:55:15`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6915) All right, let's take a look and see what we've got now. CPU usage again was fully being utilized, but the network was not being fully utilized. Sure, we moved across 20 plus gigabytes per second, which is a whole lot. 20 time 8, so 160 gigabit per second. All right, so this is still quite a lot, way more than what we had here with this machine.

[`1:55:35`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6935) So this machine C8i could have not managed this amount of traffic. It would have capped at 50 Gb, but yeah, here we are reaching 160. But still so far away from reaching that 600 of the beast machine's network speed. So we still can go way more than this. But you saw that we actually hit a limit here with our CPU.

[`1:55:56`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6956) So yeah, node here is struggling quite a bit. What we could do is to launch a server that's even more powerful than this one. Something that's got maybe 300 cores. And actually, I went ahead and I tried it,

[`1:56:13`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6973) but I still couldn't get it to 1 million because apparently this massive amount of work to all this traffic ending up in the parent process and then getting distributed across all the child processes is just too much. And that overhead is not going to allow us to get into 1 million per second. All right, so yeah, Node kind of failed me here at this.

[`1:56:30`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=6990) And don't even think about trying it with Express. And you know what? Why not? Let's let's try it with Express as well. So I'll delete all and then I'll try it here with express PM2 start ecosystem and I going to run the test again. I need to change my port to port 3001 because that what my express server listens on. All right.

[`1:56:53`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7013) So this one should now kick in. Okay, there we go. It's going down to 5%. All right. All right. As you can see here with Express, we can barely even get into half a million. All right. So, yeah, with Express, there's no way that we can reach a million with this. It's too slow. But with Cpeak or Fastify, we can get very close. All right, we're getting we're almost there.

[`1:57:24`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7044) We just need to push it a little further until we get into a million per second. But what can we do? We need more CPU and I'm not going to launch a more powerful machine and even if I do, it's still not really going to work because we have a lot of overhead.

[`1:57:42`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7062) All right, Node and JavaScript in general or Python and Java, these are not very suitable for these extreme cases. Okay, because we're doing quite a bit of CPU operations here in this handler, right? We're doing a few checks. We're doing some string manipulations and generating some amount of data.

[`1:58:05`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7085) So whenever you're doing some CPU intensive operations in a language like Python, JavaScript or Java, you probably would see a good improvement if you switch to something like C, C++ or Rust. And that's what we're going to do. I'm going to now run this application, but using one of the fastest web frameworks in the world which is called Drogon or Drogon.

[`1:58:24`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7104) And I've got that code right here. So I've gone ahead and rewritten this application in C++. And let's go ahead and see if we can run it. So here in my beast server, I'm going to delete my PM2 servers. And then right here, yeah, I've been trying it with a few different technologies like Go, Rust, and Java, but even Python, but I only managed to get into this 1 million with C++.

[`1:58:56`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7136) And even this one was actually tricky. I tried it with this Drogon, which is actually one of my favorite frameworks of all time. And by default, it was far even slower than Node.js. It was four times slower than Node.js. And the reason was the JSON parser, the default JSON parser of this Drogon was actually slower than the V8 one. All right.

[`1:59:25`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7165) Now, don't worry if you don't know anything about C++. This is just like the same concept. All right. If you've been following along with the Cpeak development and also you know some C++, I can guarantee you that you're going to learn this framework in no time. All right. It's all the same concepts.

[`1:59:40`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7180) We have already mastered all the fundamentals and core concepts. So here, yeah, we're just doing the same things, setting the headers and setting the response body, reading from the request and all that kind of stuff that you should know if you know enough of backend engineering. All right, so yeah, pretty straightforward here, but I had to play around with this code and keep optimizing it until I managed to get into 1 million. So back to this JSON thing.

[`2:00:04`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7204) The Drogon one was quite slow, so I had to go with Rapid JSON, which is right now one of the fastest JSON parsers in the world. It's not the fastest. There's still another one that's even faster than this. And I could have gone with that,

[`2:00:23`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7223) but with this, I got to a point of optimization that I hit finally that 1 million and I called it a day. All right, but I can guarantee you that we can go ahead and speed up this code even more than what we've got. All right, let's go ahead and run it. It's It's quite interesting.

[`2:00:34`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7234) And yeah one more point here at the end I am setting my threads. So with this the application the framework itself is going to handle the threading. All right so we don't need to use something like PM2 here in this case and also I am disabling the compression and logging.

[`2:00:52`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7252) All right just so that we have something very similar to our node application. In the real world, you should definitely use compression. But because we want to simulate here having a request that is 30 kilobytes, I'm going to disable it because if we do end up enabling compression on this response, it is just going to be nothing.

[`2:01:09`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7269) All right, it's right now 30 kilobytes, but because we have a huge amount of repetition in this response, compression is going to reduce it to only 1 kilobyte. All right, so yeah, we don't want to do that and because we're testing of course, but in the real world, you got to do compression. I will also put a link to this project down below. So if you know C++ feel free to check it out.

[`2:01:36`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7296) Okay. So let's go ahead and run it here in the CPP 1 million. I have written another bash script that I can easily use to build this project. Right? So all I got to do here is say Redis excuse me do. All right it's called do and then run. Right? That's it. That's all I got to do here.

[`2:01:52`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7312) So it's going to now build the project and the server is actually running but I have disabled the logging again. It's going to log that the server is now running on this port but I wanted to disable all the logs to get the maximum amount of performance. All right.

[`2:02:09`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7329) So here in the configjs I have disabled the logging and also that compression. Okay. So with this in place here's also our CPU usage. I'm going to run this test again. And I got to change the port now to 5555. Okay. All right. Let's see what's going to happen. Okay. It's now fired up.

[`2:02:34`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7354) Again, it would take a little while for it to kind of move all this traffic to this server. Okay. There we go. So, the CPU is going to be idle at around 30%. It's not going to go any lower than that because I'm guessing we're hitting actually a limit with the network card itself.

[`2:02:52`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7372) Well, not the network speed, but yeah, this is kind of confusing why I was not able to get it further than this. But you know what? Because I hit that 1 million, I I said, "Yeah, okay, this is good enough." But we can certainly utilize more CPU. Okay. Now, if I show you the CPU usage of the process, I'll run the top command. Yeah, here's the CPP server.

[`2:03:16`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7396) It's utilizing a huge amount of CPU but not a lot of memory. All right, so the memory usage here is incredibly low. This is also our idle CPU here in the top command. But yeah, I realize that it's a whole lot of text here to take a look at. So let me exit out and do that CPU usage instead.

[`2:03:27`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7407) Oh, it's done. And look at this. So we ran it for 60 seconds and the average is 1 million per second. All right. And we even gotten to a million and 200,000 requests per second. And it's pretty consistent. All right. So 50% of the time we've been hitting this 1 million. Yeah, sure. It also was 31,000, especially at the beginning.

[`2:03:54`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7434) And again, this is what I think is that warming up because we're moving an insane amount of traffic. Hopefully you realize how significant this is. This is 38 GB per second. This is this is absurd. 38 * 8 is it's 300 gigabit per second. Now if I let me open up an application called blackmagic.

[`2:04:18`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7458) So the disk speed of my Mac studio right now if I start it is around 3 GB per second. Right. The read is around 5 GB. All right. So five. All right. Five five GB per second. and it is considered a pretty fast SSD. All right, it's still really fast and it's only 5 GB.

[`2:04:41`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7481) Now, here the network is actually eight times faster than my disk. This is just unbelievable. This is on a whole other level. I've never dealt with a network this fast and we're utilizing it. Here, if you take a look, two terabytes of data. Now this is actually the application layer transfer data size.

[`2:05:05`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7505) So the actual one is a bit higher than this if you also count in the TCP packets and whatnot. But 2 terabytes in just 1 minute is just insanely fast. It's like you have a disk that's 2 TB, an SSD disk, and you copy it to another disk that's 2 TB and you do that process in one minute. All right. This is just speed on a whole other level.

[`2:05:34`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7534) And we managed to get to 1 million here with C++. Now, yeah, this Drogon is so powerful. C++ is just so powerful with this framework here and Node.js, I personally feel unstoppable, and I'm sure you would too if you learn it because this is so incredibly fast, so incredibly powerful. And whenever you want to have a lot of power and a lot of speed, you would use Drogon.

[`2:05:56`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7556) And whenever you want to have development speed, you would use Node.js. And then you can have an Nginx running on top of your server, have some routes written here in C++ and some routes in Node. And with this, you can literally do whatever that you can possibly imagine.

[`2:06:12`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7572) There's nothing that's stopping you here with C++. You can create a full-blown operating system with it. So yeah, now again, we can utilize this probably more because you saw that we had a whole lot of idle CPU at 30%. So yeah, we've been utilizing only 70% of our CPU and still achieved a much better performance compared to Node.js.

[`2:06:30`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7590) So if I scroll up here, well, let's not worry about the express, but here with raw Node.js, with Cpeak, you can see we've got about a 30% boost in the requests per second and still we've been utilizing far less CPU. All right, with node we were utilizing our whole CPU, but here with C, we were only using 70%.

[`2:06:58`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7618) All right, it's this is quite significant and this is why you'd actually see that the companies who do have such massive amount of traffic like millions of requests per second, they don't use things like Python or Node usually for those cases unless it's very very heavily IO dependent. We probably won't see much difference.

[`2:07:15`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7635) If we do the SQL routes here with this C++ code, it would be pretty much the same because we were really bounded by SQL. Same with Redis. Yeah, we can of course also connect Redis and Postgress here to this code and it's actually really easy to do that. Redis itself is written in C. So yeah, we can totally do that.

[`2:07:31`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7651) There's nothing that's stopping us. We're communicating over the network. So you can use it with whatever language that you'd like. Now, I was also interested to see what's going to happen if we put a load balancer on top and see if we can really utilize the remaining 30%. But it turned out to be actually not quite the case. So, I also went ahead with a load balancer.

[`2:07:51`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7671) So, I set up two of those beast machines and still really I couldn't get to that point because I'm guessing, you know, when you reach such an insane traffic, 300 Gbit per second. Yeah, probably Amazon itself was putting a limit on us. This load balancer apparently we got to contact the Amazon customer service here and tell them that we want to have some unbelievable amount of traffic. So, give us a little bit more resources.

[`2:08:18`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7698) But on its own, even on the internal scheme, I could not really get it. Also, it could be the case that we need to tweak the system here. So, we got to probably run a few terminal commands and make sure that our Linux machine can handle such a massive amount of traffic.

[`2:08:35`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7715) That's another one of my guesses that the limit that we can't utilize the other 30% is because the Linux machine itself is actually limiting us either here on this server or here on this tester. Right? All right, so that could be the case, too. But yeah, I'm going to call it a day now.

[`2:08:51`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7731) All right, we've been doing enough testing and we also finally managed to get into 1 million even with this patch route. Well, actually, I really wanted to end this video right

## 11. The Final Colossal Tests

[`2:09:04`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7744) there, but I had a tough time sleeping last night because I this 30% that we were not utilizing was constantly bothering me. So, I decided to go for one final test, one big test to end them all. So, I decided to take another approach and instead of having one beast server, have multiple small ones. I really tried hard to get it to 0% of idle CPU with that beast server.

[`2:09:23`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7763) But turns out that actually the tester itself is hitting a limit that it can't open up enough connections to really utilize the rest of the power of the server. So, here I want to show you what I've done here for this next test. Now, I'm doing a commentary on myself. So, I recorded this.

[`2:09:42`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7782) I didn't talk because I thought it's not really going to work, but just in case it would work, I'm going to have this. But yeah, it did end up working. So, here I'm going to go ahead and launch a few small instances instead of one big one. So, I have created one image. And I selected it.

[`2:09:58`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7798) I'm going to go here with C8gn.2xlarge. It has only eight CPU cores and 16 GB of RAM. and the other stuff just like before. Now here in the advance I'm going to select this IAM thing so that we can do some extra stuff like pushing the logs to another machine and also I'm going to select the placement group so that the servers are going to be close to one another.

[`2:10:32`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7832) Now here I'm trying to give it a tag but actually I really didn't need to do this. All right. Now here's the fun part. I'm going to now launch 100 of these machines. So, I put 100, clicked on launch, but it didn't actually work because we hit a limit with Amazon. And the limit is 800 CPU cores per region.

[`2:10:49`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7849) The default one is actually 32, but I ended up sending a lot of requests to increase it over time. But yeah, 800 didn't work. So, now I'm going to try 80. Still didn't work. And I guess at this point, I'm trying to figure out what to put. So, I'm trying to do a bit of math to see how many more we can go with.

[`2:11:06`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7866) So, but I guess I ended up Yeah, I gave up. Tried to brute force and then maybe go with Yeah, here. Yeah, 60 would actually work. So, 60 computers all launched and yeah, take a look at this. This log is it's so massive. So, all these computers are now running and we've got a whole bunch of them. Just take a look at this.

[`2:11:32`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7892) lots and lots of computers waiting for all of them to initialize. It would take a couple minutes so I had to wait for it. Now here I want to show you how much it costs. So c8gn.2xlarge and we have 60 of them. So per month this costs $20,000 just for the testers. All right, or about 30 bucks an hour or 40 bucks I guess with that beast server in place.

[`2:11:54`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7914) All right, so here I have created a bash script. You can rewind and pause the video if you want to take a look at it, but basically all it does is that it's going to send the autocannon to all these 60 machines and then it's going to grab the output.

[`2:12:09`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7929) All right, so yeah, here I'm trying to figure out what values to go with. So I went here with a very low connection count. Yeah, here you can take a look at the result that it actually works and I got the output of all the machines. Now you do see the error but that's because autocannon outputs to standard error by default. All right. Yeah. So it works.

[`2:12:33`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7953) In 20 seconds, you can see that we still handled about a million requests with that machine per second. So now at this point I'm feeling kind of confident that, all right, do this works. Let's go for that final big test. So here we can see that connections 800 and I'm going to now change the duration to something much higher. All right.

[`2:12:53`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7973) So, instead of going with 3 minutes, we're going to go with 1 hour. All right. I'm feeling excited, hyped up... that this is just going to be insane. Like, the amount of traffic that we're going to send is just mindblowing. All right, so here I've got the server. I'm getting ready to hit enter and do this final insane test. All right, there we go.

[`2:13:12`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=7992) Now, the tests are running. 60 machines are sending an insane amount of traffic over to this beast. All right, so here's what's actually happening. We've got 60 computers here and they are all sending traffic, bombarding this beast server with an unbelievable amount of traffic. Now, if you want to know how many requests per second this machine is handling, take the number of servers, which we've got 60. each one is opening up say maybe 400 connections and then pipelining of five.

[`2:13:50`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8030) So we multiply them all together we end up with 120,000. Now this number is how many requests in any given time this server is handling. All right in total we have 60 * 400 connections opened up to this server. All right I'm not going to draw all the lines but you get the point. So all these computers are now simultaneously sending lots and lots of traffic here to this machine.

[`2:14:10`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8050) Each one with 400 connections opened up. All right. Yeah, I'm going to try it with a few different values and the server is just going to handle all of them. We will get a few timeouts when the connection goes way too high. But yeah, this is crazy. 120,000 at any given point of time is like having millions of people using your application at the same time. Absolutely mind-blowing.

[`2:14:38`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8078) All right. So back here we can take a look and see running this script for 1 hour and also connection count 800 the CPU usage of the idle machine is now 0%. So at the top right hand side I've got the CPU usage of the server.

[`2:14:52`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8092) Top left side I've got the server running and then the bottom terminal is my local machine. This is where I'm running that bash script from to utilize all these servers at the same time. Right. So here I'm going to let my recording go for 1 hour. do all this testing. Now, here I'm trying to just check that it works fine because you got to double check because we're sending lots and lots of traffic.

[`2:15:16`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8116) Yeah, you can see that it took a little bit amount of time for it to respond 1 second, but that's expected. Now, this next one was way quicker. So, the server is working fine. We're not getting any errors and at the same time it's handling more than a 100,000 actually quarter a million in this case. quarter a million requests at any given point of time, handling more than a million per second. Absolutely massive.

[`2:15:37`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8137) Now, it would also be interesting to see how much electricity we're using in this test. If you count in the CPU, we know exactly the type of CPU, the wattage. We also know that we're moving terabytes and terabytes per minute. It's it's a whole lot of traffic. I'll give you a complete output later in the video.

[`2:15:52`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8152) So, take that, do some math, and see how much electricity we're using. Hopefully, someone can do that. But I did a bit myself. And with the electricity that we're using here in 1 hour, we can power a Tesla car to run for thousands and thousands of kilometers. It's no joke. It's a whole lot. All right. So, back here. Yeah, I was really disappointed.

[`2:16:13`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8173) The test was finished and the server handled it all okay, but you can see that the logs were actually really, really messed up. So, I was feeling so sad, so angry that what the heck just went wrong? Why can't I see the rest of the logs?

[`2:16:29`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8189) I tried to troubleshoot, but at the same time, these machines, they cost about 50 bucks an hour, 40 bucks an hour. And yeah, it's kind of stressful to try to debug at the same time, you know, that that's going on in the background. So yeah, I just wanted to give up now and say, "All right, we can't get the logs."

[`2:16:43`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8203) Here we can see that I'm going to try it again with 20 seconds and I get the logs. And I didn't restart the machine. It's still just like before, but for 1 hour, I don't know, man. Just something happened with 1 hour that couldn't make me get the logs again.

[`2:16:59`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8219) I tried it with 30 minutes, 40 minutes, still got the logs, but for 1 hour, yeah, this just didn't work for 1 hour. And I'm guessing it's something that has to do with autocannon and also the tester machines. And actually, I'm going to try it again, but with a different approach. And that's now coming up next. So this next portion is now the next day. All right.

[`2:17:16`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8236) So now see the final rounds of tests. Now that one is going to work. So enjoy and I'm going to now tune out. All right, let's go ahead and run one final test. So this time we're going to get some clean logs.

[`2:17:36`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8256) So I've gone ahead and relaunched the 60 servers that I've got from another image that I created. So this time what we're going to do is instead of running Autocanon through the terminal, we're going to run a script of autocannon. All right. So I'm now here in the node script including the autocannon. It's all the stuff that we had before.

[`2:17:53`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8273) But now I'm grabbing the connections duration and all the other stuff here from the terminal. So this is how we're supposed to run it with a few arguments that they have to be in order and also our host and it's going to run it.

[`2:18:07`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8287) So here with this config that I'm passing then the connection count and whatnot. And then here with the autocanon we're calling the function passing that config and then once it's done running we're going to get our result. So what I'm doing I'm saving this result

[`2:18:23`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8303) to a file called results.txt and also append a few afterwards like for example the time that we started and also the time that we finished because I realized in the previous test that sometimes the machines wouldn't start the test all at the same time and it's problematic. We want all these 60 machines to start running the test immediately at the same time.

[`2:18:41`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8321) So with this we can ensure that that actually happened. So I've created a new repo for it called 1M- RPS tester. And all these testers here already have it. So if I go right ahead and SSH into one of these. So I'm going to copy the DNS. And then here I'm going to go ahead and SSH into that.

[`2:18:59`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8339) So here I've got that folder and also this file called patch.js. So we can go ahead and run it. I'll just copy paste this one. So I'll say node tester patch and then specify a few arguments and I'll run it here. So I'm going to go ahead and run it.

[`2:19:22`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8362) We're going to get this log and then after about 20 seconds it should be completed here in the server logs. All right, there we go. So, the server is now kicking in, handling a few requests, but the idle is a lot because one single server here can't really do much against this massive beast. So, yeah, let me wait for it to finish after 20 seconds.

[`2:19:37`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8377) All right, we got a bit of an error here with the output file. I'll go right ahead and run it as pseudo. All right, it's now done. So, if we take a look at the results, so we're going to get this file and that's pretty much it.

[`2:19:57`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8397) So all these same tables that we had as before and also when the test started and finished and some of these other variables here at the bottom. All right. So with this in place, let's do the final test now. All right. So I want to go ahead and copy command. Paste that right here. And don't be afraid of this command. All it means is to send this command.

[`2:20:14`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8414) If you take a look here at my parameters commands, I'm saying cd into this folder and then run node 1 million rps patch.js with these parameters. All right, here this document name AWS run shell script. As the name suggests, we're going to run this shell script. All right, and then this max concurrency 100%.

[`2:20:38`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8438) This is going to now ensure that this command is going to be sent to all the 60 servers at the same time. Yeah, I've learned this the hard way because by default, this command only sends them to 50 servers, then wait for them to finish or wait for a bit, and then send to the next 50. All right, but we don't want that. We want all these 60 servers to start immediately.

[`2:21:00`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8460) And then here, I've added two more things. This is an S3 thing, which is basically just a file storage in Amazon. All right, so I'm saying to grab the output and then save it to that. And then also this cloudwatch is pretty much like that. It's something that we can use for logging and watching our resources. All right.

[`2:21:15`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8475) And the reason that we can actually do this from our terminal send one command to all the machines and tell the machines to output now to this S3 storage. The security guard for all of them is IAM the busiest service in the world that we talked about at the beginning of the video. It's a really phenomenal service.

[`2:21:31`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8491) It allows us to do all these different operations. Of course, I also had to configure IAM to give enough permission to the instances to actually be able to output to these different places. Okay. And then at the end, I'm just saying to give me the command ID. You'll see why. So, I'm going to go ahead and run it.

[`2:21:47`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8507) And that's now fired up. So, all my testers should now be sending lots. Oops. Actually, the second argument here is the duration. And here I specified only how much? 180. So, it's only 3 minutes. You know what? Let me cancel this command using this AWS command. Cancel command. And I'll copy my command ID.

[`2:22:07`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8527) That's why we need it. I want to now go ahead and cancel this run. And now the CPU usage of the server should go back up to 100%. All right. And I want to go ahead and run that again because we want to do a little bit more. All right. We want to do a bit more than 3 minutes.

[`2:22:22`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8542) And I'll change this from 160 to 1,800, which is 30 minutes. All right. So now we're going to run this test for 30 minutes straight and then see what's going to happen. All right, there we go. And also there's another command that I can run here. So I'll run AWS logs tail and then aws/sm/benchmarks and then --follow.

[`2:22:43`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8563) With this in place, I can now follow the output of all my 60 servers. Right? So here if you take a look it shows me that yeah each server you know that log that we just saw in an individual one. So here I'm specifying to tail this so follow this one and I'm also specifying that here in my cloudwatch.

[`2:23:08`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8588) So here if you take a look that's my group name which is pretty cool you know from my own terminal on my machine I can mobilize all these 60 machines and take a look at the output here in real time in my own terminal. Pretty cool stuff. Okay, so now I'm going to wait for it to finish.

[`2:23:25`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8605) So I'll wait another 30 minutes. I actually ended up running this architecture of 60 servers for for a few hours. It's been costing quite a lot. We've been moving hundreds and hundreds of terabytes in a few hours. It's a lot. But let's do one final test. 30 minutes the final one. And then we're going to end up with a very cleaned output structure.

[`2:23:50`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8630) Now, while this is also running, actually while I'm recording this video, I got a message back from Amazon. So, if you recall before I mentioned that I ran this test, I didn't show it in the video, but I ended up having a beast tester and a load balancer. And this is a network load balancer.

[`2:24:08`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8648) It operates at the TCP level and not the HTTP level. So, this is very fast. And also, I'm putting it on the same private network. Okay. And I thought now with two beast servers, we're going to be able to handle way more requests. Well, that's not what I saw.

[`2:24:26`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8666) I actually saw a very degraded performance here with this load balancer. I tried to troubleshoot. But I saw it was taking a little too long because the setup is not cheap to run. So, I decided instead to reach out to Amazon and see what they have to say.

[`2:24:42`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8682) So here in the support center of Amazon, I sent them this message that I have two of these beast servers and I utilized both and long story short here I have also added two attachments individual benchmark and then one with the load balancer. So let me pull them up right now. So in the top I've got the individual. You can see that I was handling 1 million per second.

[`2:25:02`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8702) Now here, this is now with the load balancer. You can see it's now down to only 5 GB per second. It's way lower than what I had here with this. And I reached out to Amazon to see what the heck is going on because they actually advertise the network balancers as this powerful thing that could handle millions of requests. Right? So I said this is what you guys say, but I did not see that in action.

[`2:25:30`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8730) So they reached out to me and now this is just to indicate that someone is working on it. But here's the actual response that I've got. Someone reached out and said that based on our metrics, the consumed load balancer capacity reached 165, which was the limit. All right. And if I want more traffic, I got to reserve this in advance.

[`2:25:50`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8750) I need, you know, I need to say that I want more capacity than what I've got. All right. So, if I don't do that, this load balancer is not going to be able to cut it. So, we got to reach out again and say that I want to reserve this in advance to move such a mind-blowing amount of traffic across.

[`2:26:06`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8766) The traffic that we're moving is at the scale of Uber and some big companies. So, yeah, sure, we might see some limitations here and there. They also told me to do some operations, but I have already actually done them and I still did not see much of a difference. So, I did all of that and then ran a few more tests and still saw the same things.

[`2:26:27`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8787) They also gave me a few links here which I found quite useful. So here with this we can actually now reserve capacity right so I'm going to have to say that I want for example 600 gigabits per second and number of connections maybe we want 100,000 and availability zones maybe one and

[`2:26:47`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8807) then it's going to tell us how many LCUs we need this is actually application load balancer so I'm going to have to switch to network balancer and say that I want maybe 300 and maybe one availability zone and here's the number that I'm going to get so I need to say for this much or

[`2:27:02`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8822) maybe for this much I need to reach out to Amazon and say give me this much capacity for my for my application. I'm not so sure here how much this would cost but yeah this is pretty interesting. I did not know this actually before this test. And then here's a little bit more on it. So if you're interested feel free to go ahead.

[`2:27:20`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8840) So yeah, that's what we can do to really put this into test and utilize the two beasts fully. But I'm not going to do it again. This this costs a lot of money to run. Moving terabytes and terabytes per minute is actually very costly. So, I'm not going to do and follow along with this, but it's really good to know.

[`2:27:37`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8857) And thanks Amazon for reaching out with this. They really responded pretty fast because I ended up getting the business support for it. They also had to run an AI for me for for a few minutes to see if the AI could solve the problem. Gave me like 10 suggestions, but none of them ended up working.

[`2:27:52`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8872) Yeah, at this scale even AI really can't help you much because only very few companies handle 1 million per second. So I'm guessing AIs did not have enough data to get trained on for such a massive scale. But the human response here was really good. Now let's go back to our tests. So here we still have it running and our logs.

[`2:28:18`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8898) So we may need to go for a couple more minutes. So I'm going to go ahead now and fast forward. All right. So, as you can see right now, the tests are completed. Let's go ahead and take a look at the results. Now, because we have saved all these into that results.txt file.

[`2:28:47`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8927) What I could do here, if you take a look at the output, all the machines outputed that the test completed and results saved here to results.txt. Now, here I'm going to paste another command with AWS SSM and say to run cat results.txt on all these machines. All right, where I've got the name of tester and then also save the output here to S3, so our file storage.

[`2:29:14`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8954) So, I'm going to go ahead and run this. If I take a look at the live result here, we can see that I get all of them, right? Which is pretty cool. But let's go ahead and concatenate all of them together because yeah, this was a massive test. So, I want to make sure that I have the results.

[`2:29:31`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8971) Now, here, here's the S3. I'm going to go ahead and show you that. If I go into the storage, it's basically just storage in the cloud. And that's it. I've got a bucket. Don't worry if you don't know what a bucket is, but just like a folder, right?

[`2:29:47`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=8987) And then yeah, I ran a few tests here, but if I take a look at my command ID, right? So this one, this is now my folder name, which starts with 97. So let me see if I can find that. There we go. And then inside I've got the output of every individual instance. So if I go there and then another folder and then another one here, I can see the standard out.

[`2:30:06`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9006) So if I open it up, I can download it. And here we go. Pretty cool. Now, we want all of them to be in a single file. So, let me now show you the power of bash scripting. All right, let me minimize these and then make this bigger. So, I'm going to first download the S3 folder.

[`2:30:24`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9024) So, I'm going to have to use this command AWS S3. Specify my URL here. I want to click on copy S3 URI. So with this I can now paste that here with this one which is the command ID. And I want to say to save this into my current directory into a folder called results. I'm missing a sync here.

[`2:30:45`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9045) So I need to save this and then run it. And it's now going to download every individual folder and put it here into that results. So here I've got all these folders in a very clean way and I can see the result of every single individual one. All right.

[`2:31:05`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9065) Now with bash scripting I can very easily concatenate them all into one file. So I can say find everything here in this results folder that path is like this. So star meaning everything and then standard out and then execute. So I'm going to have to now say concatenate all of them. So cat and then yeah don't worry what this means.

[`2:31:25`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9085) It just means to cat every individual file and then put all the output here into this file. And I'm going to call this 30min-60 meaning 60 instances and then results.txt. I'll go ahead and run it. And now if we take a look here, you can see that I've got all the results here in a very clean file. It's very cool. I will also put it out on GitHub.

[`2:31:51`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9111) So if you want to take a look at it and do some math, but let's make sure that we've got 60 results. So 60 of tests. In a few of my tests, a few of them were missing. But now with this one, we should have all of them here. If I grep read, grep means just grab a line that has a read here from this file. All right.

[`2:32:08`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9128) So, yeah, I get all of them, but let's count. If we count all of them and we get to 60, that means that we've got all the results. So, I'm going to use the WC command and say -l to give me a number. So, we've got 60 lines, meaning that we've got 60 result outputs. Each one ran for 30 minutes.

[`2:32:25`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9145) And you saw that the server did not break a sweat. It handled all of them with no errors whatsoever. We also didn't get any errors. So if I go ahead and grep error or errors, I think it's called should be called errors. Yeah. Oh, actually, yeah, we do have a few timeouts, but only 40. All right.

[`2:32:45`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9165) So, if I take a look at them here, and sometimes we do get some timeouts, sometimes we don't. But over millions and millions of requests, we only ended up with 40 timeouts, which is pretty impressive. And keep in mind that we were opening a 100,000 connections to the server, sending that much at any given point of time. Yeah, this was this is quite insane.

[`2:33:11`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9191) Now, let's go ahead and do a few more bash scripting here. What I could do is to say again, grep read all. Let's see how much data in total we actually moved across. So, I'm going to actually use the awk command here. It's very powerful. If you don't know bash scripting, you're missing out.

[`2:33:28`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9208) You're losing a lot of time. So, go ahead and learn it, please. So, I'll say here, I'm going to give it req plus the first argument of that. And then data. And this one, it should be the fifth argument. So, 1 2 3 4 5. All right. Say dollar sign five. And then after it's done, I'll go ahead and print total requests.

[`2:33:58`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9238) And here I'll put in a req and then a K. And I'm also going to print the total data read. So my variable I called it data before. And then this is in terabytes. So I'll put a TB right here. And this should actually work. There we go.

[`2:34:13`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9253) So, in 30 minutes in total, all right, let's take a look at this. We sent two billion requests. All right, two billion. This is a whole lot. And we also moved across plus 60 terabytes of data. This is absolutely mind-blowing. 60 terabytes and two billion requests were handled by this beast machine in just 30 minutes.

[`2:34:36`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9276) And we could have gone with one hour. Just just multiply these two numbers by two and that would have been the result for 1 hour. This is astonishing. 2 billion. And out of two billion requests, we only ended up with 40 timeouts. Pretty impressive stuff. Yeah, this this beast machine is insanely powerful. Along with C++ and Drogon, you can do whatever you want.

[`2:35:03`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9303) It handles so much and it's yeah, it's really cool to see this in action. And that concludes it for our final big test.

## 12. Outro

[`2:35:21`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9321) All right, and that's it about this video and us handling a million requests per second. Thank you very much if you've been following along until this point. I really appreciate all the support. It means a lot. Hopefully, this video gave you some new perspectives on software engineering and how to go about it and also improve your thinking process a bit.

[`2:35:35`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9335) And that was my goal here with this video. it was not to show you how to set up an architecture to handle a million requests per second. Well, every one of these topics that we talked about here would require hours and hours of dedicated content. And my goal wasn't really to do any sort of how-tos in this video.

[`2:35:50`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9350) I think the age of how-to videos is pretty much over at this point with AI taking over, especially in software development. So, that's also the direction that I've been moving my content towards in the past few years. I'm trying to build content in a way to improve your thinking process, make you a little more creative, and give you new perspectives, and not just to show you how to do this or how to do that.

[`2:36:15`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9375) And hopefully I'll be able to live up to that because it's so much more difficult to create content like that. This video was a lot of fun for me to make. All these tests, all the research that I had to put into it were a huge amount of fun. Also stressful, but very, very fun. If you were curious to know the cost for this month, it's around $2,000.

[`2:36:31`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9391) Now, not all of it is actually for the tests that I conducted throughout the video, a lot of it is again the research that I had to put into it and not all of it is specifically for this video. We have around $800 for databases and around $1,200 for EC2 compute.

[`2:36:50`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9410) Now, in hindsight, yeah, if I were to go back, I would be able to cut this cost down by a few hundred. I did make a few silly mistakes that ended up adding a couple hundred dollars to the bill, but it could have been worse. It could have been way, way worse.

[`2:37:06`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9426) Now, if you want to get more involved with us here, check out this URL shortener app project. It's open source. We're not going to be doing any vibe coding here or use any AI generated code or any AI slop. We're going to have a lot of fun with this. We're going to be learning a lot. Let's see if we can shorten 1 million links per second.

[`2:37:21`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9441) That's going to be a massive challenge. and 1 million per second here is going to be way more difficult than this video because here we've got real business logic. We've got so many tables, complex logic, we've got authentication, encryption, and it's going to be it's going to be so fun, so epic. So, we're going to be trying this, but it's going to cost even more.

[`2:37:44`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9464) And we're going to have a lot of opportunities here to learn, but we're still months away from being able to do that because we're building this with Cpeak and still a lot of features that need to be completed for release. But yeah, we're going to be learning a lot.

[`2:37:59`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9479) We're going to hire some attackers to constantly attack this application, try to hack it, and because we're also building the framework ourselves, we're going to have a lot of opportunities here to learn about security, about designing performant code, and so much more. If you get involved with these two projects, that's going to give you more opportunities to learn than any AI or traditional course can ever offer.

[`2:38:19`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9499) Because here we are building for production. We're building for real people to end up using this product and not just technical people. We want people who don't know who we are to end up preferring this one over the rest of the applications. And we're building for the real world and not just for education or anything like that.

[`2:38:39`](https://www.youtube.com/watch?v=W4EwfEU8CGA&t=9519) And in that environment, things are very different and we're going to have a lot of opportunities there to learn and become better engineers. There's also our Node.js course. Now, this one is paid, but if you can check it out, it would mean a lot. I would really appreciate the support. And again, thank you very much, and I hope to see you soon.
