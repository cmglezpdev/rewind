# Advanced Algorithms (COMPSCI 224), Lecture 3

*Harvard University · 1:28:46 · https://www.youtube.com/watch?v=WqBc0ZCU4Uw*

[`0:01`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1) SPEAKER: I guess I'll get started. So the last thing I'll talk about is also in the word RAM, but it's hashing. So I'm going to cover, I guess, today hashing. And we'll see load balancing. We'll see k-wise independence. We'll see the dictionary problem.

[`0:52`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=52) And here I guess we'll see-- I'll just review perfect hashing very briefly. And then I'll cover linear probing. So who took CS 124 last semester? Not a lot of people. So I covered this last semester. I guess I'll say some more about it this time. But who has seen perfect hashing?

[`1:22`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=82) And who has not seen perfect hashing? Then I'll look at the retrieval problem. I'll define what these things mean. And here we'll look at cuckoo hashing and Bloomier filters. I guess somewhere in here, I should have-- 5 actually comes before 4, and that's membership, and that's Bloom filters.

[`2:04`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=124) And then if we have time, I'll just say a little bit about simple tabulation hashing but not much because I don't think there will be much time at that point. So who've seen Bloomier filters? Good. Before I talk about what problems hashing solves, I'll just say a little bit about what hashing is.

[`2:37`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=157) So I imagine that we're going to have some family, H of functions. Remember we're on word RAM, so we're mapping, let's say-- by this, I mean, let's say, 0 up to u minus 1, mapping 0 up to u minus 1 into 0 up to m minus 1.

[`3:16`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=196) There are some set, S, which is a subset of u and the size of S is n, such that we want some h in this family, we pick to behave nicely-- we'll see what that means in applications on S, for example, nothing in S should collide.

[`3:58`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=238) So the picture to have in mind is we have some n items, i1, i2-- I'll just usually call these items 1 up to n, even though they're an arbitrary n items in the universe. And we have some hash function H, which sends them into let's think of it as say an array of size m.

[`4:24`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=264) This is cell 0, 1 up to m minus 1, and each item gets hashed somewhere. And there could be collisions. Good. So now that I've said very vaguely what hashing is all about, let me say something about one of the problems that hashing solves, namely

[`4:54`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=294) the dictionary problem, or before I even get to the dictionary problem, let's just say, for example, we have jobs and we have machines that handle jobs or servers. So let's say-- so example-- it's not really a toy example, it's a real one. We have n jobs that need to be assigned to m machines, let's say.

[`5:37`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=337) And each job-- or do we have a scribe for today? Great. So each job has some job ID, let's say, in this range, in this universe. So if we know all the jobs up front, what's one reasonable thing that we might want to do? Let's say that the machines are all identical.

[`6:07`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=367) None is faster or has better hardware than the other. We'd want to evenly spread the jobs across the machine so that each machine gets roughly n over m jobs. If we know all the jobs ahead of time, we could just do that. We could just take the first n over m, send them to one machine, the next n over m, send them to another machine, et cetera.

[`6:26`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=386) But if these jobs are coming, let's say, dynamically online, then we just need to send somewhere-- well, I guess even there, we can just send it to the least loaded machine. But let's say that we don't have-- that requires some global picture of what's happening across all machines.

[`6:47`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=407) And let's say that we want to do something without that global information. One thing you could do is just send it to a random machine, which is, let's say, hashing it to some machine. So each job has some job ID on u. So when a new job comes, have it processed-- let's say, a new job j comes-- j is in 1 to u, comes, have it processed by machine h of j.

[`7:32`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=452) And we might want to understand how well does this behave. meaning does any bin get overloaded? Does any machine get overloaded? We'd like it to have n over m, but maybe it'll have much more. So this is usually called the balls and bins random process, where we have n balls and we're throwing them randomly into m bins.

[`8:05`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=485) And we want to understand how this behaves. So this is some form of load balancing across machines. And we'd like to say-- we'd like to say, the probability that there exists a machine receiving bigger than k jobs is something small. So the question is, what goes here and what's k?

[`8:42`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=522) So is the setup clear to people? Let's say, if h is a totally random hash function. So before I analyze that, I want to prove a certain tail bound. Who here has seen the Chernoff bound? So let me prove a theorem. Suppose X1, Xn are independent, where Xi is either 0 or 1.

[`9:33`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=573) These are independent random variables. And the expectation of Xi is Pi, meaning it's 1 with probability Pi and z otherwise. Then, where if we let x be the sum over all these i's of Xi, the probability that X minus the expectation of X is bigger than-- or let me write it like this.

[`10:00`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=600) The probability that X is bigger than plus delta times its expectation is at most e to the delta-- I can even say, is at most e to the delta over 1 plus delta to the 1 plus delta to the expectation of X. So how do we use that to analyze this, this thing over here?

[`10:36`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=636) So balls and bins. So let me look at one case. Suppose, for example, that m is equal to n. You're servicing these n jobs using n machines. So on average, you want every machine to have exactly one job. Then the probability that there exists a machine with more than some C times log n over log log n jobs is at most 1 over some poly n.

[`11:25`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=685) And how do we prove that? Using the Chernoff bound, for example. But we're going to see-- I mean, the Chernoff bound is overkill, but I just stated it because it's useful as a tool for other things as well. So are people with me?

