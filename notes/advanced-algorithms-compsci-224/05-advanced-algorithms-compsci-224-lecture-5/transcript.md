# Advanced Algorithms (COMPSCI 224), Lecture 5

*Harvard University · 1:21:37 · https://www.youtube.com/watch?v=rLMikQTOVnI*

[`0:01`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1) SPEAKER: OK, so I think I'll just get started. I realized today that I meant to put a final fake problem at the end of the pset, which is just like, how many hours did you spend on the pset? Because I want to monitor that information.

[`0:16`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=16) So I might just set up a Piazza poll for that. And from pset 2 onward, it'll be there. So Albert Wu-- who's Albert Wu? Yes, OK, good. So you're scribing. Good. So today, the plan is finish the proof of cuckoo hashing. I'll tell you one more thing about load balancing.

[`0:40`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=40) And then we'll move into Fibonacci heaps, which is another topic. So we're going to be done. No more hashing after midway today. So cuckoo hashing. Remember that's something we talked about last time. I stated how it works. We used it to construct Lumiere filters for the orbit for retrieval problems.

[`1:04`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=64) But we didn't actually analyze cuckoo hashing. So remember, we have an array, our hash table of a of size linear in n. And we have two random hash functions, g and h. And what we do is when we get an item x that we want to insert, we try to insert it in the g of x position.

[`1:30`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=90) And if it's free, we put it there. If it's not free, we still put it there. But then we kick out whoever was there and move them to their other hash location. So whoever was there was there either because of g or h. So if they were there because of g, we'll kick them out and put them in their h location.

[`1:48`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=108) If they were there because of h, we'll kick them out and put them in their g location. And then when we put them in their new location, this might continue because that might also be non-empty. Very good. And if this goes on, if the sequence of item moves, goes on for at least some big constant C times log n steps, C is something that will come out of the analysis.

[`2:30`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=150) But think of C as 10 or something. C log n steps. We give up and-- we give up. We pick new g and h. And we rebuild the entire data structure. We allocate a brand new array a. We reinsert everything from scratch.

[`3:03`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=183) And if any of these inserts, again, takes more than C log n during that rebuilding phase, we, again, destroy everything and rebuild it, again, from scratch until it finally works. So the point will be that this rebuilding will succeed with good probability.

[`3:17`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=197) So in expectation, we won't have to rebuild that often. Good. So now for the analysis of the claim is that the expectation of the time to insert is O of-- it's a constant. So let me draw a couple of pictures for what might happen when we try to insert things into the hash table.

[`4:10`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=250) First, I want to remind ourselves what this cuckoo graph is. It's something I defined last time. So cuckoo graph. So we're going to first draw a picture of cuckoo graph. This graph has m vertices. One per cell of A. And it also has n edges for each x we connect g of x to h of x.

[`4:58`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=298) And as someone pointed out last time, this graph could have multiedges. It could have self-loops. Good. So what happens when we try to do an insert? Let's say we try to insert some x. It could happen that-- so this value x comes in. That's g of x.

[`5:32`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=332) And an item already lives there. And then we have to kick it out. And something already lives there. And we have to kick it out. And something lives there. And we have to kick it out. And then we're done. So that's one possibility.

[`5:51`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=351) So the cases-- so this looks like this is a path. Another thing could happen, which is that we have a cycle. So here we draw a picture. x comes in. It kicks someone out. Kick someone out. Kick someone out. And then we have a single cycle.

[`6:25`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=385) Maybe now it goes like this. So now x7 wants to go back into where x4 moved. So that we're all on the same page with how the algorithm works, what will happen now? x4 will go back. Exactly. So now x4 will go back. And then that's going where x3 was.

[`7:03`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=423) So x3 now has to go back. And x2 now has to go back. And then now what happens? Sorry. AUDIENCE: [INAUDIBLE] try to insert x3. SPEAKER: Yeah, so now we try to-- so that was g of x. So now we push x into h of x. So now x tries to go here.

[`7:36`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=456) That might kick someone out, x8. And then maybe now we're done. So in this case-- let me draw some boundaries here. So then this case here is we have a single cycle. Let me give myself some more room for the next one. And then there's one more case that I want to draw, which looks a lot like this case, but more problematic.

[`8:25`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=505) So this is an OK case. Just because there's a cycle in this graph doesn't mean we're in trouble. But now suppose this happens. x comes in. It goes somewhere. It goes somewhere. Cycles around. Comes back. x goes somewhere. Goes around.

[`8:46`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=526) Go somewhere and then now cycles back again. Now, this is actually a problem. This would go on forever. So two cycles. This would go on forever. Let's draw some arrows. Of course, we'll catch this. I mean, we might-- we're not paying attention to whether or not we have cycles.

