# Advanced Algorithms (COMPSCI 224), Lecture 17

*Harvard University · 1:26:44 · https://www.youtube.com/watch?v=PPCnYiTpbCo*

[`0:04`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4) SPEAKER 1: Hmm? yeah. Hello. AUDIENCE: Hey. SPEAKER 1: I'm not sure exactly where people are. I guess I'll wait one more minute. [SIDE CONVERSATION] Is there some event today here? Oh, let me make sure. [SIDE CONVERSATION] OK, well-- [SIDE CONVERSATION] I guess I'll just get started.

[`1:05`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=65) So today, I promised you we're going to cover interior point. So this is-- oh, are you today's scribe? OK, good. Let me-- SPEAKER 2: All right, go ahead. SPEAKER 1: Oh, no problem. OK, so I just started like five seconds ago. SPEAKER 2: Awesome.

[`1:35`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=95) SPEAKER 1: So today, we're covering the interior point method. And this is a method for solving convex programs. But we're just going to look at it for linear programming. And I think I mentioned last time at the end of last lecture, this is introduced as a method for solving LPs by Karmarkar.

[`2:36`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=156) This is Combinatorica 84, so Combinatorica. OK, and I said some very vague things last time. So let me just remind you of the vague outline. Our setup is we want to minimize c transpose x subject to Ax is at least b, where this is coordinate-wise. A is-- let's say it's an m by n matrix.

[`3:18`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=198) And b-- and b is-- well, b has to now be in Rm, and x is an Rn. So the basic idea of an interior point method. And I'm going to keep abbreviating the interior point method as IPM. The basic idea is minimize f of lambda of x, which I'll define to be lambda times c transpose x plus some barrier function.

[`4:14`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=254) Let's call it p of-- I'll say what this is in a second-- p of s of x, where s of xi is the slack ai dot x minus bi. So for any feasible solution x, we have the I-th row of A. Let's call it Ai. Ai dot x is at least bi.

[`4:44`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=284) So ai dot x minus bi is some non-negative real for any feasible x. And the vector of all of these differences is called the slack vector. OK, I'm calling it the slack vector. And where-- so s is defined as this, and p of s of x goes to infinity if any s of xi goes to 0.

[`5:16`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=316) So the point is that if any of the s of xi's are 0, that means you write up on the boundary of the feasible region. And by penalizing the objective function in terms of this barrier-- this p is called a barrier function because it keeps you away from-- it's a barrier preventing you from getting too close to the boundary, basically.

[`5:39`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=339) By penalizing with this barrier function, you're ensuring that the optimal x for this is not too close to the boundary. So it stays well in the interior of the feasible region. And that's why it's called an interior point method. You basically keep track of points interior in the feasible region.

[`6:00`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=360) And the point is, as lambda goes to 0, basically C doesn't matter. And the optimizer-- let me call it x lambda. So this is the optimal solution for this f of lambda, the minimizer. This goes to what's called the analytic center of the feasible region.

[`6:35`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=395) The feasible region-- let's call it P, which is the set of all points x such that Ax is at least b. Meanwhile, as x goes to infinity or lambda goes to infinity, x of lambda goes to x star, where x star is the minimizer.

[`7:09`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=429) OK, and I'm not going to spend too much time on this, but you can assume that if this thing is feasible and bounded that the minimizer is a unique vertex. There's only one vertex, which achieves the minimum. The basic idea to ensure that is-- so we discussed earlier that there's some precision that this LP obeys.

[`7:30`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=450) Like, all the entries have L bits of precision or some such thing. What you can do is you can create a new cost vector, where you just add random noise at the 10l bit of precision and beyond. So that random noise will ensure that there's a unique vertex that's optimal once you randomly perturb this cost vector.

[`7:52`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=472) So I don't want to get into precision issues, but there are standard tricks that ensure that the vertex which achieves the minimum is unique. OK. I'll put a link in the notes to some of these because there are too many such minor tricks that I don't want to get into.

[`8:12`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=492) OK. OK, good. So to actually implement this basic idea, well, I mean, who says that-- who says that we can solve this problem either? I mean, so what are we going to do? So the vague outline of the algorithm will look as follows. Step 1, let me call this-- this is our LP.

[`8:48`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=528) Modify LP to LP prime such that LP prime trivially has some trivial interior point. OK, 2, show that if the LP is bounded and feasible, then we can read off, basically, the optimal solution to LP from the optimal solution to the LP prime. OK, so now we have this LP prime that we're trying to minimize instead.

[`10:01`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=601) What do we do there? So let's say x prime is initial interior point for LP prime. Everything I'm writing, by the way, here is the vague outline. So I will start being a little more specific right after I write this. So let's say we have some initial interior point for LP prime.

[`10:40`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=640) I didn't tell you how we do this modification, but I'll tell you later how we do this. But let's say that there is some LP prime that it suffices to minimize that instead, to optimize that instead. So then we'll-- step 4, from x prime, obtain x tilde lambda 0, which approximately minimizes f of lambda 0.

[`11:30`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=690) And then the main work then happens here. So this is all initialization. Steps 1 through 4 are all initialization. Now finally, step 5, while k is smaller than some threshold, which we'll see in the analysis, use x tilde of lambda k as an approximate solution to f lambda k plus 1.