[`11:44`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=704) Feel free to interrupt me at any point. So there are these Xi's here. So Xi, focus on some machine. Let's call the machine t, machine number t, and define Xi as being one if h of i is t and 0 otherwise, meaning that job i got assigned to machine t, which implies that X is the number of jobs assigned to machine t.

[`12:37`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=757) And that thing over there tells us that the probability that the number of jobs assigned to machine t, the probability that's bigger than. So I'm going to apply this with delta being this log n over log log n. So what's the expectation of X?

[`12:53`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=773) It's 1. The expected number of jobs that land is 1 because there are n machines and n jobs. So this is 1. So this is 1 plus log n over log log n, which is basically, if you adjust this constant c is basically like c log n over log log n.

[`13:10`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=790) So in this case, delta is really large. So 1 plus delta is basically delta. So the probability that X is bigger than c log n over log log n is at most e over-- again, 1 plus delta is basically delta being slightly sloppy, but what I'm saying is fine, e over c log n over log log n, again, to basically delta, c log n over log log n.

[`13:59`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=839) Let me say, this is e over k the k. And q over k the k is 1 over poly n, exactly when k is roughly log n over log log n. So I don't know if people have seen this, but the simplest way to see that is to take logs.

[`14:27`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=867) So the solution to k the k is some polynomial and n is log n over log log n, is k, k is this. And why is that? Take log. So this says, k lawn k is equal to c lawn n.

[`15:04`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=904) And if you pick two-- if you pick k to be-- if you pick k to be a small constant times this, then you'll see that basically this will be too small. If you pick k to be a large constant times this, you'll see that k lawn k will be too big.

[`15:19`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=919) So the right answer is that k is somewhere in this vicinity. And this is at most 1 over n to the c prime. So the probability that machine t is too overloaded is this. And by union bound, this implies that the probability that there exists a bad machine, meaning an overloaded machine-- let's say, that there exists an overloaded machine is at most the sum from t going from 1 to n.

[`16:05`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=965) The probability that t is overloaded is at most 1 over n to the c prime minus 1. This is just n times that. So if you do this hashing business, then with probability 1 over polynomial in n, you might fail. But with high probability, with probability 1 minus this, you won't fail.

[`16:35`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=995) No machine will receive more than this number of jobs. Now in terms of proving the Chernoff bound, I'm not going to do the full proof. There are proofs everywhere, basically, on Wiki even. I'll just tell you how it goes, but we'll see how to prove some other things that are-- it's not particularly difficult.

[`17:00`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1020) There's just a trick in the very beginning. So raise your hand if you've seen Markov's inequality. So let me just remind you. So Markov's inequality. So before I write this, Markov's inequality, it says that if x is a non-negative random variable, then for all, let's say, lambda bigger than 0, the probability that x is bigger than lambda is at the most the expectation of x over lambda.

[`17:54`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1074) That's Markov's inequality. And then the proof of Chernoff is you just say, the probability that x is bigger than this value here, lambda. Lambda is this thing over here, 1 plus delta expectation of x. That's equal to the probability that e to the t, t is-- I haven't said what t is, but e to the tx is bigger than e to the t lambda.

[`18:29`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1109) This is true for any positive t. This is bigger than this if and only if this is bigger than this for positive t, and then you apply Markov. This is at most e to the minus t lambda times the expectation of e to the tx.

[`18:47`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1127) And then you just need to bound this thing. So I'm not going to do that in class, but that's basically how that goes. And when you bound it, you get this. Oh, and you need to choose t. And when you end up actually doing calculations, you'll choose t to be the natural log of 1 plus delta.

[`19:10`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1150) I haven't justified that at all, but look up a proof on Wiki. Now I mentioned that the Chernoff bound is slightly overkill because there's a much simpler proof, namely, what did we say above? We said that the probability that there exists an overloaded machine is at most n times the probability that machine 1 is overloaded.

[`20:01`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1201) Let me just mean all of these probabilities are the same. So it's just n times the first one. So really, it all came down to bounding this thing. Are there questions? So what's one way to bound this probability? Well, what does overloaded mean?

[`20:29`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1229) It means that there are at least k items that map there. So this thing is equal to the probability that there exists k items mapping to machine 1, which again by a union bound is at most the sum over all sets t of k items, probability that t all maps to 1.

[`21:21`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1281) But what's this probability? Let's say h is totally random. It sends each person to a totally random place. So what's the problem that everything in this set got mapped to 1? 1 over n to the k. I said m is n, so the probability that the first guy in t maps bin 1 is 1 over n.

[`21:50`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1310) And then the second guy again, 1 over n, et cetera, and they're independent, so you get 1 over n to the K. So this is equal to the sum over sets t of size equal k of 1 over n to the k. And how many sets of size k are there?

[`22:14`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1334) n choose k. So this is equal to n choose k over n to the k. And this is at most 1 over k factorial. Just if you write out what n choose k is, you'll believe me. And I mean, k factorial is not really the same as k of k, but it almost is.

[`22:54`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1374) I mean, one thing you can say for sure is k factorial is certainly at least k over 2 to the k over 2. I mean, some people can get fancy and say Stirling or something. It's not really necessary. So this is at most 1 over k over 2 to the k over 2.

[`23:16`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1396) So now we're back in the previous situation. Whenever you have 1 over x to the x, and you want that-- whenever you want x to the x to be n or something, x should be log n over log log n. So k over 2 should be log n over log log n, which means k is log n over log log n.