[`9:28`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=568) But we're not going to go on forever just because we have this here, which says that if we go on for more than log n steps, we'll just give up. That could happen because of a long path, but it could also happen if we end up in this kind of infinite loop.

[`9:51`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=591) So we could write the time. So let's say runtime is T. To do this insertion, we could define some more random variables. We could say that Pk is indicator random variable for having a path of length at least k. We could say Ck is an indicator rv for a case 2 configuration of length at least k.

[`11:23`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=683) And then finally, we could say-- let's say D stands for double cycle. D is an indicator random variable for having a two-cycle configuration. AUDIENCE: Did you find those variables for a given x on the graph in general? SPEAKER: Yeah, this is for inserting x. All of these are when we insert x, what do we see as we insert x?

[`12:20`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=740) So we can write down that the expected time is the sum over all K-- well, the expectation of the sum over all k of Pk plus the expectation of the sum over all k of Ck. People agree with me? Plus D. T is the time for inserting a single item.

[`13:22`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=802) And let me write now this. So now if this happens, we will definitely rebuild. Plus D many times. nT. AUDIENCE: Is that expectation also? SPEAKER: I'm sorry? AUDIENCE: Is that expectation of D also? SPEAKER: Oh, yeah. So plus the probability of D--

[`13:51`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=831) or yeah, probability of D being 1 times n times the expectation of T plus the probability that we have to-- that we go on for more than n steps. So for log n steps, the probability that they go on for more than log n, C log n steps times n expectation T.

[`14:29`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=869) So the way that this is going to work out is basically we want this and this to be really tiny, let's say like 1 over n squared, so that when you multiply it by the n, it doesn't really matter so that these will be the dominant things that play a role.

[`14:56`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=896) Good. So now we need to bound the expectation. We're going to use linearity of expectation. We need to bound the expectation of Pk, the expectation of Ck, and the probability of D equals 1 as well, et cetera. So let's look at expectation of Pk, which is just the probability of having a path of length bigger than or equal to k.

[`15:42`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=942) So what we'll do is we'll look at all possible paths of length bigger than or equal to k and ask what's the probability that we see this particular configuration or this particular occurrence. And then we'll union bound over all of them. So let's fix.

[`16:04`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=964) What I mean by path of length k? I mean that there's-- the number of edges here is 1, 2, 3. So here k is 3, just so that we're all on the same page. So fix x2, x3, up to xk plus 1. Also let's fix all the hash values.

[`16:41`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1001) So there are k plus 1 vertices here. So fix all of them. Fix assignment of the k plus 1 hash values to the vertices. So we're asking ourselves what's the probability that we see exactly this configuration. Probability that we see exactly this path. Oh, and let me also say, just to be clear, the way I'm doing this, there could be more action happening over here.

[`17:42`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1062) I don't know. There could be more stuff happening. I just want to ask, if you look at the first case steps, what's the probability that you see this? Yeah. AUDIENCE: So when you say fix the assignment of the k plus 1 hash values-- so wouldn't there be 2k plus 2 hash values because-- SPEAKER: So every vertex is a hash value.

[`18:06`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1086) So the fact that you have this path means that h of x2 equals g of x3. Or the other way around. It could be g and h or. AUDIENCE: So what do you mean exactly by fixed assignment of the hash values to vertices?

[`18:28`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1108) SPEAKER: So I'm asking-- so when I insert x and I look at what happens in the cuckoo graph, I might see some picture that looks like a path of length k. But that path of length k could be-- I don't know which k plus 1 vertices are involved.

[`18:48`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1128) And I also don't which k edges are involved, the k edges meaning which items. So for each possibility of those k plus 1 hash values and those k items, I'm going to ask myself, what's the probability that this is what I see?

[`19:02`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1142) I'll see exactly these vertices and these edges. And then I'll union bound over all possibilities. So I want to bound. So we have that the number of hash values is, I guess, m to the k plus 1. So the number of ways to pick the vertices. And also the number of ways to choose edges is n times n minus 1 times n minus k plus 1, which is at most n to the k.

[`20:15`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1215) Oh, wait, before I do that-- so the problem that we see exactly this path, first of all-- I guess, sorry, I should have said that. This is equal to 1 over m to the k plus 1 times 2 to the k. And then now I want a union bound.

[`20:49`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1249) So I mean, just out of curiosity, do people see why I said this? First of all, do people see why I said there's this 2 to the k here? Yeah. AUDIENCE: It's setting up the g of h. SPEAKER: Yeah, exactly. Yeah, exactly.

