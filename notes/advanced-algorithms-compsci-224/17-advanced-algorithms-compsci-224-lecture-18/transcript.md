# Advanced Algorithms (COMPSCI 224), Lecture 18

*Harvard University · 1:24:42 · https://www.youtube.com/watch?v=kqt1YV9dEoE*

[`0:01`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1) All right. I guess I'll just get started. So, yesterday I gave you the outline of interior point. And then I started uh discussing uh some optimization tools such as gradient descent, which is a first-order method, meaning that it has access to some function f as well as its gradient on any query point. Um and we'd like to minimize the function f.

[`0:34`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=34) Uh today I'm going to tell you about a second-order method. Uh this is called Newton's method. And uh Newton's method In the second-order method, you're not only allowed uh query access to the function and its gradient, you're also allowed query access to the Hessian of the function. Okay.

[`0:51`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=51) Um and I will show you uh an analysis of uh of Newton's method that will be relevant for for interior point. Okay, so just a recap. Um some things I want you to remember. So, our goal with interior point was to minimize c transpose x such that ax is at least b.

[`1:18`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=78) Okay, any LP can be written in this way. And we repeatedly approximately minimized f of lambda. Okay, where f lambda of x is defined to be lambda c transpose x minus the sum i going from 1 to m of ln of slack of x at i.

[`1:54`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=114) Where the slack vector is defined as AX minus B. Okay. So, we're going to use Newton's method to get better and better solutions to F lambda. Okay, so I want to tell you a little bit about Newton's method. So, second order optimization a second order methods.

[`2:28`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=148) We want to minimize some function F which maps RN to R. Okay. And we are given oracle access to F, the gradient of F, and the Hessian of F. What I mean by that is given a point X, there is some way for us to get our hands on F of X, the gradient of F of X, and the Hessian of F of X. Okay.

[`3:07`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=187) So, as usual, we start with some initial uh X in it. Let's say in RN. And repeatedly apply some update rule. Right? And what we want to understand is how much does our error decrease as we do some number of updates. Okay.

[`4:10`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=250) Set up clear for people. So, this is Newton's method. Okay. We're We We're at some current iterate So, we have some current X0 in RN. Okay. And what's the update rule? And we set X1 Okay. to be X0 minus the Hessian inverse applied to the gradient of F at X0.

[`5:01`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=301) Okay. So, that's going to be the update rule that we're going to analyze. Okay. And where does that come from? Well, remember what what Remember what gradient descent did? Gradient descent wrote basically the first-order Taylor approximation of the function plus some error bound that comes from Taylor's theorem.

[`5:26`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=326) Okay. And then gradient descent just tried to minimize that expression. So, what Newton's method is doing is it's taking the second-order um expansion Taylor expansion of F and it's minimizing that second-order expansion, right? So, So, Taylor's theorem says

[`5:48`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=348) that you know, if you look at f of x1 or let's say f of y just some f of y approximately up to some error that comes out of Taylor's theorem is equal to f of x0 plus the gradient of f at x0 dotted with y minus x0 um plus 1/2 y minus x0 dotted with the Hessian of y minus x0 Okay?

[`6:32`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=392) So this is what Taylor's theorem says if for the um in terms of approximating f in by second order expansion and Newton's method is basically just assuming that this is an equality and then just tries to minimize the right hand side. Okay, and the minimum of this right hand side is exactly this if you if you do calculus.

[`6:58`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=418) All right, so we just need to understand how well Newton's method does. So, are there are there any questions so far? Okay. So, let me write down a theorem. So, again for t in 0 1 define uh xt

[`7:35`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=455) to be x0 plus t times x1 minus x0 where by x1 I mean that x1 and by x0 I mean our initial the point that we're currently at. Suppose there exists an epsilon a positive epsilon such that for all t in the interval from 0 to 1 we have that the following is true.

[`8:13`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=493) 1 minus epsilon times the Hessian of f at x0 is at most in the owner ordering the Hessian at xt is at most in the owner ordering uh 1 plus epsilon uh the Hessian at x0. I suppose that that's true. So, remember when we're analyzing gradient descent it was it was a first order method.

[`8:41`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=521) We only had access to the gradient. We couldn't actually compute the Hessian. But, we had a promise about the Hessian, right? We were told that the Hessian is well-conditioned. Okay? There's there's some small gap between its largest and smallest singular values. So, again for Newton's method we need to have some kind of promise to say that Newton's method does well.

[`9:02`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=542) Okay? And the promise that we're going to make use of is that the Hessian doesn't change too much on the line that connects x0 to the next iterate. Okay? Just to recap when I say that a matrix A is at most a matrix B, remember that means B minus A is positive semi-definite. So, suppose that's true, then I want to measure progress.

[`9:31`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=571) And the way that I'm going to measure progress is that Okay, so is to is to say this. So, the norm of of the gradient of f at x1 under this uh Oh, I'll say what this means in a second. Okay.

[`10:16`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=616) So, this is our progress theorem. Okay. Um So, uh so, just a definition to make sense of the progress theorem. For a positive semi-definite matrix A, when I say the norm x sub A, that means by definition, what I mean is x transpose Ax squared.