[`23:33`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1413) So you get the same-- you get basically the same thing. So again this becomes 1 over polynomial in n. That's all I really wanted to say about load balancing. But now I want to say something about k-wise independence. So the proof that use the Chernoff bound, note that in the Chernoff bound, we needed that the Xi's are all independent random variables.

[`24:02`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1442) I didn't actually prove the Chernoff bound for you, but at some point, in the proof, that gets used, whereas here, we didn't actually need that. The random variables are all independent. What are the random variables here? So what is this? I can write this as a product of indicator random variables.

[`24:33`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1473) Basically, this thing, if you use the same notation for Xi, this thing is the same thing as the expectation of the product over i and t of Xi. Do you agree with me? Xi is 1. So let's say here, machine 1, Xi is 1 if item i got hashed to machine 1.

[`25:06`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1506) So this product is 1 only when all the machines hash to 1. So the probability that this product is 1 is exactly the expectation of the product. And really, what we used is that this thing is equal to-- well, what did we say?

[`25:23`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1523) We said it was 1 over n to the k. Why did we say that? Because if these are independent, the expectation of the product is the same as the product of the expectation. This is equal to the product over i and t of the expectation of Xi.

[`25:39`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1539) This here was 1 over n, and then we got 1 over n to the k. So in this proof, if you're careful about writing it, what you'll find is that you don't actually need all of the hashings to be totally independent.

[`25:56`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1556) You just need this property, meaning that if you look at any set of k items and look at where they hashed, that behaves as if it were independent, which is a weaker property than saying, if you look at all n items, they behave independently.

[`26:18`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1578) So k-wise independence, the definition is that X1 up to Xn are k-wise independent if for any set of indices 1 less than or equal to i1, less than i2, less than ik, the random variables, Xi1, Xi2, Xik, are independent.

[`27:14`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1634) So if you haven't seen this before, it might look surprising that this is different from being independent, what's an example of something that's k-wise independent but not independent. Who's seen k-wise independence? Just so I have a sense of-- about half.

[`27:56`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1676) So that's k-wise independence in terms of random variables. But we're talking about hashing. So what do I mean when I talk about k-wise independent hashing? So also another definition, a set of hash functions H is a k-wise independent family if for all, let's say, i1 not equal to i2, not equal to iu in-- or sorry, ik in u, in the universe.

[`28:45`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1725) So if you look at any k values in the universe and look at where they hash to-- oh, well, actually, let me write it like this. I already said what k-wise independence means over there if the set of random variables, H x of 0, h of 1, h of u minus 1.

[`29:15`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1755) RKO is independent. where H is drawn from this family uniformly at random. So that's my random experiment. I have this family of functions h capital H, and I draw one at random, and I write down two random variables, which are just the evaluations of that function everywhere.

[`29:48`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1788) And this set of n random variables should be k-wise independent as I defined over there. That's what it means for this to be a k-wise independent family. So for example, the set of all functions is a k-wise independent family for any k. But you can come up with other families as well So let me give you an example.

[`30:15`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1815) So now, definitely, feel free to ask me questions. I feel like people are looking at me suspiciously. Oh, nice t-shirt, by the way. So example, H being the set of all functions, I said, from u to m is a k-wise family for all k. For all k, that's at most u.

[`31:22`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1882) Otherwise, it doesn't make sense if they're only u random variables and you're saying there are two ui's independent or something. So another example is that u equals m equals p prime, and H is the set of all functions h of x, where h of x

[`31:57`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1917) is equal to the sum i going from 0 to k minus 1 of aix to the i mod p, the set of all degree k minus 1 polynomials or degree k minus 1 polynomials. And there are some advantages here. I mean, one of the primary advantages is just the space it takes to store little h.

[`32:26`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1946) So at some point in your algorithm, you have to represent little h in your code. If you have a totally random hash function, how many bits does it take to store a function from this family? u log m. u log m. So for each of the elements, you have to say what it maps to.

[`32:51`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=1971) A number up to m takes log n bits to represent. So this is u times log n bits, whereas here, this ai is in this set range from 0 to p minus 1. And again, I said that u and m are both this. So here what is the-- here how many bits does it take to store a random hash function?

[`33:22`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2002) AUDIENCE: k minus 1 log p. SPEAKER: k minus 1 log p, yes. I'll even say k log p because there are actually k coefficients. There's the constant term, too. But yeah, k log p, so k log u. So this was like u times log m. And let's say, here u and m are the same.

[`33:39`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2019) So think of this as u log u, whereas this is like k log u. So if k is a constant-- if you're working with two-wise independents, which we will at some point or constant-wise independence, h here takes log u bits to store. Here it takes u bits to store or u log u.

[`33:58`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2038) So this is way more expensive to store than this. And so now the question is, just going back to that example with load balancing, to prove that result, what independence did we need? There was not the case that u is equal to m. k, and what was k, I mean?

[`34:44`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2084) Yeah, log n over log log n. So you can get away with weaker hash families to accomplish that. Good. Except that there's this annoying thing that over there, m was not equal to u, it was equal to n And n is probably much less than u. So let me just say something about that.

[`35:17`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2117) So imagine that-- so here's another example, which is just h. So now here, I don't want to say-- I don't want to say that u is equal to m. But I'll say, m is equal to p, and that's prime. And for any given number, there's a prime that's pretty close to it.

[`35:48`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2148) That's within a factor of 2 of it. So it doesn't really hurt us much by assuming that m is prime. But now u can be very different from m, which is really what we need over there. Here m is not u, it's n or it's something. So here we can just define h to be the same thing, h of x, such that h of x is the sum of aix to the i mod p mod m.