[`21:12`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1272) So yeah. So what's the probability that g of x2 is that and h of x2 is that? Well, it's 1 over m to the-- actually, that should be 1 over m to the 2k. And then there's a 1 over m for x. So what's the probability that g of x is that vertex?

[`21:31`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1291) It's 1 over m. And then what's the probability that g of x2 is that and h of x2 is that? It's 1 over m squared. But could also be the other way around. It could have been h was that and g was-- this could have been h and that could have been g.

[`21:45`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1305) So there are two choices. So the probability of seeing exactly this configuration is 1 over m for x landing there with g times 1 over m squared to the k for everybody else times 2 to the k. And then now we need to union bound over all possible configurations that look like that.

[`22:03`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1323) Well, we need to choose what these actual hash values are. And there are k plus 1 vertices. So there are m to the k plus 1 choices. How about the number of ways to choose the edges? Well, that's just choosing which items are there. So that's n to the k choices.

[`22:20`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1340) So that implies by a union bound, the expectation of Pk is at most n to the k times m to the k plus 1 times 1 over m times 1 over m to the 2k times 2 to the k. So this 1 over m thing here is that's exactly this.

[`22:53`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1373) So things start to cancel. This m goes with this m. Here we have 1 over m to the k. Here we have n to the k. So this is equal to 2n over n to the k. And this is why I picked m to be 4 times n, I believe, over there.

[`23:13`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1393) So this is equal to 1 over 2 to the k. Yeah. AUDIENCE: [INAUDIBLE] SPEAKER: Sorry. Where? Here? AUDIENCE: [INAUDIBLE] SPEAKER: Oh. Oh, I see. Yeah. Good. So that's that. So this summation is geometric and it's a constant. So now I want to look at Ck. So this kind of configuration here.

[`24:28`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1468) Actually, let me do something more colorful. So the point here is-- so you could redo the computation basically the same exact way I did it. But the main observation here-- so for Ck, there are three types of edges. There's these edges.

[`25:10`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1510) There's these edges. And there's these edges. At least one type has at least k over 3 of the edges. So by the path analysis, the expectation of Ck is at most 1 over 2 to the k over 3 or something like that. Or maybe 3 over 2 to the k over 3 by a union bound over the different colors or something.

[`25:59`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1559) Is that what I want to say? No, no, no. No. So just look at the longest of the three groups and just ask what's the problem that you see that. Oh. So now we want to compute-- so again, this is another geometric series that I-- so that thing is a geometric series as well.

[`26:37`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1597) So that's a constant. So now probability that D is equal to 1. So for D, we want probability that D is equal to 1. So I always-- this is the kind of calculation where if you're off by 1, you get a completely wrong answer. So I want to make sure I'm not off by 1.

[`27:04`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1624) Let's see. So I think-- let me just-- so I want to remind myself, if it's a length k tour, how many vertices are there? So let's say that this goes on-- 1, 2. 3, 4, 5, 6, 7, 8, 9 steps. But the number of vertices is 1, 2, 3, 4, 5, 6, 7.

[`27:36`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1656) So I think-- so the right answer is there are k minus 2 vertices. So for a length k tour of this type, there are k minus 2 vertices. And by k length k tour, I mean there are k edges.

[`28:16`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1696) So let Dk be an indicator random variable for length k for having a length k tour of this type, which implies that the probability that D is equal to 1 is at most the sum over all k of the expectation of Dk or the probability that Dk is 1.

[`29:02`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1742) This is just a union bound. So we're going to show that-- our goal is going to show that this summation will be some geometric series that is big O of 1 over n squared. And once we get that, then this will be 1 over n times the same thing.

[`29:24`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1764) So it basically doesn't matter. You can move it to the other side. So the same kind of thing will happen here. So let's look at a particular configuration of length k. yeah. AUDIENCE: So there you said probability that D equals 1 is less than or equal to that sum. But wouldn't the probability that D equals 1 have to be greater than any of the terms?

[`30:25`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1825) Because those are indicators for a subset or having just a length k tours of this type as opposed to any-- SPEAKER: So now that I think about it-- I mean, I think it's actually equality because you think these are disjoint events.

[`30:40`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1840) So the point is D-- so D is the probability that we see a picture like this when we try to insert x, where the kth step is exactly where you close the second cycle. So for D to occur have to have this picture for some k. So I'm just trying every possible k.

[`31:05`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1865) So yeah. So I think this is-- so I mean, this is the same thing as-- do you want me to be more pedantic? So let's say this is the probability that D1 equals 1 or D2 equals 1 or forever. And then by the union bound, you can say this is at the sum of those events.