[`10:56`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=656) Okay? So, we'll get into, you know, where this is going to how why this is going to be useful for us in uh interior point in a second, but ignore this thing over here. It's telling us that the norm and the norm is changing. Okay, but um the norm isn't changing too much because uh these matrices are very similar uh all across the line.

[`11:22`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=682) In particular, the the Hessian at x1 is very similar to the Hessian at x0. So, pretend for a second that these are the same matrix. Okay? So, in other words, these are the same norm. It's telling us that our new norm uh of the gradient is at most the old norm of the gradient times roughly epsilon.

[`11:41`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=701) Okay? And the minimum the minimizer is when the gradient is zero. Right? So, we're getting closer to having zero gradient. So, that's that's how you should interpret this. Okay? Are there questions before I actually prove this? Okay. So, let me give you a proof. Um

[`12:05`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=725) I should confess I'm not an optimization expert, so I don't know uh the proper citation for this proof, but this is a proof that anyway Aaron Sidford uh was kind enough to share with me, so I'm just going to show you this proof. So, first thing I want to make an observation.

[`12:33`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=753) What does it mean to say that uh 1 minus epsilon A is at most B is at most 1 plus epsilon A? Okay? How can I rewrite this? So, that's the same thing as saying uh minus epsilon A Okay?

[`13:05`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=785) Is at most B minus A is at most uh epsilon A. All right? And what does this mean? Remember what the definition of Remember what the definition of uh an operator norm is, right? So, okay, this means well, okay, so what does this mean? This means that for all X

[`13:27`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=807) for all X and RN minus epsilon X transpose AX is at most X transpose BX is at most epsilon X trans this is B minus A. And that's at most epsilon X transpose AX. Okay? So in our case we're going to be working with real symmetric matrices like Hessians. Okay?

[`13:56`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=836) And the spectral theorem says when you have a real symmetric matrix you can write you can write you know a real symmetric matrix as U times lambda U trans U transpose where lambda has the eigen values, right? And these are going to be PSD matrices so these are um so lambda has some non-negative eigen values and U is an orthogonal matrix.

[`14:19`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=859) So when I talk about F of lambda when I talk about or I'm using I'm using F. When I talk about some function G applied to A what I really mean is take this decomposition and take G and apply it to lambda. And what I mean by that is apply it apply that transformation to every single one of the eigen values.

[`14:39`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=879) So then if you if you do that then what is X transpose AX? That's just the L2 norm squared of A to the 1/2 X. Right? Same thing here. So now we can write we can write Y as A to the 1/2 X. And that implies that for all Y minus epsilon y transpose y is at most y transpose y or what's x now? What's x?

[`15:33`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=933) This implies that x is equal to a to the minus one half y. Right? So, this x is um We can write this as y transpose a to the minus one half b minus a a to the minus one half y is at most epsilon y transpose y.

[`16:02`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=962) And that's the same thing as saying that minus epsilon times the identity matrix is at most in the lower ordering um a to the minus one half b minus a a to the minus one half which is at most in the lower ordering epsilon times the identity. Okay?

[`16:31`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=991) So, you know, when we go through the Newton's, you're going to see this come up in the the proof of Newton's method. Or the question? Or Yeah, so we're going to So, for for our f, it always is. I mean, we're going to apply this with f lambda.

[`16:55`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1015) You can compute what the Hessian is. Um But, yeah. So, let's pretend it's invertible. Okay. Right. Another thing I think you can say is for this inequality to even be true it has to be the case that A and B have the same column space. Okay?

[`17:23`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1043) And and then what you could imagine is um just kind of restricting instead of A really work with A * UX, where U is U has ortho- orthonormal columns that form a basis for that subspace. Right? And then

[`17:39`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1059) this composition of first you multiply by U and then you compose with F, that will then have that will then be invert- um Well, okay. So, sorry. But okay, for us, it's invertible, so don't worry. Okay. So, I'm going to kind of use these use these things interchangeably. Okay.

[`18:11`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1091) Okay, so So, now proof of uh theorem the analysis of Newton's method. So, we can write delta of F at X1, or it's not delta, the gradient of F at X1 as the gradient of F at X0 plus an integral from 0 to 1 of the Hessian.

[`18:46`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1126) Right. So, for example, if you just I guess this is the fundamental theorem of calculus, or you can just uh view this as a zero-order Taylor approximation with explicit error. And this thing So, now we're going to use the fact we're going to use what X1 actually is.

[`19:03`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1143) This thing is equal to the integral from 0 to 1 of the Hessian at X0 minus uh the Hessian at XT X1 minus X0 DT. Oh, wait, sorry. This is not right. Ah, too many symbols. Okay, so I mean I brought in the Hessian at X0, but then I killed it here.

[`20:06`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1206) Okay, so this is just an identity. Okay. And then What do I want to erase? I'll erase this. So, right, what do I What's the thing that I want to bound? I want to bound this thing. And I'm going to plug in what I wrote for the gradient of the gradient of F at X1 as that. So, that implies that this thing Okay.

[`21:04`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1264) is equal to the integral of that. Um Um you can write the same norm. Okay. But now because we know that the Hessians are respectively similar along the entire line, we can replace this norm with the X0 norm, right?