[`36:30`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2190) Oh, by the way, before I do that, let's just go back here for a second. Why is this a k-wise independent family? Does anyone have a guess, or does anyone see why this would be? Yeah. AUDIENCE: It's because the vector is 1 but x [INAUDIBLE]. SPEAKER: So if you put it that way, yes.

[`36:57`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2217) So you're saying basically that a certain matrix-- so there's something called a Vandermonde matrix, and it's nonsingular. That's true, but I want to say it in a way that it doesn't scare anyone. So let me just say it like this. So the answer is polynomial interpolation.

[`37:17`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2237) So the basic idea is look at any k indices-- look at any k different values of x, x1 up to xk. And what I claim is that all evaluations, so let's say that-- so look at some x1 up to xk. And look at h of x1 up to h of xk, where h is totally random.

[`37:49`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2269) So I claim that every possibility happens exactly once. So if you look at h of x1 is equal to y1, h of xk is equal to yk. And you ask, can I choose coefficients to make all of these things happen? Yes, by polynomial interpolation.

[`38:19`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2299) And this is true for every single y1 and yk. And how many possibilities are there for these y1 up to yk? There are p to the k possibilities. And how many possibilities are there for the coefficients? There are p to the k possibilities for the coefficients.

[`38:33`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2313) So each setting of coefficients gives a different setting down here, which means that the probability of seeing this, for any settings of the y's is exactly 1 over p to the k, which is just like a totally random case.

[`39:03`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2343) So now if you move over here, it's not going to be true that it's 1 over m to the k because when you take mod p and you take mod p mod m, there's some wraparound issue. So we know that this value is like a totally random value from 0 to p minus 1.

[`39:24`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2364) But a totally random value from 0 to p minus 1 is not the same as a totally random value mod m. Oh. Oh, wait. What's going on here? No, no, no, no, no. I know what I did. I was confused for a second. So u equals p, but p does not equal m.

[`40:01`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2401) That's what I meant to say. Good. So it's still true, though, that these random variables are k-wise independent. But it's not true that the probability of this happening is 1 over p to the k. In particular, if you just look at one item

[`40:24`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2424) and look at where does it map to, where it maps to, it's not going to map to some with probability 1 over p-- or 1 over m, sorry. Does anyone see what I'm talking about? AUDIENCE: So is m less than p? SPEAKER: Yes, m is less than p.

[`40:47`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2447) Think of m as less than p. It won't matter too much, but yeah, you can think of m is less than p. So let me just draw a picture. So if m is less than p, here's m, and here's p. So if you give me a random-- oh, yeah.

[`41:08`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2468) AUDIENCE: The first m boxes will be overfull because they wrap around. SPEAKER: I like that, wrap around. So wait, what do you mean by the first m boxes are overfull? AUDIENCE: So we can think of m as n times p plus some leftover-- SPEAKER: A multiple of p plus some junk?

[`41:27`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2487) AUDIENCE: Yes, plus some junk. But the junk still gets randomly, by probability 1 over p to the k, it will get still things. But those get mapped back to the beginning. I mean, it's the same reason if you have a random variable, and you want a random variable in the range 1 to k, you can't just truncate because then you have nonuniform counts.

[`41:48`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2508) SPEAKER: Right. Wait. I don't know if this is-- so let me rephrase the spirit of what you said, I think. So the point is, if you have a random value between-- this, we know from before, behaves completely uniformly, not just independently but uniformly, in 0 up to p minus 1, which means that we get a random value somewhere in here.

[`42:13`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2533) But a random value is somewhere in here, well, it's like there's a random value from-- and we're taking it mod m. So here's a random value mod m, here's another random value mod m, here's another random value mod m. But then there's some point left over the leftovers where it doesn't quite go up to m.

[`42:34`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2554) But the point is that it might not be true that a random-- that this expression is uniform in 1 to m. But nothing will get more mass than a 1 over m fraction. Everybody will be between roughly 0 and 2 over m.

[`42:56`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2576) So what I can say-- what I can say is that at least-- for all x1 and up to xk and also y1 up to yk, the probability that h of x1 is equal to y1, h of xk is equal to yk is certainly at most 2 over m to the k-- not 1 over m but 2 over M.

[`43:20`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2600) Something like that is definitely true. And this two is even better if is p is way, way bigger than m, if you have lots-- if you have lots of wraparounds before the slosh. So we said that we can get away with log n-wise independence. Oh, and I guess another thing I should say is, notice that this is really still good enough for the application.

[`44:11`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2651) If you look down here with the balls and bins thing, with the random jobs, I mean, with jobs randomly mapping to machines, it won't be 1 over n to the k anymore, but it'll still be like 2 over n to the k. And then if you go through the calculations again, you still get roughly log n over log log n.

[`44:31`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2671) So this thing is usually good enough for us. I don't know. I'm scared by people's faces like this. Yeah. AUDIENCE: Can you explain what 2 over n is? SPEAKER: Right. So the point is, imagine that p was just like m plus 1. So there's some wraparound and then one more item.

[`45:04`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2704) So we know that we're getting a random value between 0 and p minus 1. So we're getting a random one of these values. And then we're taking it mod m. So, are we getting a random value mod m? Not really, because this and this mod m are exactly the same.

