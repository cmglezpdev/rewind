# Advanced Algorithms (COMPSCI 224), Lecture 26

*Harvard University · 1:25:02 · https://www.youtube.com/watch?v=DpxNW0T8CWg*

[`0:03`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3) SPEAKER: No, thanks. [SIDE CONVERSATION] SPEAKER: OK. So I think I'll just put this on. OK. I'm going to get started. So today was the last day. We're just going to finish streaming, and I'll just call today the power of random signs. So we're going to see L2-norm estimation.

[`1:28`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=88) We're going to see fast regression, point query, dimensionality reduction. So it might seem like many things. Some of the things I-- well, actually, all these topics I covered in depth. I do cover in depth in algorithms for big data, CS229R. So I'm not going to provide all proofs here, but I wanted to give you a taste of some of this stuff.

[`2:19`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=139) So remember last time-- last time, we had a vector X, which was an Rn and is huge. And we wanted to compute functions of X. Well, X is updated in a stream without actually remembering the entire vector X. So receive updates.

[`2:49`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=169) Xi goes to Xi plus v in a stream. And we must answer queries to f of x. So last time I said that v was always one. And it starts off, I should say, X starts as a zero vector. So last time I said v is always one.

[`3:31`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=211) Let's say the query one answers the support size of X. That was the distinct elements problem. I showed you that. There are some non-trivial algorithm if you assume some idealized hash function. Good. So what's a different-- but there are other functions that you might want to compute, other types of queries.

[`3:53`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=233) So another f is f of x equals, say the IL2-norm squared of X, or just say the L2-norm, L2-norm. If you can compute this up to some one plus epsilon error, you can compute the L2-norm up to some one plus roughly epsilon error just by taking the square root at the end.

[`4:21`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=261) And the algorithm I'm going to show you is due to Alon Matias Szegedy. So just like with support size, you can't get little lower than space unless you settle for both randomization and approximation. So you're not going to output the true answer. You're going to output the answer up to one plus epsilon.

[`5:05`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=305) Let's say up to 1% error, and it's going to be a randomized algorithm that fails with probability 1% or something, unless you allow for both randomization and approximation. And the AMS algorithm introduces an idea that gets used all over the place in streaming algorithms. And it's particularly important when V can be not only positive but also negative.

[`5:48`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=348) So if you think about the algorithm we saw last time where V was always one, in other words, V was always positive, you couldn't support deletions in the stream. So the number of distinct elements is support size. If I later wanted to delete an element that I saw, well, I'm only storing the minimum hash value I ever saw.

[`6:10`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=370) So if the item corresponding to that minimum hash value gets deleted, then my minimum hash value I'm storing is irrelevant now. And I don't know the second minimum because I didn't store that. So what can my algorithm do? So linear sketching is what I'm going to show you, allows you to design streaming algorithms that support deletions.

[`6:29`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=389) So linear sketching. So it lets you support deletions. And in fact, if you have to support deletions, it's known that, essentially, any algorithm can be converted into a linear sketch with at most a small blow up in space complexity, like a log n blow up in space.

[`7:18`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=438) For any query f with a minor space blowup. If you want to see the details of that, that's due to Li, Nguyen, and Woodruff. OK. So let's go back to the problem I stated. So back to f of x being the L2-norm squared. So what is a linear sketch?

[`8:15`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=495) I didn't actually-- oh, you can, if you want. You can-- maybe, I'll tell you now what the idea is. So the idea is you pick some matrix, let's call it pi, which is m by n, and you store y equals pi x in memory. So initially, I'll say y is zero, because pi is 0 is 0.

[`8:53`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=533) And if pi looks like this. So pi is some fat short matrix. Let's say the columns are pi one up to pi n, and let's say this is an m dimensional. It has m rows. If I see an update where I add v to Xi, what does that imply I have to do for my streaming algorithm?

[`9:19`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=559) That implies that y should be incremented as follows, y should become y plus v times pi. So I can support arbitrary updates in the stream just by updating my linear sketch like this. And this holds whether I have deletions or insertions. So what's the linear sketch going to be for RF?

[`10:06`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=606) We'll pick pi ij to be plus minus one over root m uniform. So let's say it has independent entries and each one is a random sign over root m. And now we have to estimate-- we have to estimate f of x based on the y we have in memory. So we'll estimate the L2-norm squared as just the L2-norm squared of y.

[`10:50`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=650) Here And let me just-- I want to call this random sign sigma ij from now on, just when I get into the analysis. So why does this work? So the way that many algorithms get analyzed in streaming, including this one, is to first, basically bound the expectation, bound the variance, and then use Chebyshev's inequality.

[`11:34`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=694) So let me show you that. So the expectation of y L2-norm squared that's equal to-- so here's my analysis. Well, actually, let me before I say that, what do I want to say? I want to say, look, the probability that y L2-norm squared minus x L2-norm squared, what's the probability that this thing deviates by more than epsilon times what it should be?