[`12:13`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=733) So lambda k plus 1 is going to be something slightly bigger than lambda k. And then iteratively refine to get an even better solution for f lambda k plus 1 using some iterative algorithm, like Newton's method. And I'll tell you more about that throughout the lecture. And then increment k, and continue the loop.

[`13:08`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=788) So somehow, from an interior point, we're going to get an approximate minimizer for lambda 0 being something very small. When lambda 0 is something very small, we basically don't care about the cost function at all. We just want to find something that's well inside of the-- well inside of the feasible region.

[`13:28`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=808) And then, from lambda 0, we're going to just very slightly-- you're going to see by how much but very slightly increment lambda 0 to get lambda 1. And we're going to use this thing, this approximate minimizer of lambda 0, as a starting point for an approximate minimizer of f lambda 1.

[`13:47`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=827) So the point is, if we didn't increment lambda by much, if lambda 1 is very, very close to lambda 0 but slightly bigger, then, by some continuity argument, an approximate minimizer for f lambda 0 will still be an approximate minimizer for f lambda 1, not as good an approximate solution, but still some level of approximation.

[`14:09`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=849) And then we can apply some iterative algorithm to gradually refine it and make it a better approximate solution to f lambda 1. And then that will give us x tilde lambda 1. And then we go back to the loop, and we use that as an approximate minimizer for f lambda 2.

[`14:22`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=862) And then we keep iterating until finally, lambda k is big enough. And once lambda k is big enough, then this becomes the dominant term in the sum, not the barrier function. And then you can show that once lambda is big enough, an optimizer for this function basically can be easily rounded to an optimal solution for the original LP.

[`14:47`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=887) Is there a question? OK. So everything I've said has been the vague outline. I have to somehow make this more precise. But are there questions about at least strategy? [SIDE CONVERSATION] OK. OK, so this is the order the algorithm does things in. But this is not the order I'm going to explain things in.

[`15:22`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=922) So I'm going to assume that we already have completed step 4. We already have something that approximately minimizes f of lambda 0. And then I want to talk about how to do this step 5. And also, when do we finish? And then once I explain that, I'll go back and talk about how to actually implement steps 1 through 4.

[`15:47`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=947) [SIDE CONVERSATION] Very good. OK, so we'll come back to steps 1 through 4 later, so let's go to step 5. So we'll see this when we actually do steps 1 through 4. But lambda 0 will be something that's exponentially small in the precision.

[`16:37`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=997) So just a reminder, I think I mentioned this last time, but L is something like the max of log of b infinity and log of the maximum determinant of a submatrix, as well as log of c infinity. What is this term? So you remember from when we were looking at the simplex algorithm, vertices are specified by solving linear systems on submatrices of A.

[`17:23`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1043) So how much precision do you need to-- so you basically have to invert some matrix, and then that gives you your answer. You invert a matrix and multiply it by the right-hand side to get a vertex. OK, and the number of bits of precision involved in inverting that matrix is proportional to the logarithm of the determinant of that matrix.

[`17:47`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1067) So detmax is the maximum over all submatrices of the logarithm, of the determinant of the submatrix in magnitude. So just think of this as precision. So somehow, in steps 1 through 4, we're going to end up with an approximate solution-- approximate minimizer of f lambda 0, where lambda 0 is really tiny.

[`18:16`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1096) And now we ask ourselves, for what lambda k can we stop? Well, OK. So for this, basically, we can stop when, let's say, c transpose of x star-- of x lambda, sorry, minus c transpose of x star. So c transpose x star is the true minimum.

[`19:11`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1151) c transpose of x lambda is, what is-- if we used x lambda as a solution to the actual LP, as opposed to this modified penalized function, then what would our cost be? Once this is less than, let's say, epsilon, then epsilon is also going to be something that's exponentially small in the precision.

[`19:32`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1172) OK, so I'll put details in the notes for this. I don't want to really get into precision issues. But the point is once the difference in cost is really, really tiny, like this, then you can easily round this thing to the closest vertex and get the actual vertex that achieves the minimum for the LP.

[`19:53`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1193) OK, so if you're not comfortable with that, then let's just say that you're not actually going to solve the LP. You're going to minimize it up to some very, very small error. OK, so we can stop when this is the case. Well, I want to understand, when is that going to happen?

[`20:10`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1210) How big does lambda have to be? So one observation is that this function-- this is now calculus. So f lambda for lambda equals 0 is strictly convex as a function of the x's, from R to R. So there is a unique minimizer, x of lambda, and the gradient of f sub lambda of x lambda will be 0.

[`21:11`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1271) So the minimizer of this function f of lambda is the x, which makes the gradient 0. So if people are forgetting their multivariate calculus, hopefully people at least remember, in univariate calculus, you want to set the derivative to 0. So Just think like that.

[`21:30`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1290) OK, good. So we know that 0 is-- oh, and let me write actually what the gradient is. The gradient-- if you calculate the gradient of f lambda-- oh, I didn't actually tell you what barrier function we're going to use. Did I not tell you?