[`22:24`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1344) And pay at most a 1 over 1 minus epsilon. Right? So, the Hessians themselves have this 1 minus epsilon 1 plus epsilon a gap. So, if you take the inverses, the inverses um you have you have a similar uh sandwiching inequality for the inverses.

[`22:41`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1361) Where on the right hand side you would have 1 over 1 minus epsilon, and on the other side you have 1 over 1 plus epsilon. Yeah, question? I can't see this equality multiplied on the left hand side, but Hessian X F inverse 0 on the right I mean the inverse like So, Um did I write this wrong?

[`23:12`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1392) Wait, hold on. So you're saying So you mean if I expand this out, what do I get? Should I be more careful in expanding this out? So this is um the integral This is the integral from zero to one of So there's that That's there's that inverse So of the gradient So that just gives you back that.

[`23:51`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1431) And then there's minus the integral from zero to one of Oh, I see. Okay. Okay. Yeah, so I sorry, this is minus. Is that what you were saying? Yeah, so this is minus this. Uh Right? And this by definition this is exactly x1 minus x0. Okay.

[`24:27`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1467) Okay, good. So this thing here is at most one over one minus epsilon where now I can switch the norm to the x0 norm. And also I can bring the uh mag the norm inside the integral. And that will only increase things as well. So this is at most one over one minus epsilon times the integral from zero to one of the same thing.

[`24:51`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1491) So uh Hessian squared I mean uh Hessian of at x0 minus Hessian at xt. This is a minus sign, sorry. Uh Hessian inverse at x0. The gradient at x0 dt. And then I brought the norm on the inside. With respect to With respect to x0 now.

[`25:32`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1532) Okay? So, I guess this is conceptually there's not really a whole lot going on here, but it's just a lot of symbols. So. Okay. Um but you should yeah, definitely interrupt me if something looks fishy. Okay, and then

[`25:55`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1555) Now, the claim is that this is just equal to 1 over 1 minus epsilon the integral from 0 to 1 of the norm of Hessian at x0 to the minus a half the gradient of f at x0. Okay, and now a really long string of things. Okay.

[`26:57`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1617) Okay, so it's kind of a nightmare. But, basically, remember the definition of the A norm? It's just the square root of X transpose AX. Okay, so I promise you, if you expand this thing out as this transpose this matrix times this, and you expand out this transpose times this big matrix times this, it's exactly the same thing. Okay?

[`27:25`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1645) So, I don't want to waste time and I mean, you can it's going to be in the notes. You can you can verify it for yourself. Oh, do we have a scribe for today? Okay. Yeah, sorry. So, yeah, feel free to, you know, just like take a picture with your phone or something if if it's too annoying to type. Um yeah, so this this is just writing things down explicitly and observing that they're actually equal.

[`27:56`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1676) Okay, there I'm not going to spend time on that. It's uh not something deep. Now, what do we know? We know that that's true. Right? Which I said is the same thing as this being true. Right? So, what does that mean for us? We know that basically, this whole matrix call this whole matrix M.

[`28:34`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1714) Okay? By this, and uh basically, this, if you just combine those two things, we know by star and double star that M minus epsilon I is at most M is at most epsilon I in the lower ordering. But here we have M squared. So that implies uh, basically that M squared, well certainly M squared is at least zero.

[`29:22`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1762) M squared is a PSD matrix. And it's at most epsilon squared I. Okay? Good. So this thing is therefore at most 1 over 1 minus epsilon um, the integral from zero to one of the integral of this thing, uh, f of x zero to the minus one half f of x zero times epsilon squared identity.

[`30:25`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1825) Yeah? Sorry, could you just explain on the second line, you go from the first line to the second line, why you get 1 over 1 minus epsilon? Ah, okay. So So we could do the spectral theorem to this real symmetric matrix, right? And what do we get?

[`30:42`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1842) We get U lambda we get uh, forget about the inverse without the inverse we get U lambda U transpose. So what does it mean to apply a function to a matrix? It means you apply you take that decomposition and apply it to each of the eigenvalues. So what is the inverse of that matrix? It's U lambda inverse U transpose.

[`31:03`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1863) Right? And we knew that all the original eigenvalues between So forget about the inverses all the eigenvalues between these two matrices are the same up to 1 plus or minus epsilon. Oh. Yeah, I see maybe I see what you mean. 1 over 1 minus epsilon.

[`31:38`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1898) Yeah, maybe I'm thinking about what you said. Maybe I'm but okay, so worst case I'm off by a square root but in that case the square root of 1 over 1 minus epsilon is basically the same thing as 1 over 1 minus epsilon. Right?

[`31:51`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1911) Epsilon changes by a constant factor. I don't So I'd have Yeah, let me let me not try and think through this on the fly but at most what you're saying would change epsilon by a constant. Okay. And now this is just right so we have the identity matrix here a scaled identity matrix.

[`32:10`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1930) So this is just the scaled L2 norm. Namely it's the L2 norm scaled by epsilon. Cuz of the square root. So this is at most this is at most epsilon times the norm just the normal L2 norm of this thing. These are different lines.