[`12:18`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=738) I want to say this is small. I want to say that it's at most a third or something, or a hundredth. My probability of failure is at most 1%. And by the way, what does this say? This is the same thing as saying that y L2-norm squared is one plus or minus epsilon x L2-norm squared, which is what I want.

[`12:38`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=758) I want to get the answer up to this one plus epsilon error. Is it clear what I mean by this notation? I mean that it's at most one plus epsilon times this. And it's at least one minus epsilon times this.

[`12:55`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=775) Well this thing, this thing is at the expectation of y L2-norm squared minus the expectation of-- minus x L2-norm squared squared over epsilon squared times L2-norm to the fourth. This is Chebyshev's inequality. Which is just Markov after you square things. So we just need to understand this expression up top.

[`14:00`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=840) So first of all, I want to say that this L2-norm of x squared is just the expectation of that. So the expectation of y L2-norm squared, so that's the sum over I. Let's say r from one to m, expectation of yi squared yr squared.

[`14:34`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=874) That's just linearity of expectation. So I want to understand what is this quantity here for any fixed r. They're all the same for all r. So what is your yr? Yr is just one over root m. Oh did I-- yeah. What is my definition of pi ij.

[`15:01`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=901) It's this. So yr is one over root m sum i from one to n of sigma ri Xi, which implies that yr squared is one over m sum over i from one to n sigma ri squared Xi squared plus sum of i not equal to j sigma ri sigma rj xi xj.

[`15:55`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=955) So this implies that, and this thing here is just one. So this implies that the expectation of yr squared is one over m L2-norm of X squared plus sum i not equal to j expectation sigma ri sigma rj xi xj. But if these things are independent, this is equal to expectation of sigma ri expectation of sigma rj, which is just zero.

[`16:32`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=992) So this thing goes away. So this implies that expectation of yr squared is one over m times L2-norm squared of x, which implies that expectation of y squared, which we said was one over m, which was sum over r expectation yr squared is just L2-norm of x squared.

[`17:15`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1035) So we know that this thing here is just equal to now the variance of this random variable over epsilon squared times x2 to the fourth. We just showed that thing is the expectation. So that is the definition of variance. And if this matrix, if the entries of pi really are independent, then that means that the entries of y are independent.

[`17:51`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1071) So now let me say what I want to say. So the variance of this thing is the variance of the sum over r from one to M of yr squared. But if you have random variables that are independent of each other, then the variance is just add. So this is equal to sum r from one to m of the variance of yr squared.

[`18:34`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1114) So let's bound this thing. So the variance of yr squared by definition is what? It's the expectation of yr to the fourth minus the expectation of yr squared squared. And we just said this thing is x L2-norm to the fourth. How about this thing?

[`19:32`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1172) Sorry, and there's a one over m squared here, I guess. So I just squared this thing. So how about this? Well, that we can expand out. So what's yr to the fourth? We wrote what yr is. So that's one over m squared times a sum i equals one to n sigma ri xi to the fourth.

[`20:39`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1239) So we want the expectation of this thing. So you can imagine expanding this thing out to the fourth and having lots and lots-- having lots of monomials, roughly n to the fourth monomials or exactly n to the fourth monomials. And then you can use linearity of expectation to push this expectation inside.

[`21:06`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1266) So some of the terms-- so what are you going to have? You can have some terms which are like sigma ri for sum i to the fourth power. Or you can have two different indices, i and j, and you can have sigma ri squared and sigma rj squared. You can have sigma ri cubed and sigma rj to the first power.

[`21:27`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1287) Basically, these powers have to add up to four. So let me just write this explicitly. So this is one over m squared. And then expectation of sum over i sigma ri to the fourth, xi to the fourth, plus sum over i

[`21:48`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1308) not equal to j sigma ri squared sigma rj squared xi squared xj squared plus sum i not equal to j sigma ri cubed sigma rj xi cubed xj, et cetera. You can also have three different indices. Two of them get raised to the first power. One gets squared.

[`22:12`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1332) You get lots of different things going on. Now, when you push this expectation inside, let's look at, for example, this monomial here. I should be clear. There are more things here that I didn't write. Well, first of all, these two things are independent of each other.

[`22:32`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1352) So the expectation of their product is the product of their expectations, and the expectation of a sign to an odd power is zero. So whenever you have any odd powers, the terms just disappear. So this is similar to, I think, way back I had you prove the Chernoff bound using-- well, by explicitly writing down all the monomials.

[`22:56`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1376) So it was the same thing there that things with odd powers disappeared. So the same thing happens here. And basically, the only things you're left with are terms like this and terms like this. Everything else doesn't matter. So this thing I claim is just one over m squared times, you have this term, sum over i xi to the fourth, plus, you have the other term, sum i not equal to j xi squared xj squared.