[`45:24`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2724) So this value is twice as likely as all the other values. But that's really the worst case. As you wrap around more and more and more, the items even out in terms of how likely they are. But this factor of 2 is the worst case, where there's one item that's right after the wraparound.

[`45:47`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2747) Does that make sense? AUDIENCE: Yeah. Yes, it is. SPEAKER: I mean, this 2 is much sloppier than what I could get away with. AUDIENCE: So the worst cases, I think, is when p is equal to 2m minus 1.

[`46:06`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2766) SPEAKER: No, I think I really did mean m plus 1 when p is m plus 1 And then let's say that all of these yi's-- all these yi's are 0 or 1 or something. All these yi's are 1. Then all of these really are something roughly 2 over m as opposed to 1 over m, and then you get 2 over n to the k.

[`46:29`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2789) AUDIENCE: So why does that bound give you the k-wise? SPEAKER: Sorry. Why does what give you what? AUDIENCE: Proving that bound there, why is it like that? SPEAKER: This? AUDIENCE: Yes. SPEAKER: Oh, because when you look at this jobs to machines business, at the end of the day, everything hinged on bounding this.

[`46:51`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2811) We have a set of k items, and what's the probability that all the items mapped to the same bin? And that's exactly this. So this is item 1. What's the probability that it mapped to that bin? In this case, all the yi's are even the same. So let's just call them all y.

[`47:08`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2828) What's the probability that the first item mapped to y, the second item mapped to y, all of them mapped to y? So we won't get 1 over n to the k, but we'll get something close. And then that's good enough to give the same answer. Yeah.

[`47:23`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2843) AUDIENCE: I'm not sure if this works, but would it be possible to repeatedly apply the hash function until you get something less than m? SPEAKER: Oh, when you say repeatedly apply it-- AUDIENCE: Like to the result of the hash function. But you might potentially need some extra to avoid-- I'm just thinking.

[`47:48`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2868) I mean, so the way I'm thinking about this is, this is essentially the same as you generate a random number, but you really want a random number from 0 to m. So when you want a random number from 0 to m, what we usually do is you generate a new random number and do that until you get-- SPEAKER: Oh, like rejection sampling.

[`48:05`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2885) AUDIENCE: Yeah, rejection sampling. So what I was thinking is, if you have something to hide, well, you still want the deterministic-- you still want something deterministic. Can you just feed it back in the hash, and with some probability, you get something good enough?

[`48:21`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2901) SPEAKER: Yeah, I guess. I mean, if p is way bigger than m-- well, first of all, there are n different hash values that you're interested in. So I mean, are you going to reject if any of them messes up? And if so, that's probably pretty likely to happen.

[`48:36`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2916) So you'll be rejected-- you'll be spending a lot of time. AUDIENCE: I'm not sure if-- isn't it sufficient if you just reject one of them? SPEAKER: But then you pick fresh ai's just for that one? The same ai's are being used for everyone, and the goal--

[`48:53`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2933) and the plan-- the reason we're doing this is because we want to reduce, say, the amount of space it takes to store this hash function. So if you're storing different h's for different x's, then you're losing out on that.

[`49:06`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2946) AUDIENCE: That was what I was thinking, actually, was whatever you get out of h, like feed it back into h, then it should be increasingly more likely to be an m unless if you-- because if you pick-- SPEAKER: Whatever you get out of h, feed it back into h. AUDIENCE: So unless you hit a fixed point in your hash function or cycle, it should be more likely to get less than m.

[`49:37`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2977) And you still have a deterministic abstraction without having to reject the hash function. AUDIENCE: Why is it always going to be more likely u? SPEAKER: But I don't know how to-- AUDIENCE: It's just my mistake. Never mind. SPEAKER: I'm not sure.

[`49:53`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=2993) So actually, one thing that I also wanted to say is, I said it might not even be obvious that there are k-wise independent hash families which are not just all functions. I mean, what do I want to say? It's not clear that, say, you could get a two-wise family or a three-wise family, et cetera, which isn't just independent.

[`50:12`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3012) So why are these random variables not independent random variables? Why is this only k-wise independent and not fully independent? If you pick a random h like this, and you write down h of 0, h of 1, et cetera, why are these not fully independent random variables?

[`50:40`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3040) AUDIENCE: If you pick the first k, then the next one is determined. SPEAKER: If you pick any k, the next one is determined, again, by polynomial interpolation. Good. So that's all I want to say about k-wise independence. So let me now start talking a little about the dictionary problem.

[`51:09`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3069) So the dictionary problem-- oh, and I meant to say this at the beginning of class, but P Set 1 is up. It's been up since Friday, and it's due Monday at 11:59 PM. So I've had bad experiences with P sets due in the morning and then people don't sleep, so.

[`51:37`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3097) Dictionary problem. So here, I think I mentioned this when we were looking at Vendermonde-Boas last week. And I just stated that there is a solution. I didn't say how you do it. So this is a data structural problem. So there is update.

[`52:05`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3125) There are two operations, update, k, v, associates, let's say, key k with value v. And imagine that these are both in your universe. k and v are in your universe. And then there's query. Return x, return v associated with K. Return the value that's associated with this key or query k, or if there is nothing associated with it, you report there's nothing associated with it.

[`53:14`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3194) And I covered this in 124. I'm not going to-- I'll say it again. I'm not going to go through the analysis again. If you want to read more details, I'll augment the notes to include links to what you can read. So how can you solve the dictionary problem?