[`31:25`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1885) But these are actually disjoint events. So this is equal to the sum over k of probability that Dk is 1. I don't know. Does that answer your question? AUDIENCE: I was saying something silly. But yeah, that makes sense. SPEAKER: All right.

[`31:46`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1906) So you believe it? AUDIENCE: Yeah, I believe it. SPEAKER: OK, Good. So let's look at a particular configuration of length k. What's the probability that we see it? So we said there were k minus 2 vertices. So I think this should be 1 over m to the-- so 1 over m for where h-- so actually, m-- so x goes into here.

[`32:34`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1954) So we know that this is g of x. And then we know that that's h of x. So the probability that this is g of x and that's h of x is 1 over m squared. Then everybody else is connected by 2 people as well. Everybody else is an edge connecting 2 people.

[`32:54`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=1974) So the probability that their hash evaluations go there is 1 over m squared to the number of people, which is k. There are k different items. Times, again, this 2 to the k. How about the-- so now we want a union bound over all configurations.

[`33:32`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2012) Oh, by the way, before I forget, I meant to say this in the very beginning. So I send this email about half TFing. So if anyone wants to have TF, contact me at the end of this lecture. Otherwise, there are probably too many people for one TF to grade.

[`33:49`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2029) So I mentioned the very first lecture that I'll have grading duty. So each person will have to do grading duty once in the semester. So people need to sign up for grading duty for pset 1 maybe like two people. So there are three problems, the TF plus two others.

[`34:05`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2045) Each person takes a problem. So just like scribing duty was first come first serve, grading duty is first come, first serve. So you should sign up early. Oh, I see laptop coming out of it. So yeah. OK, great. So now we want a union bound. So back to business.

[`34:24`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2064) So how many different configurations are there of size A that look like this? So we have to choose what the actual hash values are. So the choice of the vertices. So there are at most n to the k minus 2 of them.

[`34:44`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2084) We also have to choose, let's say, where the first cycle-- where the first cycle starts amongst these k steps, how long the first cycle is, and then where the second cycle starts. Yeah. AUDIENCE: So it sounds like only this is within one cycle. SPEAKER: Wait.

[`35:10`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2110) Sorry. Say it again. Oh, actually, wait. This should have been m to the-- OK, if they were in one cycle? AUDIENCE: Yeah. [INAUDIBLE] on one cycle. SPEAKER: You mean here or here? AUDIENCE: Just above. SPEAKER: This? AUDIENCE: Yeah. SPEAKER: So I'm just saying, did I forget-- is this off by some factor?

[`35:35`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2135) AUDIENCE: Just wondering, [INAUDIBLE] is the case if you have other vertices that are in one cycle, it's attached to h of x? But then if there's nothing at g of x, then we get in that case-- SPEAKER: So here I'm looking at the case of two cycles. And so here's my two-cycle configuration.

[`35:53`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2153) And I have labels on them now. This is a particular edge, a particular edge, et cetera. And I'm asking, what's the problem of saying exactly that? Feel free to stop me if I say something crazy. So these k minus 2 vertices, we can choose who they all are. So they are at most m to the k minus 2 choices.

[`36:18`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2178) There's also the choice of who the people on the edges are. So choice of the edges is at most n to the k of those. And then we can also choose-- so I mentioned we can choose where the first cycle starts, how long it is, and where the second cycle starts.

[`36:44`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2204) So choice of lengths and starts of cycles. So that's at most k cubed. k for each of them. k for the two starts and k for the length of the first cycle. The length of the second cycle is already implied by the fact that this is a length k tour.

[`37:17`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2237) But you could throw in another factor of k. It wouldn't really matter. And if I did this correctly, which-- oh, yeah. I keep getting-- I've been getting off by 1s a lot when I reason through this to myself. But hopefully, I'm not off by 1 right now.

[`37:39`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2259) So that implies that probability that Dk equals 1 is at most-- so this is a union bound now-- over all configurations of k plus 2, Yeah, I feel like I'm already being too good. So this is at most m to the k minus 2 times n to the k times k cubed times-- and then that thing-- 1 over m to the 2k plus 2-- oh, no, no, I think I'm not being too good.

[`38:28`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2308) OK, good Times 2 to the k. So remember, m is 4n. So these combined give us n to the k. And this is n to the-- or n to the 2k minus 2. I am being too good. How am I doing this to myself? This is n to the k minus 2.

[`38:52`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2332) And this is n to the 2k plus 2. So that should be 1 over n to the 2k plus 4-- to the end of the fourth. And then here we have, again, 2 to the k. So that cancels. That's taking care of the n's.