[`23:35`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1415) So conveniently-- [MUMBLING]. So this thing here is at most sum over i xi squared squared, which is equal to x2 to the fourth. So when you subtract out this thing, you're subtracting this out, the overall thing is negative. I should be a little bit more careful.

[`24:12`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1452) AUDIENCE: [INAUDIBLE] SPEAKER: Right. Oh, yes. Yes. Good. There's a constant here, which I completely didn't write. Good. I was like, this is a little too good. Yeah. I think it's because I wrote i not equal to j, I think it's three. But whatever.

[`24:29`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1469) There's some constant here. It's not so important. But OK. So now, overall, this implies what? We have that the variance of yr squared. Oh, and actually, I can even be a little more-- I can optimize things a little bit more. Let me not do this.

[`24:58`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1498) Let me just keep it like this. And let me say this is equal to 1 over m squared. This is a constant factor. It doesn't really matter, x2 to the fourth, or at most, no, equal plus two sum i not equal to j xi squared xj squared. When you take one of these and add this in, you get exactly this and then you have this here.

[`25:38`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1538) OK. Great. And then now, conveniently, this thing cancels that. So the variance of yr squared is at most two times the sum over i xi squared squared, which is-- and there's a division-- there's a division by m squared, which is two over m squared times x2 to the fourth.

[`26:22`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1582) So-- AUDIENCE: Is there an expectation [INAUDIBLE]. SPEAKER: Expectation? Oh, so right. So I said that the expectation basically kills all the terms with odd powers, and then terms with even powers any-- a random sine squared is just one, so the randomness disappears. So what we just showed is that, well, the variance is the sum of all of those.

[`26:47`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1607) So the variance is at most two over m times x2 to the fourth. AUDIENCE: M squared? SPEAKER: I'm sorry. AUDIENCE: M squared? SPEAKER: Oh, but I summed it m times. AUDIENCE: Oh, oh, yes. SPEAKER: Yeah. And we said that the probability that we failed, that was what I just erased here, the probability that we failed was at most this quantity, which was this.

[`27:13`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1633) So this is at most two over m times x2 to the fourth. This is the variance times one over epsilon squared times x2 to the fourth. So this thing is gone. So if we want this to be less than say a third, we'll set m to be something like six over epsilon squared so that this is less than a third.

[`28:02`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1682) OK. AUDIENCE: [INAUDIBLE]. SPEAKER: I'm sorry. AUDIENCE: Is it m squared? SPEAKER: There's an m squared? Where? AUDIENCE: [INAUDIBLE]. SPEAKER: But it's the variance of this, which is that. Yeah. OK. Great. So in conclusion, oh, you're scribing, right? Is it-- OK great.

[`28:58`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1738) If we use one over epsilon squared words of space our estimate is one plus or minus epsilon times L2-norm squared with probability of at least two thirds. One thing you can do to amplify this is just repeat this same, basically, let me-- to get with probability at least one minus delta, what you can do is a common trick.

[`29:49`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1789) Basically, your linear sketch will be the concatenation of many independent copies of this linear sketch. So you'll have pi up here, which has one over epsilon-- the six over epsilon squared rows, and then you'll have another pi prime down here, which has six over epsilon squared rows.

[`30:13`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1813) OK. And you'll have a k being something like log one over delta independent copies of pi. So it implies you will obtain k independent trials. Let's call them y1 up to yk. And the algorithm will estimate yk-- or will estimate x L2-norm squared as the median of all these things.

[`31:24`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1884) OK. Why does that work? Well, the point is, each one we works with probability two thirds, and for the median to fail, strictly, more than half of them have to fail. But we know that, basically, the expected number that

[`31:43`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1903) work for us that give us a good estimate is k times two thirds, and we fail with this procedure if the number that work is less than k over two. So there has to be a significant deviation from the expectation in terms of the number of trials that worked.

[`32:00`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1920) And by a Chernoff bound, the probability that we get that kind of deviation decays exponentially in k. And exponentially in k means one over exponential in k is delta, basically. So expected number of trials succeeding is at least two thirds of them we fail if less than k over two succeed.

[`32:40`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=1960) Probability that less than k over two succeed is exponentially small k. This is a Chernoff bound. Great. Now-- so great. So we know that implies space, let's say one over epsilon squared log over delta for a success probability one minus delta.

[`33:39`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2019) And it turns out that this is optimal. So there was quite a long line of work showing that this was optimal. Initially, people could get the one over epsilon squared but they couldn't get the product. Well, even before that, people could get one over epsilon, but not one over epsilon squared.

[`34:02`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2042) There's quite a chain of papers. I'll just cite the most recent which finally gets this, which is due to Jayaram Woodruff. This is Transactions and Algorithms. Well, that's the journal version anyway. Great. So there are many things that I wanted to show you. That was L2-norm estimation.