[`21:52`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1312) So the barrier function we're going to use-- let me just write this here. We're going to use minus the sum i goes from 1 to M of log of s of xi. I mean, the reason we're using this is because it has certain nice properties that will make your analysis work.

[`22:22`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1342) But it does at least fit what I said. So if any of the slacks go to 0, then log of 0 is minus infinity. And there's a minus sign out there, which makes it infinity. So this function does go to infinity as any slack goes to 0, which means you're approaching the boundary.

[`22:45`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1365) OK, good. So now that we have an explicit function written there, we can compute the gradient explicitly. And the gradient is equal to lambda c minus A transpose S of x-- let's say at the point x is Sx inverse e, where e is just the all 1's vector.

[`23:23`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1403) Actually, let me just use all 1's. So the all 1's vector is-- well, it's the all 1's vector. And S of x, this is the slack matrix at x, which is-- this has the slack on the diagonals-- S of x1, S of xm, so diagonal matrix. So the inverse is just 1 over the slack, so on the diagonal.

[`23:55`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1435) And notice that if x is not up on the boundary, if it's in the interior, none of these slacks are 0. So that actually has an inverse. OK good. So what do we have here? So we have that, well, 0 is equal to definitely 0 dotted with x lambda minus x star.

[`24:37`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1477) And then, now I will replace this 0 with the gradient at x of lambda because the gradient of x of lambda is 0. And this is equal to the gradient at f sub lambda x lambda dotted with x lambda minus x star. And then now let me just write explicitly what that gradient is.

[`25:02`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1502) We said that gradient is lambda c minus A transpose Sx inverse the all 1's vector, x lambda minus x star. And just remember that all of this is equal to 0, which implies that lambda c transpose x of lambda minus x star is equal to-- so I just want to say that-- so you have two terms here.

[`26:10`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1570) You have lambda c transpose times this thing, and then you also have this vector dotted with this thing. So this thing is equal to the all 1's vector transpose Sx inverse A x lambda minus x star. OK, so tell me, though, what is A of x lambda minus A of x star in terms of slacks anyway?

[`27:08`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1628) So of x lambda minus b, that's the definition of the slack vector for x of lambda. A times x star minus b, that's the definition of the slack vector for x star. So when you take the difference between them, the b's cancel. So this is just equal to 1 transpose Sx inverse.

[`27:37`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1657) And then now let's just use little s for the actual vector of slacks, little s of x lambda minus little s of x star. OK. But then this thing, this dot product, we're taking the all 1's vector dotted with this vector. So this is some diagonal matrix, where each diagonal entry is 1 over the slack in some coordinate.

[`28:13`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1693) So this thing is equal to the sum I going from 1 to m of s of x-- this is all s of x lambda. This is the gradient at x lambda, so this is the slack vector at x lambda.

[`28:38`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1718) So this is the sum of s of x lambda sub i minus s of x star sub i over the slack of x of x lambda sub i-- sub i. Yeah, are people with me? OK, and then now we'll use, I guess, the only inequality here, which is, what's the only thing basically you can tell me about s of x star?

[`29:19`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1759) What's the only thing you can tell me about any slack vector? It's non-negative. So this is certainly, at most, the sum over i of s of x lambda i over s of x lambda i, which is just m. Yeah?

[`29:42`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1782) So overall, this is exactly what we wanted. We wanted to understand c transpose of x of lambda minus c transpose of x star. So this implies that c transpose of x lambda minus c transpose of x star is, at most, m over lambda. Good.

[`30:30`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1830) So what is this telling us? This tells us that once lambda is at least, say, m over epsilon-- and remember epsilon-- I mentioned, if you want to actually round to a vertex, epsilon can be as small as exponential in the precision, exponentially small in the precision.

[`30:52`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1852) So this is roughly exp of CL times m. OK. So that tells us how big lambda needs to be in our step 5 before we can terminate and have a really good solution. That doesn't tell us how many iterations this takes, because I didn't really tell you how much will increment lambda by in each step.

[`31:41`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1901) But we will get there. So we will show that you can take lambda k plus 1 to be something like 1 plus 1 over root m of lambda k. I haven't shown this yet, but we'll show that-- right, what's the constraint in choosing lambda k plus 1?

[`32:15`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1935) The constraint in choosing lambda k plus 1 is we want to make sure that the approximate solution we have for lambda k still is somewhat good for the next function, for f of lambda k plus 1. So when we actually work out that calculation,

[`32:31`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1951) we're going to see that if you don't increment lambda k plus 1 by too much, if you just do it by this small multiplicative factor, then your old solution here will still be a good-- will still be roughly a good solution here. I'm going to show that.

[`32:45`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1965) So just given these two things, how many iterations in this loop do we need to actually terminate? So did I tell you what the original lambda 0 was? I think I did. AUDIENCE: It's exponentially small. SPEAKER 1: Yeah, oh, good. Yeah.

[`33:10`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=1990) So the original lambda 0 is that. So the question is, how many powers of 1 plus 1 over root m do we need to go from that kind of lambda 0 to this kind of lambda 0, m times exponential of CL? AUDIENCE: Log of 1 plus 1 over root [INAUDIBLE] SPEAKER 1: Log-- yeah, so good.