[`32:50`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=1970) Okay. But what's the what's the L2 norm of a vector Z? It's Z transpose Z. So when you do Z transpose Z on this, what you get is this you get this is equal to epsilon times the square root of um the gradient of F at X0 transpose uh and then you get two minus a halves.

[`33:20`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2000) So you get the Hessian f of X0 to the minus one and then you get the gradient again. Which is exactly that. Oh, there's a there's an it's actually epsilon over one minus epsilon, right? Because of this one minus epsilon. Okay.

[`33:39`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2019) So enough calculus. That's That's Newton's method. Okay. So now now we have to go back to interior point. Okay. So let's remember that back to interior point. So we have our function f lambda of x defined to be this lambda c transpose x um minus uh the sum i from one to m of log of the slack.

[`34:33`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2073) So if you do some calculation, this tells you that the gradient of f lambda x is equal to lambda c minus a transpose the slack matrix at x inverse times the all ones vector. Okay? Remember, this is Forget about the inverse. The slack matrix is the one where you just take the slack vector and you write it on the diagonal. This is a diagonal matrix.

[`34:59`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2099) This is the all ones vector. And if you go and calculate the Hessian, this thing doesn't depend on c at all. This is just a transpose sx minus 2a. Okay? Okay. So, uh Good. So, remember that progress in Newton's theorem is all related to this norm.

[`35:56`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2156) Right? So, that's how we're going to measure our progress in IPM. So, um Good. So, let me give some definitions. So, remember that we start off with some initial lambda. Remember, I'm going to go I'm going to go back to this toward the end of lecture. We start with off with some initial lambda lambda naught, right?

[`36:25`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2185) And we assume that we had an approximate optimum for lambda naught. And then we moved on from lambda naught to lambda one, which was very slightly bigger. And then we used our approximate solution for lambda naught as a starting point for Newton's method for lambda one, for f sub lambda one, right? We want to minimize f sub lambda one. We run a few Newton steps, and then now we hope that we get to something that's not so bad for f of lambda one.

[`36:51`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2211) And then we increment to lambda two, et cetera, right? So, what is not so bad and approximate minimize approximately minimizing mean? Well, I mean, Newton's method tells us one way how we can measure progress. So, that's going to be our our way of saying that it's a good solution, right? So, we're going to say

[`37:12`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2232) we're going to define the centrality of x for f sub lambda k as delta sub k of x is the gradient of f sub lambda k at x under the norm specified by the Hessian inverse at x. So, suppose that x were actually the minimizer of f lambda. What could you tell me about the centrality?

[`38:07`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2287) It's zero. Cuz if you're actually the minimizer, the gradient is zero. Right? So, this is some measure that tells you how close you are to, in a funny norm, how close you are to to the minimizer. Okay? Let me make two more definitions. Definition.

[`38:35`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2315) Um X is coarsely or finely central for F lambda K if delta K of X is at most 1 over 100. And also X is coarsely central if delta K of X is at most, say, a third. And so

[`39:24`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2364) what we're really going to say is, look, for lambda K we have for lambda K we have in our hand a finely central point. And then we want to say is if lambda K + 1 is not too much bigger than lambda K, that finely central point for lambda K will still be coarsely central for lambda K + 1.

[`39:47`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2387) Right? Which means that our our measure of progress in Newton's theorem uh our initial error under that funny norm is a third. And we want to make it finely central again. We want to get back from coarsely central to finely central. We want to get from a third down to a hundredth.

[`40:05`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2405) But that's just a constant number of Newton steps. Right? As long as our Hessians are behaving well, we're going to roughly halve our error in every step or in every constant number of steps. To go down from a third to a hundred is just a constant number of steps.

[`40:18`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2418) Okay, so so IPM is going to it's going to always keep a finely central point in hand, increment lambda, run a few Newton steps to turn that coarsely central point into being finely central again. Okay, so that's where we're going. Are there questions about where we're going before we actually do some calculations?

[`40:40`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2440) And we have to understand how much are we get So I I think I mentioned at some point that we're going to be able to increment lambda by a 1 + 1 over root m factor in every step as we go from k to k + 1. That 1 + 1 over root m is going to come from the fact that we want to maintain coarse centrality.

[`40:55`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2455) We need to understand how big can we make how big can we give an increase to our lambda to make sure that a finely central point is still coarsely central. Yeah. Uh so I just forgot the quantifiers. Yeah. Epsilon doesn't depend on lambda, does it? Epsilon Uh it will So the the epsilon that we're going to get at the end of the day will be um just some small constant.

[`41:21`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2481) Okay. Right, but I mean So when we apply Newton's method, our f is actually f lambda k for some k. Right? So um it's okay if the epsilon does depend on I mean the function cuz the I didn't We're only We're doing Newton's method over and over and over again in the sense that we have one f, we apply Newton's method. Now we change f. Now we run Newton's method again. As long as the epsilon for each instantiation of Newton's method is some fixed thing, that's fine. Okay.

[`41:59`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2519) Okay. Okay, so First off, here's one thing I want to understand, which is how does the Hessian change as you change X? Right? Because if you look at Newton's method, it says that the Hessian shouldn't be changing too much on the line that you're optimizing over. Right?