[`34:38`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2078) One thing I wanted to say is so I guess here you already basically see it from the proof, but you're trying to get a low memory algorithm, and this matrix pi, the number of columns of pi is n, so if you actually were to store this pi, you'd use more space than storing x by itself, which you don't want to do.

[`35:02`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2102) So what do you do, well, you look at the proof and you say, look, when I calculated-- I needed to calculate the variance and I need to calculate the expectation, when I did those things here-- so I did calculate the expectation of this thing, and then the expectation of this whole thing.

[`35:22`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2122) If you expand this thing out, you get at most degree four polynomials in these random signs. And we only need to be able to say that the products of those four things behaved independently. Those four things were independent. So we just need four wise independent random signs.

[`35:42`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2142) And we saw earlier in the course that you can generate four wise independent random signs using log n bits, a hash function specified by only log n bits of four wise independent family. So this entire matrix pi really-- well, each one of these things stacked only needs four wise independence.

[`36:01`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2161) There are log one over delta of them. So the total space is log over delta times log n. So this whole matrix, this entire thing here is specified using very little space. So log n bits is like a word.

[`36:18`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2178) So each hash function for each one of these only needs a constant number of words of space, and their log over delta hash functions because you're repeating this log one over delta times, so log one over delta words. So that's really-- I'm not hiding anything, that's really the entire analysis of this.

[`36:42`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2202) Actually, maybe I'll-- before I move to the next board, let me just say one thing. Space is-- the space is this, but how about the update time? I said that streaming algorithms are basically small space data structures, in data structures, we care about space, update time, and query time, and dynamic data structures.

[`37:20`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2240) So what's the-- ignoring the time to evaluate the hash functions, which is constant anyway with the right hash functions, what is the update time in this algorithm? If you see a new update in the stream, how much time does it take to update your sketch? I guess the hint really should be-- when you see an update, this is what you have to do.

[`37:45`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2265) You have to add this into your sketch. AUDIENCE: Order m. SPEAKER: Order m, which is this. So the update time is also one over epsilon squared log one over delta. And the reason for that is that when you're adding in some multiple of a column of this matrix, this is a completely dense matrix.

[`38:14`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2294) Every single entry in this matrix is some random sign. So you have to touch every entry in y to perform an update. So one way of-- one way of improving that is to make this thing sparse. And in fact, you can do that. So Thorup and Zhang, let me not say the journal version because I might get the year wrong, but the conference version is SODA 04.

[`38:56`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2336) They just look at pi being as follows. This is, again, theta one over epsilon squared. You have n columns. And what's your matrix in each column? You pick a random location and you put a random sign there and the rest of that column is zero, and each column looks like this.

[`39:31`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2371) Your other column have a random location. You put a random sign there. Everything else is zero. The rest of the algorithm is the same. You maintain pi-- you maintain y equals pi x. And your estimate of the L2-norm squared of x is just the L2-norm squared of y.

[`39:55`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2395) And you basically can show the same exact thing. You can show that the expectation, I'm not going to do it on the board, the expectation of y squared is still x squared and the variance of y squared you can show is still O of one over m times x2 to the fourth.

[`40:26`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2426) That's a computation. Not very different from the computation you saw, which implies that you can use this sketch instead. AUDIENCE: Is there any reason to ever use the dense one? SPEAKER: No. Yeah. So this is just strictly better. And you can do the same thing where you repeat this log over delta times, take the median.

[`40:50`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2450) So this has update time. What's the update time for this if you want success probability one minus delta? AUDIENCE: [INAUDIBLE]. SPEAKER: Huh? AUDIENCE: [INAUDIBLE]. SPEAKER: Yeah. Log one over delta. Good. So you get rid of this one epsilon squared in the update time.

[`41:22`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2482) And it's actually an open problem that I myself am quite interested in as to whether or not you can do better than this. Is there an algorithm that achieves success probability one minus delta for L2-norm estimation, which gets the right space and gets update time, which is, say, constant?

[`41:41`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2501) Why not? Or root log over delta or something. So we can show something. We can show that if you use a linear sketch, the update time has to be roughly root log over delta. But there's still room. There's a gap there between log over delta and log over delta. So that's L2 norm estimation.

[`42:28`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2548) Questions about it? So you might ask motivations of this thing. Where does it get used? So for example, I can tell you where Thorup and Zhang were using this thing. So both of them were at AT&T research, which, AT&T has lots of routers.

[`42:51`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2571) And, again, their vector x, n is the number of destination IP addresses, and xi-- they didn't even care about deletions. xi is just how many packets did that place-- did that destination receive over some time window. And the thing about the L2-norm squared is that it measures kind of spikes.

[`43:17`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2597) If-- I mean, the thing that measures spikes the most is the infinity norm, in terms of is there an entry i such that xi is very large. You really want the infinity norm and that will tell you what's the largest xi. It turns out that unfortunately, there is no efficient-- space efficient streaming algorithm for the L infinity norm.