[`33:31`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2011) So yeah. So I want-- give me an answer in terms of log base 2, let's say. So one good heuristic calculation to keep in mind is in general, if you have 1 plus 1 over x to the x, that's roughly e. So if I do this step root m times, it means I've increased lambda by a constant factor.

[`34:04`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2044) Every root m times that I go through this loop, I've increased lambda by a constant factor. And then now I need to go from that value to this value. So that's log base e, let's say, or log base a constant of the ratio.

[`34:20`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2060) So this implies to get from lambda 0 to a big enough lambda suffices to go for, well, root m-- root m steps just to get a constant factor increase in lambda times log of the ratio, which is going to be something like L plus log m iterations. OK, so that's the kind of bound we're going to be getting.

[`35:10`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2110) In fact, I think if you go from paper to paper, people define L slightly differently. So for example, some papers, L is the max of many logs. They also put log n and log M in there, for example, in some papers, in which case, L plus log m is basically L again.

[`35:28`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2128) So you'll often just see the number of iterations written as root m times L. And just a little bit of history before I continue-- so the original IPM for LP due to Karmarkar needed something like O of mL iterations. And this was improved to O of root mL iterations by Renegar-- this was in 1988-- and recently improved to O of O tilde.

[`36:57`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2217) So O tilde is hiding log factors, O tilde of square root rank of A times L. And this was due to Lee and Sidford of-- this was this year, FOCS of-- well, this was not just this year. This was a week ago or two weeks ago or something, I think. Yeah, a week ago.

[`37:27`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2247) This was a week ago. And I think, at some point, I sent an email to this class saying, if you want to see something related to the class, go to this talk. So I'm not going to show you this. I'm going to show you basically this, but I'm going to show you this using, I guess, mostly notation.

[`37:45`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2265) I mean, the notation I'm going to use is heavily borrowed from this paper. In fact, even the way I'm presenting it came from me getting Aaron Sidford and just forcing him to explain everything to me. [CHUCKLES] So thank you, Aaron. OK, good.

[`38:14`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2294) So I want to show you this. And I guess you saw roughly where the sound is coming from, even though I didn't justify why you can do this, for example. Yeah? AUDIENCE: How many steps does it take to actually minimize the f lambda [INAUDIBLE] SPEAKER 1: Oh, good.

[`38:35`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2315) Yeah, so you're saying, that's the number of iterations. But what do we do inside of an iteration? So we're going to see that. But we're not actually going to compute minimizers of f lambda. Where's f lambda? Well, maybe I erased it. We're not actually going to compute minimizer of f lambda.

[`38:52`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2332) We're going to compute approximate minimizers. And the way I'm going to define approximate minimizer, I'm not even-- I mean, it's not going to be-- it shouldn't be obvious at this point how I will even define that, but I will give a definition of it. And I'll show that we can do that.

[`39:08`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2348) So we don't have x of lambda 0. We have x tilde lambda 0, and that's going to stay that way. And in each iteration, basically what we're going to have to do is we're going to have to compute a constant number of solutions to various linear systems So that's what's involved, so linear systems on n by n by n matrices.

[`39:40`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2380) Yeah, good question. Any other questions? Yeah, that is also something that differs from IPM to IPM. So even this vague idea here, so let me say another few words-- so vague idea outlined above is called path-following-- path-following interior point. It's called a path-following interior point method.

[`40:22`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2422) And where that name comes from is we define a curve, lambda x of lambda for all lambda bigger than or equal to 0. So as we increment lambda from 0 to infinity, this traces out a curve. When lambda is equal to 0, we're at what's called the analytic center of the feasible region.

[`40:52`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2452) When lambda is 0, the cost function doesn't matter at all. We're just trying to stay as well inside the boundary as possible. And then as lambda goes to infinity, we arrive at some optimal vertex. And this curve is called the central path, this curve.

[`41:18`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2478) And what path-following interior point methods try to do is they try to start somewhere at the beginning of this curve, and then they try and follow the curve. But let me draw some kind of picture. I'm not great at pictures, but let's say this is the feasible region.

[`41:40`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2500) And let's say we're trying to just minimize, let's say, gravity. Let's say that the cost function points upward, and we're trying to minimize it. So this is the optimal vertex. So the analytic center is somewhere. I don't exactly where it is in this picture, but let's say it's here.

[`41:58`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2518) And there's some curve that goes from there to the optimal vertex. So this is the central path. And what path-following interior point tries to do is it starts-- let's say this corresponds to lambda 0 then lambda 1 then lambda 2, et cetera. And all along the way, we never are actually exactly on this central path.

[`42:34`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2554) But we always try to stay near it. So we have some x tilde lambda 0, which is sort of near the true minimizer of f lambda 0. And then we refine it to get even closer. Well, let's say, we refine it to get even closer. And then now we use that as the approximate solution for this thing, and then we iterate and try to get closer.

[`43:00`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2580) And we just keep staying near the central path. We never quite get on it, but that's roughly what the algorithm does. And this is us. So this is a cartoon picture, but let's-- OK. Right, so not all interior point methods are described in this path-following way.