[`43:16`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2596) So, if I'm going to have any hope of controlling that, I need to understand when I change when I vary X, how's the Hessian changing? Now, remember, the Hessian, we said, is just this thing, F lambda of X is A transpose SX minus 2A.

[`43:37`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2617) Right? It doesn't depend actually on lambda at all. So, really, the only thing it really depends on are the slacks. Right? Because if you take a spectral decomposition of this matrix, the eigenvalues that you're getting uh correspond to the Oh, what do I want to say?

[`44:01`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2641) Yeah, so okay, so right, so okay, so the only the only matrix that's changing as you as you um as you vary X is the is the slacks. So, I want to I want to understand how do the slacks eigenvalues change as you change X? Okay? So, I want to understand for which X prime do we have the slacks don't change by much.

[`44:37`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2677) 1 minus epsilon S of X is at most uh S of X prime is at most 1 plus epsilon S of X. Okay? First, let's understand this before we continue. So, what do I want here? I want 1 minus epsilon uh Right.

[`45:18`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2718) I want 1 minus epsilon times the identity Actually, let me let me just do what I said before. So, let me subtract slack of X from both sides. I want minus epsilon slack of X to be at most slack of X prime minus slack of X to be at most epsilon slack of X.

[`45:46`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2746) So, minus epsilon times the identity is at most slack X inverse slack X prime minus slack X uh at most epsilon times the identity. Okay. And so now all of these things here are diagonal matrices, right? So the largest eigenvalue, so what do we want? We want that all the eigenvalues in magnitude are at most epsilon of this matrix. It's a diagonal matrix.

[`46:24`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2784) That means we want all the entries on the diagonal to be at most epsilon in magnitude. So this is the same thing as saying that the infinity norm of the slack matrix Sx' minus Sx, this is now the slack vector is at most epsilon.

[`46:53`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2813) Okay. So to understand when this holds it's enough to understand when this holds. Okay? But what do we know? Well, we're going to do something very loose right now which is that we're just going to bound the infinity norm by the L2 norm. So this thing this thing is at most slack inverse Sx' minus Sx L2 norm.

[`47:33`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2853) Okay. And again, this is equal to, I think we've seen this trick before. What's the slack x' minus slack x? What is that? What is this What is the slack at X? What's the definition of slack? So, remember in our original LP, we're trying to minimize C transpose X subject to AX is at least B. Right?

[`48:10`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2890) So, the slack is how far away is each constraint from B from BI? Right? So, the slack vector is just AX - B. That's the definition of the slack vector. So, the B's cancel here. So, this is equal to SX inverse A X' - X.

[`48:38`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2918) And really actually, you know, remember that X'I really I shouldn't have I should have really just said XT. I'm sorry about that. So, imagine in your mind X' is actually XT, which is uh if you remember it's T times X It's X0 plus T times this uh X1 - X0 business.

[`49:11`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2951) Right? So, we're imagining that we're looking at how the slack changes along uh the line of optimization in Newton's method. That's the thing we need to control understand Hessians of to be able to apply the theorem from Newton's method. So, if you just remember what this thing is, this is minus minus Hessian inverse times the gradient.

[`49:42`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=2982) This is equal to kind of T times uh slack X inverse A Hessian X inverse gradient F L2 norm Okay. And this is just equal to T times Now the The gradient of F at X0. So what is Um okay, so good.

[`50:54`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3054) So this is the Hessian. I mean the basically this is going to be exactly the centrality at X0. So this is Sorry, I started switching between X and X0 in the middle, but So the point is if you're doing a Newton step starting at a point X and X prime is anything along the line toward the new iterate in Newton's method, then the the um Uh good.

[`51:44`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3104) This error is at most is at most um the centrality. Okay. Which we want to be less than epsilon. Okay. So, the point is if X is actually So, right, we updated lambda and our finally our finally central point became coarsely central. I haven't proven that yet. But, the point is it is coarsely central. Which means that the centrality at that point is at most a third.

[`52:16`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3136) Okay? So, this is at most, let's say, T over 3. Okay. So, in particular, we are satisfying um we are satisfying the original We're satisfying the conditions of Newton's method where epsilon is a third. I guess that's what I should have said. See a lot of worried faces.

[`52:52`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3172) Can you say that again and explain why we start when we update lambda, we start at a coarsely central point? um Oh, yeah. I didn't I didn't Okay, so yeah, I didn't prove that yet. So, suppose that we have a coarsely central point now for F lambda K plus 1 and we want to make it finally central.

[`53:14`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3194) What are we going to do? We're going to run Newton's method and hope that the error, you know, gets gets killed down back to a 1 over 100 to make it finally central. And in order to apply Newton's method to say that we're knocking down the error by a constant factor in every iteration,

[`53:31`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3211) we need to make sure that that epsilon from the conditions of Newton's theorem is something that's, you know, at most a constant, like at most a half or something. Right? Because we're killing the error by epsilon over 1 minus epsilon fraction in every single step. Right?