[`39:11`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2351) And then we have times k cubed times-- so that's 4 to the k minus 2 times 2 to the k over what's left here is 4 to the 2k plus 2. That goes away. And that becomes 4 to the k. And this becomes 1 over n cubed times k cubed over 2 to the k-- sorry n to the fourth.

[`39:55`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2395) So I apologize. So I definitely am off by 1 because this should be n squared. But-- AUDIENCE: k minus 2 vertices, not k minus 1? SPEAKER: k minus 2 vertices? Why is it k minus 2? AUDIENCE: k minus 1. SPEAKER: It should be k minus 1? AUDIENCE: [INAUDIBLE] SPEAKER: So I counted.

[`40:13`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2413) And then I thought I got k minus 2. So let me just draw this picture. So this looks like this. This looks like that. Goes back. Goes somewhere. Goes somewhere. Goes somewhere. Goes somewhere. So this has length k being 1-- sorry k being 1, 2, 3, 4, 5, 6, 7, 8, 9.

[`40:30`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2430) And the number of vertices is 1, 2, 3, 4, 5, 6, 7. AUDIENCE: Why is it like that? Why is it [INAUDIBLE]? SPEAKER: Why is it 9? AUDIENCE: Oh, OK. SPEAKER: 1, 2, 3, 4, 5, 6, 7, 8, 9. AUDIENCE: Small edges.

[`40:46`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2446) SPEAKER: Yeah. So I lost a 1 somewhere. And I don't know why I'm-- this always happens to me. So I'm sorry. I'll fix it in the notes. Otherwise, I'll go crazy finding the 1 right now. But I mean, the point is that you're going to get something that's much less than 1 over n.

[`41:04`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2464) So this whole thing is now a geometric series that becomes 1 over poly n. So this sum k cubed over 2 to the k converges to a constant. This is left with 1 over poly n, which cancels that n over there. And that becomes insignificant And actually, we basically already talked about-- we basically already proved that this thing is small as well.

[`41:38`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2498) Because for this to happen, for us to go from any steps, either D has to occur, which we showed happens with small probability. Or we have to have P log n or C log n occur. And we said that those-- Pk happens with probability 1 over 2 to the k.

[`42:00`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2520) So if we pick C log n where C is big enough, 1 over 2 to the C log n will be 1 over poly n for an arbitrarily small poly n. So that's basically it, other than being off by 1 somewhere. Questions?

[`42:21`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2541) While you think of your questions. I'm going to-- I'll try to find this off by 1, but. It's very annoying. You know what I think it is actually? I think that there aren't actually k items. So there are 9 edges here, but the actual number of items, this would be like x2, x3, 4, 5, 2 again.

[`42:59`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2579) And this would be x itself. And then 6, 7, 9. So the number of items here is from 2 through 8, which is actually 7 items, not k items. So k minus 2 items. But let me not promise that because I don't want to go through this and be off by 1 yet again.

[`43:22`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2602) But yeah. I said the length of the tour is the number of edges in the tour, like the amount of times you go around, but that's not the same as the number of items. I don't know if maybe that's what you were trying to tell me. Anyway.

[`43:34`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2614) So off by 1 yet again. So that's pretty much it for cuckoo hashing. And there's just one last thing I want to say about hashing. Don't worry, you'll see more on pset 2 before I move on to non-hashing. So last thing on hashing.

[`44:13`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2653) So I want to show you yet another example where we somehow take advantage of having two hash functions like cuckoo hashing. But it's going to be something totally different. So this is going to be called the power of two choices. And this is the basic idea.

[`44:37`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2677) So recall hashing with chaining. So hopefully, people remember what that is. We had a hash table. We had our n items. And they're hashing into this hash table of length m. And each element here is actually a pointer to a linked list, say some doubly linked list of items that hash to that cell.

[`45:14`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2714) Some might be empty. Some might have multiple items. So just to make sure people remember things. If this hash function h is drawn totally at random, not k wise independent or anything, but just a random hash function, perfect random hash function, what's the length of the longest list?

[`45:59`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2759) Do people remember? And let's say that m is equal to n. So log n is true. It won't be more than log n. But I claim we said something better, but we didn't talk about-- I don't think we might-- we might not have said hashing with chaining when I said it I just said balls and bins.

[`46:26`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2786) If you have n bins and you have n balls and each ball gets thrown into a totally random bin, how many balls will the heaviest bin have? AUDIENCE: [INAUDIBLE] SPEAKER: Sorry? Yeah, log n over log log n. Yeah, that's right. Is log n-- so I mean, it's a little better than log n, but not much better.

[`46:53`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2813) So this was, I guess maybe two lectures ago. This is the first lecture when we started hashing I mentioned this. So we mean-- we said that if h is drawn from a two wise independent family, the expected query time will be a constant. I mean, the query time is the length of the list-- of the linked list.