[`43:37`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2617) But the largest value of P, for which there is a space efficient algorithm for the LP-norm is P being two. I'm not going to justify that, but it's known. People have proven that. So they were looking at that to basically estimate skewness in the distribution of packets going to various places as part of a system for detecting denial of service attacks.

[`44:03`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2643) And they really cared about a faster algorithm because this thing was sitting on the router, and network speeds are really fast. They can't afford to spend-- let's say you want 1% error on your estimate. So one over epsilon squared is 100 squared, which is 10,000. So basically, they just got rid of a factor of 10,000 in their running time, which was very important for them.

[`44:27`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2667) So good. So that's L2-norm estimation. It gets used in other places as well. One thing I can mention is you saw in one of your P sets Jaccard similarity, where you wanted to estimate the similarity of two sets and you used the min of a hash function to do it.

[`44:48`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2688) Another way of estimating similarity of, say, documents. I think in the P set I mentioned the history with web pages, estimating similarity of web pages. Another thing you can do to estimate similarity of web pages is cosine similarity. So for example, xi is number of occurrences of word i in document x.

[`45:32`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2732) And you normalize the document, so it's normalized. And what do I mean normalized? I mean, once you define this vector x, you normalize it so that it has unit norm. So now you have a bunch of documents, so x lies on a circle. You have one document x.

[`45:56`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2756) You have some other document y. You have another document z, e cetera. How do you estimate the similarity of two documents using cosine similarity? Well, it basically comes down to the angle between the two documents. If the angle is small, you say the documents are similar. And how can you use this kind of streaming algorithm to estimate cosine similarity?

[`46:23`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2783) Well, forget about streaming. Just think of it as a method of compressing the document. Instead of storing the document x, you'll store the compression pi x. This compression is often called a sketch of x. And you really want-- you really want xy, which is, say, cosine of theta.

[`46:49`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2809) So you want to know some information about cosine of theta is large if theta is small. It's one if theta is zero. You really want to know this dot product. And what you'll do is you'll estimate as pi x dot pi y, where pi is exactly the same pi.

[`47:16`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2836) And you can do an expectation variance analysis to basically say that this works. It'll give you an additive epsilon with probability one minus delta to the true dot product by redoing this. Or you can just say, look, you can say pi x minus-- pi of x minus y squared.

[`47:40`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2860) Well, actually, let me just write it like this. A minus b squared is a squared plus b squared minus two a dot b. That's just an identity, which implies that a dot b is equal to a squared plus b squared minus a minus b squared over two.

[`48:15`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2895) And what do we know about pi? We pi preserves L2-norm squares of vectors. So imagine that a is now pi x and b is pi y. We want to understand what does pi x dot pi y look like. Well, it's pi x L2-norm squared, which is roughly x L2-norm squared plus pi y L2-norm squared, which is roughly y L2-norm squared plus pi of this vector.

[`48:43`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2923) It's some other vector, but pi preserves norms of vectors. So it's roughly what it should be up to this epsilon error. So the fact that you preserve L2-norms of vectors means you preserve dot products, which means you roughly preserve cosines of angles.

[`48:58`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2938) So you can use this same exact setup to do cosine similarity. Does that make sense? So let me show you some more power of random sines. Another example. So let's say statistics such as linear regression. So the idea here is there's some parameter

[`49:59`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=2999) vector x in Rd And given variables a1 up to ad, our system is linear and we should have that b is sum of i equals one to d of ai xi. So there's some other variable in our system b and it behaves as a linear function of other variables ai.

[`50:48`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3048) And the coefficients of that linear function are these xi's. And we're imagining we don't know the xi's. So we're doing experiments. And based on our experiments, we know a lot of ai's. We the resulting b. We can observe all these variables, but there are some hidden variables, xi, that we don't know and we want to solve for them.

[`51:09`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3069) And the way this is done is you write a matrix A, which is really-- just think of it as tall and skinny, a1, a2, an. So it's an n by d matrix. And you want to find x such that, so let me call this b1 such that Ax is b, where B is also this n dimensional vector.

[`52:02`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3122) Now, usually, when you do linear regression in statistics, just the show of hands, how many people have heard of linear regression? So usually, you assume that you don't actually observe the true variable, but you observe the variable plus noise.

[`52:17`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3137) So we observe b, which is a sum of i plus one to d ai xi plus noise, noise in our experiment, or there's some noise that's generated as we do this. So we want to find x such that Ax is approximately b. So to be specific, we want to compute x star-- oh, you had a homework on this as well.

[`53:06`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3186) So you want to compute x star, which is the argmin of Ax minus b. So, yeah, I guess everyone should have heard of least squares regression, unless you drop that P set. Good. And as we, I guess, almost saw on the P set, you can write that x star is equal to A transpose A pseudoinverse A transpose b.

[`53:36`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3216) So in the piece that I think I said that A has full column rank, in which case the pseudoinverse is the inverse. I don't want to get into-- this is the pseudoinverse. Basically, it's some generalization that also lets you handle the case when it's not full rank. You can go look it up if you want.