[`53:45`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3225) So, to make sure that epsilon over 1 minus epsilon is non-trivial, epsilon had better be strictly less than a half. Right? So, what I'm showing you is that the rate of change of the Hessian does satisfy that property where epsilon where epsilon is the centrality of the point.

[`54:09`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3249) And the centrality is at most a third because we started off being coarsely central. Okay. Any other questions? Feel free don't be shy, you know, you can feel free to ask me anything. Think about it if you want to ask me anything as I start erasing the other board.

[`54:38`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3278) So, yeah, you're right. Kind of the last The thing that we need to do now is that we need to verify that it's actually the case that if you take a finally central point for lambda K, it will be coarsely central for lambda K plus 1. Right? Then you could plug in this argument and say Newton's method will make it finally central in a constant number of iterations. So, uh yeah.

[`55:30`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3330) That's right. Um Right, so very good. So, what did I Good. So, okay. So, you're saying um the Hessian. So, what is the Hessian? So, the Hessian is this uh A transpose SX minus 2A. Right. And the Hessian at X prime is now A transpose SX minus 2 prime A.

[`56:24`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3384) And we want to say that these things are spectrally similar. We want that for all X uh basically AX transpose well, X transpose A transpose SX to the minus 2 uh AX we want this to be up to 1 plus epsilon the same thing as um oh, I shouldn't use I shouldn't use X here cuz I already have X's.

[`57:00`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3420) For all Z's. This thing should always be close to uh Z transpose A transpose SX prime minus 2 uh AZ. That's what we want, right? So, what is this thing? This thing is the um it's SX inverse. AZ L2 norm squared.

[`57:40`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3460) And this thing is SX prime inverse AZ L2 norm squared, right? Yeah, so now maybe now it's clearer. So, the point is you if if these things have eigen values that are all close to each other, then um on any vector, in particular the vector AZ the norms will be roughly the same.

[`58:06`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3486) Sorry. Sorry for I I I guess I was hand waving a little bit, but thanks for keeping me honest. Yeah. So, so really to say that the Hessians are spectrally similar, you can just focus on the slack the slack matrix. Okay. Yeah, any other questions?

[`58:29`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3509) Okay. So, let me not erase this yet. Okay. So, actually if you don't mind, I I want to erase this as late as possible. So, are people I'm going to erase this now. Are people uh okay? So, so that board over there

[`59:09`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3549) the last board says that if we start with a coarsely central point for lambda k plus one we can make it finally central in a constant number of Newton steps. So assume assume that the case centrality of some of our approximate minimizer x tilde of lambda k is at most you know one over a hundred.

[`1:00:10`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3610) So assume we have a finally central point for lambda k. So now our question is how much bigger Remember that as lambda goes to infinity solving f lambda is getting closer and closer to solving the actual LP we care about. So we want to we want to make progress. We want lambda k plus one to be as big as possible. But if we make it too big then this point won't even be coarsely central anymore.

[`1:00:38`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3638) We'll fall off the central path. So the question is how much are we allowed to increase lambda k by to get lambda k plus one such that x tilde lambda k will still be finally central. for uh f lambda k plus one. So I'm sorry?

[`1:01:24`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3684) Yeah, coarse leaf. Thanks. So, let's say that we're going to do a multiplicative increase. So, let's say that lambda k + 1 is equal to 1 plus some factor alpha times lambda k. Right? And we want to understand how much does that change delta k by?

[`1:01:58`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3718) So, delta k + 1 So, um let me I'll just write it over. I'll just write the irrelevant stuff here. So, the gradient of f lambda x is lambda c minus A transpose S inverse times the ones vector and the Hessian is A transpose Sx minus 2A.

[`1:02:30`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3750) Okay, so that's all we're going to need to remember. So, let's compute this thing. Let's look at Sx + 1 of x lambda. So, this is our finally central point. X tilde lambda k is our finally central point for lambda k. And we want to understand now its centrality measure for k + 1.

[`1:02:58`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3778) What is that? That's equal to Well, but let's just do the definition. That's equal to the gradient of f at lambda k + 1 at the point uh of the Hessian. Well, the Hessian the Hessian doesn't depend on lambda at all, right? The Hessian is just A transpose XX minus 2A.

[`1:03:22`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3802) So, um Right? That's the definition of centrality. And then now let me write down what the gradient is. The gradient is now lambda C uh well, lambda K C well, lambda K plus one is just one plus alpha times lambda K. Right? So, lambda K times one plus alpha times C minus A transpose SX inverse all ones vector times that same thing.

[`1:04:40`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3880) Okay. Hm. Okay, and then now I want to basically add and subtract alpha times this matrix. So, this is equal to one plus alpha lambda KC A transpose SX inverse all ones vector. But then we just subtracted alpha times this, so we better add alpha time times it back plus alpha times the same thing. And then, you know, the usual Hessian inverse over there.

[`1:05:39`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3939) And then now we do triangle inequality. Right? So, what is this? What's Hopefully this is now it's clear what I'm doing here. What's that? Yeah. Right. Yeah, delta clear if you if you include if you include the norm with the Hessian inverse, but yeah, the point is this is just the gradient at lambda K.