[`43:35`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2615) But at least, the way I'm going to show you in class, I will show you a path-following version. Questions? So digression into optimization. So before I can tell you how we actually carry out the vague plan, I need to tell you-- I guess I erased up 5.

[`44:23`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2663) I need to tell you once we have a solution that's roughly good at minimizing something, how do we improve the error via some iterative approach? OK, so that gets into the territory of optimization. And I just want to tell you a couple of things that you'll need to know be able to understand how we're actually going to do this.

[`44:43`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2683) And this is going to come to your question of what do we do inside every iteration. So yeah. So we're going to look at iterative procedures for minimizing-- or say for computing x star, which is the argmin over x and Rn of f of x, where f of x-- f maps R and R.

[`45:58`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2758) So first, before I tell you what interior point we'll actually use, I want to tell you something that's kind of a precursor to that. So first order methods, we assume that, first of all, one, there is some oracle that given an x and Rn, it tells us-- that oracle tells us f of x and the gradient of f at x.

[`46:56`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2816) 2, we have some control-- we have some bound given to us on how the Hessian of f can behave. So let me remind you. Remember that the Hessian at any point x is a matrix. It's an n by n matrix, where the ij [INAUDIBLE] del squared of f of xij is equal to d squared del xi del xj of f of x.

[`48:38`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2918) And what I mean by how it can behave is we're were told-- so this is back to 2. In particular, there exists, let's say 0 less than mu less than L such that mu times the identity-- and I'll say what this means in a second--

[`49:13`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2953) actually is at most-- I'll say what this funny squiggle less than or equal to means in a second-- is at most-- the Hessian is, at most, L times the identity for all x in Rn. And when I say that A is, at most, B, I mean that B minus A is positive semidefinite.

[`49:56`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=2996) And if you're not comfortable with what I mean, that's the same thing as saying, for all x, x transpose B minus A, x is at least 0. So really, what this thing is saying is that if you look at this matrix-- so for any x, this is a matrix.

[`50:30`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3030) If you look at this matrix, its largest eigenvalue in magnitude is, at most, L. And its smallest eigenvalue, or the one that's closest to 0, is still at least mu. None of the eigenvalues are too small. So this matrix is somehow well-conditioned. It doesn't have any really big or really small eigenvalues in magnitude.

[`50:56`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3056) Questions? This thing here, this squiggly less than thing is usually called the loner ordering on matrices. Yeah? AUDIENCE: So how would you relate eigenvalues to replace [INAUDIBLE] SPEAKER 1: Oh, so yeah. So OK, good. So I'm not going to get in-- so for this class, you don't need to know it.

[`51:37`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3097) I'm not going to assume you know it. I'll just take it by faith. But the way you do it is by something called the Rayleigh quotient. So the largest eigenvalue is the sup over all x of or the max over all x of x transpose Ax. So right, if you-- I don't know.

[`52:07`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3127) Does that answer your-- AUDIENCE: Yeah. SPEAKER 1: OK. So x transpose LIx is just L times the squared norm of x. So sorry, when I said it's the max over all x of x transpose Ax, that's where x has unit norm. You, otherwise, have to normalize by the square norm of x.

[`52:29`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3149) You have to normalize by x transpose x. So if x is unit norm, the max of x transpose LIx is just L times the squared norm of x, which is just L if x has unit norm. Whereas here, it's, at most, x transpose times the largest eigenvalue.

[`52:50`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3170) It's, at most, the largest eigenvalue times x transpose x, which is the largest eigenvalue, which is at the largest eigenvalue. So that says the largest eigenvalue is, at most, L. Yeah. Maybe I'll put some pointers in the notes to more on-- more linear algebra stuff.

[`53:21`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3201) Are there any other-- I don't know. Did I answer your question sort of? Or-- OK. Yeah, but at least, for what I'm going to say from now on, you won't need to understand the proof of that to appreciate what I'll say, I hope.

[`53:36`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3216) But interrupt me if that's not the case. Any other questions? OK, so what do iterative methods do for minimizing f of x? What do they do? So start with some x0 in Rn. Iteratively compute xk plus 1 from xk via some update rule. And then stop after some number of iterations.

[`55:08`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3308) All right, so the thing that we'd like to understand is, how well does iterating help us? We would like to find an update rule such that, let's say, if you look at f of xk minus-- f of xk plus 1 minus f of x star, this is, at most, let's say, alpha times f of x 0 minus f of x star, where alpha is small.

[`56:38`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3398) AUDIENCE: So alpha doesn't depend on beta? SPEAKER 1: Oh, this should have been xk. Yeah. Right, so yeah. So the point is, as you said, just by induction, this means that if you go from, say, x0 and iterate k times and get xk, then you've gone from-- you've multiplied your error by alpha to the k.

[`57:03`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3423) And if alpha is less than 1, it means you're exponentially decaying your error. OK, so that's the goal of first order methods, and you should do this in the update rule. Your update rule is only allowed to depend on f of x and lambda and then the gradient of f of x because that's all your oracle gives you.