[`53:56`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3236) It's not going to be important for what I say. The thing that is important is how long does it take to compute A transpose A? N squared, right? O n squared, not n squared. So A is n by d, n times d squared actually, because if you look at A transpose A, A transpose A is a d by n matrix times an n by d matrix.

[`54:42`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3282) So you have to keep doing these dot products like this. Every time you want to compute an entry, so the resulting matrix should be d by d. So for each one of these entries, you have to take one of the rows here and a column here and take a dot product.

[`55:04`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3304) So that's n time and there are d squared entries. So this implies n times d squared time. That turns out to be the bottleneck. The pseudoinverse takes poly d time, roughly d cubed time. So the bottleneck really is doing A transpose A. I mean another way of solving, as you saw in the P set, another way of solving this thing is using gradient descent.

[`55:52`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3352) You start off with a decent solution and then you keep refining it using gradient descent. But let me stick to this for a second. So can we speed this nd squared up using this Thorup Zhang or using the AMS sketch, this random sign sketch. Yes we can.

[`56:14`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3374) So let me make a definition. So Sarlos, he says that pi is an epsilon subspace embedding for a subspace V, a linear subspace, if for all vectors V, in capital V, we have that pi V L2-norm squared is one plus or minus epsilon L2-norm squared. So it's sort of what we were talking about, preserving L2-norm squareds of vectors, but there are infinitely many vectors here.

[`57:45`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3465) So claim if pi is an epsilon subspace embedding for which subspace? The span of B as well as the columns of A. Then if you look at x tilde star, which is the argmin of pi ax minus pi b, it satisfies that ax tilde star minus b is at most one plus epsilon over one minus epsilon ax star minus b.

[`58:54`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3534) So ax star minus b is the best you can possibly do. And what I'm saying is if instead you use this as a substitute for the true optimal vector for regression, you'll do almost as well. And what's the benefit of this? What's the algorithmic benefit of this?

[`59:19`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3559) So I should say here, hopefully, m is much less than n. So this is an m by n matrix. So what's the benefit? AUDIENCE: [INAUDIBLE]. Space. SPEAKER: So, I mean, yeah do reduce space, but you also reduce time. The bottleneck here was computing A transpose A, which we said was nd squared.

[`59:54`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3594) But now we don't have to compute A transpose A. Basically A is now pi A. So pi A transpose pi A takes md squared time. So if m is much less than n, we just replaced an n with an m in the running time.

[`1:00:07`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3607) And it turns out, we're going to see, you can get m to depend only on d. It doesn't have to depend on n at all. So you get a running time at the end of the day which this n becomes something function of d. So let's just prove this.

[`1:00:33`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3633) So first of all, x tilde star is the optimizer for this regression problem, which means that pi Ax tilde star minus pi b. I'm going to drop L2-norms. They are all L2-norms, is at most pi Ax star minus pi b because I said Ax tilde star is the optimal vector for this regression problem.

[`1:00:57`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3657) And what is this? This is just pi times Ax tilde star minus b. This vector lives in that subspace. It's spanned by b and the columns of A, so it's preserved. Same thing here. This thing lives in the subspace. So it's preserved.

[`1:01:24`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3684) That's it. Now you just move this over here. Questions about that? Yeah. AUDIENCE: [INAUDIBLE]. SPEAKER: Yeah. OK. Good. So I slightly cheated. I said everything is great because now this n is an m, but I ignored that. You have to actually spend time computing pi times A. But, as we're going to see, you can choose pi to be like the Thorup Zhang sketch, and then pi is super sparse.

[`1:01:56`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3716) So pi A is really fast. So now how do you get the pis? So you're asking about how do you multiply pi times A? So benefit, bottleneck for computing x tilde star is pi A transpose pi A and this takes time. But as you said, what about the time to compute pi A?

[`1:02:58`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3778) Well, to answer that, I have to say what is pi? Yeah. Is everyone still with us? So let's think about what it means to be a subspace embedding. Let's-- so what does it mean to be a subspace embedding? So let me say that.

[`1:03:45`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3825) So V is a linear subspace. Let's say the dimension of V is d. So every subspace has a basis. And we can take an orthonormal basis. So let's say that U is an n by d matrix. The columns of U form an orthonormal basis for V. Which implies that, for example, U transpose U is the identity.

[`1:04:29`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3869) What's the ijth entry of U Transpose U? It's the ith column of U dotted with the jth column. So that's only-- since it's an orthonormal basis, that's one when i equals j and it's zero otherwise. So the definition of being a subspace embedding is that for all V and V pi V L2-norm squared is one plus or minus epsilon v L2-norm squared.

[`1:05:16`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3916) But what is V? V is just the set of all vectors Ux, where x is in Rd. It's linear combinations of vectors in my Orthonormal basis. So this thing, this thing is the same as saying for all x in Rd, pi Ux is one plus or minus epsilon Ux.