[`53:39`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3219) There's the dynamic and there's the static dictionary problem. So dynamic dictionary, let's say. You can do hash tables with chaining. And the basic idea there is you have your n items. Well, actually, let me not write it like that. So there's no n here, as I said it.

[`54:22`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3262) So we have an array. Let me call this array A that's of size m. And each element of the array is actually a pointer to a linked list, let's say, a doubly linked list. And each element in this linked list is a key and a value. And what you do is when you see-- when you do an update, and when you pick, you also pick h from this family or from a two-wise family.

[`55:34`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3334) And k maps to h of k. So the basic idea is you initiate this array A-- so you initiate you initiate this array A of size m minus 1, initially, all the linked lists are just empty. So these are all null pointers. And when you see a key k, you hash it using h.

[`56:09`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3369) h is drawn in the beginning at random from a two-wise family. You hash it, and then you look through the linked list to see if k appears in that linked list. If it does, then you change its value. So let's say that this is your k, you just change its value.

[`56:30`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3390) If it's not here, then you append it to the end of the linked list with its new value. And a query is similar. So if someone queries k, you hash k, you look in that linked list. And you look to see where k appears, and then you output the associated value.

[`56:56`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3416) So what's the running time of an update or of a query? I mean, don't tell me in terms of-- don't give me the final answer, but just say something sort of-- what's that word? When you say something vacuously true, what's that called again? AUDIENCE: [INAUDIBLE] SPEAKER: Yeah, tell me something like that.

[`57:31`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3451) Good. So what's the running time of an operation? Yeah. AUDIENCE: It's the length of the linked list. SPEAKER: Yeah, it's the length of the linked list that you map to, which is a random variable because h is random.

[`57:46`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3466) So runtime of an operation is length of linked list at h of k and can show the expectation over h of the length of this list at hk is a constant. So this gets expected constant time operations, of course, if, let's say, m is at least n.

[`58:39`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3519) I mean, m has to be something for this to be true. You can't just have an array of size 1, and everyone's in the same linked list. So I'm not going to do the analysis, but I'll put links to things. And also, I'll give a link to perfect hashing.

[`59:13`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3553) I'll give a link. But now I want to do linear probing. So this is called hashing with chaining. That's one way to do dynamic dictionary. But there's a way that's very popular, which is called linear probing. And the reason it's popular is because it's very cache-friendly.

[`59:36`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3576) So I'll tell you the scheme. So in terms of-- you're not going to beat O of 1 time. So that's not how it's better, but this is better on real machines because of prefetching, I guess. Are people familiar with prefetching? I'm not an expert in this, but from what I do know, prefetching is the following architectural trick.

[`1:00:04`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3604) So in your computer, there's memory, there's cache, there's disk, et cetera. And whenever there's a cache miss and your system has to go and fetch that from memory and put it in cache or fetch something from disk and put it in memory, it also tries to grab things that it thinks that you probably will also look at next.

[`1:00:31`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3631) And one good guess at what you look at-- what you look at next is the next few elements in memory, like the next consecutive few elements in memory, because if you're looping over an array or something, you're going to look at those next. So prefetching means your machine will actually grab those things before you even look at them and then put them in cache for you.

[`1:00:51`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3651) And then when you look at them, oh, they're already in cache now. I don't have a cache miss. So sequential accesses are very fast because of things like prefetching. So in real architectures, sequential accesses are much faster. It implies linear probing is good. What's linear probing?

[`1:01:27`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3687) So linear probing, let me write that array A. And I have a hash function h. I'm not going to say what kind of family it's drawn from yet. It maps 1 to u into-- maps the universe into elements of this array. The idea is as follows.

[`1:01:59`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3719) I'd like to just store-- I'd like to store the value of k in h of k. So let's say, this is h of k. I'd like to just store the value there. But the problem which we had to solve with chaining is that there can be collisions.

[`1:02:16`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3736) Other people might also hash there. So what do I do in linear probing? If this is full, then I just keep walking until it's empty. So I'll store the key in the value there. That's linear probing. So first, you hash it, and then you keep walking sequentially until you find an empty spot, and you put it there.

[`1:03:03`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3783) So I think linear probing was invented by-- it was first suggested by some folks in the '50s. I don't know the actual journal or anything, but Samuel, Amdahl, and Boehme in, what, '54. But this was-- that's a while ago. They didn't prove anything about it.

[`1:03:51`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3831) They just suggested that it as something to do. And it was first analyzed by Don Knuth in 1963, assuming h is totally random. So script h is the family of all functions. It's the same thing as saying that it's totally random. In fact, he showed that if you choose m, if you choose m to be something like 1 plus epsilon times n.

[`1:04:36`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3876) Then he showed that the expected time per operation is 1 over epsilon squared. Oh, and then let me say more, one more reference. So there's a big breakthrough, I guess, in 07, but the journal version was in '09. So that h being just 5y is independent implies expected time is constant.

[`1:05:55`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=3955) We're here like m is at least some constant times n. And one more reference, Patrascu and Thorup in 2010. So they wrote a lot of papers together. So let me say, ICALP 2010. Four-wise independence doesn't guarantee O of 1 time.

[`1:06:40`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4000) So they constructed a family script h, a four-wise independent family, such that if you did linear probing where your hash function was drawn from that four-wise family, then your expected time would be about log n, not constant. But with any five-wise family, it's constant.