[`47:10`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2830) So in expectation, it will be a constant. But in fact, with high probability, the worst case will be at most log n over log log n. So it would be nice to have a small expected time as well as a small worst case time.

[`47:27`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2847) So here's a simple idea. So let me make sure I give the proper reference. This is Azar, Broder, Karlin, and Upfal in SICOMP '99. So the idea here is pick 2 random hash functions, g and h. When inserting x, place in the least loaded amongst A g of x and A h of x.

[`48:45`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2925) And when you do a query, you'll search both. You'll search both in the g of x location as well as the h of x location. So now we're throwing n random-- we're throwing n balls into n bins at random. But when we throw a ball into a bin, we actually throw it into 2 bins and then put it in the smaller of the 2 bins.

[`49:17`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2957) So it seems intuitive that this should do some amount better. It's not clear how much better this should be. Will it be a constant factor better? Will it be asymptotically better? I don't know. Who's seen this before, by the way? Has anyone seen this.

[`49:39`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=2979) Oh, OK. That's reasonable. So with high probability, the heaviest bin has at most-- any guesses? Constant. Yeah, that's a guess. No, it's not constant. AUDIENCE: [INAUDIBLE] SPEAKER: What? AUDIENCE: ln ln n? SPEAKER: ln 1 n over ln 2 plus theta 1 items. So in fact, it's very tightly concentrated around this number.

[`50:23`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3023) So with high probability, you'll be this number plus or minus a constant. So this is what's called the power of 2 choices. You do exponentially better. I mean, the difference between roughly log n and log log n is exponential, just by this simple thing. So what's a natural-- I mean, now that I told you that, what's a natural thing to ask?

[`50:52`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3052) AUDIENCE: Power of 3 choices. SPEAKER: Power of 3 choices. Why don't I hash into d choices? Why don't I hash into d locations and then put in the least loaded of d locations? Query time will go up by a factor of D in expectation. But in the worst case, we might get better worst case behavior.

[`51:17`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3077) So power of D choices. Any guesses about what happens there? AUDIENCE: [INAUDIBLE] SPEAKER: I'm sorry. AUDIENCE: [INAUDIBLE] SPEAKER: This? Actually, that's exactly what happens. [LAUGHS] You get ln and ln n over ln d, which is unfortunate. I mean, when you went from 1 choice to 2 choices, you went from roughly log to log log.

[`51:57`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3117) But then when you go from 2 to 3 choices or 2 to d choices, you're really only changing the base of the log. I mean, this over ln 2 is just log base 2 of this, whereas this over ln d is log base d of this. So you're changing it-- you're just changing the base of the log, which is a constant factor.

[`52:19`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3139) So I'll just mention one thing before we talk about how to analyze this. So there was another take on power of D choices. We're not going to-- I'm just going to state it. We're not going to actually prove anything. So I don't how to pronounce this name.

[`52:40`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3160) I don't know if anyone speaks German. I don't know how to pronounce O with an umlaut. Does anyone speak German? Yeah. AUDIENCE: [INAUDIBLE] SPEAKER: Oh. [LAUGHTER] Yeah, OK, I'll not repeat that. So that's his name. And so he says, do the following. So break up bins into D groups each of size n over d equal size.

[`53:25`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3205) When you insert an item, check random locations in each group. So it's not just going to be-- it's not just d random locations, period. It's one random location per group, which is d locations. And put in least loaded and break ties. So it seems like the more random, the better.

[`54:12`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3252) If there's a tie between least loaded bins, I'll put it in a random one of them. But no, break ties by placing the leftmost one, which seems like a weird thing to me to do. And here you could ask, again, what's going to be the load of the heaviest bin?

[`54:44`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3284) So he proves even the right constant factor. But I'm not going to bother writing that. He gets ln ln n over d. So basically, the base-- you can think of d as, I guess, as ln of e to the d So the base-- instead of the base becoming d, it becomes e to the d.

[`55:10`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3310) So I don't know why this happens, actually. I didn't actually read that paper, but I just found it very weird. So questions about-- so I'm only going to look at power of 2 choices. I'll show you how you would analyze that thing. And when you analyze it, you have to be rigorous.

[`55:52`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3352) So first, I'm going to show you the non-rigorous argument, just so you can see where log log n might even come from. And then I'll say what you can do to make it rigorous. Intuition for the power of 2 choices.

[`56:25`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3385) Oh, and I should also say, if you want to read more about this, there's a survey that has-- there's been lots of papers on things with power of multiple choices and various variants. If you want to see more, there's a survey by, well, someone who you might know, Mitzenmacher and two others, Richa and Sitaraman.