[`57:26`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3446) And in your analysis, you're allowed to use the fact that you have control of the Hessian. But the oracle doesn't let you compute the Hessian. If you could compute the Hessian, that would be called a second-order method. So k-th order, I think, means you have information about k-th order partial derivatives.

[`57:44`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3464) AUDIENCE: Do you always have a bound on one higher order? SPEAKER 1: Sorry, say it again? AUDIENCE: Do you always have a bound-- SPEAKER 1: Oh, no. So actually, the thing that interior point will use-- it will use a second-order method. And we won't assume control on the third-order partial derivatives.

[`58:02`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3482) We'll assume some other kind of control, which I'll state when we get there. AUDIENCE: So from what I know of Newton's method, it normally just uses the gradient but achieves second order. SPEAKER 1: It just-- right. So actually, I'm going to look at-- I'm going to tell you about Newton's method soon.

[`58:24`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3504) AUDIENCE: OK. SPEAKER 1: But it's not going to be a pure first-order method in the sense that we will actually need access to the Hessian. Like, the update rule will depend on the Hessian. AUDIENCE: OK. SPEAKER 1: Yeah. OK.

[`58:42`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3522) But there is a first-order rule, which just needs information about the gradient. And it's called gradient descent. So I'll tell you about that soon. So one such update rule, which is a first-order method, is gradient descent. So let me just tell you what that is. So who here has heard of gradient descent, just out of curiosity?

[`59:49`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3589) OK. Who here has seen it actually analyzed rigorously with proofs of convergence and things like that? OK, well, definitely not as many. OK, good. So you'll see some analysis now. In particular, when you have that kind of control, you can give some kind of bound.

[`1:00:08`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3608) So gradient descent. OK, so before I tell you what the update rule actually is, suppose we have some x0 and x1 that are 2 points in Rn. And define xt to be equal to x0 plus t. This should probably be-- yeah, x0 plus t times x1 minus x0.

[`1:01:06`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3666) So in particular, x0 is x0, and x1 is x1. So I'm not going to prove this. This follows from Taylor's theorem with an explicit remainder. If you want to see a proof, it should be in pretty much any calculus book, f of x1. So the first two terms in the Taylor expansion are f of x0 plus the gradient at f of x0 dotted with x1 minus x0.

[`1:01:44`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3704) OK, so those are the two first terms-- the first two terms in the Taylor expansion of f of x1. And then there's an error term. And you can write this error term explicitly in some funny form. And if you write Taylor's theorem with remainder,

[`1:02:02`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3722) this error term looks like the integral from 0 to 1, the integral from 0 to t of x1 minus x0 times the Hessian at some x alpha x1 minus x0 d alpha dt. OK, so just to recap, just take it by faith that this thing here-- or look at the notes later once I'll insert something for linear algebra.

[`1:02:55`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3775) This second inequality here, this linear ordering inequality means that the largest singular value of this matrix is, at most, L. What does that tell you about any one of these dot products? So this is a dot product between x1 minus x0 and the Hessian times x1 minus x0.

[`1:03:22`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3802) AUDIENCE: Most L times the norm squares. SPEAKER 1: Yeah, exactly. So this thing is, at most, L times x1 minus x0 l2 norm squared. OK, good. So what we have is that f of x1 is, at most, f of x0

[`1:03:48`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3828) plus the gradient at f of x0 dotted with x1 minus x0 plus L over 2, because now we need to integrate-- we need to integrate this expression from alpha going from 0 to t and from t going from 0 to 1. This doesn't depend on alpha at all.

[`1:04:14`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3854) So when you integrate alpha from 0 to t, you just get t. And when you integrate t, you get t squared over 2. That's going from 0 to 1. That's 1/2. So this is L over 2 times x1 minus x0 l2 norm squared. So now let me tell you what gradient descent does.

[`1:04:42`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3882) What's the update rule? Given some iterate-- let me call this inequality inequality star. Given some iterate x0, gradient descent updates to x1, which minimizes the upper bound. It minimizes the right-hand side of the star. And you can show just using calculus that this minimizer is x1 is equal to x0 minus 1 over 2L times the gradient of f of x0 l2 norm squared.

[`1:05:53`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3953) Questions? AUDIENCE: x0 is a vector, right? SPEAKER 1: Yeah, x0 is a vector. AUDIENCE: You still have to scale it. SPEAKER 1: Oh, that is a very good point. That is not what I mean. And the upper bound that you'll get--

[`1:06:26`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=3986) and this will imply that if you just plug this into the right-hand side there, that will imply that f of x1 is, at most, f of x minus 0 minus 1 over 2L times the gradient of f at x0 l2 norm squared. OK, so we have some kind of explicit bound on progress.

[`1:07:01`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4021) So remember, we're trying to minimize f. So before, we were getting a value of x0. Now we're getting f of x minus 0 minus something. And this is why you need to say that the Hessian never gets too small because for all you know-- well, I mean, basically, the problem is you don't want this thing to be equal to 0 or something very tiny.

[`1:07:32`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4052) OK, so what we actually want to say is, where did I put that alpha business? Did I just erase that? Oh, well. So we wanted to say that if you look at f of x1 minus f of x star, this multiplicatively decreases from f of x minus 0 minus f of x star.