[`1:07:03`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4023) So now this doesn't mean that-- just to be clear, it doesn't mean that four-wise independence-- any four-wise family doesn't-- it doesn't mean that for all four-wise families, you don't get constant. It means that there exists one four-wise family which doesn't work.

[`1:07:24`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4044) In particular, I guess we'll probably see it in next lecture just because we're running out of time, there is a family that's not four-wise independent-- it's not even four-wise, it's only three-wise independent, but it still works very well for linear probing because it has some other properties.

[`1:07:44`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4064) Good. So let me think about what I want to say. So I want to analyze linear probing. It looks a little weird why does five come about. And I'll just say it in words before we do it. The reason five comes about-- actually, when I saw this, I asked Patrascu why five-wise.

[`1:08:11`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4091) And he said, well, when you condition on one element where it lands, everything else is four-wise. So that was his answer. But you'll see what meant very soon. In fact, there's a slightly simpler proof, which I think I'll do first, that shows that seven-wise works.

[`1:08:34`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4114) And it's, again, the same reason. If you condition on one, everything else is six-wise. So claim, if m is at least some constant times n, and h is seven-wise independent, then the expected, let's say, query time, which is the same as update time because I mean, it's the same procedure basically, is a constant.

[`1:09:16`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4156) And this is the same-- basically, the way I'm going to do this, I don't think it's actually in this paper. They just don't show the five-wise. But I saw some lecture by one of these Peis, Rasmus Pei. And he showed first the seven-wise thing. I think it's a good warm up before you get into five-wise.

[`1:09:47`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4187) So as you can imagine from this picture, it's all about these runs. So what do I do? I hash k, and then I run over a few entries, and then I'm done. Let me stop calling it k, and let me start calling it x. Otherwise, I'll confuse myself later.

[`1:10:12`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4212) So I hash x, and then I keep going until there's an empty spot, and I'm done. So the question is, how many non-empty spots do I have to touch before I find the empty one? And in fact, the way we're going to prove this claim

[`1:10:32`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4232) is we're going to say, well, first, we're going to say that basically this thing is the length of that run-- the expected length of that run is going to be a constant, as you might imagine. Good. So lemma-- well, before the lemma, let me give you a definition.

[`1:11:07`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4267) Definition, given an interval I of cells in this array A, I'm going to define L of I as being the number of items that hash to I. The size of the set I, such that h of i is in L. And then also a definition, I is full if L of I is at least the size of I.

[`1:12:08`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4328) So if we have some interval of length k, we say it's full of at least k things hash there. Question or anything? AUDIENCE: What's the L? SPEAKER: Oh, I defined it. So this is this thing. By definition, L of I is-- AUDIENCE: h of i is not-- SPEAKER: Oh, yeah, yeah.

[`1:13:02`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4382) Sorry. AUDIENCE: So h is defined as just the hash function and not the function that you get by it? And that's not even a function. SPEAKER: Wait, the little h or-- AUDIENCE: The little h. SPEAKER: Little h is a function that maps the universe into 0 up to m minus 1.

[`1:13:26`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4406) Does that answer anything? AUDIENCE: Yeah. SPEAKER: Any other questions? Good. So what was I going to say? Good. So lemma, if some query on X makes K probes, then h of x is in some full interval of length K. Proof.

[`1:14:30`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4470) So let's say, this is h of K, h of x. And it's occupied. So it's occupied. The person who's occupying it came from somewhere in the past. I mean, he might have come from here itself. I mean, he might have hatched here himself, or he hatched somewhere in the past and then had to walk forward.

[`1:15:08`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4508) But the point is, he walked from somewhere. And the fact that he walked there means all these things are taken. And then now h of x is going to walk forward a little bit and eventually go here. This h of x is final destination. So that must all have been full.

[`1:15:38`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4538) And what I'm telling you is that this thing here, this thing here has length K. You probed K things. Now, remember that the definition of full interval is that all the items had to actually hash to the interval, not wind up in the interval.

[`1:15:59`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4559) That's the difference. But the point is, all these locations are full. And they were all originally hashed to somewhere here or later. So one of these windows is full. I mean, I think that's the definition of handwaving. I literally just-- I was like this.

[`1:16:34`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4594) AUDIENCE: But it is not necessary that this window will contain [INAUDIBLE]. SPEAKER: Oh, I see what you mean. You mean this could be way in the past. AUDIENCE: It's like a lot of items were affected. SPEAKER: Oh, I see what you mean. AUDIENCE: Are we exchanging items?

[`1:16:56`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4616) SPEAKER: I'm sorry? AUDIENCE: Our items are unique in this case. Otherwise, it doesn't work. SPEAKER: No, no, the keys are unique. AUDIENCE: You have to do the keys. SPEAKER: The keys are unique. That's true. Whoa, actually, that's a very good point. You're saying, this could be way in the past, and everybody hashed there.

[`1:17:13`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4633) So that's not-- AUDIENCE: I think that is of length at least L. SPEAKER: Of length at least K. Oh, yeah. Phew. I think that fixes it. Now, are you happy? Sorry. So then, the expected time-- the expected time, let me say, it's a query x. Yeah.

[`1:18:05`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4685) AUDIENCE: So our interval is allowed to wrap around the end of this thing? SPEAKER: Yeah. AUDIENCE: So when you say it lies in an interval, it could be that-- everything could have-- SPEAKER: Intervals could wrap around, too. Intervals also wrap around. That's a good question.