[`1:05:58`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3958) But what is Ux-- what is Ux L2-norm squared? This is x transpose U transpose Ux. And U transpose U is the identity. So this is the same thing as one plus or minus epsilon L2-norm squared of x. So what we're saying is that all the singular values of pi U are between one minus epsilon and one plus epsilon, or the squared singular values.

[`1:06:31`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=3991) So this is the same thing as saying all eigenvalues of pi U transpose pi U are one plus or minus epsilon, which is the same thing as saying that the largest eigenvalue in magnitude of pi U transpose pi U minus the identity matrix is less than epsilon.

[`1:07:21`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4041) Questions? AUDIENCE: [INAUDIBLE]. SPEAKER: This is the operator norm, which means take the largest eigenvalue in absolute value. Take the absolute value of the largest eigenvalue. And if you think about it, Pretend that U was not a matrix, but was actually a vector. Pretend d was one.

[`1:07:41`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4061) If d is one, what is this thing here? This is just the squared norm of pi U. Meanwhile, what is this? This is, let's say U has unit norm. This is U transpose U. This is the squared norm of U. So this is the squared norm of pi U.

[`1:07:56`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4076) This is the squared norm of U. And if U is a vector, then these are just scalars and operator norm is the same thing as absolute value. So this is like a generalization of what we just saw, preserving vectors. Instead of preserving vectors, you're preserving orthonormal matrices under operator norm.

[`1:08:16`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4096) So you can think about basically doing the same exact proof. Do Chebyshev's inequality. The probability that pi U over pi of pi U transpose pi U minus the identity bigger than epsilon is at most the expectation of pi U transpose pi U minus identity squared over epsilon squared.

[`1:08:45`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4125) What is this thing? This is the largest eigenvalue squared. The largest eigenvalue squared is definitely at most the sum of each eigenvalue squared. Because when you square it, everything is non-negative. So this is at most the expectation of the trace of pi U transpose pi U minus the identity squared over epsilon squared.

[`1:09:13`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4153) The trace is the sum of the eigenvalues. The operator norm is the biggest eigenvalue. When you square a symmetric matrix, the eigenvalues just get squared. So this is the sum of the squared eigenvalues. This is the largest eigenvalue squared. So this is definitely bigger than this.

[`1:09:32`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4172) So this is like the matrix analog of what we saw before. And I'm not going to do the computation. But what you can show is that this thing is one over epsilon squared times O of d squared over m. So as long as you choose m to be d squared over epsilon squared, you're done.

[`1:09:59`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4199) If you use say the Thorup Zhang sketch, this matrix where you have one nonzero per column. OK. And this thing is due to-- so Clarkson Woodruff had some-- they had a more complicated way of doing it that got a slightly worse bound, but they were the first to do it.

[`1:10:21`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4221) And then, basically, this sequence of inequalities I just showed you is from Mahoney and Meng in the same conference, as well as myself and Nguyen. So now, if you use the Thorup Zhang sketch, how long does it take to compute pi A? So pi has one non-zero per column and zeros everywhere else, and then you have A here.

[`1:11:06`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4266) So you can prove that this thing is basically the support size of A. And the reason-- oh, question. Yeah. So let me just say, so what's the reason? Basically, think about a column by column and for every non-zero entry of A, a non-zero entry of A means add the corresponding column of pi to your sketch, but that column only has a single non-zero entry.

[`1:12:03`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4323) So you can do that in constant time. So for each non-zero you're spending only constant time to add into pi A. Maybe you can think about that offline. So there's that. So I showed you this and this. How about point query and dimensionality reduction? Maybe I'll actually switch the order of those.

[`1:12:46`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4366) And so now I just want to show you basically applications of this pi. That's what I'm showing you over and over again in different areas. So now I'm doing this one. The idea here is there's this Johnson-Lindenstrauss Lemma.

[`1:13:12`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4392) It says that for all points X1-- let's say for all sets X in Rn, let's say that the size of X is capital N, there exists a matrix pi, what you know, where m is O of one over epsilon squared

[`1:13:37`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4417) log the size of x, such that for all xy and capital X pi X minus pi y is one plus or minus epsilon x minus y. And as I formulated it where you want to use a linear sketch, it's known that this is optimal.

[`1:14:16`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4456) So m being omega, let's say the min of n and one over epsilon squared log N is necessary in the sense that there exists a set of vectors capital X that really needs this number, this target dimension. Why did I have to put a min of little n there? Just so we're on the same page.

[`1:15:00`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4500) AUDIENCE: [INAUDIBLE] if m is larger than n then you can just stick the whole thing in. SPEAKER: Yeah. I mean, I could always take pi to be the identity matrix. So you're not going to prove that-- you're never