[`57:05`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3425) So you can check that out if you want to see more. So why should this thing happen? So let B of i equal the number of bins with load at least i. Suppose-- I mean, of course, this is a random number. But let's say that I know for certain that there won't be more than B i bins with load at least. i.

[`57:41`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3461) I mean, I'm in the non-rigorous mode here. And let the height of x be such that x-- so my hash function-- let me make it capital H because my hash function is supposed to be g and h, little g and little h. Be such that x is the H of xth item inserted into that bin.

[`58:42`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3522) So I want to say something about now what should B i plus 1 look like. So I know that B i plus 1 is at most the number of items x, such that the height of x is at least i plus 1.

[`59:25`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3565) So let A sub x be-- let's B sub x-- let B sub x be an indicator random variable for event that H of x is at least i plus 1. So what has to happen? Remember, this is a non-rigorous argument here. So x comes along.

[`59:58`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3598) And then we hash it. And what has to happen for its height to be at least i plus 1? Well, both of the bins that it hash to have to have height at least i. So the probability that H of x is at least i plus 1 is equal to the probability that h of x has load at least i and g of x has load at least i.

[`1:00:41`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3641) But h and g are independent functions from each other. So this is equal to-- this is at most B i over n squared. So this implies ignoring the fact that things don't behave exactly like their expectation. So this implies that if everything is as expected, we have that B i plus 1 is at most n times B i over n squared.

[`1:01:44`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3704) There are n items. For a given item, the expectation of its indicator random variable is this. So if you sum over all items, the expected number of items that have a high height will be n times this. And this is the same thing as saying B i plus 1 over n is at most B i over n squared.

[`1:02:19`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3739) So once you're in a situation where B i over n is less than, let's say, 1/2, then the fraction of bins that have a high load is decreasing as a power. It's squaring each time. So let's say, for example, we were-- let's say we knew that B10 over n was at most 1/2.

[`1:02:57`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3777) We managed to prove that. Then B sub 10 plus j over n. By this would be at most 1 over 2 to the 2 to the j, I guess. And we're done when this number is something less than 1. That means there are no bins.

[`1:03:33`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3813) So we're done when B to the 10 plus j over n is at most 1. Implies 2 to the j is bigger than or equal to n. Implies j is bigger than log log n. Or strictly less than 1. If it's is strictly less than 1, that means it's 0.

[`1:04:09`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3849) AUDIENCE: 1 over n. SPEAKER: 1 over n. Oops. So that's where it comes from. Do people feel convinced? But I mean, then it's a matter-- really, I mean, this is the main idea in my opinion. Because the only thing that's wrong is these are random variables.

[`1:04:44`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3884) You can't just say that this always happens. You have to argue that with high probability, something good will happen, et cetera, et cetera. But this is really the main idea. So now what we're going to do to actually make this a little bit more rigorous-- so let's define alpha sub 6 is equal to n over 2e.

[`1:05:36`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3936) And let's say that Ei is the event that B i is at most alpha i. And in general, for larger i's, how do I want to define this alpha? Alpha i plus 1 is equal to e alpha i squared over n. I mean, it's almost doing exactly what the fake proof did.

[`1:06:15`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3975) So here we said that B i plus 1 is n times by-- B i plus 1 is B i squared over n. Here we're just making our upper bounds behave in the same way. We give ourselves a little bit of slack because there's this factor of e here.

[`1:06:32`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=3992) But the basic idea is going to say, look, we just want to show that-- we'll show that with high probability, all events Ei occur. So the first point is that probability of E6 is equal to 1. because basically, n over 2e-- so how many bins could there possibly be with load at least 6-- at most n over 6 of them?

[`1:08:14`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4094) And n over. 2e is bigger than n over 6, so. AUDIENCE: Is that why you're starting this? SPEAKER: Well, I could have-- I mean, I could have started earlier maybe and then said just as long-- I could start with t. And then as long as this thing is bigger than n over t, it would be a valid statement.

[`1:08:41`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4121) Yeah, I mean, it's just because at some point, we're going to use turnoff bounds. And we want to make sure that things are small enough to argue about a union bound kills everything. But yeah, it's not that great. Good.

[`1:09:08`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4148) So we're going to have two claims. So claim 1 will be that the probability that B i plus 1 is greater than or equal to alpha i plus 1, given that Ei has succeeded or strictly bigger. Will be at most big O some constant times the probability that if you pick a Bernoulli-- if you pick a binomial distribution-- well, let me write it like this.

[`1:10:00`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4200) Binomial distribution with parameter alpha i over n squared, that that thing is bigger than alpha i plus 1, which is basically what the non-rigorous proof was doing. What's the proof of that? So we know that the probability that B i plus 1