[`1:18:34`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4714) The expected time to query x is, say, by that lemma is, at most, the expected number of full intervals containing x. There you go, which is equal to the sum over K. It's, at most, the sum from K goes from 1 to infinity of--

[`1:19:23`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4763) so how many-- and the sum over all intervals I, intervals I, where I has length exactly K, and h of K is an I of the probability that I is full. Huh? Oh, yeah. AUDIENCE: By the way, those are equal. SPEAKER: Well, K can-- yeah, sure.

[`1:20:10`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4810) This thing, you mean? AUDIENCE: Yeah. SPEAKER: I think they are equal. And how many intervals of length K are there that contain h of x? There are K of them. So this is at most-- now this is at most K from 1 to infinity. There are K of them, K times the max over I of length K, that h of X is in I of the probability that I is full.

[`1:20:49`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4849) You still look troubled. AUDIENCE: Yeah, because we're only allowed to be at least K now instead of [INAUDIBLE]. Oh, wait, wait, that's K. SPEAKER: Are you still troubled? Maybe I should be troubled, I don't know. I mean, so what do we really need to show? Ultimately, we want this whole thing to be O of 1.

[`1:21:29`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4889) So there's really one thing I see that could help us here, which is to show that this thing here is, let's say, O of 1 over K cubed. If this were 1 over K cubed, this whole sum would be 1 over sum of K 1 over K squared, which converges, which is a constant.

[`1:21:55`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4915) And then we're going to show that this is true using six-wise independence. And I mean, the reason six-wise comes into play here is, well, 1 is 6 over 2. So let's say here, m is equal to 2n for our linear probing, or maybe I'll need to increase the 2 to something else.

[`1:22:32`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4952) So tell me what's the expectation? So I full means that K things map to this length K interval. But that's not really that likely. How many things do we expect to map there if m is 2n? I should say, what is n? n is like the number of different keys that are active right now that are associated with something.

[`1:23:08`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=4988) So what's the expected number of people that land in this interval of length K? AUDIENCE: 2K over 2. SPEAKER: K over 2. So we're saying that this guy is deviating from its expectation by a factor of 2. So you could handle that, by the way, using Chernoff bounds. Remember we proved Chernoff bounds at the very beginning of the class.

[`1:23:35`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=5015) This is exactly the setup of Chernoff bounds. You could define your random variables from Chernoff as xi being 1 if item I let mapped in that interval and 0 otherwise. And then the sum of the xi is exactly how many people mapped to the interval.

[`1:23:52`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=5032) And then you want to know, is this much larger than its expectation? And there is some decay we proved using the Chernoff-- that was the Chernoff bound. Yeah. AUDIENCE: Does k-wise independence not tell us that the probability for each part is the same? What if there's one interval between the thing that has high probability of a positive thing?

[`1:24:12`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=5052) SPEAKER: Oh, right. So let me say it's k-wise independent. And furthermore, it's almost uniform, which we could get. I think also, when people usually define k-wise independence, they include the almost uniform in the definition, which maybe I should have. This thing we could handle using Chernoff bounds.

[`1:24:42`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=5082) So the probability basically that I is full is, at most, probability that L of I minus the expectation of L of I is bigger than 1/2 the expectation of L of I, something like that, or bigger than K over 2, which is 1/2 the expectation of-- yeah.

[`1:25:13`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=5113) Do people see what I'm saying here? That's K over 2, so we had to deviate from our expectation by-- oh, by the expectation itself. So the expectation is K over 2, and we're K. So we deviated from the expectation by K over 2. And we could use turnoff but needs independence.

[`1:25:47`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=5147) So let me just write what we'll do next time, and then we'll leave because we're basically out of time. So next time, we're going to-- remember I told you how you start the proof of turnoff. You do some function on both sides of the inequality, and you do Markov.

[`1:26:06`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=5166) So we're going to do the same thing there. So the probability that the expectation of L-- the probability that LI minus its expectation is bigger than the expectation, well, that's the same thing as if you raised both sides to the sixth power. And that's, at most, by Markov.

[`1:26:40`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=5200) This thing here remember is K over 2. That's K over 2 to the minus 6 times the expectation of LI minus expectation of LI to the sixth. This is Markov. And then you bound that, and you get that this thing is going to be 1 over K cubed when you do it. So next time, I don't know if it's really worth doing this computation on the board.

[`1:27:17`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=5237) I mean, expanding something to the sixth power is just pointless. You can believe it. Maybe I'll just do one term of the expansion just to show you that it's meaningless. But this idea of raising things to large powers and then doing Markov is called the moment method, and it's something you should be aware of.

[`1:27:39`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=5259) And it makes some intuitive sense why you would do it. And the reason is-- it all boils down to the expectation of this thing. And if this random variable, if the random variable is very concentrated about its mean, then taking it to a large power is not so bad.

[`1:28:02`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=5282) But if it's not very concentrated, if there's a big chance of it being far away, then taking it to a large power kills you. So this behaves well for concentrated random variables. So if you think your thing is concentrated,

[`1:28:13`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=5293) you take a large moment, and then you compute it, and then you hope that it will show you, yes, I am concentrated. I don't know if that was too vague, but it's good to be aware of this moment method. In fact, you can even prove the Chernoff bound by the moment method.

[`1:28:30`](https://www.youtube.com/watch?v=WqBc0ZCU4Uw&t=5310) You just take this 6 to be something very large, but maybe that'll be an exercise, I don't know. So that's how we did.