[`1:06:12`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3972) So, we can do triangle inequality and say, "Look, this is at most 1 + alpha times the centrality measure at lambda K or the centrality measure at K is how I defined it of X tilde lambda K. And then that thing is at most 1/100. So, that's fine.

[`1:06:33`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=3993) Plus Now we have an alpha out here. A transpose SX inverse one vector and now let me write again this is A transpose SX X tilde lambda K. - 2 A inverse. Okay, so this part is fine, right? We're we're we're trying to make sure that this thing is at most a third. As long as alpha is tiny enough, the 1/100 is going to become, you know, 1/50 or something.

[`1:07:11`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4031) We don't really care about that. But then we need to understand this thing here. All right, so we need to understand this thing. So, this thing So, what is it equal to? Well, let's expand what it means to take, you know, a matrix norm like this. This equal to one transpose um SX inverse.

[`1:07:48`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4068) This is This is all X uh X here, remember, is X tilde lambda K. All these X's are X tilde lambda K. X tilde lambda K uh and then A and then A transpose S X tilde lambda K minus two A inverse and then the same thing.

[`1:08:35`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4115) A transpose SX tilde lambda K inverse. Okay? Looks like a mouthful, but I claim that there's something special about this about this uh this matrix. Okay? There's a minus one here. Okay. So, whether or not you see this, I guess will depend on how uh how much you remember your linear algebra. Okay, it's it's not necessarily the identity because um Right. Okay, good.

[`1:09:34`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4174) So, if everything were full rank, it would be the identity. Yeah. In general, what this is is it's a projection matrix. Okay, this is the proj- So, this this red thingy is equal to the projection orthogonal projection projection onto the column space of S minus one X tilde lambda K uh at A.

[`1:10:19`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4219) Okay. So, in general, if you want to project So, you know, the projection onto call the column space of A is um A transpose A inverse uh and then put an A here. Uh A transpose A. So. I mean, the best way to see that is Well, you can see it by, for example, taking the SVD of A. And when you expand this thing out, you get you get, you know, U U transpose, where U is the the matrix with left singular vectors.

[`1:10:58`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4258) But But what does that What does that tell us about this thing? This implies that this yellow box thing, right? Is at most one transpose one square root. Which is root n. Okay. So, really this thing So, what really what we've what we've we've shown

[`1:11:33`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4293) At the end of the day, what we've shown is that lambda delta k plus one at x tilde lambda k is at most one plus alpha delta k x tilde lambda k plus alpha root n. Okay. We want this thing to be less than a third. And we said that this thing was coarsely central, so this was at most one plus alpha over 100 plus alpha root n.

[`1:12:05`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4325) We want this thing to be less than a third, so choose alpha to be something like one over root n. You know, one over 10 root n or something. And then it's coarsely central. Okay. So, that's basically it. We um We can increase lambda by a multiplicative one plus one over root n at every step.

[`1:12:30`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4350) If you remember, I told you that somehow we get an initial point that's really good for lambda lambda initial being roughly exponential in minus the precision. And we're done when lambda gets to be as big as um uh something like m times exponential in the precision.

[`1:12:52`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4372) Right? So, I think I mentioned this last class, you can look at the notes, but the point is this tells us we can take roughly uh root m or root m uh iterations of step five from last time, where we have to keep increasing lambda. We have to increase lambda roughly root m root m times L times, where L is the precision. So, that's the that's it for I guess the main part of interior point.

[`1:13:18`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4398) It all just now boils down to how do you get the initial finally central point? Right? Or even the initial coarsely central point. You can make it finally central with Newton's method. Yeah. Oh, question? So, so what was what's the best result that we have for this? Instead Okay, so instead of square root uh m times L, you can get square root rank of A times L.

[`1:13:46`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4426) Was that Was that the presentation by Aaron Sidford. Yeah, so that's That was a recent paper by Sidford and Lee. And I I'll say it Huh? Yeah, they they they turned the square root m into square root rank of A. And I mean the basic idea behind So, okay, there's there's a lot going on there, but the the highest level most basic idea is if you look at the barrier function that we're using,

[`1:14:10`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4450) it's minus the sum over I of log of slack I, which is kind of weird because this means that if you repeat the same constraint over and over and over again, it's getting weighted more and more in the barrier. Right?

[`1:14:26`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4466) But the the optimization problem you're solving actually hasn't changed at all. So, what their algorithm does is at every point it it maintains kind of a weight vector, so that you use the same barrier but a weighted version of that barrier, where every constraint is weighted by a certain amount. And um the amount that you have to weight each constraint by in that barrier function depends on some geometric considerations.

[`1:14:50`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4490) Okay, so um that's kind of that's the the heart of their change. And then there's a lot then how do you come up with this weight vector and how do you maintain it and analyze things, etc. But uh the new thing that changed to get down to root rank was that they used this they used some kind of waiting of the constraints in the barrier function. Does that make sense?

[`1:15:15`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4515) Can you explain further again why some some constraints are being Oh yeah, right. So the point is the barrier we're using is, right, minus sum I from 1 to M of log of slack of XI, right? So what what are what are the slacks? You have What is the constraint? The constraint matrix is AX is at least B. That's the constraint, right? So what is a slack? A slack is the I throw of A dotted with X minus BI. So suppose you just have the same constraint Suppose someone just gave you the LP with the same constraint written a thousand times.