[`1:10:47`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4247) is greater than alpha i plus 1 given Ei-- now we're going to use Bayes' rule-- times the probability of Ei is equal to the probability of B i plus 1 bigger than alpha i plus 1 and Ei, which is at most the probability that B i plus 1 is greater than alpha i plus 1.

[`1:11:21`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4281) Sorry, let me write this again. Oh. So actually, this is not how I want to say it. So what did we say before? We had that point, that B i plus 1 is at most the number of x's, such that H of x is bigger than or equal to i plus 1.

[`1:11:43`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4303) So now, again, we have this thing. B i plus 1 is at most that same exact thing, which is the sum over x of B sub x's. I use that-- I shouldn't have used the same letter to mean loads of. So actually, I think there's really-- what I want to say here?

[`1:12:43`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4363) So certainly, now what I've shown-- certainly what I've shown is the probability that B i plus 1 is bigger than alpha i plus 1 given Ei is at most the probability that the sum over Qx'es bigger than alpha i plus 1 given Ei. And I think-- I had a proof in mind.

[`1:13:22`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4402) And now it's-- yeah, sorry. I think something is now bothering me. The thing is that if you condition on Ei, then this is not just going to be B i over n squared. There's some dependency issue that I need to fix in this proof, but-- sorry about this.

[`1:14:03`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4443) So there's some dependency issues you need to fix in this proof. But if you take this for granted then, basically, now, this is just the Chernoff bound. So what's the probability that a sum of Bernoulli random variables is bigger than some amount? That's a Chernoff bound and then a union bound over all the levels.

[`1:14:19`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4459) And that's basically how it goes. But there's something that I need to fix here. Sorry, I'll have to fix that in the notes. Sorry, I have to fix this. So now what's the probability that a bin of alpha i over n squared is bigger than alpha i plus 1? This is the Chernoff bound.

[`1:15:15`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4515) Then you union bound over all i. And that's basically how it goes. Sorry. So I guess the main tricky thing which now is escaping my mind is exactly this, so. So yeah, I know that might have been an annoying point. But are there questions about, I guess, the structure of the proof besides the proof of that claim?

[`1:16:13`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4573) Yeah. AUDIENCE: It's something [INAUDIBLE] SPEAKER: No, you'd get basically get the same thing as the Chernoff bound up to constants in the exponent. Any other questions? OK, well, if there are no more questions, I guess maybe I'll just tell you what I'll cover next time. So no more hashing.

[`1:17:23`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4643) And two, we'll look at data structures and amortized analysis. We'll look at heaps. So binomial heaps as well as Fibonacci heaps. And we'll look at, for example, splay trees. So we'll probably see heaps on Thursday and splay trees next week.

[`1:17:57`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4677) But just out of curiosity, who's seen Fibonacci heaps? OK, I mean-- and who's seen the analysis of Fibonacci heaps and not just the fact that they exist? Oh, interesting. So I'm curious. So for people who raise their hand at Harvard, did you see it in a Harvard class?

[`1:18:18`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4698) Or was it-- or did you see it elsewhere? AUDIENCE: Well, it was part of a project that I did. SPEAKER: Oh, I see. Oh, OK. I see. And as part of the amortized analysis, we'll see potential function arguments. So what are heaps all about?

[`1:18:45`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4725) Remember what heaps do. So heaps, we store n items with keys that are comparable. And we support some operations. So we insert an item with a key. We also decrease key to some new key. Decrease keys from x to some new k, where k is less than or equal to x, let's say.

[`1:19:26`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4766) And we also delete min, which returns the minimum element and also deletes it from the heap. And remember, Dijkstra's algorithm uses a heap in its implementation. And its running time is-- so let's say we have n vertices and we have m edges. So it'll be m times insert m times decrease key plus n times delete min.

[`1:20:28`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4828) And if you remember binary heaps-- so if you've taken CSA, for example, CS124 and seen binary heaps, you know that you can implement all these operations in log n time. So you'll get running time, which is basically m log n, m plus n times log n But if it's a connected graph, then m will be bigger than n.

[`1:20:45`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4845) So m log n. Fibonacci heaps are able to do all these-- be able to do these operations in constant time and delete min and log n time, which gives you m plus n log n So you'll get a speed up in shortest paths with non-negative edge weights and also in all pairs shortest paths, if you just run Dijkstra n times.

[`1:21:17`](https://www.youtube.com/watch?v=rLMikQTOVnI&t=4877) So we'll see Fibonacci heaps next time. And I'm sorry again about this. I'm going to have to fix this in the notes.