[`1:08:01`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4081) So we're not there yet. We have to say something more to actually get that. And here we're going to use the lower bound on the Hessian. OK, so on the one hand, we said that this thing is, at most, something. It's also at least something.

[`1:08:31`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4111) Do people agree with me? OK, so what changes if I want to put the inequality in the other direction? AUDIENCE: L changes to mu? SPEAKER 1: Yeah, L changes to mu. So we also have that, in particular, let's say,

[`1:08:55`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4135) f of x star is at least-- well, OK, let me write it like this, f of y-- for any y, f of y is equal to, or is at least f of x minus or plus the gradient of f at x y minus x minus mu over 2 times x minus y l2 norm squared.

[`1:09:43`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4183) This is true for all x, y. So let's fix x, and let's take the minimum over all y. So what's the minimum overall y of the left-hand side? AUDIENCE: f of x star. SPEAKER 1: So f of x star.

[`1:10:24`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4224) So f of x star is at least the min over all y of f of x plus this gradient y minus mu over 2 times x minus y squared. And this thing, again, you can write down an explicit formula for when it's minimized.

[`1:10:50`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4250) Basically, think-- oh, OK, well, I didn't have to recalculate it. But you can show that this thing is-- when it's minimized, it equals f of x minus 1 over 2 mu f of x, the gradient of f of x, f of x squared. So this is just calculus to figure out which y minimizes this right-hand side.

[`1:11:36`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4296) And actually, I want to fix-- so I want to fix x to be, let's say, xk or k-th iterate. OK, so now I want to combine these things. So what do I know? I know that f of xk plus 1-- and let me actually write this-- let me actually bring this thing over here.

[`1:12:29`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4349) And let me just say that this implies that the gradient is at least 2 mu times f of xk minus f of x star. So this looks sort of nice because that our progress is measured in terms of subtracting off some multiple of the gradient.

[`1:13:08`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4388) So we'd like to say that the gradient is big so that we made a lot of progress. And this is telling us some lower bound on the gradient. So on the one hand, what do we know? So summary-- we know from up there that f of xk plus 1 is, at most, let's say f of xk minus 1 over 2L times the squared norm of the gradient.

[`1:13:54`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4434) And we also know that the gradient is not too small. This is the gradient of xk. We also know the gradient xk is not too small. So what do we have here? This implies-- what do I want to look at? I want to look f of xk plus 1 minus f of x star.

[`1:14:44`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4484) This implies that f of x k plus 1 minus f of x star is, at most-- well, I'm just subtracting f of x star from both sides. I'm not doing anything fancy. This is, at most, f of xk minus f of x star-- there is me subtracting from both sides-- minus 1 over 2L times this gradient squared.

[`1:15:22`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4522) But now I have a bound on this. Well, I know that this thing is big. So when I subtract it, I know that I have an upper bound on this right-hand side. And when you just manipulate that, what you get is that this thing is, at most, 1 minus mu over L times f of xk minus f of x star.

[`1:15:53`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4553) So this is the thing I was saying was alpha before. OK, so in one step of gradient descent, you have some promised reduction in your error. That depends on basically the singular values of the Hessian. As long as this ratio is small, you have some good bound. Or-- yeah.

[`1:16:22`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4582) As long as this ratio is big, you have a good bound because you're taking 1 minus that. OK. Yeah? AUDIENCE: So are you trying to [INAUDIBLE] the x to xk every time? So why don't you also write xt that is equal to x or plus t times x1 minus x over there?

[`1:16:42`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4602) SPEAKER 1: Wait. Sorry, can you say that again? AUDIENCE: So here you would define how you update the xk every round, right? SPEAKER 1: Here? Yeah, so this is-- so right. So this is basically my update rule. So xk plus 1 is xk minus 1 over xk. So OK.

[`1:17:02`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4622) So what's your question? AUDIENCE: So the way that you have xt were there, that's what you did [INAUDIBLE] right. SPEAKER 1: Oh, here? AUDIENCE: Yeah. SPEAKER 1: Oh, I mean, so I just wanted to tell you where gradient descent comes from.

[`1:17:14`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4634) So the place where gradient descent comes from is writing down f of x1 in terms of f of x0, using Taylor's theorem with an explicit remainder, and then, now upper bounding the right hand side using the information you have about the Hessian. So we said, using information we have about the Hessian, this right-hand side is, at most, that.

[`1:17:42`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4662) And then gradient descent just tries to minimize that. So really, really, I mean, f of x for any x could be written in this way with Taylor's theorem. So the real thing we wanted to do is just minimize this whole right-hand side. But this whole right-hand side is complicated.

[`1:17:56`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4676) In particular, this integral part looks complicated. So we just bound that thing using information about the Hessian. And then we just minimize the right-hand side of this expression, and that's what gradient descent does. AUDIENCE: I think here you're talking about the [INAUDIBLE] SPEAKER 1: Oh, why did I define that at all?

[`1:18:14`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4694) Because-- AUDIENCE: Because x of t is not xk of x-- SPEAKER 1: Oh, I see. You mean the notations-- AUDIENCE: --of k. SPEAKER 1: The notations collide. Is that what you mean? AUDIENCE: Yeah. SPEAKER 1: Yeah, OK. Yeah, sorry. The notations do collide, yeah.