[`1:15:12`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4512) going to prove that you need more than little n dimensions, but we can show that you always need the min of n and this, which is basically the right thing, because it says that you should use this until the identity matrix is better.

[`1:15:27`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4527) So how do you prove this thing? Design a distribution such that-- let's call this D over matrices, just like we designed distributions over pi's, such that for all x and Rn of unit norm, the probability over pi drawn from this distribution d that pi X-- actually, let me call it Z because I don't want to conflict with that X over there.

[`1:16:07`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4567) Probability that pi Z minus one is bigger than epsilon is at most delta. Suppose you could design such a distribution. If you could design such a distribution, you would set delta to be one over basically N choose two, where capital N is that capital N. Set Z to be some x minus y over the norm of x minus y where x and y are in this capital X.

[`1:17:05`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4625) So what you're telling me is this random matrix pi preserves this vector with high probability. So by a union bound, it preserves all of these for all choices of x, y and capital X with good probability. So you're done. So what do you think pi should be?

[`1:17:34`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4654) Random sign matrix. So Choose D to be uniform over random sign matrices minus one over root m one over root m by n matrices, where m is going to be one over epsilon squared log one over delta. So this log one over delta is why you get a log capital N. I still have some time.

[`1:18:10`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4690) And I'm not going to show you the proof. Why does this work? If you choose m to be like this. But I'll just say it in words. So just now, when we looked at the streaming application, what did we do? We did Chebyshev's inequality, right? Maybe I'll just write a little bit.

[`1:18:31`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4711) And the idea is just like in your homework where you analyze the Chernoff bound using moments, instead of Chebyshev's inequality, which means the second moment, you take a really big moment. And if you take a big enough moment, you can get the error probability to be delta.

[`1:18:49`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4729) So if you go back to your P set for the Chernoff bound, you'll find that if you wanted the right hand side of your final tail bound to be delta and the Chernoff bound, the moment you ended up choosing was log one over delta. So go back to your solution and look at why that's true.

[`1:19:10`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4750) And it's the same thing here. You end up basically just analyzing exactly what I showed you at the beginning of lecture. But instead of taking a second moment, which is Chebyshev's inequality, you take the log one over delta of moment. And you could do a computation that's a little hairier than what you did in that P set problem.

[`1:19:25`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4765) They're also much simpler ways of doing it. But in principle, you know how to do it. OK. So that's dimensionality reduction in the very last minute. That's point query. That's another streaming problem. So again, xi gets updated as xi plus v. This is streaming. And then we have a query fi.

[`1:20:10`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4810) Now, there are many query functions. Fi of x should be xi. So people can query what is the ith entry of x. And, again, we'll settle for approximation. We won't-- yeah. We'll settle for approximation. So we're allowed to output xi plus or minus epsilon times the norm of x.

[`1:20:45`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4845) So we're going to use a sketch matrix pi as usual. Suppose we had a pi, again, n by n, such that if you look at pi being pi one up to pi n, we have that, first of all, pi i has unit norm, and for all i not equal to j, pi i dotted with pi j is at most epsilon.

[`1:21:32`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4892) So our sketch, as usual, sketch of x is pi x. Let's call that y. And we estimate xi as pi y pi transpose y ith coordinate, which is pi transpose pi x ith coordinate. Now, notice that, let's call this xi tilde. And notice that x tilde is just, if you go with this thing here, this is xi plus the sum of j not equal to i of xj pi i dot pi j.

[`1:22:24`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4944) In general, pi x is just the sum over j of pi jxj. Whenever you do a matrix times a vector, that's just a linear combination of the columns of that matrix. So this is what that is. But these things are all plus minus epsilon. So this is xi plus or minus epsilon times the L1-norm of x.

[`1:22:51`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=4971) So the only question is, how do you get such a matrix? How to get such a pi. Apply the JL Lemma. Johnson-Lindenstrauss to x being zero and then the n standard basis vectors, which implies that the number of rows you need is one over epsilon squared log n.

[`1:23:26`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=5006) Oh, and I should say where is this from. And the point is, look, as we saw, preserving L2-norms means roughly preserving dot products, because I had this identity. The norm squared of a minus B is the norm squared of A plus the norm squared of B, et cetera.

[`1:23:54`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=5034) So if you preserve distances between these vectors, it means you're preserving dot products between them. But the dot product between all these vectors is zero, so you're preserving it up to epsilon. That means the new dot products are at most epsilon. That's that.

[`1:24:11`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=5051) And you're preserving the distances of these vectors to zero, which just means their norms. Their norms were originally one, now their norms are going to be roughly one. They're going to be one plus epsilon or something. But you can normalize them to make them actually one, and that won't really change this by much.

[`1:24:27`](https://www.youtube.com/watch?v=DpxNW0T8CWg&t=5067) So that's it. So there are many more ways to use random sign matrices, but that's all I can fit into the time. So, yeah, thanks. And please have some applause. [APPLAUSE]