[`1:15:47`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4547) You're going to sum it a thousand times here. But that's I mean that isn't that's sort of weird, right? Because the constraint only matters once. So they have some way of waiting the constraints in this barrier function. So they actually have a minus sum over I weight I. And they have some way of figuring out these weights that guarantees faster convergence.

[`1:16:11`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4571) And these weights must stay constant? Uh I think they even change they change the weights over time as well. And when they So you know, we had to look at how does the centrality change as you change the lambdas? They also have to look at how does it change as you change the Ws as well.

[`1:16:25`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4585) So they have And they also need to be able to compute these Ws efficiently cuz you want a fast algorithm at the end of the day. So yeah, I'm not So I don't know all the details of their paper. My understanding is that there was the there was an existential theorem due to Nesterov or maybe Nesterov and Nemirovski, I'm not sure, that showed that there exists a weight vector. But it was not algorithmic at all.

[`1:16:50`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4610) Um and they show how that that they can actually um algorithmically efficiently maintain some weight vector that does uh close to as well as that existential result. Okay. So I want to say something. I just want to close this lecture with you know, how you actually start off.

[`1:17:13`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4633) So again, this is going to be down to precision issues, so I don't want to I don't want to give all the calculations, but the basic idea is So how to start the IPM. Right? We need to have some x tilde lambda zero to start it off, which is which is coarsely central or finally central initially.

[`1:17:42`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4662) So the point is So first what we're going to do is we're going to alter the LP to be min c transpose x plus capital N times z. I'll say again in a second what this is, such that Ax plus the all ones vector z is greater than equal to b.

[`1:18:03`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4683) Okay? Has an obvious Oh, and z has to be at least zero. Oh, let me let me put this there's some more. Also zero is at most z is at most 2 to the L plus 1 and negative 2 to the L plus 1 uh all ones vector is at most x is at most 2 to the L plus 1 all ones vector.

[`1:18:40`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4720) So, I'll put a link I'll put a a reference in the notes, but you can show that if n is big, if n is like exponential in the precision, let's say, 10 to the L or something or 100 to the L, then original LP bounded and feasible implies that LP prime optimum must have Z equals zero.

[`1:19:20`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4760) Okay? So, you can prove this kind of theorem by by looking at various precision calculations. And the point is, so now if you could actually just solve this one, well, the optimal solution has Z equals zero, so you've actually you've actually solved the original LP. Okay?

[`1:19:36`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4776) And in the original LP, you can show that any solution has to have bounded precision anyway. So, now we just need to solve this thing. I'm just giving you the sketch of what's going on. Okay? So, this is LP prime. So, LP prime has an obvious interior point.

[`1:20:02`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4802) X prime, which let's write that as X {comma} Z. You can set X to be zero, and you can set Z to be the L infinity norm of B. Right? So, that's an interior point. Are we done? Yeah, finally center. What's lambda? We know and is it finally central for that lambda? Who knows? So, we're not done.

[`1:20:35`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4835) But then there's one last trick. We don't just need an interior point. We need a fine We need a coarsely central interior point. for for some lambda. Right? So, what are we going to do? Here's Here's now a funny thing we're going to do. Set lambda to be one.

[`1:21:25`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4885) Okay? Now, let's look at the gradient. The gradient of f of lambda at this x'. Remember, the gradient is equal to lambda * c minus Um I think slack slack inverse Right? A transpose slack inverse all ones vector. Right? When are we optimal?

[`1:21:55`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4915) We're optimal when the gradient is zero. So, here's the funny thing we're going to do. Okay, sure we you know, this Here's Here's the funny thing we're going to do. So, So, x'is perfectly central for a different cost function. So, this is lambda is equal to one, right?

[`1:22:23`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4943) So, it's perfectly central for the cost function A transpose XX' inverse all one. Right? Okay? So now right the gradient is zero now for this cost function. That's not our actual cost function, but it's gradient zero for this cost function. So what do we do? So now we have we have a point which is perfectly central for some cost function. You can basically run all the update steps I told you in reverse.

[`1:22:48`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4968) Instead of incrementing lambda by a little, you decrement it by a little. And you run Newton's method and then you keep refining going down in lambda until you get to a very very very tiny lambda, exponentially small in the precision. And now what do you have?

[`1:23:04`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=4984) You have a point that's finally central near the analytic center. And then what you show is that when you have a point that's finally central near the analytic center, you can basically just switch the cost function to whatever you want and you'll still be finally central. Because once once lambda is that tiny, uh the cost function basically doesn't matter anymore.

[`1:23:27`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=5007) Right? So once lambda is that tiny, you then switch over the cost function. You'll still be finally central and then you run everything I told you in the forward direction. Now run everything in reverse to get an approximate analytic center which is basically you know, finally central for any cost function of bounded precision.

[`1:24:18`](https://www.youtube.com/watch?v=kqt1YV9dEoE&t=5058) And now that you have that, well, now you run things forward. Okay? So that's everything. Does that make sense? Okay. So, that's it, I guess. So, I will see you Tuesday.