[`1:18:34`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4714) OK, so there's only a few minutes left. OK, so that's gradient descent. So what's the punchline you should take away? Well, suppose I have some initial iterate point x0 that kicks off my gradient descent, and then I keep updating x0 to get x1 and x2, et cetera. And I want to decrease my error by a certain multiplicative factor.

[`1:19:07`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4747) I want to go from error-- delta to error epsilon times delta. So you could ask, how many iterations do I need before I have that promise? So again, using that heuristic calculation I told you, where let's say, 1 minus 1 over x to the x is roughly 1 over e.

[`1:19:34`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4774) How many iterations do I need to have my error? AUDIENCE: [INAUDIBLE] SPEAKER 1: So just to have my error, let's say? AUDIENCE: L over mu. SPEAKER 1: L over mu, right. Yeah, but exactly as you said. So to guarantee that I halve-- I think as a verb, is it halve with a V?

[`1:20:03`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4803) So to have my error, we need O of L over mu iterations because 1 minus mu over l to the L over mu is, at most, 1 over e. This implies-- and as you were saying, to reduce error from, let's say, delta to epsilon delta, we need O of L over mu times log of 1 over epsilon iterations.

[`1:20:48`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4848) So you could ask yourself-- I mean, so this is not going to be too relevant for what we're going to do with interior point. But I just want to mention, you could ask yourself, well, in this model-- in this model where I have an oracle for f and its gradient, and I have these bounds on the Hessian, OK, what's the best bound I could get?

[`1:21:08`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4868) Is L over mu log 1 over epsilon the best? Or to have my error, do I really need L over mu? So it turns out this is not an optimal method. There's another method. There's another method called accelerated gradient descent has error in O of square root L over mu iterations, and this is due to Nesterov.

[`1:22:02`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4922) And the exact reference is Soviet Math in '83. OK, so I'm not really going to cover that. I just thought I'd make you aware of its existence. I mean, for us, actually, when we do this, all our control parameters will all be constants. So there's not really going to be a difference between blah and square root of blah.

[`1:22:42`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4962) But I just thought I would point out that later, in the future, if you ever think, hey, how does gradient descent work again for some other problem you're working on? I want you to know that there is this that exists. So you can go read about that if you want to.

[`1:22:58`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=4978) OK, so we're basically out of time. So next lecture, we'll state second-order method and bounds. This is Newton's method. I probably won't, because I don't want to spend too much time here. I probably won't actually go through the proof of what it achieves, but I'll just state it.

[`1:23:39`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=5019) And you can read the proof in the notes. And then we'll finish off by showing how to use Newton's method-- we'll show how to use Newton's method to get an x tilde lambda k plus 1 from x tilde lambda k.

[`1:24:14`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=5054) So we're not going to be using gradient descent, because we will actually need to not just have bounds on the Hessian, but actually explicitly compute the Hessian in interior point. But what you should have in your mind right now is our Newton's method, which-- think of it as something like gradient descent and some iterative method.

[`1:24:35`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=5075) What it's trying to do at every step is minimize f sub lambda k plus 1. And what have we done previously? We've approximately minimized f of lambda k. So since we've approximately minimized f of lambda k, we basically have this thing in our hands. x tilde lambda k is an approximate minimizer.

[`1:24:58`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=5098) And this is going to be our x0 for Newton's method. It's going to be the initial-- well, it's going to be that x0. The initial point that we start off Newton's method with will be this. And then we'll run the update rule many times until the error gets small enough that the new point we have with small error, that will be our x tilde lambda k plus 1.

[`1:25:22`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=5122) And then now we'll use that as the starting point in Newton's method to minimize or approximately minimize f of lambda k plus 2. So are there questions about where we're going to go in next lecture or about anything that I said in this lecture?

[`1:25:48`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=5148) No? OK. Well, I guess the [INAUDIBLE] due tomorrow, and also the project proposal. AUDIENCE: That was last night. SPEAKER 1: It was due last night? [LAUGHTER] Really? Oh, great. It was due last night. OK. [LAUGHTER] Right. Something is due soon. Project proposal-- AUDIENCE: Yes.

[`1:26:07`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=5167) SPEAKER 1: Project proposal is due. AUDIENCE: When is the project proposal due? This Thursday. SPEAKER 1: Yeah, this Thursday at 11:59 PM, I think, is-- Yeah, I believe 11:59 PM. AUDIENCE: [INAUDIBLE] SPEAKER 1: Yeah, OK. Well, the [INAUDIBLE] sue whenever the website said it was due.

[`1:26:22`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=5182) [CHUCKLES] I thought it was tomorrow night, but maybe I'm just-- AUDIENCE: The project is due at 11:59. SPEAKER 1: The project? AUDIENCE: Yeah. SPEAKER 1: Yeah, good. That I was more sure of. But the [INAUDIBLE] due whenever the website said it was due, so yeah.

[`1:26:35`](https://www.youtube.com/watch?v=PPCnYiTpbCo&t=5195) OK. [SIDE CONVERSATION]
